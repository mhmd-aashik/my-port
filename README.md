# aashik.dev — Portfolio + Private CMS

Database-driven portfolio of Mohammed Aashik with a private, owner-only CMS at `/admin`. Next.js 16 · Drizzle ORM · PostgreSQL (Railway) · Railway Storage Bucket · Tailwind 4.

## Quick start

```bash
npm install
cp .env.example .env.local          # then fill in values (see below)
npm run hash-passcode "passcode"    # → paste output into .env.local
npm run db:generate                 # generate SQL migrations into drizzle/
npm run db:migrate                  # apply to DATABASE_URL
npm run db:seed                     # idempotent content seed
npm run dev                         # http://localhost:3000  (CMS: /admin)
```

## Scripts

| Script | Purpose |
|---|---|
| `dev` / `build` / `start` | Next.js |
| `lint` / `typecheck` / `test` | ESLint · tsc · Vitest unit tests |
| `db:generate` | Generate reviewable migrations from `db/schema/*` |
| `db:migrate` | Apply migrations |
| `db:studio` | Drizzle Studio (safe DB inspection) |
| `db:seed` | Idempotent seed from `data/*.ts` + `content/blog/*.md` |
| `db:reset-dev` | Truncate all tables — dev only, guarded |
| `hash-passcode` | Generate `ADMIN_PASSCODE_HASH` |

## How content works

- **All editable content lives in PostgreSQL** and is managed at `/admin` (settings, profile, about, experience, education, projects, skills, story, blog, media, messages, audit log).
- `data/*.ts` and `content/blog/*.md` are **seed sources only** — after seeding, edit through the CMS.
- Public pages use ISR; every CMS save revalidates the affected pages, sitemap, and RSS — no redeploys needed.
- Drafts and archived content never appear publicly; preview drafts from the blog list in the CMS.
- Uploads go to the private Railway bucket; images/CV are served through `/api/media/[id]`.

## Docs

- `docs/architecture.md` — ERD (Mermaid), security model, storage flow, data safety
- `docs/railway-deployment.md` — step-by-step Railway setup, migration, backup/restore, secret rotation

## Structure

```
app/            public pages · /admin CMS · /api (contact, media, health)
components/     layout, home sections, projects, forms, ui, admin
db/             drizzle client, schema (21 tables), relations
drizzle/        generated SQL migrations (created by db:generate)
lib/            content queries, markdown pipeline, admin auth/session/audit,
                storage (S3), validation, env loader
scripts/        hash-passcode, seed, reset-dev
tests/          vitest units: session, validation, markdown, file validation
data/ content/  seed sources (not the runtime content source)
```

## Before going live

1. Fill `RAILWAY_BUCKET_SECRET_ACCESS_KEY` in `.env.local`.
2. Set `ADMIN_PASSCODE_HASH` (never commit it; keep `.env.example` values empty).
3. Rotate the DB password and bucket credentials in Railway (they were shared in chat during development).
4. Fill the `[Add ...]` placeholders in My Story via the CMS.
5. Follow `docs/railway-deployment.md`.
