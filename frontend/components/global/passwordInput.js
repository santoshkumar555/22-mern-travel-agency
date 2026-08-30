"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
    label, name, value, onChange, onBlur, placeholder, error, touched,
    disabled = false, autoComplete = "current-password", rightLabel = null,
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            {(label || rightLabel) && (
                <div className="mb-2 flex items-center justify-between">
                    {label ? <label className="block text-sm font-bold text-slate-200">{label}</label> : <span />}
                    {rightLabel}
                </div>
            )}
            <div className="relative">
                <input name={name} type={showPassword ? "text" : "password"} value={value} onChange={onChange} onBlur={onBlur}
                    disabled={disabled} autoComplete={autoComplete} placeholder={placeholder}
                    className={`w-full rounded-2xl border bg-white/10 px-4 py-3 pr-12 text-white placeholder:text-slate-400 outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70 ${error && touched ? "border-red-400 focus:ring-red-400/20" : "border-white/10 focus:border-orange-400/70 focus:ring-orange-400/15"}`} />
                <button type="button" onClick={() => setShowPassword((p) => !p)} disabled={disabled}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 transition hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-60">
                    {showPassword ? <EyeOff className="h-5 w-5 stroke-current" /> : <Eye className="h-5 w-5 stroke-current" />}
                </button>
            </div>
            {error && touched && <p className="mt-2 text-sm text-red-300">{error}</p>}
        </div>
    );
}
