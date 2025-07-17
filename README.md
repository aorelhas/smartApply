# 🚀 SmartApply: AI-Powered Personal Job Search Assistant

SmartApply is an **AI-powered job search assistant** designed to automate, analyze, and streamline your daily job hunt. It pulls jobs from multiple sources, evaluates them based on your personal skills and preferences, and even generates personalized pitches to help you apply faster and smarter.

---

## 🛠️ Tech Stack

| Layer      | Technology                                                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend   | [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)                                                                      |
| Backend    | [FastAPI](https://fastapi.tiangolo.com/), [Playwright](https://playwright.dev/), [OpenAI API](https://platform.openai.com/docs/api-reference) |
| Database   | [Supabase (PostgreSQL)](https://supabase.io/)                                                                                                 |
| AI/ML      | [OpenAI GPT-4o](https://openai.com/gpt-4o)                                                                                                    |
| Automation | GitHub Actions (planned)                                                                                                                      |

---

## 📂 Project Structure

```
/frontend      → Next.js frontend app
/backend       → FastAPI backend with scraping & AI processing
```

---

## ✨ Features

- ✅ Automated job scraping from multiple job boards
- ✅ AI parsing to extract key job info (tech stack, seniority, remote/onsite)
- ✅ Personal fit scoring based on your skills and preferences
- ✅ AI-generated personalized pitch for each job
- ✅ Dashboard to browse, filter, save, and track applications
- ✅ Status tracker for applied, saved, and rejected jobs

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Python 3.10+
- Node.js 18+
- Supabase account (free tier is sufficient)
- OpenAI API key

---

## 🔠 Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # Fill your Supabase and OpenAI credentials
uvicorn app.main:app --reload
```

The backend will be running on **[http://localhost:8000](http://localhost:8000)**

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local  # Configure API URL
npm run dev
```

The frontend will be running on **[http://localhost:3000](http://localhost:3000)**

---

## 🔒 Environment Variables

### Backend `.env`

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend `.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

> _Made with ❤️ by Carlos Orelhas_
