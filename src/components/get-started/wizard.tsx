"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { UrlInput } from "./url-input";
import { AnalysisProgress } from "./progress";
import { Results } from "./results";
import { FallbackForm } from "./fallback-form";
import type { SiteAnalysis, ManualAnswers } from "@/lib/analysis-types";

type Step = "input" | "analyzing" | "results" | "fallback";

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: 200 + Math.random() * 40,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

export function GetStartedWizard() {
  const [step, setStep] = useState<Step>("input");
  const [analysis, setAnalysis] = useState<SiteAnalysis | null>(null);
  const [manual, setManual] = useState<ManualAnswers | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const MINIMUM_BEAMS = 20;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      const totalBeams = MINIMUM_BEAMS * 1.5;
      beamsRef.current = Array.from({ length: totalBeams }, () =>
        createBeam(canvas.width, canvas.height)
      );
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    function resetBeam(beam: Beam, index: number, totalBeams: number) {
      if (!canvas) return beam;
      const column = index % 3;
      const spacing = canvas.width / 3;
      beam.y = canvas.height + 100;
      beam.x =
        column * spacing +
        spacing / 2 +
        (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.5 + Math.random() * 0.4;
      beam.hue = 200 + (index * 40) / totalBeams;
      beam.opacity = 0.2 + Math.random() * 0.1;
      return beam;
    }

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2);

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
      gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`);
      gradient.addColorStop(
        0.1,
        `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`
      );
      gradient.addColorStop(
        0.4,
        `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`
      );
      gradient.addColorStop(
        0.6,
        `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`
      );
      gradient.addColorStop(
        0.9,
        `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`
      );
      gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    }

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "blur(35px)";

      const mx = mouseRef.current.x * window.innerWidth;
      const my = mouseRef.current.y * window.innerHeight;
      const totalBeams = beamsRef.current.length;

      beamsRef.current.forEach((beam, index) => {
        // Mouse interaction: beams near cursor move faster and glow brighter
        const dx = beam.x - mx;
        const dy = beam.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 400);

        beam.y -= beam.speed + influence * 1.5;
        beam.x += dx * influence * 0.003;
        beam.pulse += beam.pulseSpeed + influence * 0.04;

        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams);
        }

        // Temporarily boost opacity near cursor
        const origOpacity = beam.opacity;
        beam.opacity = origOpacity + influence * 0.15;
        drawBeam(ctx, beam);
        beam.opacity = origOpacity;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleUrlSubmit = useCallback(async (url: string) => {
    setIsLoading(true);
    setStep("analyzing");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setStep("fallback");
        return;
      }

      setAnalysis(data.analysis);
    } catch {
      setStep("fallback");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleProgressComplete = useCallback(() => {
    if (analysis) {
      setStep("results");
    }
  }, [analysis]);

  const handleFallbackSubmit = useCallback((answers: ManualAnswers) => {
    setManual(answers);
    setStep("results");
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Animated beams background */}
      <div className="absolute inset-0 -z-10 bg-white">
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ filter: "blur(15px)" }}
        />
      </div>

      {/* Decorative lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto hidden max-w-5xl lg:block"
      >
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-ainomiq-border to-ainomiq-border" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-ainomiq-border to-ainomiq-border" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="relative flex min-h-[calc(75vh-4rem)] flex-col items-center justify-center gap-5 px-6 pt-32 pb-20">
          {/* Inner decorative lines */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden"
          >
            <div className="absolute inset-y-0 left-4 w-px bg-gradient-to-b from-transparent via-ainomiq-border to-ainomiq-border md:left-8" />
            <div className="absolute inset-y-0 right-4 w-px bg-gradient-to-b from-transparent via-ainomiq-border to-ainomiq-border md:right-8" />
          </div>

          <AnimatePresence mode="wait">
            {step === "input" && (
              <UrlInput
                key="input"
                onSubmit={handleUrlSubmit}
                isLoading={isLoading}
              />
            )}
            {step === "analyzing" && (
              <AnalysisProgress
                key="progress"
                onComplete={handleProgressComplete}
              />
            )}
            {step === "results" && (
              <Results key="results" analysis={analysis} manual={manual} />
            )}
            {step === "fallback" && (
              <FallbackForm key="fallback" onSubmit={handleFallbackSubmit} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
