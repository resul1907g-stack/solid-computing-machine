"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  QrCode,
  DoorOpen,
  Layers,
  MapPin,
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

const building = {
  id: "1",
  name: "Krankenhaus Nord",
  address: "Musterstraße 1",
  floors: [
    {
      id: "f1",
      name: "Erdgeschoss",
      rooms: [
        {
          id: "r1",
          name: "Raum 001",
          type: "Patientenzimmer",
          area: 25,
          code: "KH-N-EG-001",
        },
        {
          id: "r2",
          name: "Raum 002",
          type: "Flur",
          area: 40,
          code: "KH-N-EG-002",
        },
        {
          id: "r3",
          name: "Raum 003",
          type: "Sanitär",
          area: 12,
          code: "KH-N-EG-003",
        },
      ],
    },
    {
      id: "f2",
      name: "1. Obergeschoss",
      rooms: [
        {
          id: "r4",
          name: "Raum 101",
          type: "OP-Saal",
          area: 50,
          code: "KH-N-1OG-101",
        },
        {
          id: "r5",
          name: "Raum 102",
          type: "Patientenzimmer",
          area: 25,
          code: "KH-N-1OG-102",
        },
      ],
    },
  ],
};

const roomTypeBadgeVariant: Record<string, "default" | "secondary" | "success" | "warning" | "outline"> = {
  Patientenzimmer: "default",
  Flur: "secondary",
  "Sanitär": "outline",
  "OP-Saal": "warning",
};

export default function BuildingDetailPage() {
  const [activeFloor, setActiveFloor] = useState(building.floors[0].id);

  const currentFloor = building.floors.find((f) => f.id === activeFloor);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/buildings"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Übersicht
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {building.name}
            </h1>
            <div className="flex items-center gap-1.5 mt-1 text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>{building.address}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Neue Etage
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Neuer Raum
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-b">
        {building.floors.map((floor) => (
          <button
            key={floor.id}
            onClick={() => setActiveFloor(floor.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px",
              activeFloor === floor.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            <Layers className="h-4 w-4" />
            {floor.name}
            <span
              className={cn(
                "ml-1 rounded-full px-2 py-0.5 text-xs",
                activeFloor === floor.id
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
              )}
            >
              {floor.rooms.length}
            </span>
          </button>
        ))}
      </div>

      {currentFloor && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentFloor.rooms.map((room) => (
            <Card key={room.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                      <DoorOpen className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{room.name}</CardTitle>
                      <CardDescription>{room.area} m²</CardDescription>
                    </div>
                  </div>
                  <QrCode className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge
                    variant={roomTypeBadgeVariant[room.type] ?? "secondary"}
                  >
                    {room.type}
                  </Badge>
                  <span className="text-xs text-gray-400 font-mono">
                    {room.code}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
