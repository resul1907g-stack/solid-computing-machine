"use client";

import { useState } from "react";
import { Plus, GraduationCap, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const trainings = [
  { id: "1", title: "Einweisung Unterhaltsreinigung", type: "INITIAL" as const, passingScore: 80, completions: 15, total: 20 },
  { id: "2", title: "Arbeitssicherheit 2026", type: "SAFETY" as const, passingScore: 90, completions: 18, total: 20 },
  { id: "3", title: "Hygieneschulung Krankenhaus", type: "HYGIENE" as const, passingScore: 85, completions: 8, total: 12 },
  { id: "4", title: "Geräteeinweisung Scheuersaugmaschine", type: "EQUIPMENT" as const, passingScore: 75, completions: 5, total: 10 },
];

type TrainingType = "INITIAL" | "SAFETY" | "HYGIENE" | "EQUIPMENT" | "PROCEDURE" | "REFRESHER";

const typeConfig: Record<TrainingType, { label: string; className: string }> = {
  INITIAL: { label: "Ersteinweisung", className: "bg-blue-100 text-blue-800" },
  SAFETY: { label: "Arbeitssicherheit", className: "bg-red-100 text-red-800" },
  HYGIENE: { label: "Hygiene", className: "bg-purple-100 text-purple-800" },
  EQUIPMENT: { label: "Geräte", className: "bg-orange-100 text-orange-800" },
  PROCEDURE: { label: "Verfahren", className: "bg-emerald-100 text-emerald-800" },
  REFRESHER: { label: "Auffrischung", className: "bg-yellow-100 text-yellow-800" },
};

export default function TrainingPage() {
  const available = trainings.filter((t) => t.completions < t.total);
  const completed = trainings.filter((t) => t.completions >= t.total);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Schulungen &amp; Zertifizierung</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neue Schulung
        </Button>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Verfügbare Schulungen</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {available.map((training) => {
            const percentage = Math.round((training.completions / training.total) * 100);
            return (
              <Card key={training.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="rounded-lg bg-gray-100 p-2">
                      <GraduationCap className="h-5 w-5 text-gray-600" />
                    </div>
                    <Badge
                      className={cn(
                        "border-transparent",
                        typeConfig[training.type].className
                      )}
                    >
                      {typeConfig[training.type].label}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2 text-lg">{training.title}</CardTitle>
                  <CardDescription>
                    Mindestpunktzahl: {training.passingScore}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-1 flex justify-between text-sm text-gray-600">
                      <span>{training.completions} von {training.total} abgeschlossen</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all",
                          percentage > 80 ? "bg-emerald-500" : "bg-blue-500"
                        )}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Schulung starten
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Abgeschlossene Schulungen</h2>
        {completed.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completed.map((training) => (
              <Card key={training.id} className="opacity-75">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="rounded-lg bg-emerald-100 p-2">
                      <GraduationCap className="h-5 w-5 text-emerald-600" />
                    </div>
                    <Badge
                      className={cn(
                        "border-transparent",
                        typeConfig[training.type].className
                      )}
                    >
                      {typeConfig[training.type].label}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2 text-lg">{training.title}</CardTitle>
                  <CardDescription>
                    Mindestpunktzahl: {training.passingScore}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-1 flex justify-between text-sm text-gray-600">
                      <span>{training.completions} von {training.total} abgeschlossen</span>
                      <span>100%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 w-full rounded-full bg-emerald-500" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Schulung starten
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            Noch keine Schulungen abgeschlossen.
          </div>
        )}
      </section>
    </div>
  );
}
