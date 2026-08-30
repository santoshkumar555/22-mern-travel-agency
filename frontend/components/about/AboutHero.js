"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import PremiumHeroSlider from "@/components/common/PremiumHeroSlider";

const slides = [
    { image: "/hero2.jpg", title: "Luxury Travel" },
    { image: "/hero3.jpg", title: "Premium Destinations" },
    { image: "/hero4.jpg", title: "Elegant Escapes" },
];

export default function AboutHero() {
    return (
        <PremiumHeroSlider slides={slides}>
            <div className="flex h-full items-center px-6 pt-24 pb-10 md:pt-10 md:px-10 lg:px-14">
                <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="max-w-4xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-300">
                        <Sparkles className="h-4 w-4" />About Our Brand
                    </div>
                    <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-6xl">
                        We create journeys that feel
                        <span className="text-orange-400 underline decoration-teal-400 decoration-4 underline-offset-8"> refined, memorable, and effortless</span>.
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
                        Our travel platform is designed for modern explorers who want premium destinations, curated stays, seamless booking, and a truly elevated travel experience.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link href="/packages" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-900/50 transition hover:bg-orange-600">
                            Explore Packages <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-white/85 transition hover:bg-white/10">
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            </div>
        </PremiumHeroSlider>
    );
}
