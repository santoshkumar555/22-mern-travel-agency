"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, BriefcaseBusiness, Search, ChevronDown, Check } from "lucide-react";
import { useDispatch } from "react-redux";
import { createSlug } from "@/lib/utils/slug";
import SearchSelect from "./SearchSelect";
import { showToast } from "@/store/slices/toast.slice";

export default function HeroSearchClient({ packages = [], locations = [] }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const locationOptions = useMemo(() =>
        locations.map((l) => ({ ...l, slug: createSlug(l.name) })),
        [locations]
    );

    const filteredPackages = useMemo(() => {
        if (!selectedLocation) return packages;
        return packages.filter(
            (p) => createSlug(p.location?.name || "") === selectedLocation.slug
        );
    }, [packages, selectedLocation]);

    const packageOptions = useMemo(() =>
        filteredPackages.map((p) => ({
            ...p,
            slug: createSlug(p.title),
            subtitle: `${p.duration} Days`,
        })),
        [filteredPackages]
    );

    const handleLocationChange = (loc) => {
        setSelectedLocation(loc);
        setSelectedPackage(null);
    };

    const handleFindNow = () => {
        const query = new URLSearchParams();
        if (!selectedLocation && !selectedPackage) {
            dispatch(showToast({ message: "Please select a destination or package first.", type: "warning" }));
            return;
        }
        if (selectedPackage?.slug) {
            dispatch(showToast({ message: `Opening ${selectedPackage.title}.`, type: "success" }));
            query.set("package", selectedPackage.slug);
        }
        if (selectedLocation?.slug) {
            query.set("location", selectedLocation.slug);
            if (!selectedPackage?.slug)
                dispatch(showToast({ message: `Showing packages for ${selectedLocation.name}.`, type: "success" }));
        }
        router.push(`/packages?${query.toString()}`);
    };

    /**
     * Layout architecture
     * ─────────────────────────────────────────────────────────────────────────
     * The root element is a flex container (column on mobile, row on desktop).
     * It has NO shared background — it is transparent, acting purely as a
     * spacing wrapper.  Each child is fully self-contained:
     *
     *   ┌──────────────────────────┬──────────────────────────┬─────────────┐
     *   │  Destination pill        │  Package pill            │  Find Now   │
     *   │  (overflow-visible ✓)    │  (overflow-visible ✓)    │  button     │
     *   │  Dropdown escapes freely │  Dropdown escapes freely │  (contained)│
     *   └──────────────────────────┴──────────────────────────┴─────────────┘
     *
     * Each search pill is an independent rounded card with its own background,
     * border and overflow-visible — so the dropdown can escape without any
     * parent needing to be overflow-hidden.  The button is a plain flex child
     * with no overflow conflict at all.
     *
     * No shared white card → no overflow contradiction → no layout regression.
     * ─────────────────────────────────────────────────────────────────────────
     */
    return (
        <div className="relative z-30 mt-10 w-full max-w-4xl px-2">
            {/* Row wrapper — column-stacked on mobile, single row on md+ */}
            <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2">

                {/* Fixed width — destination names are short; a fixed 220px column
            prevents it from consuming space the package pill needs for long titles */}
                <div className="relative shrink-0 overflow-visible rounded-2xl border border-white/25 bg-white shadow-[0_8px_32px_rgba(15,23,42,0.18)] md:w-[220px]">
                    {/* Label badge — sits above the input area, fully visible */}
                    <div className="absolute -top-3 left-4 z-10">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm shadow-orange-300/50">
                            <MapPin className="h-3 w-3" />
                            Destination
                        </span>
                    </div>
                    {/* SearchSelect fills the pill */}
                    <div className="overflow-visible pt-2">
                        <SearchSelect
                            label=""
                            placeholder="Where do you want to go?"
                            options={locationOptions}
                            value={selectedLocation}
                            onChange={handleLocationChange}
                            displayKey="name"
                        />
                    </div>
                </div>

                {/* ── Package pill — flex-1 so it absorbs all remaining width ───── */}
                <div className="relative flex-1 overflow-visible rounded-2xl border border-white/25 bg-white shadow-[0_8px_32px_rgba(15,23,42,0.18)]">
                    <div className="absolute -top-3 left-4 z-10">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm">
                            <BriefcaseBusiness className="h-3 w-3" />
                            Package
                        </span>
                    </div>
                    <div className="overflow-visible pt-2">
                        <SearchSelect
                            label=""
                            placeholder="Choose a package"
                            options={packageOptions}
                            value={selectedPackage}
                            onChange={(pkg) => setSelectedPackage(pkg)}
                            displayKey="title"
                            subTextKey="subtitle"
                        />
                    </div>
                </div>

                {/* ── Find Now button ───────────────────────────────────────────── */}
                {/* Self-contained — no shared overflow context with the pills above.
            rounded-2xl matches the pill radius exactly. mt-4 on mobile provides
            the same visual spacing as the pill's label badge height (~12px badge
            + ~4px gap). On md+, the button stretches to match the pills' height
            via items-stretch on the row wrapper. */}
                <button
                    onClick={handleFindNow}
                    className="mt-4 flex shrink-0 items-center justify-center gap-2.5 rounded-2xl bg-orange-500 px-8 py-5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_32px_rgba(249,115,22,0.35)] transition-all duration-200 hover:bg-orange-600 hover:shadow-[0_12px_40px_rgba(249,115,22,0.45)] active:scale-[0.98] whitespace-nowrap md:mt-0 md:min-w-[160px]"
                >
                    <Search className="h-4 w-4 shrink-0" />
                    Find Now
                </button>

            </div>
        </div>
    );
}