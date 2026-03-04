import React from "react";

export default function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-white/50 bg-white/70 backdrop-blur p-5 shadow-sm transition hover:shadow-soft hover:-translate-y-0.5 motion-reduce:transform-none">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
    </div>
  );
}