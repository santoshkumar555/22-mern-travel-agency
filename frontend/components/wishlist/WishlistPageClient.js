"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowRight, Trash2, MapPin, Clock3, BadgeIndianRupee, PackageOpen, Sparkles } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearWishlist, removeWishlistItem } from "@/store/slices/wishlistSlice";
import { getOptimizedImageUrl } from "@/lib/utils/image";
import { formatCurrency } from "@/lib/utils/currency";
import { showToast } from "@/store/slices/toast.slice";
import { useState } from "react";

export default function WishlistPageClient() {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.wishlist.items);
    const [removingId, setRemovingId] = useState(null);

    const handleRemove = (item) => {
        setRemovingId(item._id);
        setTimeout(() => {
            dispatch(removeWishlistItem(item._id));
            dispatch(showToast({ message: `${item?.name || item?.title} removed from wishlist`, type: "success" }));
            setRemovingId(null);
        }, 300);
    };

    const handleClearAll = () => {
        dispatch(clearWishlist());
        dispatch(showToast({ message: "Wishlist cleared", type: "success" }));
    };

    return (
        <section className="relative min-h-screen overflow-hidden bg-slate-900 pt-28 pb-24">
            {/* Ambient blobs — matches About/Contact */}
            <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-600 opacity-15 blur-3xl mix-blend-multiply" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-teal-500 opacity-10 blur-3xl mix-blend-multiply" />

            <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">

                {/* ── Hero Header ── */}
                <div className="mb-12 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl">
                    <div className="relative px-8 py-10 md:px-12 md:py-12">
                        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-300">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Wishlist
                                </div>
                                <h1 className="mt-4 text-4xl font-black text-white md:text-5xl">
                                    Saved Travel Picks
                                </h1>
                                <p className="mt-3 max-w-lg text-base leading-7 text-slate-400">
                                    {items.length > 0
                                        ? `You have ${items.length} ${items.length === 1 ? "package" : "packages"} saved. Ready to plan your next escape?`
                                        : "Save your favourite packages here and revisit them whenever you're ready to explore."}
                                </p>
                            </div>

                            {items.length > 0 && (
                                <div className="flex flex-wrap items-center gap-3">
                                    <Link
                                        href="/packages"
                                        className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-900/50 transition hover:bg-orange-600"
                                    >
                                        Browse More
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <button
                                        onClick={handleClearAll}
                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-slate-300 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Clear All
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Stats strip */}
                        {items.length > 0 && (
                            <div className="relative mt-8 flex flex-wrap gap-4">
                                {[
                                    { label: "Saved Packages", value: items.length },
                                    { label: "Unique Destinations", value: new Set(items.map((i) => i?.location?.name).filter(Boolean)).size || items.length },
                                    { label: "Avg. Duration", value: `${Math.round(items.reduce((a, i) => a + (i?.duration || 0), 0) / items.length) || "—"} Days` },
                                ].map((s) => (
                                    <div key={s.label} className="rounded-2xl border border-white/10 bg-slate-800/60 px-5 py-3">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
                                        <p className="mt-1 text-xl font-black text-white">{s.value}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Grid ── */}
                {items.length > 0 ? (
                    <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
                        {items.map((item) => (
                            <article
                                key={item._id}
                                className={`group flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-orange-400/30 hover:shadow-xl hover:shadow-black/30 ${removingId === item._id ? "scale-95 opacity-0" : "scale-100 opacity-100"
                                    }`}
                            >
                                {/* Image */}
                                <div className="relative h-[260px] overflow-hidden">
                                    <Image
                                        src={getOptimizedImageUrl(item?.thumbnail?.url, 900, 700) || "/hero2.jpg"}
                                        alt={item?.title || "Wishlist item"}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />

                                    {/* Top badges */}
                                    <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
                                        <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                                            {item?.location?.name || "Destination"}
                                        </span>
                                        {item?.duration && (
                                            <span className="rounded-full bg-orange-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                                                {item.duration} Days
                                            </span>
                                        )}
                                    </div>

                                    {/* Remove button */}
                                    <button
                                        onClick={() => handleRemove(item)}
                                        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-md transition hover:bg-red-500 hover:border-red-400"
                                        title="Remove from wishlist"
                                    >
                                        <Heart className="h-4 w-4 fill-white" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin className="h-4 w-4 text-orange-400" />
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                            {item?.location?.name || "Unknown"}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-black text-white group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
                                        {item?.title || item?.name}
                                    </h2>

                                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                                        {item?.description}
                                    </p>

                                    {/* Meta row */}
                                    <div className="mt-5 mb-4 flex items-center gap-3">
                                        {item?.duration && (
                                            <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300">
                                                <Clock3 className="h-3.5 w-3.5 text-orange-400" />
                                                {item.duration} Days
                                            </span>
                                        )}
                                        {item?.tripType && (
                                            <span className="inline-flex items-center gap-1.5 rounded-xl border border-teal-400/20 bg-teal-500/10 px-3 py-1.5 text-xs font-bold capitalize text-teal-300">
                                                {item.tripType}
                                            </span>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/10">
                                        <div>
                                            {item?.price ? (
                                                <>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Starting From</p>
                                                    <div className="mt-1 flex items-center gap-1">
                                                        <BadgeIndianRupee className="h-4 w-4 text-orange-400" />
                                                        <span className="text-2xl font-black text-white">{formatCurrency(item.price)}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="text-sm font-bold text-slate-400">Price on request</span>
                                            )}
                                        </div>

                                        <Link
                                            href={`/packages/${item._id}`}
                                            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-900/50 transition hover:bg-orange-600"
                                        >
                                            View
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    /* ── Empty State ── */
                    <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-white/10 bg-white/5 px-8 py-24 text-center backdrop-blur-xl">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-orange-400/20 bg-orange-500/10 ring-8 ring-orange-500/5">
                            <PackageOpen className="h-12 w-12 text-orange-400" />
                        </div>
                        <h2 className="mt-8 text-3xl font-black text-white">Your wishlist is empty</h2>
                        <p className="mt-3 max-w-md text-base leading-7 text-slate-400">
                            Start exploring our premium packages and save the ones that inspire your next adventure.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/packages"
                                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-900/50 transition hover:bg-orange-600"
                            >
                                Explore Packages
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/destinations"
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-bold text-slate-300 transition hover:border-orange-400/30 hover:text-orange-400"
                            >
                                Browse Destinations
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
