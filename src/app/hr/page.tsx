const stats = [
  { label: "Всего новичков", value: "3" },
  { label: "Новичков с высоким риском", value: "1" },
  { label: "Средний уровень стресса", value: "4.3" },
  { label: "Открытые алерты", value: "2" },
];

const trainees = [
  {
    name: "Anna Petrova",
    role: "Junior Frontend Developer",
    department: "Product Engineering",
    adaptationStage: "First month onboarding",
    risk: "low",
    lastMood: "positive",
  },
  {
    name: "Mikhail Ivanov",
    role: "Sales Development Representative",
    department: "Sales",
    adaptationStage: "Role practice",
    risk: "medium",
    lastMood: "neutral",
  },
  {
    name: "Sofia Kuznetsova",
    role: "HR Operations Specialist",
    department: "People Operations",
    adaptationStage: "Team introduction",
    risk: "high",
    lastMood: "tired",
  },
];

export default function HrPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            People overview
          </p>
          <h1 className="text-4xl font-bold tracking-normal">HR-дашборд</h1>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-500">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-bold text-slate-950">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Имя</th>
                  <th className="px-4 py-3 font-semibold">Роль</th>
                  <th className="px-4 py-3 font-semibold">Отдел</th>
                  <th className="px-4 py-3 font-semibold">
                    Стадия адаптации
                  </th>
                  <th className="px-4 py-3 font-semibold">Риск</th>
                  <th className="px-4 py-3 font-semibold">
                    Последнее настроение
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {trainees.map((trainee) => (
                  <tr key={trainee.name}>
                    <td className="px-4 py-4 font-semibold text-slate-950">
                      {trainee.name}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {trainee.role}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {trainee.department}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {trainee.adaptationStage}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {trainee.risk}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {trainee.lastMood}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
