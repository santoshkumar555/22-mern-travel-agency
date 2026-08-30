import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DestinationPackageCard from "@/components/destinations/cards/DestinationPackageCard";

export default function FeaturedPackagesSection({ packages = [] }) {
    if (!packages.length) return null;

    return (
        <section className="relative overflow-hidden bg-sky-50 py-24 md:py-32">
            <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <p className="px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                            Featured Escapes
                        </p>
                        <h2 className="font-black text-4xl md:text-5xl text-slate-900 leading-tight">
                            Featured Packages{" "}
                            <br />
                            <span className="text-orange-500 underline decoration-teal-400 decoration-4 underline-offset-8">
                                For Your Next Escape
                            </span>
                        </h2>
                        <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
                            Explore our most loved premium travel packages, curated to deliver unforgettable moments, elegant stays, and seamless experiences.
                        </p>
                    </div>

                    <Link
                        href="/packages"
                        className="text-sm font-bold text-orange-600 hover:underline transition-colors flex items-center gap-2 self-start"
                    >
                        View all packages <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                    {packages.map((pkg, index) => (
                        <DestinationPackageCard key={pkg._id} pkg={pkg} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
