import { Schema, model, models } from "mongoose";

const ProgressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    lessonId: { type: String, required: true },
    completedLessons: {
      type: [String],
      default: []
    },
    percentComplete: {
      type: Number,
      default: 0
    },
    lastVisitedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const Progress = models.Progress || model("Progress", ProgressSchema);
