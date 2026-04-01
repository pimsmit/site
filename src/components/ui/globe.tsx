"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
}

const markers: { location: [number, number]; size: number }[] = [
  { location: [52.37, 4.9], size: 0.08 },   // Amsterdam (HQ)
  { location: [52.52, 13.41], size: 0.05 },  // Berlin
  { location: [51.51, -0.13], size: 0.05 },  // London
  { location: [48.86, 2.35], size: 0.04 },   // Paris
  { location: [40.42, -3.7], size: 0.04 },   // Madrid
  { location: [41.9, 12.5], size: 0.04 },    // Rome
  { location: [59.33, 18.07], size: 0.04 },  // Stockholm
  { location: [50.85, 4.35], size: 0.05 },   // Brussels
];

export function Globe({ className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      pointerInteracting.current =
        e.clientX - pointerInteractionMovement.current;
      if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    },
    []
  );

  const onPointerUp = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  const onPointerOut = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  const onMouseMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (pointerInteracting.current !== null) {
        const delta = e.clientX - pointerInteracting.current;
        pointerInteractionMovement.current = delta;
      }
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.23, 0.51, 0.96],
      glowColor: [1, 1, 1],
      markers,
      onRender: (state: Record<string, number>) => {
        if (pointerInteracting.current === null) {
          phi += 0.005;
        }
        state.phi = phi + pointerInteractionMovement.current / 200;
      },
    } as Parameters<typeof createGlobe>[1]);

    setTimeout(() => {
      if (canvas) canvas.style.opacity = "1";
    }, 100);

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerOut}
      onPointerMove={onMouseMove}
      className={cn(
        "opacity-0 transition-opacity duration-500",
        className
      )}
      style={{
        width: 400,
        height: 400,
        maxWidth: "100%",
        cursor: "grab",
        aspectRatio: "1",
        touchAction: "none",
      }}
    />
  );
}
