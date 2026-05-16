export const seedCourses = [
  {
    title: "Trigonometry Basics",
    slug: "trigonometry-basics",
    category: "Mathematics",
    level: "Beginner",
    duration: "2h 15m",
    accent: "from-sky-400 via-cyan-300 to-emerald-300",
    description:
      "Visual triangles, ratios, and identities with short lessons that help formulas finally click.",
    heroVisual:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
    lessons: [
      {
        id: "tri-1",
        title: "Angles Meet Ratios",
        type: "animation",
        duration: "8 min",
        summary:
          "Sine, cosine, and tangent become intuitive when you anchor them to triangle sides.",
        bullets: [
          "Opposite, adjacent, and hypotenuse define the core ratios.",
          "A single angle determines all three side relationships.",
          "Real-world ramps and shadows are direct trigonometry problems."
        ],
        visualType: "Animated triangle explainer",
        content:
          "Imagine a triangle stretching as the angle grows. The opposite side rises, the adjacent side shifts, and the hypotenuse remains the bridge connecting them. That movement is the visual heart of trigonometry.",
        quiz: [
          {
            question: "Which ratio is opposite over hypotenuse?",
            options: ["Sine", "Cosine", "Tangent", "Secant"],
            answer: "Sine"
          },
          {
            question: "The side next to the angle is called:",
            options: ["Opposite", "Adjacent", "Hypotenuse", "Altitude"],
            answer: "Adjacent"
          }
        ]
      },
      {
        id: "tri-2",
        title: "The Unit Circle Shortcut",
        type: "infographic",
        duration: "10 min",
        summary:
          "Memorize the key values visually with quadrants, symmetry, and coordinate thinking.",
        bullets: [
          "Coordinates on the unit circle are cosine and sine.",
          "Reference angles help reduce memorization load.",
          "Signs change across quadrants in predictable ways."
        ],
        visualType: "Quadrant infographic",
        content:
          "The unit circle turns memorization into pattern recognition. Every point on the circle encodes angle information as x and y coordinates, which directly map to cosine and sine.",
        quiz: [
          {
            question: "On the unit circle, the x-coordinate represents:",
            options: ["Sine", "Cosine", "Tangent", "Radius"],
            answer: "Cosine"
          }
        ]
      }
    ]
  },
  {
    title: "Physics Motion",
    slug: "physics-motion",
    category: "Physics",
    level: "Intermediate",
    duration: "3h 05m",
    accent: "from-fuchsia-400 via-violet-400 to-sky-400",
    description:
      "Master velocity, acceleration, and displacement through cinematic motion breakdowns.",
    heroVisual:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
    lessons: [
      {
        id: "phy-1",
        title: "Distance vs Displacement",
        type: "micro-learning",
        duration: "7 min",
        summary:
          "One tracks total ground covered, the other tracks net change in position.",
        bullets: [
          "Distance is scalar; displacement is vector.",
          "You can walk a lot but end close to where you started.",
          "Direction matters for displacement."
        ],
        visualType: "Path animation",
        content:
          "Picture a runner looping around a track. The path length keeps increasing, but the straight-line difference from start to finish may be zero if they return to the same spot.",
        quiz: [
          {
            question: "Which quantity includes direction?",
            options: ["Distance", "Speed", "Displacement", "Time"],
            answer: "Displacement"
          }
        ]
      },
      {
        id: "phy-2",
        title: "Acceleration Stories",
        type: "animation",
        duration: "12 min",
        summary:
          "Acceleration means any change in velocity, including speeding up, slowing down, or changing direction.",
        bullets: [
          "Velocity combines speed and direction.",
          "Turning in a circle means accelerating.",
          "Graphs reveal acceleration patterns instantly."
        ],
        visualType: "Velocity graph visualizer",
        content:
          "A skateboarder accelerating downhill has a visibly steep velocity graph, while braking at the end creates a negative slope. The graph tells the motion story before equations do.",
        quiz: [
          {
            question: "Acceleration can happen when an object:",
            options: ["Changes direction only", "Speeds up only", "Slows down only", "All of the above"],
            answer: "All of the above"
          }
        ]
      }
    ]
  },
  {
    title: "Biology Cells",
    slug: "biology-cells",
    category: "Biology",
    level: "Beginner",
    duration: "2h 40m",
    accent: "from-emerald-400 via-teal-300 to-cyan-300",
    description:
      "Explore organelles, cell transport, and life processes with interactive visuals and quizzes.",
    heroVisual:
      "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1200&q=80",
    lessons: [
      {
        id: "bio-1",
        title: "Meet the Organelles",
        type: "infographic",
        duration: "9 min",
        summary:
          "Think of the cell as a city where each organelle runs a different vital system.",
        bullets: [
          "The nucleus stores instructions.",
          "Mitochondria release usable energy.",
          "Ribosomes assemble proteins."
        ],
        visualType: "Cell city infographic",
        content:
          "Cells become memorable when we treat each organelle like a department in a highly efficient city. That metaphor makes structure-function relationships easier to recall.",
        quiz: [
          {
            question: "Which organelle is known as the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"],
            answer: "Mitochondria"
          }
        ]
      },
      {
        id: "bio-2",
        title: "Cell Membrane Gatekeeping",
        type: "gamification",
        duration: "11 min",
        summary:
          "Learn diffusion, osmosis, and active transport through a rule-based transport game.",
        bullets: [
          "Diffusion moves particles down a concentration gradient.",
          "Osmosis is water movement across a membrane.",
          "Active transport needs energy."
        ],
        visualType: "Transport simulation",
        content:
          "The membrane is selective, not passive. A transport simulation reveals how molecules move differently depending on size, charge, and concentration gradients.",
        quiz: [
          {
            question: "Which process requires energy?",
            options: ["Diffusion", "Osmosis", "Active transport", "Equilibrium"],
            answer: "Active transport"
          }
        ]
      }
    ]
  }
];

export const testimonials = [
  {
    name: "Aarav",
    role: "Class 11 student",
    quote: "The motion visuals made one chapter feel shorter than a YouTube short binge."
  },
  {
    name: "Maya",
    role: "NEET aspirant",
    quote: "Cell biology finally stopped feeling like a wall of labels and started feeling logical."
  },
  {
    name: "Riya",
    role: "Engineering freshman",
    quote: "The streaks and XP nudged me back into daily revision without it feeling forced."
  }
];

export const leaderboardSeed = [
  { name: "Riya S.", xp: 2480, streak: 18, badge: "Concept Sprinter" },
  { name: "Aarav K.", xp: 2325, streak: 16, badge: "Quiz Ace" },
  { name: "Sara M.", xp: 2190, streak: 14, badge: "Visual Thinker" },
  { name: "Kabir P.", xp: 2105, streak: 12, badge: "Consistency King" }
];
