"use client";

import { FormEvent, useState } from "react";

type Checkin = {
  id: string;
  traineeId: string;
  mood: string;
  stressLevel: number;
  comment: string;
  createdAt: string;
};

export default function CheckInPage() {
  const [traineeId, setTraineeId] = useState("trainee-001");
  const [mood, setMood] = useState("positive");
  const [stressLevel, setStressLevel] = useState(3);
  const [comment, setComment] = useState(
    "Сегодня разобрался с первыми задачами, но остались вопросы по процессам.",
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [createdCheckin, setCreatedCheckin] = useState<Checkin | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setCreatedCheckin(null);

    try {
      const response = await fetch("/api/mock-mood-checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          traineeId,
          mood,
          stressLevel,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Не удалось отправить mood check-in.");
      }

      setCreatedCheckin(data.checkin as Checkin);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Произошла неизвестная ошибка.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Daily pulse
          </p>
          <h1 className="text-4xl font-bold tracking-normal">Mood check-in</h1>
          <p className="text-lg leading-8 text-slate-700">
            Форма ежедневной отметки помогает понять настроение новичка,
            уровень нагрузки и возможные сложности адаптации.
          </p>
        </header>

        <form
          className="grid gap-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          onSubmit={handleSubmit}
        >
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Trainee ID
            </span>
            <input
              className="rounded-lg border border-slate-300 px-3 py-3 text-slate-950"
              name="traineeId"
              onChange={(event) => setTraineeId(event.target.value)}
              value={traineeId}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Настроение
            </span>
            <select
              className="rounded-lg border border-slate-300 bg-white px-3 py-3 text-slate-950"
              name="mood"
              onChange={(event) => setMood(event.target.value)}
              value={mood}
            >
              <option value="positive">Позитивное</option>
              <option value="neutral">Нейтральное</option>
              <option value="anxious">Тревожное</option>
              <option value="tired">Усталость</option>
              <option value="motivated">Мотивированное</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Уровень стресса
            </span>
            <select
              className="rounded-lg border border-slate-300 bg-white px-3 py-3 text-slate-950"
              name="stressLevel"
              onChange={(event) => setStressLevel(Number(event.target.value))}
              value={stressLevel}
            >
              {[1, 2, 3, 4, 5].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Комментарий
            </span>
            <textarea
              className="min-h-32 rounded-lg border border-slate-300 px-3 py-3 text-slate-950"
              name="comment"
              onChange={(event) => setComment(event.target.value)}
              value={comment}
            />
          </label>

          <button
            className="rounded-lg bg-teal-700 px-4 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Отправляем..." : "Сохранить отметку"}
          </button>
        </form>

        {error ? (
          <section className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-800 shadow-sm">
            {error}
          </section>
        ) : null}

        {createdCheckin ? (
          <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-emerald-900 shadow-sm">
            <h2 className="text-lg font-semibold">Mood check-in received</h2>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold">ID</dt>
                <dd>{createdCheckin.id}</dd>
              </div>
              <div>
                <dt className="font-semibold">Trainee ID</dt>
                <dd>{createdCheckin.traineeId}</dd>
              </div>
              <div>
                <dt className="font-semibold">Mood</dt>
                <dd>{createdCheckin.mood}</dd>
              </div>
              <div>
                <dt className="font-semibold">Stress level</dt>
                <dd>{createdCheckin.stressLevel}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-semibold">Comment</dt>
                <dd>{createdCheckin.comment}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-semibold">Created at</dt>
                <dd>{createdCheckin.createdAt}</dd>
              </div>
            </dl>
          </section>
        ) : null}
      </div>
    </main>
  );
}
