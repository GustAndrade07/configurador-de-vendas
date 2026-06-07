import { exigirAdmin } from "@/app/lib/auth";

export default async function FinanceiroPage() {
  await exigirAdmin();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Financeiro</h1>
      <p className="mt-2 text-zinc-600">Receita, pagamentos e projeções.</p>
    </div>
  );
}

