import fs from "fs";

export type QuizQuestionType = "mcq" | "fill-blank" | "case-study";

export type QuizQuestion = {
  id: string;
  questionNumber: string;
  type: QuizQuestionType;
  prompt: string;
  sectionTitle: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  scenario?: string;
};

const FILL_BLANK_OPTION_POOLS = {
  systemBasics: [
    "holistic",
    "System",
    "Purpose",
    "Systems Approach",
    "Open",
    "Closed",
    "conceptual",
    "Interconnections",
    "Environment",
    "concrete",
    "invisible",
    "tangible",
    "intangible"
  ],
  iceberg: ["Patterns + Trends", "increases", "Mental Models", "Underlying Structures", "Events"],
  feedback: ["cyclical", "positive", "negative", "reinforcing", "Balancing", "same", "opposite"],
  archetypes: [
    "undermines",
    "Eroding",
    "dual",
    "resource",
    "demand",
    "symptomatic",
    "self"
  ],
  gameTheory: ["rational", "Pay off", "Nash", "changing", "Dominant Strategy", "bounded rationality"],
  botCld: [
    "variable",
    "BOT",
    "longest",
    "two",
    "Causal Loop Diagram",
    "Reinforcing",
    "Stock",
    "Flow",
    "1"
  ]
} as const;

const DEFAULT_QUESTION_BANK_PATH =
  "/Users/shaurya./Downloads/FSTE_Complete_Exam_Question_Bank.md";

const normalizeLineBreaks = (value: string) => value.replace(/\r\n/g, "\n");

const cleanText = (value: string) =>
  value
    .replace(/\*\*/g, "")
    .replace(/—/g, "-")
    .replace(/\u2191/g, " increase ")
    .replace(/\u2193/g, " decrease ")
    .trim();

const getSection = (content: string, startMarker: string, endMarker?: string) => {
  const startIndex = content.indexOf(startMarker);

  if (startIndex === -1) {
    return "";
  }

  const fromStart = content.slice(startIndex);

  if (!endMarker) {
    return fromStart;
  }

  const endIndex = fromStart.indexOf(endMarker);
  return endIndex === -1 ? fromStart : fromStart.slice(0, endIndex);
};

const parseMcqs = (section: string): QuizQuestion[] => {
  const blocks = section.split(/\n---\n/).map((block) => block.trim());

  return blocks.flatMap((block) => {
    const questionMatch = block.match(/\*\*Q(\d+)\.\s*([\s\S]*?)\*\*/);
    const answerMatch = block.match(/\*\*✅ Correct Answer:\s*([A-D])\*\*/);

    if (!questionMatch || !answerMatch) {
      return [];
    }

    const optionLines = block
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => /^[A-D]\.\s+/.test(line));

    if (optionLines.length === 0) {
      return [];
    }

    const explanationMatch = block.match(/\*\*Explanation:\*\*\s*([\s\S]*)$/);
    const questionNumber = questionMatch[1];
    const prompt = cleanText(questionMatch[2]);
    const correctAnswer = answerMatch[1];

    return [
      {
        id: `mcq-${questionNumber}`,
        questionNumber: `Q${questionNumber}`,
        type: "mcq",
        prompt,
        sectionTitle: "MCQ",
        options: optionLines.map(cleanText),
        correctAnswer,
        explanation: explanationMatch ? cleanText(explanationMatch[1]) : undefined
      }
    ];
  });
};

const parseCaseStudies = (section: string): QuizQuestion[] => {
  const caseBlocks = section
    .split(/\n## 📌 CASE /)
    .map((block) => block.trim())
    .filter(Boolean);

  return caseBlocks.flatMap((caseBlock, caseIndex) => {
    const firstLineBreak = caseBlock.indexOf("\n");
    const heading = caseBlock.slice(0, firstLineBreak).trim();
    const body = caseBlock.slice(firstLineBreak).trim();
    const scenarioMatch = body.match(/\*\*Scenario:\*\*\s*([\s\S]*?)\n\n\*\*Sub-questions:\*\*/);
    const scenario = scenarioMatch ? cleanText(scenarioMatch[1]) : "";
    const subQuestionMatches = [...body.matchAll(/\*\*\(([a-z])\)\*\*\s*([\s\S]*?)\n\n\*\*Answer:\*\*\s*([\s\S]*?)(?=\n---\n\n\*\*\([a-z]\)\*\*|\n## 📌 CASE|\n# SECTION|\Z)/g)];

    return subQuestionMatches.map((match) => {
      const letter = match[1];
      const prompt = cleanText(match[2]);
      const answer = cleanText(match[3]);
      const caseLabel = `Case ${caseIndex + 1}${letter.toUpperCase()}`;

      return {
        id: `case-${caseIndex + 1}-${letter}`,
        questionNumber: caseLabel,
        type: "case-study" as const,
        prompt,
        sectionTitle: cleanText(heading),
        scenario,
        correctAnswer: answer
      };
    });
  });
};

const parseFillBlanks = (section: string): QuizQuestion[] => {
  const matches = [...section.matchAll(/\*\*(\d+)\.\*\*\s*([\s\S]*?)\n\*\*Answer:\s*([\s\S]*?)\*\*/g)];

  return matches.map((match) => ({
    id: `blank-${match[1]}`,
    questionNumber: `Blank ${match[1]}`,
    type: "fill-blank" as const,
    prompt: cleanText(match[2]),
    sectionTitle: "Fill in the Blank",
    correctAnswer: cleanText(match[3])
  }));
};

const getFillBlankPool = (prompt: string, correctAnswer: string) => {
  const lowerPrompt = prompt.toLowerCase();
  const lowerAnswer = correctAnswer.toLowerCase();

  if (
    lowerPrompt.includes("iceberg") ||
    lowerPrompt.includes("events") ||
    lowerPrompt.includes("mental models") ||
    lowerAnswer.includes("patterns")
  ) {
    return FILL_BLANK_OPTION_POOLS.iceberg;
  }

  if (
    lowerPrompt.includes("feedback loop") ||
    lowerPrompt.includes("balancing") ||
    lowerPrompt.includes("reinforcing") ||
    lowerPrompt.includes("cld notation") ||
    lowerAnswer === "same" ||
    lowerAnswer === "opposite"
  ) {
    return FILL_BLANK_OPTION_POOLS.feedback;
  }

  if (
    lowerPrompt.includes("archetype") ||
    lowerPrompt.includes("tragedy of the commons") ||
    lowerPrompt.includes("shifting the burden") ||
    lowerPrompt.includes("limits to success")
  ) {
    return FILL_BLANK_OPTION_POOLS.archetypes;
  }

  if (
    lowerPrompt.includes("game theory") ||
    lowerPrompt.includes("prisoner") ||
    lowerPrompt.includes("nash") ||
    lowerPrompt.includes("participant")
  ) {
    return FILL_BLANK_OPTION_POOLS.gameTheory;
  }

  if (
    lowerPrompt.includes("behaviour over time") ||
    lowerPrompt.includes("bot") ||
    lowerPrompt.includes("cld stands") ||
    lowerPrompt.includes("stocks change") ||
    lowerAnswer === "stock" ||
    lowerAnswer === "flow"
  ) {
    return FILL_BLANK_OPTION_POOLS.botCld;
  }

  return FILL_BLANK_OPTION_POOLS.systemBasics;
};

const buildFillBlankOptions = (questions: QuizQuestion[]) =>
  questions.map((question, index) => {
    if (question.type !== "fill-blank") {
      return question;
    }

    const pool = getFillBlankPool(question.prompt, question.correctAnswer).filter(
      (item) => item.toLowerCase() !== question.correctAnswer.toLowerCase()
    );
    const rotationStart = index % Math.max(pool.length, 1);
    const distractors = [...pool.slice(rotationStart), ...pool.slice(0, rotationStart)].slice(0, 3);
    const options = [question.correctAnswer, ...distractors]
      .filter((value, optionIndex, array) => array.findIndex((item) => item.toLowerCase() === value.toLowerCase()) === optionIndex)
      .sort((left, right) => {
        const leftScore = `${question.id}-${left}`.length % 7;
        const rightScore = `${question.id}-${right}`.length % 7;
        return leftScore - rightScore || left.localeCompare(right);
      });

    return {
      ...question,
      options
    };
  });

export const loadQuizQuestions = () => {
  const filePath = process.env.QUIZ_BANK_PATH ?? DEFAULT_QUESTION_BANK_PATH;
  const content = normalizeLineBreaks(fs.readFileSync(filePath, "utf8"));

  const mcqSection = getSection(content, "# SECTION 1", "# SECTION 2");
  const caseSection = getSection(content, "# SECTION 2", "# SECTION 3");
  const fillBlankSection = getSection(content, "# SECTION 3", "# SECTION 4");

  return buildFillBlankOptions([
    ...parseMcqs(mcqSection),
    ...parseCaseStudies(caseSection),
    ...parseFillBlanks(fillBlankSection)
  ]);
};
