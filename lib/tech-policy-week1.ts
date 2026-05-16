import type { QuizQuestion } from "@/lib/quiz-data";

export const TECH_POLICY_WEEK_1_QUESTIONS: QuizQuestion[] = [
  {
    id: "tp-w1-q1",
    questionNumber: "TP W1 Q1",
    type: "mcq",
    prompt:
      "Based on the introductory timeline of technological developments, which civilization's advancement in regional influence and economic power is explicitly tied to a specific dated structure from approximately 2400 BCE?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. The Mesopotamian cultivation systems in arid zones.",
      "B. The Shang Dynasty's military dominance via metallurgy.",
      "C. The Indian civilization's mastery of water engineering at Lothal.",
      "D. The Portuguese naval innovation involving the caravel."
    ],
    correctAnswer: "C",
    answerKey: ["C"],
    explanation:
      "The text details that water engineering in India, notably the dock at Lothal dated to around 2400 BCE, showcases how early technological prowess directly translated into economic power and regional influence."
  },
  {
    id: "tp-w1-q2",
    questionNumber: "TP W1 Q2",
    type: "mcq",
    prompt:
      "During the Age of Exploration, what specific combination of naval innovations allowed Portugal and later Spain to fundamentally alter the European balance of power?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Steam power and mechanized production units.",
      "B. The caravel ship design and the astrolabe navigation tool.",
      "C. Ironclad warships and advanced chemical tracking.",
      "D. Satellite navigation networks and global mapping systems."
    ],
    correctAnswer: "B",
    answerKey: ["B"],
    explanation:
      "The presentation explicitly identifies the caravel and astrolabe as the shipbuilding and navigation tools that enabled long-distance ocean voyages and maritime empires."
  },
  {
    id: "tp-w1-q3",
    questionNumber: "TP W1 Q3",
    type: "mcq",
    prompt:
      "According to the presentation, what was the primary driving force behind the geopolitical paradigm shift that led to Britain establishing a global empire on which the sun never set?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Elite space exploration programs during the mid-20th century.",
      "B. Early dominance in digital cyberspace surveillance networks.",
      "C. Mastery of bronze-working to dominate neighboring local tribes.",
      "D. 18th and 19th-century technological advances like steam power, mechanized production, and railways."
    ],
    correctAnswer: "D",
    answerKey: ["D"],
    explanation:
      "The Industrial Revolution is presented as the decisive leap: steam power, mechanization, and railways created the technological lead that translated into imperial power."
  },
  {
    id: "tp-w1-q4",
    questionNumber: "TP W1 Q4",
    type: "mcq",
    prompt:
      "Which historical conflict serves as the backdrop where technological prestige was prioritized just as heavily as raw military capability, catalyzed by a 1957 satellite launch?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. World War I",
      "B. World War II",
      "C. The Cold War",
      "D. The Information War against India"
    ],
    correctAnswer: "C",
    answerKey: ["C"],
    explanation:
      "The launch of Sputnik 1 in 1957 intensified the Cold War's technology race, where prestige and capability became tightly linked."
  },
  {
    id: "tp-w1-q5",
    questionNumber: "TP W1 Q5",
    type: "mcq",
    prompt:
      "How is the current ultimate frontier of geopolitical influence characterized in the lecture's key takeaways?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. A shift back to ancient irrigation systems to combat arid zone expansion.",
      "B. A migration of the battleground from physical territory to cyberspace governed by AI, data control, and information warfare.",
      "C. Total reliance on nuclear kinetics and physical space exploration platforms.",
      "D. The complete abandonment of technological edges in favor of cultural isolation."
    ],
    correctAnswer: "B",
    answerKey: ["B"],
    explanation:
      "The lecture closes by describing cyberspace as the new frontier, with power tied to AI, data control, and information warfare."
  },
  {
    id: "tp-w1-q6",
    questionNumber: "TP W1 Q6",
    type: "multi-select",
    prompt:
      "According to the module text, which technological innovations were explicitly identified as decisive factors that determined the ultimate outcome of World War II?",
    sectionTitle: "Multiple Choice",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Chemical weapons",
      "B. Radar",
      "C. Jet engines",
      "D. The atomic bomb"
    ],
    correctAnswer: "B, C, and D",
    answerKey: ["B", "C", "D"],
    explanation:
      "The text separates the wars clearly: chemical weapons align with World War I, while radar, jet engines, and the atomic bomb are named as decisive for World War II."
  },
  {
    id: "tp-w1-q7",
    questionNumber: "TP W1 Q7",
    type: "multi-select",
    prompt:
      "Based on the present and future outlook slide, what are the anticipated revolutionary capabilities of quantum computing compared to classical computers?",
    sectionTitle: "Multiple Choice",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Solving complex problems exponentially faster.",
      "B. Constructing physical water engineering docks.",
      "C. Revolutionizing cryptography and financial modeling.",
      "D. Enhancing drug discovery processes."
    ],
    correctAnswer: "A, C, and D",
    answerKey: ["A", "C", "D"],
    explanation:
      "The lecture highlights faster complex-problem solving and specific downstream impacts in cryptography, finance, and drug discovery."
  },
  {
    id: "tp-w1-q8",
    questionNumber: "TP W1 Q8",
    type: "fill-blank",
    prompt:
      "The internet, which has transformed into a critical structural backbone for modern global commerce and communication, was originally incubated as a United States military project named ________.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "ARPANET",
    answerKey: ["ARPANET"],
    options: ["ARPANET", "Sputnik", "Astrolabe", "Railways"],
    explanation:
      "The module explicitly names ARPANET as the military precursor to the modern internet."
  },
  {
    id: "tp-w1-q9",
    questionNumber: "TP W1 Q9",
    type: "fill-blank",
    prompt:
      "In the glossary section of this module, a sudden, large, and critically important change or structural improvement in something is defined by the vocabulary term '________ ________'.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "Quantum leap",
    answerKey: ["Quantum leap"],
    options: ["Quantum leap", "Bronze working", "Cold War", "Data control"],
    explanation:
      "The key words section defines quantum leap as a sudden and important change or improvement."
  },
  {
    id: "tp-w1-q10",
    questionNumber: "TP W1 Q10",
    type: "fill-blank",
    prompt:
      "The Shang Dynasty managed to dominate neighboring tribes and establish a powerful state around 2000 BCE by achieving a critical military advantage through the mastery of ________.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "bronze-working",
    answerKey: ["bronze-working", "bronze working"],
    options: ["bronze-working", "mechanized production", "water engineering", "satellite launch"],
    explanation:
      "The text links the Shang Dynasty's rise to the strategic advantage created by bronze-working."
  },
  {
    id: "tp-w1-q11",
    questionNumber: "TP W1 Q11",
    type: "mcq",
    prompt: "Which ancient Indian site is mentioned as evidence of technological prowess in water engineering?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: ["A. Mohenjo-Daro", "B. Harappa", "C. Lothal", "D. Taxila"],
    correctAnswer: "C",
    answerKey: ["C"],
    explanation:
      "Lothal's dockyard is used as the example of advanced water engineering and maritime trade capability."
  },
  {
    id: "tp-w1-q12",
    questionNumber: "TP W1 Q12",
    type: "mcq",
    prompt: "Which technological innovation enabled long-distance ocean voyages during the Age of Exploration?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: ["A. Steam engine", "B. Radar", "C. Caravel and astrolabe", "D. Atomic bomb"],
    correctAnswer: "C",
    answerKey: ["C"],
    explanation:
      "The caravel and astrolabe are the lecture's named examples of the technology that enabled long-distance navigation."
  },
  {
    id: "tp-w1-q13",
    questionNumber: "TP W1 Q13",
    type: "mcq",
    prompt: "Which event demonstrated the USSR’s technological superiority during the Cold War?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: ["A. Moon landing", "B. Launch of Sputnik 1", "C. Invention of ARPANET", "D. Development of radar"],
    correctAnswer: "B",
    answerKey: ["B"],
    explanation:
      "Sputnik 1 was the world's first artificial satellite and triggered a sharp technology race."
  },
  {
    id: "tp-w1-q14",
    questionNumber: "TP W1 Q14",
    type: "mcq",
    prompt: "ARPANET was originally developed as:",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. A British scientific project",
      "B. A Soviet defense network",
      "C. A US military project",
      "D. A private commercial network"
    ],
    correctAnswer: "C",
    answerKey: ["C"],
    explanation:
      "The lecture describes ARPANET as the US military project that later evolved into the internet."
  },
  {
    id: "tp-w1-q15",
    questionNumber: "TP W1 Q15",
    type: "mcq",
    prompt: "According to the presentation, which emerging technology could revolutionize cryptography and drug discovery?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: ["A. Robotics", "B. Blockchain", "C. Quantum computing", "D. Nanotechnology"],
    correctAnswer: "C",
    answerKey: ["C"],
    explanation:
      "Quantum computing is highlighted as the emerging technology with major implications for cryptography and drug discovery."
  },
  {
    id: "tp-w1-q16",
    questionNumber: "TP W1 Q16",
    type: "multi-select",
    prompt: "Which of the following technologies are mentioned as decisive during World War II?",
    sectionTitle: "Multiple Choice",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: ["A. Radar", "B. Jet engines", "C. Atomic bomb", "D. Astrolabe"],
    correctAnswer: "A, B, and C",
    answerKey: ["A", "B", "C"],
    explanation:
      "Radar, jet engines, and the atomic bomb are explicitly named as World War II's decisive technologies."
  },
  {
    id: "tp-w1-q17",
    questionNumber: "TP W1 Q17",
    type: "multi-select",
    prompt: "Which of the following are identified as tools of modern geopolitical influence in cyberspace?",
    sectionTitle: "Multiple Choice",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. State-sponsored hacking",
      "B. Disinformation campaigns",
      "C. Digital surveillance",
      "D. Horse cavalry"
    ],
    correctAnswer: "A, B, and C",
    answerKey: ["A", "B", "C"],
    explanation:
      "The lecture presents hacking, disinformation, and digital surveillance as modern geopolitical tools in cyberspace."
  },
  {
    id: "tp-w1-q18",
    questionNumber: "TP W1 Q18",
    type: "fill-blank",
    prompt:
      "The Industrial Revolution gave Britain an advantage through the development of steam power, mechanized production, and __________.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "railways",
    answerKey: ["railways", "railway"],
    options: ["railways", "bronze-working", "ARPANET", "astrolabe"],
    explanation:
      "Railways accelerated trade, transport, military movement, and industrial expansion."
  },
  {
    id: "tp-w1-q19",
    questionNumber: "TP W1 Q19",
    type: "fill-blank",
    prompt:
      "The successful American moon landing in 1969 demonstrated the US's technological and __________ capabilities.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "organizational",
    answerKey: ["organizational", "organisational"],
    options: ["organizational", "metallurgical", "maritime", "chemical"],
    explanation:
      "The lecture frames the moon landing as proof of both technological and organizational capability."
  },
  {
    id: "tp-w1-q20",
    questionNumber: "TP W1 Q20",
    type: "fill-blank",
    prompt:
      "According to the key takeaways, the new digital battleground is defined by AI, data control, and __________ warfare.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "information",
    answerKey: ["information"],
    options: ["information", "kinetic", "territorial", "maritime"],
    explanation:
      "The final takeaway explicitly uses the phrase information warfare."
  },
  {
    id: "tp-w1-q21",
    questionNumber: "TP W1 Q21",
    type: "mcq",
    prompt:
      "Which concept is described as becoming less relevant in the digital age due to cross-border technological interactions?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Capitalism",
      "B. Westphalian model",
      "C. Industrial Revolution",
      "D. Digital Trade Agreement"
    ],
    correctAnswer: "B",
    answerKey: ["B"],
    explanation:
      "The text says the Westphalian model becomes less relevant in the digital age because digital flows and technologies move across borders beyond traditional territorial limits."
  },
  {
    id: "tp-w1-q22",
    questionNumber: "TP W1 Q22",
    type: "mcq",
    prompt: "Which malware was reportedly used in cyber attacks on Indian power-grid organizations?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: ["A. Pegasus", "B. WannaCry", "C. ShadowPad", "D. Stuxnet"],
    correctAnswer: "C",
    answerKey: ["C"],
    explanation:
      "ShadowPad is cited as the malware used in the attack example, showing how cyber tools can be used in geopolitical conflict."
  },
  {
    id: "tp-w1-q23",
    questionNumber: "TP W1 Q23",
    type: "mcq",
    prompt: "Which agreement is cited as an example of a digital trade agreement?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: ["A. NATO Treaty", "B. Paris Agreement", "C. DEPA", "D. WTO Charter"],
    correctAnswer: "C",
    answerKey: ["C"],
    explanation:
      "DEPA is presented as a digital trade agreement focused on digital commerce, data governance, and technology cooperation."
  },
  {
    id: "tp-w1-q24",
    questionNumber: "TP W1 Q24",
    type: "mcq",
    prompt: "Which company is specifically mentioned in the global debate regarding 5G infrastructure concerns?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: ["A. Apple", "B. Microsoft", "C. Huawei", "D. Tesla"],
    correctAnswer: "C",
    answerKey: ["C"],
    explanation:
      "Huawei is named in the 5G infrastructure debate because of concerns about surveillance, security, and foreign influence."
  },
  {
    id: "tp-w1-q25",
    questionNumber: "TP W1 Q25",
    type: "mcq",
    prompt: "What is described as most important in the Key Words section?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: ["A. Espionage", "B. Troll", "C. Globalisation", "D. Paramount"],
    correctAnswer: "D",
    answerKey: ["D"],
    explanation:
      "The key word 'Paramount' is explicitly defined as 'most important'."
  },
  {
    id: "tp-w1-q26",
    questionNumber: "TP W1 Q26",
    type: "multi-select",
    prompt: "Which of the following are mentioned as examples of Trusted Geographies?",
    sectionTitle: "Multiple Choice",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Clean Network Initiative",
      "B. Digital Silk Road",
      "C. US-India TRUST Initiative",
      "D. Bretton Woods System"
    ],
    correctAnswer: "A, B, and C",
    answerKey: ["A", "B", "C"],
    explanation:
      "The text names Clean Network, Digital Silk Road, and the US-India TRUST Initiative as examples of trusted geographies and technology-based blocs."
  },
  {
    id: "tp-w1-q27",
    questionNumber: "TP W1 Q27",
    type: "multi-select",
    prompt:
      "Which factors are cited by governments as reasons for restrictions or bans on Chinese apps like TikTok?",
    sectionTitle: "Multiple Choice",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Data security risks",
      "B. Surveillance risks",
      "C. Foreign influence concerns",
      "D. Climate change concerns"
    ],
    correctAnswer: "A, B, and C",
    answerKey: ["A", "B", "C"],
    explanation:
      "The lecture ties such restrictions to data security, surveillance concerns, and possible foreign influence rather than climate issues."
  },
  {
    id: "tp-w1-q28",
    questionNumber: "TP W1 Q28",
    type: "fill-blank",
    prompt:
      "The process of increasing connections between countries, economies, and cultures is called __________.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "Globalisation",
    answerKey: ["Globalisation", "Globalization"],
    options: ["Globalisation", "Sovereignty", "Paramount", "Espionage"],
    explanation:
      "Globalisation is defined in the module as the process of increasing connections between countries, economies, and cultures."
  },
  {
    id: "tp-w1-q29",
    questionNumber: "TP W1 Q29",
    type: "fill-blank",
    prompt:
      "The rise of cryptocurrencies challenges national monetary sovereignty and traditional __________ systems.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "financial",
    answerKey: ["financial"],
    options: ["financial", "railway", "industrial", "diplomatic"],
    explanation:
      "The text directly says cryptocurrencies challenge traditional financial systems."
  },
  {
    id: "tp-w1-q30",
    questionNumber: "TP W1 Q30",
    type: "fill-blank",
    prompt:
      "According to the presentation, diplomatic engagements today should focus on technological partnerships, standards-setting bodies, and global tech __________ forums.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "governance",
    answerKey: ["governance"],
    options: ["governance", "surveillance", "shipbuilding", "monetary"],
    explanation:
      "The phrase used in the presentation is global tech governance forums."
  },
  {
    id: "tp-w1-q31",
    questionNumber: "TP W1 Q31",
    type: "mcq",
    prompt:
      "Regarding the intersection of technology and globalization, what does the emergence of the Digital Economy Partnership Agreement (DEPA) primarily demonstrate according to the text?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. The shift towards a heavily state-centric model of internet governance.",
      "B. Efforts to create collaborative frameworks for governing digital trade and data flows.",
      "C. The necessity of indigenous technological capabilities to counter foreign hardware dominance.",
      "D. The disruption of global supply chains due to semiconductor shortages."
    ],
    correctAnswer: "B",
    answerKey: ["B"],
    explanation:
      "DEPA is used as an example of countries building collaborative frameworks for digital trade and data governance."
  },
  {
    id: "tp-w1-q32",
    questionNumber: "TP W1 Q32",
    type: "mcq",
    prompt:
      "The 2012 cyberattack on Indian power-grid organizations using the ShadowPad malware is cited in the document to illustrate which broader geopolitical concept?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. The competition to set global standards for emerging technologies.",
      "B. The vulnerability of multi-stakeholder internet governance models.",
      "C. How technology can be weaponized for espionage to undermine national security.",
      "D. The challenge cryptocurrencies pose to national monetary sovereignty."
    ],
    correctAnswer: "C",
    answerKey: ["C"],
    explanation:
      "The ShadowPad example is used to show how technology is weaponized for cyber espionage and national-security disruption."
  },
  {
    id: "tp-w1-q33",
    questionNumber: "TP W1 Q33",
    type: "mcq",
    prompt:
      "The US-India TRUST Initiative expands collaboration in critical and emerging technologies. Which of the following fields is NOT explicitly listed in the document as a focus area of this initiative?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Quantum computing",
      "B. Biotechnology",
      "C. Autonomous vehicles",
      "D. Space"
    ],
    correctAnswer: "C",
    answerKey: ["C"],
    explanation:
      "The document lists AI, semiconductors, quantum computing, biotechnology, energy, space, and defense, but not autonomous vehicles."
  },
  {
    id: "tp-w1-q34",
    questionNumber: "TP W1 Q34",
    type: "multi-select",
    prompt:
      "According to the text, which of the following serve as illustrations of how non-state actors and cross-border digital flows challenge the traditional Westphalian understanding of sovereign states?",
    sectionTitle: "Multiple Choice",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. The deployment of extensive internal facial recognition surveillance systems by governments.",
      "B. The influence of multinational tech companies like Facebook and Google operating across borders.",
      "C. The continuous flow of data across national boundaries for global business operations.",
      "D. The rise of cryptocurrencies and potential central bank digital currencies (CBDCs)."
    ],
    correctAnswer: "B, C, and D",
    answerKey: ["B", "C", "D"],
    explanation:
      "The text uses multinational platforms, cross-border data flows, and digital currencies as examples of pressures that move beyond traditional territorial sovereignty."
  },
  {
    id: "tp-w1-q35",
    questionNumber: "TP W1 Q35",
    type: "multi-select",
    prompt:
      "Which of the following geopolitical implications are directly associated with the concept that not all tech partners are the same and the resulting rise of trusted geographies?",
    sectionTitle: "Multiple Choice",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. The potential fragmentation of the global internet.",
      "B. The obsolescence of indigenous technological capabilities.",
      "C. The need for new international frameworks to govern the global digital commons.",
      "D. The formation of digital alliances based solely on geographic proximity rather than shared values."
    ],
    correctAnswer: "A and C",
    answerKey: ["A", "C"],
    explanation:
      "The text connects trusted geographies to internet fragmentation and the need for new governance frameworks, not to the disappearance of indigenous capability or geography-only alliances."
  },
  {
    id: "tp-w1-q36",
    questionNumber: "TP W1 Q36",
    type: "fill-blank",
    prompt:
      "The ongoing debates over internet governance exemplify the struggle between the collaborative multi-stakeholder model and the __________ approach.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "state-centric",
    answerKey: ["state-centric", "state centric"],
    options: ["state-centric", "market-only", "quantum", "federal"],
    explanation:
      "The lecture frames internet governance as a struggle between a multi-stakeholder and a state-centric model."
  },
  {
    id: "tp-w1-q37",
    questionNumber: "TP W1 Q37",
    type: "fill-blank",
    prompt:
      "The U.S.-led initiative aimed at creating a network of reliable partners for 5G deployment and other critical technologies, while excluding Chinese companies, is known as the __________ Initiative.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "Clean Network",
    answerKey: ["Clean Network"],
    options: ["Clean Network", "Digital Silk Road", "TRUST", "Quantum Leap"],
    explanation:
      "The Clean Network Initiative is presented as a leading example of a trusted geography built around technology trust and exclusion of perceived risk."
  },
  {
    id: "tp-w1-q38",
    questionNumber: "TP W1 Q38",
    type: "fill-blank",
    prompt:
      "In an era where digital technologies blur the lines between domestic and international spheres, the ability to maintain __________ and transparency in technological collaborations becomes paramount.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "trust",
    answerKey: ["trust"],
    options: ["trust", "bronze", "railways", "surveillance"],
    explanation:
      "The presentation emphasizes that trust and transparency become paramount in technological collaboration."
  },
  {
    id: "tp-w1-q39",
    questionNumber: "TP W1 Q39",
    type: "mcq",
    prompt:
      "Assertion (A): The concept of trusted geographies will likely lead to the formation of digital alliances and blocs based on shared values and geopolitical alignment. Reason (R): The traditional Westphalian understanding of sovereign states perfectly accommodates the interconnected networks created by modern digital technologies.",
    sectionTitle: "Assertion-Reason",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Both A and R are true and R is the correct explanation of A.",
      "B. Both A and R are true but R is NOT the correct explanation of A.",
      "C. A is true but R is false.",
      "D. A is false but R is true."
    ],
    correctAnswer: "C",
    answerKey: ["C"],
    explanation:
      "The assertion is true because the text explicitly links trusted geographies to values-based digital blocs, while the reason is false because digital technologies challenge rather than fit neatly within the Westphalian model."
  },
  {
    id: "tp-w1-q40",
    questionNumber: "TP W1 Q40",
    type: "mcq",
    prompt:
      "Assertion (A): The text argues that countries must develop indigenous technological capabilities and reduce dependence on foreign technologies in critical sectors. Reason (R): Recent disruptions in global supply chains, such as semiconductor shortages, have demonstrated how technological dependencies can dictate economic relationships and compromise geopolitical strategies.",
    sectionTitle: "Assertion-Reason",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Both A and R are true and R is the correct explanation of A.",
      "B. Both A and R are true but R is NOT the correct explanation of A.",
      "C. A is true but R is false.",
      "D. A is false but R is true."
    ],
    correctAnswer: "A",
    answerKey: ["A"],
    explanation:
      "Both statements are true, and the supply-chain vulnerability example is exactly why the lecture argues for indigenous capability and reduced critical dependence."
  },
  {
    id: "tp-w1-q41",
    questionNumber: "TP W1 Q41",
    type: "mcq",
    prompt:
      "Which of the following best represents a paradoxical risk of transitioning to a Just-in-Case supply chain model, as outlined in the text's implications?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. It perfectly synthesizes global economic integration with supply chain resilience.",
      "B. It fundamentally redefines economic security solely through the lens of data sovereignty.",
      "C. It challenges economic globalization by potentially breeding protectionism and economic nationalism.",
      "D. It ensures the prevention of technological decoupling by emphasizing trust and transparency between rival powers."
    ],
    correctAnswer: "C",
    answerKey: ["C"],
    explanation:
      "The text warns that Just-in-Case resilience may challenge globalization and potentially encourage protectionism and economic nationalism."
  },
  {
    id: "tp-w1-q42",
    questionNumber: "TP W1 Q42",
    type: "mcq",
    prompt:
      "According to Jaishankar's framework, India's increasing alignment with Western economies as natural partners in technology is fundamentally a reflection of:",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. The Aatmanirbhar Bharat initiative's primary goal to completely isolate the Indian economy.",
      "B. A comprehensive assessment encompassing politics, energy, economics, and technological interests.",
      "C. A permanent shift away from multipolar diversification and a rejection of strategic autonomy.",
      "D. An exclusive, singular focus on the semiconductor industry and clean technologies."
    ],
    correctAnswer: "B",
    answerKey: ["B"],
    explanation:
      "The framework explicitly links partner choice to a wider assessment of politics, energy, economics, and technological interests."
  },
  {
    id: "tp-w1-q43",
    questionNumber: "TP W1 Q43",
    type: "mcq",
    prompt:
      "How does India's strategic autonomy specifically translate into its projected role in the changing technological landscape?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. By allowing it to dominate the global supply of rare earth elements over China.",
      "B. By enabling it to act as a bridge between divergent technological ecosystems and standards.",
      "C. By forcing it to reshore all active pharmaceutical ingredient manufacturing immediately.",
      "D. By restricting its technological partnerships exclusively to the Nagoya model."
    ],
    correctAnswer: "B",
    answerKey: ["B"],
    explanation:
      "The text directly describes India as potentially bridging divergent technological ecosystems and standards because of its strategic autonomy."
  },
  {
    id: "tp-w1-q44",
    questionNumber: "TP W1 Q44",
    type: "mcq",
    prompt:
      "Assertion (A): The emphasis on trust and transparency in supply chains may accelerate the technological decoupling between rival global powers. Reason (R): The Just-in-Case approach inherently relies on strategies like friendshoring and redefining economic security, which prioritizes technological autonomy over purely cost-optimized global integration.",
    sectionTitle: "Assertion-Reason",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Both A and R are true and R is the correct explanation of A.",
      "B. Both A and R are true but R is not the correct explanation of A.",
      "C. A is true but R is false.",
      "D. A is false but R is true."
    ],
    correctAnswer: "A",
    answerKey: ["A"],
    explanation:
      "Both statements are supported by the text, and the Reason explains why trust-first supply chains can push rival powers further apart technologically."
  },
  {
    id: "tp-w1-q45",
    questionNumber: "TP W1 Q45",
    type: "mcq",
    prompt:
      "Assertion (A): To fully capitalize on international technological partnerships, India must aggressively reduce its physical inventory levels. Reason (R): Developing private industrial capacity and creating a competitive framework to attract investment and talent are vital to leveraging international collaborations.",
    sectionTitle: "Assertion-Reason",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Both A and R are true and R is the correct explanation of A.",
      "B. Both A and R are true but R is not the correct explanation of A.",
      "C. A is true but R is false.",
      "D. A is false but R is true."
    ],
    correctAnswer: "D",
    answerKey: ["D"],
    explanation:
      "The Assertion is false because the Just-in-Case model supports increased buffering and resilience, while the Reason is true and aligns with the domestic capacity-building argument."
  },
  {
    id: "tp-w1-q46",
    questionNumber: "TP W1 Q46",
    type: "multi-select",
    prompt:
      "Which of the following pairings of an Indian initiative or mission and its corresponding strategic objective are accurately described in the text?",
    sectionTitle: "Multiple Choice",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Digital India Initiative - A program to transform India into a digitally empowered society, including projects like UPI.",
      "B. Aatmanirbhar Bharat - Aims to build technological capabilities and reduce dependence on foreign technologies.",
      "C. Make in India - An initiative aimed strictly at eradicating the Nagoya model of manufacturing.",
      "D. National Quantum Mission - Focuses on reshoring critical drug manufacturing and APIs."
    ],
    correctAnswer: "A and B",
    answerKey: ["A", "B"],
    explanation:
      "Digital India and Aatmanirbhar Bharat are accurately paired. The other two options distort the stated goals of Make in India and the National Quantum Mission."
  },
  {
    id: "tp-w1-q47",
    questionNumber: "TP W1 Q47",
    type: "multi-select",
    prompt:
      "According to the provided document, which of the following global events or concerns have directly pushed countries to adopt a Just-in-Case strategy?",
    sectionTitle: "Multiple Choice",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. The global chip shortage exposing semiconductor dependencies.",
      "B. Concerns over China's dominance in rare earth element production.",
      "C. The complete eradication of global conflicts rendering supply chains fully stable.",
      "D. The Russia-Ukraine conflict exacerbating the European energy crisis."
    ],
    correctAnswer: "A, B, and D",
    answerKey: ["A", "B", "D"],
    explanation:
      "The text cites chip shortages, rare earth dependence, and the Russia-Ukraine conflict as catalysts, while the idea that conflicts were eradicated is clearly false."
  },
  {
    id: "tp-w1-q48",
    questionNumber: "TP W1 Q48",
    type: "fill-blank",
    prompt:
      "According to Jaishankar's framework, the three main criteria for evaluating potential technological partners are Access, Collaboration, and ________.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "Market",
    answerKey: ["Market", "market"],
    options: ["Market", "Trust", "Data", "Sovereignty"],
    explanation:
      "The framework uses Access, Collaboration, and Market as the three central partner-evaluation criteria."
  },
  {
    id: "tp-w1-q49",
    questionNumber: "TP W1 Q49",
    type: "fill-blank",
    prompt:
      "The shift towards a Just-in-Case model requires redefining economic security to go beyond traditional metrics by incorporating factors such as supply chain resilience, technological autonomy, and data ________.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "sovereignty",
    answerKey: ["sovereignty"],
    options: ["sovereignty", "logistics", "warfare", "monitoring"],
    explanation:
      "The text explicitly includes data sovereignty in the updated idea of economic security."
  },
  {
    id: "tp-w1-q50",
    questionNumber: "TP W1 Q50",
    type: "fill-blank",
    prompt:
      "The strategic practice of relocating critical manufacturing capabilities to allied or politically aligned nations to buffer against global disruptions is specifically referred to in the text as ________.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "friendshoring",
    answerKey: ["friendshoring"],
    options: ["friendshoring", "offshoring", "digitizing", "outsourcing"],
    explanation:
      "Friendshoring is the exact term used for moving critical production into trusted or aligned geographies."
  },
  {
    id: "tp-w1-q51",
    questionNumber: "TP W1 Q51",
    type: "mcq",
    prompt: "What does the Nagoya model mainly refer to?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Renewable energy production",
      "B. Just-in-time manufacturing approach",
      "C. Quantum computing strategy",
      "D. Regional military alliances"
    ],
    correctAnswer: "B",
    answerKey: ["B"],
    explanation:
      "The Nagoya model is used to describe the traditional just-in-time manufacturing approach associated with lean inventory systems."
  },
  {
    id: "tp-w1-q52",
    questionNumber: "TP W1 Q52",
    type: "mcq",
    prompt: "Which factor exposed vulnerabilities in pharmaceutical supply chains?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Blockchain technology",
      "B. Digital India initiative",
      "C. COVID-19 pandemic",
      "D. Mars Orbiter Mission"
    ],
    correctAnswer: "C",
    answerKey: ["C"],
    explanation:
      "The COVID-19 pandemic is cited as the event that exposed deep vulnerabilities in pharma and API supply chains."
  },
  {
    id: "tp-w1-q53",
    questionNumber: "TP W1 Q53",
    type: "mcq",
    prompt: "Which initiative aims to reduce India’s dependence on foreign technologies?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Make in India",
      "B. Aatmanirbhar Bharat",
      "C. Digital India",
      "D. National Quantum Mission"
    ],
    correctAnswer: "B",
    answerKey: ["B"],
    explanation:
      "Aatmanirbhar Bharat is explicitly framed as a self-reliance initiative designed to reduce foreign technological dependence."
  },
  {
    id: "tp-w1-q54",
    questionNumber: "TP W1 Q54",
    type: "mcq",
    prompt: "Which organisation successfully launched India’s Mars Orbiter Mission?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: ["A. DRDO", "B. NASA", "C. ISRO", "D. HAL"],
    correctAnswer: "C",
    answerKey: ["C"],
    explanation:
      "The text identifies ISRO as the agency behind the successful Mars Orbiter Mission."
  },
  {
    id: "tp-w1-q55",
    questionNumber: "TP W1 Q55",
    type: "mcq",
    prompt: "According to Jaishankar, which criterion evaluates who provides India access to critical technologies?",
    sectionTitle: "Single Correct MCQ",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: ["A. Economics", "B. Market", "C. Collaboration", "D. Access"],
    correctAnswer: "D",
    answerKey: ["D"],
    explanation:
      "Access is the criterion that asks who can provide India with critical technologies."
  },
  {
    id: "tp-w1-q56",
    questionNumber: "TP W1 Q56",
    type: "multi-select",
    prompt: "Which of the following are characteristics of the just-in-case approach?",
    sectionTitle: "Multiple Choice",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Increased inventory levels",
      "B. Diversification of suppliers",
      "C. Elimination of all stock storage",
      "D. Reshoring or nearshoring"
    ],
    correctAnswer: "A, B, and D",
    answerKey: ["A", "B", "D"],
    explanation:
      "The just-in-case model emphasizes buffers, supplier diversification, and reshoring or nearshoring rather than eliminating stock entirely."
  },
  {
    id: "tp-w1-q57",
    questionNumber: "TP W1 Q57",
    type: "multi-select",
    prompt: "Which technologies are considered strategic technologies in today’s context?",
    sectionTitle: "Multiple Choice",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    options: [
      "A. Artificial Intelligence",
      "B. Quantum Computing",
      "C. Cybersecurity and Data Analytics",
      "D. Traditional agriculture only"
    ],
    correctAnswer: "A, B, and C",
    answerKey: ["A", "B", "C"],
    explanation:
      "The text identifies AI, quantum computing, cybersecurity, and related digital capabilities as modern strategic technologies."
  },
  {
    id: "tp-w1-q58",
    questionNumber: "TP W1 Q58",
    type: "fill-blank",
    prompt:
      "The practice of basing a company’s services overseas to reduce costs is called __________.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "Offshoring",
    answerKey: ["Offshoring", "offshoring"],
    options: ["Offshoring", "Friendshoring", "Nearshoring", "Reshoring"],
    explanation:
      "The glossary defines offshoring as moving some company processes or services overseas to reduce costs."
  },
  {
    id: "tp-w1-q59",
    questionNumber: "TP W1 Q59",
    type: "fill-blank",
    prompt:
      "The concept of economic security now includes supply chain resilience, technological autonomy, and __________.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "Data sovereignty",
    answerKey: ["Data sovereignty", "data sovereignty"],
    options: ["Data sovereignty", "physical dominance", "territorial expansion", "market isolation"],
    explanation:
      "The new definition of economic security in the text explicitly includes data sovereignty."
  },
  {
    id: "tp-w1-q60",
    questionNumber: "TP W1 Q60",
    type: "fill-blank",
    prompt:
      "India’s Unified Payments Interface (UPI) is part of the __________ initiative.",
    sectionTitle: "Fill in the Blank",
    subject: "Tech and Policy",
    moduleTitle: "Week 1-3",
    correctAnswer: "Digital India Initiative",
    answerKey: ["Digital India Initiative", "Digital India"],
    options: ["Digital India Initiative", "Aatmanirbhar Bharat", "Make in India", "TRUST Initiative"],
    explanation:
      "UPI is mentioned as part of the broader Digital India Initiative."
  }
];
