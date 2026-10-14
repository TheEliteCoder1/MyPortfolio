# MyPortfolio (React client + Express/MongoDB API)

## Setup
1. Copy `.env.example` to `.env` and set `JWT_SECRET` (and `MONGODB_URI` if using Atlas).
2. `npm install`  (root: backend)
3. `npm install --prefix client`  (React client)
4. `npm run dev`  (client on :5173, API on :5000)

## Endpoints
| Resource | Public | Needs token |
|---|---|---|
| /api/auth/signup, /signin, /signout | all | - |
| /api/auth/me | - | GET |
| /api/projects, /api/qualifications | GET | POST, PUT, DELETE |
| /api/contacts | POST | GET, PUT, DELETE |
| /api/users | - | all |

Send the token as header: `Authorization: Bearer <token>`.
Sign-out is client-side token removal (JWTs are stateless).
