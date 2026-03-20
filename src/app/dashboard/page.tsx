import Link from "next/link";
import {
  Building,
  DoorOpen,
  ClipboardCheck,
  QrCode,
  FileText,
  Plus,
  TrendingUp,
  ArrowRight,
  Calendar,
  AlertTriangle,
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

const upcomingTasks = [
  { id: "1", task: "Grundreinigung Flur 2. OG", building: "Krankenhaus Nord", dueTime: "14:00", priority: "high" },
  { id: "2", task: "Desinfektion OP-Saal 3", building: "Krankenhaus Nord", dueTime: "15:30", priority: "high" },
  { id: "3", task: "Glasreinigung Empfang", building: "Bürogebäude Mitte", dueTime: "16:00", priority: "medium" },
];

export default function DashboardPage() {
  const avgQualityResult = calculateQualityResult(kpis.averageQuality);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Willkommen zurück
            </h1>
            <p className="mt-1 text-blue-100">
              Hier ist eine Übersicht Ihrer Reinigungsmanagement-Daten.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">
              {new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/buildings">
          <Card className="transition-all duration-200 hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Gebäude
              </CardTitle>
              <div className="rounded-lg bg-blue-50 p-2">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{kpis.buildings}</div>
              <p className="mt-1 text-xs text-gray-500">Standorte verwaltet</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/buildings">
          <Card className="transition-all duration-200 hover:shadow-md hover:border-indigo-200 hover:-translate-y-0.5 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Räume
              </CardTitle>
              <div className="rounded-lg bg-indigo-50 p-2">
                <DoorOpen className="h-5 w-5 text-indigo-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{kpis.rooms}</div>
              <p className="mt-1 text-xs text-gray-500">in allen Gebäuden</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/quality-controls">
          <Card className="transition-all duration-200 hover:shadow-md hover:border-emerald-200 hover:-translate-y-0.5 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Inspektionen heute
              </CardTitle>
              <div className="rounded-lg bg-emerald-50 p-2">
                <ClipboardCheck className="h-5 w-5 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{kpis.inspectionsToday}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                <span>+2 seit gestern</span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/reports">
          <Card className="transition-all duration-200 hover:shadow-md hover:border-amber-200 hover:-translate-y-0.5 cursor-pointer">
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
                <div>
                  <span className="text-lg font-semibold text-gray-700">
                    {avgQualityResult === "GREEN"
                      ? "Gut"
                      : avgQualityResult === "YELLOW"
                        ? "Akzeptabel"
                        : "Kritisch"}
                  </span>
                  <p className="text-xs text-gray-500">Ziel: 90%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/dashboard/quality-controls">
          <Button className="shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            Neue Inspektion
          </Button>
        </Link>
        <Link href="/dashboard/scanner">
          <Button variant="outline" className="shadow-sm">
            <QrCode className="mr-2 h-4 w-4" />
            QR Scanner
          </Button>
        </Link>
        <Link href="/dashboard/reports">
          <Button variant="outline" className="shadow-sm">
            <FileText className="mr-2 h-4 w-4" />
            Bericht erstellen
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Inspections - 2/3 width */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Letzte Inspektionen</CardTitle>
            <Link href="/dashboard/quality-controls">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                Alle anzeigen
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-gray-500">
                    <th className="pb-3 pr-4 font-medium">Raum</th>
                    <th className="pb-3 pr-4 font-medium hidden sm:table-cell">Gebäude</th>
                    <th className="pb-3 pr-4 font-medium">Bewertung</th>
                    <th className="pb-3 pr-4 font-medium hidden md:table-cell">Prüfer</th>
                    <th className="pb-3 pr-4 font-medium hidden md:table-cell">Datum</th>
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
                        className="border-b last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <td className="py-3 pr-4 font-medium">
                          <Link href={`/dashboard/quality-controls/${inspection.id}`} className="hover:text-blue-600">
                            {inspection.room}
                          </Link>
                        </td>
                        <td className="py-3 pr-4 text-gray-600 hidden sm:table-cell">
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
                        <td className="py-3 pr-4 text-gray-600 hidden md:table-cell">
                          {inspection.inspector}
                        </td>
                        <td className="py-3 pr-4 text-gray-600 hidden md:table-cell">
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

        {/* Upcoming Tasks - 1/3 width */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Anstehende Aufgaben</CardTitle>
            <Link href="/dashboard/runsheets">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                Alle
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <Link key={task.id} href="/dashboard/runsheets" className="block">
                  <div className="rounded-lg border p-3 transition-all hover:shadow-sm hover:border-blue-200 cursor-pointer">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{task.task}</p>
                        <p className="mt-0.5 text-xs text-gray-500">{task.building}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-medium text-gray-600">{task.dueTime}</span>
                        {task.priority === "high" && (
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
