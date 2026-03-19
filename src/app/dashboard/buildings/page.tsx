"use client";

import { useState } from "react";
import Link from "next/link";
import { Building, Plus, Search, Layers, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const buildings = [
  {
    id: "1",
    name: "Krankenhaus Nord",
    address: "Musterstraße 1, 10115 Berlin",
    floors: 5,
    rooms: 120,
  },
  {
    id: "2",
    name: "Bürogebäude Mitte",
    address: "Hauptstraße 42, 10115 Berlin",
    floors: 3,
    rooms: 45,
  },
  {
    id: "3",
    name: "Pflegeheim Süd",
    address: "Gartenweg 7, 10115 Berlin",
    floors: 4,
    rooms: 80,
  },
];

export default function BuildingsPage() {
  const [search, setSearch] = useState("");

  const filtered = buildings.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Gebäude & Räume
        </h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neues Gebäude
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Gebäude suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((building) => (
          <Link
            key={building.id}
            href={`/dashboard/buildings/${building.id}`}
            className="block"
          >
            <Card
              className={cn(
                "transition-shadow hover:shadow-md cursor-pointer h-full"
              )}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{building.name}</CardTitle>
                    <CardDescription>{building.address}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Layers className="h-4 w-4" />
                    <span>
                      {building.floors}{" "}
                      {building.floors === 1 ? "Etage" : "Etagen"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DoorOpen className="h-4 w-4" />
                    <span>
                      {building.rooms}{" "}
                      {building.rooms === 1 ? "Raum" : "Räume"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Building className="mx-auto h-12 w-12 mb-4 text-gray-300" />
          <p className="text-lg font-medium">Keine Gebäude gefunden</p>
          <p className="text-sm">
            Versuchen Sie einen anderen Suchbegriff.
          </p>
        </div>
      )}
    </div>
  );
}
