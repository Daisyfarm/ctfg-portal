"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStaff = pathname?.includes("/staff");

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">🌾</span>
            <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent">
              FarmPortal OS
            </h1>
          </div>

          <nav className="space-y-2">
            <Link
              href="/dashboard/player"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                !isStaff
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>🌱</span> Player Farm
            </Link>
            <Link
              href="/dashboard/staff"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isStaff
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>🛡️</span> Staff Control Panel
            </Link>
          </nav>
        </div>

        <div className="border-t border-slate-800 pt-4 text-xs text-slate-500">
          <p>Virtual Farming v1.0</p>
          <p className="text-emerald-400 mt-1">● Database Connected</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}