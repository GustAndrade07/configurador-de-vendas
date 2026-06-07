import { createClientServer } from "@/app/lib/supabase-server";
import { redirect } from "next/navigation";

export async function getPerfilUsuario() {
  const supabase = await createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: perfil } = await supabase
    .from("profiles")
    .select("nome, role")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email,
    nome: perfil?.nome ?? null,
    role: perfil?.role ?? "comercial",
  };
}

export async function exigirAdmin() {
  const perfil = await getPerfilUsuario();

  if (!perfil || perfil.role !== "admin") {
    redirect("/dashboard");
  }

  return perfil;
}