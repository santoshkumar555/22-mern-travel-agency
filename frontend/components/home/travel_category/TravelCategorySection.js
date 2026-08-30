import TravelCategoryCard from "./TravelCategoryCard";

const categories = [
    { title: "Adventure", subtitle: "Thrill-filled escapes", image: "/hero1.jpg", href: "/packages?tripType=adventure", },
    { title: "Relaxation", subtitle: "Peaceful coastal retreats", image: "/hero2.jpg", href: "/packages?tripType=relaxation", },
    { title: "Cultural", subtitle: "Immersive local experiences", image: "/hero4.jpg", href: "/packages?tripType=cultural", },
    { title: "Romantic", subtitle: "Memorable getaways for couples", image: "/package_hero1.webp", href: "/packages?search=romantic", },
    { title: "Family", subtitle: "Comfortable trips for everyone", image: "/package_hero2.jpg", href: "/packages?search=family", },
    { title: "Luxury", subtitle: "Premium stays and refined journeys", image: "/package_hero3.jpg", href: "/packages?search=luxury", },
    { title: "Honeymoon", subtitle: "Romantic escapes for two", image: "/hero3.jpg", href: "/packages?tripType=honeymoon", },
    { title: "Wildlife", subtitle: "Into the wild and untamed", image: "/hero1.jpg", href: "/packages?tripType=wildlife", },
    { title: "Wellness", subtitle: "Rejuvenate mind, body and soul", image: "/hero2.jpg", href: "/packages?tripType=wellness", },
    { title: "City", subtitle: "Urban escapes and city breaks", image: "/hero4.jpg", href: "/packages?tripType=city", },
    { title: "Scenic", subtitle: "Breathtaking landscapes and views", image: "/package_hero2.jpg", href: "/packages?tripType=scenic", },
    { title: "Beach", subtitle: "Sun, sand and shoreline bliss", image: "/package_hero3.jpg", href: "/packages?tripType=beach", },
];

export default function TravelCategoriesSection() {
    return (
        <section id="moods" className="relative overflow-hidden bg-white py-24 md:py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                        Travel Elements
                    </p>
                    <h2 className="font-black text-4xl md:text-5xl text-slate-900 leading-tight">
                        Choose A Journey That{" "}
                        <br />
                        <span className="text-orange-500 underline decoration-teal-400 decoration-4 underline-offset-8">
                            Matches Your Mood
                        </span>
                    </h2>
                    <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg max-w-2xl mx-auto">
                        Whether you want relaxation, romance, adventure, or cultural depth, discover beautifully curated journeys shaped around how you want to travel.
                    </p>
                </div>

                {/* Horizontal scroll on mobile, grid on desktop */}
                <div className="flex overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar gap-6 md:grid md:grid-cols-2 xl:grid-cols-3 md:[&>*]:h-[280px]">
                    {categories.map((category) => (
                        <TravelCategoryCard
                            key={category.title}
                            title={category.title}
                            subtitle={category.subtitle}
                            image={category.image}
                            href={category.href}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
