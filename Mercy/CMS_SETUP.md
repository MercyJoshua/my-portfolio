# Portfolio CMS Setup

## Frontend (existing app)
1. Copy `.env.example` to `.env` and set values.
2. Start frontend: `npm run dev`

## Backend (separate repo)
1. From your backend repository root:
2. Copy `.env.example` to `.env`
3. Install dependencies: `npm install`
4. Generate Prisma client: `npm run prisma:generate`
5. Run migration: `npm run prisma:migrate`
6. Seed initial content: `npm run prisma:seed`
7. Start backend: `npm run start:dev`

## API contracts
- Public:
  - `GET /api/projects`
  - `GET /api/skills`
  - `GET /api/timeline`
- Auth:
  - `GET /api/auth/google`
  - `GET /api/auth/google/callback`
  - `POST /api/auth/logout`
  - `GET /api/auth/me`
- Admin protected:
  - `POST|PATCH|DELETE /api/projects`
  - `POST|PATCH|DELETE /api/skills`
  - `POST|PATCH|DELETE /api/skill-categories`
  - `POST|PATCH|DELETE /api/timeline`

## Notes
- `Hero`, `Contact`, and `Footer` remain static in v1.
- Project images are URL/path fields in v1.
- Admin UI is available at `/admin` in the frontend app.
- This document assumes frontend and backend are split into separate repositories.
