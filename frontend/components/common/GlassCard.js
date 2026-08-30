export default function GlassCard({ children, className = "" }) {
    return (
        <div className={`rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.26)] backdrop-blur-xl ${className}`}>
            {children}
        </div>
    );
}
