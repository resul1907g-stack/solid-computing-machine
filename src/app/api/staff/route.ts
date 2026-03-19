import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const inviteSchema = z.object({
  organizationId: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(["ADMIN", "MANAGER", "INSPECTOR", "CLEANER"]),
});

export async function GET(request: NextRequest) {
  const orgId = request.headers.get("x-organization-id");
  if (!orgId) {
    return NextResponse.json({ error: "Organization required" }, { status: 400 });
  }

  const memberships = await prisma.membership.findMany({
    where: { organizationId: orgId },
    include: {
      user: { select: { id: true, name: true, email: true, image: true } },
    },
    orderBy: { invitedAt: "desc" },
  });

  return NextResponse.json(memberships);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = inviteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { organizationId, email, name, role } = parsed.data;

  // Find or create user
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const { hash } = await import("@/lib/password");
    user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: await hash("changeme123"),
      },
    });
  }

  // Create membership
  const membership = await prisma.membership.create({
    data: {
      userId: user.id,
      organizationId,
      role: role as any,
    },
    include: { user: { select: { id: true, name: true, email: true } } },
  });

  return NextResponse.json(membership, { status: 201 });
}
