# DS-Graphix — Cloud Architecture & Studio Platform

High-performance digital studio web application and lead engine for **DS-Graphix**. Engineered with a decoupled full-stack architecture utilizing modern cloud services for maximum speed, security, and scalability.

---

## 🏛️ System Architecture & Services Overview

The platform is split into a **Frontend Client SPA** and a **Dedicated Backend API Server**, backed by managed cloud databases, asset storage, and email infrastructure:

```mermaid
graph TD
    Client["Client Browser (User / Admin)"]
    
    subgraph Frontend ["Frontend (Vercel)"]
        VercelApp["React 19 + Vite SPA (dsgraphix.in)"]
        VercelProxy["vercel.json Reverse Proxy (/api/*)"]
    end
    
    subgraph Backend ["Backend (Railway)"]
        ExpressServer["Node.js Express 5 API (dsgraphix-production.up.railway.app)"]
    end
    
    subgraph CloudServices ["Managed Cloud Infrastructure"]
        Postgres["PostgreSQL Database (Neon / Railway)"]
        Cloudinary["Cloudinary CDN (Project Media & Assets)"]
        Resend["Resend API (hello@dsgraphix.in)"]
    end

    Client -->|Loads Static Assets & SPA UI| VercelApp
    Client -->|Submits Forms / Admin CMS Actions| VercelProxy
    VercelProxy -->|Proxies /api/* requests| ExpressServer
    ExpressServer -->|Queries / Mutations| Postgres
    ExpressServer -->|Uploads / Fetches Images| Cloudinary
    ExpressServer -->|Dispatches Leads & Quotes| Resend
```

---

## ☁️ Cloud Services & Infrastructure Map

| Component / Layer | Managed Service / Platform | Live Endpoint / Role | Primary Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Application** | **Vercel** | `https://dsgraphix.in` *(or custom Vercel domain)* | Hosts the compiled React 19 + Vite client bundle with global Edge CDN caching and instant deployments. |
| **Backend API Server** | **Railway** | `https://dsgraphix-production.up.railway.app` | Runs the persistent Node.js Express 5 server handling authentication, CMS CRUD, and third-party integrations. |
| **Database** | **PostgreSQL** *(Neon / Railway)* | Direct SSL Connection String | Relational storage for studio portfolio projects, tags/categories, and admin user credentials. |
| **Asset & Media Storage** | **Cloudinary** | Cloudinary CDN (`res.cloudinary.com`) | Handles direct image uploads from the Admin CMS, auto-formats WebP/AVIF, and delivers optimized media. |
| **Transactional Email Engine** | **Resend** | `api.resend.com` (`hello@dsgraphix.in`) | Sends automated project estimate quotes, client contact inquiries, and career recruitment applications. |
| **Routing & Reverse Proxy** | **Vercel Rewrites** | `vercel.json` | Seamlessly rewrites all `/api/*` requests directly to Railway, eliminating cross-origin (CORS) friction. |

---

## 🛠️ Technology Stack

### Frontend Client
- **Framework**: React 19, Vite 8, React Router v7
- **Styling**: Tailwind CSS v4
- **Animation & FX**: GSAP ScrollTrigger, Lenis Smooth Scroll
- **UI Icons & Toasts**: Lucide React, Sonner

### Backend Server
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express 5
- **Database Driver**: `pg` (node-postgres with pooling & auto schema initialization)
- **File Uploads**: `multer` + `multer-storage-cloudinary`
- **Security & Auth**: JWT (JSON Web Tokens), `bcryptjs`, `cookie-parser`, `cors`, `express-rate-limit`

---

## 🔑 Environment Variables Reference

All sensitive secrets are kept strictly server-side in `server/.env`. **Never commit `.env` to version control.**

Refer to [`server/.env.example`](file:///server/.env.example) for a template:

```env
# -------------------------------------------------------------
# DS-Graphix Backend Environment Configuration
# -------------------------------------------------------------

# 1. Server Configuration
PORT=5000

# 2. Database (PostgreSQL — Neon or Railway Postgres)
DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require

# 3. Security & Admin Authentication
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
ADMIN_EMAIL=admin@dsgraphix.in
ADMIN_PASSWORD=YourSecureAdminPassword123!

# 4. Transactional Email Service (Resend)
RESEND_API_KEY=re_your_resend_api_key
FROM_EMAIL=DS-Graphix <hello@dsgraphix.in>
TO_EMAIL=hello@dsgraphix.in

# 5. Media Cloud Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# 6. Production Domain Lock & CORS
ALLOWED_ORIGIN=https://dsgraphix.in,https://your-app.vercel.app
```

---

## 💻 Local Development Workflow

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Local Environment
Create `server/.env` and paste your development keys (or leave `DATABASE_URL` empty to automatically use the built-in development fallback).

### 3. Start Development Servers

You can run both the backend and frontend concurrently:

**Terminal 1 — Backend Express Server:**
```bash
npm run server
# Runs on http://localhost:5000 with healthcheck at /api/health
```

**Terminal 2 — Frontend Vite Dev Server:**
```bash
npm run dev
# Runs on http://localhost:3000 (automatically proxies /api to http://localhost:5000)
```

---

## 🚀 Production Deployment & Service Configuration

### 1. Frontend Deployment on Vercel
1. Link this repository to **Vercel**.
2. **Build Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. The included [`vercel.json`](file:///vercel.json) automatically proxies `/api/*` to the live Railway backend:
   ```json
   {
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://dsgraphix-production.up.railway.app/api/:path*"
       },
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

### 2. Backend Deployment on Railway
1. Create a new service in **Railway** from this GitHub repository.
2. **Start Command**: `npm run start` (or `node server/index.js`).
3. Add all environment variables from `server/.env.example` into the Railway Service Settings:
   - `DATABASE_URL` (From Neon or Railway Postgres plugin)
   - `JWT_SECRET`
   - `ADMIN_EMAIL` & `ADMIN_PASSWORD`
   - `RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `ALLOWED_ORIGIN` (Set to your Vercel domains)

### 3. Media Storage on Cloudinary
1. Sign up at [Cloudinary](https://cloudinary.com) (Free tier).
2. Copy `Cloud Name`, `API Key`, and `API Secret` from your dashboard to your Railway backend environment variables.

### 4. Email Service on Resend
1. Sign up at [Resend](https://resend.com).
2. Verify the `dsgraphix.in` sending domain (add required DKIM & SPF records in your DNS provider).
3. Generate an API Key and set `RESEND_API_KEY` on Railway.

---

## 📁 Project Structure

```text
DS-GRAPHIX/
├── api/                     # Standalone serverless email function reference
│   └── send-email.js
├── public/                  # Static assets, logos, and icons
├── server/                  # Backend Node.js / Express application
│   ├── config/              # DB connection & environment variable validation
│   │   ├── db.js            # PostgreSQL client & schema initializer
│   │   └── env.js           # Env config loader & validation rules
│   ├── controllers/         # Request handlers (Auth, Projects, Emails)
│   ├── middleware/          # JWT auth validation & Multer upload middleware
│   ├── routes/              # Express API route endpoints
│   ├── services/            # Cloudinary & Resend external service wrappers
│   ├── .env.example         # Template for environment variables
│   └── index.js             # Express app entrypoint & middleware setup
├── src/                     # Frontend React 19 Application
│   ├── components/          # Reusable UI components & modals
│   ├── context/             # AuthContext (Admin authentication state)
│   ├── lib/                 # Utility functions, motion config, API clients
│   ├── pages/               # Application pages & Admin CMS dashboard
│   ├── App.jsx              # Main router & page layout structure
│   ├── index.css            # Global CSS & Tailwind styling
│   └── main.jsx             # React DOM entrypoint
├── vercel.json              # Vercel SPA routing & Railway API proxy rules
├── vite.config.js           # Vite build config & local /api proxy configuration
└── package.json             # Workspace dependencies & npm scripts
```

---

## 🔒 Security Best Practices

- **Zero Client-Side Secrets**: All API keys (Resend, Cloudinary, Database, JWT) are restricted to the Railway backend.
- **Strict Origin Lockdown**: Backend validates incoming origins against approved Vercel domains and local dev hosts.
- **HttpOnly Cookies**: Admin authentication sessions are secured via signed JWT tokens in secure cookies.
- **Automated Rate Limiting**: Protection against brute-force and submission spam on sensitive endpoints.

---

## 🌐 Studio Links & Contacts

- **Website**: [https://dsgraphix.in](https://dsgraphix.in)
- **Instagram**: [@dsgra.phix](https://www.instagram.com/dsgra.phix/)
- **Behance**: [Dhananjay Chalke](https://www.behance.net/dhananjaychalke)
- **LinkedIn**: [Dhananjay Chalke](https://www.linkedin.com/in/dhananjay-chalke-a217b629a)

---

&copy; **DS-Graphix**. All Rights Reserved. Founded by Dhananjay Chalke.
