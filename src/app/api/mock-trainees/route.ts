import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: "trainee-001",
      name: "Anna Petrova",
      email: "anna.petrova@example.com",
      role: "Junior Frontend Developer",
      department: "Product Engineering",
      startDate: "2026-04-01",
      mentorName: "Elena Smirnova",
      adaptationStage: "First month onboarding",
      riskLevel: "low",
      lastMood: "positive",
      lastCheckInAt: "2026-04-24T09:30:00.000Z",
    },
    {
      id: "trainee-002",
      name: "Mikhail Ivanov",
      email: "mikhail.ivanov@example.com",
      role: "Sales Development Representative",
      department: "Sales",
      startDate: "2026-03-18",
      mentorName: "Pavel Sokolov",
      adaptationStage: "Role practice",
      riskLevel: "medium",
      lastMood: "neutral",
      lastCheckInAt: "2026-04-23T14:15:00.000Z",
    },
    {
      id: "trainee-003",
      name: "Sofia Kuznetsova",
      email: "sofia.kuznetsova@example.com",
      role: "HR Operations Specialist",
      department: "People Operations",
      startDate: "2026-04-15",
      mentorName: "Maria Orlova",
      adaptationStage: "Team introduction",
      riskLevel: "low",
      lastMood: "motivated",
      lastCheckInAt: "2026-04-25T11:00:00.000Z",
    },
  ]);
}
