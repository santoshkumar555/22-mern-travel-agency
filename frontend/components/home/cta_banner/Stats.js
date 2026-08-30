"use client";

import { useEffect, useRef, useState } from "react";
import { Globe2, MapPinned, BriefcaseBusiness, Users } from "lucide-react";

const stats = [
    { id: 1, icon: Globe2, value: 20, suffix: "+", label: "Global Destinations" },
    { id: 2, icon: BriefcaseBusiness, value: 100, suffix: "+", label: "Curated Packages" },
    { id: 3, icon: Users, value: 500, suffix: "+", label: "Happy Travelers" },
    { id: 4, icon: MapPinned, value: 24, suffix: "/7", label: "Travel Support" },
];

function Counter({ end, duration = 2000, startAnimation, suffix = "" }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startAnimation) return;
        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(end);
        };
        requestAnimationFrame(animate);
    }, [startAnimation, end, duration]);

    return <span>{count}{suffix}</span>;
}

export default function StatsCounterSection() {
    const sectionRef = useRef(null);
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) { setStartAnimation(true); observer.disconnect(); }
            },
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
            <h2 className="font-black text-3xl md:text-5xl text-slate-900 mb-16 max-w-3xl mx-auto leading-tight">
                Trusted By Travelers Who{" "}
                <span className="text-teal-600 underline decoration-orange-400 decoration-4 underline-offset-8">
                    Expect More
                </span>{" "}
                From Every Journey
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                {stats.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.id} className="flex flex-col items-center justify-center space-y-3">
                            <span className="text-5xl md:text-7xl font-black text-orange-500 drop-shadow-sm">
                                <Counter end={item.value} suffix={item.suffix} startAnimation={startAnimation} />
                            </span>
                            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-slate-500">
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
