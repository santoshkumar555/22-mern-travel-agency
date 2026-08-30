"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import GlassCard from "@/components/common/GlassCard";

const faqs = [
    {
        question: "Can I request a custom travel package?",
        answer: "Yes. You can contact us with your destination, budget, travel style, and dates, and we will craft a personalised itinerary suited to your needs.",
    },
    {
        question: "Do you offer support after booking?",
        answer: "Yes. Our team remains available throughout your journey to assist with booking questions, itinerary changes, and any trip-related concerns that arise.",
    },
    {
        question: "Can I cancel my booking?",
        answer: "Yes, subject to the cancellation policy attached to your package. Visit your My Bookings page to view available actions and any applicable refund timelines.",
    },
    {
        question: "How quickly will I receive a response?",
        answer: "During business hours we typically respond within a few hours. For urgent matters, you can reach us directly using the contact details listed on the Contact page.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards, net banking, and UPI through our secure Razorpay payment gateway. All transactions are encrypted end-to-end.",
    },
    {
        question: "Are flights included in your travel packages?",
        answer: "Flight inclusion varies by package. Each package listing clearly states what is covered. If you need a package with flights added, contact us to arrange a custom quote.",
    },
    {
        question: "Is travel insurance available?",
        answer: "We strongly recommend travel insurance for all trips. While we do not sell policies directly, we can recommend reputable providers suited to your destination and trip length.",
    },
    {
        question: "Can I modify my booking after it is confirmed?",
        answer: "Minor modifications such as updating passenger details may be possible before departure. Significant changes like date shifts depend on availability and may incur an amendment fee.",
    },
    {
        question: "How far in advance should I book?",
        answer: "We recommend booking at least four to six weeks ahead for domestic trips and two to three months ahead for international destinations to secure the best availability and pricing.",
    },
    {
        question: "Do your packages cover visa assistance?",
        answer: "We provide guidance on visa requirements and documentation for your destination. Final visa approval rests with the respective embassy or consulate, and fees are the traveller's responsibility.",
    },
    {
        question: "Are your packages suitable for families with children?",
        answer: "Absolutely. Many of our packages are family-friendly and include child-appropriate activities and accommodation. Filter by the Family category or contact us to find the best fit.",
    },
    {
        question: "What happens if my trip is disrupted by an unforeseen event?",
        answer: "In the event of disruptions such as weather emergencies or flight cancellations, our support team will work with you to rebook, reroute, or process a refund in line with the package terms.",
    },
];

export default function ContactFAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div>
            <SectionHeading
                badge="FAQ"
                title="Common questions from travelers"
                description="A few quick answers about support, custom planning, and booking help."
            />
            <div className="mx-auto mt-10 max-w-4xl space-y-4">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <GlassCard key={faq.question} className={`group overflow-hidden border transition-all duration-300 ${isOpen ? "border-orange-400/30 bg-white/[0.07]" : "border-white/10 bg-white/[0.04] hover:border-orange-400/20"}`}>
                            <button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                                <span className="text-lg font-black text-white">{faq.question}</span>
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                                    <ChevronDown className={`h-5 w-5 shrink-0 text-orange-400 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "rotate-180" : ""}`} />
                                </div>
                            </button>
                            <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                <div className="overflow-hidden">
                                    <div className="px-6 pb-6 text-[15px] leading-7 text-white/65">{faq.answer}</div>
                                </div>
                            </div>
                        </GlassCard>
                    );
                })}
            </div>
        </div>
    );
}
