# 🚀 Quick Start Guide - MapMates

## Get Started in 3 Easy Steps!

### Step 1: Open the Application
Simply open `index.html` in your web browser:
- **Windows**: Right-click `index.html` → Open with → Your Browser
- **Mac**: Double-click `index.html`
- **Or**: Drag `index.html` into your browser window

### Step 2: Create Your Account
1. Click "Sign up" on the landing page
2. Enter your details:
   - Full Name: Your name
   - Email: Any email format (e.g., user@example.com)
   - Password: At least 6 characters
3. Click "Create account"
4. You'll be automatically logged in!

### Step 3: Start Exploring!
You can now:
- ✅ Browse existing trips on the Home page
- ✅ Create your first trip (+ Create trip button)
- ✅ View your profile and karma points
- ✅ Chat with the community
- ✅ Check out the map (add coordinates to your trips!)

---

## 📍 Creating Your First Trip

1. Click "+ Create trip" from the home page
2. Fill in the details:
   - **Trip Title**: "Weekend Hiking Adventure"
   - **Description**: "Join us for an amazing hike!"
   - **Location**: "Yosemite National Park, CA"
   - **Date & Time**: Choose any future date
   - **Latitude**: 37.8651 (optional, for map)
   - **Longitude**: -119.5383 (optional, for map)
   - **Image URL**: Leave blank or use: `https://via.placeholder.com/400x250`
3. Click "Create trip"
4. **You just earned +10 karma points!** 🎉

---

## 🗺️ Popular Coordinates for Testing

Use these coordinates when creating trips:

| Location | Latitude | Longitude |
|----------|----------|-----------|
| **San Francisco, CA** | 37.7749 | -122.4194 |
| **New York, NY** | 40.7128 | -74.0060 |
| **Grand Canyon, AZ** | 36.1069 | -112.1129 |
| **Yellowstone, WY** | 44.4280 | -110.5885 |
| **Miami Beach, FL** | 25.7907 | -80.1300 |
| **Seattle, WA** | 47.6062 | -122.3321 |
| **Austin, TX** | 30.2672 | -97.7431 |

---

## 💡 Tips & Tricks

### Earn More Karma
- Create trips = +10 points each
- When someone joins your trip = +5 points
- Unlock badges at: 50, 100, 200, and 500 points!

### Test with Multiple Users
1. Open the app in a regular browser window
2. Sign up as User 1
3. Open the app in an incognito/private window
4. Sign up as User 2
5. Now User 2 can join User 1's trips!

### Using the Map
- Add latitude/longitude to trips to see them on the map
- The map shows a list by default
- For interactive Google Maps, add API key in `js/map.js`

### Chat Feature
- "Community Chat" is available for everyone
- Create direct messages with other users
- All messages are saved in your browser

---

## 🎨 What You Can Do

✅ **User Management**
- Sign up and log in
- Edit your profile (name, bio, picture)
- View your stats and karma

✅ **Trip Features**
- Browse all trips
- Create new trips
- Edit your trips
- Delete your trips
- Join other people's trips

✅ **Karma System**
- Earn points for hosting
- Earn points when people join
- View badges and achievements
- Track your progress

✅ **Map Integration**
- See all trip locations
- Click markers for details
- Visual trip discovery

✅ **Messaging**
- Community chat room
- Direct messages
- Real-time conversations

---

## 🔧 Running with Local Server (Optional)

For the best experience, use a local server:

### Using Python (Easiest)
```bash
# Navigate to mapmates folder
cd c:\Users\britt\Desktop\mapmates

# Start server (Python 3)
python -m http.server 8000

# Open browser to:
# http://localhost:8000
```

### Using Node.js
```bash
# Install http-server globally (one time)
npm install -g http-server

# Navigate to mapmates folder
cd c:\Users\britt\Desktop\mapmates

# Start server
http-server

# Open browser to:
# http://localhost:8080
```

### Using VS Code
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## 📱 Try It On Your Phone!

If using a local server:
1. Make sure your phone and computer are on the same WiFi
2. Find your computer's IP address:
   - Windows: `ipconfig` in cmd
   - Mac/Linux: `ifconfig`
3. On your phone, go to: `http://YOUR_IP:8000`
   - Example: `http://192.168.1.100:8000`

---

## 🎯 Sample Trip Ideas

Get creative with these trip ideas:
- 🏔️ Mountain Hiking Adventures
- 🏖️ Beach Weekend Getaways
- 🍕 Food Tour in the City
- 🎨 Art Gallery Visits
- 🚴 Cycling Tours
- 🎭 Theater & Shows Meetup
- ☕ Coffee Shop Hopping
- 📸 Photography Walks
- 🌅 Sunrise/Sunset Viewing
- 🎵 Concert Buddy Groups

---

## ❓ Common Questions

**Q: Is my data saved?**
A: Yes! Everything is saved in your browser's localStorage.

**Q: Can I use this with friends?**
A: Yes! Deploy it online (GitHub Pages, Netlify) or use a local server.

**Q: Do I need Google Maps?**
A: No! The app works without it. Maps show a list view by default.

**Q: Can I customize the design?**
A: Absolutely! Edit `css/styles.css` to change colors and styles.

**Q: How do I reset everything?**
A: Open browser console (F12) and run: `localStorage.clear()`

---

## 🎉 You're All Set!

Start exploring MapMates and connect with fellow travelers!

**Have fun creating trips and earning karma! 🗺️✨**
