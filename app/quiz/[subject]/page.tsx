import { notFound } from "next/navigation";
import { QuizApp } from "@/components/quiz-app";
import { QuizModuleListPage } from "@/components/quiz-module-list-page";
import { getSubjectFromSlug } from "@/lib/quiz-catalog";
import { loadQuizQuestions } from "@/lib/quiz-data";

export default async function SubjectQuizPage({
  params
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectSlug } = await params;
  const subject = getSubjectFromSlug(subjectSlug);

  if (!subject) {
    notFound();
  }

  const questions = loadQuizQuestions().filter((question) => question.subject === subject);

  if (questions.length === 0) {
    notFound();
  }

  if (subject === "Tech and Policy") {
    return <QuizModuleListPage subject={subject} questions={questions} />;
  }

  return <QuizApp questions={questions} title="Quiz Time" subtitle={`${subject} question bank`} />;
}
