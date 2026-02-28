export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          MyStatus
        </h1>

        <p className="text-slate-300 text-base md:text-lg">
          Acompanhe o status dos seus projetos em um só lugar.
          Simples, rápido e focado no que realmente importa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold text-slate-200">Projetos ativos</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">3</p>
            <p className="mt-1 text-xs text-slate-400">Exemplo de dado que virá do backend</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold text-slate-200">Tarefas em risco</p>
            <p className="mt-2 text-3xl font-bold text-amber-400">1</p>
            <p className="mt-1 text-xs text-slate-400">Aqui podemos mostrar alertas importantes</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold text-slate-200">Atualizado hoje</p>
            <p className="mt-2 text-3xl font-bold text-sky-400">Sim</p>
            <p className="mt-1 text-xs text-slate-400">Depois será baseado em dados reais</p>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Esta é apenas a versão inicial do MyStatus. Em breve, conectaremos com o backend e banco de dados.
        </p>
      </div>
    </main>
  );
}
