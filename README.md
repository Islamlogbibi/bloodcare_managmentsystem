# BloodCare Management System
## Executive Summary
BloodCare is a **commercial-grade**, Next.js 14 application designed to manage blood transfusion records, patient data, and analytics for hospitals and blood banks. It offers a fully internationalized UI (Arabic, French, English) and printable, localized reports suitable for regulatory compliance and partner integrations.
---
## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Core Modules](#core-modules)
3. [User Interface Components](#user-interface-components)
4. [API Endpoints](#api-endpoints)
5. [Print & Reporting Engine](#print--reporting-engine)
6. [Internationalization (i18n)](#internationalization-i18n)
7. [Deployment & Operations](#deployment--operations)
8. [Security & Compliance](#security--compliance)
9. [Partner Integration Guide](#partner-integration-guide)
10. [License](#license)
---
## Architecture Overview
- **Framework**: Next.js 14 (App Router) – server‑rendered pages with client‑side components where needed.
- **Language Context**: `contexts/language-context.tsx` provides a `useLanguage` hook exposing `t(key)` for runtime translation.
- **State Management**: React Context + local component state. No external store (e.g., Redux) – keeps the bundle lightweight.
- **Styling**: Tailwind CSS with custom print‑specific styles in `app/patients/printStyles.tsx`.
- **Data Layer**: REST‑style API routes under `app/api/*` backed by a PostgreSQL database (not included in repo – partner supplies connection string).
- **Build**: Standard Next.js production build (`npm run build`).
---
## Core Modules
| Module | Path | Description |
|--------|------|-------------|
| **Language Provider** | `contexts/language-context.tsx` | Initializes supported locales (`en`, `fr`, `ar`), stores current language in React Context, and supplies the `t(key)` function.
| **Patient Management** | `app/patients/*` | Server‑side pages for listing, creating, editing patients. Includes `patient-history-client.tsx` (client component for history view) and print utilities.
| **Transfusion Scheduler** | `app/transfusions/*` | Pages for today and tomorrow schedules, with add/edit forms.
| **Analytics Dashboard** | `app/analytics/*` | Visual charts for transfusion statistics, built with Chart.js.
| **History Pages** | `app/history/*` | Centralised view of patient transfusion history, includes printable reports.
| **Print Styles** | `app/patients/printStyles.tsx` | Global `@media print` CSS that hides UI chrome, adds a localized header, and formats tables for PDF‑ready output.
| **Utility Hooks** | `hooks/*` (if any) | Helper hooks for data fetching, date formatting, etc.
---
## User Interface Components
Below is a non‑exhaustive list of reusable components with a brief functional description.
- **`Sidebar`** (`components/sidebar.tsx`): Navigation drawer with language‑aware labels, collapsible on desktop and hidden on print (`print:hidden`).
- **`PatientList`**, **`TodayTransfusionList`**, **`TomorrowTransfusionList`**: Table‑style listings that consume the translation function for column headers.
- **`DeletePatientButton`**, **`EditForm`**, **`EditHBF`**: Action buttons/forms that trigger CRUD operations via API routes.
- **`PrintButton`** (`components/PrintButton.tsx`): Triggers `window.print()`; automatically respects the `print:hidden` class to omit UI elements.
- **`Button`** (`app/history/button.tsx`): Styled button used throughout history pages, also translation‑aware.
- **`StatusBadge`** (custom component in various pages): Displays patient status with color coding (`status‑active`, `status‑inactive`).
---
## API Endpoints
All API routes live under `app/api/` and follow REST conventions.
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/patients` | `GET` | List all patients (paginated).
| `/api/patients` | `POST` | Create a new patient record.
| `/api/patients/[id]` | `GET` | Retrieve a single patient.
| `/api/patients/[id]` | `PUT` | Update patient details.
| `/api/patients/[id]` | `DELETE` | Delete patient.
| `/api/transfusions/today` | `GET` | List transfusions scheduled for today.
| `/api/transfusions/tomorrow` | `GET` | List transfusions for tomorrow.
| `/api/history/[patientId]` | `GET` | Retrieve full transfusion history for a patient.
| `/api/analytics` | `GET` | Return aggregated statistics for dashboards.
All endpoints return JSON payloads and are protected behind optional JWT middleware (integrate per‑partner security policy).
---
## Print & Reporting Engine
The **print engine** is driven by CSS in `printStyles.tsx` and a small React wrapper that adds a localized header using the translation context.
Key behaviours:
- Sidebar and navigation are hidden (`print:hidden`).
- Header text is generated via `t('printHeader')` – add the key to each locale in `contexts/language-context.tsx`.
- Table rows avoid page breaks (`page-break-inside: avoid`).
- Footer includes page number and timestamp.
Partners can extend the report by editing the `PrintButton` component or adding custom sections with the `print-summary` class.
---
## Internationalization (i18n)
The translation object lives in `contexts/language-context.tsx`:
```ts
const translations = {
  en: { /* key/value pairs */ },
  fr: { /* ... */ },
  ar: { /* ... */ },
};
```
Add new keys for any UI text, report headers, or error messages. The `useLanguage` hook returns `{ t, locale, setLocale }`.
**Adding a new language**:
1. Extend the `translations` object with the new locale code.
2. Update the `supportedLocales` array.
3. Provide RTL support by adding `dir="rtl"` to the root `<html>` when `locale === 'ar'`.
---
## Deployment & Operations
1. **Build**: `npm run build` – creates an optimized server‑rendered bundle.
2. **Start**: `npm start` – runs the production server on the port defined by `PORT` (default 3000).
3. **Containerisation** (optional):
   ```dockerfile
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY . .
   RUN npm ci && npm run build
   FROM node:20-alpine
   WORKDIR /app
   COPY --from=builder /app .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```
4. **Environment Variables**:
   - `DATABASE_URL` – PostgreSQL connection string.
   - `NEXT_PUBLIC_API_BASE` – Base URL for external services.
   - `NEXT_PUBLIC_DEFAULT_LOCALE` – Default language (`en`).
5. **Monitoring**: Hook into Vercel, Netlify, or custom CloudWatch metrics; the app emits standard HTTP request logs.
---
## Security & Compliance
- **Data Protection**: All API routes should enforce HTTPS and validate input server‑side.
- **Authentication**: Integrate JWT or OAuth2 as per partner requirements.
- **Regulatory**: Printable reports meet typical healthcare record‑keeping standards; customise header/footer for local regulations.
- **Accessibility**: Uses semantic HTML and ARIA attributes; supports screen readers in all three locales.
---
## Partner Integration Guide
1. **API Consumption**: Use the documented endpoints to sync patient and transfusion data with your ERP or LIS.
2. **Custom Branding**: Replace the `BloodCare` logo in `components/sidebar.tsx` and adjust CSS variables in `styles/globals.css`.
3. **Extended Reports**: Add new sections to `printStyles.tsx` and expose additional translation keys.
4. **White‑Labeling**: Override the `LanguageProvider` default locale and supply your own translation map.
5. **Support**: Contact the development team at `dev@bloodcare.com` for SLA agreements and source‑code licensing.
---
## License
The source code is **proprietary** and available to licensed partners only. Redistribution or public publication requires explicit permission.
---
*Prepared for commercial partners – all functionality described herein is production‑ready and supported.*
