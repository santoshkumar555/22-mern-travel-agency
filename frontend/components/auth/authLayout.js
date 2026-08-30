"use client";

import {
    ShieldCheck,
    Plane,
    Sparkles,
    Globe2,
    MapPinned,
    BadgeCheck,
} from "lucide-react";

export default function AuthLayout({ children }) {
    const features = [
        { icon: Plane, title: "Book smarter", text: "Plan trips, compare packages, and manage bookings in one place." },
        { icon: ShieldCheck, title: "Secure account", text: "Your profile, bookings, and account actions stay protected." },
        { icon: Globe2, title: "Travel globally", text: "Discover destinations, hotels, and curated journeys worldwide." },
    ];

    const stats = [
        { label: "Destinations", value: "120+" },
        { label: "Happy Travelers", value: "8k+" },
        { label: "Verified Packages", value: "450+" },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-900">
            {/* Ambient blobs */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply opacity-20 blur-3xl" />
            <div className="absolute top-1/3 right-0 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply opacity-15 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply opacity-10 blur-3xl" />

            <div className="relative z-10 flex min-h-screen items-start justify-center px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid w-full max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl lg:grid-cols-[1.05fr_0.95fr]">
                    {/* Left Panel */}
                    <div className="relative hidden overflow-hidden border-r border-white/10 lg:block">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/15 via-slate-900/20 to-teal-600/10" />
                        <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply opacity-15 blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply opacity-15 blur-3xl pointer-events-none" />

                        <div className="relative flex h-full min-h-[760px] flex-col p-8 xl:p-10">
                            {/* Top */}
                            <div>
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-900/50">
                                        <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45" />
                                    </div>
                                    <span className="text-xl font-black tracking-tight text-white">TRAVELNEST</span>
                                </div>

                                <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm font-bold text-orange-200 uppercase tracking-widest mb-6">
                                    <Sparkles className="h-4 w-4" />
                                    Premium Travel Experience
                                </div>

                                <h1 className="mt-4 max-w-xl text-4xl font-black leading-tight text-white xl:text-5xl">
                                    Explore the world with a smarter travel account.
                                </h1>

                                <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
                                    Create your account to manage bookings, save travel details, personalize your profile, and unlock a smoother journey from planning to checkout.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="my-8 flex-1">
                                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="text-sm font-bold uppercase tracking-widest text-orange-300">Travel Dashboard Preview</p>
                                            <h3 className="mt-1 text-lg font-black text-white">Your trips, bookings & profile in one place</h3>
                                        </div>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300 ring-1 ring-orange-300/20">
                                            <MapPinned className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        {stats.map((item) => (
                                            <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                                                <p className="text-xl font-black text-white">{item.value}</p>
                                                <p className="mt-1 text-xs text-slate-400">{item.label}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 rounded-3xl border border-white/10 bg-slate-900/60 p-5">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-300">
                                                <BadgeCheck className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-white">Personalized travel experience</p>
                                                <p className="text-xs text-slate-400">Save profile info, manage bookings, and access plans faster.</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            {[
                                                { name: "Bali Escape", sub: "5 nights · 2 travelers", status: "Confirmed", color: "text-teal-300 bg-teal-400/15" },
                                                { name: "Dubai Adventure", sub: "4 nights · Family package", status: "Upcoming", color: "text-orange-300 bg-orange-400/15" },
                                            ].map((b) => (
                                                <div key={b.name} className="rounded-2xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-black text-white">{b.name}</p>
                                                        <p className="text-xs text-slate-400">{b.sub}</p>
                                                    </div>
                                                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${b.color}`}>{b.status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="grid gap-3">
                                {features.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.title} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300 ring-1 ring-orange-300/20">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-black text-white">{item.title}</h3>
                                                <p className="mt-0.5 text-xs leading-5 text-slate-400">{item.text}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="relative flex items-start justify-center p-4 sm:p-6 lg:p-8">
                        <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
