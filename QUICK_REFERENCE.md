# BloodCare - Quick Reference Guide

## 🎯 What is BloodCare?

BloodCare is a **professional blood donation and transfusion management system** for healthcare facilities. It helps medical professionals manage patient records, schedule blood transfusions, track transfusion history, and analyze blood donation patterns through intuitive dashboards and real-time analytics.

---

## 📊 Core Features at a Glance

| Feature | Purpose | Location |
|---------|---------|----------|
| **Dashboard** | Overview of key metrics | `/` |
| **Patient Management** | Create, view, edit patient records | `/patients` |
| **Transfusion Scheduling** | Schedule transfusions with date/time | `/transfusions` |
| **History Calendar** | View/manage transfusions by date | `/history` |
| **Analytics** | Visual analysis and trends | `/analytics` |
| **Settings** | Language, theme, notifications | `/settings` |

---

## 🔄 Main User Flows

### 1️⃣ **Patient Management** (Most Common)
```
Patients List → Search/Filter Patients → View Patient Details
                                          ↓
                              Edit Patient Info OR Schedule Transfusion
```

### 2️⃣ **Scheduling Transfusion**
```
Pick Patient → Select Date/Time → Choose Priority & Units → Save
                                         ↓
                          Appears in Today's/Tomorrow's Schedule
```

### 3️⃣ **Check Today's Schedule**
```
Click "Today's Transfusions" → View all scheduled transfusions
                               ↓
                    Update status or delete if needed
```

### 4️⃣ **Analyze Data**
```
Click "Analytics" → View statistics & charts → Apply filters if needed
```

---

## 📱 Page Structure

```
┌─────────────────────────────────────────────────┐
│  HEADER (Language, Theme, User Menu)            │
├─────────┬───────────────────────────────────────┤
│ SIDEBAR │                                       │
│ - Home  │  MAIN CONTENT AREA                   │
│ - Patients                                      │
│ - Transfusions                                  │
│ - Analytics │  (Changes based on page)          │
│ - History   │                                   │
│ - Settings  │                                   │
└─────────┴───────────────────────────────────────┘
```

---

## 🗄️ Database Tables (Collections)

### **patients**
Stores patient personal & medical information
```javascript
{
  name, dateOfBirth, gender, bloodType, weight, height,
  hemoglobinLevel, medicalHistory, emergencyContact,
  patientCategory: ["HyperRegimen", "PolyTransfused", "Exchanges"],
  phenotype: { hasF, hasC, hasL },
  status: ["active", "inactive"]
}
```

### **transfusions**
Stores scheduled transfusions
```javascript
{
  patientId, patientName, patientBloodType,
  scheduledDate, scheduledTime, priority: ["normal", "urgent"],
  bags, hdist, hreceived,
  status: ["scheduled", "in_progress", "completed", "cancelled"]
}
```

### **dailyHistory**
Stores transfusion records by date
```javascript
{
  date: "YYYY-MM-DD",
  patients: [ array of transfusions for that date ]
}
```

---

## 🔐 Data Security

✅ **Implemented**
- Server-side validation (Zod schemas)
- MongoDB connection security
- Soft deletes (status: "deleted") instead of hard deletes
- Input sanitization
- Error handling without exposing sensitive data

⚠️ **Missing** (Future)
- User authentication & login
- Role-based access control (Admin, Doctor, Nurse)
- Data encryption
- Audit logging

---

## 🌍 Multi-Language Support

**Current Support**: English, Français (French), العربية (Arabic)

**How It Works**:
```
User selects language in Settings
    ↓
localStorage updated
    ↓
All UI text re-renders in selected language
    ↓
Arabic: Page direction switches to RTL (right-to-left)
    ↓
Preference persists across sessions
```

**Implementation**: `contexts/language-context.tsx` with 250+ translation keys

---

## 📡 API Endpoints Summary

### Patient APIs
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/patients` | List all patients |
| POST | `/api/patients` | Create patient |
| GET | `/api/patients/[id]` | Get patient details |
| PUT | `/api/patients/[id]` | Update patient |
| DELETE | `/api/patients/[id]` | Delete patient |

### Transfusion APIs
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/transfusions` | List transfusions |
| POST | `/api/transfusions` | Schedule transfusion |
| GET | `/api/transfusions/today` | Today's transfusions |
| GET | `/api/transfusions/tomorrow` | Tomorrow's transfusions |
| DELETE | `/api/transfusions/[id]` | Cancel transfusion |

### Analytics APIs
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/stats` | Get statistics |
| GET | `/api/analytics/charts` | Get chart data |

---

## 💻 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui components |
| **Database** | MongoDB (NoSQL) |
| **Validation** | Zod schemas |
| **Charting** | Recharts |
| **Hosting** | Vercel (recommended) |
| **State** | React Context (Language) |

---

## 🚀 Getting Started (For Developers)

### Installation
```bash
# Install dependencies
npm install

# Set environment variable
export MONGODB_URI="mongodb+srv://..."

# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

### Project Structure Quick Tour
```
app/                    # Next.js pages and routes
├── api/               # Backend endpoints
├── patients/          # Patient management pages
├── transfusions/      # Transfusion scheduling pages
├── analytics/         # Analytics pages
└── layout.tsx         # Root layout

components/           # Reusable React components
├── patient-*.tsx     # Patient components
├── transfusion-*.tsx # Transfusion components
├── header.tsx        # Top navigation
└── sidebar.tsx       # Left navigation

contexts/             # React Context (language)
lib/                  # Utilities and services
```

---

## 🎨 Key UI Components

| Component | Purpose |
|-----------|---------|
| **PatientForm** | Add/edit patient form with validation |
| **PatientList** | Table showing all patients |
| **PatientFilters** | Search and filter patient list |
| **TransfusionScheduleForm** | Schedule new transfusion |
| **AnalyticsCharts** | Recharts-based visualizations |
| **Header** | Top navigation with language selector |
| **Sidebar** | Left navigation menu |

---

## 🔧 Common Tasks

### Add New Feature
1. Create new page in `/app/[feature]/page.tsx`
2. Create components in `/components/`
3. Add API endpoints in `/app/api/[feature]/`
4. Add translations to `contexts/language-context.tsx`
5. Add navigation link to sidebar

### Debug Translation Issues
1. Check `contexts/language-context.tsx` for missing keys
2. Ensure component uses `const { t } = useLanguage()`
3. Use `t("key")` instead of hardcoded text
4. Verify all three languages have the key

### Modify Database Schema
1. Update MongoDB collection directly (or create migration)
2. Update API validation schema in `lib/validations/`
3. Update component form fields
4. Update display components to show new fields

---

## ⚡ Performance Optimizations

✅ **Implemented**
- Suspense boundaries for loading states
- Lazy loading of pages
- CSS-in-JS optimization with Tailwind
- API response caching with revalidatePath
- Image optimization
- Component memoization

💡 **Recommendations**
- Add database indexing on frequently queried fields
- Implement pagination for large datasets
- Cache analytics data periodically
- Use CDN for static assets

---

## 📱 Responsive Design

| Screen Size | Layout |
|------------|--------|
| **Desktop (>1024px)** | Sidebar visible + Full content |
| **Tablet (768-1024px)** | Collapsible sidebar + Responsive tables |
| **Mobile (<768px)** | Hidden sidebar (drawer) + Stacked layout |

---

## 🎓 User Roles & Permissions (Future)

Currently, the app has **no authentication**. Future implementation should include:

| Role | Capabilities |
|------|--------------|
| **Admin** | Full access, user management, system settings |
| **Doctor** | Create/edit patients, schedule transfusions, view analytics |
| **Nurse** | Update transfusion status, view patient records |
| **View-Only** | View patients and reports only, no editing |

---

## 📊 Analytics Features

**Available Charts**:
1. **Transfusions & Bags** - Scheduled vs completed over time
2. **Blood Groups & Hemoglobin** - Distribution by blood type
3. **Priorities & Bags** - Distribution by urgency level
4. **Monthly Trends** - Trend analysis with comparisons

**Available Statistics**:
- Total transfusions, bags, hemoglobin levels
- Critical cases count
- Active patients count
- Rare phenotypes tracking
- Dominant blood type

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Page not translating | Check if `useLanguage()` is imported and used |
| Database connection fails | Verify `MONGODB_URI` environment variable |
| Charts not displaying | Check API response in browser DevTools |
| Form validation not working | Ensure Zod schema matches form fields |
| RTL layout broken in Arabic | Clear browser cache and reload |
| Patient list loading forever | Check MongoDB connection and network |

---

## 📚 File Locations by Feature

### Patient Management
- Pages: `app/patients/`, `app/patients/[id]/`
- Components: `components/patient-*.tsx`
- API: `app/api/patients/`
- Validations: `lib/validations/patient.ts`

### Transfusion Scheduling
- Pages: `app/transfusions/`
- Components: `components/transfusion-*.tsx`
- API: `app/api/transfusions/`
- Validations: `lib/validations/transfusion.ts`

### Analytics
- Pages: `app/analytics/`
- Components: `components/analytics-*.tsx`
- API: `app/api/analytics/`, `app/api/stats/`

### Multi-Language
- Context: `contexts/language-context.tsx`
- Initializer: `components/language-initializer.tsx`
- Usage: Every component with UI text uses `useLanguage()`

---

## 🎯 Next Steps for Development

### High Priority
- [ ] Add user authentication (Login/Logout)
- [ ] Add role-based access control
- [ ] Add audit logging
- [ ] Add data backup system

### Medium Priority
- [ ] Add SMS/Email notifications
- [ ] Add patient appointment scheduling
- [ ] Add blood bank inventory integration
- [ ] Improve mobile responsiveness

### Low Priority
- [ ] Add predictive analytics
- [ ] Add mobile app
- [ ] Add offline mode
- [ ] Add dark theme enhancements

---

## 🆘 Quick Help

**Is the app showing in French?**
- This is normal - default language is French
- Change in Settings → Language → Choose English or Arabic

**Can't find a patient I created?**
- Ensure patient is marked as "active" (not deleted)
- Try searching by name or ID
- Check filters - they might be too restrictive

**Transfusion not appearing in schedule?**
- Verify date is correct (check Today vs Tomorrow)
- Ensure transfusion status is "scheduled"
- Refresh page to reload data

**Form won't submit?**
- Check validation errors (red text in form)
- Ensure all required fields are filled
- Try different browser if persists

**Charts showing no data?**
- Need at least one transfusion record to show data
- Create test data in history
- Wait for analytics to process (may need refresh)

---

## 📞 Support & Documentation

- **Full Documentation**: See `APP_STRUCTURE.md`
- **User Flows**: See `USER_FLOWS.md`
- **Code Structure**: See project directory
- **Database**: MongoDB documentation
- **Framework**: Next.js documentation at nextjs.org

---

## 📝 Summary

**BloodCare** is a complete blood transfusion management solution that helps healthcare facilities:
- Manage patient records efficiently
- Schedule and track transfusions
- Analyze transfusion patterns
- Support multiple languages
- Provide real-time analytics

With its clean UI, comprehensive features, and professional architecture, BloodCare enables healthcare professionals to make data-driven decisions about patient care and blood resource allocation.

**Current Status**: ✅ Functional & Production-Ready (with authentication needed)

**Last Updated**: May 23, 2026

---
