import { getPerfilUsuario } from "@/app/lib/auth";
import Sidebar from "@/app/components/Sidebar";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const perfil = await getPerfilUsuario();
  const role = perfil?.role ?? "comercial";

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} nome={perfil?.nome ?? perfil?.email ?? "Usuário"} />
      <main className="flex-1 bg-zinc-50">{children}</main>
    </div>
  );
}