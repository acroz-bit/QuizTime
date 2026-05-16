import { Schema, model, models } from "mongoose";

const QuizAttemptSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    lessonId: { type: String, required: true },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    answers: [{ question: String, selected: String, correct: Boolean }]
  },
  { timestamps: true }
);

export const QuizAttempt =
  models.QuizAttempt || model("QuizAttempt", QuizAttemptSchema);
