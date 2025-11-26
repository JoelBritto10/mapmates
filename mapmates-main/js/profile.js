// ==================== Profile Management Module ====================

// Load user profile data
function loadProfile() {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    const trips = getTrips();
    const userTrips = trips.filter(t => t.hostId === currentUser.id);
    const joinedTrips = trips.filter(t => t.participants && t.participants.includes(currentUser.id));
    
    // Calculate karma
    const totalKarma = currentUser.karma || 0;
    
    // Update profile display
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('karmaPoints').textContent = totalKarma;
    document.getElementById('tripsHosted').textContent = userTrips.length;
    document.getElementById('tripsJoined').textContent = joinedTrips.length;
    
    // Update bio
    const bioElement = document.getElementById('profileBio');
    if (currentUser.bio) {
        bioElement.textContent = currentUser.bio;
    } else {
        bioElement.textContent = 'No bio yet. Click Edit Profile to add one!';
        bioElement.style.fontStyle = 'italic';
    }
    
    // Update profile picture
    const profileAvatarElement = document.getElementById('profileAvatar');
    if (currentUser.profilePicture && profileAvatarElement) {
        profileAvatarElement.innerHTML = `<img src="${currentUser.profilePicture}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
    }
    
    // Display hosted trips
    displayHostedTrips(userTrips);
}

// Display trips hosted by user
function displayHostedTrips(trips) {
    const container = document.getElementById('hostedTrips');
    
    if (trips.length === 0) {
        container.innerHTML = '<p style="color: #6c757d;">You haven\'t hosted any trips yet. <a href="create-trip.html">Create your first trip!</a></p>';
        return;
    }
    
    container.innerHTML = trips.map(trip => `
        <div style="padding: 15px; margin-bottom: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #00798A;">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 8px 0; font-size: 18px;">${trip.title}</h4>
                    <p style="margin: 0 0 5px 0; color: #6c757d; font-size: 14px;">📍 ${trip.location}</p>
                    <p style="margin: 0 0 5px 0; color: #6c757d; font-size: 14px;">📅 ${new Date(trip.date).toLocaleDateString()}</p>
                    <p style="margin: 0; color: #6c757d; font-size: 14px;">👥 ${trip.participants ? trip.participants.length : 0} participants</p>
                </div>
                <a href="edit-trip.html?id=${trip.id}" style="padding: 8px 16px; background: white; color: #00798A; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600; border: 2px solid #00798A;">Edit</a>
            </div>
        </div>
    `).join('');
}

// Update user profile
function updateProfile(updates) {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        console.error('No current user');
        return false;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) {
        console.error('User not found in list');
        return false;
    }
    
    // Handle image: compress if needed
    let profilePicture = updates.profilePicture;
    if (profilePicture && profilePicture.startsWith('data:image')) {
        console.log('Image size before compression:', profilePicture.length);
        profilePicture = compressImage(profilePicture);
        console.log('Image size after compression:', profilePicture.length);
    }
    
    // Update user data
    users[userIndex] = {
        ...users[userIndex],
        name: updates.name || users[userIndex].name,
        bio: updates.bio !== undefined ? updates.bio : users[userIndex].bio,
        profilePicture: profilePicture !== undefined ? profilePicture : users[userIndex].profilePicture,
        updatedAt: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Profile saved to localStorage successfully');
    } catch (e) {
        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            console.error('localStorage quota exceeded:', e);
            alert('Storage limit exceeded. Please use a smaller image.');
            return false;
        } else {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    }
    
    // Update session
    try {
        const session = JSON.parse(localStorage.getItem('session'));
        session.name = users[userIndex].name;
        localStorage.setItem('session', JSON.stringify(session));
    } catch (e) {
        console.error('Error updating session:', e);
    }
    
    // Update trips if name changed
    if (updates.name && updates.name !== currentUser.name) {
        updateHostNameInTrips(currentUser.id, updates.name);
    }
    
    return true;
}

// Compress image using canvas
function compressImage(base64String) {
    const maxSize = 500 * 1024; // 500KB limit
    
    // If already small enough, return as is
    if (base64String.length < maxSize) {
        console.log('Image size acceptable:', base64String.length);
        return base64String;
    }
    
    console.log('Image too large, attempting compression...');
    
    try {
        // Use canvas to compress
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.src = base64String;
        
        // Set max dimensions
        const maxWidth = 400;
        const maxHeight = 400;
        
        let width = img.width || maxWidth;
        let height = img.height || maxHeight;
        
        // Scale down if needed
        if (width > height) {
            if (width > maxWidth) {
                height = Math.floor(height * maxWidth / width);
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width = Math.floor(width * maxHeight / height);
                height = maxHeight;
            }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        // Compress with decreasing quality
        let quality = 0.7;
        let compressedData = canvas.toDataURL('image/jpeg', quality);
        
        // Keep reducing quality until under size limit
        while (compressedData.length > maxSize && quality > 0.1) {
            quality -= 0.1;
            compressedData = canvas.toDataURL('image/jpeg', quality);
        }
        
        console.log('Compression result: original', base64String.length, 'compressed', compressedData.length, 'quality', quality);
        return compressedData;
    } catch (error) {
        console.error('Compression failed:', error);
        // Return original if compression fails
        return base64String;
    }
}

// Update host name in all trips
function updateHostNameInTrips(userId, newName) {
    const trips = getTrips();
    const updated = trips.map(trip => {
        if (trip.hostId === userId) {
            return { ...trip, hostName: newName };
        }
        return trip;
    });
    localStorage.setItem('trips', JSON.stringify(updated));
}

// Get user stats
function getUserStats(userId) {
    const trips = getTrips();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.id === userId);
    
    const hostedTrips = trips.filter(t => t.hostId === userId);
    const joinedTrips = trips.filter(t => t.participants && t.participants.includes(userId));
    const totalParticipants = hostedTrips.reduce((sum, trip) => {
        return sum + (trip.participants ? trip.participants.length : 0);
    }, 0);
    
    return {
        karma: user ? user.karma || 0 : 0,
        tripsHosted: hostedTrips.length,
        tripsJoined: joinedTrips.length,
        totalParticipants: totalParticipants
    };
}
