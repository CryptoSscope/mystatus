// Página de registro de novo usuário
// Caminho: /registro
import Link from "next/link";

export default function RegistroPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      {/* Container central com largura máxima */}
      <div className="w-full max-w-md space-y-6">
        {/* Título da página */}
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Criar conta no MyStatus
        </h1>

        {/* Texto explicando que é um mock inicial */}
        <p className="text-sm text-slate-400 text-center">
          Esta é a versão inicial da tela de cadastro. Os dados ainda não são
          salvos em um backend real.
        </p>

        {/* Formulário de cadastro (mock) */}
        <form className="space-y-4">
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
            />
          </div>

          {/* Campo de senha */}
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

          {/* Campo de confirmação de senha */}
          <div className="text-left">
            <label className="block text-sm font-medium text-slate-200">
              Confirmar senha
            </label>
            <input
              type="password"
              required
              className="mt-1 w-full rounded-md bg-slate-900/60 border border-slate-700 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="********"
            />
          </div>

          {/* Botão principal de cadastro */}
          <button
            type="submit"
            className="w-full rounded-md bg-emerald-600 hover:bg-emerald-500 transition-colors py-2 text-sm font-semibold text-white"
          >
            Criar conta
          </button>
        </form>

        {/* Link de retorno ao login */}
        <p className="text-xs text-slate-400 text-center">
            Já tem conta?{" "}
            <Link href="/login" className="text-sky-400 hover:text-sky-300">
            Fazer login
            </Link>
        </p>
      </div>
    </main>
  );
}
