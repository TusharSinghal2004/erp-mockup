# N.K. Impex ERP - Feature Documentation

This document outlines the features and design principles currently implemented in the N.K. Impex ERP Mockup. This prototype was built to demonstrate a strictly premium, workshop-ledger aesthetic for a gemstone bead manufacturer and exporter.

## Core Philosophy: "Human-in-the-Loop Automation"
Automation prepares the work, a person checks it, then it is saved.
* **Drafts:** Every automated action (bill capture, order sync, custom quote) appears as a "Draft".
* **Review Queue:** A centralized hub to Confirm, Edit, or Reject automated drafts.
* **Check This Markers:** Fields the system is uncertain about are highlighted in orange with a warning label for immediate human review.
* **Locked Attributes:** Immutable properties like Stone name, Treatment, and Grade are protected by a "Staff Entry Only" lock to preserve data integrity.

## Design System & Aesthetics
* **Quietly Premium:** A clean, trustworthy "workshop ledger" feel avoiding flashy startup tropes. No glassmorphism, heavy gradients, or unnecessary drop shadows.
* **Typography:** `Spectral` for elegant page titles; `IBM Plex Sans` for all tabular data and UI text.
* **Color Palette:** 
  * Backgrounds: Light `#F6F8F8` with `#FFFFFF` surfaces.
  * Accents: Deep Emerald (`#0D6B5B`) for primary actions, paired with tint (`#E3F0ED`).
  * Strict status colors: Draft (Amber), Confirmed (Green), Production (Blue), Pending (Grey), Needs Check (Orange), Rejected/Overdue (Red).
* **Layout:** 8px base grid, compact 40px table rows, clean 4px-8px border radii relying entirely on subtle `#D3DCDD` borders instead of shadows for separation.

## Implemented Modules

### 1. Dashboard
A sparse, high-level overview of the day's operations.
* **Metric Cards:** Orders to pack, drafts to review, low stock items, pending jobs, and payments due.
* **Quick Actions:** One-click access to common workflows (New Order, Capture Bill, Reply Enquiry).
* **Production Load:** Minimalist progress bars showing the distribution of jobs across manufacturing stages.
* **Pending Orders & Activity:** A quick-glance table of urgent orders and a timeline of recent system events.

### 2. Inventory Management
* **List View:** Toggle between dense data tables and visual grid cards.
* **Filtering:** Comprehensive filters for Stone, Shape, Treatment, Location, and Status.
* **Item Detail:** Features a photo placeholder, QR label preview, unit conversions (strands, pieces, carats, grams), listed sales channels, and a historical stock movement ledger.
* **Mobile Stock Count:** A mobile-first scanning interface with simulated camera/QR scanning capabilities and quick quantity updates.

### 3. Production Kanban
* **Stages:** Tracks job lots across Cutting, Shaping, Polishing, Quality Check, and Packing.
* **Job Cards:** Displays SKU, allocated raw material, current weight, and wastage percentage.
* **Progress Badges:** Clear visual indicators of whether a job is on track or delayed.

### 4. Orders & Enquiries
* **Multi-Channel:** Distinct badges and tracking for Etsy, Wholesale, and Export orders.
* **Custom Orders:** Draft quote preview combining raw request text with structured cost, lead time, and matched stock suggestions.
* **Enquiries Inbox:** Simulates WhatsApp and Email threads with AI-drafted replies awaiting human confirmation.

### 5. Automated Bill Capture (Purchasing)
* **Source Comparison:** A side-by-side view showing the original uploaded invoice against the data extracted by the system.
* **Confidence Highlighting:** Fields with low OCR confidence are flagged with the "Check This" marker to prevent incorrect stock entry.

### 6. Export Documents
* **Commercial Invoices & Packing Lists:** Draft generation with editable HS codes, duty tables, and clear "Draft" vs "Approved" states.

### 7. Review Queue
* **Central Inbox:** The beating heart of the human-in-the-loop system, gathering all pending actions (drafted emails, unverified bills, custom quotes) into a single, quickly processable list.

## Technology Stack
* React 18 + TypeScript
* Vite (Build Tool)
* Tailwind CSS v4 (Strictly configured for the design system)
* React Router DOM (Navigation)
* Lucide React (Consistent 20px line-icon set)
