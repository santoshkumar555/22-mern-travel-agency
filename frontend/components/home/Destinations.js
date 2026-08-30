import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { createSlug } from "@/lib/utils/slug";

export default async function Destinations({ locations = [] }) {
    return (
        <section className="relative overflow-hidden bg-white py-20 sm:py-24">
            {/* Marquee strip — overflow-x-hidden clips the scrolling strip to its own bounds */}
            <div className="w-full overflow-x-hidden border-y border-white/10 py-5 bg-slate-800 mb-16">
                <div className="flex whitespace-nowrap animate-[marquee_40s_linear_infinite]">
                    {[...locations.slice(0, 9), ...locations.slice(0, 9), ...locations.slice(0, 9)].map((loc, i) => (
                        <div key={i} className="flex items-center gap-6 mx-6">
                            <span className="text-xl md:text-2xl font-black text-slate-400 uppercase tracking-widest">
                                {loc.name}
                            </span>
                            <span className="text-orange-400 text-2xl font-black">+</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-14 flex flex-col items-center justify-between gap-6 lg:flex-row">
                    <div className="max-w-2xl">
                        <p className="px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                            Top Destinations
                        </p>
                        <h2 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                            Explore the most{" "}
                            <span className="text-orange-500 underline decoration-teal-400 decoration-4 underline-offset-8">
                                beautiful places
                            </span>
                        </h2>
                        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                            Discover handpicked destinations with breathtaking views, unforgettable experiences, and perfectly planned travel moments.
                        </p>
                    </div>

                    <Link
                        href="/destinations"
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-500 shadow-md"
                    >
                        View All Destinations
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {locations.slice(0, 12).map((loc) => (
                        <Link
                            key={loc._id}
                            href={`/destinations/${createSlug(loc?.name || "")}`}
                            className="group relative block overflow-hidden rounded-[2rem] shadow-lg border border-sky-100"
                        >
                            <div className="relative h-[280px] overflow-hidden">
                                <Image
                                    src={loc.image?.url}
                                    alt={loc.name}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />

                                {/* Default bottom content */}
                                <div className="absolute inset-x-0 bottom-0 px-6 pb-6 z-10 transition-all duration-500 group-hover:-translate-y-20">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-teal-400" />
                                        <p className="text-sm text-white/80 font-bold uppercase tracking-widest">{loc.country}</p>
                                    </div>
                                    <h3 className="mt-1 text-2xl font-black text-white">{loc.name}</h3>
                                    <div className="mt-2 h-0.5 w-16 bg-orange-500 transition-all duration-500 group-hover:w-full" />
                                </div>

                                {/* Hover content */}
                                <div className="absolute inset-x-0 bottom-6 px-6 opacity-0 translate-y-6 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 z-20">
                                    <p className="text-sm text-white/75 leading-relaxed">
                                        {loc.description?.slice(0, 90) || "Discover this amazing destination."}...
                                    </p>
                                    <div className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-orange-400">
                                        Explore Destination
                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}