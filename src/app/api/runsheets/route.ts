import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createRunsheetSchema = z.object({
  organizationId: z.string(),
  name: z.string().min(1),
  assignedToId: z.string().optional(),
  items: z.array(z.object({
    roomId: z.string(),
    sortOrder: z.number(),
    timeEstimate: z.number().optional(),
    instructions: z.string().optional(),
  })).optional(),
});

export async function GET(request: NextRequest) {
  const orgId = request.headers.get("x-organization-id");
  if (!orgId) {
    return NextResponse.json({ error: "Organization required" }, { status: 400 });
  }

  const runsheets = await prisma.runsheet.findMany({
    where: { organizationId: orgId },
    include: {
      items: {
        include: {
          room: {
            select: { name: true, code: true },
          },
        },
        orderBy: { sortOrder: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(runsheets);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createRunsheetSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { items, ...data } = parsed.data;

  const runsheet = await prisma.runsheet.create({
    data: {
      ...data,
      items: items ? { create: items } : undefined,
    },
    include: { items: true },
  });

  return NextResponse.json(runsheet, { status: 201 });
}
