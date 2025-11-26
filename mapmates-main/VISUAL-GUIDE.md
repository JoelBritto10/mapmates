# MapMates Navigation - Visual Guide

## User Journey

### 🏠 From Home Page

```
┌─────────────────────────────────────┐
│  MapMates Home                      │
│  ─────────────────────────────────  │
│                                     │
│  [Trip Card]                        │
│  ┌───────────────────────────────┐  │
│  │ [Trip Image]                  │  │
│  │ Weekend Hiking Adventure      │  │
│  │ 📍 Yosemite National Park     │  │
│  │ Hosted by John                │  │
│  │                               │  │
│  │ [Join trip]  [🧭 Navigate] ←─┼──┼─── Click here
│  └───────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
         │
         │ Click Navigate
         ↓
┌─────────────────────────────────────┐
│  MapMates Map Page                  │
│  ─────────────────────────────────  │
│                                     │
│  ┌──────────────────┐  ┌──────────┐│
│  │                  │  │ Distance:││
│  │   [Map Display]  │  │ 1.5 miles││
│  │  Blue dot (you)  │  │ Time:    ││
│  │  Red pin (trip)  │  │ 22 mins  ││
│  │  Route drawn     │  │          ││
│  │                  │  │ Directions:
│  │                  │  │ 1. Head north
│  └──────────────────┘  │ 2. Turn right
│                         │ 3. Continue 0.5mi
│  Route info at bottom   │ ...
│                         └──────────┘
└─────────────────────────────────────┘
```

### 🗺️ From Map Page

```
┌─────────────────────────────────────┐
│  MapMates Map                       │
│  Click on markers to view details   │
│  ─────────────────────────────────  │
│                                     │
│  ┌──────────────────┐              │
│  │   [Map Display]  │              │
│  │  🔵 Your location                │ (Blue dot)
│  │                  │              │
│  │  🔴 Trip 1 ←─────┼─ Click marker
│  │  🔵 Trip 2       │              │
│  │  🟡 Trip 3       │              │
│  │                  │              │
│  └──────────────────┘              │
│         │                          │
│         │ Click marker             │
│         ↓                          │
│  ┌─────────────────────────────┐  │
│  │ Info Window:                │  │
│  │ [Trip Image]                │  │
│  │ Weekend Hiking Adventure    │  │
│  │ 📍 Yosemite National Park   │  │
│  │ Hosted by John              │  │
│  │                             │  │
│  │ [🧭 Navigate] [View Details]│  │
│  └─────────────────────────────┘  │
│         │                          │
│         │ Click Navigate           │
│         ↓                          │
│  ┌──────────────────┐  ┌────────┐ │
│  │   Route shown    │  │Distance:  │
│  │  on map          │  │1.5 miles  │
│  │  From → To       │  │Time:22min │
│  │                  │  │           │
│  └──────────────────┘  └────────┘ │
│                                     │
│  [Directions Panel] (right side)    │
│  Shows step-by-step directions     │
│                                     │
└─────────────────────────────────────┘
```

## Screen Layout

### Map Page with Navigation Active

```
┌─────────────────────────────────────────────┐
│  🗺️ MapMates  [Trips] [Map✓] [Messages]    │
├─────────────────────────────────────────────┤
│ Trip Locations - Click markers to navigate  │
├────────────────┬──────────────────────────┬─┤
│                │                          │D│
│  [MAP DISPLAY] │                          │i│
│  With:         │  Directions Panel        │r│
│  • Blue dot    │  (when active)           │e│
│  • Colored     │                          │c│
│    markers     │  📍 Directions to:       │t│
│  • Route line  │     Weekend Hiking       │i│
│  • Traffic     │                          │o│
│    info        │  Distance: 1.5 miles    │n│
│                │  Duration: 22 minutes    │s│
│                │                          ││
│                │  Steps:                  │P│
│                │  1. Head north on Main   │a│
│                │  2. Turn right at 5th    │n│
│                │  3. Continue 0.5 miles   │e│
│                │  4. Destination on right │l│
│                │                          ││
│                │  [End Navigation]        ││
└────────────────┴──────────────────────────┴─┘
│ 📍 Route Info:                               │
│ Distance: 1.5 miles | Duration: 22 minutes  │
│ From: Your Location | To: Yosemite Park    │
└─────────────────────────────────────────────┘
```

## Feature Locations

### Navigation Button Visibility

```
Home Page Trip Card:
┌────────────────────────┐
│ [Trip Image]           │
│ Trip Title             │
│ 📍 Location            │
│ Host Info              │
│ ─────────────────────  │
│ If trip HAS coords:    │
│ [Join] [🧭 Navigate]   │ ← Shows here
│                        │
│ If trip NO coords:     │
│ [Join]                 │ ← Doesn't show
└────────────────────────┘

Map Info Window:
┌─────────────────────────┐
│ [Trip Image]            │
│ Trip Title              │
│ 📍 Location             │
│ Date/Host info          │
│ ─────────────────────── │
│ [🧭 Navigate] [Details] │ ← Always shows
└─────────────────────────┘
```

## Data Flow with Maps

```
Trip Data (localStorage)
    ↓
    ├─ id, title, location
    ├─ latitude, longitude
    ├─ image (base64)
    └─ hostName, date
    
    ↓ Create Markers
    
Trip Markers on Map
    ├─ Position: (lat, lng)
    ├─ Color: Random (red, blue, yellow, green, purple)
    ├─ Animation: DROP
    └─ InfoWindow: Trip details + Navigate button
    
    ↓ User clicks Navigate
    
Get User Location (Geolocation API)
    ├─ Lat: 37.7749
    └─ Lng: -122.4194
    
    ↓ Calculate Route
    
Directions API Request
    ├─ Origin: User location
    ├─ Destination: Trip location
    └─ Mode: DRIVING
    
    ↓ Get Results
    
Route Response
    ├─ Distance: "1.5 miles"
    ├─ Duration: "22 minutes"
    ├─ Steps: [ {instruction, distance}, ... ]
    └─ Route polyline
    
    ↓ Display
    
Map + Directions Panel
    ├─ Map: Route drawn, markers shown
    ├─ Panel: Step-by-step directions
    └─ Info: Distance & duration
```

## Component Hierarchy

```
MapMates Application
│
├─ Home Page
│  └─ Trip Cards
│     ├─ Trip Image
│     ├─ Trip Info
│     ├─ Join Button
│     └─ Navigate Button ← NEW
│
├─ Map Page
│  ├─ Map Display (Google Maps)
│  │  ├─ Trip Markers (colored)
│  │  ├─ User Location Marker (blue)
│  │  └─ Route Polyline
│  │
│  ├─ Directions Panel ← NEW
│  │  ├─ Route Info (distance, time)
│  │  ├─ Step-by-Step Instructions
│  │  └─ End Navigation Button
│  │
│  ├─ Route Info Display ← NEW
│  │  ├─ Distance
│  │  ├─ Duration
│  │  └─ Destination
│  │
│  └─ Trip Locations List
│     ├─ Trip Items
│     └─ Navigate Buttons ← NEW
│
└─ JavaScript Modules
   ├─ map.js (UPDATED)
   │  ├─ loadGoogleMapsScript()
   │  ├─ initMap()
   │  ├─ addTripMarkers()
   │  ├─ startNavigation()
   │  ├─ endNavigation()
   │  ├─ getUserLocation()
   │  └─ ... more functions
   │
   ├─ auth.js (existing)
   ├─ trips.js (existing)
   └─ home.html (UPDATED)
      └─ navigateToTrip() ← NEW
```

## State Management

```
Navigation State:
{
  currentNavigation: {
    tripId: "trip-123",
    trip: { ... },
    destination: {
      lat: 37.8651,
      lng: -119.5383
    }
  }
}

Session Storage (for home→map navigation):
{
  navigationTripId: "trip-123"
}

User Location State:
{
  userLocation: {
    lat: 37.7749,
    lng: -122.4194
  }
}

Map Objects:
{
  map: GoogleMap,
  markers: [Marker1, Marker2, ...],
  directionsService: DirectionsService,
  directionsRenderer: DirectionsRenderer
}
```

## API Response Example

```javascript
Directions API Response:
{
  routes: [{
    legs: [{
      distance: { value: 2400, text: "1.5 miles" },
      duration: { value: 1320, text: "22 minutes" },
      steps: [
        {
          html_instructions: "Head <b>north</b> on <b>Main St</b>",
          distance: { text: "0.3 mi" },
          duration: { text: "1 min" }
        },
        {
          html_instructions: "Turn <b>right</b> at <b>5th Ave</b>",
          distance: { text: "0.7 mi" },
          duration: { text: "2 mins" }
        },
        // ... more steps
      ]
    }]
  }]
}
```

## Marker Colors

```
Trip 1 → 🔴 Red
Trip 2 → 🔵 Blue
Trip 3 → 🟡 Yellow
Trip 4 → 🟢 Green
Trip 5 → 🟣 Purple
Trip 6+ → 🔴 Red (cycles)

User Location → 🔵 Blue (light blue dot)
```

## Button States

### Home Page Navigate Button
```
Trip HAS Coordinates:
┌──────────────────┐
│ 🧭 Navigate      │  ← Visible, Green
│ (clickable)      │
└──────────────────┘

Trip NO Coordinates:
┌──────────────────┐
│ (hidden)         │  ← Not shown
└──────────────────┘
```

### Navigation Active States
```
During Navigation:
┌──────────────────────┐
│ End Navigation       │  ← Active
│ (clickable)          │
│                      │
│ Distance: 1.5 mi     │
│ Time: 22 mins        │
└──────────────────────┘

After Navigation Ends:
┌──────────────────────┐
│ (empty)              │  ← Cleared
└──────────────────────┘
```

## Mobile Responsive Design

```
Desktop (1024px+):
┌──────────────────┬──────────┐
│   Map (70%)      │ Panel    │
│                  │ (30%)    │
│                  │          │
└──────────────────┴──────────┘

Tablet (768px):
┌──────────────────────────────┐
│         Map (100%)           │
├──────────────────────────────┤
│   Panel (stacked below)      │
└──────────────────────────────┘

Mobile (< 768px):
┌──────────────────┐
│   Map (full)     │
│                  │
│  (Panel hidden   │
│   or toggled)    │
└──────────────────┘
```

## Complete User Journey Flowchart

```
                           START
                             │
                    User opens MapMates
                             │
                ┌────────────┴────────────┐
                │                         │
           Home Page              Map Page
                │                         │
                │               Click Marker
                │                    │
         Trip with Coords?    ┌──────┘
         Yes │  No            │
             │   │      Info Window Shown
          [Navigate]          │
             │                │ Has Coords?
          [Button]       Yes │  No
         Visible │          │   │
             │   │       [Navigate]
             │   └──No navigation  │
             │                    │
             ├────────────────────┘
             │
        Click Navigate
             │
    Set sessionStorage
             │
   Redirect to Map
             │
        Map Page Loads
             │
   checkAutoNavigation()
             │
  loadGoogleMapsScript()
             │
   Wait for Maps API
             │
    Google Maps Loaded
             │
   getUserLocation()
             │
    Show Blue Dot
             │
  addTripMarkers()
             │
  Show Colored Markers
             │
 (auto-run if sessionStorage set)
   startNavigation(tripId)
             │
   Calculate Route
             │
  Display Directions
             │
  Show Route on Map
             │
     Navigation Active
             │
User follows directions
             │
  (Real-time updates)
             │
   User reaches destination
             │
  Click "End Navigation"
             │
   Clear Route
             │
   Navigation Ended
             │
             END
```
