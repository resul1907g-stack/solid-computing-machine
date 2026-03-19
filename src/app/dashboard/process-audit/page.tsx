"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  ClipboardList,
  CheckCircle,
  XCircle,
  Clock,
  FileCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

interface AuditTemplate {
  id: string;
  name: string;
  description: string;
  checkpoints: number;
  category: string;
}

interface AuditResult {
  id: string;
  templateName: string;
  date: string;
  auditor: string;
  employee: string;
  passed: boolean;
  score: number;
  totalPoints: number;
}

const auditTemplates: AuditTemplate[] = [
  {
    id: "t1",
    name: "Unterhaltsreinigung - Fachkompetenz",
    description:
      "Überprüfung der fachlichen Qualifikation bei der Unterhaltsreinigung",
    checkpoints: 12,
    category: "Reinigung",
  },
  {
    id: "t2",
    name: "Hygiene & Desinfektion",
    description:
      "Audit zur korrekten Anwendung von Desinfektionsmitteln und Hygieneverfahren",
    checkpoints: 15,
    category: "Hygiene",
  },
  {
    id: "t3",
    name: "Arbeitssicherheit",
    description:
      "Überprüfung der Einhaltung von Arbeitssicherheitsvorschriften",
    checkpoints: 10,
    category: "Sicherheit",
  },
  {
    id: "t4",
    name: "Maschinenführung",
    description:
      "Kompetenzprüfung für den Umgang mit Reinigungsmaschinen",
    checkpoints: 8,
    category: "Technik",
  },
];

const recentAudits: AuditResult[] = [
  {
    id: "a1",
    templateName: "Unterhaltsreinigung - Fachkompetenz",
    date: "2026-03-19",
    auditor: "Maria Müller",
    employee: "Thomas Bauer",
    passed: true,
    score: 11,
    totalPoints: 12,
  },
  {
    id: "a2",
    templateName: "Hygiene & Desinfektion",
    date: "2026-03-18",
    auditor: "Anna Schmidt",
    employee: "Lisa Klein",
    passed: true,
    score: 13,
    totalPoints: 15,
  },
  {
    id: "a3",
    templateName: "Arbeitssicherheit",
    date: "2026-03-17",
    auditor: "Peter Weber",
    employee: "Michael Braun",
    passed: false,
    score: 5,
    totalPoints: 10,
  },
  {
    id: "a4",
    templateName: "Maschinenführung",
    date: "2026-03-16",
    auditor: "Maria Müller",
    employee: "Sandra Hoffmann",
    passed: true,
    score: 7,
    totalPoints: 8,
  },
  {
    id: "a5",
    templateName: "Hygiene & Desinfektion",
    date: "2026-03-15",
    auditor: "Anna Schmidt",
    employee: "Klaus Fischer",
    passed: false,
    score: 9,
    totalPoints: 15,
  },
];

const categoryColors: Record<string, string> = {
  Reinigung: "bg-blue-100 text-blue-800 border-blue-200",
  Hygiene: "bg-purple-100 text-purple-800 border-purple-200",
  Sicherheit: "bg-orange-100 text-orange-800 border-orange-200",
  Technik: "bg-cyan-100 text-cyan-800 border-cyan-200",
};

export default function ProcessAuditPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const passedCount = recentAudits.filter((a) => a.passed).length;
  const failedCount = recentAudits.filter((a) => !a.passed).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prozessaudit</h1>
          <p className="mt-1 text-gray-500">
            Überprüfung der fachlichen Qualifikation
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neues Audit starten
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <FileCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Audits gesamt</p>
                <p className="text-2xl font-bold">{recentAudits.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Bestanden</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {passedCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Nicht bestanden</p>
                <p className="text-2xl font-bold text-red-600">
                  {failedCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Templates */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Audit-Vorlagen</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {auditTemplates.map((template) => (
            <Card
              key={template.id}
              className={cn(
                "cursor-pointer transition-shadow hover:shadow-md",
                selectedTemplate === template.id && "ring-2 ring-blue-500"
              )}
              onClick={() =>
                setSelectedTemplate(
                  selectedTemplate === template.id ? null : template.id
                )
              }
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <ClipboardList className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {template.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {template.description}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge
                    className={cn(
                      "border",
                      categoryColors[template.category]
                    )}
                  >
                    {template.category}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {template.checkpoints} Prüfpunkte
                  </span>
                </div>
                {selectedTemplate === template.id && (
                  <Button className="mt-4 w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Audit mit dieser Vorlage starten
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Audit Results */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Letzte Audit-Ergebnisse</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-gray-500">
                    <th className="pb-3 pr-4 font-medium">Datum</th>
                    <th className="pb-3 pr-4 font-medium">Vorlage</th>
                    <th className="pb-3 pr-4 font-medium">Mitarbeiter</th>
                    <th className="pb-3 pr-4 font-medium">Prüfer</th>
                    <th className="pb-3 pr-4 font-medium">Ergebnis</th>
                    <th className="pb-3 font-medium">Punkte</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAudits.map((audit) => (
                    <tr
                      key={audit.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="py-3 pr-4">{formatDate(audit.date)}</td>
                      <td className="py-3 pr-4 font-medium">
                        {audit.templateName}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-gray-400" />
                          {audit.employee}
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-gray-600">
                        {audit.auditor}
                      </td>
                      <td className="py-3 pr-4">
                        {audit.passed ? (
                          <div className="flex items-center gap-1.5 text-emerald-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="font-medium">Bestanden</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-red-600">
                            <XCircle className="h-4 w-4" />
                            <span className="font-medium">
                              Nicht bestanden
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="py-3">
                        <span
                          className={cn(
                            "font-medium",
                            audit.passed
                              ? "text-emerald-600"
                              : "text-red-600"
                          )}
                        >
                          {audit.score}/{audit.totalPoints}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
