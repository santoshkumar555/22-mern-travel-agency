"use client";

import { useState } from "react";
import { Send, Globe2, Headphones } from "lucide-react";
import GlassCard from "@/components/common/GlassCard";

const inputCls = "h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none transition placeholder:text-white/35 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/15";

export default function ContactFormSection() {
    const [form, setForm] = useState({ name: "", email: "", destination: "", phone: "", message: "" });
    const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    const handleSubmit = (e) => { e.preventDefault(); console.log("Contact Form:", form); };

    return (
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="space-y-6">
                <GlassCard className="p-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-400">Why Reach Out</p>
                    <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">We're here to make travel feel seamless.</h2>
                    <p className="mt-5 leading-8 text-white/65">Whether you need help choosing a destination, planning a luxury getaway, or completing a booking, our team is here to assist you.</p>
                </GlassCard>

                <div className="grid gap-6 sm:grid-cols-2">
                    <GlassCard className="p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-300/20 bg-teal-300/10">
                            <Globe2 className="h-6 w-6 text-teal-300" />
                        </div>
                        <h3 className="mt-4 text-xl font-black text-white">Custom destination help</h3>
                        <p className="mt-3 leading-7 text-white/65">Ask us about destinations, stays, packages, and the best travel fit for your style.</p>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-300/20 bg-orange-300/10">
                            <Headphones className="h-6 w-6 text-orange-300" />
                        </div>
                        <h3 className="mt-4 text-xl font-black text-white">Reliable support</h3>
                        <p className="mt-3 leading-7 text-white/65">Get quick help for bookings, payments, travel details, and trip planning questions.</p>
                    </GlassCard>
                </div>
            </div>

            <GlassCard className="p-6 md:p-8">
                <div className="mb-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-400">Send a Message</p>
                    <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">Tell us about your next trip</h2>
                    <p className="mt-3 text-white/65">Fill out the form and our team will get back to you with the right guidance.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-bold text-white/80">Full Name</label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" className={inputCls} />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-bold text-white/80">Email Address</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" className={inputCls} />
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-bold text-white/80">Preferred Destination</label>
                            <input type="text" name="destination" value={form.destination} onChange={handleChange} placeholder="e.g. Bali, Greece, Turkey" className={inputCls} />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-bold text-white/80">Phone Number</label>
                            <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" className={inputCls} />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-bold text-white/80">Message</label>
                        <textarea name="message" rows={6} value={form.message} onChange={handleChange} placeholder="Tell us what kind of trip you are planning..."
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/15" />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <p className="max-w-md text-sm leading-7 text-white/55">By sending this message, you allow us to contact you regarding your travel inquiry.</p>
                        <button type="submit"
                            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-900/50 transition hover:bg-orange-600">
                            Send Inquiry <Send className="h-4 w-4" />
                        </button>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
}
