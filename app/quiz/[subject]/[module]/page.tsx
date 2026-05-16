import { notFound } from "next/navigation";
import { QuizApp } from "@/components/quiz-app";
import { getModuleFromSlug, getSubjectFromSlug } from "@/lib/quiz-catalog";
import { loadQuizQuestions } from "@/lib/quiz-data";

export default async function ModuleQuizPage({
  params
}: {
  params: Promise<{ subject: string; module: string }>;
}) {
  const { subject: subjectSlug, module: moduleSlug } = await params;
  const subject = getSubjectFromSlug(subjectSlug);
  const moduleTitle = getModuleFromSlug(moduleSlug);

  if (!subject || !moduleTitle) {
    notFound();
  }

  const questions = loadQuizQuestions().filter(
    (question) => question.subject === subject && question.moduleTitle === moduleTitle
  );

  if (questions.length === 0) {
    notFound();
  }

  return <QuizApp questions={questions} title="Quiz Time" subtitle={`${subject} · ${moduleTitle}`} />;
}
