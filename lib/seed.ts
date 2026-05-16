import { Course } from "@/models/course";
import { seedCourses } from "@/lib/sample-data";

export async function ensureSeedCourses() {
  const count = await Course.countDocuments();
  if (count === 0) {
    await Course.insertMany(seedCourses);
  }
}
