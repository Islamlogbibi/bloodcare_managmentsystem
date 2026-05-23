# BloodCare Management System - Complete App Structure & User Flow

## Overview
BloodCare is a comprehensive blood donation and transfusion management system designed for healthcare facilities. It enables medical professionals to manage patient records, schedule blood transfusions, track transfusion history, and analyze blood donation patterns.

---

## Architecture Overview

### Tech Stack
- **Frontend**: Next.js 14 (React 18) with App Router
- **Database**: MongoDB (Cloud-based)
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context (Language context)
- **API**: RESTful APIs with validation (Zod)
- **Languages**: English, French, Arabic (with RTL support)

### Project Structure
```
/vercel/share/v0-project/
├── app/                          # Next.js App Router
│   ├── api/                      # Backend API routes
│   │   ├── patients/            # Patient CRUD operations
│   │   ├── transfusions/        # Transfusion management
│   │   ├── history/             # Transfusion history
│   │   ├── stats/               # Statistics/analytics data
│   │   └── analytics/           # Chart data
│   ├── patients/                # Patient pages
│   │   ├── page.tsx             # Patient list view
│   │   ├── new/                 # Create new patient
│   │   └── [id]/                # Patient detail pages
│   ├── transfusions/            # Transfusion scheduling
│   │   ├── today/               # Today's transfusions
│   │   ├── tomorrow/            # Tomorrow's transfusions
│   │   └── schedule/            # Schedule new transfusion
│   ├── analytics/               # Analytics & reports
│   ├── history/                 # Transfusion history calendar
│   ├── settings/                # User settings
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Dashboard home
│   └── lib/
│       └── actions.ts           # Server-side database operations
├── components/                  # Reusable React components
│   ├── patient-*.tsx           # Patient-related components
│   ├── transfusion-*.tsx       # Transfusion components
│   ├── analytics-*.tsx         # Analytics components
│   ├── header.tsx              # Top navigation
│   ├── sidebar.tsx             # Left navigation
│   ├── ui/                     # shadcn/ui components
│   └── language-initializer.tsx # Language setup
├── contexts/
│   └── language-context.tsx    # Multi-language support
├── lib/
│   ├── services/               # Business logic services
│   │   ├── patient-service.ts
│   │   └── transfusion-service.ts
│   └── validations/            # Zod schemas for validation
└── public/                      # Static assets

```

---

## Core Database Schema

### Collections

#### 1. **patients** Collection
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: String ("male" | "female"),
  phone: String,
  email: String,
  address: String,
  bloodType: String ("O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"),
  phenotype: String,
  weight: Number,
  height: Number,
  hemoglobinLevel: Number,
  admissionDate: Date,
  lastDonationDate: Date,
  medicalHistory: String,
  emergencyContact: String,
  emergencyPhone: String,
  hasF: Boolean,
  hasC: Boolean,
  hasL: Boolean,
  patientCategory: String ("HyperRegimen", "PolyTransfused", "Exchanges", "OccasionalExchanges"),
  patientId: String ("PAT" + timestamp),
  status: String ("active" | "inactive" | "deleted"),
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. **transfusions** Collection
```javascript
{
  _id: ObjectId,
  patientId: ObjectId (ref: patients._id),
  patientName: String,
  patientPhone: String,
  patientBloodType: String,
  scheduledDate: Date,
  scheduledTime: String ("HH:MM"),
  priority: String ("normal" | "urgent"),
  bags: Number,
  hdist: Number,
  hreceived: Number,
  hasF: Boolean,
  hasC: Boolean,
  hasL: Boolean,
  notes: String,
  status: String ("scheduled" | "in_progress" | "completed" | "cancelled"),
  createdAt: Date,
  updatedAt: Date
}
```

#### 3. **dailyHistory** Collection
```javascript
{
  _id: ObjectId,
  date: String ("YYYY-MM-DD"),
  patients: [
    {
      patientId: ObjectId,
      firstName: String,
      lastName: String,
      patientName: String,
      bloodType: String,
      priority: String,
      bags: Number,
      hdist: Number,
      hreceived: Number,
      hasF: Boolean,
      hasC: Boolean,
      hasL: Boolean,
      notes: String
    }
  ]
}
```

#### 4. **statistics** Collection
```javascript
{
  _id: ObjectId,
  date: Date,
  totalPatients: Number,
  todayTransfusions: Number,
  tomorrowTransfusions: Number,
  urgentCases: Number,
  completedToday: Number,
  totalBags: Number,
  avgHemoglobin: Number
}
```

---

## User Flow & Features

### 1. **Dashboard (Home Page)**
**Route**: `/`

**Purpose**: Central hub showing key metrics and quick access to main features

**Features**:
- Display 4 main statistics cards:
  - Total Patients
  - Urgent Cases
  - Active Transfusions
  - Scheduled Transfusions
- Quick action buttons for common tasks
- Navigation to different sections

**User Flow**:
1. User lands on dashboard
2. Views overview statistics
3. Clicks on section cards to navigate to:
   - Patient management
   - Transfusion scheduling
   - Analytics
   - Settings

---

### 2. **Patient Management**

#### 2.1 Patient List Page
**Route**: `/patients`

**Purpose**: Browse, search, and filter all patient records

**Features**:
- Table showing all patients with:
  - Name (GP column)
  - Blood Type (PH column)
  - F, C, L phenotype markers
  - Last Transfusion date
  - Days Elapsed since last transfusion
  - Action buttons (View, Edit, Schedule Transfusion, Delete)
- Filters by:
  - Blood Type
  - Phenotype
  - Patient Category
  - Search by name/phone/email
- Sort columns (Days Elapsed is default sortable)

**User Flow**:
1. User navigates to "Patients" in sidebar
2. Page loads with all active patients
3. User can:
   - Search for specific patient by name/ID
   - Filter by blood type or phenotype
   - Click "View Details" to see full patient profile
   - Click "Edit" to modify patient information
   - Click "Schedule Transfusion" for quick scheduling
   - Click "Delete" to soft-delete patient

#### 2.2 Add New Patient
**Route**: `/patients/new`

**Purpose**: Register a new patient in the system

**Form Fields**:
- **Personal Information**:
  - First Name *
  - Last Name *
  - Date of Birth
  - Gender (Male/Female) *
  
- **Contact Information**:
  - Phone Number
  - Email
  - Address
  
- **Medical Information**:
  - Blood Type * (dropdown: O+, O-, A+, A-, B+, B-, AB+, AB-)
  - Phenotype * (dropdown: Select phenotype)
  - Weight (kg)
  - Height (cm)
  - Hemoglobin Level (g/dL)
  
- **Medical History**:
  - Admission Date
  - Last Donation Date
  - Medical History (text area)
  - Emergency Contact
  - Emergency Phone
  
- **Phenotype Markers**:
  - Has F (checkbox)
  - Has C (checkbox)
  - Has L (checkbox)
  
- **Patient Category** * (dropdown):
  - HyperRegimen
  - PolyTransfused
  - Exchanges
  - Occasional Exchanges

**Validation**:
- All fields marked with * are required
- Phone must be valid format
- Date fields must be valid dates
- Blood type must be selected

**User Flow**:
1. User clicks "+ Add New Patient" button
2. Fills in patient form
3. Clicks "Save Patient"
4. System validates data
5. Redirects to patient list if successful
6. Shows error toast if validation fails

#### 2.3 View Patient Details
**Route**: `/patients/[id]/view`

**Purpose**: Display complete patient profile

**Sections**:
- **Personal Information**:
  - Name, Date of Birth, Age, Gender
  
- **Contact Information**:
  - Phone, Email, Address
  
- **Medical Information**:
  - Blood Type, Phenotype, Weight, Height, Hemoglobin Level
  
- **Medical History**:
  - Admission Date, Last Donation Date, Medical History
  - Emergency Contact & Phone
  
- **Phenotype Markers**: F, C, L status
  
- **Patient Category**: Current category

**Actions**:
- "Edit Patient" button → `/patients/[id]/edit`
- "Schedule Transfusion" button → `/transfusions/schedule/[id]`
- Back button to patient list

**User Flow**:
1. User clicks "View Details" on patient list
2. System loads patient full profile
3. User can:
   - Edit patient info
   - Schedule a new transfusion
   - View transfusion history (if available)
   - Return to patient list

#### 2.4 Edit Patient
**Route**: `/patients/[id]/edit`

**Purpose**: Modify existing patient information

**Features**:
- Same form as "Add New Patient"
- Pre-filled with current patient data
- "Save Changes" button updates record
- "Delete Patient" option with confirmation

**User Flow**:
1. User navigates to patient edit page
2. Form pre-loads with current data
3. User modifies fields
4. Clicks "Save Changes"
5. System validates and saves
6. Redirects back to patient view/list

---

### 3. **Transfusion Management**

#### 3.1 Schedule New Transfusion
**Route**: `/transfusions/schedule/[patientId]`

**Purpose**: Schedule a blood transfusion for a patient

**Form Fields**:
- Patient Name (auto-filled, disabled)
- Blood Type (auto-filled from patient, disabled)
- Scheduled Date * (calendar picker, future dates only)
- Scheduled Time * (time input HH:MM)
- Priority *:
  - Normal
  - Urgent
- Number of Blood Units * (1-10)
- Notes (optional text area)

**Validation**:
- Date cannot be in the past
- Time must be valid
- Priority must be selected
- Units must be between 1-10

**User Flow**:
1. User clicks "Schedule Transfusion" from patient list or detail page
2. Form pre-loads with patient data
3. User selects date, time, priority, and units
4. Clicks "Schedule Transfusion"
5. System creates transfusion record
6. Shows success notification
7. Redirects to today's/relevant schedule

#### 3.2 Today's Transfusions
**Route**: `/transfusions/today`

**Purpose**: View and manage transfusions scheduled for today

**Features**:
- Table showing:
  - Patient Name
  - Blood Type
  - Scheduled Time
  - Priority (color-coded: Normal/Urgent)
  - Blood Units
  - Status (Pending, In Progress, Completed, Cancelled)
  - Action buttons (Mark as Complete, Cancel, Edit, Delete)
  
- Empty state with message:
  - "No transfusions scheduled for today"
  - Button to schedule a new transfusion
  
- Quick actions:
  - Print report
  - Export data

**User Flow**:
1. User clicks "Today's Transfusions" in sidebar
2. System shows transfusions for current date
3. User can:
   - View patient details by clicking name
   - Mark transfusion as completed
   - Cancel a scheduled transfusion
   - Edit transfusion details
   - Delete transfusion record
   - Print/export daily report

#### 3.3 Tomorrow's Transfusions
**Route**: `/transfusions/tomorrow`

**Purpose**: Plan and manage transfusions for the next day

**Features**: Same as Today's Transfusions but for next day

---

### 4. **History & Calendar View**
**Route**: `/history`

**Purpose**: Calendar-based view of transfusion history

**Features**:
- Interactive calendar (left side)
  - Navigate through months
  - Click date to select
  - Current date highlighted
  
- Patient list for selected date (right side)
  - Table with all transfusions for that date
  - Columns: H.dist, H.received, Patient, Blood Type, Phenotype, F/C/L, Priority, Bags, Hb, Status, Actions
  
- Add transfusion for selected date
  - Button: "Add patient for this day"
  - Opens dialog to:
    - Select patient from dropdown
    - Enter H.dist, H.received
    - Enter bags count
    - Check F/C/L markers
    - Enter priority
    - Enter notes
    - Save to history
    
- Delete transfusion option

**User Flow**:
1. User navigates to "History" in sidebar
2. Calendar displays current month
3. User clicks a date to view/add transfusions
4. Can add new transfusion record for that date
5. Can edit or delete existing records
6. Can print history

---

### 5. **Analytics & Reports**
**Route**: `/analytics`

**Purpose**: Visual analysis of transfusion data and statistics

**Dashboard Shows**:

**Statistics Cards** (Top):
- Total Transfusions
- Number of Bags (units distributed)
- Average Hemoglobin Level
- Critical Cases

- Active Patients
- Transfusions Today
- Rare Phenotypes (F/C/L combinations)
- Dominant Blood Type

**Charts** (Below):

1. **Transfusions and Bags Chart**
   - X-axis: Dates or months
   - Y-axis: Count and units
   - Shows: Scheduled vs Completed transfusions with bag count

2. **Blood Groups and Hemoglobin**
   - X-axis: Blood groups (O+, A+, B+, AB+, O-, A-, B-, AB-)
   - Y-axis: Hemoglobin levels
   - Shows: Distribution and average hemoglobin per blood type

3. **Priorities and Bags**
   - X-axis: Priority levels (Normal, Urgent)
   - Y-axis: Count and units
   - Shows: Distribution by priority with bag count

4. **Monthly Trends**
   - X-axis: Months
   - Y-axis: Count
   - Shows: Transfusion trends over time with comparison to previous period

**Data Filters** (Optional):
- Date range picker
- Blood type filter
- Priority filter
- Patient category filter

**Exportable Data**:
- Download as CSV or PDF

**User Flow**:
1. User navigates to "Analytics"
2. System loads and displays all statistics and charts
3. User can:
   - Apply filters to see specific data
   - Hover over charts for detailed info
   - Export data for external analysis
   - Use trends to plan resource allocation

---

### 6. **Settings & Profile**
**Route**: `/settings`

**Purpose**: User preferences and system configuration

**Settings Sections**:

1. **System Settings**:
   - Language Selection:
     - English
     - Français (French)
     - العربية (Arabic)
   - Theme:
     - Light (default)
     - Dark
   
2. **Notifications**:
   - Sound Enabled (toggle)
   - Email Notifications (toggle)
   
3. **Profile**:
   - View/Edit user profile information
   - Update password
   - Logout

**User Flow**:
1. User clicks "Settings" in sidebar or header menu
2. System displays settings page
3. User can:
   - Change language (updates entire app UI)
   - Toggle theme
   - Enable/disable notifications
   - Update profile
   - Change password
   - Logout

---

## Multi-Language Support

### Supported Languages
- **English** (en) - Default
- **Français** (fr) - French
- **العربية** (ar) - Arabic with RTL support

### Implementation
- **Context**: `contexts/language-context.tsx`
- **Provider**: Wraps entire app in `layout.tsx`
- **Storage**: Language preference saved to localStorage
- **Hook**: `useLanguage()` used in components to access `t()` translation function

### RTL Support (Arabic)
- Layout direction automatically switches to RTL
- Cairo font loaded from Google Fonts for Arabic text support
- Flexbox directions adjusted for RTL layout
- Text alignment reversed for Arabic

### Translation Keys
Over 250+ translation keys covering:
- Navigation labels
- Form labels and placeholders
- Table headers
- Buttons and actions
- Status labels
- Error messages
- Success messages
- Validation messages

---

## Key Components

### Layout Components
- **Header** (`components/header.tsx`):
  - Top navigation
  - User menu
  - Language selector
  - Search bar (future)

- **Sidebar** (`components/sidebar.tsx`):
  - Navigation menu
  - Links to all main sections
  - Collapse/expand toggle

### Patient Components
- **PatientList** (`components/patient-list.tsx`):
  - Displays patient table
  - Sorting and filtering
  - Action buttons
  
- **PatientForm** (`components/patient-form.tsx`):
  - Reusable form for add/edit
  - Form validation
  - Error handling

- **PatientFilters** (`components/patient-filters.tsx`):
  - Filter UI for patient list
  - Blood type, phenotype, category filters

### Transfusion Components
- **TransfusionScheduleForm** (`components/transfusion-schedule-form.tsx`):
  - Schedule new transfusion
  - Date/time picker
  - Priority selection

- **QuickScheduleDialog** (`components/quick-schedule-dialog.tsx`):
  - Quick schedule dialog from patient list

### Analytics Components
- **AnalyticsCharts** (`components/analytics-charts.tsx`):
  - Recharts-based visualizations
  - Multiple chart types

- **AnalyticsStats** (`components/analytics-stats.tsx`):
  - Statistics cards
  - Key metrics display

---

## API Endpoints

### Patient APIs
- **GET** `/api/patients` - Get all patients with filters
- **POST** `/api/patients` - Create new patient
- **GET** `/api/patients/[id]` - Get patient by ID
- **PUT** `/api/patients/[id]` - Update patient
- **DELETE** `/api/patients/[id]` - Delete patient (soft delete)
- **GET** `/api/patients/export` - Export patients as CSV

### Transfusion APIs
- **GET** `/api/transfusions` - Get transfusions with filters
- **POST** `/api/transfusions` - Create transfusion
- **GET** `/api/transfusions/[id]` - Get transfusion by ID
- **PUT** `/api/transfusions/[id]` - Update transfusion
- **DELETE** `/api/transfusions/[id]` - Delete transfusion
- **GET** `/api/transfusions/today` - Today's transfusions
- **GET** `/api/transfusions/tomorrow` - Tomorrow's transfusions

### History APIs
- **GET** `/api/history` - Get all history records
- **POST** `/api/history` - Add history record
- **GET** `/api/history/[date]` - Get transfusions for specific date
- **DELETE** `/api/history/[id]` - Delete history record

### Analytics APIs
- **GET** `/api/stats` - Get statistics
- **GET** `/api/analytics/charts` - Get chart data
- **GET** `/api/stats/export` - Export stats as CSV/PDF

---

## Data Flow

### Create Patient Flow
```
User Form Input
    ↓
Client Validation (Form validation)
    ↓
POST /api/patients
    ↓
Server Validation (Zod schema)
    ↓
Database Insert
    ↓
Cache Revalidation
    ↓
Success Response
    ↓
Toast Notification
    ↓
Redirect to Patient List
```

### Schedule Transfusion Flow
```
Patient Selection
    ↓
Schedule Form Input (Date, Time, Priority, Units)
    ↓
Client Validation
    ↓
POST /api/transfusions
    ↓
Create Transfusion Record
    ↓
Update Daily History (if applicable)
    ↓
Success Response
    ↓
Redirect to Today's/Tomorrow's Schedule
```

### View Analytics Flow
```
Load Analytics Page
    ↓
Fetch /api/stats (statistics)
    ↓
Fetch /api/analytics/charts (chart data)
    ↓
Aggregate Data
    ↓
Render Charts (Recharts)
    ↓
Display Statistics Cards
```

---

## Key Features Summary

✅ **Patient Management**
- Create, read, update, delete (soft delete) patients
- Comprehensive patient profiles with medical history
- Patient categorization (HyperRegimen, PolyTransfused, etc.)
- Search and filter capabilities

✅ **Transfusion Scheduling**
- Schedule transfusions with date/time selection
- Priority levels (Normal, Urgent)
- Track blood unit quantities
- Status tracking (Scheduled, In Progress, Completed, Cancelled)

✅ **History & Calendar**
- Calendar-based transfusion history view
- Daily patient records
- Add/edit/delete transfusion records by date

✅ **Analytics & Reports**
- Real-time statistics and metrics
- Multiple chart types with Recharts
- Blood type and hemoglobin analysis
- Priority and bag distribution visualization
- Monthly trend analysis
- Exportable data

✅ **Multi-Language Support**
- English, French, Arabic
- RTL support for Arabic
- 250+ translation keys
- Persistent language preference

✅ **User Experience**
- Responsive design (Mobile, Tablet, Desktop)
- Toast notifications for feedback
- Loading states and suspense boundaries
- Error handling and validation
- Dark/Light theme support

---

## Technology Highlights

- **Next.js 14**: Latest React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Accessible UI component library
- **MongoDB**: NoSQL database for flexible schema
- **Recharts**: React charting library for analytics
- **Zod**: Schema validation
- **React Calendar**: Calendar widget

---

## Security Considerations

- Server-side validation for all API endpoints
- Soft deletes (status: "deleted") instead of hard deletes
- MongoDB connection with authentication
- CORS headers for API security
- Input sanitization
- Error handling without exposing sensitive data

---

## Future Enhancement Possibilities

1. **User Authentication**: Login/Logout, Role-based access (Admin, Doctor, Nurse)
2. **Real-time Notifications**: Transfusion reminders, alerts
3. **SMS/Email Alerts**: Notify on scheduled transfusions
4. **Patient Mobile App**: Track own transfusion history
5. **Blood Bank Integration**: Automatic inventory management
6. **Appointment System**: Schedule transfusions with time slots
7. **PDF Reports**: Generate formatted transfusion reports
8. **Data Backup**: Automated database backups
9. **Advanced Analytics**: Predictive analytics for transfusion needs
10. **Mobile Responsive**: Further optimization for mobile devices

---

## Deployment & Environment

**Required Environment Variables**:
```
MONGODB_URI=<MongoDB connection string>
NEXT_PUBLIC_API_URL=<API base URL>
NODE_ENV=production
```

**Hosting**: Vercel (Recommended for Next.js)

---

This comprehensive guide covers all aspects of the BloodCare system, from user flows to technical implementation!
