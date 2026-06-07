"use server";

import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function criarLead(formData: FormData) {

  const empresa = formData.get("empresa") as string;
  const valor = Number(formData.get("valor"));
  const tipo = formData.get("tipo") as string;
  const etapa = formData.get("etapa") as string;

  const { error } = await supabaseAdmin.from("leads").insert({
    empresa,
    valor,
    tipo,
    etapa,
  });

  if (error) {
    throw new Error("Erro ao criar lead: " + error.message);
  }

  // Atualiza as telas que mostram leads
  revalidatePath("/leads");
  revalidatePath("/pipeline");
  revalidatePath("/dashboard");
}


export async function deletarLead(formData: FormData) {
  const id = formData.get("id") as string;

  const { error } = await supabaseAdmin.from("leads").delete().eq("id", id);

  if (error) {
    throw new Error("Erro ao deletar lead: " + error.message);
  }

  revalidatePath("/leads");
  revalidatePath("/pipeline");
  revalidatePath("/dashboard");
}

export async function atualizarLead(formData: FormData) {
  const id = formData.get("id") as string;
  const empresa = formData.get("empresa") as string;
  const valor = Number(formData.get("valor"));
  const tipo = formData.get("tipo") as string;
  const etapa = formData.get("etapa") as string;

  const { error } = await supabaseAdmin
    .from("leads")
    .update({ empresa, valor, tipo, etapa })
    .eq("id", id);

  if (error) {
    throw new Error("Erro ao atualizar lead: " + error.message);
  }

  revalidatePath("/leads");
  revalidatePath("/pipeline");
  revalidatePath("/dashboard");

  redirect("/leads");
}