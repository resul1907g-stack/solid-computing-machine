"use client";

import { ClipboardCheck, TrendingUp, Wrench, GraduationCap, Download, FileText, FileSpreadsheet, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QualityIndicator } from "@/components/ui/quality-indicator";
import { cn } from "@/lib/utils";

const buildingScores = [
  { name: "Krankenhaus Nord", score: 89, result: "GREEN" as const },
  { name: "Bürogebäude Mitte", score: 94, result: "GREEN" as const },
  { name: "Pflegeheim Süd", score: 78, result: "YELLOW" as const },
];

const recentActivity = [
  { id: "1", text: "Inspektion Krankenhaus Nord abgeschlossen", time: "vor 2 Stunden", type: "inspection" },
  { id: "2", text: "Reparaturmeldung #42 erstellt", time: "vor 3 Stunden", type: "repair" },
  { id: "3", text: "Schulung Arbeitssicherheit abgeschlossen von M. Müller", time: "vor 5 Stunden", type: "training" },
  { id: "4", text: "Qualitätsprüfung Bürogebäude Mitte: 94%", time: "vor 6 Stunden", type: "quality" },
  { id: "5", text: "Neue Reparaturmeldung #43 erstellt", time: "vor 8 Stunden", type: "repair" },
];

const trendData = [72, 78, 80, 76, 82, 85, 83, 88, 86, 84, 87, 89, 85, 87, 90, 88, 86, 89, 91, 87, 88, 90, 92, 89, 87, 90, 88, 91, 89, 87];

export default function ReportsPage() {
  const maxTrend = Math.max(...trendData);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Berichte &amp; Analysen</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            PDF Export
          </Button>
          <Button variant="outline">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            CSV Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Inspektionen gesamt</p>
                <p className="mt-1 text-3xl font-bold">156</p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3">
                <ClipboardCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Durchschnittliche Qualität</p>
                <div className="mt-1 flex items-center gap-3">
                  <p className="text-3xl font-bold">87%</p>
                  <QualityIndicator result="GREEN" score={87} size="sm" />
                </div>
              </div>
              <div className="rounded-lg bg-emerald-100 p-3">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Reparaturmeldungen offen</p>
                <p className="mt-1 text-3xl font-bold">5</p>
              </div>
              <div className="rounded-lg bg-orange-100 p-3">
                <Wrench className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Schulungsquote</p>
                <p className="mt-1 text-3xl font-bold">92%</p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quality Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Qualitätsentwicklung der letzten 30 Tage</CardTitle>
          <CardDescription>Durchschnittliche Qualitätsbewertung pro Tag</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1" style={{ height: "200px" }}>
            {trendData.map((value, index) => {
              const height = (value / maxTrend) * 100;
              return (
                <div
                  key={index}
                  className="flex-1 group relative"
                  style={{ height: "100%" }}
                >
                  <div className="absolute bottom-0 w-full flex flex-col items-center">
                    <div className="hidden group-hover:block absolute -top-8 rounded bg-gray-800 px-2 py-1 text-xs text-white whitespace-nowrap">
                      {value}%
                    </div>
                    <div
                      className={cn(
                        "w-full rounded-t transition-all",
                        value >= 85 ? "bg-emerald-400 hover:bg-emerald-500" :
                        value >= 75 ? "bg-amber-400 hover:bg-amber-500" :
                        "bg-red-400 hover:bg-red-500"
                      )}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-400">
            <span>Vor 30 Tagen</span>
            <span>Heute</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Building Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Gebäudevergleich</CardTitle>
            <CardDescription>Qualitätsbewertung nach Gebäude</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {buildingScores.map((building) => (
              <div key={building.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{building.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{building.score}%</span>
                    <QualityIndicator result={building.result} score={building.score} size="sm" />
                  </div>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-200">
                  <div
                    className={cn(
                      "h-3 rounded-full transition-all",
                      building.result === "GREEN" ? "bg-emerald-500" :
                      building.result === "YELLOW" ? "bg-amber-400" :
                      "bg-red-500"
                    )}
                    style={{ width: `${building.score}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Letzte Aktivitäten</CardTitle>
            <CardDescription>Aktuelle Ereignisse und Aktualisierungen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50">
                  <div className="mt-0.5 rounded-full bg-gray-100 p-1.5">
                    <Clock className="h-3.5 w-3.5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
