export const Package_Blueprints = [
    {
        hotelSuffix: "Comfort Inn",
        tripType: "relaxation",
        duration: 3,
        titlePool: [
            "Budget Escape Package",
            "Smart Saver Retreat",
            "Easy Holiday Package",
            "Weekend Comfort Escape",
            "Affordable Relaxation Deal",
        ],
        priceMultiplier: 2.1,
    },
    {
        hotelSuffix: "Royal Residency",
        tripType: "family",
        duration: 4,
        titlePool: [
            "Family Delight Package",
            "Family Fun Retreat",
            "Classic Holiday Escape",
            "Happy Family Getaway",
            "Comfort Family Vacation",
        ],
        priceMultiplier: 2.7,
    },
    {
        hotelSuffix: "Skyline Suites",
        tripType: "adventure",
        duration: 5,
        titlePool: [
            "Adventure Trails Package",
            "Explorer Special Package",
            "Thrill Escape Package",
            "Scenic Adventure Retreat",
            "Outdoor Discovery Package",
        ],
        priceMultiplier: 3.3,
    },
    {
        hotelSuffix: "Heritage Villa",
        tripType: "honeymoon",
        duration: 6,
        titlePool: [
            "Romantic Premium Retreat",
            "Honeymoon Bliss Package",
            "Couple Escape Package",
            "Love and Leisure Retreat",
            "Romantic Sunset Getaway",
        ],
        priceMultiplier: 4.0,
    },
    {
        hotelSuffix: "Grand Palace",
        tripType: "cultural",
        duration: 5,
        titlePool: [
            "Heritage Explorer Package",
            "Cultural Immersion Retreat",
            "History and Art Escape",
            "Classic Culture Package",
            "Landmark Discovery Tour",
        ],
        priceMultiplier: 3.5,
    },
    {
        hotelSuffix: "Nature Resort",
        tripType: "wildlife",
        duration: 4,
        titlePool: [
            "Wildlife Safari Package",
            "Nature Explorer Retreat",
            "Jungle Discovery Escape",
            "Wild Encounter Package",
            "Forest Adventure Getaway",
        ],
        priceMultiplier: 3.2,
    },
    {
        hotelSuffix: "The Pinnacle",
        tripType: "luxury",
        duration: 7,
        titlePool: [
            "Premium Luxury Escape",
            "Elite Getaway Package",
            "Signature Luxury Retreat",
            "Grand Indulgence Package",
            "Exclusive Holiday Experience",
        ],
        priceMultiplier: 4.8,
    },
    {
        hotelSuffix: "Garden Retreat",
        tripType: "wellness",
        duration: 5,
        titlePool: [
            "Wellness Rejuvenation Package",
            "Mindful Escape Retreat",
            "Yoga and Relaxation Package",
            "Healing Holiday Escape",
            "Spa and Serenity Package",
        ],
        priceMultiplier: 3.6,
    },
    {
        hotelSuffix: "Urban Stay",
        tripType: "city",
        duration: 3,
        titlePool: [
            "City Explorer Package",
            "Urban Holiday Escape",
            "Metro Discovery Package",
            "City Break Retreat",
            "Downtown Experience Package",
        ],
        priceMultiplier: 2.4,
    },
    {
        hotelSuffix: "Boutique Nest",
        tripType: "romantic",
        duration: 4,
        titlePool: [
            "Romantic Boutique Escape",
            "Couple Getaway Package",
            "Love Story Retreat",
            "Intimate Holiday Package",
            "Sweet Escape for Two",
        ],
        priceMultiplier: 3.4,
    },
    {
        hotelSuffix: "Lakeview Lodge",
        tripType: "scenic",
        duration: 5,
        titlePool: [
            "Scenic Splendour Package",
            "Lakeview Retreat Escape",
            "Nature Panorama Package",
            "Peaceful Scenic Getaway",
            "Landscape Discovery Retreat",
        ],
        priceMultiplier: 3.3,
    },
    {
        hotelSuffix: "The Crest",
        tripType: "honeymoon",
        duration: 8,
        titlePool: [
            "Luxury Honeymoon Package",
            "Premium Couple Retreat",
            "Grand Romance Escape",
            "Blissful Honeymoon Experience",
            "Signature Couple Package",
        ],
        priceMultiplier: 5.0,
    },
    {
        hotelSuffix: "Mountain Echo",
        tripType: "adventure",
        duration: 6,
        titlePool: [
            "Mountain Adventure Package",
            "High Altitude Escape",
            "Peak Explorer Retreat",
            "Summit Thrills Package",
            "Alpine Discovery Getaway",
        ],
        priceMultiplier: 3.8,
    },
    {
        hotelSuffix: "Palm Residency",
        tripType: "beach",
        duration: 5,
        titlePool: [
            "Beach Paradise Package",
            "Coastal Bliss Retreat",
            "Sun and Sand Escape",
            "Beachfront Holiday Package",
            "Tropical Shore Getaway",
        ],
        priceMultiplier: 3.5,
    },
    {
        hotelSuffix: "Golden Leaf Hotel",
        tripType: "cultural",
        duration: 7,
        titlePool: [
            "Grand Cultural Journey",
            "Heritage and History Package",
            "Art and Culture Retreat",
            "Timeless Traditions Escape",
            "Cultural Odyssey Package",
        ],
        priceMultiplier: 4.2,
    },

    // ── Newly added to cover the 10 previously orphaned hotel suffixes ───────
    {
        // Budget Stay (budget, ₹4,800/night) → short family-friendly city break
        hotelSuffix: "Budget Stay",
        tripType: "city",
        duration: 4,
        titlePool: [
            "Value City Break Package",
            "Smart City Explorer Deal",
            "Budget City Getaway",
            "Affordable Urban Escape",
            "Economy City Discovery Package",
        ],
        priceMultiplier: 2.0,
    },
    {
        // Sunset Manor (villa, ₹20,500/night) → premium romantic villa retreat
        hotelSuffix: "Sunset Manor",
        tripType: "romantic",
        duration: 5,
        titlePool: [
            "Villa Romance Retreat",
            "Sunset Couple Escape",
            "Private Manor Getaway",
            "Romantic Villa Experience",
            "Golden Hour Couple Package",
        ],
        priceMultiplier: 4.5,
    },
    {
        // Classic Stays (standard, ₹8,900/night) → relaxed family sightseeing
        hotelSuffix: "Classic Stays",
        tripType: "family",
        duration: 5,
        titlePool: [
            "Classic Family Holiday",
            "All-Round Family Escape",
            "Family Explorer Package",
            "Traditional Family Retreat",
            "Comfort Family Journey",
        ],
        priceMultiplier: 2.8,
    },
    {
        // Emerald Suites (luxury, ₹17,800/night) → upscale wellness retreat
        hotelSuffix: "Emerald Suites",
        tripType: "wellness",
        duration: 6,
        titlePool: [
            "Luxury Wellness Retreat",
            "Emerald Spa Escape",
            "Premium Rejuvenation Package",
            "Elite Wellness Journey",
            "Holistic Luxury Getaway",
        ],
        priceMultiplier: 4.3,
    },
    {
        // Horizon Hotel (standard, ₹10,200/night) → scenic nature break
        hotelSuffix: "Horizon Hotel",
        tripType: "scenic",
        duration: 4,
        titlePool: [
            "Horizon Scenic Escape",
            "Panoramic Views Package",
            "Open Skies Retreat",
            "Scenic Horizon Getaway",
            "Viewpoint Discovery Package",
        ],
        priceMultiplier: 2.9,
    },
    {
        // The Courtyard (boutique, ₹12,000/night) → cultural boutique experience
        hotelSuffix: "The Courtyard",
        tripType: "cultural",
        duration: 4,
        titlePool: [
            "Boutique Culture Package",
            "Courtyard Heritage Retreat",
            "Artisan Cultural Escape",
            "Historic Boutique Getaway",
            "Local Culture Discovery Deal",
        ],
        priceMultiplier: 3.1,
    },
    {
        // Silver Oak Inn (budget, ₹5,800/night) → budget adventure short trip
        hotelSuffix: "Silver Oak Inn",
        tripType: "adventure",
        duration: 3,
        titlePool: [
            "Budget Adventure Escape",
            "Silver Oak Thrill Package",
            "Value Explorer Retreat",
            "Pocket-Friendly Adventure Deal",
            "Quick Thrills Package",
        ],
        priceMultiplier: 2.2,
    },
    {
        // The Marquee (luxury, ₹24,000/night) → ultimate luxury honeymoon
        hotelSuffix: "The Marquee",
        tripType: "honeymoon",
        duration: 7,
        titlePool: [
            "Grand Marquee Honeymoon",
            "Ultra-Luxury Couple Retreat",
            "Marquee Romance Package",
            "Prestige Honeymoon Escape",
            "Supreme Couple Getaway",
        ],
        priceMultiplier: 5.5,
    },
    {
        // Harbor View (standard, ₹9,400/night) → beach and coastal leisure
        hotelSuffix: "Harbor View",
        tripType: "beach",
        duration: 4,
        titlePool: [
            "Harbor Beach Escape",
            "Waterfront Leisure Package",
            "Coastal Comfort Retreat",
            "Seaside Relaxation Deal",
            "Harbor Sun and Sand Package",
        ],
        priceMultiplier: 3.0,
    },
    {
        // Tranquil Spa Resort (resort, ₹17,200/night) → deep wellness and wildlife
        hotelSuffix: "Tranquil Spa Resort",
        tripType: "wildlife",
        duration: 5,
        titlePool: [
            "Spa and Safari Package",
            "Tranquil Nature Retreat",
            "Wildlife Wellness Escape",
            "Resort Safari Experience",
            "Eco Wellness Discovery Package",
        ],
        priceMultiplier: 4.0,
    },
];

export const Itinerary_Templates = {
    relaxation: [
        {
            title: "Arrival and Leisure Check-in",
            description: (locationName, hotelName) =>
                `Arrive in ${locationName}, complete your hotel check-in at ${hotelName}, relax, and enjoy a peaceful evening with local surroundings and hotel comfort.`,
        },
        {
            title: "Local Sightseeing and Relaxation",
            description: (locationName, hotelName) =>
                `Explore popular attractions in ${locationName}, enjoy local experiences, and return to ${hotelName} for a relaxing evening stay.`,
        },
        {
            title: "Free Time and Departure",
            description: () =>
                `Enjoy breakfast, spend some leisure time exploring nearby places or shopping areas, and complete your departure with beautiful travel memories.`,
        },
        {
            title: "Scenic Exploration and Comfort Stay",
            description: (locationName, hotelName) =>
                `Visit scenic and popular spots of ${locationName}, enjoy a stress-free day, and unwind at ${hotelName} with premium hospitality.`,
        },
        {
            title: "Recreation and Local Experiences",
            description: () =>
                `Spend the day enjoying relaxing activities, local food, and nearby attractions before returning to the hotel for overnight comfort.`,
        },
        {
            title: "Final Leisure Morning and Checkout",
            description: (locationName, hotelName) =>
                `Enjoy your final morning in ${locationName}, have breakfast, and complete checkout from ${hotelName} with a refreshing holiday experience.`,
        },
        {
            title: "Spa and Wellness Day",
            description: (locationName, hotelName) =>
                `Dedicate the day to self-care with spa treatments, meditation, and leisure walks around ${locationName} before retiring comfortably at ${hotelName}.`,
        },
        {
            title: "Sunset and Evening Leisure",
            description: (locationName) =>
                `Head to the best sunset viewpoint in ${locationName}, enjoy local evening cuisine, and spend a quiet, rejuvenating night in peace.`,
        },
    ],

    family: [
        {
            title: "Arrival and Family Check-in",
            description: (locationName, hotelName) =>
                `Arrive in ${locationName}, check in at ${hotelName}, settle in comfortably, and enjoy a relaxed evening suitable for the whole family.`,
        },
        {
            title: "Family Sightseeing Tour",
            description: (locationName, hotelName) =>
                `Visit major family-friendly attractions in ${locationName}, enjoy quality time together, and return to ${hotelName} for a restful night.`,
        },
        {
            title: "Culture and Local Fun",
            description: () =>
                `Explore cultural highlights, local shopping, and food experiences while spending memorable time with your family throughout the day.`,
        },
        {
            title: "Leisure and Recreation Day",
            description: (locationName) =>
                `Enjoy a lighter day with hotel relaxation, family-friendly activities, and optional visits to nearby popular attractions in ${locationName}.`,
        },
        {
            title: "Free Time and Exploration",
            description: () =>
                `Spend quality time as a family exploring local markets, scenic spots, and comfortable spaces before returning to the hotel.`,
        },
        {
            title: "Departure with Family Memories",
            description: (locationName, hotelName) =>
                `Enjoy breakfast, complete checkout from ${hotelName}, and depart from ${locationName} with wonderful family travel memories.`,
        },
        {
            title: "Kids Activity and Theme Day",
            description: (locationName) =>
                `Plan a day full of child-friendly experiences in ${locationName}, including games, local shows, and interactive experiences for the whole family.`,
        },
        {
            title: "Nature and Picnic Day",
            description: (locationName) =>
                `Pack a picnic and explore the natural parks or scenic areas of ${locationName}, making memories with your loved ones amid beautiful surroundings.`,
        },
    ],

    adventure: [
        {
            title: "Arrival and Adventure Preparation",
            description: (locationName, hotelName) =>
                `Arrive in ${locationName}, check in at ${hotelName}, and prepare for an exciting adventure experience with a relaxed evening stay.`,
        },
        {
            title: "Outdoor Exploration Day",
            description: (locationName) =>
                `Enjoy thrilling sightseeing, outdoor activities, and energetic exploration of major attractions and natural highlights in ${locationName}.`,
        },
        {
            title: "Adventure and Scenic Discovery",
            description: (locationName, hotelName) =>
                `Continue exploring the adventurous side of ${locationName} with scenic experiences, memorable activities, and a comfortable hotel return.`,
        },
        {
            title: "Local Attractions and Activity Time",
            description: (locationName) =>
                `Visit famous places, engage in activity-based experiences, and enjoy the vibrant environment of ${locationName} throughout the day.`,
        },
        {
            title: "Relaxed Exploration and Shopping",
            description: (locationName, hotelName) =>
                `Spend the day balancing adventure with local shopping, food experiences, and leisure before returning to ${hotelName}.`,
        },
        {
            title: "Checkout and Return Journey",
            description: (locationName, hotelName) =>
                `Enjoy breakfast, complete checkout from ${hotelName}, and depart from ${locationName} after an adventurous and satisfying holiday.`,
        },
        {
            title: "Extreme Sports and Thrills",
            description: (locationName) =>
                `Push your limits with an adrenaline-filled day of extreme sports or trekking available in ${locationName}, guided by local experts.`,
        },
        {
            title: "Sunrise Trek and Photography",
            description: (locationName) =>
                `Wake up before dawn for an exhilarating sunrise trek in ${locationName}, capturing breathtaking views and creating unforgettable adventure memories.`,
        },
    ],

    honeymoon: [
        {
            title: "Romantic Arrival and Check-in",
            description: (locationName, hotelName) =>
                `Arrive in ${locationName}, check in at ${hotelName}, and enjoy a peaceful romantic evening in a premium and cozy atmosphere.`,
        },
        {
            title: "Couple Sightseeing Experience",
            description: (locationName) =>
                `Explore beautiful attractions in ${locationName}, enjoy special couple moments, and return to the hotel for a comfortable stay.`,
        },
        {
            title: "Leisure and Romantic Free Time",
            description: () =>
                `Spend quality time together with relaxing experiences, scenic visits, and a memorable day designed for couples and honeymoon travelers.`,
        },
        {
            title: "Premium Relaxation Day",
            description: (locationName, hotelName) =>
                `Enjoy the comfort and luxury of ${hotelName}, optional local experiences, and a slow romantic day in ${locationName}.`,
        },
        {
            title: "Scenic Couple Activities",
            description: () =>
                `Discover charming places, take beautiful photos, enjoy local dining, and create unforgettable memories together during your stay.`,
        },
        {
            title: "Departure with Romantic Memories",
            description: (locationName, hotelName) =>
                `Have breakfast, complete checkout from ${hotelName}, and depart from ${locationName} with cherished honeymoon memories.`,
        },
        {
            title: "Candlelit Dinner and Stargazing",
            description: (locationName, hotelName) =>
                `Enjoy a specially arranged candlelit dinner at ${hotelName} followed by stargazing under the open skies of ${locationName}, crafting a truly magical evening.`,
        },
        {
            title: "Spa Day for Two",
            description: (locationName, hotelName) =>
                `Indulge in a couple's spa day at ${hotelName}, with soothing treatments, relaxing baths, and gentle massages set to the backdrop of beautiful ${locationName}.`,
        },
    ],

    cultural: [
        {
            title: "Arrival and Cultural Welcome",
            description: (locationName, hotelName) =>
                `Arrive in ${locationName}, check in at ${hotelName}, and begin your trip with a comfortable evening and local cultural atmosphere.`,
        },
        {
            title: "Heritage and Landmark Visit",
            description: (locationName) =>
                `Explore iconic cultural places, heritage landmarks, and local traditions that make ${locationName} a special destination.`,
        },
        {
            title: "Local Market and Food Experience",
            description: (locationName) =>
                `Enjoy local food, shopping, and authentic cultural interactions while discovering the spirit of ${locationName}.`,
        },
        {
            title: "Historic Exploration Day",
            description: () =>
                `Visit more historic attractions, monuments, and traditional areas while enjoying a smooth and comfortable travel plan.`,
        },
        {
            title: "Leisure and Cultural Reflection",
            description: (locationName) =>
                `Spend a lighter day revisiting favorite places, shopping for souvenirs, and enjoying the charm of ${locationName}.`,
        },
        {
            title: "Departure and Final Exploration",
            description: (locationName, hotelName) =>
                `Complete your final sightseeing or shopping, then check out from ${hotelName} and depart from ${locationName} with meaningful travel memories.`,
        },
        {
            title: "Museum and Art Gallery Day",
            description: (locationName) =>
                `Spend the day visiting the finest museums, galleries, and cultural institutions in ${locationName}, immersing yourself in history and local artistry.`,
        },
        {
            title: "Folklore, Music and Cuisine Night",
            description: (locationName) =>
                `Experience an authentic evening of folk performances, traditional music, and regional cuisine that brings the spirit of ${locationName} to life.`,
        },
    ],

    wildlife: [
        {
            title: "Arrival and Safari Briefing",
            description: (locationName, hotelName) =>
                `Arrive in ${locationName}, check in at ${hotelName}, and receive a detailed briefing on wildlife safari rules, timings, and what to expect.`,
        },
        {
            title: "Morning Safari Drive",
            description: (locationName) =>
                `Set out early for an exciting morning game drive in ${locationName}, guided by expert naturalists spotting birds, mammals, and flora.`,
        },
        {
            title: "Nature Walk and Birdwatching",
            description: (locationName) =>
                `Join a guided nature walk through the forests of ${locationName}, discovering rare birds, insects, and the hidden ecosystem.`,
        },
        {
            title: "Evening Safari and Campfire",
            description: (locationName, hotelName) =>
                `Enjoy a thrilling evening safari in ${locationName} and return to ${hotelName} for a warm campfire, storytelling, and wildlife-themed dinner.`,
        },
        {
            title: "Wildlife Conservation Visit",
            description: (locationName) =>
                `Visit a local wildlife conservation center in ${locationName}, learn about endangered species, and engage in responsible eco-tourism activities.`,
        },
        {
            title: "Final Safari and Departure",
            description: (locationName, hotelName) =>
                `Enjoy one last morning game drive before checking out from ${hotelName} and departing ${locationName} with unforgettable wildlife memories.`,
        },
        {
            title: "Photography Safari",
            description: (locationName) =>
                `Join a specialized wildlife photography safari in ${locationName} to capture stunning frames of animals in their natural habitat.`,
        },
        {
            title: "River or Lake Safari",
            description: (locationName) =>
                `Explore the waterways and wetlands of ${locationName} on a boat safari, spotting crocodiles, hippos, or exotic water birds up close.`,
        },
    ],

    luxury: [
        {
            title: "Grand Arrival and VIP Check-in",
            description: (locationName, hotelName) =>
                `Arrive in ${locationName} to a warm VIP welcome, private transfer, and seamless butler-assisted check-in at the prestigious ${hotelName}.`,
        },
        {
            title: "Private City Tour",
            description: (locationName) =>
                `Enjoy an exclusive private tour of ${locationName}'s finest landmarks, guided by a personal expert with luxury transport throughout the day.`,
        },
        {
            title: "Gourmet Dining Experience",
            description: (locationName, hotelName) =>
                `Savour a curated multi-course gourmet meal at ${hotelName}'s signature restaurant, featuring the finest local and international flavours of ${locationName}.`,
        },
        {
            title: "Luxury Spa and Wellness Day",
            description: (locationName, hotelName) =>
                `Spend a full day at ${hotelName}'s world-class spa, enjoying premium therapies, hydrotherapy, and holistic wellness treatments in ${locationName}.`,
        },
        {
            title: "Exclusive Experience Day",
            description: (locationName) =>
                `Access exclusive experiences in ${locationName} — private yacht rides, helicopter tours, or VIP cultural events available only to select guests.`,
        },
        {
            title: "Sunset Fine Dining and Farewell",
            description: (locationName, hotelName) =>
                `Toast to an extraordinary holiday with a rooftop sunset dinner at ${hotelName}, before a comfortable checkout and departure from ${locationName}.`,
        },
        {
            title: "Private Island or Resort Day",
            description: (locationName, hotelName) =>
                `Enjoy a fully private resort or island experience arranged by ${hotelName} for guests seeking the pinnacle of seclusion and luxury in ${locationName}.`,
        },
        {
            title: "Personal Concierge and Shopping Day",
            description: (locationName, hotelName) =>
                `Your personal concierge from ${hotelName} accompanies you through the finest boutiques, art galleries, and designer stores of ${locationName}.`,
        },
    ],

    wellness: [
        {
            title: "Wellness Arrival and Orientation",
            description: (locationName, hotelName) =>
                `Arrive in ${locationName}, check in at ${hotelName}, and meet your personal wellness advisor for a tailored retreat plan and welcome herbal drink.`,
        },
        {
            title: "Sunrise Yoga and Meditation",
            description: (locationName) =>
                `Begin your morning with guided sunrise yoga and meditation sessions in the serene natural setting of ${locationName}.`,
        },
        {
            title: "Ayurvedic Spa and Treatment",
            description: (locationName, hotelName) =>
                `Receive authentic Ayurvedic body treatments and therapeutic massages at ${hotelName}'s spa, designed to restore balance and inner harmony in ${locationName}.`,
        },
        {
            title: "Nature Healing Walk",
            description: (locationName) =>
                `Take a guided healing walk through the forests, hills, or beaches of ${locationName}, practising mindfulness and connecting with nature.`,
        },
        {
            title: "Detox Nutrition and Cooking Class",
            description: (locationName, hotelName) =>
                `Participate in a healthy cooking workshop at ${hotelName}, learning to prepare nutritious, plant-based meals inspired by the local produce of ${locationName}.`,
        },
        {
            title: "Sound Therapy and Deep Relaxation",
            description: (locationName, hotelName) =>
                `Experience a group sound bath and guided deep relaxation session at ${hotelName}, allowing complete mental and physical rejuvenation in ${locationName}.`,
        },
        {
            title: "Breathwork and Journaling Session",
            description: (locationName) =>
                `Join a structured breathwork class followed by reflective journaling in the peaceful outdoors of ${locationName} to restore mental clarity.`,
        },
        {
            title: "Farewell Wellness Ceremony",
            description: (locationName, hotelName) =>
                `Conclude your retreat with a closing wellness ceremony at ${hotelName}, reviewing your personal growth and departing ${locationName} feeling renewed.`,
        },
    ],

    city: [
        {
            title: "City Arrival and Orientation",
            description: (locationName, hotelName) =>
                `Arrive in ${locationName}, check in at the centrally located ${hotelName}, and take an evening stroll to get your bearings in the city.`,
        },
        {
            title: "Iconic Landmarks Tour",
            description: (locationName) =>
                `Visit the must-see landmarks, monuments, and public spaces that define the character and charm of ${locationName}.`,
        },
        {
            title: "Food and Street Market Trail",
            description: (locationName) =>
                `Follow a curated food trail through the best street markets, food lanes, and café districts that ${locationName} is celebrated for.`,
        },
        {
            title: "Museums, Galleries and Culture",
            description: (locationName) =>
                `Spend the day exploring the cultural institutions, art galleries, and history museums that tell the story of ${locationName}.`,
        },
        {
            title: "Shopping and Nightlife",
            description: (locationName) =>
                `Browse local boutiques, malls, and artisan shops, then experience the vibrant evening scene and nightlife of ${locationName}.`,
        },
        {
            title: "Day Trip or Hidden Gems",
            description: (locationName) =>
                `Venture beyond the tourist trail with a day trip or exploration of the lesser-known neighbourhoods and hidden gems of ${locationName}.`,
        },
        {
            title: "Rooftop Views and Sunset Tour",
            description: (locationName) =>
                `Discover the best rooftop bars and panoramic viewpoints of ${locationName} for golden hour views of the skyline and a memorable city sunset.`,
        },
        {
            title: "Checkout and City Farewell",
            description: (locationName, hotelName) =>
                `Grab a final coffee, explore a morning market, and complete checkout from ${hotelName} before leaving ${locationName} with a city-lover's heart.`,
        },
    ],

    romantic: [
        {
            title: "Romantic Arrival and Welcome",
            description: (locationName, hotelName) =>
                `Arrive in ${locationName} to a curated romantic welcome at ${hotelName}, with fresh flowers, champagne, and a beautifully prepared suite.`,
        },
        {
            title: "Scenic Couple's Walk",
            description: (locationName) =>
                `Take a slow, hand-in-hand walk through the most picturesque corners of ${locationName}, stopping at viewpoints and hidden gardens along the way.`,
        },
        {
            title: "Private Boat or Carriage Ride",
            description: (locationName) =>
                `Enjoy an exclusive boat ride, carriage tour, or unique couple's excursion through the romantic landscapes of ${locationName}.`,
        },
        {
            title: "Candlelit Dinner Under the Stars",
            description: (locationName, hotelName) =>
                `Savour a specially curated candlelit dinner on the terrace or rooftop of ${hotelName}, overlooking the beautiful scenery of ${locationName}.`,
        },
        {
            title: "Spa and Relaxation for Two",
            description: (locationName, hotelName) =>
                `Enjoy a couple's spa ritual at ${hotelName} with personalised treatments, followed by a relaxing afternoon in ${locationName}.`,
        },
        {
            title: "Romantic Farewell Morning",
            description: (locationName, hotelName) =>
                `Begin your last morning in ${locationName} with a private breakfast in bed before checking out from ${hotelName} and carrying your love story forward.`,
        },
        {
            title: "Sunset Photography Session",
            description: (locationName) =>
                `Capture golden hour together with a guided photography session at the most romantic viewpoints and backdrops of ${locationName}.`,
        },
        {
            title: "Moonlit Cruise or Night Tour",
            description: (locationName) =>
                `Enjoy a magical moonlit cruise or night-time city tour through ${locationName}, celebrating love under the stars.`,
        },
    ],

    scenic: [
        {
            title: "Scenic Arrival and Orientation",
            description: (locationName, hotelName) =>
                `Arrive in ${locationName}, settle into the beautifully located ${hotelName}, and soak in the surrounding natural scenery on your first evening.`,
        },
        {
            title: "Panoramic Nature Drive",
            description: (locationName) =>
                `Embark on a panoramic driving or cycling route through the most visually stunning natural corridors and viewpoints of ${locationName}.`,
        },
        {
            title: "Sunrise Viewpoint Visit",
            description: (locationName) =>
                `Rise early to witness a breathtaking sunrise from the most scenic hilltop, lakeside, or coastal point in ${locationName}.`,
        },
        {
            title: "Lake, Valley or Mountain Trail",
            description: (locationName) =>
                `Choose from scenic walks along the lake, valley trails, or mountain paths of ${locationName} for a fulfilling communion with nature.`,
        },
        {
            title: "Photography and Sketch Day",
            description: (locationName) =>
                `Dedicate the day to capturing the natural beauty of ${locationName} through photography, sketching, or plein air painting at scenic stops.`,
        },
        {
            title: "Boat or Cable Car Experience",
            description: (locationName) =>
                `Experience ${locationName} from a new perspective — aboard a scenic boat cruise, cable car, or aerial ropeway through stunning natural terrain.`,
        },
        {
            title: "Waterfall or Meadow Exploration",
            description: (locationName) =>
                `Discover hidden waterfalls, flower meadows, or secluded natural retreats within the scenic landscapes of ${locationName}.`,
        },
        {
            title: "Scenic Farewell and Checkout",
            description: (locationName, hotelName) =>
                `Take one last panoramic walk, breathe in the fresh air, and check out from the scenic ${hotelName}, leaving ${locationName} with a heart full of nature's beauty.`,
        },
    ],

    beach: [
        {
            title: "Beach Arrival and Sunset Welcome",
            description: (locationName, hotelName) =>
                `Arrive in ${locationName}, check in at the beachfront ${hotelName}, freshen up, and head straight to the shore for a golden sunset welcome.`,
        },
        {
            title: "Morning Beach and Water Sports",
            description: (locationName) =>
                `Kick off your morning with swimming, surfing, snorkelling, or kayaking along the stunning coastline of ${locationName}.`,
        },
        {
            title: "Island Hopping or Snorkelling Trip",
            description: (locationName) =>
                `Join a guided island hopping cruise or snorkelling excursion around the clear waters and coral reefs surrounding ${locationName}.`,
        },
        {
            title: "Beachside Leisure and Spa",
            description: (locationName, hotelName) =>
                `Relax with a beachside massage, poolside lounging, and spa treatments at ${hotelName}, letting the sea breeze of ${locationName} melt your stress away.`,
        },
        {
            title: "Seafood Dining and Beach Night",
            description: (locationName) =>
                `Enjoy a fresh seafood dinner at a beachside restaurant followed by an evening bonfire or beach walk under the stars of ${locationName}.`,
        },
        {
            title: "Coastal Village Exploration",
            description: (locationName) =>
                `Visit charming fishing villages, local seafood markets, and scenic coastal viewpoints around ${locationName} for an authentic seaside experience.`,
        },
        {
            title: "Sunrise Beach Yoga",
            description: (locationName) =>
                `Start your morning with an open-air yoga session on the beach of ${locationName}, listening to the sound of waves as the sun rises.`,
        },
        {
            title: "Farewell Beach Day and Checkout",
            description: (locationName, hotelName) =>
                `Spend your final morning relaxing by the sea before checking out from ${hotelName} and departing ${locationName} with sandy toes and sun-kissed memories.`,
        },
    ],
};
