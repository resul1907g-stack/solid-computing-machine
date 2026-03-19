import { prisma } from "./db";
import { cache } from "react";

export const getOrganizationBySlug = cache(async (slug: string) => {
  return prisma.organization.findUnique({
    where: { slug },
  });
});

export const getOrganizationById = cache(async (id: string) => {
  return prisma.organization.findUnique({
    where: { id },
  });
});

export const getUserMembership = cache(async (userId: string, organizationId: string) => {
  return prisma.membership.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
  });
});
