import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const orgId = request.headers.get("x-organization-id");
  if (!orgId) {
    return NextResponse.json({ error: "Organization required" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get("days") || "30");
  const since = new Date();
  since.setDate(since.getDate() - days);

  // Get inspection statistics
  const inspections = await prisma.inspection.findMany({
    where: {
      organizationId: orgId,
      createdAt: { gte: since },
      status: "COMPLETED",
    },
    select: {
      overallScore: true,
      overallResult: true,
      createdAt: true,
      room: {
        select: {
          floor: {
            select: {
              building: { select: { id: true, name: true } },
            },
          },
        },
      },
    },
  });

  const totalInspections = inspections.length;
  const avgScore = totalInspections > 0
    ? inspections.reduce((acc, i) => acc + (i.overallScore || 0), 0) / totalInspections
    : 0;

  const resultDistribution = {
    GREEN: inspections.filter((i) => i.overallResult === "GREEN").length,
    YELLOW: inspections.filter((i) => i.overallResult === "YELLOW").length,
    RED: inspections.filter((i) => i.overallResult === "RED").length,
  };

  // Building scores
  const buildingMap = new Map<string, { name: string; scores: number[] }>();
  for (const i of inspections) {
    const building = i.room.floor.building;
    if (!buildingMap.has(building.id)) {
      buildingMap.set(building.id, { name: building.name, scores: [] });
    }
    if (i.overallScore) {
      buildingMap.get(building.id)!.scores.push(i.overallScore);
    }
  }

  const buildingScores = Array.from(buildingMap.entries()).map(([id, data]) => ({
    id,
    name: data.name,
    avgScore: data.scores.reduce((a, b) => a + b, 0) / data.scores.length,
    inspectionCount: data.scores.length,
  }));

  // Open repair requests
  const openRepairs = await prisma.repairRequest.count({
    where: {
      status: "OPEN",
      inspection: { organizationId: orgId },
    },
  });

  return NextResponse.json({
    period: { days, since: since.toISOString() },
    totalInspections,
    avgScore: Math.round(avgScore * 10) / 10,
    resultDistribution,
    buildingScores,
    openRepairs,
  });
}
