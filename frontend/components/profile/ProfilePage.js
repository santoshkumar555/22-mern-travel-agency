"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CalendarDays, CheckCircle2, CircleUserRound, Clock3, Crown, Edit3, Link2, Mail, MapPin, Monitor, Phone, Settings, Shield, Sparkles, User2 } from "lucide-react";

import { useAuth } from "@/context/authContext";
import { getConnectedAccounts, getLoginSessions } from "@/lib/api/auth";
import ProfileSkeleton from "./profileSkeleton";

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const [sessions, setSessions] = useState([]);
    const [connectedAccounts, setConnectedAccounts] = useState([]);
    const [extrasLoading, setExtrasLoading] = useState(true);

    useEffect(() => {
        const loadExtras = async () => {
            try {
                const [sessionsRes, connectedRes] = await Promise.allSettled([getLoginSessions(), getConnectedAccounts()]);
                setSessions(sessionsRes.status === "fulfilled" ? (sessionsRes.value?.data || sessionsRes.value || []) : []);
                setConnectedAccounts(connectedRes.status === "fulfilled" ? (connectedRes.value?.data || connectedRes.value || []) : []);
            } catch { setSessions([]); setConnectedAccounts([]); }
            finally { setExtrasLoading(false); }
        };
        if (user) loadExtras();
    }, [user]);

    const joinedDate = useMemo(() => {
        if (!user?.createdAt) return "Not available";
        try { return new Date(user.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }
        catch { return "Not available"; }
    }, [user]);

    const profileCompletion = useMemo(() => {
        if (!user) return 0;
        let done = 0;
        if (user?.name) done++; if (user?.email) done++; if (user?.contact) done++; if (user?.image?.url) done++; if (user?.isVerified) done++;
        return Math.round((done / 5) * 100);
    }, [user]);

    const emailVerified = !!user?.isVerified;
    const phoneAdded = !!user?.contact;
    const imageUrl = user?.image?.url || "";
    const currentSession = sessions?.[0];

    if (loading || extrasLoading) return <ProfileSkeleton />;
    if (!user) return (
        <div className="min-h-screen bg-slate-900 px-4 py-16 text-white">
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center">
                <p className="text-lg font-bold">Please login to view your profile.</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pt-28 bg-slate-900 px-4 py-10 text-white sm:px-6 lg:px-8">
            {/* Ambient blobs */}
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-600 opacity-10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-teal-500 opacity-10 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Hero card */}
                <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-teal-600/10" />
                        <div className="relative p-6 md:p-8">
                            <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
                                <div className="flex flex-col items-center gap-5 sm:flex-row">
                                    <div className="relative h-28 w-28 overflow-hidden rounded-full border border-white/10 bg-orange-500/10 shadow-lg ring-4 ring-orange-400/10">
                                        {imageUrl ? (
                                            <Image src={imageUrl} alt={user?.name || "User"} fill className="object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-4xl font-black text-orange-400">
                                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-300">
                                            <Sparkles className="h-3.5 w-3.5" />My Profile
                                        </div>
                                        <h1 className="mt-4 text-3xl font-black sm:text-4xl">{user?.name}</h1>
                                        <p className="mt-2 text-sm text-slate-300 sm:text-base">{user?.email}</p>
                                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                                            <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-300"><BadgeCheck className="h-3.5 w-3.5" />{user?.role || "user"}</span>
                                            {emailVerified ? <span className="inline-flex items-center gap-1 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-300"><CheckCircle2 className="h-3.5 w-3.5" />Email Verified</span> : <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-300">Email Pending</span>}
                                            {phoneAdded ? <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300">Phone Added</span> : <span className="rounded-full bg-slate-500/10 px-3 py-1 text-xs font-bold text-slate-300">Phone Missing</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                    {[
                                        { label: "Completion", value: `${profileCompletion}%`, color: "text-orange-400" },
                                        { label: "Role", value: user?.role || "user", color: "text-white" },
                                        { label: "Joined", value: joinedDate, color: "text-white" },
                                        { label: "Status", value: "Active", color: "text-teal-300" },
                                    ].map((s) => (
                                        <div key={s.label} className="rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                                            <p className="text-xs text-slate-400">{s.label}</p>
                                            <p className={`mt-2 text-lg font-black capitalize ${s.color}`}>{s.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link href="/account-settings" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-900/50 transition hover:bg-orange-600">
                                    <Edit3 className="h-4 w-4" />Edit Profile
                                </Link>
                                <Link href="/account-settings" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                                    <Settings className="h-4 w-4" />Account Settings
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr]">
                    {/* Left */}
                    <aside className="space-y-6">
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-black">Profile Completion</h3>
                                    <p className="mt-1 text-sm text-slate-400">Improve your profile quality</p>
                                </div>
                                <span className="text-lg font-black text-orange-400">{profileCompletion}%</span>
                            </div>
                            <div className="h-3 overflow-hidden rounded-full bg-white/10">
                                <div className="h-full rounded-full bg-orange-500 transition-all duration-500" style={{ width: `${profileCompletion}%` }} />
                            </div>
                            <div className="mt-5 space-y-3">
                                {[
                                    { label: "Full name added", done: !!user?.name },
                                    { label: "Email added", done: !!user?.email },
                                    { label: "Phone number added", done: !!user?.contact },
                                    { label: "Profile photo uploaded", done: !!user?.image?.url },
                                    { label: "Email verified", done: !!user?.isVerified },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-800/60 px-4 py-3">
                                        <span className="text-sm text-slate-200">{item.label}</span>
                                        {item.done ? <span className="inline-flex items-center gap-1 rounded-full bg-teal-500/10 px-2.5 py-1 text-xs font-bold text-teal-300"><CheckCircle2 className="h-3.5 w-3.5" />Done</span> : <span className="rounded-full bg-slate-500/10 px-2.5 py-1 text-xs font-bold text-slate-300">Pending</span>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <h3 className="text-lg font-black mb-5">Quick Overview</h3>
                            <div className="space-y-4">
                                {[
                                    { icon: User2, label: "Full Name", value: user?.name || "Not available" },
                                    { icon: Mail, label: "Email", value: user?.email || "Not available" },
                                    { icon: Phone, label: "Contact", value: user?.contact || "Not added" },
                                    { icon: CalendarDays, label: "Member Since", value: joinedDate },
                                    { icon: Crown, label: "Role", value: user?.role || "user" },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                                        <div className="rounded-xl bg-orange-500/10 p-2"><Icon className="h-4 w-4 text-orange-400" /></div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
                                            <p className="mt-1 truncate text-sm text-white">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Right */}
                    <section className="space-y-6">
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <h3 className="text-xl font-black mb-1">Personal Information</h3>
                            <p className="text-sm text-slate-400 mb-6">Your current account details and identity information.</p>
                            <div className="grid gap-4 md:grid-cols-2">
                                {[
                                    { title: "User ID", value: user?._id || "Not available", breakAll: true },
                                    { title: "Account Role", value: user?.role || "user", capitalize: true },
                                    { title: "Email Address", value: user?.email || "Not available" },
                                    { title: "Contact Number", value: user?.contact || "Not added yet" },
                                ].map((info) => (
                                    <div key={info.title} className="rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{info.title}</p>
                                        <p className={`mt-2 text-sm text-white ${info.breakAll ? "break-all" : ""} ${info.capitalize ? "capitalize" : ""}`}>{info.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-6 xl:grid-cols-2">
                            {/* Session */}
                            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h3 className="text-xl font-black mb-1">Current Session</h3>
                                <p className="text-sm text-slate-400 mb-6">Basic visibility into your latest session</p>
                                {currentSession ? (
                                    <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-5">
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-2xl bg-orange-500/10 p-3"><Monitor className="h-5 w-5 text-orange-400" /></div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-black">{currentSession?.device || "Unknown Device"}</p>
                                                <p className="mt-1 text-xs text-slate-400">{currentSession?.browser || "Unknown Browser"}</p>
                                                <p className="mt-2 text-xs text-slate-400">{currentSession?.location || "Unknown Location"}</p>
                                                <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                                                    <Clock3 className="h-3.5 w-3.5" />{currentSession?.lastActive || "Active now"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-800/40 p-6 text-sm text-slate-400">No session details available yet.</div>
                                )}
                            </div>

                            {/* Connected accounts */}
                            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h3 className="text-xl font-black mb-1">Connected Accounts</h3>
                                <p className="text-sm text-slate-400 mb-6">Linked providers and sign-in methods</p>
                                <div className="space-y-3">
                                    {connectedAccounts.length > 0 ? connectedAccounts.map((account, i) => (
                                        <div key={account?._id || i} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-2xl bg-orange-500/10 p-2"><Link2 className="h-5 w-5 text-orange-400" /></div>
                                                <div>
                                                    <p className="text-sm font-black">{account?.provider || "Connected Provider"}</p>
                                                    <p className="text-xs text-slate-400">{account?.email || "No linked email"}</p>
                                                </div>
                                            </div>
                                            <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-300">Connected</span>
                                        </div>
                                    )) : (
                                        <>
                                            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                                                <div className="flex items-center gap-3"><div className="rounded-2xl bg-white/5 p-2"><CircleUserRound className="h-5 w-5 text-slate-300" /></div><div><p className="text-sm font-black">Google</p><p className="text-xs text-slate-400">Not connected</p></div></div>
                                                <span className="rounded-full bg-slate-500/10 px-3 py-1 text-xs font-bold text-slate-300">Basic</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                                                <div className="flex items-center gap-3"><div className="rounded-2xl bg-white/5 p-2"><Shield className="h-5 w-5 text-slate-300" /></div><div><p className="text-sm font-black">Email Login</p><p className="text-xs text-slate-400">Available</p></div></div>
                                                <span className="rounded-full bg-slate-500/10 px-3 py-1 text-xs font-bold text-slate-300">Basic</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Verification */}
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <h3 className="text-xl font-black mb-1">Verification & Status</h3>
                            <p className="text-sm text-slate-400 mb-6">Trust and security state of your account</p>
                            <div className="grid gap-4 md:grid-cols-3">
                                {[
                                    { icon: Mail, title: "Email Verification", value: emailVerified ? "Verified" : "Pending", tone: emailVerified ? "teal" : "yellow" },
                                    { icon: Phone, title: "Phone Badge", value: phoneAdded ? "Added" : "Missing", tone: phoneAdded ? "blue" : "slate" },
                                    { icon: Shield, title: "Account Status", value: "Active", tone: "teal" },
                                ].map((s) => {
                                    const Icon = s.icon;
                                    const toneMap = { teal: "bg-teal-500/10 text-teal-300", yellow: "bg-yellow-500/10 text-yellow-300", blue: "bg-blue-500/10 text-blue-300", slate: "bg-slate-500/10 text-slate-300" };
                                    return (
                                        <div key={s.title} className="rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-2xl bg-orange-500/10 p-2"><Icon className="h-5 w-5 text-orange-400" /></div>
                                                <div>
                                                    <p className="text-sm font-black">{s.title}</p>
                                                    <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${toneMap[s.tone]}`}>{s.value}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
