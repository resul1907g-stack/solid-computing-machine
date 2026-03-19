"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Printer,
  DoorOpen,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
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

type Frequency = "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "ANNUALLY";

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

const frequencyConfig: Record<
  Frequency,
  { label: string; color: string }
> = {
  DAILY: {
    label: "Täglich",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  WEEKLY: {
    label: "Wöchentlich",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  MONTHLY: {
    label: "Monatlich",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  QUARTERLY: {
    label: "Quartalsweise",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  ANNUALLY: {
    label: "Jährlich",
    color: "bg-gray-100 text-gray-800 border-gray-200",
  },
};

const specifications: Record<
  string,
  {
    id: string;
    name: string;
    cleaningType: CleaningType;
    dinStandard: string | null;
  }
> = {
  "1": {
    id: "1",
    name: "Unterhaltsreinigung Standard",
    cleaningType: "MAINTENANCE",
    dinStandard: "DIN 77400",
  },
  "2": {
    id: "2",
    name: "OP-Reinigung Intensiv",
    cleaningType: "OPERATING_ROOM",
    dinStandard: "DIN EN 13549",
  },
  "3": {
    id: "3",
    name: "Hygienereinigung Sanitär",
    cleaningType: "HYGIENE",
    dinStandard: "DIN EN 13549",
  },
  "4": {
    id: "4",
    name: "Grundreinigung Quartal",
    cleaningType: "BASIC",
    dinStandard: null,
  },
  "5": {
    id: "5",
    name: "Glasreinigung Fassade",
    cleaningType: "GLASS",
    dinStandard: null,
  },
};

const items = [
  {
    id: "1",
    componentName: "Boden",
    activity: "Feucht wischen",
    frequency: "DAILY" as Frequency,
    colorCode: "#ef4444",
    method: "Nassreinigung",
    product: "Neutralreiniger",
  },
  {
    id: "2",
    componentName: "Oberflächen",
    activity: "Feucht abwischen",
    frequency: "DAILY" as Frequency,
    colorCode: "#ef4444",
    method: "Sprühwischen",
    product: "Flächendesinfektion",
  },
  {
    id: "3",
    componentName: "Sanitärobjekte",
    activity: "Reinigen und desinfizieren",
    frequency: "DAILY" as Frequency,
    colorCode: "#ef4444",
    method: "Direktauftrag",
    product: "Sanitärreiniger",
  },
  {
    id: "4",
    componentName: "Fenster innen",
    activity: "Glasreinigung",
    frequency: "MONTHLY" as Frequency,
    colorCode: "#22c55e",
    method: "Einwascher/Abzieher",
    product: "Glasreiniger",
  },
  {
    id: "5",
    componentName: "Heizkörper",
    activity: "Feucht abwischen",
    frequency: "WEEKLY" as Frequency,
    colorCode: "#3b82f6",
    method: "Feuchtwischen",
    product: "Neutralreiniger",
  },
  {
    id: "6",
    componentName: "Türen & Zargen",
    activity: "Feucht abwischen",
    frequency: "WEEKLY" as Frequency,
    colorCode: "#3b82f6",
    method: "Feuchtwischen",
    product: "Neutralreiniger",
  },
];

const assignedRooms = [
  { id: "r1", name: "Raum 001", building: "Krankenhaus Nord", floor: "EG" },
  { id: "r2", name: "Raum 002", building: "Krankenhaus Nord", floor: "EG" },
  { id: "r3", name: "Raum 003", building: "Krankenhaus Nord", floor: "EG" },
  { id: "r4", name: "Raum 101", building: "Krankenhaus Nord", floor: "1. OG" },
  { id: "r5", name: "Raum 102", building: "Krankenhaus Nord", floor: "1. OG" },
];

export default function SpecificationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [showPrint, setShowPrint] = useState(false);

  const spec = specifications[id];

  if (!spec) {
    return (
      <div className="text-center py-12 text-gray-500">
        <FileText className="mx-auto h-12 w-12 mb-4 text-gray-300" />
        <p className="text-lg font-medium">
          Leistungsverzeichnis nicht gefunden
        </p>
      </div>
    );
  }

  const typeConfig = cleaningTypeConfig[spec.cleaningType];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/specifications">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück
          </Button>
        </Link>
      </div>

      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{spec.name}</h1>
          <div className="flex items-center gap-3">
            <Badge className={cn("border", typeConfig.color)}>
              {typeConfig.label}
            </Badge>
            {spec.dinStandard && (
              <Badge variant="outline">{spec.dinStandard}</Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPrint(!showPrint)}>
            <Printer className="mr-2 h-4 w-4" />
            Druckansicht
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Neuer Eintrag
          </Button>
        </div>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Positionen ({items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 pr-4 font-medium">Komponente</th>
                  <th className="pb-3 pr-4 font-medium">Tätigkeit</th>
                  <th className="pb-3 pr-4 font-medium">Häufigkeit</th>
                  <th className="pb-3 pr-4 font-medium">Methode</th>
                  <th className="pb-3 font-medium">Produkt</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const freqConfig = frequencyConfig[item.frequency];
                  return (
                    <tr key={item.id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: item.colorCode }}
                          />
                          {item.componentName}
                        </div>
                      </td>
                      <td className="py-3 pr-4">{item.activity}</td>
                      <td className="py-3 pr-4">
                        <Badge className={cn("border", freqConfig.color)}>
                          {freqConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4">{item.method}</td>
                      <td className="py-3">{item.product}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Assigned Rooms */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <DoorOpen className="h-5 w-5" />
              Zugewiesene Räume ({assignedRooms.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {assignedRooms.map((room) => (
              <div
                key={room.id}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <DoorOpen className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{room.name}</p>
                  <p className="text-xs text-gray-500">
                    {room.building} - {room.floor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Print Preview */}
      {showPrint && (
        <Card>
          <CardHeader>
            <CardTitle>Druckvorschau (A4)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mx-auto max-w-[210mm] border bg-white p-8 shadow-lg">
              <div className="mb-6 border-b pb-4">
                <h2 className="text-xl font-bold">{spec.name}</h2>
                <div className="mt-1 flex gap-4 text-sm text-gray-600">
                  <span>{typeConfig.label}</span>
                  {spec.dinStandard && <span>{spec.dinStandard}</span>}
                </div>
              </div>

              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left">
                      Komponente
                    </th>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left">
                      Tätigkeit
                    </th>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left">
                      Häufigkeit
                    </th>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left">
                      Methode
                    </th>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left">
                      Produkt
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const freqConfig = frequencyConfig[item.frequency];
                    return (
                      <tr key={item.id}>
                        <td className="border border-gray-300 p-2">
                          <div className="flex items-center gap-1">
                            <div
                              className="h-2 w-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: item.colorCode }}
                            />
                            {item.componentName}
                          </div>
                        </td>
                        <td className="border border-gray-300 p-2">
                          {item.activity}
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span
                            className="inline-block rounded px-1.5 py-0.5 text-[10px] font-medium"
                            style={{
                              backgroundColor: `${item.colorCode}20`,
                              color: item.colorCode,
                            }}
                          >
                            {freqConfig.label}
                          </span>
                        </td>
                        <td className="border border-gray-300 p-2">
                          {item.method}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {item.product}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="mt-6 border-t pt-4">
                <h3 className="mb-2 text-sm font-semibold">Farbcode-Legende</h3>
                <div className="flex flex-wrap gap-4 text-xs">
                  {Object.entries(frequencyConfig).map(([key, config]) => {
                    const colorMap: Record<string, string> = {
                      DAILY: "#ef4444",
                      WEEKLY: "#3b82f6",
                      MONTHLY: "#22c55e",
                      QUARTERLY: "#eab308",
                      ANNUALLY: "#6b7280",
                    };
                    return (
                      <div key={key} className="flex items-center gap-1">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: colorMap[key] }}
                        />
                        <span>{config.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
