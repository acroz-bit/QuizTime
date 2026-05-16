import { QuizApp } from "@/components/quiz-app";
import { loadQuizQuestions } from "@/lib/quiz-data";

export default function QuizPage() {
  const questions = loadQuizQuestions();

  return <QuizApp questions={questions} />;
}
