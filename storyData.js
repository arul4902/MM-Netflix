/**
 * OUR STORY — NOW STREAMING
 * Centralized Content Architecture
 * Real story of Meghana & Manideep (Bunnyy)
 */

export const storyData = {
  couple: {
    bride: "Meghana",
    groom: "Manideep",
    nickname: "Bunnyy",
    monogram: "M & M",
    title: "OUR STORY",
    tagline: "From school-time love to forever.",
    yearsTogether: "8+ Years",
    weddingDate: "May 10, 2026",
    status: "Just Married → Forever",
    nextChapter: "Baby Coming Soon 👶"
  },

  quotes: {
    specialMomentQuestion: "What is the most special moment in our life?",
    specialMomentAnswerTelugu: "Nitho unna prathi moment special eh naku.",
    specialMomentAnswerEnglish: "Every moment I spend with you is special to me.",
    loveSentimentTelugu: "Thanu na paina chupinchina prema ki nenu entha cheppina thakkuve.",
    loveSentimentEnglish: "No matter how much I say, it will never be enough to describe the love he has shown me.",
    finalLoveLetterTelugu: [
      "Nenu eppudu nitho unta.",
      "Ninnu odhili undadam na valla kaadhu.",
      "Love ante ento ardam ayyela chesindhi ni prema na paina.",
      "The way you look at me will always make me feel special.",
      "I love you endlessly, Bunnyy. ❤️"
    ],
    roseQuote: "Some people wait for occasions. He created them. 🌹",
    bagQuote: "It wasn't about the bag. It was about him remembering the smallest thing she said.",
    theatreQuote: "Two people. One room. Countless movie nights."
  },

  timelineStages: [
    { id: "stage-crush", label: "School Crush", year: "10th Class", icon: "🎒" },
    { id: "stage-proposal", label: "Proposal", year: "Intermediate", icon: "💍" },
    { id: "stage-love", label: "Best Friends", year: "8 Years", icon: "❤️" },
    { id: "stage-family", label: "Pelli Choopulu", year: "Family Proposal", icon: "✨" },
    { id: "stage-marriage", label: "Marriage", year: "May 10, 2026", icon: "👰" },
    { id: "stage-forever", label: "Married Life", year: "Season 2", icon: "🍿" },
    { id: "stage-baby", label: "Coming Soon", year: "Next Episode", icon: "👶" }
  ],

  episodes: [
    {
      id: "ep-1",
      number: "EP 01",
      title: "Before She Knew",
      season: "Season 1",
      badge: "The Beginning",
      duration: "10th Class",
      thumbnail: "./assets/media/forest_sunflare_hands.png",
      tagline: "He loved her before their story had even begun.",
      description: "It all started in school. Long before she had any idea, he was already captivated by her smile. A quiet crush that would soon shape their entire universe.",
      category: "Origins"
    },
    {
      id: "ep-2",
      number: "EP 02",
      title: "The Proposal",
      season: "Season 1",
      badge: "The Turning Point",
      duration: "Intermediate",
      thumbnail: "./assets/media/sunny_gaze_close.png",
      video: "./assets/media/video_twirl_handhold.mp4",
      tagline: "He finally gathered the courage. And she said yes.",
      description: "During Intermediate, he couldn't keep his feelings hidden any longer. He confessed his love, and with the sweetest smile, she accepted.",
      category: "Milestone"
    },
    {
      id: "ep-3",
      number: "EP 03",
      title: "Midnight on the Terrace",
      season: "Season 1",
      badge: "Secret Premiere",
      duration: "12:00 AM",
      thumbnail: "./assets/media/beach_sunset_silhouette.png",
      tagline: "Without anyone knowing, he stepped onto her terrace.",
      description: "Around the time she accepted his proposal, he secretly snuck onto her terrace at midnight for her birthday with a cake, a teddy bear, and a bouquet of flowers.",
      category: "Romance"
    },
    {
      id: "ep-4",
      number: "EP 04",
      title: "Best Friends in Love",
      season: "Season 1",
      badge: "Pure Chaos & Joy",
      duration: "Daily Magic",
      thumbnail: "./assets/media/hero_playful_pout.png",
      video: "./assets/media/video_arcade_fun.mp4",
      tagline: "They laughed like idiots, fought like kids, and loved like forever.",
      description: "Their love was grounded in genuine friendship. From competitive arcade basketball shootouts to making goofy faces and laughing until their stomachs hurt.",
      category: "Friendship"
    },
    {
      id: "ep-5",
      number: "EP 05",
      title: "The Little Things",
      season: "Season 1",
      badge: "Surprise",
      duration: "Unexpected",
      thumbnail: "./assets/media/candid_mk_handbag.png",
      tagline: "She was joking. He wasn't.",
      description: "One day she jokingly asked for an expensive Michael Kors bag, never expecting it. To her complete surprise, he bought it for her, making her heart soar.",
      category: "Surprise"
    },
    {
      id: "ep-6",
      number: "EP 06",
      title: "Roses & Surprises",
      season: "Season 1",
      badge: "Love Language",
      duration: "Always",
      thumbnail: "./assets/media/forest_red_gown.png",
      tagline: "He never needed a reason to bring her flowers.",
      description: "Roses on ordinary Tuesdays. Little surprises when least expected. He proved that love isn't saved for anniversaries; it's poured into every ordinary day.",
      category: "Romance"
    },
    {
      id: "ep-7",
      number: "EP 07",
      title: "His Kind of Love",
      season: "Season 1",
      badge: "Care + Protection",
      duration: "Through Everything",
      thumbnail: "./assets/media/aerial_birds_eye_hug.png",
      video: "./assets/media/video_maharani_roles.mp4",
      tagline: "Like a mother's care. Stood beside her through every storm.",
      description: "Whenever she wasn't feeling well, he stayed awake through the night watching over her. His love language was never mere words; it was presence, safety, and unwavering support.",
      category: "Heartfelt"
    },
    {
      id: "ep-8",
      number: "EP 08",
      title: "In Front of Everyone",
      season: "Season 1",
      badge: "Pelli Choopulu",
      duration: "Family Milestone",
      thumbnail: "./assets/media/wedding_purple_laugh.png",
      tagline: "He proposed again — this time in front of her entire family.",
      description: "She had already said yes once years ago. But on the day of their Pelli Choopulu, in front of parents, elders, and both families, he proudly asked for her hand again.",
      category: "Family"
    },
    {
      id: "ep-9",
      number: "EP 09",
      title: "May 10, 2026",
      season: "Season 1 Finale",
      badge: "Wedding Day",
      duration: "Forever",
      thumbnail: "./assets/media/grand_royal_wedding.png",
      video: "./assets/media/video_wedding_mandapam.mp4",
      tagline: "The day their story officially became forever.",
      description: "After 8 long years of devotion, patience, and convincing their families, they tied the knot. The sacred Jeelakarra Bellam, the holy mantras, and a lifetime promised.",
      category: "Wedding"
    },
    {
      id: "ep-10",
      number: "EP 10",
      title: "Movie Nights",
      season: "Season 2 Premiere",
      badge: "Married Life",
      duration: "Our Room",
      thumbnail: "./assets/media/movie_theatre_seats.png",
      video: "./assets/media/video_car_drive.mp4",
      tagline: "Our favorite cinema isn't a theatre. It's our room.",
      description: "Married life brought the sweetest comfort: snuggling up in their room with popcorn, dimming the lights, and watching movies together as husband and wife.",
      category: "Marriage"
    },
    {
      id: "ep-11",
      number: "FINAL SEASON",
      title: "Our Greatest Adventure",
      season: "Season 3",
      badge: "Coming Soon 👶",
      duration: "Soon",
      thumbnail: "./assets/media/sunset_embrace_gold.png",
      tagline: "Two became one story. Soon, our story becomes three.",
      description: "The sweetest chapter is unfolding. Their family of two is expanding into three. A new profile is unlocking soon...",
      category: "Future"
    }
  ],

  maharaniRoles: [
    { title: "When she is sick 🤒", role: "Her Personal Doctor", icon: "🩺", desc: "Stays awake all night, checks her temperature, and gives medicine with gentle care." },
    { title: "When she wants to go out 😄", role: "Her Rapido Captain", icon: "🛵", desc: "Helmet on, bike ready! Destination wherever my Maharani commands." },
    { title: "When she needs photos 📸", role: "Her National Geographic Photographer", icon: "📷", desc: "Takes 500 angles until she gets that 1 perfect aesthetic Instagram click." },
    { title: "When she is hungry 🍕", role: "Her Express Zomato Delivery", icon: "🍕", desc: "Hot food brought to bed within minutes. Late-night cravings solved." },
    { title: "When she wants money 💵", role: "Her Dubai Sheikh", icon: "💰", desc: "Whatever my queen desires — swipe the card and buy the bag!" },
    { title: "When she wants to win an argument ⚖️", role: "Her Supreme Court Lawyer", icon: "⚖️", desc: "She is always 100% right, judgment passed with zero objections!" },
    { title: "When she finds something 🔍", role: "Her Personal Google", icon: "🔎", desc: "Finds lost clips, earrings, clothes, and memories in 2 seconds flat." }
  ],

  interactiveLittleThings: [
    { title: "Random Roses", icon: "🌹", tag: "Love Language", desc: "Bringing fresh roses on ordinary days without waiting for any occasion." },
    { title: "The Surprise Bag", icon: "👜", tag: "Thoughtfulness", desc: "Remembering a casual Michael Kors joke and turning it into reality." },
    { title: "Room Movie Nights", icon: "🍿", tag: "Comfort", desc: "Dimmed lights, cozy blankets, sharing snacks in our own personal cinema." },
    { title: "Fighting Like Kids", icon: "😂", tag: "Playfulness", desc: "Squabbling over silly arcade games, teasing each other, making goofy faces." },
    { title: "Making Up Instantly", icon: "❤️", tag: "Commitment", desc: "Never letting anger last. One hug, one smile, and everything is forgiven." },
    { title: "Midnight Vigil", icon: "🌙", tag: "Protection", desc: "Staying awake through the darkest hours whenever she wasn't feeling well." },
    { title: "Terrace Memories", icon: "🎂", tag: "Nostalgia", desc: "Sneaking onto the terrace at 12:00 AM with cake and a giant teddy bear." },
    { title: "Family Proposal", icon: "💍", tag: "Bravery", desc: "Dropping to one knee at Pelli Choopulu with both families cheering." },
    { title: "Choosing Each Other", icon: "🤝", tag: "Forever", desc: "8 beautiful years of choosing one another every single sunrise." }
  ],

  constellationMemories: [
    { id: 1, x: 18, y: 32, title: "The 10th Class Gaze", date: "School Days", img: "./assets/media/forest_sunflare_hands.png", text: "Long before she noticed, his world stopped whenever she walked past." },
    { id: 2, x: 34, y: 68, title: "Intermediate Yes", date: "Intermediate", img: "./assets/media/sunny_gaze_close.png", text: "The day she smiled, looked into his eyes, and said she felt the same way." },
    { id: 3, x: 48, y: 25, title: "Terrace at 12:00 AM", date: "Midnight Surprise", img: "./assets/media/beach_sunset_silhouette.png", text: "Cake, teddy, and flowers under a canopy of quiet stars." },
    { id: 4, x: 62, y: 75, title: "Arcade Champion Date", date: "Candid Fun", img: "./assets/media/hero_playful_pout.png", text: "Scoring hoops, cheering loudly, and laughing until our sides ached." },
    { id: 5, x: 78, y: 30, title: "The Michael Kors Surprise", date: "Sweetest Surprise", img: "./assets/media/candid_mk_handbag.png", text: "A joke she forgot, but a promise he kept." },
    { id: 6, x: 86, y: 65, title: "Pelli Choopulu Proposal", date: "Family Premiere", img: "./assets/media/wedding_purple_laugh.png", text: "Reaffirming love in front of the entire family with proud smiles." },
    { id: 7, x: 50, y: 50, title: "May 10, 2026", date: "Wedding Day", img: "./assets/media/grand_royal_wedding.png", text: "Jeelakarra Bellam, sacred vows, and two souls sealed as one forever." }
  ],

  gallery: [
    { src: "./assets/media/grand_royal_wedding.png", title: "Grand Royal Wedding", tag: "Wedding", caption: "May 10, 2026 • The Day Our Forever Began" },
    { src: "./assets/media/sunset_embrace_gold.png", title: "Golden Hour Embrace", tag: "Romance", caption: "Sunset mountain glow in each other's arms" },
    { src: "./assets/media/beach_sunset_silhouette.png", title: "Beach Sunset Silhouette", tag: "Romance", caption: "Whispering forever as the ocean waves crash" },
    { src: "./assets/media/wedding_purple_laugh.png", title: "Traditional Joy", tag: "Wedding", caption: "Pure laughter during the pre-wedding rituals" },
    { src: "./assets/media/candid_beard_pinch.png", title: "Best Friends Teasing", tag: "Candid", caption: "Playful chin pinching and unstoppable giggles" },
    { src: "./assets/media/cheek_kiss_selfie.png", title: "Sweetest Cheek Kiss", tag: "Romance", caption: "Her kiss, his brightest grin" },
    { src: "./assets/media/hero_playful_pout.png", title: "Playful Pout & Clasp", tag: "Candid", caption: "The classic cute couple pose" },
    { src: "./assets/media/forest_red_gown.png", title: "Enchanted Forest Walk", tag: "Pre-Wedding", caption: "Red gown, white shirt, and endless green canopy" },
    { src: "./assets/media/forest_sunflare_hands.png", title: "Sunflare Bridge Moment", tag: "Pre-Wedding", caption: "Sunbeams streaming through the trees on the wooden bridge" },
    { src: "./assets/media/waterfall_glass_art.png", title: "Behind the Water Glass", tag: "Artistic", caption: "A cinematic silhouette through shimmering water droplets" },
    { src: "./assets/media/movie_theatre_seats.png", title: "Our Cinema Dates", tag: "Movie Nights", caption: "Asian Cinemas date • Preparing for cozy room movie nights" },
    { src: "./assets/media/wedding_car_garlands.png", title: "Just Married Drive", tag: "Wedding", caption: "First ride as husband and wife with fresh garlands" },
    { src: "./assets/media/white_attire_dream.png", title: "All-White Dream", tag: "Romance", caption: "Soft white linen, warm breeze, and pure happiness" },
    { src: "./assets/media/mirror_festive_saree.png", title: "Festive Elegance", tag: "Candid", caption: "Green pattu saree and celebratory smile" },
    { src: "./assets/media/aerial_birds_eye_hug.png", title: "Overhead Embrace", tag: "Artistic", caption: "Looking from above: two hearts in perfect sync" },
    { src: "./assets/media/candid_mk_handbag.png", title: "The Michael Kors Day", tag: "Surprise", caption: "Holding hands and showing off her favorite surprise bag" }
  ],

  videos: [
    { src: "./assets/media/video_wedding_mandapam.mp4", title: "Sacred Jeelakarra Bellam", tag: "Wedding Ceremony", desc: "The holy moment under the mandapam as the curtain lowered." },
    { src: "./assets/media/video_beach_romance.mp4", title: "Beach Sunrise Dance", tag: "Him & I", desc: "Running barefoot in the waves, holding hands towards the rising sun." },
    { src: "./assets/media/video_maharani_roles.mp4", title: "How My Maharani Sees Me", tag: "Funny & Loving", desc: "Doctor, Rapido, Photographer, Zomato, Sheikh, Lawyer & Google!" },
    { src: "./assets/media/video_arcade_fun.mp4", title: "Arcade Basketball Shootout", tag: "Playful Fun", desc: "Hooping like champions and fighting like kids at the arcade." },
    { src: "./assets/media/video_car_drive.mp4", title: "Car Drive Selfies", tag: "Daily Rides", desc: "Winks, smiles, hair adjustments, and highway tunes." },
    { src: "./assets/media/video_twirl_handhold.mp4", title: "Corridor Twirl", tag: "Sweet Moments", desc: "Hold my hand, turn around, and laugh out loud." }
  ],

  whatsappChat: [
    { sender: "meghana", text: "Pelli cheskundhamaaa? 🫱🏻‍🫲🏼", time: "11:07 PM" },
    { sender: "bunnyy", text: "Cheskundham", time: "11:11 PM" },
    { sender: "meghana", text: "🥹🥹🥹", time: "11:12 PM" },
    { sender: "bunnyy", text: "😊", time: "11:12 PM" },
    { sender: "meghana", text: "Our big day tomorrow", time: "11:12 PM" },
    { sender: "bunnyy", text: "🥹", time: "11:12 PM" },
    { sender: "bunnyy", text: "8yrs", time: "11:12 PM", highlight: true },
    { sender: "meghana", text: "🥹🥹", time: "11:13 PM" },
    { sender: "meghana", text: "Good bye boy friend!!!", time: "11:13 PM", highlight: true },
    { sender: "bunnyy", text: "Good bye girlfriend", time: "11:14 PM", highlight: true },
    { sender: "meghana", text: "See youu tomorrow", time: "11:14 PM" },
    { sender: "bunnyy", text: "Okk maharani 👑", time: "11:14 PM", highlight: true }
  ]
};
