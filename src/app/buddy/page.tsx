export default function BuddyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Assistant
          </p>
          <h1 className="text-4xl font-bold tracking-normal">AI-бадди</h1>
          <p className="text-lg leading-8 text-slate-700">
            Здесь будет чат новичка с AI-бадди: быстрые ответы на вопросы об
            адаптации, процессах и первых шагах в команде.
          </p>
        </header>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="space-y-4">
            <div className="max-w-[85%] rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-600">Новичок</p>
              <p className="mt-2 text-slate-800">
                Я не уверен, к кому обратиться по настройке доступа к CRM.
              </p>
            </div>

            <div className="ml-auto max-w-[85%] rounded-lg bg-teal-700 p-4 text-white">
              <p className="text-sm font-semibold text-teal-100">AI-бадди</p>
              <p className="mt-2">
                Начни с наставника и Service Desk. Я бы также записал вопрос в
                onboarding-чеклист, чтобы HR видел, где возникла задержка.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
