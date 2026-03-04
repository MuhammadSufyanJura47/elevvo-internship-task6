import React from "react";
import { NavLink } from "react-router-dom";

const nav = [
  { to: "/overview", label: "Overview" },
  { to: "/projects", label: "Projects" },
];

function LinkItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
          isActive
            ? "bg-slate-900 text-white shadow"
            : "text-slate-700 hover:bg-slate-100",
        ].join(" ")
      }
    >
      <span className="h-2 w-2 rounded-full bg-current opacity-70" />
      {label}
    </NavLink>
  );
}

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={[
          "fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200",
          "transform transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center font-bold">
              FD
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Freelance Admin</div>
              <div className="text-xs text-slate-500">Client Dashboard</div>
            </div>
          </div>

          <button
            className="lg:hidden rounded-lg p-2 hover:bg-slate-100 transition"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {nav.map((item) => (
            <LinkItem key={item.to} {...item} />
          ))}
        </nav>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-slate-200 p-4 bg-gradient-to-br from-slate-50 to-white shadow-sm">
            <div className="text-sm font-semibold">Tip</div>
            <div className="mt-1 text-xs text-slate-600">
              Use the Projects page to track deadlines and statuses at a glance.
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}