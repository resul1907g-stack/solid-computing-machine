"use client";

import { useState } from "react";
import { QrCode, Search, Camera, Clock } from "lucide-react";
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

const recentScans = [
  {
    id: "1",
    code: "KH-N-EG-001",
    room: "Raum 001",
    building: "Krankenhaus Nord",
    scannedAt: "Heute, 14:32",
  },
  {
    id: "2",
    code: "KH-N-1OG-101",
    room: "Raum 101",
    building: "Krankenhaus Nord",
    scannedAt: "Heute, 11:15",
  },
  {
    id: "3",
    code: "BG-M-2OG-205",
    room: "Raum 205",
    building: "Bürogebäude Mitte",
    scannedAt: "Gestern, 16:48",
  },
];

export default function ScannerPage() {
  const [manualCode, setManualCode] = useState("");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">QR-Code Scanner</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Kamera-Scanner</CardTitle>
            <CardDescription>
              Scannen Sie den QR-Code eines Raumes, um eine Inspektion zu
              starten
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12"
              )}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-4">
                <QrCode className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 text-center mb-4">
                Kamera-Zugriff wird benötigt, um QR-Codes zu scannen
              </p>
              <Button variant="outline">
                <Camera className="mr-2 h-4 w-4" />
                Kamera aktivieren
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Manuelle Eingabe</CardTitle>
            <CardDescription>
              Geben Sie den Raumcode manuell ein, falls der QR-Code nicht
              gescannt werden kann
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="z.B. KH-N-EG-001"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
              />
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Suchen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Letzte Scans</CardTitle>
          <CardDescription>
            Zuletzt gescannte Räume und Inspektionen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentScans.map((scan) => (
              <div
                key={scan.id}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                    <QrCode className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {scan.room} &mdash; {scan.building}
                    </p>
                    <p className="text-xs text-gray-500 font-mono">
                      {scan.code}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock className="h-3.5 w-3.5" />
                  {scan.scannedAt}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
