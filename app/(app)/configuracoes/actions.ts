"use server";

import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";

export async function atualizarPrecos(formData: FormData) {
  // Pega todos os campos do formulário (cada um é um id de preço)
  const entradas = Array.from(formData.entries());

  for (const [id, valor] of entradas) {
    const numero = Number(valor);
    if (isNaN(numero)) continue;

    const { error } = await supabaseAdmin
      .from("configuracoes_preco")
      .update({ valor: numero })
      .eq("id", id);

    if (error) {
      throw new Error(`Erro ao atualizar ${id}: ` + error.message);
    }
  }

  revalidatePath("/configuracoes");
  revalidatePath("/configurador");
}