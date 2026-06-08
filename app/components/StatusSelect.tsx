"use client";

import { atualizarStatus } from "@/app/(app)/propostas/actions";

type Props = {
  id: string;
  status: string;
  cor: string;
};

export default function StatusSelect({ id, status, cor }: Props) {
  return (
    <form action={atualizarStatus}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        className={`rounded-full border-0 px-2 py-1 text-xs font-medium ${cor}`}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
      >
        <option value="Rascunho">Rascunho</option>
        <option value="Enviada">Enviada</option>
        <option value="Aceita">Aceita</option>
        <option value="Recusada">Recusada</option>
      </select>
    </form>
  );
}