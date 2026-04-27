export default function CheckInPage() {
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

        <form className="grid gap-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Настроение
            </span>
            <select className="rounded-lg border border-slate-300 bg-white px-3 py-3 text-slate-950">
              <option>Отличное</option>
              <option>Нейтральное</option>
              <option>Тревожное</option>
              <option>Усталость</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Уровень стресса
            </span>
            <input
              className="rounded-lg border border-slate-300 px-3 py-3 text-slate-950"
              max="10"
              min="1"
              name="stressLevel"
              type="number"
              defaultValue="3"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Комментарий
            </span>
            <textarea
              className="min-h-32 rounded-lg border border-slate-300 px-3 py-3 text-slate-950"
              defaultValue="Сегодня разобрался с первыми задачами, но остались вопросы по процессам."
            />
          </label>

          <button
            className="rounded-lg bg-teal-700 px-4 py-3 font-semibold text-white"
            type="button"
          >
            Сохранить отметку
          </button>
        </form>
      </div>
    </main>
  );
}
