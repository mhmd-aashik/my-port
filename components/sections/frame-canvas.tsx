"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 192;

export function FrameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(true);

  // 1. Preload images on mount
  useEffect(() => {
    let active = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const preload = () => {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        const frameNum = String(i).padStart(6, "0");
        img.src = `/frames/frame_${frameNum}.png`;

        img.onload = () => {
          if (!active) return;
          loadedCount++;
          setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          if (loadedCount === TOTAL_FRAMES) {
            setImages(loadedImages);
            setIsLoading(false);
          }
        };

        img.onerror = () => {
          if (!active) return;
          console.warn(`Failed to load frame_${frameNum}.png`);
          loadedCount++;
          setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          if (loadedCount === TOTAL_FRAMES) {
            setImages(loadedImages);
            setIsLoading(false);
          }
        };

        loadedImages.push(img);
      }
    };

    preload();

    return () => {
      active = false;
    };
  }, []);

  // 2. Prevent scroll during load and fade out loader once complete
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";

      // Smoothly fade out the loader overlay
      gsap.to(".loading-overlay", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          setLoaderVisible(false);
          // Refresh ScrollTrigger to calculate exact pinning positions
          ScrollTrigger.refresh();
        },
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  // 3. GSAP ScrollTrigger Setup
  useEffect(() => {
    if (isLoading || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Responsive Canvas Cover Rendering
    const renderFrame = (index: number) => {
      const img = images[index];
      if (!img) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const canvasRatio = canvasWidth / canvasHeight;
      const imgRatio = img.width / img.height;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      // Apply style size to match screen size
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      // Re-render frame at the current playhead
      const st = ScrollTrigger.getById("frameScrollTrigger");
      if (st) {
        const frameIndex = Math.round(st.progress * (images.length - 1));
        renderFrame(frameIndex);
      } else {
        renderFrame(0);
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Set initial size and draw frame 0

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const playhead = { frame: 0 };
    const totalDuration = 12;

    const ctxGsap = gsap.context(() => {
      const tl = gsap.timeline({
        id: "frameScrollTrigger",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8, // subtle smoothing inertia
          pin: canvasContainerRef.current, // Pin the child container
          pinSpacing: false, // Prevent ScrollTrigger from adding duplicate spacing
          anticipatePin: 1,
          onUpdate: (self) => {
            gsap.set("#scroll-progress", { scaleX: self.progress });
          },
        },
      });

      // Fade out scroll indicator quickly upon scroll
      tl.to(".scroll-indicator", { opacity: 0, duration: 0.5 }, 0.1);

      // Animate frame playback over the full timeline duration
      tl.to(
        playhead,
        {
          frame: images.length - 1,
          snap: "frame",
          ease: "none",
          duration: totalDuration,
          onUpdate: () => {
            renderFrame(Math.round(playhead.frame));
          },
        },
        0
      );

      // Sync floating typography overlays
      tl.fromTo(
        ".caption-1",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
        0.5
      ).to(
        ".caption-1",
        { opacity: 0, y: -30, duration: 1.5, ease: "power2.in" },
        2.5
      );

      tl.fromTo(
        ".caption-2",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
        3.5
      ).to(
        ".caption-2",
        { opacity: 0, y: -30, duration: 1.5, ease: "power2.in" },
        5.5
      );

      tl.fromTo(
        ".caption-3",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
        6.5
      ).to(
        ".caption-3",
        { opacity: 0, y: -30, duration: 1.5, ease: "power2.in" },
        8.5
      );

      tl.fromTo(
        ".caption-4",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
        9.5
      ).to(
        ".caption-4",
        { opacity: 0, y: -30, duration: 1.5, ease: "power2.in" },
        11.5
      );
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ctxGsap.revert();
    };
  }, [isLoading, images]);

  // Loading Circle configuration
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] bg-black">
      {/* Loading Overlay */}
      {loaderVisible && (
        <div className="loading-overlay fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F1419] text-[#E6EDF3]">
          {/* Ambient Glows */}
          <div className="absolute w-[350px] h-[350px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
          <div className="absolute w-[250px] h-[250px] rounded-full bg-[#4DE1C1]/10 blur-[80px] pointer-events-none" />

          {/* Loader UI */}
          <div className="relative flex flex-col items-center gap-8 z-10">
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Background Track */}
              <svg className="w-full h-full rotate-[-90deg]">
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  className="stroke-[#21262D]"
                  strokeWidth="3"
                  fill="transparent"
                />
                {/* Animated Progress Arc */}
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  className="stroke-primary transition-all duration-150 ease-out"
                  strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <span className="absolute text-xl font-mono font-bold tracking-tight text-[#E6EDF3]">
                {progress}%
              </span>
            </div>

            {/* Terminal IDE-style status */}
            <div className="font-mono text-xs text-muted-foreground bg-card border border-border p-4 rounded-lg min-w-[290px] shadow-2xl">
              <div className="flex items-center gap-1.5 mb-2.5 text-zinc-500">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <span className="ml-2 text-[10px] tracking-wider uppercase font-semibold text-muted-foreground/80">
                  loader.sh
                </span>
              </div>
              <p className="text-primary font-semibold">&gt; init --sequence --frames=192</p>
              <p className="text-[#4DE1C1] mt-1">&gt; preloading assets... {progress}%</p>
              <p className="text-muted-foreground mt-1">
                &gt; cache status: {progress === 100 ? "SUCCESS" : "BUFFERING"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Canvas Container Pinned by ScrollTrigger */}
      <div
        ref={canvasContainerRef}
        className="h-screen w-full overflow-hidden flex items-center justify-center bg-[#0F1419]"
      >
        <canvas ref={canvasRef} className="block w-full h-full opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1419]/60 via-transparent to-[#0F1419]/60" />

        {/* Narratives Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="caption-1 absolute opacity-0 px-6 text-center max-w-4xl">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#E6EDF3] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              Introducing <span className="text-primary">Story Teller</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground font-mono bg-[#161B22]/60 px-4 py-2 rounded-md border border-border/40 backdrop-blur-sm inline-block">
              Where user scroll orchestrates cinematic imagery.
            </p>
          </div>

          <div className="caption-2 absolute opacity-0 px-6 text-center max-w-4xl">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#E6EDF3] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              Fluid <span className="text-[#4DE1C1]">Interpolation</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground font-mono bg-[#161B22]/60 px-4 py-2 rounded-md border border-border/40 backdrop-blur-sm inline-block">
              Powered by GSAP and HTML5 Canvas context.
            </p>
          </div>

          <div className="caption-3 absolute opacity-0 px-6 text-center max-w-4xl">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#E6EDF3] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              Perfect <span className="text-primary">Sync</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground font-mono bg-[#161B22]/60 px-4 py-2 rounded-md border border-border/40 backdrop-blur-sm inline-block">
              Scrubbing forward and backward flawlessly.
            </p>
          </div>

          <div className="caption-4 absolute opacity-0 px-6 text-center max-w-4xl">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#E6EDF3] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              Create Your <span className="text-[#4DE1C1]">Vision</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground font-mono bg-[#161B22]/60 px-4 py-2 rounded-md border border-border/40 backdrop-blur-sm inline-block">
              Reimagine digital storytelling.
            </p>
          </div>
        </div>

        {/* Bottom Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-muted overflow-hidden z-30">
          <div
            id="scroll-progress"
            className="h-full w-full bg-primary origin-left scale-x-0"
          />
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-30 pointer-events-none animate-bounce">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-semibold text-muted-foreground/80">
            Scroll to Navigate
          </span>
          <svg
            className="w-5 h-5 stroke-[#4DE1C1]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
