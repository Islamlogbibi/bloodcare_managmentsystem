# BloodCare - User Flows & Navigation Map

## 1. Main Navigation Structure

```
ROOT LAYOUT (layout.tsx)
├── Sidebar Navigation (left panel)
│   ├── Dashboard
│   ├── Patients
│   ├── Transfusions
│   │   ├── Today
│   │   └── Tomorrow
│   ├── Analytics
│   ├── History
│   ├── Reports
│   └── Settings
│
├── Header (top panel)
│   ├── Breadcrumbs
│   ├── User Menu
│   └── Settings Icon
│
└── Main Content Area
    └── Page-specific content
```

---

## 2. Complete User Journey Map

### Entry Point: Dashboard
```
LOGIN/ENTER APP
    ↓
DASHBOARD (/)
├─ View Statistics
│  ├─ Total Patients
│  ├─ Urgent Cases
│  ├─ Active Transfusions
│  └─ Scheduled Transfusions
│
├─ Quick Actions
│  ├─ "Add Patient" → /patients/new
│  ├─ "Schedule Transfusion" → /transfusions/schedule/[id]
│  ├─ "View Today's Schedule" → /transfusions/today
│  └─ "View Analytics" → /analytics
│
└─ Navigation Links
   ├─ Patients Section
   ├─ Transfusions Section
   ├─ Analytics Section
   └─ Settings Section
```

---

## 3. Patient Management Flow

```
PATIENTS SECTION (/patients)
│
├─ PATIENT LIST VIEW
│  ├─ Display all patients in table format
│  ├─ Columns: Name, GP, PH, F, C, L, Last T, Days Elapsed, Actions
│  │
│  ├─ SEARCH & FILTER
│  │  ├─ Search by name/phone/email/ID
│  │  ├─ Filter by blood type
│  │  ├─ Filter by phenotype
│  │  └─ Filter by patient category
│  │
│  └─ ACTIONS PER PATIENT
│     ├─ View Details → /patients/[id]/view
│     ├─ Edit → /patients/[id]/edit
│     ├─ Schedule Transfusion → /transfusions/schedule/[id]
│     └─ Delete → (soft delete with confirmation)
│
├─ ADD NEW PATIENT (/patients/new)
│  ├─ Form: Personal Info
│  │  ├─ First Name *
│  │  ├─ Last Name *
│  │  ├─ Date of Birth
│  │  └─ Gender * (Male/Female)
│  │
│  ├─ Form: Contact Info
│  │  ├─ Phone
│  │  ├─ Email
│  │  └─ Address
│  │
│  ├─ Form: Medical Info
│  │  ├─ Blood Type * (dropdown)
│  │  ├─ Phenotype * (dropdown)
│  │  ├─ Weight
│  │  ├─ Height
│  │  └─ Hemoglobin Level
│  │
│  ├─ Form: History
│  │  ├─ Admission Date
│  │  ├─ Last Donation Date
│  │  ├─ Medical History
│  │  ├─ Emergency Contact
│  │  └─ Emergency Phone
│  │
│  ├─ Form: Phenotype Markers
│  │  ├─ Has F (checkbox)
│  │  ├─ Has C (checkbox)
│  │  └─ Has L (checkbox)
│  │
│  ├─ Form: Category
│  │  ├─ HyperRegimen
│  │  ├─ PolyTransfused
│  │  ├─ Exchanges
│  │  └─ Occasional Exchanges
│  │
│  └─ Submit
│     ├─ Validate (client-side)
│     ├─ POST to /api/patients
│     ├─ Validate (server-side)
│     ├─ Save to MongoDB
│     └─ Redirect to /patients → Success Toast
│
├─ PATIENT DETAIL VIEW (/patients/[id]/view)
│  ├─ Display Full Profile
│  │  ├─ Personal Information Card
│  │  │  ├─ Name
│  │  │  ├─ Date of Birth
│  │  │  ├─ Age (calculated)
│  │  │  └─ Gender
│  │  │
│  │  ├─ Contact Information Card
│  │  │  ├─ Phone
│  │  │  ├─ Email
│  │  │  └─ Address
│  │  │
│  │  ├─ Medical Information Card
│  │  │  ├─ Blood Type
│  │  │  ├─ Phenotype
│  │  │  ├─ Weight
│  │  │  ├─ Height
│  │  │  └─ Hemoglobin Level
│  │  │
│  │  ├─ History Card
│  │  │  ├─ Admission Date
│  │  │  ├─ Last Donation Date
│  │  │  ├─ Medical History
│  │  │  ├─ Emergency Contact
│  │  │  └─ Emergency Phone
│  │  │
│  │  ├─ Phenotype Markers Card
│  │  │  ├─ F Status
│  │  │  ├─ C Status
│  │  │  └─ L Status
│  │  │
│  │  └─ Category Display
│  │     └─ Patient Category Badge
│  │
│  └─ Actions
│     ├─ Edit Patient → /patients/[id]/edit
│     ├─ Schedule Transfusion → /transfusions/schedule/[id]
│     └─ Back to List → /patients
│
└─ EDIT PATIENT (/patients/[id]/edit)
   ├─ Load existing patient data
   ├─ Display same form as "Add New Patient"
   ├─ Pre-fill all fields
   ├─ Update fields as needed
   ├─ Save Changes
   │  └─ PUT to /api/patients/[id]
   │     ├─ Validate
   │     ├─ Update in MongoDB
   │     └─ Redirect to /patients/[id]/view → Success Toast
   │
   └─ Delete Patient (optional)
      └─ Show confirmation dialog
         ├─ Cancel → Stay on edit page
         └─ Confirm → Soft delete → Redirect to /patients
```

---

## 4. Transfusion Management Flow

```
TRANSFUSION SECTION
│
├─ TODAY'S TRANSFUSIONS (/transfusions/today)
│  ├─ Load today's date
│  ├─ Display all transfusions scheduled for today
│  │
│  ├─ TABLE COLUMNS
│  │  ├─ Patient Name
│  │  ├─ Blood Type
│  │  ├─ Scheduled Time
│  │  ├─ Priority (Normal/Urgent)
│  │  ├─ Units
│  │  ├─ Status
│  │  └─ Actions
│  │
│  ├─ EMPTY STATE (if no transfusions)
│  │  ├─ Message: "No transfusions scheduled for today"
│  │  └─ Button: "Schedule Transfusion" → /transfusions/schedule
│  │
│  ├─ ACTIONS PER TRANSFUSION
│  │  ├─ View Patient Details
│  │  ├─ Mark as Complete
│  │  ├─ Edit Transfusion → /transfusions/today/[id]/edit
│  │  ├─ Delete → (confirmation dialog)
│  │  └─ Cancel Transfusion
│  │
│  └─ GLOBAL ACTIONS
│     ├─ Print Report
│     └─ Export Data
│
├─ TOMORROW'S TRANSFUSIONS (/transfusions/tomorrow)
│  └─ Same as Today's Transfusions but for next day
│
└─ SCHEDULE NEW TRANSFUSION (/transfusions/schedule/[patientId])
   ├─ Load patient data
   ├─ Form: Transfusion Details
   │  ├─ Patient Name (disabled, auto-filled)
   │  ├─ Blood Type (disabled, auto-filled)
   │  ├─ Scheduled Date * (calendar picker, future only)
   │  ├─ Scheduled Time * (time input)
   │  ├─ Priority * (Normal/Urgent)
   │  ├─ Blood Units * (1-10)
   │  └─ Notes (optional)
   │
   ├─ Validation
   │  ├─ Client-side: format & required field checks
   │  └─ Server-side: Zod schema validation
   │
   └─ Submit
      ├─ POST to /api/transfusions
      ├─ Create transfusion record
      ├─ Update daily history (if applicable)
      └─ Redirect to /transfusions/today → Success Toast
```

---

## 5. History & Calendar Flow

```
HISTORY SECTION (/history)
│
├─ CALENDAR VIEW (Left Panel)
│  ├─ Calendar Widget
│  │  ├─ Navigate months (previous/next)
│  │  ├─ Click date to select
│  │  └─ Current date highlighted
│  │
│  └─ Display selected date
│
├─ PATIENT LIST FOR DATE (Right Panel)
│  ├─ Display transfusions for selected date
│  │
│  ├─ TABLE COLUMNS
│  │  ├─ H.dist
│  │  ├─ H.received
│  │  ├─ Patient Name
│  │  ├─ Blood Type
│  │  ├─ Phenotype
│  │  ├─ F/C/L Markers
│  │  ├─ Priority
│  │  ├─ Bags
│  │  ├─ Hemoglobin
│  │  └─ Actions (Edit/Delete)
│  │
│  ├─ EMPTY STATE
│  │  └─ "No transfusion found." Message
│  │
│  └─ ADD TRANSFUSION DIALOG
│     ├─ Button: "Add patient for this day"
│     │
│     └─ Dialog Opens:
│        ├─ Select Patient (searchable dropdown)
│        ├─ H.dist (input)
│        ├─ H.received (input)
│        ├─ Priority (Normal/Urgent)
│        ├─ Bags (input)
│        ├─ F/C/L Checkboxes
│        ├─ Notes (textarea)
│        │
│        └─ Submit
│           ├─ POST to /api/history
│           ├─ Create daily history record
│           └─ Reload list
│
└─ GLOBAL ACTIONS
   ├─ Print History
   └─ Export Data
```

---

## 6. Analytics & Reports Flow

```
ANALYTICS SECTION (/analytics)
│
├─ LOAD PAGE
│  ├─ Fetch /api/stats
│  ├─ Fetch /api/analytics/charts
│  └─ Aggregate data
│
├─ STATISTICS CARDS (Top)
│  ├─ Row 1:
│  │  ├─ Total Transfusions
│  │  ├─ Number of Bags
│  │  ├─ Average Hemoglobin
│  │  └─ Critical Cases
│  │
│  └─ Row 2:
│     ├─ Active Patients
│     ├─ Transfusions Today
│     ├─ Rare Phenotypes
│     └─ Dominant Blood Type
│
├─ CHARTS (Middle/Bottom)
│  ├─ CHART 1: Transfusions & Bags
│  │  └─ Line/Bar chart showing scheduled vs completed with units
│  │
│  ├─ CHART 2: Blood Groups & Hemoglobin
│  │  └─ Bar chart showing hemoglobin by blood type
│  │
│  ├─ CHART 3: Priorities & Bags
│  │  └─ Donut/Pie chart showing distribution by priority
│  │
│  └─ CHART 4: Monthly Trends
│     └─ Line chart showing trend over months
│
├─ OPTIONAL FILTERS
│  ├─ Date Range Picker
│  ├─ Blood Type Filter
│  ├─ Priority Filter
│  └─ Patient Category Filter
│
└─ EXPORT OPTIONS
   ├─ Download CSV
   └─ Download PDF
```

---

## 7. Settings & Configuration Flow

```
SETTINGS SECTION (/settings)
│
├─ SYSTEM SETTINGS
│  ├─ Language Selection
│  │  ├─ English (en)
│  │  ├─ Français (fr)
│  │  └─ العربية (ar) [RTL]
│  │  └─ On change:
│  │     ├─ Update localStorage
│  │     ├─ Dispatch language change event
│  │     ├─ Update page direction (dir)
│  │     └─ Trigger page re-render (all UI updates)
│  │
│  └─ Theme Selection
│     ├─ Light Mode (default)
│     ├─ Dark Mode
│     └─ System (auto)
│
├─ NOTIFICATION SETTINGS
│  ├─ Sound Enabled (toggle)
│  └─ Email Notifications (toggle)
│
├─ PROFILE SETTINGS
│  ├─ View My Profile
│  ├─ Edit Profile
│  ├─ Change Password
│  │  ├─ Current Password *
│  │  ├─ New Password *
│  │  └─ Confirm Password *
│  │
│  └─ Logout
│     └─ Confirmation dialog
│        ├─ Cancel
│        └─ Confirm Logout → Redirect to login/home
│
└─ EXPORT SETTINGS
   └─ Download User Data/Reports
```

---

## 8. Language Context Flow

```
INITIALIZATION
│
├─ Load LanguageProvider in layout.tsx
├─ LanguageInitializer component runs
│
├─ Check localStorage for saved language
│  ├─ Found → Load that language
│  └─ Not found → Default to "fr" (French)
│
├─ Listen for language change events
│  ├─ User changes language in settings
│  ├─ Dispatch custom event
│  ├─ Update localStorage
│  ├─ Re-render all components using useLanguage()
│  ├─ Update document direction (dir="ltr" or dir="rtl")
│  └─ Update Cairo font loading (for Arabic)
│
└─ COMPONENT USAGE
   ├─ Any component that needs translations:
   │  ├─ import { useLanguage } from "@/contexts/language-context"
   │  ├─ const { t, language } = useLanguage()
   │  └─ Use t("key") to get translated text
   │
   └─ Example:
      <button>{t("save")}</button>
      <p>{t("patientInformation")}</p>
      <label>{t("firstName")}</label>
```

---

## 9. Data Flow & API Calls

### Create Patient Flow
```
User fills form → Client validation → POST /api/patients
→ Server receives request → Zod validation
→ Success: Insert to MongoDB → Revalidate cache
→ Return success response → Client shows toast
→ Redirect to /patients → Display updated list

OR

Server validation fails → Return 400 error
→ Client displays error toast → User sees message
```

### Schedule Transfusion Flow
```
User selects date/time/priority → Client validation
→ POST /api/transfusions
→ Server validates → Create transfusion record
→ Update daily history collection
→ Return success → Client shows toast
→ Redirect to /transfusions/today
```

### View Analytics Flow
```
Page loads → Parallel API calls:
├─ GET /api/stats → Statistics data
├─ GET /api/analytics/charts → Chart data
└─ GET /api/transfusions → Transfusion data

→ Receive all data → Aggregate/Process
→ Pass to chart components
→ Render statistics cards + charts
→ User can interact with filters
→ Charts update based on filters
```

---

## 10. State Management Overview

### React Context Used
```
LanguageProvider
├─ language: "en" | "fr" | "ar"
├─ setLanguage(lang): void
├─ t(key): string // Translation function
└─ localStorage sync
   └─ Custom events for listening
```

### Component State
```
Most components use:
├─ useState: Local form state, UI toggles
├─ useEffect: Data fetching, event listeners
├─ useRouter: Navigation
├─ useSearchParams: URL query parameters
└─ Custom hooks: Data validation
```

### Server State (via APIs)
```
Patient data → MongoDB patients collection
Transfusion data → MongoDB transfusions collection
Daily history → MongoDB dailyHistory collection
Statistics → MongoDB statistics collection (cached)
```

---

## 11. Error Handling Flow

```
API Call
│
├─ Network Error
│  ├─ Show error toast: "Connection error"
│  ├─ Show retry button
│  └─ Log error for debugging
│
├─ Validation Error (400)
│  ├─ Parse error details
│  ├─ Show specific field errors
│  ├─ Highlight invalid fields in form
│  └─ Help user correct input
│
├─ Server Error (500)
│  ├─ Show generic error message
│  ├─ Suggest retry
│  ├─ Log detailed error (server-side)
│  └─ Provide support contact info
│
└─ Not Found (404)
   ├─ Show "Record not found"
   ├─ Redirect to list/home
   └─ Log missing resource
```

---

## 12. Mobile Responsive Flow

```
DESKTOP (> 1024px)
├─ Sidebar visible (200px fixed)
├─ Main content full width
├─ Tables with horizontal scroll
└─ All features visible

TABLET (768px - 1024px)
├─ Sidebar collapsible
├─ Main content adjusts
├─ Tables with scroll
└─ Touch-friendly buttons

MOBILE (< 768px)
├─ Sidebar hidden (drawer/hamburger)
├─ Full width main content
├─ Stacked layout for forms
├─ Touch-optimized components
└─ Responsive tables with overflow
```

---

This comprehensive flow documentation covers all user interactions, navigation paths, and system behavior in the BloodCare application!
