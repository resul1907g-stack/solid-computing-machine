"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  ClipboardCheck,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QualityIndicator } from "@/components/ui/quality-indicator";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

type QualityResult = "GREEN" | "YELLOW" | "RED";

const inspections = [
  {
    id: "1",
    date: "2026-03-19",
    room: "Raum 001",
    building: "Krankenhaus Nord",
    score: 92,
    result: "GREEN" as const,
    inspector: "Anna Schmidt",
    status: "COMPLETED",
  },
  {
    id: "2",
    date: "2026-03-19",
    room: "Raum 003",
    building: "Krankenhaus Nord",
    score: 78,
    result: "YELLOW" as const,
    inspector: "Anna Schmidt",
    status: "COMPLETED",
  },
  {
    id: "3",
    date: "2026-03-18",
    room: "Raum 101",
    building: "Krankenhaus Nord",
    score: 65,
    result: "RED" as const,
    inspector: "Peter Weber",
    status: "COMPLETED",
  },
  {
    id: "4",
    date: "2026-03-18",
    room: "Büro 201",
    building: "Bürogebäude Mitte",
    score: 95,
    result: "GREEN" as const,
    inspector: "Maria Müller",
    status: "COMPLETED",
  },
  {
    id: "5",
    date: "2026-03-17",
    room: "Zimmer 305",
    building: "Pflegeheim Süd",
    score: 88,
    result: "GREEN" as const,
    inspector: "Anna Schmidt",
    status: "COMPLETED",
  },
];

const buildings = [
  "Krankenhaus Nord",
  "Bürogebäude Mitte",
  "Pflegeheim Süd",
];

const statusLabels: Record<string, string> = {
  COMPLETED: "Abgeschlossen",
  IN_PROGRESS: "In Bearbeitung",
  DRAFT: "Entwurf",
};

export default function QualityControlsPage() {
  const [search, setSearch] = useState("");
  const [buildingFilter, setBuildingFilter] = useState("ALL");
  const [resultFilter, setResultFilter] = useState<QualityResult | "ALL">(
    "ALL"
  );

  const filtered = inspections.filter((insp) => {
    const matchesSearch =
      insp.room.toLowerCase().includes(search.toLowerCase()) ||
      insp.inspector.toLowerCase().includes(search.toLowerCase());
    const matchesBuilding =
      buildingFilter === "ALL" || insp.building === buildingFilter;
    const matchesResult =
      resultFilter === "ALL" || insp.result === resultFilter;
    return matchesSearch && matchesBuilding && matchesResult;
  });

  const totalInspections = inspections.length;
  const avgScore = Math.round(
    inspections.reduce((sum, i) => sum + i.score, 0) / totalInspections
  );
  const greenCount = inspections.filter((i) => i.result === "GREEN").length;
  const yellowCount = inspections.filter((i) => i.result === "YELLOW").length;
  const redCount = inspections.filter((i) => i.result === "RED").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Qualitätskontrollen
        </h1>
        <Link href="/dashboard/quality-controls/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Neue Inspektion
          </Button>
        </Link>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <ClipboardCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Inspektionen gesamt</p>
                <p className="text-2xl font-bold">{totalInspections}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Durchschnitt</p>
                <p className="text-2xl font-bold">{avgScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <BarChart3 className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Verteilung</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    {greenCount}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    {yellowCount}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    {redCount}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <QualityIndicator
                result={avgScore >= 85 ? "GREEN" : avgScore >= 75 ? "YELLOW" : "RED"}
                score={avgScore}
                size="lg"
              />
              <div>
                <p className="text-sm text-gray-500">Gesamtergebnis</p>
                <p className="text-sm font-medium text-gray-700">
                  {avgScore >= 85
                    ? "Gut"
                    : avgScore >= 75
                    ? "Verbesserungsbedarf"
                    : "Mangelhaft"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Raum oder Prüfer suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={buildingFilter}
          onChange={(e) => setBuildingFilter(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="ALL">Alle Gebäude</option>
          {buildings.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select
          value={resultFilter}
          onChange={(e) =>
            setResultFilter(e.target.value as QualityResult | "ALL")
          }
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="ALL">Alle Ergebnisse</option>
          <option value="GREEN">Grün</option>
          <option value="YELLOW">Gelb</option>
          <option value="RED">Rot</option>
        </select>
      </div>

      {/* Inspections Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 pr-4 font-medium">Datum</th>
                  <th className="pb-3 pr-4 font-medium">Raum</th>
                  <th className="pb-3 pr-4 font-medium">Gebäude</th>
                  <th className="pb-3 pr-4 font-medium">Ergebnis</th>
                  <th className="pb-3 pr-4 font-medium">Punkte</th>
                  <th className="pb-3 pr-4 font-medium">Prüfer</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((insp) => (
                  <tr
                    key={insp.id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="py-3 pr-4">
                      <Link
                        href={`/dashboard/quality-controls/${insp.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {formatDate(insp.date)}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 font-medium">{insp.room}</td>
                    <td className="py-3 pr-4 text-gray-600">
                      {insp.building}
                    </td>
                    <td className="py-3 pr-4">
                      <QualityIndicator
                        result={insp.result}
                        score={insp.score}
                        size="sm"
                      />
                    </td>
                    <td className="py-3 pr-4 font-medium">{insp.score}%</td>
                    <td className="py-3 pr-4 text-gray-600">
                      {insp.inspector}
                    </td>
                    <td className="py-3">
                      <Badge variant="secondary">
                        {statusLabels[insp.status] ?? insp.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <ClipboardCheck className="mx-auto h-12 w-12 mb-4 text-gray-300" />
              <p className="text-lg font-medium">
                Keine Inspektionen gefunden
              </p>
              <p className="text-sm">
                Versuchen Sie einen anderen Suchbegriff oder Filter.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
