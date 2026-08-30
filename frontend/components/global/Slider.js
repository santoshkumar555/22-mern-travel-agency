"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Slider({ heroSlides = [], children }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (heroSlides.length <= 1) return;
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const activeSlide = heroSlides[activeIndex];
    if (!heroSlides.length) return null;

    return (
        <section className="relative h-screen min-h-[700px] w-full">
            {/* Background images */}
            <div className="absolute inset-0 overflow-hidden">
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${index === activeIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.titleBold || "Hero Slide"}
                            fill
                            priority={index === 0}
                            className="object-cover"
                        />
                    </div>
                ))}
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-slate-900/50" />
                {/* Ambient blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full mix-blend-multiply blur-3xl" />
                <div className="absolute top-0 right-20 w-[600px] h-[600px] bg-teal-500/15 rounded-full mix-blend-multiply blur-3xl" />
            </div>

            {/* z-30 is required here: this div creates a stacking context at the section level.
          The dot indicators below are siblings (also at section level) and were formerly
          z-20 — which outranked this wrapper's old z-10, causing dots to paint on top of
          the dropdown (z-[100] inside this wrapper is still bounded by the wrapper's own
          external z-index). Raising to z-30 ensures the entire content layer, including any
          open dropdown, always renders above the dot indicators (now z-10). */}
            <div className="relative z-30 flex h-full items-center justify-center px-4">
                <div className="mx-auto flex w-full max-w-7xl flex-col items-center text-center text-white">
                    <div key={activeSlide.id} className="mt-24 max-w-6xl animate-heroContent">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-500/20 border border-teal-400/30 text-teal-200 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                            {activeSlide.subtitle}
                        </div>

                        <h1 className="text-6xl font-black uppercase leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
                            <span className="mr-3 inline-block text-transparent [-webkit-text-stroke:2px_white]">
                                {activeSlide.titleLight}
                            </span>
                            <span className="text-white">{activeSlide.titleBold}</span>
                        </h1>

                        <h2 className="mt-2 text-4xl font-black uppercase leading-tight text-orange-400 sm:text-5xl md:text-6xl">
                            {activeSlide.titleBottom}
                        </h2>
                    </div>

                    {children}
                </div>
            </div>

            {/* Dot indicators — z-10 keeps them above the background images (no z-index)
          but below the hero content wrapper (z-30). isolation-isolate is retained so
          the active pill's own stacking context does not compete with siblings. */}
            {heroSlides.length > 1 && (
                <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3 isolation-isolate">
                    {heroSlides.map((slide, index) => (
                        <button
                            key={slide.id ?? index}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-10 bg-orange-500" : "w-2.5 bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}