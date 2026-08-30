"use client";

import { useEffect } from "react";
import {
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "@/store/slices/toast.slice";

export default function GlobalToast() {
    const { show, type, message } = useSelector((state) => state.toast);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!show) return;
        const timer = setTimeout(() => dispatch(hideToast()), 2500);
        return () => clearTimeout(timer);
    }, [show, dispatch]);

    if (!show) return null;

    const config = {
        success: {
            icon: CheckCircleIcon,
            iconColor: "text-orange-500",
            iconBg: "bg-orange-50",
            border: "border-orange-200",
            side: "before:bg-orange-500",
        },
        error: {
            icon: XCircleIcon,
            iconColor: "text-rose-500",
            iconBg: "bg-rose-50",
            border: "border-rose-200",
            side: "before:bg-rose-500",
        },
        warning: {
            icon: ExclamationTriangleIcon,
            iconColor: "text-amber-500",
            iconBg: "bg-amber-50",
            border: "border-amber-200",
            side: "before:bg-amber-500",
        },
    };

    const toastType = config[type] || config.success;
    const Icon = toastType.icon;

    return (
        <div className="pointer-events-none fixed right-4 top-5 z-[9999] sm:right-6">
            <div className="pointer-events-auto animate-toastIn">
                <div
                    className={`relative flex min-w-[320px] max-w-md items-center gap-4 overflow-hidden rounded-2xl border bg-white px-4 py-4 shadow-xl ${toastType.border} before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 ${toastType.side}`}
                >
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${toastType.iconBg}`}>
                        <Icon className={`h-6 w-6 ${toastType.iconColor}`} />
                    </div>
                    <div className="min-w-0 flex-1 pr-2">
                        <p className="truncate text-sm font-black text-slate-900">
                            {type === "success" ? "Success" : type === "error" ? "Error" : "Warning"}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">{message}</p>
                    </div>
                    <button
                        onClick={() => dispatch(hideToast())}
                        className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
