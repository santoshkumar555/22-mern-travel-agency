"use client";

import Link from "next/link";
import { PhoneCall, Mail, MapPin, ChevronRight } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const contactItems = [
    { id: 1, title: "Call us", value: "+1 123-456-0606", icon: PhoneCall },
    { id: 2, title: "Write to us", value: "info@travolagency.com", icon: Mail },
    { id: 3, title: "Address", value: "24 King St, SC 29401 USA", icon: MapPin },
];

const footerLinks = [
    { id: 1, name: "About", href: "/about" },
    { id: 2, name: "Tours", href: "/packages" },
    { id: 3, name: "Destinations", href: "/destinations" },
    { id: 4, name: "Contact", href: "/contact" },
];

const socialLinks = [
    { id: 1, icon: FaInstagram, href: "/" },
    { id: 2, icon: FaTwitter, href: "/" },
    { id: 3, icon: FaFacebookF, href: "/" },
    { id: 4, icon: FaYoutube, href: "/" },
];

export default function Footer() {
    return (
        <footer id="contact" className="bg-slate-900 pt-24 pb-8 px-6 md:px-12 relative overflow-hidden">
            {/* Ambient blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-900 rounded-full mix-blend-multiply opacity-20 blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-900 rounded-full mix-blend-multiply opacity-10 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Contact strip */}
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {contactItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.id}
                                    className={`group flex items-center gap-5 px-8 py-7 transition ${index !== contactItems.length - 1
                                            ? "border-b border-white/10 md:border-b-0 md:border-r"
                                            : ""
                                        }`}
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-900/50 transition group-hover:scale-110">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-black text-white/90">{item.title}</h3>
                                        <p className="mt-1 text-sm text-white/55">{item.value}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main footer grid */}
                <div className="grid grid-cols-1 gap-14 py-4 md:grid-cols-2 lg:grid-cols-3 mb-16">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
                                <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-white">TRAVELNEST</span>
                        </Link>

                        <p className="mt-6 max-w-md leading-7 text-white/55 text-sm">
                            Discover curated destinations, premium stays, and unforgettable journeys crafted for travelers who seek more than just trips.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            {socialLinks.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:scale-110 hover:bg-orange-500 hover:text-white hover:border-orange-500"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="lg:mx-auto">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            {footerLinks.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={item.href}
                                        className="text-sm font-bold text-slate-300 transition hover:text-orange-400"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Stay Updated</h3>
                        <p className="text-sm text-slate-400 leading-7 mb-6">
                            Join our newsletter for exclusive premium offers and inspiration.
                        </p>
                        <div className="flex items-center">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-slate-800 w-full rounded-l-2xl px-4 py-3 placeholder:text-slate-500 text-white outline-none border-none focus:ring-2 focus:ring-orange-500 text-sm"
                            />
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-r-2xl flex items-center justify-center transition">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 text-[10px] text-slate-500 font-bold uppercase tracking-widest gap-4">
                    <p>© {new Date().getFullYear()} TravelNest. Licensed by World Tourism Org.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition">Privacy</Link>
                        <Link href="#" className="hover:text-white transition">Terms</Link>
                        <Link href="#" className="hover:text-white transition">Support</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
