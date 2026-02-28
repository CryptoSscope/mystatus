"use client"; // Necessário para usar hooks na página

import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // importa o hook de autenticação
import { UserBar } from "@/componentes/UserBar"; // importa barra de usuário para exibir no quem esta logado


// Lista de projetos em destaque (mock)
const projetos = [
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

export default function Home() {
  // Obtém o usuário atual do contexto de autenticação
  const { usuarioAtual } = useAuth();

  // Quando usuarioAtual é null, consideramos que o usuário é anônimo
  const navegandoComoAnonimo = usuarioAtual === null;

  //Chamando a barra de Usuário logado para exibição
  <UserBar />

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Barra no topo da tela */}
      <UserBar />
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        {/* Título principal da aplicação */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          MyStatus
        </h1>

        {/* Descrição curta explicando o propósito do sistema */}
        <p className="text-slate-300 text-base md:text-lg">
          Acompanhe o status de projetos em um só lugar.
          Simples, rápido e focado no que realmente importa.
        </p>

        {/* Botão principal para levar o usuário à tela de login */}
        <div className="mt-4">
          <Link
            href="/login"
            className="inline-flex items-center rounded-md bg-sky-600 hover:bg-sky-500 transition-colors px-4 py-2 text-sm font-semibold text-white"
          >
            Login
          </Link>
        </div>

        {/* Aviso quando o usuário está navegando como anônimo */}
        {navegandoComoAnonimo && (
          <p className="text-xs text-amber-400">
            Você está navegando como anônimo. Pode visualizar projetos, mas não
            pode votar. Faça login para participar das votações.
          </p>
        )}

        {/* Cards com estatísticas gerais (mock) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold text-slate-200">
              Projetos ativos
            </p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">3</p>
            <p className="mt-1 text-xs text-slate-400">
              Exemplo de dado que virá do backend
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold text-slate-200">
              Tarefas em risco
            </p>
            <p className="mt-2 text-3xl font-bold text-amber-400">1</p>
            <p className="mt-1 text-xs text-slate-400">
              Aqui podemos mostrar alertas importantes
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold text-slate-200">
              Atualizado hoje
            </p>
            <p className="mt-2 text-3xl font-bold text-sky-400">Sim</p>
            <p className="mt-1 text-xs text-slate-400">
              Depois será baseado em dados reais
            </p>
          </div>
        </div>

        {/* Texto explicando o estado atual do projeto */}
        <p className="text-xs text-slate-500 mt-4">
          Esta é apenas a versão inicial do MyStatus. Em breve, conectaremos
          com o backend e banco de dados.
        </p>

        {/* Lista de projetos em destaque */}
        <section className="mt-10 text-left">
          <h2 className="text-2xl font-semibold mb-4">
            Projetos em destaque
          </h2>

          <div className="space-y-4">
            {projetos.map((projeto) => (
              <Link
                key={projeto.id}
                href={`/projetos/${projeto.id}`}
                className="block rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-sky-500 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-50">
                      {projeto.nome}
                    </h3>
                    <p className="text-sm text-slate-300 mt-1">
                      {projeto.descricao}
                    </p>
                  </div>

                  <div className="text-right text-sm">
                    <p className="text-xs uppercase text-slate-400">
                      Status
                    </p>
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

                    <p className="mt-2 text-xs text-slate-400">
                      👍 {projeto.votosPositivos} • 👎 {projeto.votosNegativos}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  </div>
  );
}
