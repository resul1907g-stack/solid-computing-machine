import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createInspectionSchema = z.object({
  organizationId: z.string(),
  roomId: z.string(),
  inspectorId: z.string(),
  qualityLevel1: z.number().default(85),
  qualityLevel2: z.number().default(75),
});

const evaluationSchema = z.object({
  componentName: z.string(),
  score: z.number().min(0).max(100),
  result: z.enum(["GREEN", "YELLOW", "RED"]),
  comment: z.string().optional(),
  photos: z.array(z.string()).default([]),
});

export async function GET(request: NextRequest) {
  const orgId = request.headers.get("x-organization-id");
  if (!orgId) {
    return NextResponse.json({ error: "Organization required" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const buildingId = searchParams.get("buildingId");
  const result = searchParams.get("result");
  const limit = parseInt(searchParams.get("limit") || "50");

  const where: any = { organizationId: orgId };

  if (buildingId) {
    where.room = { floor: { buildingId } };
  }
  if (result) {
    where.overallResult = result;
  }

  const inspections = await prisma.inspection.findMany({
    where,
    include: {
      room: {
        include: {
          floor: {
            include: { building: { select: { name: true } } },
          },
        },
      },
      inspector: { select: { name: true, email: true } },
      evaluations: true,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return NextResponse.json(inspections);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createInspectionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const inspection = await prisma.inspection.create({
    data: {
      ...parsed.data,
      status: "IN_PROGRESS",
    },
  });

  return NextResponse.json(inspection, { status: 201 });
}
