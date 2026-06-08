"use server";

import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";

export async function atualizarStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  const { error } = await supabaseAdmin
    .from("propostas")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error("Erro ao atualizar status: " + error.message);
  }

  revalidatePath("/propostas");
  revalidatePath("/financeiro");
  revalidatePath("/dashboard");
}