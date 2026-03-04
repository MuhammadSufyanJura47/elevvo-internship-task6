import React, { useEffect, useMemo, useRef } from "react";
import StatCard from "../components/StatCard.jsx";
import ActivityList from "../components/ActivityList.jsx";
import { activities } from "../data/mockActivities.js";
import { overviewStats, monthlyEarnings } from "../data/mockStats.js";
import { Chart } from "chart.js/auto";
import MiniThreeScene from "../three/MiniThreeScene.jsx";

export default function Overview() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const chartData = useMemo(() => monthlyEarnings, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // destroy previous instance
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const ctx = canvasRef.current.getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartData.map((d) => d.month),
        datasets: [
          {
            label: "Earnings ($)",
            data: chartData.map((d) => d.earnings),
            backgroundColor: "rgba(15, 23, 42, 0.85)", // slate-900
            borderRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 600 },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#475569" }, // slate-600
          },
          y: {
            grid: { color: "rgba(148,163,184,0.25)" }, // slate-400-ish
            ticks: { color: "#475569" },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [chartData]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Overview</h1>
          <p className="text-sm text-slate-600">
            Summary of projects, tasks, and earnings.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50 transition">
            Export (mock)
          </button>
          <button className="rounded-xl bg-slate-900 text-white px-3 py-2 text-sm hover:bg-slate-800 transition">
            New Project (mock)
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Projects"
          value={overviewStats.totalProjects}
          hint="+2 this month"
        />
        <StatCard label="Earnings" value={`$${overviewStats.earnings}`} hint="Net (mock)" />
        <StatCard label="Tasks Due" value={overviewStats.tasksDue} hint="Next 7 days" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">Monthly earnings</div>
              <div className="text-xs text-slate-500">
                Bar chart powered by Chart.js
              </div>
            </div>
            <div className="text-xs text-slate-500">2026</div>
          </div>

          <div className="mt-4 h-64">
            <canvas ref={canvasRef} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">3D snapshot</div>
              <div className="text-xs text-slate-500">
                Subtle Three.js visual
              </div>
            </div>
            <span className="text-xs text-slate-500 animate-floaty">live</span>
          </div>

          <div className="mt-4 h-64 rounded-2xl bg-slate-950 overflow-hidden">
            <MiniThreeScene />
          </div>

          <div className="mt-3 text-xs text-slate-600">
            Lightweight scene with reduced-motion support.
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ActivityList items={activities} />

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold">Quick stats</div>
          <div className="mt-1 text-xs text-slate-500">
            Simple conditional rendering (mock).
          </div>

          <div className="mt-4 space-y-3">
            {overviewStats.tasksDue > 0 ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="text-sm font-medium text-amber-900">
                  You have tasks due soon
                </div>
                <div className="text-xs text-amber-800 mt-1">
                  Prioritize the projects with upcoming deadlines.
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="text-sm font-medium text-emerald-900">
                  All caught up
                </div>
                <div className="text-xs text-emerald-800 mt-1">
                  No tasks due in the next week.
                </div>
              </div>
            )}

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-medium">Next invoice</div>
              <div className="text-xs text-slate-600 mt-1">
                Scheduled for <span className="font-medium">Mar 01</span> (mock).
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}