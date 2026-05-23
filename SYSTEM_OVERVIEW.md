# BloodCare System Architecture & Overview

## 1. High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE (Next.js)                │
│                      (React Components + Tailwind)              │
├──────────────────┬──────────────────┬──────────────────────────┤
│   Navigation     │   Main Pages     │    Components            │
├──────────────────┼──────────────────┼──────────────────────────┤
│ • Sidebar        │ • Dashboard      │ • Forms (Patient, etc)   │
│ • Header         │ • Patients       │ • Tables & Lists         │
│ • Language Menu  │ • Transfusions   │ • Charts (Recharts)      │
│                  │ • Analytics      │ • Dialogs & Modals       │
│                  │ • History        │ • Filters & Search       │
│                  │ • Settings       │ • Cards & Stats          │
└──────────────────┴──────────────────┴──────────────────────────┘
                            ↓↑
                    ┌───────────────────┐
                    │   API LAYER       │
                    │  (Next.js Routes) │
                    ├───────────────────┤
                    │ /api/patients     │
                    │ /api/transfusions │
                    │ /api/history      │
                    │ /api/stats        │
                    │ /api/analytics    │
                    └───────────────────┘
                            ↓↑
                    ┌───────────────────┐
                    │   VALIDATION      │
                    │  (Zod Schemas)    │
                    ├───────────────────┤
                    │ Sanitize Input    │
                    │ Type Check        │
                    │ Error Handling    │
                    └───────────────────┘
                            ↓↑
                    ┌───────────────────┐
                    │    DATABASE       │
                    │     (MongoDB)     │
                    ├───────────────────┤
                    │ Collections:      │
                    │ • patients        │
                    │ • transfusions    │
                    │ • dailyHistory    │
                    │ • statistics      │
                    └───────────────────┘
```

---

## 2. Request-Response Cycle

```
USER INTERACTION (Click, Form Submit, etc)
    ↓
CLIENT VALIDATION (JavaScript - quick feedback)
    ↓
API REQUEST (POST/GET/PUT/DELETE to /api/...)
    ↓
SERVER RECEIVES REQUEST
    ↓
SERVER VALIDATION (Zod Schema - strict validation)
    ↓ (Invalid)
  Error Response → Display error toast to user
    ↓ (Valid)
DATABASE OPERATION (INSERT/UPDATE/QUERY/DELETE)
    ↓
CACHE REVALIDATION (Revalidate affected paths)
    ↓
SUCCESS RESPONSE (Return data + status code)
    ↓
CLIENT RECEIVES (Update state, close dialog, etc)
    ↓
UI UPDATE (Re-render component)
    ↓
USER SEES RESULT (Toast notification + updated page)
```

---

## 3. Data Flow - Patient Creation Example

```
USER ENTERS PATIENT DATA IN FORM
    ↓ (firstName: "Ahmed", lastName: "Hassan", ...)
CLIENT CHECKS
├─ Required fields filled? ✓
├─ Email format valid? ✓
├─ Phone format valid? ✓
└─ Date in past for DOB? ✓
    ↓
SUBMIT FORM
    ↓
POST /api/patients { ...patientData }
    ↓
SERVER RECEIVES REQUEST
    ↓
VALIDATE WITH ZOD SCHEMA
├─ Type checking? ✓
├─ Required fields? ✓
├─ String lengths? ✓
└─ Date values? ✓
    ↓
INSERT INTO MongoDB
├─ patients collection
├─ Add timestamps
└─ Generate patientId
    ↓
REVALIDATE CACHE
├─ /patients (list page)
├─ /patients/new (form page)
└─ /api/patients (API)
    ↓
RETURN RESPONSE
├─ Status: 201 (Created)
├─ Body: { success: true, patient: {...} }
└─ Headers: Content-Type: application/json
    ↓
CLIENT RECEIVES
    ↓
SHOW SUCCESS TOAST
"Patient successfully added"
    ↓
REDIRECT TO /patients
    ↓
REFETCH PATIENT LIST
    ↓
DISPLAY UPDATED LIST
(New patient visible in table)
```

---

## 4. Component Hierarchy

```
RootLayout
│
├── ThemeProvider (Dark/Light mode)
│
├── LanguageProvider (Multi-language context)
│   │
│   └── LanguageInitializer (Load saved language)
│
├── Sidebar (Navigation menu)
│   ├── Home link
│   ├── Patients link
│   ├── Transfusions submenu
│   │   ├── Today
│   │   └── Tomorrow
│   ├── Analytics link
│   ├── History link
│   └── Settings link
│
├── Header (Top navigation)
│   ├── Breadcrumbs
│   ├── Search (future)
│   ├── Language selector
│   ├── Theme toggle
│   └── User menu
│
└── Main Content Area
    │
    ├── Page Components (Dynamic)
    │   │
    │   └── Feature Components
    │       ├── Forms
    │       │   ├── PatientForm
    │       │   ├── TransfusionScheduleForm
    │       │   └── EditForm
    │       │
    │       ├── Lists/Tables
    │       │   ├── PatientList
    │       │   ├── PatientListClient
    │       │   └── (Transfusion tables)
    │       │
    │       ├── Filters
    │       │   ├── PatientFilters
    │       │   └── DateRangePicker
    │       │
    │       └── Analytics
    │           ├── AnalyticsCharts
    │           ├── AnalyticsStats
    │           └── DataVisualization
    │
    └── Dialogs/Modals (Reusable)
        ├── Confirmation dialogs
        ├── Quick schedule dialog
        └── Error dialogs
```

---

## 5. State Management Hierarchy

```
GLOBAL STATE (React Context)
│
└── LanguageContext
    ├── Current language: "en" | "fr" | "ar"
    ├── t() function: translate text
    ├── setLanguage(): update language
    └── localStorage sync + events

LOCAL STATE (useState in Components)
│
├── Form State
│   ├── Form field values
│   ├── Validation errors
│   └── isLoading status
│
├── UI State
│   ├── Modal open/closed
│   ├── Sidebar collapsed/expanded
│   ├── Dropdown open/closed
│   └── Sort direction
│
└── Data State
    ├── Fetched patient list
    ├── Selected patient
    ├── Transfusion records
    └── Filter selections

SERVER STATE (Database)
│
├── Patients Collection
│   ├── Patient records
│   └── Patient status
│
├── Transfusions Collection
│   ├── Scheduled transfusions
│   └── Transfusion status
│
├── DailyHistory Collection
│   └── Historical records
│
└── Statistics Collection
    └── Cached analytics data
```

---

## 6. Data Model Relationships

```
PATIENTS Collection
├─ _id (ObjectId)
├─ firstName, lastName
├─ dateOfBirth, gender
├─ phone, email, address
├─ bloodType (O+, A+, B+, AB+, etc)
├─ phenotype (F, C, L markers)
├─ weight, height, hemoglobinLevel
├─ medicalHistory
├─ emergencyContact, emergencyPhone
├─ patientCategory
└─ timestamps (createdAt, updatedAt)

    ↓ (referenced by)

TRANSFUSIONS Collection
├─ _id (ObjectId)
├─ patientId → points to PATIENTS._id
├─ patientName (denormalized)
├─ patientBloodType (denormalized)
├─ scheduledDate, scheduledTime
├─ priority (normal/urgent)
├─ bags, hdist, hreceived
├─ hasF, hasC, hasL
├─ status
└─ timestamps

    ↓ (aggregated into)

DAILYHISTORY Collection
├─ _id (ObjectId)
├─ date (YYYY-MM-DD)
└─ patients: [
    {
      patientId, patientName, bloodType,
      priority, bags, hdist, hreceived,
      hasF, hasC, hasL, notes
    }
  ]

    ↓ (summarized in)

STATISTICS Collection
├─ _id (ObjectId)
├─ date
├─ totalPatients
├─ todayTransfusions
├─ tomorrowTransfusions
├─ urgentCases
├─ totalBags
├─ avgHemoglobin
└─ criticalCases
```

---

## 7. API Request Flow

```
CLIENT
│
├─ GET /api/patients?search=Ahmed&bloodType=O+
│  ├─ Query validation
│  └─ Return: 200 + patient array
│
├─ POST /api/patients
│  ├─ Body: { firstName, lastName, ... }
│  ├─ Validation: Zod schema
│  ├─ DB Operation: Insert
│  └─ Return: 201 + created patient
│
├─ PUT /api/patients/[id]
│  ├─ Body: { updated fields }
│  ├─ Validation: Zod schema
│  ├─ DB Operation: Update
│  └─ Return: 200 + updated patient
│
├─ DELETE /api/patients/[id]
│  ├─ Soft delete: status = "deleted"
│  └─ Return: 200 + success
│
├─ GET /api/transfusions/today
│  ├─ Query: current date
│  └─ Return: 200 + today's transfusions
│
├─ POST /api/transfusions
│  ├─ Body: { patientId, date, time, priority, ... }
│  ├─ Create transfusion record
│  ├─ Update daily history
│  └─ Return: 201 + created transfusion
│
├─ GET /api/stats
│  └─ Return: 200 + statistics data
│
└─ GET /api/analytics/charts
   └─ Return: 200 + chart data
```

---

## 8. Authentication & Authorization (Future)

```
CURRENTLY: No authentication (open access)

FUTURE IMPLEMENTATION:

LOGIN PAGE (/login)
    ↓
USER SUBMITS CREDENTIALS
    ↓
SERVER VALIDATES
    ├─ Check user exists
    ├─ Verify password (bcrypt)
    └─ Create session/JWT token
    ↓
STORE TOKEN
    ├─ localStorage (JWT)
    ├─ httpOnly cookie (session)
    └─ Redux or Context
    ↓
MIDDLEWARE CHECK
    ├─ Every API request includes token
    ├─ Server validates token
    └─ Reject if invalid/expired
    ↓
ROLE-BASED ROUTING
    ├─ Admin: Full access
    ├─ Doctor: Create/edit patients, schedule
    ├─ Nurse: Update status only
    └─ View-Only: Read access only
    ↓
TOKEN EXPIRY
    ├─ Auto-refresh if expired
    ├─ Prompt login if refresh fails
    └─ Clear storage on logout
```

---

## 9. Error Handling Strategy

```
ERROR OCCURS
    ↓
CLIENT-SIDE
├─ Form validation error
│  ├─ Highlight field
│  ├─ Show inline error message
│  └─ NO API call
│
├─ Network error
│  ├─ Show toast: "Connection failed"
│  ├─ Offer retry button
│  └─ Log to console
│
└─ Unexpected error
   ├─ Catch in try-catch
   ├─ Show generic error toast
   └─ Log error details

SERVER-SIDE
├─ Validation error (400)
│  ├─ Parse Zod error
│  ├─ Return field-specific errors
│  └─ Client displays field errors
│
├─ Not found error (404)
│  ├─ Resource doesn't exist
│  ├─ Redirect to list or home
│  └─ Show warning message
│
├─ Server error (500)
│  ├─ Log detailed error server-side
│  ├─ Return generic message to client
│  └─ Alert admin/monitoring system
│
└─ Database error
   ├─ Log error
   ├─ Return 500 + generic message
   └─ Offer retry or support contact
```

---

## 10. Performance Optimization Architecture

```
FRONTEND OPTIMIZATIONS
│
├─ Code Splitting
│   ├─ Dynamic imports for pages
│   └─ Lazy load components
│
├─ Caching
│   ├─ Next.js cache at build time
│   ├─ Revalidate on demand
│   └─ Browser cache headers
│
├─ Image Optimization
│   ├─ Use Next.js Image component
│   ├─ Automatic format conversion
│   └─ Responsive sizes
│
└─ Bundle Optimization
    ├─ Tree shaking unused imports
    ├─ CSS purging unused styles
    └─ Minification

BACKEND OPTIMIZATIONS
│
├─ Database
│   ├─ Indexes on frequently queried fields
│   ├─ Connection pooling
│   └─ Query optimization
│
├─ API
│   ├─ Pagination for large datasets
│   ├─ Response compression
│   └─ Rate limiting
│
└─ Caching
    ├─ Revalidate stale pages
    ├─ Cache expensive calculations
    └─ CDN for static assets
```

---

## 11. Security Architecture

```
INPUT SECURITY
│
├─ Client-side validation
│   └─ Catch obvious errors early
│
├─ Server-side validation (CRITICAL)
│   ├─ Zod schema validation
│   ├─ Type checking
│   └─ Range checking
│
└─ Database layer
    ├─ Parameterized queries (MongoDB driver)
    └─ No string concatenation in queries

OUTPUT SECURITY
│
├─ Sanitize error messages
│   ├─ Don't expose stack traces
│   ├─ Don't reveal database structure
│   └─ Generic error messages
│
└─ CORS headers
    ├─ Restrict origins
    └─ Control methods/headers

AUTHENTICATION (Future)
│
├─ Password hashing (bcrypt)
├─ JWT/Session tokens
├─ HTTPS only
└─ httpOnly cookies

AUTHORIZATION (Future)
│
├─ Role-based access control
├─ Data ownership verification
└─ Field-level permissions
```

---

## 12. Deployment Architecture

```
DEVELOPMENT
│
├─ Local Machine
│   ├─ npm run dev
│   ├─ localhost:3000
│   └─ MongoDB local or cloud
│
└─ Git Repository
    └─ Commit → Push → Pull Request

STAGING
│
├─ Test Environment
│   ├─ Automated tests
│   ├─ E2E tests
│   └─ Performance tests
│
└─ Review & Approval
    └─ Code review by team

PRODUCTION
│
├─ Vercel Deployment
│   ├─ Automatic on push to main
│   ├─ Zero downtime deployments
│   └─ CDN distribution
│
├─ Environment Variables
│   ├─ MONGODB_URI (production cluster)
│   ├─ API_KEY (external services)
│   └─ NODE_ENV=production
│
├─ Monitoring
│   ├─ Error tracking (Sentry)
│   ├─ Performance monitoring
│   └─ Uptime monitoring
│
└─ Backups
    ├─ MongoDB automatic backups
    ├─ Database snapshots
    └─ Code version control
```

---

## 13. File Organization by Feature

```
PATIENT MANAGEMENT
├─ app/patients/page.tsx (List page)
├─ app/patients/new/page.tsx (Create page)
├─ app/patients/[id]/view/page.tsx (Detail page)
├─ app/patients/[id]/edit/page.tsx (Edit page)
├─ components/patient-form.tsx (Form component)
├─ components/patient-list.tsx (Table component)
├─ components/patient-filters.tsx (Filter component)
├─ app/api/patients/route.ts (API)
├─ lib/validations/patient.ts (Zod schema)
└─ lib/services/patient-service.ts (Business logic)

TRANSFUSION MANAGEMENT
├─ app/transfusions/today/page.tsx
├─ app/transfusions/tomorrow/page.tsx
├─ app/transfusions/schedule/[id]/page.tsx
├─ components/transfusion-schedule-form.tsx
├─ app/api/transfusions/route.ts
├─ lib/validations/transfusion.ts
└─ lib/services/transfusion-service.ts

ANALYTICS
├─ app/analytics/page.tsx
├─ app/analytics/analyticsPageClient.tsx
├─ components/analytics-charts.tsx
├─ components/analytics-stats.tsx
├─ app/api/analytics/charts/route.ts
├─ app/api/stats/route.ts
└─ lib/services/analytics-service.ts

HISTORY
├─ app/history/page.tsx
├─ app/api/history/route.ts
└─ app/api/history/[date]/route.ts

SHARED
├─ contexts/language-context.tsx
├─ components/header.tsx
├─ components/sidebar.tsx
├─ app/layout.tsx
└─ app/lib/actions.ts (Server actions)
```

---

## 14. Technology Decision Rationale

| Choice | Why |
|--------|-----|
| **Next.js** | Full-stack framework, great DX, deployment easy |
| **React** | Component-based UI, large ecosystem |
| **TypeScript** | Type safety, catches errors early |
| **Tailwind CSS** | Utility-first, fast styling, responsive |
| **shadcn/ui** | Pre-built accessible components, customizable |
| **MongoDB** | Flexible schema for medical data, scalable |
| **Zod** | Runtime validation, type inference from schema |
| **Recharts** | React-native charting, easy integration |
| **Vercel** | Next.js native, fast deployments, CDN included |

---

## Summary

BloodCare's architecture is built on:
- **Separation of Concerns** (Frontend, API, Database)
- **Type Safety** (TypeScript + Zod validation)
- **Performance** (Caching, optimization, lazy loading)
- **Scalability** (MongoDB, API pagination)
- **User Experience** (Responsive, accessible, multi-language)
- **Maintainability** (Clear structure, documentation)

This professional architecture enables the system to handle hundreds of patients and thousands of transfusion records reliably.

---
