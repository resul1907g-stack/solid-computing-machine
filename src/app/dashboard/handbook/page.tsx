"use client";

import { useState } from "react";
import { ShieldCheck, Sparkles, Droplets, Wrench, Heart, AlertTriangle, Printer, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const sections = [
  { id: "1", title: "Sicherheit am Arbeitsplatz", icon: "ShieldCheck", items: 8, description: "Arbeitsschutz, PSA, Gefahrstoffe" },
  { id: "2", title: "Reinigungsverfahren", icon: "Sparkles", items: 12, description: "Methoden, Techniken, Abläufe" },
  { id: "3", title: "Reinigungsprodukte", icon: "Droplets", items: 15, description: "Dosierung, Anwendung, Sicherheitsdatenblätter" },
  { id: "4", title: "Geräte & Maschinen", icon: "Wrench", items: 10, description: "Bedienung, Wartung, Fehlerbehebung" },
  { id: "5", title: "Hygienerichtlinien", icon: "Heart", items: 6, description: "Händehygiene, Desinfektion, Infektionsschutz" },
  { id: "6", title: "Notfallverfahren", icon: "AlertTriangle", items: 4, description: "Erste Hilfe, Evakuierung, Meldekette" },
];

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Sparkles,
  Droplets,
  Wrench,
  Heart,
  AlertTriangle,
};

const iconColorMap: Record<string, { bg: string; text: string }> = {
  ShieldCheck: { bg: "bg-blue-100", text: "text-blue-600" },
  Sparkles: { bg: "bg-purple-100", text: "text-purple-600" },
  Droplets: { bg: "bg-cyan-100", text: "text-cyan-600" },
  Wrench: { bg: "bg-orange-100", text: "text-orange-600" },
  Heart: { bg: "bg-pink-100", text: "text-pink-600" },
  AlertTriangle: { bg: "bg-red-100", text: "text-red-600" },
};

const languages = [
  { code: "DE", label: "Deutsch" },
  { code: "EN", label: "English" },
  { code: "TR", label: "Türkçe" },
  { code: "PL", label: "Polski" },
  { code: "AR", label: "العربية" },
];

export default function HandbookPage() {
  const [selectedLang, setSelectedLang] = useState("DE");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Handbuch für Reinigungskräfte</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border bg-white p-1">
            <Globe className="ml-2 h-4 w-4 text-gray-500" />
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  selectedLang === lang.code
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                )}
                title={lang.label}
              >
                {lang.code}
              </button>
            ))}
          </div>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Handbuch drucken
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const IconComponent = iconMap[section.icon];
          const colors = iconColorMap[section.icon];

          return (
            <Card
              key={section.id}
              className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className={cn("rounded-2xl p-4 mb-4", colors.bg)}>
                    <IconComponent className={cn("h-10 w-10", colors.text)} />
                  </div>
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{section.description}</p>
                  <Badge variant="secondary" className="mt-3">
                    {section.items} Artikel
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
