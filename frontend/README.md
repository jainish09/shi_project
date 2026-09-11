# Thermal Sentinel AI - Frontend Dashboard

The frontend module for **Thermal Sentinel AI**, an AI-powered GIS platform that uses satellite thermal anomaly data, geospatial context, historical thermal behavior, and AI classification to identify thermal incidents and assess risk.

Built by **Frontend Developer 1**.

---

## Tech Stack

* **React 19**
* **TypeScript**
* **Vite**
* **Tailwind CSS v4**
* **React Router v7**
* **Recharts**
* **Lucide React Icons**

---

## Features & Modules

1. **Dashboard Homepage (`/`)**:
   - 6 KPI stat cards (Total thermal anomalies, Active incidents, Critical-risk incidents, Industrial incidents, Wildfire incidents, Persistent heat sources).
   - **Leaflet Map Container Placeholder**: Styled tactical GIS space ready for **Member 2** map module integration.
   - 24-hour incident trend chart (Recharts).
   - Quick real-time alerts feed widget.

2. **Incident Management Table (`/incidents`)**:
   - Multi-column table (Incident ID, Location, Event Type, Confidence, Risk Score, Severity, Status, Detected Time, Actions).
   - Full text search, category/severity/status filtering, and column sorting.
   - Interactive incident details modal with satellite metadata, FRP MW rating, temperature in Kelvin, and recommended command actions.

3. **Alerts Triage Feed (`/alerts`)**:
   - Alert feed categorizing Critical incidents, High-risk incidents, Citizen reports, and Abnormal heat events.
   - Real-time status acknowledgement trigger and detailed inspection modal.

4. **Spatial & Temporal Analytics (`/analytics`)**:
   - Thermal anomalies timeline area chart.
   - Event-category distribution pie/donut chart.
   - Risk-level distribution bar chart.
   - Persistent vs. sudden heat source breakdown.
   - Industrial vs. natural incident origin comparison.

5. **Shared API Contract & Mock Layer**:
   - Pre-configured service layer (`src/services/api.ts`) returning structured mock data matching `docs/api-contract.md`.
   - Set `USE_LIVE_BACKEND = true` in `src/services/api.ts` to connect to live FastAPI endpoints.

---

## Getting Started

### Prerequisites

* Node.js `v18+` or `v20+` or `v24+`
* npm `v9+` or `v10+` or `v11+`

### Installation

```bash
cd frontend
npm install
```

### Running Local Development Server

```bash
npm run dev
```

The Vite dev server will start at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

This compiles TypeScript definitions and builds production assets into `frontend/dist/`.

---

## Team Integration & Boundaries

* **Map Module**: Member 2 is responsible for rendering the Leaflet Map inside the `MapPlaceholder` component on the Dashboard homepage.
* **Backend Integration**: Backend team can reference `docs/api-contract.md` for JSON response schemas.
