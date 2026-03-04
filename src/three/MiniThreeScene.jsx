import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MiniThreeScene() {
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
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.6, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0); // transparent
    mount.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(3, 3, 2);
    scene.add(key);

    // Geometry
    const geometry = new THREE.TorusKnotGeometry(0.55, 0.18, 140, 18);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.2,
      roughness: 0.25,
      emissive: new THREE.Color("#0f172a"),
      emissiveIntensity: 0.12,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Subtle background gradient plane
    const bgGeo = new THREE.PlaneGeometry(10, 10);
    const bgMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#020617"), // slate-950
      transparent: true,
      opacity: 0.9,
    });
    const bg = new THREE.Mesh(bgGeo, bgMat);
    bg.position.z = -3;
    scene.add(bg);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const animate = () => {
      // If reduced motion, render once without looping
      if (!prefersReduced) {
        mesh.rotation.x += 0.004;
        mesh.rotation.y += 0.006;
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
      bgGeo.dispose();
      bgMat.dispose();
      renderer.dispose();

      if (renderer.domElement?.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
}