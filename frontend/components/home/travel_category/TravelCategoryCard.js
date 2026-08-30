import Link from "next/link";
import Image from "next/image";
import { Mountain, Sun, Map, Heart, Users, Star, Gem, PawPrint, Sparkles, Building2, Camera, Waves } from "lucide-react";

const moodIcons = {
    Adventure: Mountain,
    Relaxation: Sun,
    Cultural: Map,
    Romantic: Heart,
    Family: Users,
    Luxury: Gem,
    Honeymoon: Sparkles,
    Wildlife: PawPrint,
    Wellness: Star,
    City: Building2,
    Scenic: Camera,
    Beach: Waves,
};

export default function TravelCategoryCard({ title, subtitle, image, href }) {
    const Icon = moodIcons[title] || Star;

    return (
        <Link
            href={href}
            className="relative min-w-[280px] md:min-w-0 h-[280px] rounded-[2rem] overflow-hidden snap-center group cursor-pointer shrink-0 shadow-lg border border-sky-100"
        >
            <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 280px, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-900/35 group-hover:bg-slate-900/45 transition-colors duration-300" />

            <div className="absolute inset-x-0 bottom-0 px-6 pb-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-orange-400" />
                    <p className="text-sm text-white/80 font-bold uppercase tracking-widest">{subtitle}</p>
                </div>
                <h3 className="font-black text-2xl drop-shadow-md">{title}</h3>
                <div className="mt-2 h-0.5 w-16 bg-orange-500 transition-all duration-500 group-hover:w-full" />
            </div>
        </Link>
    );
}