import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Course } from "@/models/course";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const { id } = await params;
  const course = await Course.findById(id).lean();
  if (!course) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 });
  }
  return NextResponse.json(course);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const { id } = await params;
  const payload = await request.json();
  const course = await Course.findByIdAndUpdate(id, payload, { new: true }).lean();
  return NextResponse.json(course);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const { id } = await params;
  await Course.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
