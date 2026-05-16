import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ensureSeedCourses } from "@/lib/seed";
import { Course } from "@/models/course";

export async function GET() {
  await connectToDatabase();
  await ensureSeedCourses();
  const courses = await Course.find().lean();
  return NextResponse.json(courses);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const payload = await request.json();
  const course = await Course.create(payload);
  return NextResponse.json(course, { status: 201 });
}
