# PH Assignment-11 — NextRun Tracker

NextRun Tracker is a modern e-commerce–based SaaS application built with React. It provides users with a smooth shopping and order-tracking experience, while offering admins a powerful dashboard to manage products, orders, users, and payments.

---

## 🚀 Live Overview

NextRun Tracker focuses on:

- Clean UI/UX
- Role-based dashboards (User / Admin)
- Order lifecycle tracking
- Secure payment visualization
- Scalable SaaS-ready architecture

---

## Live Site Link

- [https://mrirakib-ph-assignment-11.netlify.app/](https://mrirakib-ph-assignment-11.netlify.app/)

## Client Repository

- [https://github.com/mrirakib04/ph-assignment-11-web](https://github.com/mrirakib04/ph-assignment-11-web)

## Server Repository

- [https://github.com/mrirakib04/ph-assignment-11-server](https://github.com/mrirakib04/ph-assignment-11-server)

---

## 🛠 Tech Stack

- **React** (Vite)
- **React Router**
- **Stripe**
- **Tailwind CSS**
- **Material UI (MUI)**
- **TanStack React Query**
- **Axios**
- **Firebase Authentication**
- **Recharts** (charts & analytics)
- **react-fast-marquee**
- **jsPDF & jspdf-autotable**
- **React Icons**
- **SweetAlert2**
- **React Toastify**

---

## ✨ Core Features

### 🔐 Authentication

- Firebase Email/Password authentication
- Google login support
- Protected routes
- Role-based access (User / Admin)

### 🛒 User Features

- Browse products
- Place orders
- View **My Orders** with:
  - Status (Pending / Approved / Rejected / Cancelled)
  - Payment status
  - Order tracking timeline
- Cancel pending orders
- Download order invoice as **PDF**
- Copy Order ID with one click
- Profile management (name & photo)

### 📊 Admin Features

- Dashboard analytics:
  - Total users
  - Total products
  - Total orders
  - Total revenue
- Order management:
  - Approve / Reject orders
  - Add tracking information
- Product management
- User role & status control
- Order status charts (Pie / Bar)

### 🏠 Homepage Sections

- Hero header
- Featured products (smart grid system)
- Why Choose Us
- Partner marquee
- Modern footer

---

## Dependencies

```json
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/material": "^7.3.6",
    "@stripe/react-stripe-js": "^5.4.1",
    "@stripe/stripe-js": "^8.6.0",
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.12",
    "axios": "^1.13.2",
    "dotenv": "^17.2.3",
    "firebase": "^12.6.0",
    "jspdf": "^3.0.4",
    "jspdf-autotable": "^5.0.2",
    "prop-types": "^15.8.1",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-fast-marquee": "^1.6.5",
    "react-head": "^3.4.2",
    "react-icons": "^5.5.0",
    "react-router": "^7.10.1",
    "react-toastify": "^11.0.5",
    "recharts": "^3.6.0",
    "sweetalert2": "^11.26.10",
    "swiper": "^12.0.3",
    "tailwindcss": "^4.1.17"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
```

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/nextrun-tracker-client.git
cd nextrun-tracker-client
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_API_BASE_URL=your_backend_api_url
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4️⃣ Run the project

```bash
npm run dev
```

---

## Author
