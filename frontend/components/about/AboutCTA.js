import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlassCard from "@/components/common/GlassCard";

export default function AboutCTA() {
    return (
        <GlassCard className="px-6 py-10 md:px-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-400">Start Your Journey</p>
                    <h2 className="mt-4 max-w-3xl text-3xl font-black text-white md:text-5xl">
                        Discover destinations designed for unforgettable travel moments.
                    </h2>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Link href="/packages" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-900/50 transition hover:bg-orange-600">
                        Explore Packages <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-white/85 transition hover:bg-white/10">
                        Talk to Us
                    </Link>
                </div>
            </div>
        </GlassCard>
    );
}
