import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function CtaBannerSection() {
    return (
        <section className="relative overflow-hidden py-24">
            <div className="absolute inset-0">
                <Image src="/hero2.jpg" alt="Luxury travel CTA" fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-slate-950/70" />
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply opacity-20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply opacity-20 blur-3xl pointer-events-none" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 md:px-12">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="font-black text-4xl md:text-5xl text-white mb-8 leading-tight">
                            Ready To Plan Your{" "}
                            <br />
                            <span className="text-orange-400 underline decoration-teal-500 decoration-4 underline-offset-8">
                                Unforgettable Escape?
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">
                            Explore curated destinations, premium stays, and handpicked travel experiences designed to make every journey feel extraordinary.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/packages"
                                className="px-8 py-4 bg-orange-500 text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-orange-600 shadow-lg shadow-orange-900/50 transition flex items-center justify-center gap-2"
                            >
                                <Phone className="w-4 h-4" /> Explore Packages
                            </Link>
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-slate-800 text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-slate-700 transition flex items-center justify-center gap-2"
                            >
                                <Mail className="w-4 h-4" /> Contact Us
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "Happy Travelers", value: "15k+" },
                            { label: "Destinations", value: "120+" },
                            { label: "Five-Star Reviews", value: "4.9/5" },
                            { label: "Years Experience", value: "10+" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md"
                            >
                                <p className="text-3xl font-black text-orange-400">{stat.value}</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
