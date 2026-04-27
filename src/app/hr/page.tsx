"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Trainee = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  startDate: string;
  mentorName: string;
  adaptationStage: string;
  riskLevel: string;
  lastMood: string;
  lastCheckInAt: string;
};

export default function HrPage() {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTrainees = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/mock-trainees");

      if (!response.ok) {
        throw new Error("Не удалось загрузить список новичков.");
      }

      const data = (await response.json()) as Trainee[];
      setTrainees(data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Произошла неизвестная ошибка.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    fetch("/api/mock-trainees")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось загрузить список новичков.");
        }

        return response.json() as Promise<Trainee[]>;
      })
      .then((data) => {
        if (!ignore) {
          setTrainees(data);
        }
      })
      .catch((loadError) => {
        if (!ignore) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Произошла неизвестная ошибка.",
          );
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const stats = useMemo(
    () => [
      { label: "Всего новичков", value: String(trainees.length) },
      {
        label: "Новичков с высоким риском",
        value: String(
          trainees.filter((trainee) => trainee.riskLevel === "high").length,
        ),
      },
      { label: "Средний уровень стресса", value: "4.3" },
      { label: "Открытые алерты", value: "2" },
    ],
    [trainees],
  );

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              People overview
            </p>
            <h1 className="text-4xl font-bold tracking-normal">HR-дашборд</h1>
          </div>

          <button
            className="rounded-lg bg-teal-700 px-4 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={loading}
            onClick={loadTrainees}
            type="button"
          >
            {loading ? "Загрузка..." : "Обновить данные"}
          </button>
        </header>

        {loading ? (
          <section className="rounded-lg border border-slate-200 bg-white p-5 text-slate-700 shadow-sm">
            Загружаем данные новичков...
          </section>
        ) : null}

        {error ? (
          <section className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-800 shadow-sm">
            {error}
          </section>
        ) : null}

        {!loading && !error ? (
          <>
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
                      <tr key={trainee.id}>
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
                          {trainee.riskLevel}
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
          </>
        ) : null}
      </div>
    </main>
  );
}
