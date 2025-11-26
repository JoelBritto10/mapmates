// ==================== Trips Management Module ====================

// Initialize trips storage
function initTrips() {
    if (!localStorage.getItem('trips')) {
        localStorage.setItem('trips', JSON.stringify([]));
    }
}

// Get all trips
function getTrips() {
    initTrips();
    return JSON.parse(localStorage.getItem('trips')) || [];
}

// Get trip by ID
function getTripById(id) {
    const trips = getTrips();
    return trips.find(t => t.id === id);
}

// Create new trip
function createTrip(tripData) {
    initTrips();
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
        return { success: false, message: 'You must be logged in to create a trip' };
    }
    
    const trips = getTrips();
    
    const newTrip = {
        id: generateId(),
        hostId: currentUser.id,
        hostName: currentUser.name,
        title: tripData.title,
        description: tripData.description,
        location: tripData.location,
        date: tripData.date,
        latitude: tripData.latitude,
        longitude: tripData.longitude,
        image: tripData.image || '',
        participants: [],
        createdAt: new Date().toISOString()
    };
    
    trips.unshift(newTrip); // Add to beginning
    localStorage.setItem('trips', JSON.stringify(trips));
    
    // Award karma for creating trip
    awardKarmaForTrip(currentUser.id);
    
    return { success: true, trip: newTrip };
}

// Update trip
function updateTrip(tripData) {
    const trips = getTrips();
    const currentUser = getCurrentUser();
    
    const index = trips.findIndex(t => t.id === tripData.id);
    
    if (index === -1) {
        return { success: false, message: 'Trip not found' };
    }
    
    const trip = trips[index];
    
    // Check if user is the host
    if (trip.hostId !== currentUser.id) {
        return { success: false, message: 'You can only edit your own trips' };
    }
    
    // Update trip data
    trips[index] = {
        ...trip,
        title: tripData.title,
        description: tripData.description,
        location: tripData.location,
        date: tripData.date,
        latitude: tripData.latitude,
        longitude: tripData.longitude,
        image: tripData.image || trip.image,
        updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('trips', JSON.stringify(trips));
    
    return { success: true, trip: trips[index] };
}

// Delete trip
function deleteTripById(tripId) {
    const trips = getTrips();
    const currentUser = getCurrentUser();
    
    const trip = trips.find(t => t.id === tripId);
    
    if (!trip) {
        return { success: false, message: 'Trip not found' };
    }
    
    // Check if user is the host
    if (trip.hostId !== currentUser.id) {
        return { success: false, message: 'You can only delete your own trips' };
    }
    
    const filteredTrips = trips.filter(t => t.id !== tripId);
    localStorage.setItem('trips', JSON.stringify(filteredTrips));
    
    return { success: true };
}

// Get trips hosted by user
function getUserTrips(userId) {
    const trips = getTrips();
    return trips.filter(t => t.hostId === userId);
}

// Get trips user has joined
function getJoinedTrips(userId) {
    const trips = getTrips();
    return trips.filter(t => t.participants && t.participants.includes(userId));
}

// Award karma for creating a trip (+10 points)
function awardKarmaForTrip(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.id === userId);
    
    if (user) {
        if (!user.karma) user.karma = 0;
        user.karma += 10;
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update session if it's current user
        const session = JSON.parse(localStorage.getItem('session'));
        if (session && session.userId === userId) {
            // Session stays same, karma is fetched from users array
        }
    }
}
