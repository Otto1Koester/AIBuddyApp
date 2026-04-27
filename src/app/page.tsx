import Link from "next/link";

const navItems = [
  {
    href: "/buddy",
    title: "AI-бадди",
    description: "Чат-помощник для вопросов новичка.",
  },
  {
    href: "/check-in",
    title: "Mood check-in",
    description: "Ежедневная отметка настроения и стресса.",
  },
  {
    href: "/profile",
    title: "Профиль новичка",
    description: "Ключевая информация об адаптации.",
  },
  {
    href: "/hr",
    title: "HR-дашборд",
    description: "Обзор рисков и состояния команды.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="grid gap-8 border-b border-slate-200 pb-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              Onboarding companion
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-normal text-slate-950 md:text-6xl">
                AI Buddy App
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-700">
                Приложение помогает новичкам быстрее адаптироваться, а HR —
                видеть риски адаптации.
              </p>
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-medium text-slate-600">
                Demo status
              </span>
              <span className="rounded-md bg-emerald-100 px-2 py-1 text-sm font-semibold text-emerald-800">
                Active
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-500">Новички</p>
                <p className="text-2xl font-bold text-slate-950">3</p>
              </div>
              <div>
                <p className="text-slate-500">Алерты</p>
                <p className="text-2xl font-bold text-amber-700">2</p>
              </div>
            </div>
          </div>
        </section>

        <nav className="grid gap-4 md:grid-cols-2" aria-label="Основные страницы">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-300 hover:bg-teal-50"
            >
              <span className="text-lg font-semibold text-slate-950">
                {item.title}
              </span>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
