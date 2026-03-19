"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  CheckCircle,
  Wrench,
  Square,
  Monitor,
  Bath,
  Trash2,
  DoorOpen,
  MessageSquare,
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
import { QualityIndicator } from "@/components/ui/quality-indicator";
import { cn } from "@/lib/utils";
import { calculateQualityResult } from "@/lib/utils";

type Rating = "GREEN" | "YELLOW" | "RED" | null;

interface ComponentEvaluation {
  id: string;
  name: string;
  icon: string;
  rating: Rating;
  comment: string;
  hasPhoto: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  square: <Square className="h-5 w-5" />,
  monitor: <Monitor className="h-5 w-5" />,
  bath: <Bath className="h-5 w-5" />,
  trash: <Trash2 className="h-5 w-5" />,
  "door-open": <DoorOpen className="h-5 w-5" />,
  window: <Square className="h-5 w-5" />,
};

const initialComponents: ComponentEvaluation[] = [
  { id: "1", name: "Boden", icon: "square", rating: null, comment: "", hasPhoto: false },
  { id: "2", name: "Oberflächen", icon: "monitor", rating: null, comment: "", hasPhoto: false },
  { id: "3", name: "Sanitärobjekte", icon: "bath", rating: null, comment: "", hasPhoto: false },
  { id: "4", name: "Abfalleimer", icon: "trash", rating: null, comment: "", hasPhoto: false },
  { id: "5", name: "Türen & Zargen", icon: "door-open", rating: null, comment: "", hasPhoto: false },
  { id: "6", name: "Fenster", icon: "window", rating: null, comment: "", hasPhoto: false },
];

const scoreMap: Record<string, number> = {
  GREEN: 100,
  YELLOW: 75,
  RED: 25,
};

export default function InspectionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";

  const [components, setComponents] = useState<ComponentEvaluation[]>(initialComponents);
  const [showCommentFor, setShowCommentFor] = useState<string | null>(null);
  const [showRepairFor, setShowRepairFor] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const ratedComponents = components.filter((c) => c.rating !== null);
  const overallScore =
    ratedComponents.length > 0
      ? Math.round(
          ratedComponents.reduce(
            (sum, c) => sum + (c.rating ? scoreMap[c.rating] : 0),
            0
          ) / ratedComponents.length
        )
      : 0;
  const overallResult =
    ratedComponents.length > 0 ? calculateQualityResult(overallScore) : null;

  const handleRating = (componentId: string, rating: Rating) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === componentId ? { ...c, rating } : c))
    );
  };

  const handleComment = (componentId: string, comment: string) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === componentId ? { ...c, comment } : c))
    );
  };

  const handlePhoto = (componentId: string) => {
    setComponents((prev) =>
      prev.map((c) =>
        c.id === componentId ? { ...c, hasPhoto: true } : c
      )
    );
  };

  const allRated = components.every((c) => c.rating !== null);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/quality-controls">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück
          </Button>
        </Link>
      </div>

      {/* Room Info Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100 text-gray-400 flex-shrink-0">
              <Square className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                {isNew ? "Neue Inspektion" : "Raum 001"}
              </h1>
              <p className="text-gray-500">Krankenhaus Nord</p>
              <Badge variant="secondary" className="mt-1">
                Patientenzimmer
              </Badge>
            </div>
            {overallResult && (
              <QualityIndicator
                result={overallResult}
                score={overallScore}
                size="lg"
                showScore
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Component Evaluations */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Bewertung der Komponenten</h2>

        {components.map((component) => (
          <Card key={component.id}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  {iconMap[component.icon]}
                </div>
                <span className="text-base font-medium flex-1">
                  {component.name}
                </span>
                {component.hasPhoto && (
                  <Badge variant="secondary" className="text-xs">
                    Foto
                  </Badge>
                )}
              </div>

              {/* Rating Buttons - Large Touch Targets */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleRating(component.id, "GREEN")}
                  className={cn(
                    "flex h-16 items-center justify-center rounded-xl border-2 text-lg font-bold transition-all active:scale-95",
                    component.rating === "GREEN"
                      ? "border-emerald-500 bg-emerald-500 text-white shadow-lg"
                      : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-400"
                  )}
                >
                  Grün
                </button>
                <button
                  onClick={() => handleRating(component.id, "YELLOW")}
                  className={cn(
                    "flex h-16 items-center justify-center rounded-xl border-2 text-lg font-bold transition-all active:scale-95",
                    component.rating === "YELLOW"
                      ? "border-amber-400 bg-amber-400 text-white shadow-lg"
                      : "border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-400"
                  )}
                >
                  Gelb
                </button>
                <button
                  onClick={() => handleRating(component.id, "RED")}
                  className={cn(
                    "flex h-16 items-center justify-center rounded-xl border-2 text-lg font-bold transition-all active:scale-95",
                    component.rating === "RED"
                      ? "border-red-500 bg-red-500 text-white shadow-lg"
                      : "border-red-200 bg-red-50 text-red-700 hover:border-red-400"
                  )}
                >
                  Rot
                </button>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePhoto(component.id)}
                  className="flex-1"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Foto
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setShowCommentFor(
                      showCommentFor === component.id ? null : component.id
                    )
                  }
                  className="flex-1"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Kommentar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setShowRepairFor(
                      showRepairFor === component.id ? null : component.id
                    )
                  }
                  className="flex-1"
                >
                  <Wrench className="mr-2 h-4 w-4" />
                  Reparaturmeldung
                </Button>
              </div>

              {/* Comment Field */}
              {showCommentFor === component.id && (
                <div className="mt-3">
                  <Input
                    placeholder="Kommentar eingeben..."
                    value={component.comment}
                    onChange={(e) =>
                      handleComment(component.id, e.target.value)
                    }
                  />
                </div>
              )}

              {/* Repair Report */}
              {showRepairFor === component.id && (
                <div className="mt-3 rounded-lg border border-orange-200 bg-orange-50 p-3">
                  <p className="text-sm font-medium text-orange-800 mb-2">
                    Reparaturmeldung erstellen
                  </p>
                  <Input
                    placeholder="Beschreibung des Mangels..."
                    className="mb-2"
                  />
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    <Wrench className="mr-2 h-3 w-3" />
                    Meldung senden
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overall Result */}
      {ratedComponents.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Gesamtergebnis</h3>
                <p className="text-sm text-gray-500">
                  {ratedComponents.length} von {components.length} Komponenten
                  bewertet
                </p>
              </div>
              {overallResult && (
                <QualityIndicator
                  result={overallResult}
                  score={overallScore}
                  size="lg"
                  showScore
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Complete Button */}
      <div className="pb-8">
        {completed ? (
          <div className="flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">
              Inspektion erfolgreich abgeschlossen
            </span>
          </div>
        ) : (
          <Button
            className="w-full h-14 text-lg"
            disabled={!allRated}
            onClick={() => setCompleted(true)}
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Inspektion abschließen
          </Button>
        )}
        {!allRated && !completed && (
          <p className="mt-2 text-center text-sm text-gray-500">
            Bitte bewerten Sie alle Komponenten, um die Inspektion
            abzuschließen.
          </p>
        )}
      </div>
    </div>
  );
}
