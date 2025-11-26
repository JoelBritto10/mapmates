# 🗺️ MapMates - Travel Companion Web Application

MapMates is a complete web application built with HTML, CSS, and JavaScript that connects travelers and adventure enthusiasts. Similar to Meetup, but with enhanced features including real-time location mapping and a karma points system for trip hosts.

## ✨ Features

### Core Features
- **User Authentication**: Signup, login, and logout functionality
- **Trip Management**: Create, edit, delete, and browse trips
- **Real-Time Map**: View all trips on an interactive Google Maps interface
- **Karma Points System**: Earn points for hosting trips and attracting participants
- **Messaging System**: Chat with other travelers in real-time
- **User Profiles**: Customize your profile with bio and stats

### Karma Points
- **+10 points** for each trip created
- **+5 points** for each user who joins your trip
- Unlock badges as you earn more karma:
  - 🌱 Beginner (0 points)
  - 🗺️ Explorer (50 points)
  - ⛰️ Adventurer (100 points)
  - 🏆 Legend (200 points)
  - 👑 Master (500 points)

## 📁 Project Structure

```
mapmates/
├── index.html              # Landing page
├── login.html              # Login page
├── signup.html             # Signup page
├── home.html               # Trips feed (main page)
├── create-trip.html        # Create new trip
├── edit-trip.html          # Edit existing trip
├── map.html                # Real-time map view
├── profile.html            # User profile
├── karma.html              # Karma points & badges
├── chat.html               # Messaging/chat
├── logout.html             # Logout page
├── css/
│   └── styles.css          # All styles (responsive)
└── js/
    ├── auth.js             # Authentication logic
    ├── trips.js            # Trip management
    ├── map.js              # Google Maps integration
    ├── profile.js          # Profile management
    └── chat.js             # Messaging system
```

## 🚀 Getting Started

### Option 1: Simple File Opening
1. Open `index.html` in your web browser
2. Click "Sign up" to create an account
3. Start exploring and creating trips!

### Option 2: Local Server (Recommended)
For better performance, use a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

**Using Node.js (http-server):**
```bash
# Install globally
npm install -g http-server

# Run server
http-server

# Then open: http://localhost:8080
```

**Using PHP:**
```bash
php -S localhost:8000
```

**Using VS Code Live Server:**
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## 🗺️ Google Maps Setup

To enable the interactive map feature:

1. **Get API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable "Google Maps JavaScript API"
   - Create credentials (API Key)

2. **Add API Key:**
   - Open `js/map.js`
   - Replace `YOUR_API_KEY` with your actual API key:
   ```javascript
   const GOOGLE_MAPS_API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';
   ```

3. **Add Coordinates to Trips:**
   - When creating trips, include latitude and longitude
   - Example coordinates:
     - San Francisco: 37.7749, -122.4194
     - New York: 40.7128, -74.0060
     - London: 51.5074, -0.1278
     - Tokyo: 35.6762, 139.6503

**Note:** The map page works without an API key (shows a list view), but the interactive map requires a valid Google Maps API key.

## 💾 Data Storage

All data is stored locally in your browser using `localStorage`:

- **Users**: User accounts, profiles, karma points
- **Trips**: All trip information and participants
- **Messages**: Chat conversations
- **Session**: Current logged-in user

**Important:** Data is stored per browser. Clearing browser data will delete all information.

## 📱 Responsive Design

MapMates is fully responsive and works on:
- 📱 Mobile devices (phones)
- 📱 Tablets
- 💻 Desktop computers
- 🖥️ Large screens

## 🎨 Features Walkthrough

### 1. Landing Page (`index.html`)
- Beautiful gradient hero section
- Feature highlights
- Sign up / Log in options

### 2. Authentication
- **Signup** (`signup.html`): Create new account with name, email, password
- **Login** (`login.html`): Secure login system
- **Logout** (`logout.html`): Clear session

### 3. Home - Trips Feed (`home.html`)
- Browse all available trips
- See trip details (image, title, date, location, host)
- Join trips with one click
- Hosts earn karma when users join

### 4. Create Trip (`create-trip.html`)
- Upload image URL
- Add trip details (title, description, location)
- Set date and time
- Optional: Add coordinates for map display
- Earn +10 karma points

### 5. Edit Trip (`edit-trip.html`)
- Update trip information
- Delete trips
- Only available for trip hosts

### 6. Map View (`map.html`)
- Interactive Google Maps display
- Markers for all trips with coordinates
- Click markers to view trip details
- Fallback list view without API key

### 7. Profile (`profile.html`)
- View your stats (karma, trips hosted, trips joined)
- Edit profile (name, bio, profile picture)
- See all your hosted trips

### 8. Karma Points (`karma.html`)
- View total karma points
- See current badge/rank
- Understand how to earn points
- Track all badges and achievements

### 9. Messages (`chat.html`)
- Community chat room
- Direct messages with other users
- Real-time messaging interface
- Conversation history

## 🛠️ Customization

### Change Colors
Edit `css/styles.css` and modify CSS variables:
```css
:root {
    --primary-color: #00798A;      /* Main brand color */
    --secondary-color: #f65858;    /* Accent color */
    --text-dark: #212529;          /* Dark text */
    --text-light: #6c757d;         /* Light text */
}
```

### Add Default Trips
You can add sample trips for testing. Add this to browser console:
```javascript
localStorage.setItem('trips', JSON.stringify([
    {
        id: 'trip1',
        hostId: 'user1',
        hostName: 'John Doe',
        title: 'Hiking in Yosemite',
        description: 'Amazing weekend hiking adventure!',
        location: 'Yosemite National Park, CA',
        date: '2025-12-15T10:00',
        latitude: 37.8651,
        longitude: -119.5383,
        image: 'https://via.placeholder.com/400x250',
        participants: [],
        createdAt: new Date().toISOString()
    }
]));
```

## 🔒 Security Notes

**Important:** This is a demonstration application with client-side only authentication.

For production use, you should:
- Implement server-side authentication
- Hash passwords (currently stored in plain text)
- Use a real database instead of localStorage
- Add HTTPS/SSL
- Implement CSRF protection
- Add rate limiting
- Validate all inputs server-side

## 🐛 Troubleshooting

### Map Not Showing
- Check if you added your Google Maps API key in `js/map.js`
- Ensure API key has Google Maps JavaScript API enabled
- Check browser console for errors

### Data Not Persisting
- Ensure localStorage is enabled in your browser
- Check if you're in private/incognito mode (data won't persist)
- Verify browser storage isn't full

### Trips Not Displaying
- Open browser console (F12)
- Check for JavaScript errors
- Try clearing localStorage and creating new data

### Images Not Loading
- Use valid image URLs (must be publicly accessible)
- Use https:// URLs for images
- Check CORS policies if hosting images elsewhere

## 📝 Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🚀 Deployment

You can deploy this app for free on:

1. **GitHub Pages**
   - Push code to GitHub repository
   - Enable GitHub Pages in repository settings
   - Access at: `https://yourusername.github.io/mapmates`

2. **Netlify**
   - Drag and drop the folder to Netlify
   - Get instant deployment

3. **Vercel**
   - Import GitHub repository
   - Automatic deployment

4. **Firebase Hosting**
   ```bash
   firebase init hosting
   firebase deploy
   ```

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork and improve! Some ideas:
- Add photo upload functionality
- Implement advanced search/filters
- Add trip categories
- Create group chats for trips
- Add notifications system
- Implement trip ratings/reviews
- Add social sharing features

## 📧 Support

For questions or issues, please check:
1. This README file
2. Browser console for errors
3. Verify all files are in correct locations

## 🎉 Enjoy MapMates!

Start connecting with travelers and exploring the world together! 🌍✈️

---

**Built with ❤️ using HTML, CSS, and JavaScript**
