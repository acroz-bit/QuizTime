import fs from "fs";
import path from "path";
import { TECH_POLICY_WEEK_4_7_QUESTIONS } from "@/lib/tech-policy-week4-7";
import { TECH_POLICY_WEEK_1_QUESTIONS } from "@/lib/tech-policy-week1";

export type QuizQuestionType = "mcq" | "multi-select" | "fill-blank" | "case-study";

export type QuizQuestion = {
  id: string;
  questionNumber: string;
  type: QuizQuestionType;
  prompt: string;
  sectionTitle: string;
  subject: string;
  moduleTitle?: string;
  options?: string[];
  correctAnswer: string;
  answerKey?: string[];
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

const DEFAULT_QUESTION_BANK_PATH = path.join(
  process.cwd(),
  "data",
  "FSTE_Complete_Exam_Question_Bank.md"
);

const ADVANCED_QUESTION_BANK_PATH = path.join(
  process.cwd(),
  "data",
  "FSTE_Advanced_Exam_Pack.md"
);

const ADVANCED_TEXT_QUESTION_BANK_PATH = path.join(
  process.cwd(),
  "data",
  "shauyra.txt"
);

const normalizeLineBreaks = (value: string) =>
  value
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[\u2028\u2029]/g, "\n");

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

const extractPromptFromBlock = (block: string) => {
  const lines = block
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const firstOptionIndex = lines.findIndex((line) => /^[A-D]\.\s+/.test(line));
  const promptLines = firstOptionIndex === -1 ? lines : lines.slice(0, firstOptionIndex);

  if (promptLines.length === 0) {
    return "";
  }

  const [firstLine, ...rest] = promptLines;

  if (/^\*\*Q\d+\.\*\*$/.test(firstLine)) {
    return cleanText(rest.join(" "));
  }

  return cleanText([firstLine.replace(/^\*\*Q\d+\.\s*/, ""), ...rest].join(" "));
};

const getOptionLines = (block: string) =>
  block
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^[A-D]\.\s+/.test(line));

const extractExplanation = (block: string) => {
  const explanationMatch = block.match(/\*\*(?:Trap )?Explanation:\*\*\s*([\s\S]*?)$/);
  return explanationMatch ? cleanText(explanationMatch[1]) : undefined;
};

const extractPromptFromLines = (
  lines: string[],
  firstOptionIndex: number,
  labelPattern: RegExp
) => {
  const promptLines = lines.slice(0, firstOptionIndex);

  if (promptLines.length === 0) {
    return "";
  }

  const [firstLine, ...rest] = promptLines;
  return cleanText([firstLine.replace(labelPattern, ""), ...rest].join(" "));
};

const parseAdvancedMcqBlocks = (section: string, labelPrefix: "Q" | "UQ") => {
  const blocks = section.split(/\n---\n/).map((block) => block.trim());

  return blocks.flatMap((block) => {
    const questionMatch = block.match(new RegExp(String.raw`\*\*(${labelPrefix}\d+)\.`));
    const answerMatch = block.match(/✅\s*\*\*Correct Answer:\s*([A-D])/);

    if (!questionMatch || !answerMatch) {
      return [];
    }

    const optionLines = getOptionLines(block);

    if (optionLines.length === 0) {
      return [];
    }

    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const firstOptionIndex = lines.findIndex((line) => /^[A-D]\.\s+/.test(line));

    return [
      {
        id: `advanced-${questionMatch[1].toLowerCase()}`,
        questionNumber: questionMatch[1],
        type: "mcq" as const,
        prompt: extractPromptFromLines(
          lines,
          firstOptionIndex,
          new RegExp(String.raw`^\*\*${labelPrefix}\d+\.\s*`)
        ),
        sectionTitle: "MCQ",
        subject: "FSTE",
        options: optionLines.map(cleanText),
        correctAnswer: answerMatch[1],
        answerKey: [answerMatch[1]],
        explanation: extractExplanation(block)
      }
    ];
  });
};

const parseAdvancedCaseStudies = (section: string): QuizQuestion[] => {
  const caseBlocks = section
    .split(/\n## 📌 ADVANCED CASE /)
    .map((block) => block.trim())
    .filter(Boolean);

  return caseBlocks.flatMap((caseBlock, caseIndex) => {
    const firstLineBreak = caseBlock.indexOf("\n");
    const heading = cleanText(caseBlock.slice(0, firstLineBreak).trim());
    const body = caseBlock.slice(firstLineBreak).trim();
    const scenarioMatch = body.match(/\*\*Scenario(?: \(from notes\))?:\*\*\s*([\s\S]*?)\n\n\*\*Sub-Questions:\*\*/);
    const scenario = scenarioMatch ? cleanText(scenarioMatch[1]) : "";
    const questionBlocks = body
      .split(/\n---\n/)
      .map((block) => block.trim())
      .filter((block) => /^\*\*\([a-z]\)/.test(block));

    return questionBlocks.flatMap((block) => {
      const subQuestionMatch = block.match(/^\*\*\(([a-z])\)\s*([\s\S]*?)\*\*/);
      const answerMatch = block.match(/✅\s*\*\*Correct Answer:\s*([A-D])/);

      if (!subQuestionMatch || !answerMatch) {
        return [];
      }

      const optionLines = getOptionLines(block);

      if (optionLines.length === 0) {
        return [];
      }

      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const firstOptionIndex = lines.findIndex((line) => /^[A-D]\.\s+/.test(line));
      const mcqPromptLabelIndex = lines.findIndex((line) =>
        /^\*\*(?:MCQ Version|Conceptual MCQ):\*\*$/.test(line)
      );

      const prompt = mcqPromptLabelIndex !== -1
        ? cleanText(lines.slice(mcqPromptLabelIndex + 1, firstOptionIndex).join(" "))
        : extractPromptFromLines(lines, firstOptionIndex, /^\*\*\([a-z]\)\s*/);
      const subLabel = subQuestionMatch[1].toUpperCase();

      return [
        {
          id: `advanced-case-${caseIndex + 1}-${subQuestionMatch[1]}`,
          questionNumber: `Case ${caseIndex + 1}${subLabel}`,
          type: "mcq" as const,
          prompt,
          sectionTitle: heading,
          subject: "FSTE",
          scenario,
          options: optionLines.map(cleanText),
          correctAnswer: answerMatch[1],
          answerKey: [answerMatch[1]],
          explanation: extractExplanation(block)
        }
      ];
    });
  });
};

const parseAdvancedFillBlanks = (section: string): QuizQuestion[] => {
  const blocks = section.split(/\n---\n/).map((block) => block.trim());

  return blocks.flatMap((block) => {
    const questionMatch = block.match(/\*\*FIB\s+(\d+)\.\*\*\s*([\s\S]*?)$/m);
    const answerMatch = block.match(/✅\s*\*\*Answer:\s*([A-D])\s*[-–—]\s*([^*\n]+)\*\*/);

    if (!questionMatch || !answerMatch) {
      return [];
    }

    const optionLines = getOptionLines(block).map((line) => cleanText(line.replace(/^[A-D]\.\s+/, "")));

    if (optionLines.length === 0) {
      return [];
    }

    return [
      {
        id: `advanced-fib-${questionMatch[1]}`,
        questionNumber: `FIB ${questionMatch[1]}`,
        type: "fill-blank" as const,
        prompt: cleanText(questionMatch[2]),
        sectionTitle: "Fill in the Blank",
        subject: "FSTE",
        options: optionLines,
        correctAnswer: cleanText(answerMatch[2]),
        answerKey: [cleanText(answerMatch[2])]
      }
    ];
  });
};

const QUESTION_HEADER_PATTERN = /^\d+[.)]\s*(?:Medium|Hard)(?:-Level MCQs?(?: \(\d+\))?|(?:\s+MCQ)?)?$/;
const INLINE_NUMBERED_PROMPT_PATTERN = /^\d+\.\s+(?!Medium\b|Hard\b)(.+)$/;

const parseStructuredTextAdvancedQuestions = (content: string): QuizQuestion[] => {
  const lines = normalizeLineBreaks(content)
    .split("\n")
    .map((line) => line.trim());
  const questions: QuizQuestion[] = [];
  let index = 0;
  let sequence = 1;

  while (index < lines.length) {
    const line = lines[index];
    const inlinePromptMatch = line.match(INLINE_NUMBERED_PROMPT_PATTERN);

    if (
      !QUESTION_HEADER_PATTERN.test(line) &&
      !/^\d+\)\s*MCQ$/.test(line) &&
      !/^\d+\.$/.test(line) &&
      !inlinePromptMatch
    ) {
      index += 1;
      continue;
    }

    let cursor = index + 1;
    const promptLines: string[] = [];

    if (inlinePromptMatch) {
      promptLines.push(inlinePromptMatch[1]);
    } else {
      while (cursor < lines.length && !lines[cursor]) {
        cursor += 1;
      }

      if (cursor >= lines.length) {
        index += 1;
        continue;
      }

      if (/^Question:/.test(lines[cursor])) {
        promptLines.push(lines[cursor].replace(/^Question:\s*/, ""));
        cursor += 1;
      } else if (/^Question:?$/.test(lines[cursor])) {
        cursor += 1;
      } else if (/^\d+\.$/.test(line)) {
        promptLines.push(lines[cursor]);
        cursor += 1;
      } else {
        index += 1;
        continue;
      }
    }

    while (cursor < lines.length && !/^A\.\s*/.test(lines[cursor])) {
      if (lines[cursor]) {
        promptLines.push(lines[cursor]);
      }
      cursor += 1;
    }

    const options: string[] = [];

    for (const optionLetter of ["A", "B", "C", "D"]) {
      const optionLine = lines[cursor];

      if (!optionLine || !new RegExp(`^${optionLetter}\\.\\s*`).test(optionLine)) {
        break;
      }

      const optionParts = [optionLine];
      cursor += 1;

      while (
        cursor < lines.length &&
        lines[cursor] &&
        !/^[A-D]\.\s*/.test(lines[cursor]) &&
        !/^Correct Answer:\s*[A-D]/.test(lines[cursor])
      ) {
        optionParts.push(lines[cursor]);
        cursor += 1;
      }

      options.push(cleanText(optionParts.join(" ")));
    }

    if (options.length !== 4) {
      index += 1;
      continue;
    }

    const answerLine = lines[cursor];

    if (!answerLine || !/^Correct Answer:\s*[A-D]/.test(answerLine)) {
      index += 1;
      continue;
    }

    const correctAnswer = answerLine.replace(/^Correct Answer:\s*/, "").trim().charAt(0);
    cursor += 1;

    const topicLine = lines[cursor] && /^Concept\/Topic Tested:\s*/.test(lines[cursor])
      ? lines[cursor]
      : "";
    const topic = topicLine ? cleanText(topicLine.replace(/^Concept\/Topic Tested:\s*/, "")) : "";

    if (topicLine) {
      cursor += 1;
    }

    const difficultyLine = lines[cursor] && /^(?:Difficulty Level|Difficulty):\s*/.test(lines[cursor])
      ? lines[cursor]
      : "";

    if (difficultyLine) {
      cursor += 1;
    }

    const explanationLabel = lines[cursor] && /^(?:Brief Explanation|Explanation):/.test(lines[cursor])
      ? lines[cursor]
      : "";
    const explanationParts: string[] = [];

    if (explanationLabel) {
      explanationParts.push(explanationLabel.replace(/^(?:Brief Explanation|Explanation):\s*/, ""));
      cursor += 1;
    }

    while (cursor < lines.length) {
      const nextLine = lines[cursor];

      if (
        QUESTION_HEADER_PATTERN.test(nextLine) ||
        /^\d+\)\s*MCQ$/.test(nextLine) ||
        /^\d+\.$/.test(nextLine) ||
        /^Medium-Level MCQs/.test(nextLine) ||
        /^Hard-Level MCQs/.test(nextLine) ||
        /^Hard Questions$/.test(nextLine) ||
        /^Based strictly/.test(nextLine) ||
        /^Strictly generated/.test(nextLine) ||
        /^Using$/.test(nextLine) ||
        /^Source:$/.test(nextLine)
      ) {
        break;
      }

      if (nextLine) {
        explanationParts.push(nextLine);
      }

      cursor += 1;
    }

    questions.push({
      id: `advanced-text-${sequence}`,
      questionNumber: `Advanced ${sequence}`,
      type: "mcq",
      prompt: cleanText(promptLines.join(" ")),
      sectionTitle: "Advanced Questions",
      subject: "FSTE",
      options,
      correctAnswer,
      answerKey: [correctAnswer],
      explanation: explanationParts.length > 0 ? cleanText(explanationParts.join(" ")) : undefined
    });

    sequence += 1;
    index = cursor;
  }

  return questions;
};

const parseMcqs = (section: string): QuizQuestion[] => {
  const blocks = section.split(/\n---\n/).map((block) => block.trim());

  return blocks.flatMap((block) => {
    const questionMatch = block.match(/\*\*Q(\d+)\./);
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
    const prompt = extractPromptFromBlock(block);
    const correctAnswer = answerMatch[1];

    return [
      {
        id: `mcq-${questionNumber}`,
        questionNumber: `Q${questionNumber}`,
        type: "mcq",
        prompt,
        sectionTitle: "MCQ",
        subject: "FSTE",
        options: optionLines.map(cleanText),
        correctAnswer,
        answerKey: [correctAnswer],
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
        subject: "FSTE",
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
    subject: "FSTE",
    correctAnswer: cleanText(match[3]),
    answerKey: [cleanText(match[3])]
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
    if (question.type !== "fill-blank" || (question.options?.length ?? 0) > 0) {
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
  const advancedContent = fs.existsSync(ADVANCED_QUESTION_BANK_PATH)
    ? normalizeLineBreaks(fs.readFileSync(ADVANCED_QUESTION_BANK_PATH, "utf8"))
    : "";
  const advancedTextContent = fs.existsSync(ADVANCED_TEXT_QUESTION_BANK_PATH)
    ? normalizeLineBreaks(fs.readFileSync(ADVANCED_TEXT_QUESTION_BANK_PATH, "utf8"))
    : "";

  const mcqSection = getSection(content, "# SECTION 1", "# SECTION 2");
  const caseSection = getSection(content, "# SECTION 2", "# SECTION 3");
  const fillBlankSection = getSection(content, "# SECTION 3", "# SECTION 4");
  const advancedMcqSection = getSection(
    advancedContent,
    "# PART A",
    "# PART B"
  );
  const advancedCaseSection = getSection(
    advancedContent,
    "# PART B",
    "# PART C"
  );
  const advancedFillBlankSection = getSection(
    advancedContent,
    "# PART C",
    "# PART D"
  );
  const advancedUltraHardSection = getSection(
    advancedContent,
    "# PART D",
    "# 🗂️ MASTER ANSWER SHEET SUMMARY"
  );

  return buildFillBlankOptions([
    ...parseMcqs(mcqSection),
    ...parseCaseStudies(caseSection),
    ...parseFillBlanks(fillBlankSection),
    ...parseAdvancedMcqBlocks(advancedMcqSection, "Q"),
    ...parseAdvancedCaseStudies(advancedCaseSection),
    ...parseAdvancedFillBlanks(advancedFillBlankSection),
    ...parseAdvancedMcqBlocks(advancedUltraHardSection, "UQ"),
    ...parseStructuredTextAdvancedQuestions(advancedTextContent),
    ...TECH_POLICY_WEEK_1_QUESTIONS,
    ...TECH_POLICY_WEEK_4_7_QUESTIONS
  ]);
};
