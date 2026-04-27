# История промптов AI Buddy App

В этом файле сохраняются важные промпты, использованные при создании проекта AI Buddy App.

## Prompt 1 — Проверка стартового Next.js-проекта

Ты работаешь над проектом AI Buddy App в Cursor.

Задача:
Проверь текущую структуру проекта после создания Next.js-приложения.

Важно:
- ничего не изменяй;
- не создавай новые файлы;
- не удаляй файлы;
- только прочитай структуру проекта;
- кратко напиши, похож ли проект на корректный Next.js App Router проект;
- отдельно укажи, есть ли `package.json`, `src/app`, `src/app/page.tsx`, `src/app/layout.tsx`;
- если видишь потенциальную проблему, опиши её, но не исправляй без отдельной команды.

## Prompt 2 — Создание истории промптов и health endpoint

Создать файл `PROMPTS.md` с историей первых промптов проекта и добавить backend endpoint `GET /api/health` внутри Next.js App Router.

Endpoint должен быть реализован как Route Handler в `src/app/api/health/route.ts` и возвращать JSON со статусом `ok` и сообщением `Backend API is working`.

## Prompt 3 — Создание mock API для новичков и mood check-in

Создать два mock API endpoint'а без подключения базы данных, Supabase и OpenAI:
`GET /api/mock-trainees` для получения списка demo-новичков и
`POST /api/mock-mood-checkin` для приема mood check-in.

Endpoint `POST /api/mock-mood-checkin` должен проверять наличие `traineeId`, `mood` и `stressLevel`, возвращать ошибку 400 при неполных данных и успешный JSON-ответ с объектом `checkin` при корректном запросе.

## Prompt 4 — Создание базовых страниц приложения

Создать базовые frontend-страницы AI Buddy App на Next.js App Router:
главную страницу `/`, страницу AI-бадди `/buddy`, mood check-in `/check-in`,
профиль новичка `/profile` и HR-дашборд `/hr`.

Страницы должны использовать TypeScript, Server Components и Tailwind CSS.
На этом шаге не подключать Supabase, OpenAI, shadcn/ui, новые зависимости и не вызывать backend API из UI.
