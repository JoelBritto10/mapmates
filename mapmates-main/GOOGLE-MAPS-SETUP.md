# Google Maps Setup Guide for MapMates

This guide will help you set up Google Maps with real-time turn-by-turn navigation for MapMates.

## Step 1: Create a Google Cloud Project

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "NEW PROJECT"
4. Enter "MapMates" as the project name
5. Click "CREATE"
6. Wait for the project to be created, then select it

## Step 2: Enable Required APIs

1. In the Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for and enable each of these APIs:

### 2.1 Google Maps JavaScript API
- Search for "Maps JavaScript API"
- Click on it
- Click the "ENABLE" button

### 2.2 Directions API
- Search for "Directions API"
- Click on it
- Click the "ENABLE" button

### 2.3 Geocoding API
- Search for "Geocoding API"
- Click on it
- Click the "ENABLE" button

### 2.4 (Optional) Places API
- Search for "Places API"
- Click on it
- Click the "ENABLE" button

## Step 3: Create an API Key

1. In Google Cloud Console, go to **APIs & Services** → **Credentials**
2. Click "CREATE CREDENTIALS" → "API Key"
3. A dialog will appear with your API key
4. Click the copy button to copy your key
5. Click "RESTRICT KEY" to set up restrictions (optional but recommended)

### Setting API Key Restrictions (Optional but Recommended)

1. Under "Application restrictions", select "HTTP referrers (web sites)"
2. Click "ADD AN HTTP REFERRER"
3. Enter your domain (e.g., `localhost`, `example.com`, etc.)
4. Click "SAVE"

### Setting API Restrictions

1. Under "Restrict API usage to select APIs"
2. Click "SELECT APIs"
3. Check these APIs:
   - Maps JavaScript API
   - Directions API
   - Geocoding API
   - Places API (if enabled)
4. Click "SAVE"

## Step 4: Add API Key to MapMates

1. Open `js/map.js` in the mapmates-main folder
2. Find this line (around line 12):
   ```javascript
   const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY';
   ```
3. Replace `'YOUR_API_KEY'` with your actual API key from Step 3
4. Save the file

Example:
```javascript
const GOOGLE_MAPS_API_KEY = 'AIzaSyDu-2vBCF8zF5F5F5F5F5F5F5F5F5F5F5F'; // Your actual key
```

## Step 5: Enable Geolocation

The navigation feature requires your browser to access your location. When you use the navigation feature:

1. Your browser will ask for permission to access your location
2. Click "Allow" to enable GPS tracking
3. The app will show your location as a blue dot on the map
4. Turn-by-turn directions will be calculated from your location to the trip destination

**Note:** Make sure your location is enabled in your device settings.

## Step 6: Test the Navigation

1. Create a trip with coordinates (latitude/longitude)
2. Go to the home page
3. Click the "🧭 Navigate" button on any trip with coordinates
4. Or go to the Map page and click a marker, then click "🧭 Navigate"
5. You should see:
   - Your current location (blue dot)
   - The destination (colored marker)
   - Turn-by-turn directions in the right panel
   - Route displayed on the map

## Navigation Features

### From Home Page
1. Click "🧭 Navigate" button on any trip card (only visible if trip has coordinates)
2. You'll be taken to the Map page with directions automatically loaded

### From Map Page
1. Click on any trip marker
2. In the info window, click "🧭 Navigate"
3. Directions will appear in the right panel

### Navigation Panel
- Shows detailed turn-by-turn directions
- Displays total distance and duration
- Click "End Navigation" to clear the route

## Troubleshooting

### API Key Not Working
- **Error**: "Google Maps API key not configured"
- **Solution**: Make sure you've added your API key correctly in `js/map.js`
- Check that all required APIs are enabled in Google Cloud Console

### No Map Displayed
- **Error**: Map appears blank or shows warning
- **Solution**: 
  - Check browser console for errors (F12)
  - Verify API key is correct
  - Make sure APIs are enabled
  - Check API quotas haven't been exceeded

### Geolocation Not Working
- **Error**: "Unable to determine your location"
- **Solution**:
  - Check if browser permission was denied
  - Enable location services on your device
  - Reload the page to re-request permission
  - Try using HTTPS (required for geolocation)

### Directions Not Calculating
- **Error**: "Could not calculate directions"
- **Solution**:
  - Verify the Directions API is enabled
  - Check that trip has valid coordinates
  - Ensure your device location is accessible

## API Quotas and Limits

Google Maps APIs have free quotas:
- **Maps JavaScript API**: 28,000 map loads per day
- **Directions API**: 25,000 requests per day
- **Geocoding API**: 5,000 requests per day

For production use, set up billing to ensure your app won't stop working if you exceed quotas.

## Cost Estimates

For most small applications:
- Maps JavaScript API: ~$0.50 per 1000 map loads after free quota
- Directions API: ~$0.50 per 1000 requests after free quota
- Geocoding API: ~$0.50 per 1000 requests after free quota

See [Google Maps Pricing](https://mapsplatform.google.com/pricing/) for details.

## Security Notes

1. **Never commit your API key to GitHub** - Add `js/map.js` to `.gitignore` if sharing the project
2. **Use API key restrictions** - Only allow your specific domains
3. **Monitor usage** - Check Google Cloud Console for unusual activity
4. **Rotate keys regularly** - Create new keys and disable old ones periodically

## Additional Resources

- [Google Maps JavaScript API Documentation](https://developers.google.com/maps/documentation/javascript)
- [Directions API Documentation](https://developers.google.com/maps/documentation/directions)
- [Geocoding API Documentation](https://developers.google.com/maps/documentation/geocoding)
- [Google Cloud Console](https://console.cloud.google.com/)

## Support

If you encounter issues:
1. Check the browser console (F12) for error messages
2. Review the troubleshooting section above
3. Check Google Maps documentation
4. Verify all APIs are enabled in Google Cloud Console
