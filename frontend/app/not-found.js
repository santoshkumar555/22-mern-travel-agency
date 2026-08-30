"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Home, Plane } from "lucide-react";

const slides = ["/hero1.jpg", "/hero4.jpg", "/package_hero1.webp", "/package_hero3.jpg"];

export default function PageNotFound() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main className="relative min-h-screen overflow-hidden">
            {/* Background slider */}
            <div className="absolute inset-0">
                {slides.map((img, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-opacity duration-[2000ms] ${i === index ? "opacity-100" : "opacity-0"}`}
                    >
                        <Image src={img} alt="Travel background" fill priority={i === 0} className="object-cover" />
                    </div>
                ))}
                <div className="absolute inset-0 bg-slate-950/70" />
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply opacity-20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply opacity-15 blur-3xl pointer-events-none" />
            </div>

            {/* Floating icon */}
            <div className="absolute left-1/2 top-20 z-10 -translate-x-1/2 animate-bounce">
                <Plane className="h-10 w-10 text-orange-400 opacity-80" />
            </div>

            {/* Main content */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
                <div className="w-full max-w-2xl text-center">
                    <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl shadow-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80">
                            <Compass className="h-4 w-4 text-orange-400" />
                            Lost in Journey
                        </div>

                        {/* 404 */}
                        <h1 className="mt-6 text-[90px] font-black leading-none text-white sm:text-[120px]">404</h1>

                        <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                            You&apos;ve gone off the map 🌍
                        </h2>

                        <p className="mt-5 text-base leading-7 text-white/65 sm:text-lg">
                            The destination you&apos;re looking for doesn&apos;t exist or has been moved. But don&apos;t worry — your next unforgettable journey is just a click away.
                        </p>

                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white uppercase tracking-wider shadow-lg shadow-orange-900/50 transition hover:bg-orange-600"
                            >
                                <Home className="h-4 w-4" />
                                Back to Home
                            </Link>
                            <Link
                                href="/destinations"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                            >
                                Explore Destinations
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
