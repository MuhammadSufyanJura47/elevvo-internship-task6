import React, { useMemo, useState } from "react";
import StatusBadge from "../components/StatusBadge.jsx";
import { projects } from "../data/mockProjects.js";

const filters = ["All", "Active", "Pending", "Completed"];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.status === filter);
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-slate-600">
            Track your client work, statuses, and deadlines.
          </p>
        </div>

        <button className="rounded-xl bg-slate-900 text-white px-3 py-2 text-sm hover:bg-slate-800 transition">
          Add Project (mock)
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={[
              "rounded-full px-3 py-1.5 text-sm border transition",
              filter === f
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
            ].join(" ")}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold text-slate-600">
                Project
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-600">
                Status
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-600">
                Deadline
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-600 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition">
                <td className="px-5 py-4">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-slate-500">{p.client}</div>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={p.status} />
                </td>
                <td className="px-5 py-4 text-sm text-slate-700">
                  {p.deadline}
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm hover:bg-white hover:shadow-sm transition">
                    View (mock)
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 ? (
          <div className="p-6 text-sm text-slate-600">No projects found.</div>
        ) : null}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-soft"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-slate-500">{p.client}</div>
              </div>
              <StatusBadge status={p.status} />
            </div>

            <div className="mt-3 text-sm">
              <span className="text-slate-500">Deadline:</span>{" "}
              <span className="text-slate-800 font-medium">{p.deadline}</span>
            </div>

            <button className="mt-3 w-full rounded-xl bg-slate-900 text-white px-3 py-2 text-sm hover:bg-slate-800 transition">
              View (mock)
            </button>
          </div>
        ))}

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            No projects found.
          </div>
        ) : null}
      </div>
    </div>
  );
}