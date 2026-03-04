import React from "react";

const styles = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Completed: "bg-slate-100 text-slate-700 border-slate-200",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        styles[status] || "bg-slate-50 text-slate-700 border-slate-200",
      ].join(" ")}
    >
      {status}
    </span>
  );
}