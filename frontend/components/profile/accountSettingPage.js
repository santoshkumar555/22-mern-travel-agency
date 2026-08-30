"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BadgeCheck, CalendarDays, Camera, CheckCircle2, Clock3, Link2, Loader2, LogOut, Mail, Monitor, Phone, Save, Shield, Smartphone, Trash2, User, LockKeyhole, CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/authContext";
import { changePassword, getConnectedAccounts, getLoginSessions, softDeleteAccount, updateUserProfile } from "@/lib/api/auth";
import AccountSettingsSkeleton from "./accountSettingSkeleton";
import DeleteAccountModal from "./deleteAccountModal";

const labelCls = "mb-2 flex items-center gap-2 text-sm font-bold text-slate-200";
const inputCls = "w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-white outline-none transition focus:border-orange-400/70 focus:ring-2 focus:ring-orange-400/15";

export default function AccountSettingsPage() {
    const router = useRouter();
    const { user, refreshUser, logout, loading } = useAuth();

    const [form, setForm] = useState({ name: "", email: "", contact: "" });
    const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [preview, setPreview] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [connectedAccounts, setConnectedAccounts] = useState([]);
    const [saving, setSaving] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [success, setSuccess] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (user) { setForm({ name: user?.name || "", email: user?.email || "", contact: user?.contact || "" }); setPreview(user?.image?.url || ""); }
    }, [user]);

    useEffect(() => {
        const loadExtras = async () => {
            try {
                const [sessionsRes, connectedRes] = await Promise.allSettled([getLoginSessions(), getConnectedAccounts()]);
                setSessions(sessionsRes.status === "fulfilled" ? (sessionsRes.value?.data || sessionsRes.value || []) : []);
                setConnectedAccounts(connectedRes.status === "fulfilled" ? (connectedRes.value?.data || connectedRes.value || []) : []);
            } catch { setSessions([]); setConnectedAccounts([]); }
        };
        if (user) loadExtras();
    }, [user]);

    const joinedDate = useMemo(() => {
        if (!user?.createdAt) return "Not available";
        try { return new Date(user.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }
        catch { return "Not available"; }
    }, [user]);

    const emailVerified = !!user?.isVerified;
    const phoneAdded = !!user?.contact;
    const handleChange = (e) => { setSuccess(""); setError(""); setForm((p) => ({ ...p, [e.target.name]: e.target.value })); };
    const handlePasswordChange = (e) => { setPasswordSuccess(""); setPasswordError(""); setPasswordForm((p) => ({ ...p, [e.target.name]: e.target.value })); };
    const handleImageChange = (e) => { const file = e.target.files?.[0]; if (!file) return; setImageFile(file); setPreview(URL.createObjectURL(file)); setSuccess(""); setError(""); };

    const handleSaveProfile = async (e) => {
        e.preventDefault(); setSaving(true); setSuccess(""); setError("");
        try {
            const formData = new FormData();
            formData.append("name", form.name); formData.append("email", form.email); formData.append("contact", form.contact);
            if (imageFile) formData.append("image", imageFile);
            const res = await updateUserProfile(formData);
            await refreshUser(); setImageFile(null); setSuccess(res?.message || "Profile updated successfully.");
        } catch (err) { setError(err?.message || err?.error || err?.errors?.[0]?.message || "Failed to update profile."); }
        finally { setSaving(false); }
    };

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault(); setChangingPassword(true); setPasswordSuccess(""); setPasswordError("");
        try {
            if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) throw new Error("Please fill all password fields.");
            if (passwordForm.newPassword !== passwordForm.confirmPassword) throw new Error("New password and confirm password do not match.");
            const res = await changePassword({ currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword });
            setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setPasswordSuccess(res?.message || "Password changed successfully.");
        } catch (err) { setPasswordError(err?.message || err?.error || err?.errors?.[0]?.message || "Failed to change password."); }
        finally { setChangingPassword(false); }
    };

    const handleDeleteAccount = async (confirmText, resetInput) => {
        if (confirmText !== "DELETE") { setError("Please type DELETE to confirm account deactivation."); return; }
        setDeleting(true); setError("");
        try { await softDeleteAccount(); resetInput(); setDeleteModalOpen(false); logout(); router.push("/register"); }
        catch (err) { setError(err?.message || err?.error || err?.errors?.[0]?.message || "Failed to deactivate account."); }
        finally { setDeleting(false); }
    };

    if (loading) return <AccountSettingsSkeleton />;
    if (!user) return (
        <div className="min-h-screen bg-slate-900 px-4 pb-16 pt-28 text-white">
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center">
                <p className="text-lg font-bold">Please login to view account settings.</p>
            </div>
        </div>
    );

    return (
        <>
            <DeleteAccountModal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleDeleteAccount} deleting={deleting} />

            <div className="min-h-screen bg-slate-900 px-4 pb-10 pt-28 text-white sm:px-6 lg:px-8">
                {/* Ambient blobs */}
                <div className="pointer-events-none fixed inset-0 z-0">
                    <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-600 opacity-10 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-teal-500 opacity-8 blur-3xl" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl">
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-300">
                            <Shield className="h-3.5 w-3.5" />Account Center
                        </div>
                        <h1 className="mt-4 text-3xl font-black sm:text-4xl">Account Settings</h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">Manage your profile, security, connected accounts, and preferences.</p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
                        {/* Sidebar */}
                        <aside className="space-y-6">
                            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative h-32 w-32 overflow-hidden rounded-full border border-white/10 bg-orange-500/10 shadow-lg ring-4 ring-orange-400/10">
                                        {preview ? (
                                            <Image src={preview} alt={user?.name || "User"} fill className="object-cover" unoptimized={preview.startsWith("blob:")} />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-4xl font-black text-orange-400">
                                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                            </div>
                                        )}
                                    </div>

                                    <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold transition hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-400/30">
                                        <Camera className="h-4 w-4 text-orange-400" />Change Photo
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                    </label>

                                    <h2 className="mt-5 text-xl font-black">{user?.name}</h2>
                                    <p className="mt-1 break-all text-sm text-slate-400">{user?.email}</p>

                                    <div className="mt-6 w-full rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-left">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="text-sm font-black">Profile Strength</p>
                                                <p className="mt-1 text-xs text-slate-400">Complete your account for a better experience</p>
                                            </div>
                                            <span className="shrink-0 text-sm font-black text-orange-400">100%</span>
                                        </div>
                                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                                            <div className="h-full rounded-full bg-orange-500 transition-all duration-500" style={{ width: "100%" }} />
                                        </div>
                                    </div>

                                    <div className="mt-4 grid w-full gap-3">
                                        <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-left">
                                            <div className="flex items-center gap-3">
                                                <BadgeCheck className="h-5 w-5 text-orange-400" />
                                                <div className="min-w-0"><p className="text-sm font-black">Role</p><p className="text-xs capitalize text-slate-400">{user?.role || "user"}</p></div>
                                            </div>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-left">
                                            <div className="flex items-center gap-3">
                                                <CalendarDays className="h-5 w-5 text-orange-400" />
                                                <div className="min-w-0"><p className="text-sm font-black">Member Since</p><p className="text-xs text-slate-400">{joinedDate}</p></div>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={logout} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20">
                                        <LogOut className="h-4 w-4" />Logout
                                    </button>
                                </div>
                            </div>

                            {/* Verification status */}
                            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-lg font-black">Verification Status</h3>
                                        <p className="mt-1 text-sm text-slate-400">Verify your account details to improve trust and security.</p>
                                    </div>
                                    <div className="shrink-0 rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-300">100% Complete</div>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { icon: Mail, label: "Email Verification", sub: user?.email, verified: emailVerified, tone: emailVerified ? "teal" : "yellow", tag: emailVerified ? "Verified" : "Pending" },
                                        { icon: Phone, label: "Phone Badge", sub: user?.contact || "No phone added", verified: phoneAdded, tone: phoneAdded ? "blue" : "slate", tag: phoneAdded ? "Added" : "Missing" },
                                    ].map((v) => {
                                        const Icon = v.icon;
                                        const toneMap = { teal: "bg-teal-500/10 text-teal-300", yellow: "bg-yellow-500/10 text-yellow-300", blue: "bg-blue-500/10 text-blue-300", slate: "bg-slate-500/10 text-slate-300" };
                                        return (
                                            <div key={v.label} className="rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex min-w-0 flex-1 items-start gap-3">
                                                        <div className="shrink-0 rounded-2xl bg-orange-500/10 p-2.5"><Icon className="h-5 w-5 text-orange-400" /></div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-black text-white">{v.label}</p>
                                                            <p className="mt-1 break-all pr-2 text-xs text-slate-400">{v.sub}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`inline-flex shrink-0 items-center gap-1 self-start rounded-full px-3 py-1 text-xs font-bold ${toneMap[v.tone]}`}>
                                                        {v.verified && <CheckCircle2 className="h-3.5 w-3.5" />}{v.tag}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </aside>

                        {/* Main content */}
                        <section className="space-y-6">
                            {/* Profile form */}
                            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h3 className="text-xl font-black mb-1">Personal Information</h3>
                                <p className="text-sm text-slate-400 mb-6">Update the details associated with your account.</p>
                                <form onSubmit={handleSaveProfile} className="space-y-6">
                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div>
                                            <label className={labelCls}><User className="h-4 w-4 text-orange-400" />Full Name</label>
                                            <input type="text" name="name" value={form.name} onChange={handleChange} className={inputCls} placeholder="Enter your full name" />
                                        </div>
                                        <div>
                                            <label className={labelCls}><Mail className="h-4 w-4 text-orange-400" />Email Address</label>
                                            <input type="email" name="email" value={form.email} onChange={handleChange} className={inputCls} placeholder="Enter your email" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className={labelCls}><Phone className="h-4 w-4 text-orange-400" />Contact Number</label>
                                            <input type="text" name="contact" value={form.contact} onChange={handleChange} className={inputCls} placeholder="Enter your contact number" />
                                        </div>
                                    </div>
                                    {success && <div className="rounded-2xl border border-teal-400/20 bg-teal-500/10 px-4 py-3 text-sm text-teal-300">{success}</div>}
                                    {error && <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}
                                    <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-900/50 transition hover:bg-orange-600 disabled:opacity-70">
                                        {saving ? <><Loader2 className="h-4 w-4 animate-spin" />Saving...</> : <><Save className="h-4 w-4" />Save Changes</>}
                                    </button>
                                </form>
                            </div>

                            {/* Password form */}
                            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h3 className="text-xl font-black mb-1">Change Password</h3>
                                <p className="text-sm text-slate-400 mb-6">Keep your account secure with a strong password.</p>
                                <form onSubmit={handleChangePasswordSubmit} className="space-y-5">
                                    <div className="grid gap-5 md:grid-cols-3">
                                        {[
                                            { name: "currentPassword", label: "Current Password", placeholder: "Current password" },
                                            { name: "newPassword", label: "New Password", placeholder: "New password" },
                                            { name: "confirmPassword", label: "Confirm Password", placeholder: "Confirm password" },
                                        ].map((field) => (
                                            <div key={field.name}>
                                                <label className={labelCls}><LockKeyhole className="h-4 w-4 text-orange-400" />{field.label}</label>
                                                <input type="password" name={field.name} value={passwordForm[field.name]} onChange={handlePasswordChange} className={inputCls} placeholder={field.placeholder} />
                                            </div>
                                        ))}
                                    </div>
                                    {passwordSuccess && <div className="rounded-2xl border border-teal-400/20 bg-teal-500/10 px-4 py-3 text-sm text-teal-300">{passwordSuccess}</div>}
                                    {passwordError && <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{passwordError}</div>}
                                    <button type="submit" disabled={changingPassword} className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/15 px-6 py-3 font-bold text-orange-300 transition hover:bg-orange-500/25 hover:text-white disabled:opacity-70">
                                        {changingPassword ? <><Loader2 className="h-4 w-4 animate-spin" />Updating...</> : <><Shield className="h-4 w-4" />Update Password</>}
                                    </button>
                                </form>
                            </div>

                            {/* Sessions & Connected */}
                            <div className="grid gap-6 xl:grid-cols-2">
                                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                    <h3 className="text-xl font-black mb-1">Recent Login Sessions</h3>
                                    <p className="text-sm text-slate-400 mb-6">Monitor your recent account activity.</p>
                                    <div className="space-y-3">
                                        {sessions.length > 0 ? sessions.map((session, i) => (
                                            <div key={session?._id || i} className="rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex min-w-0 flex-1 items-start gap-3">
                                                        <div className="shrink-0 rounded-2xl bg-orange-500/10 p-2"><Monitor className="h-5 w-5 text-orange-400" /></div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                                                <p className="text-sm font-black">{session?.device || "Current Device"}</p>
                                                                {i === 0 && <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-bold text-teal-300"><span className="h-1.5 w-1.5 rounded-full bg-teal-300" />Active now</span>}
                                                            </div>
                                                            <p className="mt-1 text-xs leading-5 text-slate-400">{session?.browser || "Unknown"} • {session?.location || "Unknown"}</p>
                                                        </div>
                                                    </div>
                                                    <div className="shrink-0 text-right text-xs text-slate-400 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{session?.lastActive || "Recent"}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="rounded-2xl border border-dashed border-white/10 bg-slate-800/40 p-6 text-sm text-slate-400">No recent session data available yet.</div>
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                    <h3 className="text-xl font-black mb-1">Connected Accounts</h3>
                                    <p className="text-sm text-slate-400 mb-6">Review third-party or linked login providers.</p>
                                    <div className="space-y-3">
                                        {connectedAccounts.length > 0 ? connectedAccounts.map((account, i) => (
                                            <div key={account?._id || i} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <div className="shrink-0 rounded-2xl bg-orange-500/10 p-2"><Link2 className="h-5 w-5 text-orange-400" /></div>
                                                    <div className="min-w-0"><p className="text-sm font-black">{account?.provider || "Connected Provider"}</p><p className="break-all text-xs text-slate-400">{account?.email || "No account email"}</p></div>
                                                </div>
                                                <span className="shrink-0 whitespace-nowrap rounded-full bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-300">Connected</span>
                                            </div>
                                        )) : (
                                            <div className="space-y-3">
                                                {[
                                                    { icon: CircleUserRound, label: "Google", sub: "Not connected" },
                                                    { icon: Smartphone, label: "Phone OTP", sub: user?.contact ? "Available" : "Not linked" },
                                                ].map((a) => {
                                                    const Icon = a.icon;
                                                    return (
                                                        <div key={a.label} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                                                            <div className="flex min-w-0 items-center gap-3">
                                                                <div className="shrink-0 rounded-2xl bg-white/5 p-2"><Icon className="h-5 w-5 text-slate-300" /></div>
                                                                <div className="min-w-0"><p className="text-sm font-black">{a.label}</p><p className="text-xs text-slate-400">{a.sub}</p></div>
                                                            </div>
                                                            <span className="shrink-0 whitespace-nowrap rounded-full bg-slate-500/10 px-3 py-1 text-xs font-bold text-slate-300">Basic</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Account details */}
                            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h3 className="text-xl font-black mb-1">Account Details</h3>
                                <p className="text-sm text-slate-400 mb-6">Read-only account information for reference.</p>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {[
                                        { label: "User ID", value: user?._id || "Not available", breakAll: true },
                                        { label: "Role", value: user?.role || "user", cap: true },
                                        { label: "Email", value: user?.email || "Not available", breakAll: true },
                                        { label: "Contact", value: user?.contact || "Not added", breakAll: true },
                                    ].map((d) => (
                                        <div key={d.label} className="rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{d.label}</p>
                                            <p className={`mt-2 text-sm text-white ${d.breakAll ? "break-all" : ""} ${d.cap ? "capitalize" : ""}`}>{d.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Danger zone */}
                            <div className="rounded-[2rem] border border-red-400/20 bg-red-500/5 p-6 backdrop-blur-xl">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <h3 className="text-xl font-black text-red-300">Danger Zone</h3>
                                        <p className="mt-1 text-sm text-red-300/70">Deactivate your account using soft delete.</p>
                                    </div>
                                    <button type="button" onClick={() => setDeleteModalOpen(true)}
                                        className="inline-flex items-center gap-2 self-start rounded-full border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20">
                                        <Trash2 className="h-4 w-4" />Deactivate Account
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
