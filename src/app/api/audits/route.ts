import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createAuditSchema = z.object({
  organizationId: z.string(),
  type: z.enum(["PROCESS_AUDIT", "GENERAL_AUDIT", "SURVEY", "COMPETENCY_CHECK"]),
  title: z.string().min(1),
  description: z.string().optional(),
  templateData: z.any(),
});

export async function GET(request: NextRequest) {
  const orgId = request.headers.get("x-organization-id");
  if (!orgId) {
    return NextResponse.json({ error: "Organization required" }, { status: 400 });
  }

  const audits = await prisma.audit.findMany({
    where: { organizationId: orgId },
    include: {
      results: { select: { id: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const result = audits.map((a) => ({
    ...a,
    responseCount: a.results.length,
  }));

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createAuditSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const audit = await prisma.audit.create({
    data: parsed.data,
  });

  return NextResponse.json(audit, { status: 201 });
}
