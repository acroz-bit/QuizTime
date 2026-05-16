import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    xp: { type: Number, default: 120 },
    streak: { type: Number, default: 1 },
    badges: {
      type: [String],
      default: ["New Learner"]
    }
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
