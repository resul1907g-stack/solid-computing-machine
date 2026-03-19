"use client";

import { useState } from "react";
import {
  Building2,
  Bell,
  CreditCard,
  Save,
  Upload,
  Gauge,
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

export default function SettingsPage() {
  const [orgName, setOrgName] = useState("CleanSuite GmbH");
  const [orgSlug, setOrgSlug] = useState("cleansuite-gmbh");
  const [level1, setLevel1] = useState(85);
  const [level2, setLevel2] = useState(75);
  const [emailInspection, setEmailInspection] = useState(true);
  const [emailQuality, setEmailQuality] = useState(true);
  const [emailWeekly, setEmailWeekly] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Einstellungen</h1>

      <div className="space-y-6 max-w-3xl">
        {/* Organisation */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gray-500" />
              <CardTitle className="text-lg">Organisation</CardTitle>
            </div>
            <CardDescription>
              Verwalten Sie die Grundeinstellungen Ihrer Organisation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Organisationsname</label>
              <Input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">URL-Kennung (Slug)</label>
              <Input
                value={orgSlug}
                onChange={(e) => setOrgSlug(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Logo</label>
              <div
                className={cn(
                  "flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8"
                )}
              >
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Klicken Sie hier oder ziehen Sie ein Bild hierher
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG bis zu 2 MB
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Qualitätsschwellen */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-gray-500" />
              <CardTitle className="text-lg">Qualitätsschwellen</CardTitle>
            </div>
            <CardDescription>
              Definieren Sie die Schwellenwerte für die Qualitätsbewertung
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Qualitätsstufe 1 (Grün)
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={level1}
                  onChange={(e) => setLevel1(Number(e.target.value))}
                  className="max-w-[120px]"
                />
                <span className="text-sm text-gray-500">%</span>
                <span className="text-xs text-gray-400">
                  Ab diesem Wert gilt die Reinigung als sehr gut
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Qualitätsstufe 2 (Gelb)
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={level2}
                  onChange={(e) => setLevel2(Number(e.target.value))}
                  className="max-w-[120px]"
                />
                <span className="text-sm text-gray-500">%</span>
                <span className="text-xs text-gray-400">
                  Ab diesem Wert gilt die Reinigung als akzeptabel
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Werte unterhalb der Qualitätsstufe 2 werden als mangelhaft (Rot)
              bewertet.
            </p>
          </CardContent>
        </Card>

        {/* Benachrichtigungen */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-gray-500" />
              <CardTitle className="text-lg">Benachrichtigungen</CardTitle>
            </div>
            <CardDescription>
              Konfigurieren Sie Ihre E-Mail-Benachrichtigungen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium">
                  Inspektionsergebnisse
                </p>
                <p className="text-xs text-gray-500">
                  Benachrichtigung bei neuen Inspektionsergebnissen
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailInspection}
                onChange={(e) => setEmailInspection(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium">Qualitätsalarme</p>
                <p className="text-xs text-gray-500">
                  Benachrichtigung bei mangelhaften Ergebnissen (Rot)
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailQuality}
                onChange={(e) => setEmailQuality(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium">Wochenbericht</p>
                <p className="text-xs text-gray-500">
                  Wöchentliche Zusammenfassung per E-Mail
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailWeekly}
                onChange={(e) => setEmailWeekly(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </CardContent>
        </Card>

        {/* Abonnement */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <CardTitle className="text-lg">Abonnement</CardTitle>
            </div>
            <CardDescription>
              Verwalten Sie Ihr aktuelles Abonnement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">Aktueller Plan</p>
                  <Badge variant="success">Professional</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Bis zu 10 Gebäude, 500 Räume, unbegrenzte Inspektionen
                </p>
              </div>
              <Button variant="outline">Upgrade</Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg">
            <Save className="mr-2 h-4 w-4" />
            Speichern
          </Button>
        </div>
      </div>
    </div>
  );
}
