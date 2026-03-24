# 🌾 Daisy Hill Tactical: Montana Conquest Dashboard
**Location:** Glasgow ⇄ Montana 4x | **Status:** Active Operation

![Daisy Hill Hybrid Emblem](./public/edited-emblem.png)

## 🎯 The Mission
A high-performance, real-time agricultural management suite built to track the **122-Field Conquest** of the Montana 4x Borderline territory. This project serves as the central command center for the Daisy Hill Farms simulation division, bridging the gap between hardcore simulation and professional data tracking.

## 🛠️ Tech Stack (Optimized for Single-Monitor Workflow)
- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL) with Real-time Subscriptions
- **Styling:** Tailwind CSS (Tactical Noir Aesthetic)
- **Deployment:** Vercel
- **Hardware Target:** Optimized for GTX 1660 Super / Ryzen 5 3600

## 🚀 Key Features
- **Live Conquest Grid:** Real-time visual tracking of 122 individual field statuses.
- **Sponsor Engine:** Dynamic "Naming Rights" system for community field ownership.
- **Automated Stream Alerts:** OBS-ready browser sources for "Field Captured" and "Goal Reached" events.
- **Financial Suite:** Integrated "Monitor Fund" tracking to scale hardware infrastructure.
- **Mobile Command Center:** Secure, thumb-optimized admin panel for mid-harvest updates.

## 📁 Project Structure
```text
├── app/
│   ├── admin/          # Mobile-optimized field & finance management
│   ├── alert/          # OBS Browser Source: Field Capture
│   ├── alert-goal/     # OBS Browser Source: Hardware Goal Reached
│   ├── contact/        # Cinematic sponsorship gateway
│   ├── news/           # Official mission dispatches
│   └── page.tsx        # Public-facing Conquest Dashboard
├── db/
│   └── supabase.ts     # Database client configuration
└── public/             # Optimized brand assets & hybrid emblems
