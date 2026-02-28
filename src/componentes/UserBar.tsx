'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

//
// Mapeia cada nível de acesso para rótulo e cores do badge.
//
function getNivelConfig(nivel: string | undefined) {
  switch (nivel) {
    case 'BASICO':
      return {
        label: 'BÁSICO',
        classes: 'bg-slate-700 text-slate-50 border-slate-500',
      };
    case 'VERIFICADO':
      return {
        label: 'VERIFICADO',
        classes: 'bg-emerald-600 text-emerald-50 border-emerald-400',
      };
    case 'PREMIUM':
      return {
        label: 'PREMIUM',
        classes: 'bg-amber-500 text-amber-950 border-amber-400',
      };
    default:
      return {
        label: 'ANÔNIMO',
        classes: 'bg-slate-500 text-slate-50 border-slate-400',
      };
  }
}

//
// Barra de usuário global do MyStatus.
// - Sempre aparece no topo, alinhada à direita.
// - Mostra um avatar circular (inicial do usuário ou "?").
// - Clicar no avatar abre um menu com as ações da conta.
//
export function UserBar() {
  const { usuarioAtual, logout } = useAuth();
  const router = useRouter();
  const [aberto, setAberto] = useState(false);

  //
  // Ação de logout:
  // - limpa usuário no contexto
  // - fecha o menu
  // - redireciona para a home
  //
  function handleLogout() {
    logout();
    setAberto(false);
    router.push('/');
  }

  // ============================================================
  // ESTADO ANÔNIMO (sem usuário logado)
  // ============================================================
  if (!usuarioAtual) {
    const config = getNivelConfig(undefined);

    return (
      <div className="relative w-full bg-slate-950 text-slate-100 px-4 py-2 flex items-center justify-end">
        {/* Avatar "?" que abre/fecha o menu anônimo */}
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold border border-slate-600 hover:border-sky-500 transition-colors"
        >
          ?
        </button>

        {/* Menu anônimo: mostra apenas o badge ANÔNIMO e ação de Login */}
        {aberto && (
          <div className="absolute right-4 top-12 w-52 rounded-xl bg-slate-900 border border-slate-700 shadow-lg text-xs sm:text-sm z-50">
            {/* Cabeçalho do menu anônimo */}
            <div className="px-4 py-3 border-b border-slate-800 flex gap-3 items-center">
              <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold">
                ?
              </div>
              <div className="flex flex-col">
                {/* Badge ANÔNIMO indicando o estado atual */}
                <span
                  className={`mt-1 inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${config.classes}`}
                >
                  {config.label}
                </span>
              </div>
            </div>

            {/* Ação disponível para anônimo: ir para tela de Login */}
            <div className="py-2">
              <button
                type="button"
                onClick={() => {
                  setAberto(false);
                  router.push('/login');
                }}
                className="w-full text-left px-4 py-2 text-[11px] sm:text-xs text-sky-300 hover:bg-slate-800"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================================
  // ESTADO LOGADO
  // ============================================================
  const config = getNivelConfig(usuarioAtual.nivel);

  // Inicial usada no avatar (primeira letra do nome ou do email)
  const inicial =
    usuarioAtual.nome?.trim().charAt(0).toUpperCase() ??
    usuarioAtual.email.charAt(0).toUpperCase();

  return (
    <div className="relative w-full bg-slate-950 text-slate-100 px-4 py-2 flex items-center justify-end">
      {/* Avatar do usuário logado que abre/fecha o menu da conta */}
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-semibold border border-slate-600 hover:border-sky-500 transition-colors"
      >
        {inicial}
      </button>

      {/* Menu da conta logada: email + badge de nível + sair */}
      {aberto && (
        <div className="absolute right-4 top-12 w-64 rounded-xl bg-slate-900 border border-slate-700 shadow-lg text-xs sm:text-sm z-50">
          {/* Cabeçalho minimalista: avatar + email + badge */}
          <div className="px-4 py-3 border-b border-slate-800 flex gap-3 items-center">
            <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-xs font-semibold">
              {inicial}
            </div>
            <div className="flex flex-col">
              {/* Email do usuário como informação principal de identificação */}
              <span className="text-slate-300 text-[11px] truncate">
                {usuarioAtual.email}
              </span>
              {/* Badge de nível (BÁSICO / VERIFICADO / PREMIUM) */}
              <span
                className={`mt-1 inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${config.classes}`}
              >
                {config.label}
              </span>
            </div>
          </div>

          {/* Ações da conta logada (por enquanto, apenas Sair) */}
          <div className="py-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-[11px] sm:text-xs text-rose-300 hover:bg-slate-800"
            >
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
