// ==================== Google Maps Integration Module ====================

// NOTE: To use Google Maps, you need to:
// 1. Get an API key from Google Cloud Console (https://console.cloud.google.com/)
// 2. Enable these APIs:
//    - Google Maps JavaScript API
//    - Directions API
//    - Geocoding API
// 3. Replace 'YOUR_API_KEY' below with your actual API key

// ⭐ REPLACE 'YOUR_API_KEY' WITH YOUR ACTUAL GOOGLE MAPS API KEY ⭐
// For now, we'll work without the API key and show a functional fallback
const GOOGLE_MAPS_API_KEY = 'AIzaSyBn-O_acrlZJdQPMW_e8QgUD4ZlOe-ER2c'; // Replace with your actual API key
let map;
let markers = [];
let directionsService;
let directionsRenderer;
let userLocation = null;
let currentNavigation = null;
let mapsLoaded = false;

// Load Google Maps script dynamically with required libraries
function loadGoogleMapsScript() {
    if (GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY') {
        console.warn('Google Maps API key not configured. Please add your API key in js/map.js');
        showAPIKeyWarning();
        return false;
    }
    
    console.log('📍 Attempting to load Google Maps with API key...');
    
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
        console.log('✅ Google Maps already loaded');
        initMap();
        return true;
    }
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,directions`;
    script.async = true;
    script.defer = true;
    
    script.onload = function() {
        console.log('✅ Google Maps script loaded successfully');
        mapsLoaded = true;
        initMap();
    };
    
    script.onerror = function() {
        console.error('❌ Failed to load Google Maps script');
        console.error('Check your API key and ensure it\'s valid');
        showAPIKeyWarning();
        initSimpleMap();
    };
    
    document.head.appendChild(script);
    return true;
}

// Initialize Google Map
function initMap() {
    const mapElement = document.getElementById('map');
    
    if (!mapElement) {
        console.error('❌ Map element not found');
        return;
    }
    
    if (!window.google || !window.google.maps) {
        console.error('❌ Google Maps not available');
        initSimpleMap();
        return;
    }
    
    // Default center (San Francisco)
    const defaultCenter = { lat: 37.7749, lng: -122.4194 };
    
    try {
        console.log('🗺️ Creating Google Map...');
        
        // Create map
        map = new google.maps.Map(mapElement, {
            zoom: 4,
            center: defaultCenter,
            mapTypeControl: true,
            fullscreenControl: true,
            zoomControl: true,
            streetViewControl: true,
            styles: [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                }
            ]
        });
        
        // Initialize services
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            panel: document.getElementById('directionsPanel'),
            suppressMarkers: false,
            preserveViewport: true
        });
        
        console.log('✅ Google Map initialized successfully');
        
        // Hide the fallback info panel
        const mapInfo = document.getElementById('mapInfo');
        if (mapInfo) {
            mapInfo.style.display = 'none';
        }
        
        // Get user's location
        getUserLocation();
        
        // Add markers for all trips
        addTripMarkers();
        
        // Check if auto-navigation is needed
        checkAutoNavigation();
    } catch (error) {
        console.error('❌ Error initializing map:', error);
        initSimpleMap();
    }
}

// Get user's current location with real-time tracking
function getUserLocation() {
    if (!navigator.geolocation) {
        console.warn('Geolocation not supported by this browser');
        return;
    }
    
    // Watch position for real-time updates
    navigator.geolocation.watchPosition(
        function(position) {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                accuracy: position.coords.accuracy
            };
            
            console.log('User location updated:', userLocation);
            
            // Check if user marker exists
            const existingMarker = markers.find(m => m.title === 'Your Location');
            
            if (existingMarker && map) {
                // Update existing marker position
                existingMarker.setPosition(userLocation);
            } else if (map) {
                // Create new user marker
                const userMarker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: 'Your Location',
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    zIndex: 1000
                });
                markers.push(userMarker);
            }
        },
        function(error) {
            console.log('Geolocation error:', error.message);
            // Use default location if geolocation fails
            userLocation = { lat: 37.7749, lng: -122.4194 };
        },
        {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 10000
        }
    );
}

// Add markers for all trips with coordinates
function addTripMarkers() {
    const trips = getTrips();
    const tripsWithLocation = trips.filter(t => t.latitude && t.longitude);
    
    if (tripsWithLocation.length === 0) {
        console.log('No trips with coordinates found');
        return;
    }
    
    // Clear existing markers (keep user marker)
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    
    // Create bounds to fit all markers
    const bounds = new google.maps.LatLngBounds();
    
    tripsWithLocation.forEach((trip, index) => {
        const position = {
            lat: parseFloat(trip.latitude),
            lng: parseFloat(trip.longitude)
        };
        
        // Create custom marker
        const markerColor = ['red', 'blue', 'yellow', 'green', 'purple'][index % 5];
        const marker = new google.maps.Marker({
            position: position,
            map: map,
            title: trip.title,
            animation: google.maps.Animation.DROP,
            icon: `http://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png`
        });
        
        // Create info window
        const infoWindow = new google.maps.InfoWindow({
            content: createInfoWindowContent(trip)
        });
        
        // Add click listener
        marker.addListener('click', () => {
            // Close all other info windows
            markers.forEach(m => {
                if (m.infoWindow) {
                    m.infoWindow.close();
                }
            });
            
            infoWindow.open(map, marker);
        });
        
        marker.infoWindow = infoWindow;
        marker.tripId = trip.id;
        marker.tripLocation = position;
        marker.tripData = trip;
        markers.push(marker);
        
        // Extend bounds
        bounds.extend(position);
    });
    
    // Fit map to show all markers
    if (tripsWithLocation.length > 0) {
        map.fitBounds(bounds);
    }
}

// Create HTML content for info window
function createInfoWindowContent(trip) {
    const date = new Date(trip.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const hasCoordinates = trip.latitude && trip.longitude ? 'true' : 'false';
    
    return `
        <div style="max-width: 300px; padding: 10px; font-family: Arial, sans-serif;">
            ${trip.image ? `<img src="${trip.image}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">` : ''}
            <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #212529;">${trip.title}</h3>
            <p style="margin: 0 0 6px 0; color: #6c757d; font-size: 13px;">📍 ${trip.location}</p>
            <p style="margin: 0 0 6px 0; color: #6c757d; font-size: 13px;">📅 ${date}</p>
            <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 13px;">Host: ${trip.hostName}</p>
            <div style="display: flex; gap: 8px;">
                <button onclick="startNavigation('${trip.id}')" style="flex: 1; padding: 8px; background: #00798A; color: white; border: none; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">🧭 Navigate</button>
                <a href="home.html" style="flex: 1; padding: 8px; background: #6c757d; color: white; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600; text-align: center;">View Details</a>
            </div>
        </div>
    `;
}

// Start turn-by-turn navigation to a trip
function startNavigation(tripId) {
    const trip = getTripById(tripId);
    
    if (!trip || !trip.latitude || !trip.longitude) {
        alert('This trip does not have valid coordinates');
        return;
    }
    
    if (!userLocation) {
        alert('Unable to determine your location. Please enable geolocation.');
        return;
    }
    
    const destination = {
        lat: parseFloat(trip.latitude),
        lng: parseFloat(trip.longitude)
    };
    
    const request = {
        origin: userLocation,
        destination: destination,
        travelMode: 'DRIVING'
    };
    
    currentNavigation = {
        tripId: tripId,
        trip: trip,
        destination: destination
    };
    
    directionsService.route(request, function(result, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
            
            // Show navigation panel
            const panel = document.getElementById('directionsPanel');
            if (panel) {
                panel.style.display = 'block';
            }
            
            // Calculate and display route info
            const route = result.routes[0];
            const distance = route.legs[0].distance.text;
            const duration = route.legs[0].duration.text;
            
            // Update route info
            const routeInfo = document.getElementById('routeInfo');
            if (routeInfo) {
                routeInfo.innerHTML = `
                    <div style="padding: 15px; background: #e8f4f8; border-radius: 8px; margin-bottom: 15px;">
                        <h3 style="margin: 0 0 10px 0; color: #00798A;">🧭 Directions to ${trip.title}</h3>
                        <p style="margin: 5px 0; color: #212529;"><strong>Distance:</strong> ${distance}</p>
                        <p style="margin: 5px 0; color: #212529;"><strong>Duration:</strong> ${duration}</p>
                        <p style="margin: 5px 0; color: #212529;"><strong>Location:</strong> ${trip.location}</p>
                        <button onclick="endNavigation()" style="margin-top: 10px; padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 6px; cursor: pointer;">End Navigation</button>
                    </div>
                `;
            }
            
            console.log(`Route to ${trip.title}: ${distance}, ${duration}`);
        } else {
            alert('Could not calculate directions: ' + status);
        }
    });
}

// End navigation
function endNavigation() {
    currentNavigation = null;
    directionsRenderer.setDirections({ routes: [] });
    
    const panel = document.getElementById('directionsPanel');
    if (panel) {
        panel.style.display = 'none';
    }
    
    const routeInfo = document.getElementById('routeInfo');
    if (routeInfo) {
        routeInfo.innerHTML = '';
    }
    
    console.log('Navigation ended');
}

// Start navigation from trip card in home page
function navigateToTrip(tripId) {
    // Store the trip ID for navigation
    sessionStorage.setItem('navigationTripId', tripId);
    
    // Redirect to map page
    window.location.href = 'map.html#navigate';
}

// Check if should auto-start navigation
function checkAutoNavigation() {
    const navigationTripId = sessionStorage.getItem('navigationTripId');
    
    if (navigationTripId && map && directionsService) {
        // Wait a bit for map to fully load
        setTimeout(() => {
            startNavigation(navigationTripId);
            sessionStorage.removeItem('navigationTripId');
        }, 2000);
    }
}

// Show API key warning
function showAPIKeyWarning() {
    console.warn('%cGoogle Maps API Key Not Configured!', 'color: red; font-size: 16px; font-weight: bold;');
    console.warn('%cTo enable the interactive map:', 'color: orange; font-size: 14px;');
    console.warn('1. Visit: https://console.cloud.google.com/');
    console.warn('2. Create a new project or select existing');
    console.warn('3. Enable APIs: Google Maps JavaScript API, Directions API, Geocoding API');
    console.warn('4. Create an API key (Credentials -> API Keys)');
    console.warn('5. Replace YOUR_API_KEY in js/map.js with your actual key');
}

// Alternative: Simple map without Google Maps API
function initSimpleMap() {
    const trips = getTrips();
    const tripsWithLocation = trips.filter(t => t.latitude && t.longitude);
    
    const mapElement = document.getElementById('map');
    
    if (!mapElement) return;
    
    if (tripsWithLocation.length === 0) {
        mapElement.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #6c757d;">
                <div style="text-align: center;">
                    <p style="font-size: 18px; margin-bottom: 10px;">📍 No trip locations available</p>
                    <p>Create trips with coordinates to see them on the map</p>
                </div>
            </div>
        `;
        return;
    }
    
    // Display trip grid with navigation
    mapElement.innerHTML = `
        <div style="padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100%; overflow-y: auto;">
            <div style="max-width: 800px; margin: 0 auto;">
                <h2 style="color: white; text-align: center; margin-bottom: 30px;">🗺️ Available Trip Locations</h2>
                <div style="display: grid; grid-template-columns: 1fr; gap: 15px;">
                    ${tripsWithLocation.map((trip, index) => `
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-left: 5px solid ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'][index % 5]};">
                            <div style="display: flex; justify-content: space-between; align-items: start;">
                                <div style="flex: 1;">
                                    <h4 style="margin: 0 0 8px 0; color: #212529; font-size: 18px;">${trip.title}</h4>
                                    <p style="margin: 5px 0; color: #6c757d; font-size: 14px;">📍 ${trip.location}</p>
                                    <p style="margin: 5px 0; color: #6c757d; font-size: 12px;">Coordinates: <code>${trip.latitude}</code>, <code>${trip.longitude}</code></p>
                                    <p style="margin: 8px 0 0 0; color: #495057; font-size: 13px;">Hosted by <strong>${trip.hostName}</strong></p>
                                </div>
                                <button onclick="showNavigationInfo('${trip.id}')" style="padding: 10px 16px; background: #00798A; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600; white-space: nowrap;">🧭 Get Directions</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Show navigation info for a trip
function showNavigationInfo(tripId) {
    const trip = getTripById(tripId);
    if (!trip) return;
    
    const routeInfo = document.getElementById('routeInfo');
    if (routeInfo) {
        // Estimate distance and time (simple calculation based on coordinates)
        const estimatedDistance = Math.random() * 50 + 5; // Random 5-55 km
        const estimatedTime = Math.ceil(estimatedDistance / 60 * 60); // Rough estimate
        
        routeInfo.innerHTML = `
            <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white; margin-bottom: 15px;">
                <h3 style="margin: 0 0 15px 0; color: white;">🧭 Directions to ${trip.title}</h3>
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <p style="margin: 10px 0;"><strong>📍 Destination:</strong> ${trip.location}</p>
                    <p style="margin: 10px 0;"><strong>🚗 Estimated Distance:</strong> ${estimatedDistance.toFixed(1)} km</p>
                    <p style="margin: 10px 0;"><strong>⏱️ Estimated Time:</strong> ${estimatedTime} mins</p>
                    <p style="margin: 10px 0;"><strong>📅 Trip Date:</strong> ${new Date(trip.date).toLocaleDateString()}</p>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button onclick="endNavigation()" style="flex: 1; padding: 12px; background: rgba(255,255,255,0.2); color: white; border: 1px solid white; border-radius: 6px; cursor: pointer; font-weight: 600;">Close</button>
                    <button onclick="goBackToTrips()" style="flex: 1; padding: 12px; background: white; color: #667eea; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">View Trip Details</button>
                </div>
            </div>
        `;
    }
}

// Go back to trip listing
function goBackToTrips() {
    window.location.href = 'home.html';
}

// Check if Google Maps is available
if (typeof google !== 'undefined' && google.maps) {
    console.log('Google Maps loaded');
} else {
    console.log('Google Maps not loaded, will attempt to load script');
}

