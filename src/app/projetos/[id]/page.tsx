"use client"; // Esta página usa hooks (useAuth), então é um client component

// Importa o botão de voltar
import BotaoVoltar from "@/componentes/botaoVoltar";
// Importa o hook de autenticação
import { useAuth } from "@/context/AuthContext";
// Importa o React
import React from "react";
//Importa Barra de Usuário
import { UserBar } from "@/componentes/UserBar";

type Projeto = {
  id: number;
  nome: string;
  descricao: string;
  status: "ok" | "risco" | "novo";
  votosPositivos: number;
  votosNegativos: number;
};

// Lista estática de projetos (mock)
const projetos: Projeto[] = [
  {
    id: 1,
    nome: "Node Sui Validator",
    descricao: "Validador Sui focado em segurança e alta disponibilidade.",
    status: "ok",
    votosPositivos: 120,
    votosNegativos: 5,
  },
  {
    id: 2,
    nome: "Carteira DeFi Web3",
    descricao: "Wallet não custodial com suporte a múltiplas chains.",
    status: "risco",
    votosPositivos: 45,
    votosNegativos: 20,
  },
  {
    id: 3,
    nome: "DEX MyStatus Swap",
    descricao: "Exchange descentralizada com foco em baixas taxas.",
    status: "novo",
    votosPositivos: 10,
    votosNegativos: 1,
  },
];

// Tipo das props, refletindo que params é uma Promise
type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

// Página de detalhes do projeto
export default function ProjetoDetalhePage({ params }: PageProps) {
  // Resolve a Promise de params usando React.use (API nova do React/Next 16) [web:131]
  const resolvedParams = React.use(params);
  const idNumero = Number(resolvedParams.id);

  // Busca o projeto correspondente ao id informado na URL
  const projeto = projetos.find((p) => p.id === idNumero);

  // Obtém o usuário atual do contexto
  const { usuarioAtual } = useAuth();

  // Se não encontrar o projeto, mostra mensagem amigável
  if (!projeto) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <p>Projeto não encontrado.</p>
      </main>
    );
  }

  // Usuário está logado se usuarioAtual não for null
  const usuarioLogado = usuarioAtual !== null;

  // Mensagem de contexto sobre quem pode votar
  const mensagemVoto = usuarioLogado
    ? "Você pode votar 1x neste projeto (regra de MVP, sem persistência real por enquanto)."
    : "Você está como anônimo. Faça login para poder votar neste projeto.";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/*Chama Barra de Usuário*/}
      <UserBar />
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        {/* Botão para voltar à página anterior */}
        <BotaoVoltar />

        {/* Título do projeto */}
        <h1 className="text-3xl md:text-4xl font-bold">{projeto.nome}</h1>

        {/* Descrição do projeto */}
        <p className="text-slate-300">{projeto.descricao}</p>

        {/* Blocos com status e votos */}
        <div className="flex flex-wrap gap-4">
          {/* Cartão de status do projeto */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
            <p className="text-xs uppercase text-slate-400">Status</p>
            <p
              className={
                projeto.status === "ok"
                  ? "text-emerald-400 font-semibold"
                  : projeto.status === "risco"
                  ? "text-amber-400 font-semibold"
                  : "text-sky-400 font-semibold"
              }
            >
              {projeto.status.toUpperCase()}
            </p>
          </div>

          {/* Cartão de votos do projeto */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
            <p className="text-xs uppercase text-slate-400">Votos</p>
            <p className="text-sm text-slate-200">
              👍 {projeto.votosPositivos} • 👎 {projeto.votosNegativos}
            </p>
          </div>
        </div>

        {/* Seção de votação (mock) */}
        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Área de votação (mock)
          </h2>

          {/* Mensagem explicando a regra de voto conforme login */}
          <p className="text-sm text-slate-300">{mensagemVoto}</p>

          {/* Botões de voto (apenas layout, sem gravação real) */}
          <div className="flex gap-4">
            {/* Botão de voto positivo */}
            <button
              type="button"
              disabled={!usuarioLogado}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold flex items-center justify-center gap-2 ${
                usuarioLogado
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              <span>👍</span>
              <span>Votar a favor</span>
            </button>

            {/* Botão de voto negativo */}
            <button
              type="button"
              disabled={!usuarioLogado}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold flex items-center justify-center gap-2 ${
                usuarioLogado
                  ? "bg-rose-600 hover:bg-rose-500 text-white"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              <span>👎</span>
              <span>Votar contra</span>
            </button>
          </div>

          {/* Observação sobre ser apenas layout nesta fase */}
          <p className="text-xs text-slate-500">
            Nesta fase do MVP, estes botões não gravam o voto em banco de dados.
            Servem apenas para validar layout e regras de acesso (anônimo vs logado).
          </p>
        </section>
      </div>
    </main>
  </div>
  );
}
