"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const pageHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;
            setScrollProgress(progress);
            setShowButton(scrollTop > 200);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${showButton ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"
                }`}
            style={{
                background: `conic-gradient(#f97316 ${scrollProgress * 3.6}deg, rgba(241,245,249,0.8) 0deg)`,
            }}
            aria-label="Scroll to top"
        >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900">
                <ChevronUp className="h-5 w-5 text-white" />
            </div>
        </button>
    );
}
