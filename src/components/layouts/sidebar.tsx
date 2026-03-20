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
  X,
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

export function Sidebar({ mobileOpen, onClose }: { mobileOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-4 pb-4">
      <div className="flex h-16 shrink-0 items-center justify-between px-2">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">CS</span>
          </div>
          <span className="text-xl font-bold text-gray-900">CleanSuite</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 rounded-md hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-0.5">
          {navigation.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group flex gap-x-3 rounded-lg px-3 py-2.5 text-sm leading-6 font-medium transition-all duration-150",
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 shrink-0 transition-colors",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"
                    )}
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col border-r border-gray-200">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col lg:hidden shadow-xl">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
