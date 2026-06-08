"use server";

import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function salvarProposta(formData: FormData) {
  const cliente = formData.get("cliente") as string;
  const precoFinal = Number(formData.get("precoFinal"));
  const margem = Number(formData.get("margem"));
  const complexidade = formData.get("complexidade") as string;
  const itens = JSON.parse((formData.get("itens") as string) || "[]");

  const { error } = await supabaseAdmin.from("propostas").insert({
    cliente,
    preco_final: precoFinal,
    margem,
    complexidade,
    itens,
  });

  if (error) {
    throw new Error("Erro ao salvar proposta: " + error.message);
  }

  revalidatePath("/propostas");
  revalidatePath("/dashboard");

  redirect("/propostas");
}