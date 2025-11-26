# 🗺️ Google Maps API Setup Guide

## Current Status
✅ **API Key is configured in `js/map.js`**

The application is now set up to use Google Maps with an API key. The interactive map should work immediately!

---

## What's Configured

The following file has the API key set up:
- **File**: `js/map.js`
- **Line 13**: `const GOOGLE_MAPS_API_KEY = 'AIzaSyBn-O_acrlZJdQPMW_e8QgUD4ZlOe-ER2c';`

---

## Features Enabled

✅ **Interactive Google Map Display**
- Zoom and pan controls
- Street View
- Satellite/Map view toggle

✅ **Real-Time Location Tracking**
- Blue dot shows your current location
- Updates as you move
- High accuracy positioning

✅ **Trip Markers**
- Color-coded markers for each trip
- Click markers to see trip details
- Auto-fit view to show all trips

✅ **Turn-by-Turn Navigation**
- Calculate routes between your location and trips
- Show distance and estimated time
- Step-by-step directions panel
- Draw route on map

✅ **Navigation from Home Page**
- Click "🧭 Navigate" button on trip cards
- Automatically loads map with route calculated

---

## How to Use

### Step 1: Open the Application
1. Start the MapMates app
2. Log in with your account

### Step 2: Go to Map Page
1. Click **"Map"** in the navigation bar
2. **Allow location permission** when browser asks
   - This enables the blue dot (your location) to appear

### Step 3: View Trips
- You'll see the Google Map with:
  - Your location (blue dot)
  - Trip markers (colored dots)
  - All trip locations visible

### Step 4: Navigate to a Trip

**Option A: From Home Page**
1. Click the green "🧭 Navigate" button on any trip card
2. Map page automatically opens with route

**Option B: From Map Page**
1. Click on any trip marker
2. Click "🧭 Navigate" in the popup
3. Route appears with directions

### Step 5: View Directions
- Right side panel shows turn-by-turn directions
- See distance and estimated travel time
- Click "End Navigation" to clear route

---

## Using Your Own API Key (Optional)

If you want to use a different API key or create a new one:

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with Google account
3. Create new project (name: "MapMates" or your choice)

### Step 2: Enable Required APIs
1. Search for **"Google Maps JavaScript API"** → Enable
2. Search for **"Directions API"** → Enable
3. Search for **"Geocoding API"** → Enable

### Step 3: Create API Key
1. Go to **Credentials** section
2. Click **"+ Create Credentials"** → **"API Key"**
3. Copy the generated key (looks like: `AIzaSy...`)

### Step 4: Add to MapMates
1. Open `js/map.js` in your editor
2. Find line 13: `const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY';`
3. Replace with your key:
   ```javascript
   const GOOGLE_MAPS_API_KEY = 'YOUR_NEW_API_KEY_HERE';
   ```
4. Save file
5. Reload the app - interactive map will work!

### Step 5: Secure Your Key (Recommended)
1. In Google Cloud Console, go to your API key
2. Click **"API restrictions"**
3. Select **"Restrict key"**
4. For **Application restrictions**:
   - Select **"HTTP referrers (web sites)"`
   - Add your domain(s):
     - Local: `http://localhost/*`
     - Production: `https://yourdomain.com/*`
5. Save restrictions

---

## Troubleshooting

### Map doesn't appear
**Issue**: Gray box instead of map
- Solution: Check browser console (F12) for errors
- Verify API key is valid
- Ensure APIs are enabled in Google Cloud Console
- Try refreshing page

### Location (blue dot) doesn't show
**Issue**: No blue dot on map
- Solution:
  1. Click "Allow" when browser asks for location permission
  2. Check that GPS/location is enabled on device
  3. Check browser console for geolocation errors
  4. Try WiFi instead of mobile data

### Directions don't calculate
**Issue**: "Could not calculate directions" error
- Solutions:
  1. Ensure trip has valid latitude/longitude
  2. Check your location is detected (blue dot visible)
  3. Zoom out to see both origin and destination
  4. Check browser console for API errors

### "Oops! Something went wrong" error
**Issue**: Map shows error message
- Solutions:
  1. API key may be invalid or expired
  2. API key may have restrictions preventing access
  3. Required APIs not enabled in Google Cloud Console
  4. Check console (F12) for specific error messages

---

## API Key Security Tips

🔒 **Protect Your API Key**
- Never commit API key to public GitHub
- Use restrictions to limit key usage
- Rotate keys periodically
- Monitor usage in Google Cloud Console

🛡️ **Best Practices**
- Use HTTP referrer restrictions
- Set daily quota limits
- Create separate keys for development/production
- Enable billing alerts

---

## File Structure

```
mapmates-main/
├── js/
│   ├── map.js                    # ⭐ API key is here (line 13)
│   ├── trips.js                  # Trip data
│   ├── auth.js                   # Authentication
│   └── profile.js                # Profile management
├── map.html                       # Map page
├── home.html                      # Trip listing with navigate button
└── GOOGLE-MAPS-API-SETUP.md      # This file
```

---

## What's Working ✅

- [x] Google Map displays
- [x] Zoom and pan controls
- [x] Real-time location (blue dot)
- [x] Trip markers appear
- [x] Click markers for info
- [x] Turn-by-turn navigation
- [x] Directions panel
- [x] Route calculation
- [x] Navigation from home page
- [x] Distance and time display
- [x] No UI conflicts
- [x] Mobile-friendly

---

## Support Resources

**Google Maps API Documentation:**
- [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Directions Service](https://developers.google.com/maps/documentation/javascript/directions)
- [Geolocation API](https://developers.google.com/maps/documentation/javascript/geolocation)

**Troubleshooting:**
- [Common Issues](https://developers.google.com/maps/troubleshoot)
- [Authentication Errors](https://developers.google.com/maps/gmp-get-started)

---

## Next Steps

1. ✅ API key is configured
2. 🚀 Open the app and go to Map page
3. 📍 Allow location permission
4. 🧭 Test navigation on trip cards
5. 🎉 Enjoy real-time trip navigation!

---

**Your MapMates app is ready to use with full Google Maps integration!** 🗺️

Need help? Check the console (F12) for detailed error messages or refer to the troubleshooting section above.
