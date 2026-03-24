const hobbies = [
    {
        id: "h1",
        name: "Photography",
        category: "Creative Arts",
        vector: [0.6, 0.8, 0.4, 0.5, 0.9, 0.6],
        popularityScore: 0.85,
        roadmap: ["Learn exposure basics (ISO, aperture, shutter speed)", "Practice composition rules", "Master photo editing software"],
        costEstimate: "Medium to High ($200+ for entry level gear)",
        timeCommitment: "4-6 hours/week",
        contextTags: ["outdoor", "morning", "evening"]
    },
    {
        id: "h2",
        name: "Web Development",
        category: "Technology",
        vector: [0.8, 0.2, 0.1, 0.3, 0.8, 1.0],
        popularityScore: 0.95,
        roadmap: ["Learn HTML, CSS, JavaScript", "Build 3 small projects", "Learn a modern framework like React"],
        costEstimate: "Low (Free courses available)",
        timeCommitment: "5-10 hours/week",
        contextTags: ["indoor", "anytime"]
    },
    {
        id: "h3",
        name: "Rock Climbing (Bouldering)",
        category: "Fitness & Outdoors",
        vector: [0.5, 0.5, 1.0, 0.7, 0.3, 0.4],
        popularityScore: 0.75,
        roadmap: ["Visit local gym and rent gear", "Learn basic footwork and gripping", "Practice falling safely and route reading"],
        costEstimate: "Medium ($80/month gym, $100 shoes)",
        timeCommitment: "3-5 hours/week",
        contextTags: ["indoor", "outdoor", "evening", "weekend"]
    },
    {
        id: "h4",
        name: "Creative Writing",
        category: "Creative Arts",
        vector: [0.7, 0.1, 0.1, 0.2, 1.0, 0.3],
        popularityScore: 0.70,
        roadmap: ["Start a daily journaling habit", "Write short stories based on prompts", "Outline and draft your first long-form piece"],
        costEstimate: "Very Low (Pen & Paper or Laptop)",
        timeCommitment: "3-7 hours/week",
        contextTags: ["indoor", "anytime", "rainy"]
    },
    {
        id: "h5",
        name: "3D Modeling",
        category: "Technology & Arts",
        vector: [0.9, 0.2, 0.1, 0.2, 0.9, 0.8],
        popularityScore: 0.65,
        roadmap: ["Download Blender (Free)", "Follow donut tutorial", "Model your own room"],
        costEstimate: "Low (Assuming you have a decent PC)",
        timeCommitment: "6-10 hours/week",
        contextTags: ["indoor", "anytime", "rainy"]
    },
    {
        id: "h6",
        name: "Cooking/Culinary Arts",
        category: "Lifestyle",
        vector: [0.6, 0.5, 0.3, 0.6, 0.8, 0.5],
        popularityScore: 0.90,
        roadmap: ["Master basic knife skills", "Learn 5 foundational sauces", "Experiment with flavor profiling without a recipe"],
        costEstimate: "Medium ($50-100/week on ingredients)",
        timeCommitment: "4-7 hours/week",
        contextTags: ["indoor", "evening", "anytime"]
    },
    {
        id: "h7",
        name: "Hiking",
        category: "Fitness & Outdoors",
        vector: [0.8, 0.3, 0.9, 0.6, 0.2, 0.1],
        popularityScore: 0.88,
        roadmap: ["Find local beginner trails", "Invest in proper footwear", "Learn basic navigation and safety"],
        costEstimate: "Low (Mainly transportation & boots)",
        timeCommitment: "4-8 hours/weekend",
        contextTags: ["outdoor", "morning"]
    },
    {
        id: "h8",
        name: "Language Learning",
        category: "Education",
        vector: [0.7, 0.2, 0.1, 0.5, 0.4, 0.6],
        popularityScore: 0.80,
        roadmap: ["Use Duolingo/Babbel for vocabulary", "Watch native media with subtitles", "Practice speaking with language exchange partners"],
        costEstimate: "Low (Free apps available)",
        timeCommitment: "3-5 hours/week",
        contextTags: ["indoor", "anytime"]
    },
    {
        id: "h9",
        name: "Board Gaming",
        category: "Social & Leisure",
        vector: [0.6, 0.6, 0.1, 1.0, 0.5, 0.5],
        popularityScore: 0.78,
        roadmap: ["Start with gateway games (Catan, Ticket to Ride)", "Join a local board game group", "Explore heavier strategy games"],
        costEstimate: "Medium ($40-$80 per game)",
        timeCommitment: "3-6 hours/week",
        contextTags: ["indoor", "evening", "rainy"]
    },
    {
        id: "h10",
        name: "Gardening",
        category: "Lifestyle & Outdoors",
        vector: [0.7, 0.4, 0.5, 0.2, 0.6, 0.4],
        popularityScore: 0.72,
        roadmap: ["Start with easy indoor plants or herbs", "Prepare soil and outdoor beds", "Learn plant propagation and seasonal care"],
        costEstimate: "Low to Medium ($30+ for tools/seeds)",
        timeCommitment: "2-5 hours/week",
        contextTags: ["outdoor", "morning", "spring"]
    },
    {
        id: "h11",
        name: "Machine Learning (AI)",
        category: "Technology",
        vector: [0.9, 0.3, 0.1, 0.2, 0.6, 1.0],
        popularityScore: 0.82,
        roadmap: ["Learn Python", "Study math foundations (linear algebra)", "Build basic models using Scikit-Learn or PyTorch"],
        costEstimate: "Low (Free open source tools)",
        timeCommitment: "8-12 hours/week",
        contextTags: ["indoor", "anytime", "rainy"]
    },
    {
        id: "h12",
        name: "Yoga",
        category: "Fitness & Wellness",
        vector: [0.5, 0.2, 0.8, 0.3, 0.3, 0.2],
        popularityScore: 0.91,
        roadmap: ["Learn basic poses (Sun Salutations)", "Practice breathwork (Pranayama)", "Build a consistent daily routine"],
        costEstimate: "Low (Yoga mat + YouTube)",
        timeCommitment: "2-4 hours/week",
        contextTags: ["indoor", "morning", "evening"]
    },
    {
        id: "h13",
        name: "DIY Electronics & Arduino",
        category: "Technology & Makers",
        vector: [0.7, 0.5, 0.2, 0.2, 0.8, 0.9],
        popularityScore: 0.68,
        roadmap: ["Buy a starter kit", "Learn basic circuit logic", "Build a small automated sensor project"],
        costEstimate: "Medium ($50-$100 for kits)",
        timeCommitment: "4-6 hours/week",
        contextTags: ["indoor", "anytime"]
    },
    {
        id: "h14",
        name: "Painting (Acrylic/Watercolor)",
        category: "Creative Arts",
        vector: [0.6, 0.4, 0.2, 0.2, 1.0, 0.4],
        popularityScore: 0.85,
        roadmap: ["Understand color theory", "Practice basic brush strokes", "Complete a full guided landscape"],
        costEstimate: "Medium ($40-$80 for supplies)",
        timeCommitment: "3-5 hours/week",
        contextTags: ["indoor", "afternoon", "rainy"]
    },
    {
        id: "h15",
        name: "Martial Arts",
        category: "Fitness & Wellness",
        vector: [0.7, 0.6, 1.0, 0.6, 0.3, 0.6],
        popularityScore: 0.77,
        roadmap: ["Find a local dojo or gym", "Learn basic stances and strikes/blocks", "Participate in sparring sessions"],
        costEstimate: "Medium ($100-$150/month)",
        timeCommitment: "4-8 hours/week",
        contextTags: ["indoor", "evening"]
    },
    {
        id: "h16",
        name: "Video Game Development",
        category: "Technology & Arts",
        vector: [0.9, 0.2, 0.1, 0.3, 0.9, 0.9],
        popularityScore: 0.80,
        roadmap: ["Download Unity or Godot", "Follow a simple 2D platformer tutorial", "Participate in a beginner Game Jam"],
        costEstimate: "Low (Free software)",
        timeCommitment: "6-12 hours/week",
        contextTags: ["indoor", "anytime"]
    },
    {
        id: "h17",
        name: "Guitar/Piano Playing",
        category: "Music",
        vector: [0.8, 0.6, 0.3, 0.4, 0.9, 0.6],
        popularityScore: 0.89,
        roadmap: ["Learn basic chords/scales", "Practice finger dexterity and transitions", "Learn 3 of your favorite songs"],
        costEstimate: "Medium to High ($150+ for instrument)",
        timeCommitment: "5-7 hours/week",
        contextTags: ["indoor", "anytime", "evening"]
    },
    {
        id: "h18",
        name: "Origami",
        category: "Creative Arts",
        vector: [0.4, 0.1, 0.1, 0.1, 0.8, 0.4],
        popularityScore: 0.55,
        roadmap: ["Start with pure square paper", "Learn basic base folds (crane base)", "Try complex modular origami"],
        costEstimate: "Very Low ($5 for paper)",
        timeCommitment: "1-3 hours/week",
        contextTags: ["indoor", "anytime"]
    },
    {
        id: "h19",
        name: "Podcast Creation",
        category: "Media & Comms",
        vector: [0.7, 0.4, 0.1, 0.8, 0.7, 0.5],
        popularityScore: 0.70,
        roadmap: ["Choose a niche and plan episodes", "Buy a decent USB microphone", "Edit audio using Audacity and publish"],
        costEstimate: "Low to Medium ($60 for mic)",
        timeCommitment: "3-6 hours/week",
        contextTags: ["indoor", "anytime"]
    },
    {
        id: "h20",
        name: "Cycling",
        category: "Fitness & Outdoors",
        vector: [0.7, 0.7, 0.9, 0.5, 0.1, 0.3],
        popularityScore: 0.86,
        roadmap: ["Find a properly fitted bike", "Learn basic bike maintenance (fixing Flats)", "Build endurance on longer routes"],
        costEstimate: "High ($300+ for bike/gear)",
        timeCommitment: "4-8 hours/week",
        contextTags: ["outdoor", "morning", "afternoon"]
    },
    {
        id: "h21",
        name: "Digital Art (Illustration)",
        category: "Creative Arts",
        vector: [0.8, 0.5, 0.1, 0.3, 1.0, 0.6],
        popularityScore: 0.83,
        roadmap: ["Get a basic drawing tablet", "Learn software basics (Procreate/Photoshop)", "Study anatomy and shading"],
        costEstimate: "Medium ($100+ for tablet)",
        timeCommitment: "5-10 hours/week",
        contextTags: ["indoor", "anytime"]
    },
    {
        id: "h22",
        name: "Astrophotography",
        category: "Science & Arts",
        vector: [0.8, 0.9, 0.3, 0.2, 0.6, 0.8],
        popularityScore: 0.50,
        roadmap: ["Learn night sky basics", "Get manual camera/tripod and start wide-field", "Learn image stacking software"],
        costEstimate: "High ($500+)",
        timeCommitment: "3-6 hours/week (Nighttime)",
        contextTags: ["outdoor", "night", "clear_sky"]
    },
    {
        id: "h23",
        name: "Urban Sketching",
        category: "Creative Arts",
        vector: [0.5, 0.2, 0.4, 0.4, 0.9, 0.3],
        popularityScore: 0.65,
        roadmap: ["Assemble a portable sketch kit", "Learn one-point/two-point perspective", "Practice quick on-location drawing"],
        costEstimate: "Low ($20-$40)",
        timeCommitment: "2-5 hours/week",
        contextTags: ["outdoor", "morning", "afternoon"]
    },
    {
        id: "h24",
        name: "Chess",
        category: "Strategy & Gaming",
        vector: [0.6, 0.1, 0.1, 0.6, 0.3, 0.8],
        popularityScore: 0.92,
        roadmap: ["Learn piece movements and rules", "Study basic opening principles", "Practice tactical puzzles daily"],
        costEstimate: "Low (Free online)",
        timeCommitment: "3-7 hours/week",
        contextTags: ["indoor", "anytime"]
    },
    {
        id: "h25",
        name: "Calligraphy & Lettering",
        category: "Creative Arts",
        vector: [0.4, 0.2, 0.1, 0.1, 0.9, 0.4],
        popularityScore: 0.60,
        roadmap: ["Get appropriate pens/nibs", "Practice basic script alphabets", "Create a finalized quote artwork"],
        costEstimate: "Low ($20)",
        timeCommitment: "2-4 hours/week",
        contextTags: ["indoor", "anytime"]
    },
    {
        id: "h26",
        name: "Baking",
        category: "Lifestyle",
        vector: [0.6, 0.3, 0.2, 0.6, 0.7, 0.5],
        popularityScore: 0.87,
        roadmap: ["Master a simple cookie recipe", "Learn bread yeast dynamics", "Attempt complex pastries/cakes"],
        costEstimate: "Medium ($20-50/batch)",
        timeCommitment: "3-6 hours/week",
        contextTags: ["indoor", "anytime"]
    },
    {
        id: "h27",
        name: "Robotics",
        category: "Technology",
        vector: [0.8, 0.7, 0.2, 0.4, 0.7, 1.0],
        popularityScore: 0.63,
        roadmap: ["Learn basic C++/Arduino", "Build line-following robot", "Integrate complex sensors/AI"],
        costEstimate: "Medium/High ($100+)",
        timeCommitment: "6-10 hours/week",
        contextTags: ["indoor", "anytime"]
    },
    {
        id: "h28",
        name: "Surfing",
        category: "Fitness & Outdoors",
        vector: [0.7, 0.6, 1.0, 0.5, 0.1, 0.4],
        popularityScore: 0.58,
        roadmap: ["Take introductory lessons", "Learn to read waves", "Practice pop-ups consistently"],
        costEstimate: "Medium/High (Board + Wetsuit)",
        timeCommitment: "4-8 hours/week",
        contextTags: ["outdoor", "morning", "afternoon"]
    },
    {
        id: "h29",
        name: "Woodworking",
        category: "Crafts",
        vector: [0.8, 0.8, 0.6, 0.2, 0.9, 0.7],
        popularityScore: 0.65,
        roadmap: ["Learn hand tool basics and safety", "Build a simple box or birdhouse", "Learn joinery techniques"],
        costEstimate: "High ($200+ tools/materials)",
        timeCommitment: "5-10 hours/week",
        contextTags: ["indoor", "garage", "anytime"]
    },
    {
        id: "h30",
        name: "Dance (Salsa/HipHop)",
        category: "Fitness & Social",
        vector: [0.5, 0.3, 0.9, 1.0, 0.8, 0.3],
        popularityScore: 0.81,
        roadmap: ["Take beginner studio classes", "Practice rhythm and basic steps", "Attend social dance events"],
        costEstimate: "Medium ($50-$100/mo classes)",
        timeCommitment: "3-6 hours/week",
        contextTags: ["indoor", "evening"]
    }
];

// Fallback logic for CommonJS/ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = hobbies;
}
