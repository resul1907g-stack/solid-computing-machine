import { prisma } from "@/lib/db";
import { calculateQualityResult } from "@/lib/utils";

interface ComponentScore {
  componentName: string;
  score: number;
  weight: number;
  comment?: string;
  photos?: string[];
}

export async function calculateInspectionScore(
  evaluations: ComponentScore[],
  qualityLevel1: number = 85,
  qualityLevel2: number = 75
) {
  const totalWeight = evaluations.reduce((sum, e) => sum + e.weight, 0);
  const weightedScore = evaluations.reduce(
    (sum, e) => sum + e.score * e.weight,
    0
  );
  const overallScore = totalWeight > 0 ? weightedScore / totalWeight : 0;
  const overallResult = calculateQualityResult(overallScore, qualityLevel1, qualityLevel2);

  return {
    overallScore: Math.round(overallScore * 10) / 10,
    overallResult,
    componentResults: evaluations.map((e) => ({
      ...e,
      result: calculateQualityResult(e.score, qualityLevel1, qualityLevel2),
    })),
  };
}

export async function completeInspection(
  inspectionId: string,
  evaluations: ComponentScore[]
) {
  const inspection = await prisma.inspection.findUnique({
    where: { id: inspectionId },
  });

  if (!inspection) throw new Error("Inspection not found");

  const { overallScore, overallResult, componentResults } =
    await calculateInspectionScore(
      evaluations,
      inspection.qualityLevel1,
      inspection.qualityLevel2
    );

  // Create evaluations and update inspection in a transaction
  return prisma.$transaction(async (tx) => {
    for (const comp of componentResults) {
      await tx.componentEvaluation.create({
        data: {
          inspectionId,
          componentName: comp.componentName,
          score: comp.score,
          result: comp.result,
          comment: comp.comment,
          photos: comp.photos || [],
        },
      });
    }

    return tx.inspection.update({
      where: { id: inspectionId },
      data: {
        overallScore,
        overallResult,
        status: "COMPLETED",
        completedAt: new Date(),
      },
      include: { evaluations: true },
    });
  });
}

export async function getQualityStats(organizationId: string, days: number = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const inspections = await prisma.inspection.findMany({
    where: {
      organizationId,
      status: "COMPLETED",
      createdAt: { gte: since },
    },
    select: {
      overallScore: true,
      overallResult: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return {
    total: inspections.length,
    avgScore: inspections.length > 0
      ? Math.round(
          (inspections.reduce((sum, i) => sum + (i.overallScore || 0), 0) /
            inspections.length) *
            10
        ) / 10
      : 0,
    green: inspections.filter((i) => i.overallResult === "GREEN").length,
    yellow: inspections.filter((i) => i.overallResult === "YELLOW").length,
    red: inspections.filter((i) => i.overallResult === "RED").length,
    trend: inspections.map((i) => ({
      date: i.createdAt.toISOString().split("T")[0],
      score: i.overallScore,
    })),
  };
}
