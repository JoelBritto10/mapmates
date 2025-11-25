// ==================== Google Maps Integration Module ====================

// NOTE: To use Google Maps, you need to:
// 1. Get an API key from Google Cloud Console
// 2. Enable Google Maps JavaScript API
// 3. Replace 'YOUR_API_KEY' below with your actual API key

const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY';
let map;
let markers = [];

// Load Google Maps script dynamically
function loadGoogleMapsScript() {
    if (GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY') {
        console.warn('Google Maps API key not configured. Please add your API key in js/map.js');
        return;
    }
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Initialize Google Map
function initMap() {
    const mapElement = document.getElementById('map');
    
    if (!mapElement) {
        console.error('Map element not found');
        return;
    }
    
    // Default center (San Francisco)
    const defaultCenter = { lat: 37.7749, lng: -122.4194 };
    
    // Create map
    map = new google.maps.Map(mapElement, {
        zoom: 4,
        center: defaultCenter,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });
    
    // Add markers for all trips
    addTripMarkers();
}

// Add markers for all trips with coordinates
function addTripMarkers() {
    const trips = getTrips();
    const tripsWithLocation = trips.filter(t => t.latitude && t.longitude);
    
    if (tripsWithLocation.length === 0) {
        console.log('No trips with coordinates found');
        return;
    }
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    
    // Create bounds to fit all markers
    const bounds = new google.maps.LatLngBounds();
    
    tripsWithLocation.forEach(trip => {
        const position = {
            lat: parseFloat(trip.latitude),
            lng: parseFloat(trip.longitude)
        };
        
        // Create marker
        const marker = new google.maps.Marker({
            position: position,
            map: map,
            title: trip.title,
            animation: google.maps.Animation.DROP
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
        year: 'numeric'
    });
    
    return `
        <div style="max-width: 250px; padding: 10px;">
            ${trip.image ? `<img src="${trip.image}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">` : ''}
            <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #212529;">${trip.title}</h3>
            <p style="margin: 0 0 6px 0; color: #6c757d; font-size: 13px;">📍 ${trip.location}</p>
            <p style="margin: 0 0 6px 0; color: #6c757d; font-size: 13px;">📅 ${date}</p>
            <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 13px;">Host: ${trip.hostName}</p>
            <a href="home.html" style="display: inline-block; padding: 8px 16px; background: #00798A; color: white; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600;">View Details</a>
        </div>
    `;
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
                    <p style="font-size: 18px; margin-bottom: 10px;">No trip locations available</p>
                    <p>Create trips with coordinates to see them on the map</p>
                </div>
            </div>
        `;
        return;
    }
    
    // Display simple list view as fallback
    mapElement.innerHTML = `
        <div style="padding: 20px;">
            <h3 style="margin-bottom: 20px;">Trip Locations</h3>
            <p style="color: #6c757d; margin-bottom: 20px;">Add your Google Maps API key to enable interactive map</p>
            ${tripsWithLocation.map(trip => `
                <div style="padding: 15px; margin-bottom: 15px; background: #f8f9fa; border-left: 4px solid #00798A; border-radius: 4px;">
                    <h4 style="margin: 0 0 8px 0;">${trip.title}</h4>
                    <p style="margin: 0 0 5px 0; color: #6c757d; font-size: 14px;">📍 ${trip.location}</p>
                    <p style="margin: 0; color: #6c757d; font-size: 14px;">Coordinates: ${trip.latitude}, ${trip.longitude}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// Check if Google Maps is available and initialize
if (typeof google !== 'undefined' && google.maps) {
    // Google Maps is loaded
    console.log('Google Maps loaded');
} else if (GOOGLE_MAPS_API_KEY !== 'YOUR_API_KEY') {
    // Try to load Google Maps
    loadGoogleMapsScript();
} else {
    // Use simple map fallback
    console.log('Using simple map fallback');
}
