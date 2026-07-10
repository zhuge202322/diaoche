import { headers } from "next/headers";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Pillarlift CMS - Admin",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const path = h.get("x-pathname") || "";
  const isLogin = path === "/admin/login";

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      {isLogin ? children : <AdminShell>{children}</AdminShell>}
    </div>
  );
}
