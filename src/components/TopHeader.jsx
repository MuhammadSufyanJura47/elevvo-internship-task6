import React, { useMemo, useState } from "react";
import NotificationDropdown from "./NotificationDropdown.jsx";
import { activities } from "../data/mockActivities.js";

export default function TopHeader({ onOpenSidebar }) {
  const [open, setOpen] = useState(false);

  const top3 = useMemo(() => activities.slice(0, 3), []);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden rounded-xl p-2 hover:bg-slate-100 transition"
            onClick={onOpenSidebar}
            aria-label="Open sidebar"
          >
            ☰
          </button>

          <div className="hidden sm:block">
            <div className="text-sm font-semibold">Welcome back</div>
            <div className="text-xs text-slate-500">
              Here’s what’s happening today.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <input
              className="w-72 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              placeholder="Search (mock)…"
            />
          </div>

          <div className="relative">
            <button
              className="rounded-xl p-2 hover:bg-slate-100 transition relative"
              onClick={() => setOpen((v) => !v)}
              aria-label="Notifications"
              aria-expanded={open}
            >
              🔔
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            <NotificationDropdown
              open={open}
              onClose={() => setOpen(false)}
              items={top3}
            />
          </div>

          <div className="flex items-center gap-2 pl-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-900 to-slate-600 text-white grid place-items-center text-sm font-semibold">
              MC
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-semibold">Mr-CKBJX-SPACE</div>
              <div className="text-xs text-slate-500">Freelancer</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}