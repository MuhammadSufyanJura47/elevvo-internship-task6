import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import TopHeader from "../components/TopHeader.jsx";
import BackgroundScene from "../three/BackgroundScene.jsx";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const pageKey = useMemo(() => location.pathname, [location.pathname]);

  return (
    <div className="min-h-screen relative">
      {/* Three.js background */}
      <BackgroundScene />

      {/* Soft gradient overlay on top of the 3D scene */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% 10%, rgba(56,189,248,.12), transparent 60%), radial-gradient(1000px 500px at 90% 20%, rgba(167,139,250,.12), transparent 55%), radial-gradient(900px 500px at 40% 90%, rgba(34,197,94,.08), transparent 55%)",
        }}
      />

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-72">
        <TopHeader onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="px-4 sm:px-6 lg:px-8 py-6">
          {/* “Glass” content shell */}
          <div className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-soft p-4 sm:p-6">
            <div
              key={pageKey}
              className={[
                "transition-all duration-300 ease-out",
                reducedMotion ? "" : "animate-[fadeIn_.25s_ease-out]",
              ].join(" ")}
              style={{
                animationName: reducedMotion ? undefined : "fadeIn",
              }}
            >
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}