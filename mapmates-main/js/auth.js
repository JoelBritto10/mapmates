// ==================== Authentication Module ====================

// Initialize localStorage if not exists
function initAuth() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
}

// Sign up new user
function signup(name, email, password) {
    initAuth();
    
    const users = JSON.parse(localStorage.getItem('users'));
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'Email already registered' };
    }
    
    // Create new user
    const newUser = {
        id: generateId(),
        name: name,
        email: email,
        password: password, // In real app, this should be hashed
        karma: 0,
        bio: '',
        profilePicture: '',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    const session = {
        userId: newUser.id,
        email: newUser.email,
        name: newUser.name
    };
    localStorage.setItem('session', JSON.stringify(session));
    
    return { success: true, user: newUser };
}

// Log in user
function login(email, password) {
    initAuth();
    
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return false;
    }
    
    // Create session
    const session = {
        userId: user.id,
        email: user.email,
        name: user.name
    };
    localStorage.setItem('session', JSON.stringify(session));
    
    return true;
}

// Log out user
function logout() {
    localStorage.removeItem('session');
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('session') !== null;
}

// Get current user
function getCurrentUser() {
    if (!isLoggedIn()) {
        return null;
    }
    
    const session = JSON.parse(localStorage.getItem('session'));
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.id === session.userId);
    
    return user;
}

// Check authentication and redirect if needed
function checkAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
