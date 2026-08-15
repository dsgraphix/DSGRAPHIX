# DS-Graphix — Studio Website & Lead Engine

High-craft creative & digital design studio web application for **DS-Graphix**, built with React 19, Vite, Tailwind CSS v4, GSAP, Lenis Smooth Scroll, and a Node.js Express backend API integrating Resend for form dispatches.

---

## 🚀 Features

- **Brutalist Dark Design System**: High-contrast, typography-first UI engineered around commercial conversions.
- **Interactive Project Calculator**: 4-step interactive estimation calculator with automated quote dispatches.
- **Careers Application Engine**: Candidate role application modal sending structured HTML applications.
- **Resend Email Integration**: Server-side Resend API email notifications sent from verified domain `dsgraphix.in`.
- **Backend Security**: All API keys stored strictly in `server/.env` with zero client-side leaks.
- **Smooth Scroll & Animation**: Lenis smooth scrolling paired with GSAP ScrollTrigger micro-animations.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8, React Router v7, Tailwind CSS v4, Lucide Icons, Sonner Toasts.
- **Backend API**: Node.js, Express 5, Resend HTTP API (`hello@dsgraphix.in`).
- **Serverless API**: `api/send-email.js` for Vercel/Netlify hosting.

---

## 📦 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Create `server/.env` with the following variables:

```env
PORT=5000
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=DS-Graphix <hello@dsgraphix.in>
TO_EMAIL=hello@dsgraphix.in
```

### 3. Running Locally

Start the backend API server:
```bash
npm run server
```

Start the frontend Vite development server:
```bash
npm run dev
```

### 4. Building for Production

```bash
npm run build
```

---

## 🌐 Social Media Links

- **Instagram**: [https://www.instagram.com/dsgra.phix/](https://www.instagram.com/dsgra.phix/)
- **Behance**: [https://www.behance.net/dhananjaychalke](https://www.behance.net/dhananjaychalke)
- **LinkedIn**: [https://www.linkedin.com/in/dhananjay-chalke-a217b629a](https://www.linkedin.com/in/dhananjay-chalke-a217b629a)

---

&copy; DS-Graphix. All Rights Reserved. Founded by Dhananjay Chalke.
