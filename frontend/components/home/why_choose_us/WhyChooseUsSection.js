import { ShieldCheck, Headphones, Hotel, Sparkles } from "lucide-react";
import WhyChooseUsCard from "./WhyChooseUsCard";

const features = [
    {
        icon: Sparkles,
        title: "Curated Premium Experiences",
        description:
            "Every journey is crafted with destination quality, comfort, and premium moments in mind so travelers enjoy a seamless and elevated holiday experience.",
        badge: "Luxury",
        highlighted: true,
        points: [
            "Handpicked package combinations",
            "Destination-first premium planning",
            "Luxury feel from discovery to booking",
        ],
    },
    {
        icon: Hotel,
        title: "Handpicked Stays & Comfortable Hotels",
        description:
            "We focus on quality stays and thoughtful hospitality choices so every trip feels polished, trustworthy, and worth remembering.",
        badge: "Stay",
        points: [
            "Trusted hotels and premium stays",
            "Comfort-focused travel experiences",
            "Better accommodation curation",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Secure & Reliable Booking Experience",
        description:
            "From clear package information to a dependable booking flow, our platform is built to create confidence at every step of the travel journey.",
        badge: "Trust",
        points: [
            "Transparent package details",
            "Secure and structured booking flow",
            "Built for traveler confidence",
        ],
    },
    {
        icon: Headphones,
        title: "Responsive Support When You Need It",
        description:
            "Travel feels better when support is accessible. Our platform experience is designed to feel smooth, responsive, and helpful from start to finish.",
        badge: "Support",
        points: [
            "Easy support-first experience",
            "Traveler-friendly assistance flow",
            "Help across package discovery and booking",
        ],
    },
];

export default function WhyChooseUsSection() {
    return (
        <section className="bg-slate-900 text-white py-24 md:py-32 px-6 md:px-12 rounded-[2.5rem] mx-4 md:mx-12 my-12 shadow-2xl relative overflow-hidden">
            {/* Ambient blobs */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply opacity-20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply opacity-20 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="px-4 py-1.5 bg-slate-800 text-orange-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                        Our Promise
                    </p>
                    <h2 className="font-black text-4xl md:text-5xl leading-[1.1] max-w-3xl mx-auto">
                        Designed For{" "}
                        <span className="text-orange-400 underline decoration-teal-500 decoration-4 underline-offset-8">
                            Premium Journeys,
                        </span>{" "}
                        Built For Peace Of Mind
                    </h2>
                    <p className="mt-5 text-base leading-8 text-slate-400 md:text-lg max-w-2xl mx-auto">
                        We don&apos;t just list destinations — we create a more polished travel discovery experience with trusted stays, curated packages, secure booking flow, and premium visual storytelling.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {features.map((item) => (
                        <WhyChooseUsCard
                            key={item.title}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            badge={item.badge}
                            highlighted={item.highlighted}
                            points={item.points}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
