"use client";

import { useEffect, useRef, useState } from "react";
import {
  geoOrthographic,
  geoPath,
  geoGraticule,
  geoBounds,
  geoDistance,
} from "d3-geo";
import { timer } from "d3-timer";
import { cn } from "@/lib/utils";
import landData from "@/data/land.json";

interface WireframeGlobeProps {
  width?: number;
  height?: number;
  className?: string;
}

const locations: { name: string; coords: [number, number]; isHQ?: boolean }[] =
  [
    { name: "Amsterdam", coords: [4.9, 52.37], isHQ: true },
    { name: "Berlin", coords: [13.41, 52.52] },
    { name: "London", coords: [-0.13, 51.51] },
    { name: "Paris", coords: [2.35, 48.86] },
    { name: "Madrid", coords: [-3.7, 40.42] },
    { name: "Rome", coords: [12.5, 41.9] },
    { name: "Stockholm", coords: [18.07, 59.33] },
    { name: "Brussels", coords: [4.35, 50.85] },
  ];

// Pre-compute dots at module level so it only runs once
function computeDots() {
  const dots: { lng: number; lat: number }[] = [];

  const pointInPolygon = (
    point: [number, number],
    polygon: number[][]
  ): boolean => {
    const [x, y] = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
        inside = !inside;
      }
    }
    return inside;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pointInFeature = (point: [number, number], feature: any): boolean => {
    const geometry = feature.geometry;
    if (geometry.type === "Polygon") {
      if (!pointInPolygon(point, geometry.coordinates[0])) return false;
      for (let i = 1; i < geometry.coordinates.length; i++) {
        if (pointInPolygon(point, geometry.coordinates[i])) return false;
      }
      return true;
    } else if (geometry.type === "MultiPolygon") {
      for (const polygon of geometry.coordinates) {
        if (pointInPolygon(point, polygon[0])) {
          let inHole = false;
          for (let i = 1; i < polygon.length; i++) {
            if (pointInPolygon(point, polygon[i])) {
              inHole = true;
              break;
            }
          }
          if (!inHole) return true;
        }
      }
    }
    return false;
  };

  const stepSize = 1.6; // degrees — lower = more dots
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (landData as any).features.forEach((feature: any) => {
    const bounds = geoBounds(feature);
    const [[minLng, minLat], [maxLng, maxLat]] = bounds;
    for (let lng = minLng; lng <= maxLng; lng += stepSize) {
      for (let lat = minLat; lat <= maxLat; lat += stepSize) {
        if (pointInFeature([lng, lat], feature)) {
          dots.push({ lng, lat });
        }
      }
    }
  });

  return dots;
}

let cachedDots: { lng: number; lat: number }[] | null = null;

const BLUE = "#3b82f6";
const BLUE_LIGHT = "rgba(59, 130, 246, 0.12)";
const BLUE_MID = "rgba(59, 130, 246, 0.3)";
const BLUE_DOT = "rgba(59, 130, 246, 0.45)";

export default function WireframeGlobe({
  width = 500,
  height = 500,
  className = "",
}: WireframeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const cw = Math.min(width, window.innerWidth - 40);
    const ch = Math.min(height, window.innerHeight - 100);
    const radius = Math.min(cw, ch) / 2.5;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    canvas.style.width = `${cw}px`;
    canvas.style.height = `${ch}px`;
    context.scale(dpr, dpr);

    const projection = geoOrthographic()
      .scale(radius)
      .translate([cw / 2, ch / 2])
      .clipAngle(90);

    const pathGen = geoPath().projection(projection).context(context);
    const graticule = geoGraticule();

    // Compute dots once
    if (!cachedDots) {
      cachedDots = computeDots();
    }
    const allDots = cachedDots;
    setReady(true);

    const render = () => {
      context.clearRect(0, 0, cw, ch);

      const scale = projection.scale();
      const sf = scale / radius;

      // Globe bg
      context.beginPath();
      context.arc(cw / 2, ch / 2, scale, 0, 2 * Math.PI);
      context.fillStyle = "#ffffff";
      context.fill();
      context.strokeStyle = BLUE_LIGHT;
      context.lineWidth = 1.5 * sf;
      context.stroke();

      // Graticule
      context.beginPath();
      pathGen(graticule());
      context.strokeStyle = BLUE_LIGHT;
      context.lineWidth = 0.5 * sf;
      context.stroke();

      // Land outlines
      context.beginPath();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (landData as any).features.forEach((f: any) => {
        pathGen(f);
      });
      context.strokeStyle = BLUE_MID;
      context.lineWidth = 1 * sf;
      context.stroke();

      // Dots
      allDots.forEach((dot) => {
        const p = projection([dot.lng, dot.lat]);
        if (p && p[0] >= 0 && p[0] <= cw && p[1] >= 0 && p[1] <= ch) {
          context.beginPath();
          context.arc(p[0], p[1], 1 * sf, 0, 2 * Math.PI);
          context.fillStyle = BLUE_DOT;
          context.fill();
        }
      });

      // Location markers
      const rot = projection.rotate();
      locations.forEach((loc) => {
        const dist = geoDistance(loc.coords, [-rot[0], -rot[1]]);
        if (dist > Math.PI / 2) return;

        const p = projection(loc.coords);
        if (!p) return;
        const [x, y] = p;

        if (loc.isHQ) {
          context.beginPath();
          context.arc(x, y, 8 * sf, 0, 2 * Math.PI);
          context.fillStyle = "rgba(59, 130, 246, 0.2)";
          context.fill();

          context.beginPath();
          context.arc(x, y, 4 * sf, 0, 2 * Math.PI);
          context.fillStyle = BLUE;
          context.fill();

          context.font = `bold ${11 * sf}px system-ui, sans-serif`;
          context.fillStyle = BLUE;
          context.fillText("HQ", x + 10 * sf, y + 4 * sf);
        } else {
          context.beginPath();
          context.arc(x, y, 3 * sf, 0, 2 * Math.PI);
          context.fillStyle = BLUE;
          context.fill();
        }
      });
    };

    // Rotation
    const rotation: [number, number] = [0, 0];
    let autoRotate = true;

    const t = timer(() => {
      if (autoRotate) {
        rotation[0] += 0.3;
        projection.rotate(rotation);
        render();
      }
    });

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRot: [number, number] = [...rotation];

      const onMove = (e: MouseEvent) => {
        rotation[0] = startRot[0] + (e.clientX - startX) * 0.5;
        rotation[1] = Math.max(
          -90,
          Math.min(90, startRot[1] - (e.clientY - startY) * 0.5)
        );
        projection.rotate(rotation);
        render();
      };

      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        setTimeout(() => {
          autoRotate = true;
        }, 10);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const factor = event.deltaY > 0 ? 0.95 : 1.05;
      projection.scale(
        Math.max(radius * 0.5, Math.min(radius * 3, projection.scale() * factor))
      );
      render();
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    render();

    return () => {
      t.stop();
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [width, height]);

  return (
    <div className={cn("relative", className)}>
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-ainomiq-blue border-t-transparent" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
        style={{ maxWidth: "100%", height: "auto", cursor: "grab" }}
      />
    </div>
  );
}
