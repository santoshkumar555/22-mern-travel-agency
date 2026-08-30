import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlassCard from "@/components/common/GlassCard";

export default function ContactCTA() {
    return (
        <GlassCard className="px-6 py-10 md:px-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-400">Ready to Explore</p>
                    <h2 className="mt-4 max-w-3xl text-3xl font-black text-white md:text-5xl">
                        Browse curated packages built for premium travel experiences.
                    </h2>
                </div>
                <Link href="/packages" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-900/50 transition hover:bg-orange-600">
                    Explore Packages <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </GlassCard>
    );
}
