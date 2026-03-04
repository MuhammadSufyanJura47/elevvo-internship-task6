import React, { useEffect, useRef } from "react";

function typeDot(type) {
  switch (type) {
    case "payment":
      return "bg-emerald-500";
    case "task":
      return "bg-amber-500";
    case "project":
      return "bg-sky-500";
    default:
      return "bg-slate-400";
  }
}

export default function NotificationDropdown({ open, onClose, items }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    const onMouseDown = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      className={[
        "absolute right-0 mt-2 w-80 origin-top-right",
        "transition-all duration-200 ease-out",
        open
          ? "scale-100 opacity-100 translate-y-0"
          : "pointer-events-none scale-95 opacity-0 -translate-y-1",
      ].join(" ")}
    >
      <div className="rounded-2xl border border-slate-200 bg-white shadow-soft overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="text-sm font-semibold">Recent activity</div>
          <button
            className="text-xs text-slate-500 hover:text-slate-900 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="p-2">
          {items?.map((a) => (
            <div
              key={a.id}
              className="flex gap-3 rounded-xl p-3 hover:bg-slate-50 transition"
            >
              <span
                className={[
                  "mt-1 h-2.5 w-2.5 rounded-full",
                  typeDot(a.type),
                ].join(" ")}
              />
              <div className="min-w-0">
                <div className="text-sm font-medium text-slate-900 truncate">
                  {a.title}
                </div>
                <div className="text-xs text-slate-500">{a.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-slate-200 text-xs text-slate-500">
          Showing the 3 most recent activities (mock).
        </div>
      </div>
    </div>
  );
}