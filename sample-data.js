// ==================== Sample Data for MapMates ====================
// Copy this code and run it in your browser console to add sample data
// To open console: Press F12, then click "Console" tab

// IMPORTANT: This will add sample users and trips to your app
// Run this BEFORE creating your own account for the best experience

(function loadSampleData() {
    console.log('🗺️ Loading MapMates sample data...');
    
    // Sample Users
    const sampleUsers = [
        {
            id: 'user_sample_1',
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            password: 'password123',
            karma: 85,
            bio: 'Adventure seeker and outdoor enthusiast. Love hiking, camping, and exploring new places!',
            profilePicture: '',
            createdAt: '2025-11-01T10:00:00.000Z'
        },
        {
            id: 'user_sample_2',
            name: 'Mike Chen',
            email: 'mike@example.com',
            password: 'password123',
            karma: 120,
            bio: 'Travel photographer and food lover. Always looking for the next great adventure!',
            profilePicture: '',
            createdAt: '2025-11-05T14:30:00.000Z'
        },
        {
            id: 'user_sample_3',
            name: 'Emma Davis',
            email: 'emma@example.com',
            password: 'password123',
            karma: 65,
            bio: 'Beach lover and sunset chaser. Let\'s explore the coast together!',
            profilePicture: '',
            createdAt: '2025-11-10T09:15:00.000Z'
        },
        {
            id: 'user_sample_4',
            name: 'Alex Rodriguez',
            email: 'alex@example.com',
            password: 'password123',
            karma: 45,
            bio: 'City explorer and culture enthusiast. Museums, galleries, and urban adventures!',
            profilePicture: '',
            createdAt: '2025-11-15T16:45:00.000Z'
        }
    ];
    
    // Sample Trips
    const sampleTrips = [
        {
            id: 'trip_sample_1',
            hostId: 'user_sample_1',
            hostName: 'Sarah Johnson',
            title: 'Weekend Hiking in Yosemite',
            description: 'Join me for an incredible weekend hiking adventure in Yosemite National Park! We\'ll explore beautiful trails, see stunning waterfalls, and camp under the stars. Perfect for nature lovers and outdoor enthusiasts. Bring your hiking boots and camping gear!',
            location: 'Yosemite National Park, California',
            date: '2025-12-20T08:00:00',
            latitude: 37.8651,
            longitude: -119.5383,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
            participants: ['user_sample_2', 'user_sample_3'],
            createdAt: '2025-11-18T10:00:00.000Z'
        },
        {
            id: 'trip_sample_2',
            hostId: 'user_sample_2',
            hostName: 'Mike Chen',
            title: 'Food Tour: San Francisco',
            description: 'Discover the best food spots in San Francisco! We\'ll visit iconic restaurants, food trucks, and hidden gems. From sourdough bread to authentic dim sum, this culinary adventure will delight your taste buds. Come hungry!',
            location: 'San Francisco, California',
            date: '2025-12-15T12:00:00',
            latitude: 37.7749,
            longitude: -122.4194,
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop',
            participants: ['user_sample_1', 'user_sample_4'],
            createdAt: '2025-11-19T14:30:00.000Z'
        },
        {
            id: 'trip_sample_3',
            hostId: 'user_sample_3',
            hostName: 'Emma Davis',
            title: 'Beach Sunset Photography',
            description: 'Calling all photography enthusiasts! Join me for a magical sunset photography session at Venice Beach. We\'ll capture stunning golden hour shots, share photography tips, and enjoy the beautiful California coast. All skill levels welcome!',
            location: 'Venice Beach, Los Angeles',
            date: '2025-12-18T17:00:00',
            latitude: 33.9850,
            longitude: -118.4695,
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop',
            participants: ['user_sample_2'],
            createdAt: '2025-11-20T09:00:00.000Z'
        },
        {
            id: 'trip_sample_4',
            hostId: 'user_sample_4',
            hostName: 'Alex Rodriguez',
            title: 'Museum Hopping in NYC',
            description: 'Explore the incredible museums of New York City! We\'ll visit the Met, MoMA, and the Natural History Museum. Perfect for art and culture lovers. Let\'s immerse ourselves in world-class art, history, and science together!',
            location: 'Manhattan, New York',
            date: '2025-12-22T10:00:00',
            latitude: 40.7614,
            longitude: -73.9776,
            image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&h=250&fit=crop',
            participants: ['user_sample_1', 'user_sample_3'],
            createdAt: '2025-11-21T11:00:00.000Z'
        },
        {
            id: 'trip_sample_5',
            hostId: 'user_sample_1',
            hostName: 'Sarah Johnson',
            title: 'Grand Canyon Adventure',
            description: 'Experience the breathtaking Grand Canyon! This 3-day trip includes hiking the South Rim trails, watching spectacular sunrises, and exploring one of the world\'s most amazing natural wonders. An unforgettable adventure awaits!',
            location: 'Grand Canyon, Arizona',
            date: '2026-01-05T07:00:00',
            latitude: 36.1069,
            longitude: -112.1129,
            image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=400&h=250&fit=crop',
            participants: ['user_sample_4'],
            createdAt: '2025-11-22T13:00:00.000Z'
        },
        {
            id: 'trip_sample_6',
            hostId: 'user_sample_2',
            hostName: 'Mike Chen',
            title: 'Yellowstone Wildlife Safari',
            description: 'Join me for an incredible wildlife watching experience in Yellowstone! We\'ll look for bison, elk, bears, and wolves while exploring this amazing national park. Bring your camera and binoculars for this once-in-a-lifetime adventure!',
            location: 'Yellowstone National Park, Wyoming',
            date: '2026-01-10T06:00:00',
            latitude: 44.4280,
            longitude: -110.5885,
            image: 'https://images.unsplash.com/photo-1566404791232-af9fe0ae8f8b?w=400&h=250&fit=crop',
            participants: [],
            createdAt: '2025-11-23T15:00:00.000Z'
        },
        {
            id: 'trip_sample_7',
            hostId: 'user_sample_3',
            hostName: 'Emma Davis',
            title: 'Miami Beach Volleyball',
            description: 'Fun beach volleyball session at South Beach! All skill levels welcome. We\'ll play some games, enjoy the sun, and maybe grab some smoothies afterward. Perfect way to stay active and meet new friends!',
            location: 'South Beach, Miami',
            date: '2025-12-28T15:00:00',
            latitude: 25.7907,
            longitude: -80.1300,
            image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=250&fit=crop',
            participants: ['user_sample_1', 'user_sample_2'],
            createdAt: '2025-11-24T10:00:00.000Z'
        },
        {
            id: 'trip_sample_8',
            hostId: 'user_sample_4',
            hostName: 'Alex Rodriguez',
            title: 'Seattle Coffee Shop Tour',
            description: 'Explore Seattle\'s best coffee shops and learn about the city\'s coffee culture! We\'ll visit 5-6 unique cafes, try different brewing methods, and enjoy some great conversations. Coffee lovers unite!',
            location: 'Seattle, Washington',
            date: '2025-12-30T09:00:00',
            latitude: 47.6062,
            longitude: -122.3321,
            image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=250&fit=crop',
            participants: ['user_sample_3'],
            createdAt: '2025-11-25T12:00:00.000Z'
        }
    ];
    
    // Sample Messages (Community Chat)
    const sampleMessages = {
        'community': [
            {
                id: 'msg_1',
                chatId: 'community',
                senderId: 'user_sample_1',
                senderName: 'Sarah Johnson',
                content: 'Hey everyone! So excited to be part of MapMates! 🎉',
                timestamp: '2025-11-20T10:00:00.000Z',
                read: true
            },
            {
                id: 'msg_2',
                chatId: 'community',
                senderId: 'user_sample_2',
                senderName: 'Mike Chen',
                content: 'Welcome Sarah! This community is amazing. Looking forward to our food tour!',
                timestamp: '2025-11-20T10:15:00.000Z',
                read: true
            },
            {
                id: 'msg_3',
                chatId: 'community',
                senderId: 'user_sample_3',
                senderName: 'Emma Davis',
                content: 'Anyone interested in beach activities? I\'m planning more events soon! 🏖️',
                timestamp: '2025-11-20T11:30:00.000Z',
                read: true
            },
            {
                id: 'msg_4',
                chatId: 'community',
                senderId: 'user_sample_4',
                senderName: 'Alex Rodriguez',
                content: 'The museum tour was fantastic last time! Can\'t wait for the next one.',
                timestamp: '2025-11-20T14:00:00.000Z',
                read: true
            },
            {
                id: 'msg_5',
                chatId: 'community',
                senderId: 'user_sample_1',
                senderName: 'Sarah Johnson',
                content: 'Just posted a new trip to Grand Canyon! Who\'s joining? 🏜️',
                timestamp: '2025-11-22T13:30:00.000Z',
                read: false
            }
        ]
    };
    
    // Load data into localStorage
    try {
        // Get existing data
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const existingTrips = JSON.parse(localStorage.getItem('trips') || '[]');
        const existingMessages = JSON.parse(localStorage.getItem('messages') || '{}');
        
        // Merge with sample data (avoid duplicates)
        const allUsers = [...existingUsers];
        sampleUsers.forEach(sampleUser => {
            if (!allUsers.find(u => u.id === sampleUser.id)) {
                allUsers.push(sampleUser);
            }
        });
        
        const allTrips = [...existingTrips];
        sampleTrips.forEach(sampleTrip => {
            if (!allTrips.find(t => t.id === sampleTrip.id)) {
                allTrips.push(sampleTrip);
            }
        });
        
        const allMessages = { ...existingMessages, ...sampleMessages };
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(allUsers));
        localStorage.setItem('trips', JSON.stringify(allTrips));
        localStorage.setItem('messages', JSON.stringify(allMessages));
        
        console.log('✅ Sample data loaded successfully!');
        console.log(`📊 Added ${sampleUsers.length} users`);
        console.log(`🗺️ Added ${sampleTrips.length} trips`);
        console.log(`💬 Added community messages`);
        console.log('');
        console.log('🎉 You can now:');
        console.log('   - Browse sample trips on the home page');
        console.log('   - Log in with any sample user:');
        console.log('     Email: sarah@example.com, Password: password123');
        console.log('     Email: mike@example.com, Password: password123');
        console.log('     Email: emma@example.com, Password: password123');
        console.log('     Email: alex@example.com, Password: password123');
        console.log('');
        console.log('💡 Tip: Refresh the page to see the changes!');
        
        return true;
    } catch (error) {
        console.error('❌ Error loading sample data:', error);
        return false;
    }
})();
