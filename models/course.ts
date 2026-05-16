import { Schema, model, models } from "mongoose";

const QuizSchema = new Schema(
  {
    question: String,
    options: [String],
    answer: String
  },
  { _id: false }
);

const LessonSchema = new Schema(
  {
    id: { type: String, required: true },
    title: String,
    type: String,
    duration: String,
    summary: String,
    bullets: [String],
    visualType: String,
    content: String,
    quiz: [QuizSchema]
  },
  { _id: false }
);

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: String,
    level: String,
    duration: String,
    accent: String,
    description: String,
    heroVisual: String,
    lessons: [LessonSchema]
  },
  { timestamps: true }
);

export const Course = models.Course || model("Course", CourseSchema);
