"use client";

import { useState } from "react";
import { UserPlus, Search, MoreHorizontal, Users } from "lucide-react";
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

type Role = "OWNER" | "ADMIN" | "MANAGER" | "INSPECTOR" | "CLEANER";

const staff = [
  {
    id: "1",
    name: "Max Mustermann",
    email: "max@example.com",
    role: "OWNER" as Role,
    status: "Aktiv",
  },
  {
    id: "2",
    name: "Anna Schmidt",
    email: "anna@example.com",
    role: "ADMIN" as Role,
    status: "Aktiv",
  },
  {
    id: "3",
    name: "Peter Weber",
    email: "peter@example.com",
    role: "MANAGER" as Role,
    status: "Aktiv",
  },
  {
    id: "4",
    name: "Maria Müller",
    email: "maria@example.com",
    role: "INSPECTOR" as Role,
    status: "Aktiv",
  },
  {
    id: "5",
    name: "Hans Fischer",
    email: "hans@example.com",
    role: "CLEANER" as Role,
    status: "Eingeladen",
  },
];

const roleConfig: Record<Role, { label: string; className: string }> = {
  OWNER: {
    label: "Eigentümer",
    className: "bg-purple-100 text-purple-800 border-transparent",
  },
  ADMIN: {
    label: "Administrator",
    className: "bg-blue-100 text-blue-800 border-transparent",
  },
  MANAGER: {
    label: "Manager",
    className: "bg-emerald-100 text-emerald-800 border-transparent",
  },
  INSPECTOR: {
    label: "Inspektor",
    className: "bg-amber-100 text-amber-800 border-transparent",
  },
  CLEANER: {
    label: "Reinigungskraft",
    className: "bg-gray-100 text-gray-800 border-transparent",
  },
};

export default function StaffPage() {
  const [search, setSearch] = useState("");

  const filtered = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Mitarbeiter</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Mitarbeiter einladen
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Mitarbeiter suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50/50">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    E-Mail
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Rolle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((member) => (
                  <tr
                    key={member.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium text-white",
                            member.role === "OWNER"
                              ? "bg-purple-500"
                              : member.role === "ADMIN"
                              ? "bg-blue-500"
                              : member.role === "MANAGER"
                              ? "bg-emerald-500"
                              : member.role === "INSPECTOR"
                              ? "bg-amber-500"
                              : "bg-gray-500"
                          )}
                        >
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-sm font-medium">
                          {member.name}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {member.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge
                        className={cn(roleConfig[member.role].className)}
                      >
                        {roleConfig[member.role].label}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge
                        variant={
                          member.status === "Aktiv" ? "success" : "warning"
                        }
                      >
                        {member.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Users className="mx-auto h-12 w-12 mb-4 text-gray-300" />
              <p className="text-lg font-medium">
                Keine Mitarbeiter gefunden
              </p>
              <p className="text-sm">
                Versuchen Sie einen anderen Suchbegriff.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
