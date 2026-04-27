import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { traineeId, mood, stressLevel, comment } = body;

  if (!traineeId || !mood || stressLevel === undefined || stressLevel === null) {
    return NextResponse.json(
      { error: "traineeId, mood and stressLevel are required" },
      { status: 400 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Mood check-in received",
    checkin: {
      id: `checkin-${Date.now()}`,
      traineeId,
      mood,
      stressLevel,
      comment: comment ?? "",
      createdAt: new Date().toISOString(),
    },
  });
}
