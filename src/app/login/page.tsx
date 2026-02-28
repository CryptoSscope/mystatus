"use client"; // Esta página usa hooks (estado, navegação), então precisa ser client component

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Hook para fazer navegação programática
import { useAuth } from "@/context/AuthContext"; // Nosso contexto de autenticação

// Página de login de usuário
// Caminho: /login
export default function LoginPage() {
  // Estado local para armazenar o e-mail digitado pelo usuário
  const [email, setEmail] = useState("");

  // Hook de navegação do Next.js (App Router)
  const router = useRouter();

  // Obtemos a função de login fake do contexto
  const { loginFakeBasico } = useAuth();

  // Função chamada quando o formulário é enviado
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // Evita o recarregamento padrão da página

    // Chama o login fake como usuário BÁSICO usando o e-mail informado
    loginFakeBasico(email);

    // Após o "login", redireciona o usuário para a página inicial
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      {/* Container central com largura máxima */}
      <div className="w-full max-w-md space-y-6">
        {/* Título da página */}
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Entrar no MyStatus
        </h1>

        {/* Texto explicando o contexto da autenticação */}
        <p className="text-sm text-slate-400 text-center">
          Autenticação básica por e-mail (versão de testes). No futuro,
          integraremos com um serviço de autenticação real (por exemplo,
          Auth, JWT, etc.).
        </p>

        {/* Formulário de login com controle de estado */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Campo de e-mail */}
          <div className="text-left">
            <label className="block text-sm font-medium text-slate-200">
              E-mail
            </label>
            <input
              type="email"
              required
              className="mt-1 w-full rounded-md bg-slate-900/60 border border-slate-700 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="seu-email@exemplo.com"
              value={email} // valor atual do estado
              onChange={(e) => setEmail(e.target.value)} // atualiza o estado quando o usuário digita
            />
          </div>

          {/* Campo de senha (ainda não é usada no login fake) */}
          <div className="text-left">
            <label className="block text-sm font-medium text-slate-200">
              Senha
            </label>
            <input
              type="password"
              required
              className="mt-1 w-full rounded-md bg-slate-900/60 border border-slate-700 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="********"
            />
          </div>

          {/* Botão principal de login */}
          <button
            type="submit"
            className="w-full rounded-md bg-sky-600 hover:bg-sky-500 transition-colors py-2 text-sm font-semibold text-white"
          >
            Entrar
          </button>
        </form>

        {/* Link para a página de cadastro */}
        <p className="text-xs text-slate-400 text-center">
          Ainda não tem conta?{" "}
          <Link href="/registro" className="text-sky-400 hover:text-sky-300">
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  );
}
