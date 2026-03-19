import { PrismaClient } from "@prisma/client";
import { createHash, randomBytes } from "crypto";

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hashed = createHash("sha256")
    .update(password + salt)
    .digest("hex");
  return `${salt}:${hashed}`;
}

async function main() {
  console.log("Seeding database...");

  // Create demo organization
  const org = await prisma.organization.upsert({
    where: { slug: "demo" },
    update: {},
    create: {
      name: "Demo Reinigungsservice GmbH",
      slug: "demo",
      settings: {
        qualityLevel1: 85,
        qualityLevel2: 75,
        emailNotifications: true,
      },
      plan: "PROFESSIONAL",
    },
  });

  // Create users
  const admin = await prisma.user.upsert({
    where: { email: "admin@cleansuite.de" },
    update: {},
    create: {
      email: "admin@cleansuite.de",
      name: "Max Mustermann",
      passwordHash: hashPassword("admin123"),
      locale: "de",
    },
  });

  const inspector = await prisma.user.upsert({
    where: { email: "inspektor@cleansuite.de" },
    update: {},
    create: {
      email: "inspektor@cleansuite.de",
      name: "Anna Schmidt",
      passwordHash: hashPassword("inspect123"),
      locale: "de",
    },
  });

  const cleaner = await prisma.user.upsert({
    where: { email: "reinigung@cleansuite.de" },
    update: {},
    create: {
      email: "reinigung@cleansuite.de",
      name: "Hans Fischer",
      passwordHash: hashPassword("clean123"),
      locale: "de",
    },
  });

  // Create memberships
  await prisma.membership.upsert({
    where: { userId_organizationId: { userId: admin.id, organizationId: org.id } },
    update: {},
    create: { userId: admin.id, organizationId: org.id, role: "OWNER", acceptedAt: new Date() },
  });

  await prisma.membership.upsert({
    where: { userId_organizationId: { userId: inspector.id, organizationId: org.id } },
    update: {},
    create: { userId: inspector.id, organizationId: org.id, role: "INSPECTOR", acceptedAt: new Date() },
  });

  await prisma.membership.upsert({
    where: { userId_organizationId: { userId: cleaner.id, organizationId: org.id } },
    update: {},
    create: { userId: cleaner.id, organizationId: org.id, role: "CLEANER", acceptedAt: new Date() },
  });

  // Create room types with components
  const patientRoom = await prisma.roomType.create({
    data: {
      name: "Patientenzimmer",
      icon: "bed",
      components: {
        create: [
          { name: "Boden", icon: "square", weight: 1.0, sortOrder: 0 },
          { name: "Oberflächen", icon: "monitor", weight: 1.0, sortOrder: 1 },
          { name: "Sanitärobjekte", icon: "bath", weight: 1.5, sortOrder: 2 },
          { name: "Abfalleimer", icon: "trash", weight: 0.5, sortOrder: 3 },
          { name: "Türen & Zargen", icon: "door-open", weight: 0.8, sortOrder: 4 },
          { name: "Fenster", icon: "window", weight: 0.7, sortOrder: 5 },
        ],
      },
    },
  });

  const corridor = await prisma.roomType.create({
    data: {
      name: "Flur",
      icon: "arrow-right",
      components: {
        create: [
          { name: "Boden", icon: "square", weight: 1.5, sortOrder: 0 },
          { name: "Handläufe", icon: "grip-horizontal", weight: 1.0, sortOrder: 1 },
          { name: "Türen", icon: "door-open", weight: 0.8, sortOrder: 2 },
          { name: "Abfalleimer", icon: "trash", weight: 0.5, sortOrder: 3 },
        ],
      },
    },
  });

  const sanitaryRoom = await prisma.roomType.create({
    data: {
      name: "Sanitärbereich",
      icon: "droplets",
      components: {
        create: [
          { name: "Boden", icon: "square", weight: 1.0, sortOrder: 0 },
          { name: "WC/Urinal", icon: "bath", weight: 2.0, sortOrder: 1 },
          { name: "Waschbecken", icon: "droplets", weight: 1.5, sortOrder: 2 },
          { name: "Spiegel", icon: "square", weight: 0.8, sortOrder: 3 },
          { name: "Spender (Seife/Papier)", icon: "box", weight: 1.0, sortOrder: 4 },
          { name: "Abfalleimer", icon: "trash", weight: 0.5, sortOrder: 5 },
        ],
      },
    },
  });

  const opRoom = await prisma.roomType.create({
    data: {
      name: "OP-Saal",
      icon: "heart-pulse",
      components: {
        create: [
          { name: "Boden", icon: "square", weight: 2.0, sortOrder: 0 },
          { name: "Oberflächen", icon: "monitor", weight: 2.0, sortOrder: 1 },
          { name: "Medizinische Geräte", icon: "activity", weight: 2.0, sortOrder: 2 },
          { name: "OP-Tisch", icon: "bed", weight: 2.0, sortOrder: 3 },
          { name: "Waschbecken", icon: "droplets", weight: 1.5, sortOrder: 4 },
          { name: "Abwurf/Entsorgung", icon: "trash", weight: 1.0, sortOrder: 5 },
          { name: "Wände", icon: "square", weight: 1.0, sortOrder: 6 },
        ],
      },
    },
  });

  // Create building with floors and rooms
  const building = await prisma.building.create({
    data: {
      organizationId: org.id,
      name: "Krankenhaus Nord",
      address: "Musterstraße 1, 10115 Berlin",
      floors: {
        create: [
          {
            name: "Erdgeschoss",
            sortOrder: 0,
            rooms: {
              create: [
                { name: "Raum 001", code: "KH-N-EG-001", roomTypeId: patientRoom.id, area: 25 },
                { name: "Raum 002", code: "KH-N-EG-002", roomTypeId: corridor.id, area: 40 },
                { name: "Raum 003", code: "KH-N-EG-003", roomTypeId: sanitaryRoom.id, area: 12 },
                { name: "Raum 004", code: "KH-N-EG-004", roomTypeId: patientRoom.id, area: 25 },
                { name: "Raum 005", code: "KH-N-EG-005", roomTypeId: patientRoom.id, area: 25 },
              ],
            },
          },
          {
            name: "1. Obergeschoss",
            sortOrder: 1,
            rooms: {
              create: [
                { name: "OP 1", code: "KH-N-1OG-101", roomTypeId: opRoom.id, area: 50 },
                { name: "OP 2", code: "KH-N-1OG-102", roomTypeId: opRoom.id, area: 45 },
                { name: "Raum 103", code: "KH-N-1OG-103", roomTypeId: patientRoom.id, area: 25 },
                { name: "Sanitär 1.OG", code: "KH-N-1OG-104", roomTypeId: sanitaryRoom.id, area: 15 },
              ],
            },
          },
          {
            name: "2. Obergeschoss",
            sortOrder: 2,
            rooms: {
              create: [
                { name: "Raum 201", code: "KH-N-2OG-201", roomTypeId: patientRoom.id, area: 25 },
                { name: "Raum 202", code: "KH-N-2OG-202", roomTypeId: patientRoom.id, area: 25 },
                { name: "Flur 2.OG", code: "KH-N-2OG-203", roomTypeId: corridor.id, area: 60 },
                { name: "Sanitär 2.OG", code: "KH-N-2OG-204", roomTypeId: sanitaryRoom.id, area: 15 },
              ],
            },
          },
        ],
      },
    },
  });

  // Create service specification
  const maintenanceSpec = await prisma.serviceSpecification.create({
    data: {
      organizationId: org.id,
      name: "Unterhaltsreinigung Standard",
      dinStandard: "DIN 77400",
      cleaningType: "MAINTENANCE",
      items: {
        create: [
          { componentName: "Boden", activity: "Feucht wischen", frequency: "DAILY", colorCode: "#ef4444", method: "Nassreinigung", product: "Neutralreiniger", sortOrder: 0 },
          { componentName: "Oberflächen", activity: "Feucht abwischen", frequency: "DAILY", colorCode: "#ef4444", method: "Sprühwischen", product: "Flächendesinfektion", sortOrder: 1 },
          { componentName: "Sanitärobjekte", activity: "Reinigen & desinfizieren", frequency: "DAILY", colorCode: "#ef4444", method: "Direktauftrag", product: "Sanitärreiniger", sortOrder: 2 },
          { componentName: "Abfalleimer", activity: "Entleeren und Beutel wechseln", frequency: "DAILY", colorCode: "#ef4444", method: "Manuell", product: "-", sortOrder: 3 },
          { componentName: "Fenster innen", activity: "Glasreinigung", frequency: "MONTHLY", colorCode: "#22c55e", method: "Einwascher/Abzieher", product: "Glasreiniger", sortOrder: 4 },
          { componentName: "Heizkörper", activity: "Feucht abwischen", frequency: "WEEKLY", colorCode: "#3b82f6", method: "Feuchtwischen", product: "Neutralreiniger", sortOrder: 5 },
          { componentName: "Türen & Zargen", activity: "Feucht abwischen", frequency: "WEEKLY", colorCode: "#3b82f6", method: "Feuchtwischen", product: "Neutralreiniger", sortOrder: 6 },
          { componentName: "Grundreinigung Boden", activity: "Maschinelle Grundreinigung", frequency: "QUARTERLY", colorCode: "#eab308", method: "Scheuersaugmaschine", product: "Grundreiniger", sortOrder: 7 },
        ],
      },
    },
  });

  // Create a training
  await prisma.training.create({
    data: {
      organizationId: org.id,
      title: "Einweisung Unterhaltsreinigung",
      type: "INITIAL",
      passingScore: 80,
      content: {
        slides: [
          { title: "Willkommen", content: "Einführung in die Unterhaltsreinigung", type: "text" },
          { title: "Reinigungsmittel", content: "Übersicht der verwendeten Produkte", type: "text" },
          { title: "Sicherheit", content: "Persönliche Schutzausrüstung", type: "text" },
          { title: "Verfahren", content: "Schritt-für-Schritt Anleitung", type: "text" },
        ],
        quiz: [
          { question: "Welches Produkt wird für Boden verwendet?", options: ["Neutralreiniger", "Sanitärreiniger", "Glasreiniger"], correct: 0 },
          { question: "Wie oft wird der Boden gewischt?", options: ["Wöchentlich", "Täglich", "Monatlich"], correct: 1 },
        ],
      },
    },
  });

  // Create a handbook
  await prisma.handbook.create({
    data: {
      organizationId: org.id,
      title: "Reinigungshandbuch",
      locale: "de",
      content: { version: "1.0" },
      sections: {
        create: [
          {
            title: "Sicherheit am Arbeitsplatz",
            icon: "shield-check",
            sortOrder: 0,
            content: {
              items: [
                "Persönliche Schutzausrüstung (PSA) immer tragen",
                "Gefahrstoffkennzeichnung beachten",
                "Nassreinigung: Warnschilder aufstellen",
                "Elektrische Geräte vor Reinigung ausschalten",
              ],
            },
          },
          {
            title: "Reinigungsverfahren",
            icon: "sparkles",
            sortOrder: 1,
            content: {
              items: [
                "Von oben nach unten reinigen",
                "Von hinten nach vorne arbeiten",
                "Farbsystem für Tücher beachten (Rot=Sanitär, Blau=Oberflächen, Gelb=Möbel, Grün=Küche)",
                "Reinigungsmittel nie mischen",
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Seeding complete!");
  console.log("Demo login: admin@cleansuite.de / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
