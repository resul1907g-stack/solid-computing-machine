"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  FileText,
  ClipboardList,
  DoorOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type CleaningType =
  | "MAINTENANCE"
  | "BASIC"
  | "HYGIENE"
  | "GLASS"
  | "SPECIAL"
  | "OPERATING_ROOM"
  | "DISINFECTION";

const cleaningTypeConfig: Record<
  CleaningType,
  { label: string; color: string }
> = {
  MAINTENANCE: {
    label: "Unterhaltsreinigung",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  BASIC: {
    label: "Grundreinigung",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  HYGIENE: {
    label: "Hygienereinigung",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  GLASS: {
    label: "Glasreinigung",
    color: "bg-cyan-100 text-cyan-800 border-cyan-200",
  },
  SPECIAL: {
    label: "Sonderreinigung",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  OPERATING_ROOM: {
    label: "OP-Reinigung",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  DISINFECTION: {
    label: "Desinfektion",
    color: "bg-pink-100 text-pink-800 border-pink-200",
  },
};

const specifications = [
  {
    id: "1",
    name: "Unterhaltsreinigung Standard",
    cleaningType: "MAINTENANCE" as CleaningType,
    dinStandard: "DIN 77400",
    items: 12,
    rooms: 45,
  },
  {
    id: "2",
    name: "OP-Reinigung Intensiv",
    cleaningType: "OPERATING_ROOM" as CleaningType,
    dinStandard: "DIN EN 13549",
    items: 18,
    rooms: 8,
  },
  {
    id: "3",
    name: "Hygienereinigung Sanitär",
    cleaningType: "HYGIENE" as CleaningType,
    dinStandard: "DIN EN 13549",
    items: 15,
    rooms: 30,
  },
  {
    id: "4",
    name: "Grundreinigung Quartal",
    cleaningType: "BASIC" as CleaningType,
    dinStandard: null,
    items: 20,
    rooms: 120,
  },
  {
    id: "5",
    name: "Glasreinigung Fassade",
    cleaningType: "GLASS" as CleaningType,
    dinStandard: null,
    items: 6,
    rooms: 15,
  },
];

export default function SpecificationsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<CleaningType | "ALL">("ALL");

  const filtered = specifications.filter((spec) => {
    const matchesSearch = spec.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType =
      typeFilter === "ALL" || spec.cleaningType === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Leistungsverzeichnisse
        </h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neues Leistungsverzeichnis
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Leistungsverzeichnis suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value as CleaningType | "ALL")
          }
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="ALL">Alle Reinigungsarten</option>
          {Object.entries(cleaningTypeConfig).map(([key, config]) => (
            <option key={key} value={key}>
              {config.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((spec) => {
          const typeConfig = cleaningTypeConfig[spec.cleaningType];
          return (
            <Link
              key={spec.id}
              href={`/dashboard/specifications/${spec.id}`}
              className="block"
            >
              <Card
                className={cn(
                  "transition-shadow hover:shadow-md cursor-pointer h-full"
                )}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                        <FileText className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{spec.name}</CardTitle>
                        {spec.dinStandard && (
                          <CardDescription>{spec.dinStandard}</CardDescription>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Badge className={cn("border", typeConfig.color)}>
                      {typeConfig.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <ClipboardList className="h-4 w-4" />
                      <span>
                        {spec.items}{" "}
                        {spec.items === 1 ? "Position" : "Positionen"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DoorOpen className="h-4 w-4" />
                      <span>
                        {spec.rooms} {spec.rooms === 1 ? "Raum" : "Räume"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FileText className="mx-auto h-12 w-12 mb-4 text-gray-300" />
          <p className="text-lg font-medium">
            Keine Leistungsverzeichnisse gefunden
          </p>
          <p className="text-sm">
            Versuchen Sie einen anderen Suchbegriff oder Filter.
          </p>
        </div>
      )}
    </div>
  );
}
