"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Menu,
    X,
    User,
    LogOut,
    BookOpen,
    ChevronDown,
    Settings,
    CalendarDays,
    Heart,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { useAppSelector } from "@/store/hooks";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "Packages", href: "/packages" },
    { name: "Hotels", href: "/hotels" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const { user, logout, isAuthenticated, loading } = useAuth();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const profileRef = useRef(null);
    const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
        setProfileOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target))
                setProfileOpen(false);
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

    const handleLogout = () => {
        setProfileOpen(false);
        setMobileMenuOpen(false);
        logout();
    };

    const getInitial = (name) => name?.trim()?.charAt(0)?.toUpperCase() || "U";
    const imageUrl = user?.image?.url || "";

    if (loading) return null;

    const scrolled = isScrolled;

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                        ? "bg-white shadow-sm border-b border-sky-100 py-4"
                        : "bg-transparent py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-md shadow-orange-200">
                            <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45" />
                        </div>
                        <span
                            className={`text-2xl font-black tracking-tight transition-colors ${scrolled ? "text-slate-900" : "text-white"
                                }`}
                        >
                            TRAVELNEST
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden xl:flex gap-8 items-center">
                        {navigation.map((item) => {
                            const isActive =
                                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`text-sm font-bold transition-colors ${isActive
                                            ? "text-orange-500"
                                            : scrolled
                                                ? "text-slate-600 hover:text-orange-500"
                                                : "text-white/90 hover:text-orange-300"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop Right */}
                    <div className="hidden xl:flex items-center gap-3">
                        {/* Wishlist */}
                        <Link
                            href="/wishlist"
                            className={`relative inline-flex items-center justify-center h-11 w-11 rounded-full border transition ${scrolled
                                    ? "border-slate-200 bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                                    : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                                }`}
                        >
                            <Heart className="h-5 w-5" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white shadow">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/my-bookings"
                                    className={`rounded-full border px-4 py-2.5 text-sm font-bold transition ${scrolled
                                            ? "border-slate-200 bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                                            : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                                        }`}
                                >
                                    My Bookings
                                </Link>

                                <div className="relative z-50" ref={profileRef}>
                                    <button
                                        type="button"
                                        onClick={() => setProfileOpen((p) => !p)}
                                        className={`flex items-center gap-3 rounded-full border px-2 py-1.5 pr-3 transition ${scrolled
                                                ? "border-slate-200 bg-slate-50 text-slate-700 hover:bg-orange-50"
                                                : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                                            }`}
                                    >
                                        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-orange-100 ring-1 ring-orange-200">
                                            {imageUrl ? (
                                                <Image src={imageUrl} alt={user?.name || "User"} fill className="object-cover" sizes="40px" />
                                            ) : (
                                                <span className="text-sm font-black text-orange-600">{getInitial(user?.name)}</span>
                                            )}
                                        </div>
                                        <p className="truncate max-w-[7rem] text-sm font-bold">{user?.name}</p>
                                        <ChevronDown className={`h-4 w-4 transition ${profileOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    {/* Dropdown */}
                                    <div
                                        className={`absolute right-0 top-[calc(100%+12px)] w-72 rounded-3xl border border-sky-100 bg-white p-3 shadow-xl transition-all duration-200 ${profileOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                                            }`}
                                    >
                                        <div className="mb-3 rounded-2xl bg-sky-50 p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-orange-100">
                                                    {imageUrl ? (
                                                        <Image src={imageUrl} alt={user?.name || "User"} fill className="object-cover" sizes="48px" />
                                                    ) : (
                                                        <span className="text-sm font-black text-orange-600">{getInitial(user?.name)}</span>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-black text-slate-900">{user?.name}</p>
                                                    <p className="truncate text-xs text-slate-500">{user?.email}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            {[
                                                { href: "/profile", icon: User, label: "My Profile" },
                                                { href: "/my-bookings", icon: BookOpen, label: "My Bookings" },
                                                { href: "/account-settings", icon: Settings, label: "Account Settings" },
                                            ].map(({ href, icon: Icon, label }) => (
                                                <Link
                                                    key={href}
                                                    href={href}
                                                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
                                                >
                                                    <Icon className="h-4 w-4" />
                                                    {label}
                                                </Link>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className={`rounded-full border px-4 py-2.5 text-sm font-bold transition ${scrolled
                                            ? "border-slate-200 bg-white text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                                            : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                                        }`}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
                                >
                                    Create Account
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className={`xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border transition ${scrolled
                                ? "border-slate-200 bg-slate-50 text-slate-700"
                                : "border-white/20 bg-white/10 text-white"
                            }`}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </header>

            {/* Mobile overlay */}
            <div
                className={`fixed inset-0 z-[1200] bg-black/60 backdrop-blur-sm transition-all duration-300 xl:hidden ${mobileMenuOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
                    }`}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile drawer */}
            <aside
                className={`fixed right-0 top-0 z-[1300] flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-500 xl:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between border-b border-sky-100 px-5 py-5">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
                            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-900">TRAVELNEST</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(false)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-orange-50 hover:text-orange-500"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {isAuthenticated && (
                    <div className="border-b border-sky-100 p-5">
                        <div className="rounded-3xl border border-sky-100 bg-sky-50 p-4">
                            <div className="flex items-center gap-3">
                                <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-orange-100">
                                    {imageUrl ? (
                                        <Image src={imageUrl} alt={user?.name || "User"} fill className="object-cover" sizes="56px" />
                                    ) : (
                                        <span className="text-base font-black text-orange-600">{getInitial(user?.name)}</span>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-base font-black text-slate-900">{user?.name}</p>
                                    <p className="truncate text-sm text-slate-500">{user?.email}</p>
                                </div>
                            </div>
                            <Link
                                href="/packages"
                                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
                            >
                                <CalendarDays className="mr-2 h-4 w-4" />
                                Plan My Trip
                            </Link>
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto px-5 py-5">
                    <div className="space-y-1">
                        <Link
                            href="/wishlist"
                            className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-bold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
                        >
                            <div className="flex items-center gap-3">
                                <Heart className="h-5 w-5 text-orange-500" />
                                <span>Wishlist</span>
                            </div>
                            {wishlistCount > 0 && (
                                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[10px] font-bold text-white">
                                    {wishlistCount > 99 ? "99+" : wishlistCount}
                                </span>
                            )}
                        </Link>

                        {navigation.map((item, index) => {
                            const isActive =
                                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center rounded-2xl px-4 py-3.5 text-[15px] font-bold transition-all duration-300 ${isActive
                                            ? "bg-orange-50 text-orange-600"
                                            : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                                        }`}
                                    style={{
                                        transitionDelay: mobileMenuOpen ? `${index * 60}ms` : "0ms",
                                        transform: mobileMenuOpen ? "translateX(0)" : "translateX(20px)",
                                        opacity: mobileMenuOpen ? 1 : 0,
                                    }}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-6 rounded-3xl border border-sky-100 bg-sky-50 p-4">
                        {isAuthenticated ? (
                            <div className="space-y-1">
                                {[
                                    { href: "/profile", icon: User, label: "My Profile" },
                                    { href: "/my-bookings", icon: BookOpen, label: "My Bookings" },
                                    { href: "/account-settings", icon: Settings, label: "Account Settings" },
                                ].map(({ href, icon: Icon, label }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-white hover:text-orange-600"
                                    >
                                        <Icon className="h-5 w-5 text-orange-500" />
                                        {label}
                                    </Link>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50"
                                >
                                    <LogOut className="h-5 w-5" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <Link
                                    href="/login"
                                    className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-600"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="block rounded-2xl bg-orange-500 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
                                >
                                    Create Account
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
