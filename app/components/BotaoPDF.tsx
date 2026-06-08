"use client";

import { jsPDF } from "jspdf";

type Props = {
  cliente: string;
  precoFinal: number;
  margem: number;
  complexidade: string;
  itens: string[];
  status: string;
  data: string;
};

export default function BotaoPDF({
  cliente,
  precoFinal,
  margem,
  complexidade,
  itens,
  status,
  data,
}: Props) {
  function gerarPDF() {
    const doc = new jsPDF();
    const formatar = (v: number) =>
      "R$ " + v.toLocaleString("pt-BR", { maximumFractionDigits: 0 });

    // Cabeçalho (faixa roxa)
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, 210, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("VANZAK", 20, 19);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Proposta Comercial", 150, 19);

    // Dados do cliente
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Proposta para:", 20, 48);
    doc.setFontSize(16);
    doc.text(cliente, 20, 57);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(110, 110, 110);
    doc.text(`Data: ${data}`, 20, 65);
    doc.text(`Status: ${status}`, 20, 71);
    doc.text(`Complexidade: ${complexidade}`, 20, 77);

    // Linha separadora
    doc.setDrawColor(220, 220, 220);
    doc.line(20, 84, 190, 84);

    // Itens inclusos
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Itens inclusos no projeto", 20, 95);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 70, 70);

    let y = 105;
    if (itens.length === 0) {
      doc.text("• Estrutura base do projeto", 25, y);
      y += 7;
    } else {
      itens.forEach((item) => {
        doc.text(`• ${item}`, 25, y);
        y += 7;
      });
    }

    // Caixa de valores
    y += 8;
    doc.setFillColor(245, 245, 248);
    doc.rect(20, y, 170, 32, "F");

    doc.setTextColor(30, 30, 30);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Valor do Investimento", 28, y + 12);
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229);
    doc.text(formatar(precoFinal), 28, y + 24);

    // Rodapé
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Proposta gerada pelo Vanzak Configurator · Válida por 30 dias",
      20,
      285
    );

    // Baixa o arquivo
    doc.save(`proposta-${cliente.replace(/\s+/g, "-").toLowerCase()}.pdf`);
  }

  return (
    <button
      onClick={gerarPDF}
      className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
    >
      Gerar PDF
    </button>
  );
}