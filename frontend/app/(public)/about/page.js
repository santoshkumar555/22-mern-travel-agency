import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutValues from "@/components/about/AboutValues";
import AboutTeam from "@/components/about/AboutTeam";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-slate-900 text-white">
            {/* Ambient blobs */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-600 opacity-15 blur-3xl mix-blend-multiply" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-teal-500 opacity-10 blur-3xl mix-blend-multiply" />
            </div>
            <div className="relative mx-auto max-w-7xl space-y-20 px-4 pb-20 pt-28 md:px-6 lg:px-8">
                <AboutHero />
                <AboutStats />
                <AboutValues />
                <AboutTeam />
                <AboutCTA />
            </div>
        </section>
    );
}
