"use client";

import { useState } from "react";
import { Plus, ChevronDown, ChevronUp, CheckCircle2, Circle, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const runsheets = [
  { id: "1", name: "Erdgeschoss Morgen", assignedTo: "Hans Fischer", rooms: 12, completed: 8, date: "2026-03-19" },
  { id: "2", name: "1. OG Nachmittag", assignedTo: "Maria Müller", rooms: 10, completed: 10, date: "2026-03-19" },
  { id: "3", name: "Sanitärbereiche", assignedTo: "Hans Fischer", rooms: 8, completed: 3, date: "2026-03-19" },
];

const roomNames: Record<string, string[]> = {
  "1": ["Empfang", "Wartebereich", "Büro 001", "Büro 002", "Büro 003", "Konferenzraum A", "WC Herren EG", "WC Damen EG", "Küche EG", "Flur EG Nord", "Flur EG Süd", "Lager EG"],
  "2": ["Büro 101", "Büro 102", "Büro 103", "Büro 104", "Konferenzraum B", "WC 1. OG", "Küche 1. OG", "Flur 1. OG Nord", "Flur 1. OG Süd", "Serverraum"],
  "3": ["WC Herren EG", "WC Damen EG", "WC Herren 1. OG", "WC Damen 1. OG", "Duschraum 1", "Duschraum 2", "Umkleide Herren", "Umkleide Damen"],
};

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

export default function RunsheetsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Laufzettel</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neuer Laufzettel
        </Button>
      </div>

      <div className="space-y-4">
        {runsheets.map((sheet) => {
          const percentage = Math.round((sheet.completed / sheet.rooms) * 100);
          const isExpanded = expandedId === sheet.id;
          const isComplete = sheet.completed >= sheet.rooms;
          const rooms = roomNames[sheet.id] || [];

          return (
            <Card key={sheet.id} className={cn(isComplete && "border-emerald-200 bg-emerald-50/30")}>
              <CardContent className="p-4">
                <div
                  className="cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : sheet.id)}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "rounded-lg p-2",
                        isComplete ? "bg-emerald-100" : "bg-gray-100"
                      )}>
                        <MapPin className={cn(
                          "h-5 w-5",
                          isComplete ? "text-emerald-600" : "text-gray-600"
                        )} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{sheet.name}</h3>
                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                          <User className="h-3.5 w-3.5" />
                          <span>{sheet.assignedTo}</span>
                          <span className="text-gray-300">|</span>
                          <span>{formatDate(sheet.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={cn(
                          "border-transparent",
                          isComplete
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-blue-100 text-blue-800"
                        )}
                      >
                        {sheet.completed}/{sheet.rooms} Räume
                      </Badge>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="mb-1 flex justify-between text-sm text-gray-600">
                      <span>Fortschritt</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-gray-200">
                      <div
                        className={cn(
                          "h-2.5 rounded-full transition-all",
                          isComplete ? "bg-emerald-500" : "bg-blue-500"
                        )}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="mb-2 text-sm font-medium text-gray-700">Raumliste</h4>
                    <div className="grid gap-1.5 sm:grid-cols-2">
                      {rooms.map((room, index) => {
                        const isDone = index < sheet.completed;
                        return (
                          <div
                            key={room}
                            className={cn(
                              "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                              isDone ? "bg-emerald-50 text-emerald-700" : "bg-gray-50 text-gray-600"
                            )}
                          >
                            {isDone ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 text-gray-300 flex-shrink-0" />
                            )}
                            <span>{room}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
