"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ContactHero() {
    return (
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-300">
                <Sparkles className="h-4 w-4" />Contact Us
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-white md:text-6xl">
                Let's plan your next
                <span className="text-orange-400 underline decoration-teal-400 decoration-4 underline-offset-8"> premium journey</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
                Reach out for custom travel planning, booking assistance, premium destination suggestions, or any question about your next escape.
            </p>
        </motion.div>
    );
}
