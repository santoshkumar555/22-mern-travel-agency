"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock3, BadgeIndianRupee, ArrowRight, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/utils/currency";
import { getOptimizedImageUrl } from "@/lib/utils/image";
import WishlistButton from "@/components/global/WishlistButton";

export default function DestinationPackageCard({ pkg, index = 0 }) {
    return (
        <article className="group bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 cursor-pointer flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            {/* Image */}
            <div className="relative h-[280px] overflow-hidden">
                <Image
                    src={getOptimizedImageUrl(pkg?.thumbnail?.url, 900, 700) || "/hero2.jpg"}
                    alt={pkg?.title || "Travel package"}
                    fill
                    priority={index < 4}
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

                {/* Top badges */}
                <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
                    <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                        {pkg?.location?.name || "Destination"}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="rounded-full bg-orange-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                            {pkg?.duration} Days
                        </span>
                        <WishlistButton item={pkg} />
                    </div>
                </div>

                {/* Price badge */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-orange-500 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        {pkg?.location?.name || "Unknown"}
                    </span>
                </div>

                <h3 className="font-black text-xl text-slate-800 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {pkg?.title}
                </h3>

                <p className="text-sm leading-6 text-slate-500 line-clamp-2 mb-4">{pkg?.description}</p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-sky-100">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Starting From</p>
                        <div className="flex items-center gap-1 mt-1">
                            <BadgeIndianRupee className="h-4 w-4 text-orange-500" />
                            <p className="text-2xl font-black text-slate-900">{formatCurrency(pkg?.price)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase">
                            {pkg?.duration} Days
                        </span>
                        <Link
                            href={`/packages/${pkg._id}`}
                            className="w-10 h-10 shadow-md shadow-orange-200 rounded-2xl bg-orange-500 text-white flex items-center justify-center group-hover:bg-orange-600 transition-all"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
