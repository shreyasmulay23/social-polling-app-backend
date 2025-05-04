# 🗳️ Social Polling Backend (Node.js + Supabase)

[![GitHub Repo stars](https://img.shields.io/github/stars/shreyasmulay23/social-polling-app-backend?style=flat-square)](https://github.com/shreyasmulay23/social-polling-app-backend/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/shreyasmulay23/social-polling-app-backend?style=flat-square)](https://github.com/shreyasmulay23/social-polling-app-backend/network)
[![Top Lang](https://img.shields.io/github/languages/top/shreyasmulay23/social-polling-app-backend?style=flat-square)](https://github.com/shreyasmulay23/social-polling-app-backend)
[![Last Commit](https://img.shields.io/github/last-commit/shreyasmulay23/social-polling-app-backend?style=flat-square)](https://github.com/shreyasmulay23/social-polling-app-backend/commits/main)
[![Website Status](https://img.shields.io/website?url=http%3A//social-polling-app-backend.onrender.com)](https://img.shields.io/website?url=http%3A//social-polling-app-backend.onrender.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-Framework-lightgrey.svg)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL+Auth-brightgreen.svg)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/Built%20With-TypeScript-blue?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![Deployed on Render](https://img.shields.io/badge/Deploy-Render-blueviolet)](https://render.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Open in VS Code](https://img.shields.io/badge/Open%20in-VSCode-007ACC?logo=visualstudiocode&style=flat-square)](https://github.com/shreyasmulay23/social-polling-app-backend)

This is the backend API for a social polling application built using **Node.js**, **Express**, **Supabase**, and
**TypeScript**. It powers functionalities like creating, updating, deleting, and voting on polls, with proper
authentication and data consistency.
---

## 🚀 Features

### ✅ Core Capabilities

- 🔐 Auth-powered poll creation, editing, deletion
- 🗳️ One-vote-per-user logic with vote tracking
- 📝 Dynamic poll editing with vote-aware validation
- 📦 Clean REST API with Supabase integration
- 🔁 Client-server Supabase session handoff
- 🧼 Secure operations with ownership checks
- 🌐 Deployed on [Render.com](https://render.com)
- 🧪 Type-Safe API

---

## 🧠 Tech Stack

| Layer             | Tech                                 |
|-------------------|--------------------------------------|
| Backend           | Node.js, Express                     |
| Database          | Supabase (PostgreSQL)                |
| TypeScript        | Strongly typed JS                    |
| Auth              | Supabase Auth                        |
| Realtime          | Supabase Realtime                    |
| CORS + Middleware | For JSON parsing and frontend access |
| Deployment        | Render.com                           |

---

## 📁 Project Structure

```bash

/social-polling-app-backend
├──src
├─── controllers/
│ ├─── auth.controller.ts
│ ├─── poll.controller.ts
│ └─── vote.controller.ts
├─── routes/
│ ├─── auth.routes.ts
│ ├─── polls.routes.ts
│ └─── votes.routes.ts
├─── services/
│ ├─── auth.service.ts
│ ├─── polls.service.ts
│ └─── votes.service.ts
├─── utils/
│ ├─── ApiError.ts
│ ├───supabaseClient.ts
├─── app.ts
├─── server.ts
|── .env
└── tsconfig.json
```

---

## 🌐 REST API Reference

### 🔑 Auth

| Method | Route     | Description                                               |
|--------|-----------|-----------------------------------------------------------|
| POST   | `/login`  | Log in and return Supabase access_token and refresh_token |
| POST   | `/signup` | Register user and return token                            |

### 📋 Polls

| Method | Route                   | Description                       |
|--------|-------------------------|-----------------------------------|
| POST   | `/poll/create`          | Create a new poll                 |
| PATCH  | `/poll/:pollId`         | Update a poll (if no votes)       |
| DELETE | `/poll/:pollId`         | Delete poll (only if owner)       |
| GET    | `/poll/:pollId`         | Get poll title/question           |
| GET    | `/poll/options/:pollId` | Get poll options with vote counts |

### 🗳️ Voting

| Method | Route   | Description                      |
|--------|---------|----------------------------------|
| POST   | `/vote` | Vote on a poll (1 vote per user) |

---

## ⚙️ Setup Instructions

```bash

git clone https://github.com/shreyasmulay23/social-polling-app-backend
cd social-polling-app-backend
npm install

Create a .env file:

SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>

Start the server:

npm run dev
```

---

## ⚠️ Limitations

- 🗳️ Vote editing is not supported once submitted
- 📱 Currently designed for single-device login (no refresh token strategy)
- 💾 No Redis or rate-limiting middleware (could be added for security)
- ✉️ No email verification on signup (handled by Supabase if configured)

---

## ✨ Future Improvements

- 📊 Admin dashboard to monitor polls/votes
- 🛡️ Add rate limiting and abuse prevention
- 📧 Email confirmation flow on signup
- 📱 Push notification for poll responses (via Supabase triggers or Edge Functions)
- 🗳️ Edit vote functionality

---

## 📜 License

MIT License © 2025 Shreyas Mulay

---

## 📫 Contact

Built by [Shreyas Mulay](https://shreyas-mulay.vercel.app/)

Full Stack Engineer | React ⚛️ / NextJs | Node.js 🚀 | Supabase 🛡️
