# Railway Deployment

The project runs as three Railway components: the Next.js service, a PostgreSQL database, and a Storage Bucket.

## 1. One-time setup

1. **Create the project** — railway.com → New Project (or `railway init` with the CLI).
2. **Add PostgreSQL** — New → Database → PostgreSQL. Copy the public `DATABASE_URL` (Connect tab).
3. **Create the Storage Bucket** — New → Storage Bucket. Note the endpoint, bucket name, access key ID, and secret access key.
4. **Add the Next.js service** — New → GitHub Repo → select this repository. Railway auto-detects Next.js (`npm run build` / `npm run start`).
5. **Set environment variables** on the Next.js service (Variables tab) — every variable from `.env.example`:
   - `DATABASE_URL` — use Railway's variable reference to the Postgres service (`${{Postgres.DATABASE_URL}}`) so it stays in sync
   - `ADMIN_PASSCODE_HASH` — generate locally: `npm run hash-passcode "your-long-passcode"`
   - `ADMIN_SESSION_SECRET` — `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - the five `RAILWAY_BUCKET_*` values from step 3
   - `MAX_UPLOAD_MB`, optionally `RESEND_API_KEY`

## 2. Migrate and seed (run locally against the production DB)

```bash
npm install
npm run db:generate   # generates SQL migration files into drizzle/ (commit them)
npm run db:migrate    # applies migrations to DATABASE_URL from .env.local
npm run db:seed       # idempotent — safe to re-run
```

For subsequent schema changes: edit `db/schema/*` → `db:generate` → review the SQL → commit → `db:migrate`. Never auto-push schema changes on startup.

## 3. Deploy and verify

1. Push to GitHub — Railway builds and deploys automatically.
2. **Custom domain**: service → Settings → Networking → add `aashik.dev`, create the CNAME shown at your DNS provider.
3. **Health**: `https://<domain>/api/health` → `{"status":"ok","database":"ok","storage":"configured"}`.
4. **Verify uploads**: log in at `/admin/login`, upload an image in Media, confirm it renders at its `/api/media/<id>` URL.
5. **Verify persistence**: create a draft post, redeploy the service, confirm it survives.

## 4. Operations

- **Rotate secrets**: bucket keys and DB password rotate from their Railway service settings; update the service variables. Rotating `ADMIN_SESSION_SECRET` logs you out everywhere (that's the point). Rotate the passcode by re-running `npm run hash-passcode` and updating `ADMIN_PASSCODE_HASH`.
  - ⚠️ The DB password and bucket access key ID were pasted in a chat during development — rotate both before going live.
- **Backups**: enable scheduled backups on the Postgres service; before risky work run `pg_dump "$DATABASE_URL" > backup-$(date +%F).sql`. Restore: `psql "$DATABASE_URL" < backup-....sql`.
- **Inspect data**: `npm run db:studio` locally, or Railway's Table View on the Postgres service. No SQL console exists in the CMS by design.
- **Logs**: Railway service → Observability. The app logs failed logins, upload failures, and audit events server-side only.

## First login

1. `npm run hash-passcode "choose-a-long-unique-passphrase"`
2. Put the printed hash in `.env.local` (and Railway variables) as `ADMIN_PASSCODE_HASH`.
3. Visit `/admin/login`. Sessions last 8 hours; Log out is in the CMS header.
