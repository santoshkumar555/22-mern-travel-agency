import ContactHero from "@/components/contact/ContactHero";
import ContactInfoGrid from "@/components/contact/ContactInfoGrid";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactFAQ from "@/components/contact/ContactFAQ";
import ContactMapSection from "@/components/contact/ContactMapSection";
import ContactCTA from "@/components/contact/ContactCTA";

export default function ContactPage() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-slate-900 text-white">
            {/* Ambient blobs */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-600 opacity-15 blur-3xl mix-blend-multiply" />
                <div className="absolute bottom-1/3 right-0 h-96 w-96 rounded-full bg-teal-500 opacity-10 blur-3xl mix-blend-multiply" />
            </div>
            <div className="relative mx-auto max-w-7xl space-y-16 px-4 pb-20 pt-28 md:px-6 lg:px-8">
                <ContactHero />
                <ContactInfoGrid />
                <ContactFormSection />
                <ContactFAQ />
                <ContactMapSection />
                <ContactCTA />
            </div>
        </section>
    );
}
