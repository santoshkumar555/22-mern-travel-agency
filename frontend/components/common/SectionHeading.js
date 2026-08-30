"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ badge, title, description, align = "center" }) {
    const alignClass = align === "left" ? "text-left items-start" : "text-center items-center";

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className={`mx-auto flex max-w-3xl flex-col ${alignClass}`}
        >
            {badge && (
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-300">
                    {badge}
                </div>
            )}
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>
            {description && (
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">{description}</p>
            )}
        </motion.div>
    );
}
