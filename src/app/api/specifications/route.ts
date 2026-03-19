import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createSpecificationSchema = z.object({
  organizationId: z.string(),
  name: z.string().min(1),
  cleaningType: z.enum([
    "MAINTENANCE", "BASIC", "GLASS", "SPECIAL", "HYGIENE",
    "OPERATING_ROOM", "DISINFECTION", "FACADE", "OUTDOOR",
  ]),
  dinStandard: z.string().optional(),
  isTemplate: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  const orgId = request.headers.get("x-organization-id");
  if (!orgId) {
    return NextResponse.json({ error: "Organization required" }, { status: 400 });
  }

  const specifications = await prisma.serviceSpecification.findMany({
    where: { organizationId: orgId },
    include: {
      items: { orderBy: { sortOrder: "asc" } },
      roomSpecs: { select: { id: true } },
    },
    orderBy: { name: "asc" },
  });

  const result = specifications.map((s) => ({
    ...s,
    itemCount: s.items.length,
    roomCount: s.roomSpecs.length,
  }));

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createSpecificationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const spec = await prisma.serviceSpecification.create({
    data: parsed.data,
  });

  return NextResponse.json(spec, { status: 201 });
}
