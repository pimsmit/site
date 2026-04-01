"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { cn } from "@/lib/utils";

interface WireframeGlobeProps {
  width?: number;
  height?: number;
  className?: string;
}

// HQ + client locations
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

export default function WireframeGlobe({
  width = 600,
  height = 600,
  className = "",
}: WireframeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const containerWidth = Math.min(width, window.innerWidth - 40);
    const containerHeight = Math.min(height, window.innerHeight - 100);
    const radius = Math.min(containerWidth, containerHeight) / 2.5;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    // Brand colors
    const BLUE = "#3b82f6";
    const BLUE_LIGHT = "rgba(59, 130, 246, 0.15)";
    const BLUE_MID = "rgba(59, 130, 246, 0.35)";
    const BLUE_DOT = "rgba(59, 130, 246, 0.5)";

    const pointInPolygon = (
      point: [number, number],
      polygon: number[][]
    ): boolean => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (
          yi > y !== yj > y &&
          x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        ) {
          inside = !inside;
        }
      }
      return inside;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry;
      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates;
        if (!pointInPolygon(point, coordinates[0])) return false;
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false;
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
        return false;
      }
      return false;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;
      const stepSize = dotSpacing * 0.08;

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat];
          if (pointInFeature(point, feature)) {
            dots.push(point);
          }
        }
      }
      return dots;
    };

    interface DotData {
      lng: number;
      lat: number;
    }

    const allDots: DotData[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let landFeatures: any;

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      // Globe background — white with blue border
      context.beginPath();
      context.arc(
        containerWidth / 2,
        containerHeight / 2,
        currentScale,
        0,
        2 * Math.PI
      );
      context.fillStyle = "#ffffff";
      context.fill();
      context.strokeStyle = BLUE;
      context.lineWidth = 1.5 * scaleFactor;
      context.stroke();

      if (landFeatures) {
        // Graticule — light blue grid
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = BLUE_LIGHT;
        context.lineWidth = 0.5 * scaleFactor;
        context.stroke();

        // Land outlines — blue
        context.beginPath();
        landFeatures.features.forEach((feature: { type: string }) => {
          path(feature as unknown as d3.GeoPermissibleObjects);
        });
        context.strokeStyle = BLUE_MID;
        context.lineWidth = 1 * scaleFactor;
        context.stroke();

        // Halftone dots — blue
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat]);
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath();
            context.arc(
              projected[0],
              projected[1],
              1.2 * scaleFactor,
              0,
              2 * Math.PI
            );
            context.fillStyle = BLUE_DOT;
            context.fill();
          }
        });

        // Location markers
        locations.forEach((loc) => {
          const projected = projection(loc.coords);
          if (!projected) return;

          const [x, y] = projected;
          if (x < 0 || x > containerWidth || y < 0 || y > containerHeight)
            return;

          // Check if on visible side
          const r = projection.rotate();
          const dist = d3.geoDistance(loc.coords, [-r[0], -r[1]]);
          if (dist > Math.PI / 2) return;

          if (loc.isHQ) {
            // HQ — larger pulsing dot
            context.beginPath();
            context.arc(x, y, 8 * scaleFactor, 0, 2 * Math.PI);
            context.fillStyle = "rgba(59, 130, 246, 0.2)";
            context.fill();

            context.beginPath();
            context.arc(x, y, 4 * scaleFactor, 0, 2 * Math.PI);
            context.fillStyle = BLUE;
            context.fill();

            // Label
            context.font = `${11 * scaleFactor}px sans-serif`;
            context.fillStyle = BLUE;
            context.fillText("HQ", x + 10 * scaleFactor, y + 4 * scaleFactor);
          } else {
            // Client location — smaller dot
            context.beginPath();
            context.arc(x, y, 3 * scaleFactor, 0, 2 * Math.PI);
            context.fillStyle = BLUE;
            context.fill();
          }
        });
      }
    };

    const loadWorldData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        );
        if (!response.ok) throw new Error("Failed to load land data");

        landFeatures = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, 16);
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat });
          });
        });

        render();
        setIsLoading(false);
      } catch {
        setError("Failed to load map data");
        setIsLoading(false);
      }
    };

    // Rotation and interaction
    const rotation: [number, number] = [0, 0];
    let autoRotate = true;
    const rotationSpeed = 0.3;

    const rotate = () => {
      if (autoRotate) {
        rotation[0] += rotationSpeed;
        projection.rotate(rotation);
        render();
      }
    };

    const rotationTimer = d3.timer(rotate);

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation: [number, number] = [...rotation];

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        rotation[0] = startRotation[0] + dx * sensitivity;
        rotation[1] = startRotation[1] - dy * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]));

        projection.rotate(rotation);
        render();
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        setTimeout(() => {
          autoRotate = true;
        }, 10);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const factor = event.deltaY > 0 ? 0.95 : 1.05;
      const newScale = Math.max(
        radius * 0.5,
        Math.min(radius * 3, projection.scale() * factor)
      );
      projection.scale(newScale);
      render();
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    loadWorldData();

    return () => {
      rotationTimer.stop();
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [width, height]);

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl p-8",
          className
        )}
      >
        <p className="text-sm text-ainomiq-text-muted">{error}</p>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {isLoading && (
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
