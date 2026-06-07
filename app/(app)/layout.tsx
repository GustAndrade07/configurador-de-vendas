"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  KanbanSquare,
  Calculator,
  Users,
  FileText,
  DollarSign,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { createClientBrowser } from "@/app/lib/supabase-browser";
import { LogOut } from "lucide-react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

const router = useRouter();

  async function handleLogout() {
    const supabase = createClientBrowser();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
}

const menu = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Pipeline", href: "/pipeline", icon: KanbanSquare },
  { label: "Configurador", href: "/configurador", icon: Calculator },
  { label: "Leads", href: "/leads", icon: Users },
  { label: "Propostas", href: "/propostas", icon: FileText },
  { label: "Financeiro", href: "/financeiro", icon: DollarSign },
  { label: "Configurações", href: "/configuracoes", icon: Settings },
];

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 flex-col bg-zinc-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Vanzak</h2>
        <nav className="flex flex-col gap-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 rounded-lg px-4 py-2 text-zinc-300 transition-colors hover:bg-zinc-800"
        >
          <LogOut size={20} />
          Sair
        </button>
      </aside>

      <main className="flex-1 bg-zinc-50">{children}</main>
    </div>
  );
}