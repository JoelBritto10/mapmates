# Quick Start: Google Maps + Navigation

## 🚀 Get Started in 5 Minutes

### Step 1: Get Your API Key (2 minutes)
1. Go to: https://console.cloud.google.com/
2. Click "New Project" → name it "MapMates"
3. Go to **APIs & Services** → **Library**
4. Search and enable:
   - Google Maps JavaScript API ✓
   - Directions API ✓
   - Geocoding API ✓
5. Go to **Credentials** → **Create API Key**
6. Copy the key

### Step 2: Add API Key (1 minute)
1. Open `js/map.js`
2. Find: `const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY';` (line ~12)
3. Replace with your key:
   ```javascript
   const GOOGLE_MAPS_API_KEY = 'AIzaSyDu-YOUR-KEY-HERE';
   ```
4. Save file

### Step 3: Test Navigation (2 minutes)
1. Create a trip with coordinates (latitude, longitude)
   - Example: Latitude: 37.7749, Longitude: -122.4194
2. Go to Home page
3. Find your trip
4. Click "🧭 Navigate" (green button)
5. Allow location access when browser asks
6. You should see directions!

## ✨ Features

| Feature | Location | How To Use |
|---------|----------|-----------|
| View Map | Click "Map" in nav | See all trips on map |
| Navigate | "🧭 Navigate" button | Get directions to trip |
| Check Route | Directions panel | See distance & time |
| End Route | "End Navigation" button | Clear directions |

## 🗺️ Using Navigation

### From Home Page
```
Trip Card → 🧭 Navigate → Auto-loads Map with Directions
```

### From Map Page
```
Click Marker → Info Window → 🧭 Navigate → See Directions
```

## 🎯 Test Coordinates

Copy and paste these when creating test trips:

| Location | Lat | Lng |
|----------|-----|-----|
| San Francisco | 37.7749 | -122.4194 |
| New York | 40.7128 | -74.0060 |
| Los Angeles | 34.0522 | -118.2437 |
| London | 51.5074 | -0.1278 |
| Tokyo | 35.6762 | 139.6503 |

## ⚠️ Common Issues

**Q: No map showing?**
- A: Check API key in `js/map.js` (line 12)

**Q: "Geolocation error"?**
- A: Click allow when browser asks, or enable location in settings

**Q: Directions not calculating?**
- A: Make sure trip has latitude & longitude values

**Q: "API key not configured"?**
- A: Replace `YOUR_API_KEY` with actual key in `js/map.js`

## 📚 Full Guides

- **Detailed Setup**: See `GOOGLE-MAPS-SETUP.md`
- **Features Overview**: See `NAVIGATION-FEATURES.md`

## 💡 Tips

- Always add coordinates when creating trips for navigation to work
- Allow browser location access for best experience
- Use real coordinates for accurate directions
- Check browser console (F12) if things don't work

## 🔗 Useful Links

- [Google Cloud Console](https://console.cloud.google.com/)
- [Maps Pricing](https://mapsplatform.google.com/pricing/)
- [Maps Documentation](https://developers.google.com/maps)
