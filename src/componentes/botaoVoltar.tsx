"use client"; // Este componente roda no lado do cliente (necessário para usar hooks)

import { useRouter } from "next/navigation"; // Hook de navegação do Next.js App Router

// Componente de botão reutilizável para voltar à página anterior
export default function BotaoVoltar() {
  const router = useRouter(); // Instância do roteador para navegação programática

  // Função chamada quando o usuário clica no botão
  const handleClick = () => {
    router.back(); // Volta para a página anterior no histórico do navegador
    // Se quisermos sempre ir para a home, poderíamos usar: router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center text-sm text-slate-300 hover:text-slate-50 transition-colors"
    >
      {/* Ícone simples de seta para a esquerda */}
      <span className="mr-1">←</span>

      {/* Texto exibido no botão */}
      <span>Voltar</span>
    </button>
  );
}
