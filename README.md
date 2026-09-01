# Time With God

A quiet, minimal web experience that helps you intentionally spend personal time
with God. You choose how much time you have and what you're bringing; the app
suggests **one possible way** to spend that time — never a prescribed liturgy.

> You bring your heart. We help you make room for God.

The experience is Scripture-centered, personal, and deliberately un-gamified. It
does not speak for God, generate prayers on your behalf, or claim spiritual
authority. It offers structure and gentle prompts; the words you bring are your
own.

## Features

- **Guided journey** built from your available time (10–60 min) and intention.
- **Rule-based, deterministic generator** — a fresh journey each day from curated
  content, with no AI writing theology at runtime.
- **Scripture** shown verbatim from the public-domain World English Bible, clearly
  separated from reflection and prayer. Source is easy to swap.
- **Reflection, Gratitude, and Prayer** as open prompts you respond to yourself.
- **Be Still** silence timer and an optional closing blessing.
- **Optional worship music** with a full player, played from locally hosted,
  licensed audio (English + Indonesian), with graceful fallback when audio is
  missing.
- **Private journal** and a gentle **Moments** history — no streaks, no scores.
- **Bilingual** UI and content: English and Bahasa Indonesia, with a separate
  music-language preference.
- **Works offline-first** on local device storage; **optional** Supabase accounts
  for cross-device sync.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Self-hosted fonts via `@fontsource` (Playfair Display + Inter)
- Supabase (optional) for auth + sync
- `lucide-react` icons

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000. No configuration is required — the app runs on local
storage out of the box.

To create a production build:

```bash
npm run build
npm start
```

## Environment variables

Supabase is **optional**. Copy `.env.example` to `.env.local` and fill in the
values only if you want accounts and sync:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

When these are absent, sign-in is hidden and everything is saved on the device.

## Supabase setup (optional)

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run [`supabase/schema.sql`](./supabase/schema.sql). It
   creates `profiles`, `sessions`, and `journal_entries` with Row Level Security
   so each person only sees their own data.
3. Enable **Email** auth (magic link) under Authentication → Providers.
4. Add the URL + anon key to `.env.local`.

## Content

All theologically meaningful content is curated locally under `lib/content/`:

- `scriptures.ts` — passages (World English Bible, public domain)
- `themes.ts` — intentions and their linked passages
- `reflections.ts`, `prayerPrompts.ts`, `gratitudePrompts.ts` — open prompts
- `worship.ts` — worship track metadata

Every item is bilingual. To change the Scripture source, edit `scriptures.ts` or
swap in a provider in `lib/content/index.ts`; the rest of the app depends only on
the shape.

## Audio

Worship audio lives in `public/audio/worship/<lang>/`. The included `.mp3` files
are original, royalty-free ambient placeholders — replace them with licensed
music. See [`public/audio/README.md`](./public/audio/README.md). **Never host
copyrighted songs you don't have rights to.**

## Deployment (Vercel)

1. Push to a Git repository and import it into Vercel.
2. (Optional) add the two Supabase env vars in Project Settings.
3. Deploy. The default build command (`next build`) is all that's needed.

## Project structure

```
app/            # routes: /, /begin, /journey, /summary, /journal, /history, /settings
components/     # ui primitives + journey section views
lib/
  content/      # curated bilingual content + deterministic daily selection
  i18n/         # en.ts, id.ts, helpers
  journey/      # rule-based journey generator + section metadata
  store/        # settings + session contexts, local + Supabase repository
  supabase/     # graceful client factory
public/audio/   # locally hosted worship audio
supabase/       # schema.sql
```

## A note on boundaries

This app is not a church, a pastor, or a replacement for Scripture and community.
It never presents itself as divine authority, never generates prophetic messages,
and never infers your spiritual or emotional condition. It simply helps you make
room.
