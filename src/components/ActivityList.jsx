import React from "react";

export default function ActivityList({ items }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200">
        <div className="text-sm font-semibold">Recent activity</div>
        <div className="text-xs text-slate-500">Mock data for the dashboard.</div>
      </div>

      <div className="divide-y divide-slate-100">
        {items.map((a) => (
          <div key={a.id} className="px-5 py-4 flex items-start gap-3">
            <div className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center text-sm">
              {a.icon}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium">{a.title}</div>
              <div className="text-xs text-slate-500">{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}