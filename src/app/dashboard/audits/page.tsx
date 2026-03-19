"use client";

import { useState } from "react";
import { ClipboardCheck, Plus, FileText, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const audits = [
  { id: "1", title: "Qualitätsaudit Q1 2026", type: "GENERAL_AUDIT" as const, status: "ACTIVE" as const, responses: 12, date: "2026-03-01" },
  { id: "2", title: "Mitarbeiterbefragung März", type: "SURVEY" as const, status: "ACTIVE" as const, responses: 28, date: "2026-03-15" },
  { id: "3", title: "Kompetenzprüfung Hygiene", type: "COMPETENCY_CHECK" as const, status: "CLOSED" as const, responses: 8, date: "2026-02-20" },
  { id: "4", title: "Prozessaudit Reinigung", type: "PROCESS_AUDIT" as const, status: "DRAFT" as const, responses: 0, date: "2026-03-18" },
];

type AuditType = "GENERAL_AUDIT" | "SURVEY" | "COMPETENCY_CHECK" | "PROCESS_AUDIT";
type AuditStatus = "DRAFT" | "ACTIVE" | "CLOSED";

const statusConfig: Record<AuditStatus, { label: string; className: string }> = {
  DRAFT: { label: "Entwurf", className: "bg-gray-100 text-gray-800" },
  ACTIVE: { label: "Aktiv", className: "bg-emerald-100 text-emerald-800" },
  CLOSED: { label: "Abgeschlossen", className: "bg-blue-100 text-blue-800" },
};

const typeConfig: Record<AuditType, { label: string; className: string }> = {
  GENERAL_AUDIT: { label: "Allgemeines Audit", className: "bg-blue-100 text-blue-800" },
  SURVEY: { label: "Befragung", className: "bg-purple-100 text-purple-800" },
  COMPETENCY_CHECK: { label: "Kompetenzprüfung", className: "bg-orange-100 text-orange-800" },
  PROCESS_AUDIT: { label: "Prozessaudit", className: "bg-red-100 text-red-800" },
};

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

export default function AuditsPage() {
  const [activeTab, setActiveTab] = useState<"audits" | "surveys">("audits");

  const filteredItems = audits.filter((item) => {
    if (activeTab === "audits") return item.type !== "SURVEY";
    return item.type === "SURVEY";
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Audits &amp; Befragungen</h1>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Neues Audit
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Neue Befragung
          </Button>
        </div>
      </div>

      <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setActiveTab("audits")}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            activeTab === "audits"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          <ClipboardCheck className="mr-2 inline h-4 w-4" />
          Audits
        </button>
        <button
          onClick={() => setActiveTab("surveys")}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            activeTab === "surveys"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          <Users className="mr-2 inline h-4 w-4" />
          Befragungen
        </button>
      </div>

      <div className="space-y-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-gray-100 p-2">
                    {item.type === "SURVEY" ? (
                      <Users className="h-5 w-5 text-gray-600" />
                    ) : item.type === "COMPETENCY_CHECK" ? (
                      <CheckCircle className="h-5 w-5 text-gray-600" />
                    ) : (
                      <FileText className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <Badge
                        className={cn(
                          "border-transparent",
                          typeConfig[item.type].className
                        )}
                      >
                        {typeConfig[item.type].label}
                      </Badge>
                      <Badge
                        className={cn(
                          "border-transparent",
                          statusConfig[item.status].className
                        )}
                      >
                        {statusConfig[item.status].label}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{item.responses} Antworten</span>
                  <span>{formatDate(item.date)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredItems.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            Keine Einträge vorhanden.
          </div>
        )}
      </div>
    </div>
  );
}
