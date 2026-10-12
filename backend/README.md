# LearnSphere Backend

The backend is an Express/Mongoose API for authenticated LearnSphere data. AI responses remain demo-only in the frontend; this API persists user-owned application data and does not call an external AI service.

## Setup

From the repository root:

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

Set `MONGODB_URI` to a MongoDB Atlas connection string and replace `JWT_SECRET` with a long random value. `CLIENT_URL` should match the Vite origin (`http://localhost:5173` by default). The server listens on port 5000 unless `PORT` is set.

## API

`GET /api/health` is public. Register or log in with `/api/auth/register` and `/api/auth/login`; send the returned token as `Authorization: Bearer <token>` to use profile, document, conversation, study-plan, focus-session, and progress endpoints. All protected records are scoped to the authenticated user.

Uploaded PDF, PPTX, TXT, PNG, JPG, and JPEG files are stored under `backend/uploads` with generated filenames. The directory is private and downloads require authentication plus ownership.

## Verification

Run `npm test` from `backend` for the lightweight validation tests. Use the frontend with `npm run dev` from the repository root. Atlas-backed tests require valid network access and credentials in `backend/.env`.

Future document analysis, translation, question answering, quiz generation, and recommendation agents should be added as separate services and endpoints; no AI provider is configured in this phase.
