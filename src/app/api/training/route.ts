import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createTrainingSchema = z.object({
  organizationId: z.string(),
  title: z.string().min(1),
  type: z.enum(["INITIAL", "SAFETY", "HYGIENE", "EQUIPMENT", "PROCEDURE", "REFRESHER"]),
  content: z.any(),
  passingScore: z.number().min(0).max(100).default(80),
});

export async function GET(request: NextRequest) {
  const orgId = request.headers.get("x-organization-id");
  if (!orgId) {
    return NextResponse.json({ error: "Organization required" }, { status: 400 });
  }

  const trainings = await prisma.training.findMany({
    where: { organizationId: orgId },
    include: {
      completions: { select: { id: true, passed: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const result = trainings.map((t) => ({
    ...t,
    completionCount: t.completions.length,
    passCount: t.completions.filter((c) => c.passed).length,
  }));

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createTrainingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const training = await prisma.training.create({
    data: parsed.data,
  });

  return NextResponse.json(training, { status: 201 });
}
