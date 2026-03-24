/**
 * Hobby Dataset
 * 6D Vector: [Time, Budget, Physical, Social, Creativity, Technical]
 * All values are normalized between 0 and 1.
 */

const hobbies = [
    {
        id: "photography",
        name: "Photography",
        category: "Creative",
        vector: [0.6, 0.8, 0.4, 0.4, 0.9, 0.7],
        popularityScore: 0.85,
        description: "Capturing moments and exploring visual storytelling through a lens.",
        costLevel: "$$$",
        timeRequirement: "Moderate",
        roadmap: {
            day30: "Learn exposure triangle (ISO, Shutter, Aperture) and basic composition.",
            day60: "Master manual mode and experiment with different lighting conditions.",
            day90: "Start basic photo editing and build a small portfolio."
        },
        starterKit: ["Entry-level DSLR/Mirrorless camera", "SD Card", "Basic editing software"],
        estimatedCost: "$300 - $700",
        resources: ["r/photography", "Digital Photography School", "YouTube: Peter McKinnon"]
    },
    {
        id: "hiking",
        name: "Hiking",
        category: "Physical",
        vector: [0.7, 0.3, 0.9, 0.5, 0.2, 0.1],
        popularityScore: 0.92,
        description: "Exploring nature trails and mountains on foot.",
        costLevel: "$",
        timeRequirement: "Intensive",
        roadmap: {
            day30: "Complete three 5km local trails. Build base stamina.",
            day60: "Invest in good boots. Complete a 10km trail with elevation.",
            day90: "Plan an overnight camping hike or tackle a challenging peak."
        },
        starterKit: ["Sturdy hiking boots", "Water bottle", "Daypack", "Trail map app"],
        estimatedCost: "$50 - $150",
        resources: ["AllTrails", "r/hiking", "REI Expert Advice"]
    },
    {
        id: "coding",
        name: "Programming",
        category: "Technical",
        vector: [0.8, 0.1, 0.1, 0.3, 0.8, 1.0],
        popularityScore: 0.88,
        description: "Building software, websites, or automations using code.",
        costLevel: "$",
        timeRequirement: "Intensive",
        roadmap: {
            day30: "Learn HTML/CSS basics and build a personal landing page.",
            day60: "Master JavaScript fundamentals (variables, loops, functions).",
            day90: "Build a functional web app and share it on GitHub."
        },
        starterKit: ["Computer", "Internet connection", "VS Code (Free)"],
        estimatedCost: "$0",
        resources: ["freeCodeCamp", "MDN Web Docs", "r/learnprogramming"]
    },
    {
        id: "pottery",
        name: "Pottery & Ceramics",
        category: "Creative",
        vector: [0.7, 0.7, 0.5, 0.6, 1.0, 0.3],
        popularityScore: 0.75,
        description: "Creating functional art using clay and a pottery wheel.",
        costLevel: "$$$",
        timeRequirement: "Moderate",
        roadmap: {
            day30: "Take a beginner class to learn centering and pulling clay.",
            day60: "Practice basic shapes like cylinders and bowls.",
            day90: "Learn glazing techniques and fire your first finished set."
        },
        starterKit: ["Clay", "Pottery tools", "Wheel access (Studio membership)"],
        estimatedCost: "$100 - $200 (Monthly)",
        resources: ["The Ceramic School", "r/pottery", "Ceramics Monthly"]
    },
    {
        id: "chess",
        name: "Chess",
        category: "Educational",
        vector: [0.5, 0.1, 0.1, 0.4, 0.3, 0.9],
        popularityScore: 0.95,
        description: "A strategic board game that challenges logic and foresight.",
        costLevel: "$",
        timeRequirement: "Flexible",
        roadmap: {
            day30: "Learn all piece movements and basic opening principles.",
            day60: "Study basic tactics (forks, pins) and reach 800 ELO online.",
            day90: "Analyze classic games and reach 1000 ELO."
        },
        starterKit: ["Chess set (optional)", "Online account (Chess.com/Lichess)"],
        estimatedCost: "$0 - $20",
        resources: ["Chess.com", "Lichess.org", "YouTube: GothamChess"]
    },
    {
        id: "gardening",
        name: "Gardening",
        category: "Environment",
        vector: [0.6, 0.4, 0.6, 0.2, 0.6, 0.2],
        popularityScore: 0.82,
        description: "Nurturing plants, flowers, or vegetables in your own space.",
        costLevel: "$$",
        timeRequirement: "Moderate",
        roadmap: {
            day30: "Clear a patch/buy pots and plant easy seeds like radishes or herbs.",
            day60: "Establish a weeding and watering routine. Build a compost bin.",
            day90: "Harvest your first crop and plan for the next season."
        },
        starterKit: ["Seeds/Saplings", "Trowel", "Watering can", "Soil"],
        estimatedCost: "$30 - $100",
        resources: ["Gardeners' World", "r/gardening", "The Raintree Nursery"]
    },
    {
        id: "baking",
        name: "Artisan Bread Baking",
        category: "Creative",
        vector: [0.7, 0.3, 0.3, 0.3, 0.7, 0.4],
        popularityScore: 0.78,
        description: "Making delicious bread from scratch using traditional methods.",
        costLevel: "$",
        timeRequirement: "High",
        roadmap: {
            day30: "Master a basic no-knead loaf. Create your own sourdough starter.",
            day60: "Learn bulk fermentation and shaping techniques.",
            day90: "Bake a perfectly scored sourdough boule with an open crumb."
        },
        starterKit: ["Flour", "Yeast/Starter", "Dutch oven", "Scale"],
        estimatedCost: "$20 - $50",
        resources: ["Perfect Loaf", "r/sourdough", "YouTube: Joshua Weissman"]
    },
    {
        id: "yoga",
        name: "Yoga",
        category: "Physical",
        vector: [0.4, 0.2, 0.8, 0.3, 0.2, 0.1],
        popularityScore: 0.90,
        description: "A practice connecting the body, breath, and mind through poses.",
        costLevel: "$",
        timeRequirement: "Flexible",
        roadmap: {
            day30: "Learn basic Sun Salutations and breathing techniques.",
            day60: "Build core strength and balance; hold poses for 5+ breaths.",
            day90: "Develop a consistent 20-minute daily home practice."
        },
        starterKit: ["Yoga mat", "Comfortable clothing", "YouTube"],
        estimatedCost: "$20 - $50",
        resources: ["Yoga with Adriene", "Down Dog App", "r/yoga"]
    },
    {
        id: "boardgames",
        name: "Modern Board Games",
        category: "Social",
        vector: [0.5, 0.6, 0.1, 1.0, 0.2, 0.4],
        popularityScore: 0.84,
        description: "Playing complex strategic or social games with friends.",
        costLevel: "$$",
        timeRequirement: "Moderate",
        roadmap: {
            day30: "Try 'Gateway' games like Catan or Ticket to Ride.",
            day60: "Join a local board game meet-up and try a 'Euro' game.",
            day90: "Host your own game night with a 2-hour strategic game."
        },
        starterKit: ["One 'Gateway' board game", "Group of friends/Meetup group"],
        estimatedCost: "$40 - $100",
        resources: ["BoardGameGeek", "r/boardgames", "Shut Up & Sit Down"]
    },
    {
        id: "birdwatching",
        name: "Bird Watching",
        category: "Environment",
        vector: [0.6, 0.3, 0.4, 0.2, 0.1, 0.2],
        popularityScore: 0.65,
        description: "Observing and identifying birds in their natural habitats.",
        costLevel: "$$",
        timeRequirement: "Flexible",
        roadmap: {
            day30: "Identify 10 common birds in your local park using an app.",
            day60: "Learn to identify birds by their calls/songs.",
            day90: "Join a local birding walk and log 50+ species."
        },
        starterKit: ["Binoculars", "Field guide app (Merlin)", "Notebook"],
        estimatedCost: "$50 - $150",
        resources: ["Audubon Society", "eBird", "r/birding"]
    },
    {
        id: "guitar",
        name: "Guitar",
        category: "Creative",
        vector: [0.7, 0.5, 0.3, 0.4, 0.9, 0.6],
        popularityScore: 0.88,
        description: "Learning to play melodies and chords on the guitar.",
        costLevel: "$$$",
        timeRequirement: "Intensive",
        roadmap: {
            day30: "Learn basic open chords (G, C, D, Em) and simple strumming.",
            day60: "Master barre chords and transition smoothly between them.",
            day90: "Learn 3 complete songs and basic fingerpicking."
        },
        starterKit: ["Acoustic or Electric guitar", "Tuner", "Picks"],
        estimatedCost: "$150 - $400",
        resources: ["JustinGuitar", "Ultimate Guitar", "r/guitar"]
    },
    {
        id: "running",
        name: "Running",
        category: "Physical",
        vector: [0.5, 0.2, 1.0, 0.3, 0.1, 0.1],
        popularityScore: 0.94,
        description: "Improving cardiovascular health through consistent running.",
        costLevel: "$",
        timeRequirement: "Flexible",
        roadmap: {
            day30: "Complete a 'Couch to 5K' program (run 3x weekly).",
            day60: "Run 5km without stopping and improve your pace.",
            day90: "Sign up for and complete a local 10k race."
        },
        starterKit: ["Running shoes", "Breathable socks", "Tracking app (Strava)"],
        estimatedCost: "$60 - $120",
        resources: ["Runner's World", "r/running", "C25K App"]
    },
    {
        id: "astronomy",
        name: "Amateur Astronomy",
        category: "Technical",
        vector: [0.6, 0.7, 0.2, 0.2, 0.3, 0.9],
        popularityScore: 0.68,
        description: "Observing planets, stars, and galaxies using telescopes.",
        costLevel: "$$$",
        timeRequirement: "Moderate",
        roadmap: {
            day30: "Learn to identify major constellations with the naked eye.",
            day60: "Use binoculars to see Moon craters and Jupiter's moons.",
            day90: "Setup a telescope and find Messier objects (nebulae/galaxies)."
        },
        starterKit: ["Star chart app", "Binoculars or Entry-level telescope"],
        estimatedCost: "$100 - $500",
        resources: ["Sky & Telescope", "r/astronomy", "Stellarium"]
    },
    {
        id: "woodworking",
        name: "Woodworking",
        category: "Creative",
        vector: [0.8, 0.8, 0.6, 0.1, 0.8, 0.7],
        popularityScore: 0.72,
        description: "Crafting furniture and objects from wood.",
        costLevel: "$$$",
        timeRequirement: "Intensive",
        roadmap: {
            day30: "Build a simple project like a birdhouse or tool carrier.",
            day60: "Learn to use a table saw and router safely.",
            day90: "Complete a small piece of furniture (e.g., a coffee table)."
        },
        starterKit: ["Saw", "Drill", "Sandpaper", "Measuring tape"],
        estimatedCost: "$200 - $1000",
        resources: ["The Wood Whisperer", "r/woodworking", "Fine Woodworking"]
    },
    {
        id: "cooking",
        name: "Gourmet Cooking",
        category: "Creative",
        vector: [0.6, 0.5, 0.3, 0.8, 0.9, 0.2],
        popularityScore: 0.91,
        description: "Mastering culinary techniques and exploring world cuisines.",
        costLevel: "$$",
        timeRequirement: "Moderate",
        roadmap: {
            day30: "Master basic knife skills and 3 essential sauces.",
            day60: "Learn to cook proteins perfectly (steak, fish, poultry).",
            day90: "Host a 3-course dinner party for friends."
        },
        starterKit: ["Chef's knife", "Cast iron skillet", "Basic spice rack"],
        estimatedCost: "$50 - $200",
        resources: ["Seriouseats", "Bon Appétit", "r/cooking"]
    },
    {
        id: "painting",
        name: "Watercolor Painting",
        category: "Creative",
        vector: [0.5, 0.4, 0.2, 0.2, 1.0, 0.2],
        popularityScore: 0.76,
        description: "Expressing creativity through light-filled watercolor art.",
        costLevel: "$$",
        timeRequirement: "Flexible",
        roadmap: {
            day30: "Learn color mixing and basic wet-on-wet techniques.",
            day60: "Paint 10 simple landscapes or still life studies.",
            day90: "Complete a detailed architectural or botanical piece."
        },
        starterKit: ["Watercolor set", "Brushes", "Cold-press paper"],
        estimatedCost: "$40 - $100",
        resources: ["Let's Make Art", "r/watercolor", "YouTube: Jazza"]
    },
    {
        id: "rockclimbing",
        name: "Rock Climbing",
        category: "Physical",
        vector: [0.6, 0.7, 0.9, 0.7, 0.4, 0.3],
        popularityScore: 0.80,
        description: "Scaling indoor walls or outdoor rock faces.",
        costLevel: "$$$",
        timeRequirement: "Moderate",
        roadmap: {
            day30: "Complete an intro course at a gym and learn to belay.",
            day60: "Build grip strength and climb V1-V2 boulders consistently.",
            day90: "Attempt your first outdoor climb or lead climb indoors."
        },
        starterKit: ["Climbing shoes", "Chalk bag", "Gym membership"],
        estimatedCost: "$100 - $150 (Monthly)",
        resources: ["Mountain Project", "r/climbing", "Climbing Magazine"]
    },
    {
        id: "podcasting",
        name: "Podcasting",
        category: "Social",
        vector: [0.7, 0.5, 0.1, 0.9, 0.8, 0.6],
        popularityScore: 0.70,
        description: "Creating digital audio content shared on the internet.",
        costLevel: "$$",
        timeRequirement: "Moderate",
        roadmap: {
            day30: "Define your niche and record 3 pilot episodes.",
            day60: "Learn basic audio editing (Audacity) and launch on Spotify.",
            day90: "Publish 10 episodes and start building a small audience."
        },
        starterKit: ["USB Microphone", "Headphones", "Audacity (Free)"],
        estimatedCost: "$50 - $200",
        resources: ["Podcast Insights", "r/podcasting", "Transistor.fm"]
    },
    {
        id: "volunteering",
        name: "Community Volunteering",
        category: "Social",
        vector: [0.6, 0.1, 0.5, 1.0, 0.2, 0.1],
        popularityScore: 0.78,
        description: "Giving back to the community through various service roles.",
        costLevel: "$",
        timeRequirement: "Moderate",
        roadmap: {
            day30: "Identify 3 causes you care about and sign up for one shift.",
            day60: "Establish a weekly or bi-weekly routine with an organization.",
            day90: "Take on a small leadership role or organize a project."
        },
        starterKit: ["Willingness to help", "Transportation"],
        estimatedCost: "$0",
        resources: ["VolunteerMatch", "r/volunteering", "Idealist"]
    },
    {
        id: "robotics",
        name: "DIY Robotics",
        category: "Technical",
        vector: [0.8, 0.7, 0.2, 0.3, 0.7, 1.0],
        popularityScore: 0.62,
        description: "Designing, building, and programming your own robots.",
        costLevel: "$$$",
        timeRequirement: "Intensive",
        roadmap: {
            day30: "Assemble a basic Arduino kit and blink an LED.",
            day60: "Build a light-following or obstacle-avoiding robot.",
            day90: "Integrate sensors and write complex logic for a custom bot."
        },
        starterKit: ["Arduino/Raspberry Pi", "Sensors", "Basic tools"],
        estimatedCost: "$100 - $300",
        resources: ["Instructables", "r/robotics", "Arduino Hub"]
    },
    {
        id: "origami",
        name: "Origami",
        category: "Creative",
        vector: [0.4, 0.1, 0.2, 0.2, 0.8, 0.3],
        popularityScore: 0.60,
        description: "The Japanese art of paper folding.",
        costLevel: "$",
        timeRequirement: "Flexible",
        roadmap: {
            day30: "Learn 10 basic folds (crane, butterfly, boat).",
            day60: "Attempt intermediate models (complex animals, flowers).",
            day90: "Try modular origami or design your own simple model."
        },
        starterKit: ["Origami paper", "Patience"],
        estimatedCost: "$5 - $20",
        resources: ["Origami.me", "r/origami", "YouTube: Jo Nakashima"]
    },
    {
        id: "knitting",
        name: "Knitting & Crochet",
        category: "Creative",
        vector: [0.6, 0.2, 0.1, 0.4, 0.8, 0.2],
        popularityScore: 0.81,
        description: "Creating textiles by interlocking loops of yarn.",
        costLevel: "$",
        timeRequirement: "Moderate",
        roadmap: {
            day30: "Knit a basic rectangular scarf. Learn cast on/off.",
            day60: "Make a beanie or a simple plushie (Amigurumi).",
            day90: "Knit your first sweater or a complex lace shawl."
        },
        starterKit: ["Yarn", "Knitting needles/Crochet hook", "Pattern"],
        estimatedCost: "$20 - $50",
        resources: ["Ravelry", "r/knitting", "LoveCrafts"]
    },
    {
        id: "magic",
        name: "Sleight of Hand Magic",
        category: "Creative",
        vector: [0.7, 0.2, 0.3, 0.7, 0.9, 0.5],
        popularityScore: 0.55,
        description: "The art of performing illusions for an audience.",
        costLevel: "$",
        timeRequirement: "High",
        roadmap: {
            day30: "Master 3 basic card sleights (Double Lift, Overhand Shuffle).",
            day60: "Learn 5 'street magic' tricks and perform for family.",
            day90: "Create a 5-minute routine and perform for strangers."
        },
        starterKit: ["Deck of cards (Bicycle)", "Coin", "YouTube"],
        estimatedCost: "$5 - $15",
        resources: ["Theory11", "r/magic", "YouTube: Chris Ramsay"]
    },
    {
        id: "calligraphy",
        name: "Calligraphy & Lettering",
        category: "Creative",
        vector: [0.5, 0.3, 0.1, 0.1, 0.9, 0.4],
        popularityScore: 0.68,
        description: "The decorative art of beautiful handwriting.",
        costLevel: "$$",
        timeRequirement: "Flexible",
        roadmap: {
            day30: "Learn basic strokes and lowercase 'Faux' calligraphy.",
            day60: "Master Copperplate or Modern Brush script lowercase.",
            day90: "Design a full quote layout or wedding invite mockups."
        },
        starterKit: ["Brush pens", "Smooth paper", "Pencil"],
        estimatedCost: "$30 - $70",
        resources: ["The Postman's Knock", "r/calligraphy", "Skillshare"]
    },
    {
        id: "aquarium",
        name: "Aquascaping",
        category: "Creative",
        vector: [0.6, 0.7, 0.3, 0.2, 0.8, 0.7],
        popularityScore: 0.58,
        description: "Arranging aquatic plants, rocks, and wood in an aquarium.",
        costLevel: "$$$",
        timeRequirement: "Moderate",
        roadmap: {
            day30: "Set up a nano-tank and cycle the water for 4 weeks.",
            day60: "Plant easy species (Anubias, Java Fern). Add shrimp.",
            day90: "Prune your first 'carpet' and introduce nano-fish."
        },
        starterKit: ["Tank", "Filter", "Substrate", "Plants"],
        estimatedCost: "$100 - $400",
        resources: ["Tropica", "r/aquascape", "YouTube: Green Aqua"]
    },
    {
        id: "survivalkills",
        name: "Bushcraft & Survival",
        category: "Environment",
        vector: [0.7, 0.4, 0.8, 0.3, 0.6, 0.5],
        popularityScore: 0.64,
        description: "Skills for living and thriving in the wilderness.",
        costLevel: "$$",
        timeRequirement: "Intensive",
        roadmap: {
            day30: "Learn 5 essential knots and cómo to build a debris shelter.",
            day60: "Master fire starting with a ferro rod. Learn to purify water.",
            day90: "Spend an overnight in the woods with minimal gear."
        },
        starterKit: ["Fixed blade knife", "Ferro rod", "Tarp", "Paracord"],
        estimatedCost: "$50 - $200",
        resources: ["BushcraftUK", "r/bushcraft", "YouTube: MCQBushcraft"]
    },
    {
        id: "cryptography",
        name: "Cryptography & Puzzles",
        category: "Technical",
        vector: [0.5, 0.1, 0.1, 0.2, 0.4, 1.0],
        popularityScore: 0.45,
        description: "Solving and creating complex codes and ciphers.",
        costLevel: "$",
        timeRequirement: "Flexible",
        roadmap: {
            day30: "Solve all classic ciphers (Caesar, Vigenere, Playfair).",
            day60: "Learn basic modern crypto (RSA, Hashing principles).",
            day90: "Compete in a CTF (Capture The Flag) or complete an ARG."
        },
        starterKit: ["Notebook", "Internet access (for tools)"],
        estimatedCost: "$0",
        resources: ["CryptoHack", "r/cryptography", "Cipher Tools"]
    },
    {
        id: "beekeeping",
        name: "Beekeeping",
        category: "Environment",
        vector: [0.7, 0.8, 0.5, 0.3, 0.2, 0.6],
        popularityScore: 0.40,
        description: "Caring for honeybee colonies and harvesting honey.",
        costLevel: "$$$",
        timeRequirement: "Moderate",
        roadmap: {
            day30: "Take a local beekeeping class and buy your woodenware.",
            day60: "Install your first 'package' of bees. Monitor the queen.",
            day90: "Expand with a second hive and do a mite check."
        },
        starterKit: ["Bee suit", "Smoker", "Hive boxes", "Bees"],
        estimatedCost: "$400 - $800 initial",
        resources: ["Bee Culture", "r/beekeeping", "Local Bee Club"]
    },
    {
        id: "leatherworking",
        name: "Leatherworking",
        category: "Creative",
        vector: [0.6, 0.6, 0.5, 0.2, 0.9, 0.5],
        popularityScore: 0.52,
        description: "Creating wallets, belts, and bags from leather.",
        costLevel: "$$$",
        timeRequirement: "Moderate",
        roadmap: {
            day30: "Make a simple card holder. Learn saddle stitching.",
            day60: "Learn to bevel/burnish edges and make a belt.",
            day90: "Complete a small lined bag or a complex bifold wallet."
        },
        starterKit: ["Leather scraps", "Awl", "Needles", "Hammer"],
        estimatedCost: "$70 - $200",
        resources: ["Leathercraft Masterclass", "r/leathercraft", "Tandy Leather"]
    },
    {
        id: "gardentrains",
        name: "Model Railroading",
        category: "Technical",
        vector: [0.8, 0.9, 0.3, 0.5, 0.8, 0.9],
        popularityScore: 0.42,
        description: "Building detailed miniature railway systems.",
        costLevel: "$$$",
        timeRequirement: "Intensive",
        roadmap: {
            day30: "Setup a basic loop and learn about scale (HO, N).",
            day60: "Build your first terrain piece (mountain or small town).",
            day90: "Wire a DCC system for multi-train control."
        },
        starterKit: ["Train set", "Track", "Power pack", "Scenery"],
        estimatedCost: "$150 - $500",
        resources: ["Model Railroader", "r/modeltrains", "YouTube: Luke Towan"]
    },
    {
        id: "languages",
        name: "Language Learning",
        category: "Educational",
        vector: [0.6, 0.2, 0.1, 0.8, 0.3, 0.3],
        popularityScore: 0.89,
        description: "Acquiring fluency in a new spoken or signed language.",
        costLevel: "$",
        timeRequirement: "High",
        roadmap: {
            day30: "Learn 500 most common words and basic grammar.",
            day60: "Have a 5-minute conversation with a native speaker.",
            day90: "Understand 60% of a podcast or TV show in the target language."
        },
        starterKit: ["App (Duolingo/Anki)", "Language partner", "Notebook"],
        estimatedCost: "$0 - $50",
        resources: ["Duolingo", "iTalki", "r/languagelearning"]
    },
    {
        id: "cycling",
        name: "Cycling",
        category: "Physical",
        vector: [0.6, 0.8, 0.9, 0.6, 0.1, 0.3],
        popularityScore: 0.86,
        description: "Exploring your surroundings on two wheels.",
        costLevel: "$$$",
        timeRequirement: "Moderate",
        roadmap: {
            day30: "Cycle 20km in one go. Learn to fix a flat tire.",
            day60: "Complete a 50km 'Gran Fondo' style ride.",
            day90: "Complete a 100km ride or join a local group ride."
        },
        starterKit: ["Bicycle", "Helmet", "Pump", "Spare tube"],
        estimatedCost: "$300 - $1500",
        resources: ["Bicycling.com", "r/cycling", "Strava"]
    },
    {
        id: "urbanexploration",
        name: "Urban Exploration (Urbex)",
        category: "Physical",
        vector: [0.5, 0.1, 0.7, 0.6, 0.4, 0.2],
        popularityScore: 0.48,
        description: "Exploring abandoned structures and unseen parts of cities.",
        costLevel: "$",
        timeRequirement: "Flexible",
        roadmap: {
            day30: "Find and photograph 3 safe, legal outdoor ruins.",
            day60: "Learn about historical preservation and 'leave no trace'.",
            day90: "Find a hidden underground spot or an old industrial site."
        },
        starterKit: ["Good shoes", "Flashlight", "Camera"],
        estimatedCost: "$0 - $50",
        resources: ["Oblivion State", "r/urbanexploration", "Opacity"]
    },
    {
        id: "coffee",
        name: "Coffee Roasting & Brewing",
        category: "Technical",
        vector: [0.4, 0.6, 0.2, 0.3, 0.7, 0.5],
        popularityScore: 0.74,
        description: "The science and craft of making the perfect cup of coffee.",
        costLevel: "$$",
        timeRequirement: "Flexible",
        roadmap: {
            day30: "Master the V60 or Aeropress. Buy a manual grinder.",
            day60: "Start roasting green beans at home using a popcorn popper.",
            day90: "Develop a custom roast profile for your favorite bean."
        },
        starterKit: ["V60/Aeropress", "Burr grinder", "Digital scale"],
        estimatedCost: "$60 - $150",
        resources: ["James Hoffmann", "r/coffee", "Blue Bottle Guides"]
    },
    {
        id: "meditation",
        name: "Meditation & Mindfulness",
        category: "Mental Health",
        vector: [0.3, 0.1, 0.1, 0.1, 0.1, 0.1],
        popularityScore: 0.92,
        description: "Training the mind to achieve a state of calm and focus.",
        costLevel: "$",
        timeRequirement: "Flexible",
        roadmap: {
            day30: "Complete a 10-day intro program (5-10 mins daily).",
            day60: "Maintain a 20-minute daily habit. Practice walk meditation.",
            day90: "Attend a day-long silent retreat or guided workshop."
        },
        starterKit: ["Quiet space", "Cushion (optional)"],
        estimatedCost: "$0",
        resources: ["Headspace", "Insight Timer", "r/meditation"]
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = hobbies;
} else {
    window.hobbies = hobbies;
}
