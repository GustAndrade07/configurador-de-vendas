"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClientBrowser } from "@/app/lib/supabase-browser";
import {
  LayoutDashboard,
  KanbanSquare,
  Calculator,
  Users,
  FileText,
  DollarSign,
  Settings,
  LogOut,
} from "lucide-react";

type SidebarProps = {
  role: string;
  nome: string;
};

export default function Sidebar({ role, nome }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClientBrowser();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const menu = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, adminOnly: false },
    { label: "Pipeline", href: "/pipeline", icon: KanbanSquare, adminOnly: false },
    { label: "Configurador", href: "/configurador", icon: Calculator, adminOnly: false },
    { label: "Leads", href: "/leads", icon: Users, adminOnly: false },
    { label: "Propostas", href: "/propostas", icon: FileText, adminOnly: false },
    { label: "Financeiro", href: "/financeiro", icon: DollarSign, adminOnly: true },
    { label: "Configurações", href: "/configuracoes", icon: Settings, adminOnly: true },
  ];

  const menuVisivel = menu.filter((item) => !item.adminOnly || role === "admin");

  return (
    <aside className="flex w-64 flex-col bg-zinc-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-1">Configurador de Vendas (NOME EMPRESA)</h2>
      <p className="mb-8 text-xs text-zinc-400">
        {nome} · {role === "admin" ? "Admin" : "Comercial"}
      </p>

      <nav className="flex flex-col gap-1">
        {menuVisivel.map((item) => {
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
  );
}