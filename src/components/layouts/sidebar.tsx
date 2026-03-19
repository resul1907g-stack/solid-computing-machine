"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  ClipboardCheck,
  FileText,
  Shield,
  GraduationCap,
  Route,
  BookOpen,
  BarChart3,
  Settings,
  Users,
  QrCode,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Gebäude & Räume", href: "/dashboard/buildings", icon: Building2 },
  {
    name: "Leistungsverzeichnisse",
    href: "/dashboard/specifications",
    icon: FileText,
  },
  {
    name: "Qualitätskontrollen",
    href: "/dashboard/quality-controls",
    icon: ClipboardCheck,
  },
  { name: "QR-Scanner", href: "/dashboard/scanner", icon: QrCode },
  { name: "Prozessaudit", href: "/dashboard/process-audit", icon: Shield },
  { name: "Audits & Befragungen", href: "/dashboard/audits", icon: Shield },
  { name: "Schulungen", href: "/dashboard/training", icon: GraduationCap },
  { name: "Laufzettel", href: "/dashboard/runsheets", icon: Route },
  { name: "Handbuch", href: "/dashboard/handbook", icon: BookOpen },
  { name: "Berichte", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Mitarbeiter", href: "/dashboard/staff", icon: Users },
  { name: "Einstellungen", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">CleanSuite</span>
          </div>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium",
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    )}
                  >
                    <item.icon
                      className={cn("h-5 w-5 shrink-0", isActive ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600")}
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
