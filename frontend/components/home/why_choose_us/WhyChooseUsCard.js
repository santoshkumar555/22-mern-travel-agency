import { CheckCircle2 } from "lucide-react";

export default function WhyChooseUsCard({
    icon: Icon,
    title,
    description,
    badge,
    highlighted = false,
    points = [],
}) {
    return (
        <article className="space-y-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md border ${highlighted
                    ? "bg-orange-500 text-white border-orange-400"
                    : "bg-slate-800 text-teal-400 border-slate-700"
                }`}>
                <Icon className="w-6 h-6" />
            </div>

            {badge && (
                <span className="inline-block rounded-full bg-slate-800 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {badge}
                </span>
            )}

            <h3 className="text-xl font-black text-white leading-tight">{title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{description}</p>

            {points.length > 0 && (
                <div className="space-y-2 pt-1">
                    {points.map((point) => (
                        <div key={point} className="flex items-start gap-3 text-sm text-slate-400">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                            <span>{point}</span>
                        </div>
                    ))}
                </div>
            )}
        </article>
    );
}
