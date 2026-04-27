const trainee = {
  name: "Anna Petrova",
  role: "Junior Frontend Developer",
  department: "Product Engineering",
  mentorName: "Elena Smirnova",
  adaptationStage: "First month onboarding",
  startDate: "2026-04-01",
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Trainee profile
          </p>
          <h1 className="text-4xl font-bold tracking-normal">
            Профиль новичка
          </h1>
        </header>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="border-b border-slate-100 pb-5">
            <p className="text-2xl font-bold text-slate-950">{trainee.name}</p>
            <p className="mt-1 text-slate-600">{trainee.role}</p>
          </div>

          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-slate-500">Отдел</dt>
              <dd className="mt-1 text-slate-900">{trainee.department}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-slate-500">
                Наставник
              </dt>
              <dd className="mt-1 text-slate-900">{trainee.mentorName}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-slate-500">
                Стадия адаптации
              </dt>
              <dd className="mt-1 text-slate-900">
                {trainee.adaptationStage}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-slate-500">
                Дата старта
              </dt>
              <dd className="mt-1 text-slate-900">{trainee.startDate}</dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  );
}
