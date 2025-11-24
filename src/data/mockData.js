// Mock Data for FitConnect Application
// Copy this entire file to src/data/mockData.js in your project

export const studios = [
  {
    id: 1,
    name: "ZenFlow Yoga Studio",
    type: "Yoga",
    location: "2847 N. Clark Street, Chicago, IL 60657",
    description: "A serene space dedicated to traditional and modern yoga practices. Our experienced instructors guide you through mindful movement and breath work.",
    amenities: ["Showers", "Lockers", "Mat Rental", "Parking", "Changing Rooms"],
    priceRange: "$$",
    rating: 4.8,
    reviewCount: 124,
    imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800",
    phone: "(312) 555-0198",
    email: "hello@zenflowstudio.com",
    hours: "Mon-Fri: 6am-9pm, Sat-Sun: 8am-6pm"
  },
  {
    id: 2,
    name: "PowerCycle Studio",
    type: "Cycling",
    location: "1523 W. Fullerton Ave, Chicago, IL 60614",
    description: "High-energy indoor cycling classes with motivating instructors and premium bikes. Ride to the beat and transform your fitness.",
    amenities: ["Showers", "Lockers", "Shoe Rental", "Towel Service", "Smoothie Bar"],
    priceRange: "$$$",
    rating: 4.9,
    reviewCount: 289,
    imageUrl: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800",
    phone: "(312) 555-0167",
    email: "ride@powercycle.com",
    hours: "Mon-Sun: 5:30am-8pm"
  },
  {
    id: 3,
    name: "CoreStrength Pilates",
    type: "Pilates",
    location: "890 W. Armitage Ave, Chicago, IL 60614",
    description: "Classical and contemporary Pilates on reformers and mats. Small class sizes ensure personalized attention and proper form.",
    amenities: ["Equipment Provided", "Lockers", "Private Sessions Available"],
    priceRange: "$$",
    rating: 4.7,
    reviewCount: 98,
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
    phone: "(312) 555-0143",
    email: "info@corestrength.com",
    hours: "Mon-Fri: 6am-8pm, Sat: 8am-4pm, Sun: Closed"
  },
  {
    id: 4,
    name: "Urban Boxing Club",
    type: "Boxing",
    location: "3421 N. Southport Ave, Chicago, IL 60657",
    description: "Technical boxing training meets high-intensity cardio. Learn proper technique while getting an incredible workout.",
    amenities: ["Gloves Rental", "Showers", "Lockers", "Heavy Bags", "Speed Bags"],
    priceRange: "$$",
    rating: 4.6,
    reviewCount: 156,
    imageUrl: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800",
    phone: "(312) 555-0189",
    email: "fight@urbanboxing.com",
    hours: "Mon-Fri: 6am-10pm, Sat-Sun: 8am-6pm"
  },
  {
    id: 5,
    name: "Rhythm Dance Collective",
    type: "Dance",
    location: "1678 N. Milwaukee Ave, Chicago, IL 60647",
    description: "Contemporary, hip-hop, and jazz dance classes for all levels. Express yourself through movement in a supportive environment.",
    amenities: ["Sprung Floors", "Sound System", "Mirrors", "Water Fountain"],
    priceRange: "$",
    rating: 4.9,
    reviewCount: 203,
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800",
    phone: "(312) 555-0176",
    email: "dance@rhythmcollective.com",
    hours: "Mon-Sat: 10am-9pm, Sun: 10am-5pm"
  },
  {
    id: 6,
    name: "HIIT Factory",
    type: "HIIT",
    location: "2156 W. Division Street, Chicago, IL 60622",
    description: "Intense, results-driven HIIT workouts that maximize calorie burn in minimal time. No two classes are ever the same.",
    amenities: ["Showers", "Towel Service", "Heart Rate Monitors", "Parking"],
    priceRange: "$$",
    rating: 4.7,
    reviewCount: 187,
    imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800",
    phone: "(312) 555-0192",
    email: "hello@hiitfactory.com",
    hours: "Mon-Fri: 5am-9pm, Sat-Sun: 7am-7pm"
  },
  {
    id: 7,
    name: "Serenity Barre Studio",
    type: "Barre",
    location: "945 W. Armitage Ave, Chicago, IL 60614",
    description: "Ballet-inspired barre workouts that sculpt and tone. Low-impact, high-intensity classes suitable for all fitness levels.",
    amenities: ["Grippy Socks Required", "Lockers", "Retail Boutique", "Childcare"],
    priceRange: "$$",
    rating: 4.8,
    reviewCount: 142,
    imageUrl: "https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=800",
    phone: "(312) 555-0134",
    email: "info@serenitybarre.com",
    hours: "Mon-Fri: 6am-7pm, Sat-Sun: 8am-2pm"
  },
  {
    id: 8,
    name: "FlowState Yoga & Meditation",
    type: "Yoga",
    location: "3782 N. Southport Ave, Chicago, IL 60613",
    description: "Traditional yoga practices combined with guided meditation. Find your flow and inner peace in our tranquil studio.",
    amenities: ["Meditation Room", "Tea Bar", "Mat Rental", "Props Provided"],
    priceRange: "$",
    rating: 4.9,
    reviewCount: 167,
    imageUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800",
    phone: "(312) 555-0156",
    email: "om@flowstateyoga.com",
    hours: "Mon-Sun: 6am-8pm"
  },
  {
    id: 9,
    name: "Martial Arts Academy",
    type: "Martial Arts",
    location: "2234 W. Belmont Ave, Chicago, IL 60618",
    description: "Traditional martial arts training including Karate, Taekwondo, and Jiu-Jitsu. Build discipline, confidence, and self-defense skills.",
    amenities: ["Equipment Provided", "Changing Rooms", "Belt Testing", "Kids Classes"],
    priceRange: "$$",
    rating: 4.7,
    reviewCount: 134,
    imageUrl: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800",
    phone: "(312) 555-0178",
    email: "train@maacademy.com",
    hours: "Mon-Fri: 4pm-9pm, Sat: 9am-3pm, Sun: Closed"
  },
  {
    id: 10,
    name: "The Strength Lab",
    type: "Strength Training",
    location: "1567 N. Damen Ave, Chicago, IL 60622",
    description: "Evidence-based strength training in a supportive group setting. Build muscle, increase metabolism, and feel empowered.",
    amenities: ["Olympic Platforms", "Free Weights", "Showers", "Nutrition Coaching"],
    priceRange: "$$$",
    rating: 4.8,
    reviewCount: 201,
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    phone: "(312) 555-0145",
    email: "lift@strengthlab.com",
    hours: "Mon-Fri: 5am-10pm, Sat-Sun: 7am-7pm"
  }
];

export const instructors = [
  {
    id: 1,
    name: "Sarah Mitchell",
    studioId: 1,
    specialties: ["Vinyasa Flow", "Yin Yoga", "Meditation"],
    bio: "Sarah has been practicing yoga for 15 years and teaching for 8. She believes in making yoga accessible to everyone, regardless of experience level.",
    certifications: ["RYT-500", "Meditation Teacher Training"],
    yearsExperience: 8,
    imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 4.9
  },
  {
    id: 2,
    name: "Marcus Johnson",
    studioId: 2,
    specialties: ["Spin", "HIIT Cycling", "Endurance"],
    bio: "Former competitive cyclist turned indoor cycling instructor. Marcus brings high energy and motivating playlists to every ride.",
    certifications: ["Spinning Certified", "CPR/AED"],
    yearsExperience: 6,
    imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 4.8
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    studioId: 3,
    specialties: ["Classical Pilates", "Reformer", "Prenatal"],
    bio: "Classically trained in the authentic Pilates method, Elena focuses on precision and control to help clients build functional strength.",
    certifications: ["PMA Certified", "Prenatal Pilates Specialist"],
    yearsExperience: 10,
    imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 4.9
  },
  {
    id: 4,
    name: "Troy Williams",
    studioId: 4,
    specialties: ["Boxing Technique", "Cardio Boxing", "Personal Training"],
    bio: "Amateur boxing champion with a passion for teaching proper form. Troy makes boxing accessible while keeping the intensity high.",
    certifications: ["USA Boxing Coach", "NASM CPT"],
    yearsExperience: 12,
    imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 4.7
  },
  {
    id: 5,
    name: "Jasmine Lee",
    studioId: 5,
    specialties: ["Hip Hop", "Contemporary", "Choreography"],
    bio: "Professional dancer and choreographer who has worked with touring artists. Jasmine creates fun, energetic classes that feel like a party.",
    certifications: ["Dance Teacher Certification", "ACE Group Fitness"],
    yearsExperience: 7,
    imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 5.0
  },
  {
    id: 6,
    name: "Derek Thompson",
    studioId: 6,
    specialties: ["HIIT", "Bootcamp", "Athletic Conditioning"],
    bio: "Former college athlete specializing in high-intensity interval training. Derek pushes you to your limits while keeping classes safe and effective.",
    certifications: ["NASM CPT", "TRX Certified", "CrossFit Level 1"],
    yearsExperience: 5,
    imageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
    rating: 4.8
  },
  {
    id: 7,
    name: "Amanda Foster",
    studioId: 7,
    specialties: ["Barre", "Ballet Fitness", "Stretching"],
    bio: "Former professional ballet dancer bringing authentic technique to barre fitness. Amanda's classes are challenging yet graceful.",
    certifications: ["Barre Above Certified", "Ballet Teacher Diploma"],
    yearsExperience: 9,
    imageUrl: "https://randomuser.me/api/portraits/women/7.jpg",
    rating: 4.9
  },
  {
    id: 8,
    name: "Michael Chen",
    studioId: 8,
    specialties: ["Hatha Yoga", "Meditation", "Breathwork"],
    bio: "Studied yoga in India for two years and brings authentic teachings to modern practice. Michael specializes in the mental and spiritual aspects of yoga.",
    certifications: ["E-RYT 500", "Meditation Teacher", "Reiki Master"],
    yearsExperience: 11,
    imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    rating: 5.0
  },
  {
    id: 9,
    name: "Sensei Robert Kim",
    studioId: 9,
    specialties: ["Karate", "Self-Defense", "Youth Training"],
    bio: "4th degree black belt with 20 years of martial arts experience. Sensei Kim emphasizes discipline, respect, and practical self-defense.",
    certifications: ["4th Dan Black Belt", "Youth Fitness Specialist"],
    yearsExperience: 20,
    imageUrl: "https://randomuser.me/api/portraits/men/9.jpg",
    rating: 4.8
  },
  {
    id: 10,
    name: "Nicole Anderson",
    studioId: 10,
    specialties: ["Strength Training", "Olympic Lifting", "Powerlifting"],
    bio: "Competitive powerlifter and certified strength coach. Nicole teaches proper lifting technique and helps clients build real-world strength.",
    certifications: ["CSCS", "USAW Level 1", "Precision Nutrition Level 1"],
    yearsExperience: 8,
    imageUrl: "https://randomuser.me/api/portraits/women/10.jpg",
    rating: 4.9
  }
];

export const classes = [
  // ZenFlow Yoga Studio Classes
  {
    id: 1,
    studioId: 1,
    instructorId: 1,
    name: "Morning Vinyasa Flow",
    type: "Yoga",
    difficulty: "Intermediate",
    duration: 60,
    date: "2025-11-20",
    time: "07:00",
    currentCapacity: 8,
    maxCapacity: 15,
    price: 22,
    description: "Start your day with an energizing vinyasa flow. Connect breath with movement in this dynamic practice.",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600"
  },
  {
    id: 2,
    studioId: 1,
    instructorId: 1,
    name: "Gentle Yin Yoga",
    type: "Yoga",
    difficulty: "Beginner",
    duration: 75,
    date: "2025-11-20",
    time: "18:30",
    currentCapacity: 12,
    maxCapacity: 15,
    price: 24,
    description: "Slow-paced class focusing on deep stretches held for several minutes. Perfect for stress relief and flexibility.",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600"
  },
  {
    id: 3,
    studioId: 1,
    instructorId: 1,
    name: "Power Yoga",
    type: "Yoga",
    difficulty: "Advanced",
    duration: 60,
    date: "2025-11-21",
    time: "06:00",
    currentCapacity: 14,
    maxCapacity: 15,
    price: 25,
    description: "Vigorous, fitness-based approach to vinyasa-style yoga. Build strength and stamina while improving flexibility.",
    imageUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600"
  },
  
  // PowerCycle Studio Classes
  {
    id: 4,
    studioId: 2,
    instructorId: 2,
    name: "Sunrise Ride",
    type: "Cycling",
    difficulty: "Intermediate",
    duration: 45,
    date: "2025-11-20",
    time: "06:00",
    currentCapacity: 18,
    maxCapacity: 20,
    price: 28,
    description: "High-energy cycling class with hills, sprints, and intervals. Ride to the beat of motivating music.",
    imageUrl: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600"
  },
  {
    id: 5,
    studioId: 2,
    instructorId: 2,
    name: "Rhythm Ride",
    type: "Cycling",
    difficulty: "Beginner",
    duration: 45,
    date: "2025-11-20",
    time: "18:00",
    currentCapacity: 15,
    maxCapacity: 20,
    price: 28,
    description: "Choreographed cycling experience where every move is synced to the music. Fun, effective, and addictive.",
    imageUrl: "https://images.unsplash.com/photo-1485727749690-d091f284fe6d?w=600"
  },
  {
    id: 6,
    studioId: 2,
    instructorId: 2,
    name: "Power Hour",
    type: "Cycling",
    difficulty: "Advanced",
    duration: 60,
    date: "2025-11-21",
    time: "12:00",
    currentCapacity: 20,
    maxCapacity: 20,
    price: 32,
    description: "Extended ride for serious cyclists. Endurance training with challenging climbs and speed work.",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600"
  },

  // CoreStrength Pilates Classes
  {
    id: 7,
    studioId: 3,
    instructorId: 3,
    name: "Reformer Basics",
    type: "Pilates",
    difficulty: "Beginner",
    duration: 55,
    date: "2025-11-20",
    time: "09:00",
    currentCapacity: 5,
    maxCapacity: 8,
    price: 35,
    description: "Introduction to reformer Pilates. Learn proper form and fundamental exercises on the reformer.",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600"
  },
  {
    id: 8,
    studioId: 3,
    instructorId: 3,
    name: "Advanced Reformer",
    type: "Pilates",
    difficulty: "Advanced",
    duration: 55,
    date: "2025-11-20",
    time: "17:00",
    currentCapacity: 7,
    maxCapacity: 8,
    price: 38,
    description: "Challenging reformer class for experienced practitioners. Complex exercises requiring strength and control.",
    imageUrl: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600"
  },
  {
    id: 9,
    studioId: 3,
    instructorId: 3,
    name: "Mat Pilates",
    type: "Pilates",
    difficulty: "Intermediate",
    duration: 50,
    date: "2025-11-21",
    time: "18:00",
    currentCapacity: 10,
    maxCapacity: 12,
    price: 26,
    description: "Classical mat work focusing on core strength, stability, and flexibility. No equipment needed.",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600"
  },

  // Urban Boxing Club Classes
  {
    id: 10,
    studioId: 4,
    instructorId: 4,
    name: "Boxing Fundamentals",
    type: "Boxing",
    difficulty: "Beginner",
    duration: 60,
    date: "2025-11-20",
    time: "18:00",
    currentCapacity: 12,
    maxCapacity: 16,
    price: 26,
    description: "Learn proper boxing technique including stance, footwork, and basic punches. Great workout with skill development.",
    imageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600"
  },
  {
    id: 11,
    studioId: 4,
    instructorId: 4,
    name: "Cardio Boxing",
    type: "Boxing",
    difficulty: "Intermediate",
    duration: 45,
    date: "2025-11-21",
    time: "06:30",
    currentCapacity: 14,
    maxCapacity: 16,
    price: 24,
    description: "High-intensity boxing workout focused on cardio and calorie burn. Combination drills and conditioning.",
    imageUrl: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600"
  },
  {
    id: 12,
    studioId: 4,
    instructorId: 4,
    name: "Heavy Bag Training",
    type: "Boxing",
    difficulty: "Advanced",
    duration: 60,
    date: "2025-11-22",
    time: "19:00",
    currentCapacity: 10,
    maxCapacity: 12,
    price: 28,
    description: "Intensive heavy bag work with advanced combinations. Develop power, speed, and endurance.",
    imageUrl: "https://images.unsplash.com/photo-1526401281623-62f5b0f1e4cb?w=600"
  },

  // Rhythm Dance Collective Classes
  {
    id: 13,
    studioId: 5,
    instructorId: 5,
    name: "Hip Hop Basics",
    type: "Dance",
    difficulty: "Beginner",
    duration: 60,
    date: "2025-11-20",
    time: "19:00",
    currentCapacity: 16,
    maxCapacity: 25,
    price: 20,
    description: "Learn foundational hip hop moves and grooves. No experience necessary, just bring your energy.",
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600"
  },
  {
    id: 14,
    studioId: 5,
    instructorId: 5,
    name: "Contemporary Flow",
    type: "Dance",
    difficulty: "Intermediate",
    duration: 75,
    date: "2025-11-21",
    time: "18:00",
    currentCapacity: 18,
    maxCapacity: 25,
    price: 22,
    description: "Fluid contemporary dance exploring movement quality and expression. Previous dance experience recommended.",
    imageUrl: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600"
  },
  {
    id: 15,
    studioId: 5,
    instructorId: 5,
    name: "Cardio Dance Party",
    type: "Dance",
    difficulty: "Beginner",
    duration: 45,
    date: "2025-11-22",
    time: "10:00",
    currentCapacity: 22,
    maxCapacity: 30,
    price: 18,
    description: "Fun, high-energy dance workout mixing different styles. More about having fun than perfect choreography.",
    imageUrl: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600"
  },

  // HIIT Factory Classes
  {
    id: 16,
    studioId: 6,
    instructorId: 6,
    name: "Morning Meltdown",
    type: "HIIT",
    difficulty: "Intermediate",
    duration: 45,
    date: "2025-11-20",
    time: "06:00",
    currentCapacity: 18,
    maxCapacity: 24,
    price: 25,
    description: "Start your day with intense intervals combining cardio and strength. Maximum calorie burn in minimal time.",
    imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600"
  },
  {
    id: 17,
    studioId: 6,
    instructorId: 6,
    name: "Tabata Blast",
    type: "HIIT",
    difficulty: "Advanced",
    duration: 30,
    date: "2025-11-20",
    time: "12:00",
    currentCapacity: 15,
    maxCapacity: 20,
    price: 22,
    description: "Pure Tabata protocol: 20 seconds max effort, 10 seconds rest. Short but incredibly effective.",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600"
  },
  {
    id: 18,
    studioId: 6,
    instructorId: 6,
    name: "Bootcamp HIIT",
    type: "HIIT",
    difficulty: "Beginner",
    duration: 50,
    date: "2025-11-21",
    time: "18:30",
    currentCapacity: 20,
    maxCapacity: 24,
    price: 24,
    description: "Military-style bootcamp with HIIT intervals. Modifications available for all fitness levels.",
    imageUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600"
  },

  // Serenity Barre Studio Classes
  {
    id: 19,
    studioId: 7,
    instructorId: 7,
    name: "Classic Barre",
    type: "Barre",
    difficulty: "Beginner",
    duration: 55,
    date: "2025-11-20",
    time: "09:00",
    currentCapacity: 10,
    maxCapacity: 15,
    price: 26,
    description: "Traditional barre class using small, controlled movements. Sculpt and tone muscles with ballet-inspired exercises.",
    imageUrl: "https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=600"
  },
  {
    id: 20,
    studioId: 7,
    instructorId: 7,
    name: "Barre Cardio",
    type: "Barre",
    difficulty: "Intermediate",
    duration: 45,
    date: "2025-11-20",
    time: "17:30",
    currentCapacity: 13,
    maxCapacity: 15,
    price: 24,
    description: "Faster-paced barre with cardio intervals. Get your heart rate up while sculpting lean muscle.",
    imageUrl: "https://images.unsplash.com/photo-1518611507436-f9221403cca2?w=600"
  },

  // FlowState Yoga & Meditation Classes
  {
    id: 21,
    studioId: 8,
    instructorId: 8,
    name: "Meditation & Mindfulness",
    type: "Meditation",
    difficulty: "Beginner",
    duration: 45,
    date: "2025-11-20",
    time: "07:00",
    currentCapacity: 8,
    maxCapacity: 20,
    price: 18,
    description: "Guided meditation practice to reduce stress and increase awareness. Suitable for complete beginners.",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600"
  },
  {
    id: 22,
    studioId: 8,
    instructorId: 8,
    name: "Breathwork Session",
    type: "Yoga",
    difficulty: "Beginner",
    duration: 60,
    date: "2025-11-21",
    time: "18:00",
    currentCapacity: 12,
    maxCapacity: 20,
    price: 20,
    description: "Deep dive into pranayama breathing techniques. Harness the power of breath for energy and calm.",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600"
  },

  // Martial Arts Academy Classes
  {
    id: 23,
    studioId: 9,
    instructorId: 9,
    name: "Karate Fundamentals",
    type: "Martial Arts",
    difficulty: "Beginner",
    duration: 60,
    date: "2025-11-20",
    time: "18:00",
    currentCapacity: 10,
    maxCapacity: 20,
    price: 30,
    description: "Traditional Karate training focusing on basic techniques, kata, and discipline. Great for beginners.",
    imageUrl: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600"
  },
  {
    id: 24,
    studioId: 9,
    instructorId: 9,
    name: "Advanced Sparring",
    type: "Martial Arts",
    difficulty: "Advanced",
    duration: 90,
    date: "2025-11-21",
    time: "19:00",
    currentCapacity: 8,
    maxCapacity: 12,
    price: 35,
    description: "Controlled sparring for experienced martial artists. Apply techniques in realistic scenarios.",
    imageUrl: "https://images.unsplash.com/photo-1595435742656-5272d0cf4e3c?w=600"
  },

  // The Strength Lab Classes
  {
    id: 25,
    studioId: 10,
    instructorId: 10,
    name: "Strength Foundations",
    type: "Strength Training",
    difficulty: "Beginner",
    duration: 60,
    date: "2025-11-20",
    time: "18:00",
    currentCapacity: 8,
    maxCapacity: 12,
    price: 32,
    description: "Learn proper form for fundamental lifts: squat, deadlift, bench press, and overhead press.",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600"
  },
  {
    id: 26,
    studioId: 10,
    instructorId: 10,
    name: "Olympic Lifting",
    type: "Strength Training",
    difficulty: "Advanced",
    duration: 75,
    date: "2025-11-21",
    time: "06:00",
    currentCapacity: 6,
    maxCapacity: 8,
    price: 38,
    description: "Technical Olympic weightlifting: snatch and clean & jerk. Previous lifting experience required.",
    imageUrl: "https://images.unsplash.com/photo-1526401281623-62f5b0f1e4cb?w=600"
  },
  
  // Additional classes to reach 50+
  {
    id: 27,
    studioId: 1,
    instructorId: 1,
    name: "Restorative Yoga",
    type: "Yoga",
    difficulty: "Beginner",
    duration: 75,
    date: "2025-11-22",
    time: "10:00",
    currentCapacity: 6,
    maxCapacity: 12,
    price: 24,
    description: "Deeply relaxing yoga using props to support the body. Perfect for recovery and stress relief.",
    imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600"
  },
  {
    id: 28,
    studioId: 2,
    instructorId: 2,
    name: "Climb & Grind",
    type: "Cycling",
    difficulty: "Advanced",
    duration: 50,
    date: "2025-11-22",
    time: "08:00",
    currentCapacity: 17,
    maxCapacity: 20,
    price: 30,
    description: "Simulated hill climbs with heavy resistance. Build power and mental toughness.",
    imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600"
  },
  {
    id: 29,
    studioId: 3,
    instructorId: 3,
    name: "Prenatal Pilates",
    type: "Pilates",
    difficulty: "Beginner",
    duration: 50,
    date: "2025-11-22",
    time: "10:00",
    currentCapacity: 4,
    maxCapacity: 6,
    price: 36,
    description: "Safe, effective Pilates modified for pregnancy. Focus on core strength and pelvic floor health.",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600"
  },
  {
    id: 30,
    studioId: 4,
    instructorId: 4,
    name: "Boxing for Fitness",
    type: "Boxing",
    difficulty: "Beginner",
    duration: 45,
    date: "2025-11-22",
    time: "12:00",
    currentCapacity: 11,
    maxCapacity: 16,
    price: 24,
    description: "Boxing-inspired cardio workout. No sparring, just a great full-body workout.",
    imageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600"
  },
  {
    id: 31,
    studioId: 5,
    instructorId: 5,
    name: "Jazz Technique",
    type: "Dance",
    difficulty: "Intermediate",
    duration: 60,
    date: "2025-11-22",
    time: "14:00",
    currentCapacity: 14,
    maxCapacity: 20,
    price: 22,
    description: "Classic jazz dance technique with across-the-floor progressions and center combinations.",
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600"
  },
  {
    id: 32,
    studioId: 6,
    instructorId: 6,
    name: "Core Crusher",
    type: "HIIT",
    difficulty: "Intermediate",
    duration: 30,
    date: "2025-11-22",
    time: "17:00",
    currentCapacity: 16,
    maxCapacity: 20,
    price: 20,
    description: "Targeted core workout with HIIT principles. Strengthen and define your midsection.",
    imageUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600"
  },
  {
    id: 33,
    studioId: 7,
    instructorId: 7,
    name: "Stretch & Restore",
    type: "Barre",
    difficulty: "Beginner",
    duration: 45,
    date: "2025-11-22",
    time: "11:00",
    currentCapacity: 8,
    maxCapacity: 12,
    price: 22,
    description: "Gentle stretching combined with barre work. Focus on flexibility and recovery.",
    imageUrl: "https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=600"
  },
  {
    id: 34,
    studioId: 8,
    instructorId: 8,
    name: "Sunset Yoga",
    type: "Yoga",
    difficulty: "Beginner",
    duration: 60,
    date: "2025-11-22",
    time: "19:00",
    currentCapacity: 14,
    maxCapacity: 20,
    price: 20,
    description: "Gentle evening yoga to unwind from the day. Slow flows and relaxation.",
    imageUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600"
  },
  {
    id: 35,
    studioId: 9,
    instructorId: 9,
    name: "Self-Defense Workshop",
    type: "Martial Arts",
    difficulty: "Beginner",
    duration: 90,
    date: "2025-11-23",
    time: "14:00",
    currentCapacity: 12,
    maxCapacity: 15,
    price: 35,
    description: "Practical self-defense techniques for real-world situations. Empowering and informative.",
    imageUrl: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600"
  },
  {
    id: 36,
    studioId: 10,
    instructorId: 10,
    name: "Powerlifting Basics",
    type: "Strength Training",
    difficulty: "Intermediate",
    duration: 90,
    date: "2025-11-23",
    time: "10:00",
    currentCapacity: 7,
    maxCapacity: 10,
    price: 35,
    description: "Introduction to competitive powerlifting. Learn the big three lifts with proper form.",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600"
  }
];

export const bookings = [
  {
    id: 1,
    userId: 1,
    classId: 1,
    bookingDate: "2025-11-18",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 22
  },
  {
    id: 2,
    userId: 2,
    classId: 4,
    bookingDate: "2025-11-17",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 28
  },
  {
    id: 3,
    userId: 1,
    classId: 6,
    bookingDate: "2025-11-19",
    status: "waitlist",
    paymentStatus: "pending",
    amount: 32
  },
  {
    id: 4,
    userId: 3,
    classId: 10,
    bookingDate: "2025-11-16",
    status: "cancelled",
    paymentStatus: "refunded",
    amount: 26
  },
  {
    id: 5,
    userId: 2,
    classId: 13,
    bookingDate: "2025-11-18",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 20
  }
];

export const users = [
  {
    id: 1,
    name: "Alex Morgan",
    email: "alex.morgan@email.com",
    type: "attendee",
    phone: "(312) 555-0123",
    memberSince: "2024-03-15",
    favoriteStudios: [1, 2, 5],
    profileImage: "https://randomuser.me/api/portraits/women/20.jpg"
  },
  {
    id: 2,
    name: "Jordan Lee",
    email: "jordan.lee@email.com",
    type: "attendee",
    phone: "(312) 555-0124",
    memberSince: "2024-06-20",
    favoriteStudios: [2, 4, 6],
    profileImage: "https://randomuser.me/api/portraits/men/20.jpg"
  },
  {
    id: 3,
    name: "Sam Taylor",
    email: "sam@zenflowstudio.com",
    type: "studio_owner",
    phone: "(312) 555-0198",
    studioId: 1,
    memberSince: "2023-01-10",
    profileImage: "https://randomuser.me/api/portraits/women/21.jpg"
  }
];

// Helper functions for filtering and searching
export const filterClasses = (classes, filters) => {
  return classes.filter(classItem => {
    if (filters.type && classItem.type !== filters.type) return false;
    if (filters.difficulty && classItem.difficulty !== filters.difficulty) return false;
    if (filters.date && classItem.date !== filters.date) return false;
    if (filters.studioId && classItem.studioId !== filters.studioId) return false;
    if (filters.maxPrice && classItem.price > filters.maxPrice) return false;
    if (filters.minPrice && classItem.price < filters.minPrice) return false;
    return true;
  });
};

export const searchClasses = (classes, searchTerm) => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return classes.filter(classItem => 
    classItem.name.toLowerCase().includes(lowerSearchTerm) ||
    classItem.description.toLowerCase().includes(lowerSearchTerm) ||
    classItem.type.toLowerCase().includes(lowerSearchTerm)
  );
};

export const getStudioById = (studioId) => {
  return studios.find(studio => studio.id === studioId);
};

export const getInstructorById = (instructorId) => {
  return instructors.find(instructor => instructor.id === instructorId);
};

export const getClassById = (classId) => {
  return classes.find(classItem => classItem.id === classId);
};

export const getClassesByStudio = (studioId) => {
  return classes.filter(classItem => classItem.studioId === studioId);
};

export const getAvailableSpots = (classItem) => {
  return classItem.maxCapacity - classItem.currentCapacity;
};

export const isClassFull = (classItem) => {
  return classItem.currentCapacity >= classItem.maxCapacity;
};

export const getClassStatus = (classItem) => {
  const available = getAvailableSpots(classItem);
  if (available === 0) return 'full';
  if (available <= 3) return 'filling-fast';
  return 'available';
};
