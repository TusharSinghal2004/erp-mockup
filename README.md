# N.K. Impex — Gemstone ERP Mockup

A clickable front-end prototype of an ERP system for **N.K. Impex**, a Jaipur-based gemstone bead manufacturer and exporter selling on Etsy, to wholesale buyers, and to export customers.

> **This is a design prototype for client demo purposes only.**  
> All data is hard-coded mock data. No backend, no real AI calls, no authentication.

## Quick Start

```bash
npm install
npm run dev
```

Open **http://localhost:5173/** in your browser.

## Tech Stack

- **React 19** + **Vite** + **TypeScript**
- **Tailwind CSS v4** for styling
- **React Router v6** for navigation
- **Lucide React** for icons
- **Google Fonts**: Playfair Display (serif titles) + Inter (sans body)
- State managed in-memory with React `useReducer`

## Core Principle

> **Automation prepares the work, a person checks it, then it is saved.**

Every automated item appears as a **Draft** with clear **Confirm / Edit / Reject** actions. Fields the system is unsure about get a highlighted **"⚠ Check this"** marker. Stone name, treatment, and grade are locked fields marked **"🔒 Staff entry only"**.

There is no AI analysis, scoring, or advice anywhere in the UI.

## Screens

| # | Screen | Route | Description |
|---|--------|-------|-------------|
| 1 | Dashboard | `/` | KPI cards, quick actions, recent activity, pending orders |
| 2 | Inventory | `/inventory` | 40 items, filters, search, table/grid toggle, item detail, QR label, stock count mode |
| 3 | Production | `/production` | Kanban board (5 stages), job cards, outside karigar list |
| 4 | Bill Capture | `/bills` | Split-screen: bill image + extracted draft, "Check this" markers |
| 5 | Orders | `/orders` | Etsy/Wholesale/Export tabs, status filters, order detail modal |
| 6 | Custom Orders | `/custom-orders` | Incoming request → structured draft → quote email preview |
| 7 | Export Docs | `/export-docs` | Commercial invoice + packing list drafts, HS code table |
| 8 | Enquiries | `/enquiries` | WhatsApp/email threads, extracted request, matched stock, draft reply |
| 9 | Reviews | `/reviews` | Star ratings, issue tags, complaint summary, draft replies |
| 10 | Reports | `/reports` | Stock valuation, sales by channel, production yield, Ask Your Data, slow-moving stock |
| 11 | Review Queue | `/review-queue` | All pending drafts in one list with quick confirm |
| 12 | Settings | `/settings` | Users/roles, automation toggles |

## Mock Data

- **40 inventory items** with realistic gemstone beads (Moss Aquamarine, Fluorite, Citrine, Emerald, Peridot, Moonstone, Topaz, etc.)
- **7 customers** across Etsy (US, UK, Germany), Wholesale (India), and Export
- **5 suppliers** from Jaipur, Surat, and Tanzania
- **6 production jobs** across all Kanban stages
- **10 orders** with mixed statuses and channels
- Bill captures, enquiries, reviews, export documents, and custom order requests

## Interactions That Work

- ✅ **Confirm/Approve/Reject** buttons update status and reduce the review queue badge count
- ✅ **Dark mode toggle** in the top bar
- ✅ **Sidebar collapse** on desktop, overlay on mobile
- ✅ **Global search** with live dropdown results
- ✅ **Inventory filters** (stone, shape, treatment, location, status)
- ✅ **Table/Grid toggle** in inventory
- ✅ **Stock count mode** with simulated scan
- ✅ **Production Kanban** with "Move to next stage" action
- ✅ **Toast notifications** after every action
- ✅ **Review queue badge** that updates as drafts are confirmed
- ✅ **"Ask your data"** search in reports
- ✅ **Slow-moving stock** period selector
- ✅ **Empty states** shown when all items are confirmed

## Design

- **Light theme** with dark mode toggle
- **Color**: Deep teal/emerald accent on cool neutral greys
- **Typography**: Playfair Display (serif page titles) + Inter (sans body)
- **Responsive**: Works on desktop and mobile (sidebar collapses to overlay)
- **Data tables**: Compact rows, sticky headers, clear status badges
- **Accessibility**: Focus-visible outlines, adequate contrast

## Walkthrough

### Dashboard
The dashboard shows KPI cards (orders to pack, drafts to review, low stock, pending jobs, payments due), quick action shortcuts, a recent activity feed, and a pending orders table.

### Bill Capture Flow
1. Navigate to **Bill Capture** (`/bills`)
2. Two draft bills are shown in split-screen layout
3. Left side: bill image placeholder. Right side: extracted data
4. Notice the **"⚠ Check this"** markers on uncertain fields
5. Click **Confirm & Create Stock** → success banner appears, draft count decreases
6. Or click **Reject** → bill is marked rejected

### Custom Order Quote Flow
1. Navigate to **Custom Orders** (`/custom-orders`)
2. Left: incoming request "peridot marquise, 6×12 mm, 40 pieces"
3. Right: structured draft with matched stock, cost breakdown, and draft quote email
4. Notice the "This email will NOT be sent until you approve it" warning
5. Click **Approve Quote** → success state, draft count decreases

### Review Queue
1. Navigate to **Review Queue** (`/review-queue`)
2. All pending drafts from all modules are listed
3. Each has a **Confirm** button for quick action or **Open** to navigate to the detail
4. Confirming items reduces the count. When all are confirmed, "All caught up!" empty state appears

## License

This is a client demo prototype. Not for production use.
