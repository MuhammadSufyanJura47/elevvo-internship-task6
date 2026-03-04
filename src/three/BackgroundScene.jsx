import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BackgroundScene() {
  const mountRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Soft fog for depth
    scene.fog = new THREE.Fog(0x000000, 10, 60);

    // Particles
    const count = 900;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 60; // x
      positions[i3 + 1] = (Math.random() - 0.5) * 30; // y
      positions[i3 + 2] = (Math.random() - 0.5) * 60; // z
      speeds[i] = 0.15 + Math.random() * 0.35;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: new THREE.Color("#94a3b8"), // slate-400
      size: 0.12,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Gradient overlay plane (subtle color wash)
    const planeGeo = new THREE.PlaneGeometry(200, 200);
    const planeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#0b1220"),
      transparent: true,
      opacity: 0.25,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.z = -40;
    scene.add(plane);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    let t = 0;

    const animate = () => {
      t += 0.005;

      if (!prefersReduced) {
        const pos = geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;

          // drift forward (z), loop around
          pos[i3 + 2] += speeds[i] * 0.06;
          if (pos[i3 + 2] > 30) pos[i3 + 2] = -30;

          // tiny wave motion
          pos[i3 + 1] += Math.sin(t + i) * 0.0008;
        }

        geometry.attributes.position.needsUpdate = true;
        points.rotation.y += 0.0006;
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    onResize();
    animate();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      geometry.dispose();
      material.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      renderer.dispose();

      if (renderer.domElement?.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}