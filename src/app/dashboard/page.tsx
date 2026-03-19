import {
  Building,
  DoorOpen,
  ClipboardCheck,
  QrCode,
  FileText,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QualityIndicator } from "@/components/ui/quality-indicator";
import { calculateQualityResult, formatDate } from "@/lib/utils";

// Demo data
const kpis = {
  buildings: 12,
  rooms: 245,
  inspectionsToday: 8,
  averageQuality: 87.5,
};

const recentInspections = [
  {
    id: "1",
    room: "Zimmer 201",
    building: "Krankenhaus Nord",
    score: 92,
    inspector: "Maria Schmidt",
    date: new Date("2026-03-19"),
    status: "Abgeschlossen" as const,
  },
  {
    id: "2",
    room: "Flur 3. OG",
    building: "Bürogebäude Mitte",
    score: 78,
    inspector: "Thomas Müller",
    date: new Date("2026-03-19"),
    status: "Abgeschlossen" as const,
  },
  {
    id: "3",
    room: "Aufenthaltsraum",
    building: "Pflegeheim Süd",
    score: 95,
    inspector: "Anna Weber",
    date: new Date("2026-03-18"),
    status: "Abgeschlossen" as const,
  },
  {
    id: "4",
    room: "Empfangshalle",
    building: "Krankenhaus Nord",
    score: 64,
    inspector: "Klaus Fischer",
    date: new Date("2026-03-18"),
    status: "Nacharbeit" as const,
  },
  {
    id: "5",
    room: "Labor B2",
    building: "Krankenhaus Nord",
    score: 88,
    inspector: "Maria Schmidt",
    date: new Date("2026-03-17"),
    status: "Abgeschlossen" as const,
  },
];

export default function DashboardPage() {
  const avgQualityResult = calculateQualityResult(kpis.averageQuality);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Willkommen zurück
        </h1>
        <p className="text-gray-500 mt-1">
          Hier ist eine Übersicht Ihrer Reinigungsmanagement-Daten.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Gebäude
            </CardTitle>
            <Building className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{kpis.buildings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Räume
            </CardTitle>
            <DoorOpen className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{kpis.rooms}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Inspektionen heute
            </CardTitle>
            <ClipboardCheck className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{kpis.inspectionsToday}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Durchschnittliche Qualität
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <QualityIndicator
                result={avgQualityResult}
                score={kpis.averageQuality}
                size="md"
              />
              <span className="text-lg font-semibold text-gray-700">
                {avgQualityResult === "GREEN"
                  ? "Gut"
                  : avgQualityResult === "YELLOW"
                    ? "Akzeptabel"
                    : "Kritisch"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neue Inspektion
        </Button>
        <Button variant="outline">
          <QrCode className="mr-2 h-4 w-4" />
          QR Scanner
        </Button>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Bericht erstellen
        </Button>
      </div>

      {/* Recent Inspections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Letzte Inspektionen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 pr-4 font-medium">Raum</th>
                  <th className="pb-3 pr-4 font-medium">Gebäude</th>
                  <th className="pb-3 pr-4 font-medium">Bewertung</th>
                  <th className="pb-3 pr-4 font-medium">Prüfer</th>
                  <th className="pb-3 pr-4 font-medium">Datum</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentInspections.map((inspection) => {
                  const qualityResult = calculateQualityResult(
                    inspection.score
                  );
                  return (
                    <tr
                      key={inspection.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="py-3 pr-4 font-medium">
                        {inspection.room}
                      </td>
                      <td className="py-3 pr-4 text-gray-600">
                        {inspection.building}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <QualityIndicator
                            result={qualityResult}
                            score={inspection.score}
                            size="sm"
                          />
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-gray-600">
                        {inspection.inspector}
                      </td>
                      <td className="py-3 pr-4 text-gray-600">
                        {formatDate(inspection.date)}
                      </td>
                      <td className="py-3">
                        <Badge
                          variant={
                            inspection.status === "Abgeschlossen"
                              ? "success"
                              : "warning"
                          }
                        >
                          {inspection.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
