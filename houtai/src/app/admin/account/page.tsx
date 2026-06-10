"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, ShieldCheck } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("The new passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("The new password must be at least 8 characters.");
      return;
    }
    if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setError("The new password must include both letters and numbers.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Password update failed.");
        return;
      }
      setSuccess("Password updated. Please sign in again.");
      setTimeout(() => {
        router.push("/admin/login");
        router.refresh();
      }, 1800);
    } catch (err: any) {
      setError(err.message || "Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
            <KeyRound className="w-5 h-5 text-brand-primary" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-800">Change Admin Password</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              After a successful password update, you will be asked to sign in again.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-sm rounded-xl border border-emerald-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            {success}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-bold text-slate-700">Current Password</span>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-700">New Password</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
            <span className="text-xs text-slate-500 mt-1 block">
              At least 8 characters, including both letters and numbers.
            </span>
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-700">Confirm New Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </label>

          <button
            type="submit"
            disabled={loading || !!success}
            className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-2.5 rounded-xl shadow hover:opacity-90 disabled:opacity-50 transition"
          >
            <KeyRound className="w-4 h-4" />
            {loading ? "Submitting..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
