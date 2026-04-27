-- Enable UUID generation for primary keys.
create extension if not exists pgcrypto;

-- Drop tables in dependency order so this file can be rerun during development.
drop table if exists adaptation_tips cascade;
drop table if exists alerts cascade;
drop table if exists sentiment_analysis cascade;
drop table if exists chat_messages cascade;
drop table if exists mood_checkins cascade;
drop table if exists trainees cascade;

-- Core trainee profile used by onboarding and HR views.
create table trainees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  role text not null,
  department text not null,
  start_date date not null,
  mentor_name text,
  adaptation_stage text not null,
  risk_level text not null,
  created_at timestamptz not null default now()
);

-- Daily mood check-ins submitted by trainees.
create table mood_checkins (
  id uuid primary key default gen_random_uuid(),
  trainee_id uuid not null references trainees(id) on delete cascade,
  mood text not null,
  stress_level integer not null,
  comment text,
  created_at timestamptz not null default now(),
  constraint mood_checkins_stress_level_check check (
    stress_level between 1 and 5
  )
);

-- Chat history between a trainee and the AI buddy.
create table chat_messages (
  id uuid primary key default gen_random_uuid(),
  trainee_id uuid not null references trainees(id) on delete cascade,
  sender text not null,
  message text not null,
  created_at timestamptz not null default now(),
  constraint chat_messages_sender_check check (
    sender in ('trainee', 'assistant')
  )
);

-- AI-generated analysis results for mood comments or chat messages.
create table sentiment_analysis (
  id uuid primary key default gen_random_uuid(),
  trainee_id uuid not null references trainees(id) on delete cascade,
  source_text text not null,
  sentiment text not null,
  risk_level text not null,
  summary text,
  recommended_action text,
  created_at timestamptz not null default now()
);

-- HR alerts created when adaptation risk needs attention.
create table alerts (
  id uuid primary key default gen_random_uuid(),
  trainee_id uuid not null references trainees(id) on delete cascade,
  type text not null,
  severity text not null,
  message text not null,
  is_resolved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Reusable onboarding recommendations by adaptation stage and day range.
create table adaptation_tips (
  id uuid primary key default gen_random_uuid(),
  stage text not null,
  day_from integer not null,
  day_to integer not null,
  title text not null,
  content text not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security. Policies will be added later.
alter table trainees enable row level security;
alter table mood_checkins enable row level security;
alter table chat_messages enable row level security;
alter table sentiment_analysis enable row level security;
alter table alerts enable row level security;
alter table adaptation_tips enable row level security;

-- Demo trainees for local MVP testing and Supabase UI exploration.
insert into trainees (
  id,
  name,
  email,
  role,
  department,
  start_date,
  mentor_name,
  adaptation_stage,
  risk_level
) values
  (
    '11111111-1111-4111-8111-111111111111',
    'Anna Petrova',
    'anna.petrova@example.com',
    'Junior Frontend Developer',
    'Product Engineering',
    '2026-04-01',
    'Elena Smirnova',
    'First month onboarding',
    'low'
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'Mikhail Ivanov',
    'mikhail.ivanov@example.com',
    'Sales Development Representative',
    'Sales',
    '2026-03-18',
    'Pavel Sokolov',
    'Role practice',
    'medium'
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'Sofia Kuznetsova',
    'sofia.kuznetsova@example.com',
    'HR Operations Specialist',
    'People Operations',
    '2026-04-15',
    'Maria Orlova',
    'Team introduction',
    'low'
  );

-- Demo mood check-ins showing different onboarding situations.
insert into mood_checkins (
  trainee_id,
  mood,
  stress_level,
  comment,
  created_at
) values
  (
    '11111111-1111-4111-8111-111111111111',
    'positive',
    2,
    'Finished the first UI task and got helpful feedback from the mentor.',
    '2026-04-24 09:30:00+00'
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'neutral',
    4,
    'Still learning the CRM flow and need more call shadowing practice.',
    '2026-04-23 14:15:00+00'
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'motivated',
    3,
    'Met the People Operations team and started documenting onboarding tasks.',
    '2026-04-25 11:00:00+00'
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'anxious',
    5,
    'First outbound call block felt overwhelming and I am unsure about the script.',
    '2026-04-26 16:40:00+00'
  );

-- Demo chat messages for the future AI buddy conversation history.
insert into chat_messages (
  trainee_id,
  sender,
  message,
  created_at
) values
  (
    '11111111-1111-4111-8111-111111111111',
    'trainee',
    'Who should I ask about CRM access?',
    '2026-04-24 09:35:00+00'
  ),
  (
    '11111111-1111-4111-8111-111111111111',
    'assistant',
    'Start with your mentor and Service Desk. Add the blocker to your onboarding checklist so HR can track it.',
    '2026-04-24 09:35:20+00'
  );

-- Demo sentiment analysis entries for later AI integration.
insert into sentiment_analysis (
  trainee_id,
  source_text,
  sentiment,
  risk_level,
  summary,
  recommended_action
) values
  (
    '22222222-2222-4222-8222-222222222222',
    'First outbound call block felt overwhelming and I am unsure about the script.',
    'anxious',
    'high',
    'The trainee feels overloaded during role practice.',
    'Schedule a mentor check-in and add one call shadowing session.'
  ),
  (
    '11111111-1111-4111-8111-111111111111',
    'Finished the first UI task and got helpful feedback from the mentor.',
    'positive',
    'low',
    'The trainee is progressing well and receiving feedback.',
    'Keep the current onboarding cadence.'
  );

-- Demo alerts visible to HR during onboarding monitoring.
insert into alerts (
  trainee_id,
  type,
  severity,
  message,
  is_resolved
) values
  (
    '22222222-2222-4222-8222-222222222222',
    'stress_level',
    'high',
    'Stress level reached 5 during role practice.',
    false
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'mentor_follow_up',
    'medium',
    'Trainee requested more help with the sales script.',
    false
  ),
  (
    '11111111-1111-4111-8111-111111111111',
    'access_blocker',
    'low',
    'CRM access question was routed to Service Desk.',
    true
  );

-- Demo adaptation tips used by profile and buddy experiences.
insert into adaptation_tips (
  stage,
  day_from,
  day_to,
  title,
  content
) values
  (
    'Team introduction',
    1,
    7,
    'Meet the team intentionally',
    'Book short intro chats with direct collaborators and write down who owns each process.'
  ),
  (
    'First month onboarding',
    8,
    30,
    'Turn blockers into checklist items',
    'Capture unclear access, process, or ownership questions in the onboarding checklist before the weekly mentor meeting.'
  ),
  (
    'Role practice',
    15,
    45,
    'Practice in smaller steps',
    'Break role tasks into observation, guided practice, and independent execution with feedback after each step.'
  );
