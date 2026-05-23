"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "fr" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    patients: "Patients",
    analytics: "Analytics",
    settings: "Settings",
    todayTransfusions: "Today's Transfusions",
    tomorrowTransfusions: "Tomorrow's Transfusions",
    history: "History",
    reports: "Reports",
    analyse: "Analysis",

    // Patient Table Headers
    nomEtPrenom: "NAME",
    gp: "GP",
    ph: "PH",
    f: "F",
    c: "C",
    l: "L",
    derniereT: "LAST T",
    prochaineT: "NEXT T",
    jecoulés: "DAYS ELAPSED",
    renseignements: "ACTIONS",
    bloodType: "Blood Type",
    lastTransfusion: "Last Transfusion",
    nextTransfusion: "Next Transfusion",

    // Actions
    view: "View",
    edit: "Edit",
    delete: "Delete",
    schedule: "Schedule",
    done: "Done",
    completed: "Completed",
    markAsDone: "Mark as Done",
    add: "Add",
    create: "Create",
    update: "Update",
    remove: "Remove",

    // Common
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    search: "Search",
    filter: "Filter",
    export: "Export",
    import: "Import",
    noData: "No data available",

    // Dashboard
    totalPatients: "Total Patients",
    urgentCases: "Urgent Cases",
    activeTransfusions: "Active Transfusions",
    scheduledTransfusions: "Scheduled Transfusions",
    completedToday: "Completed Today",

    // Scheduling
    scheduleTransfusion: "Schedule Transfusion",
    regular: "Regular",
    urgent: "Urgent",
    scheduledForTomorrow: "Scheduled for tomorrow at 9:00 AM",
    scheduledForToday: "Scheduled for today at next available slot",
    selectDate: "Select Date",
    selectTime: "Select Time",
    selectType: "Select Type",

    // Forms
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    dateOfBirth: "Date of Birth",
    gender: "Gender",
    bloodGroup: "Blood Group",
    rhFactor: "RH Factor",
    note: "Note",
    notes: "Notes",
    reason: "Reason",
    status: "Status",

    // Status
    pending: "Pending",
    inProgress: "In Progress",
    cancelled: "Cancelled",
    successful: "Successful",
    failed: "Failed",

    // Settings
    language: "Language",
    selectLanguage: "Select Language",
    theme: "Theme",
    darkMode: "Dark Mode",
    notifications: "Notifications",
    soundEnabled: "Sound Enabled",
    emailNotifications: "Email Notifications",
    updateProfile: "Update Profile",
    changePassword: "Change Password",
    logout: "Logout",
    myProfile: "My Profile",
    profileSettings: "Profile Settings",

    // Analytics
    totalTransfusions: "Total Transfusions",
    numberOfBags: "Number of Bags",
    avgHemoglobin: "Average Hemoglobin",
    criticalCases: "Critical Cases",
    activePatients: "Active Patients",
    transfusionsToday: "Transfusions Today",
    rarePhenotypes: "Rare Phenotypes",
    dominantBloodType: "Dominant Blood Type",
    chartsAndTrends: "Charts and Trends",
    transfusionDataVisualization: "Visual representation of transfusion data",
    transfusionsAndBags: "Transfusions and Blood Bags",
    transfusionsScheduledVsCompleted: "Scheduled transfusions vs completed with number of bags",
    bloodGroupsAndHemoglobin: "Blood Groups and Hemoglobin",
    hemoglobinDistribution: "Distribution with average hemoglobin level",
    prioritiesAndBags: "Priorities and Blood Bags",
    distributionByPriority: "Distribution by priority with number of bags",
    monthlyTrends: "Monthly Trends",
    transfusionByMonth: "Transfusions by month with progress",
    vsLastWeek: "vs last week",
    vsLastPeriod: "vs last period",
    bagPerTransfusion: "bags per transfusion",
    range: "Range",
    newPatients: "new patients",
    patients: "patients",
    completed: "completed",
    data: "Data",
    chart: "Chart",
    no: "No",

    // Transfusions
    noTransfusionScheduled: "No Transfusion Scheduled",
    noBloodTransfusionsScheduled: "There are no blood transfusions scheduled for tomorrow",
    noBloodTransfusionsScheduledToday: "There are no blood transfusions scheduled for today",
    print: "Print",
    dailyTransfusionReport: "Daily Transfusion Report",
    transfusionSchedule: "Blood Transfusion Schedule",
    confirmDelete: "Are you sure you want to delete this transfusion?",
    deleted: "Deleted",
    transfusionDeleted: "Transfusion successfully deleted",
    deletionFailed: "Failed to delete transfusion",

    // Messages
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Information",
    confirmDelete: "Are you sure you want to delete this?",
    confirmLogout: "Are you sure you want to logout?",
    invalidInput: "Invalid input",
    required: "This field is required",
  },
  fr: {
    // Navigation
    dashboard: "Tableau de Bord",
    patients: "Patients",
    analytics: "Analyses",
    settings: "Paramètres",
    todayTransfusions: "Transfusions d'Aujourd'hui",
    tomorrowTransfusions: "Transfusions de Demain",
    history: "Historique",
    reports: "Rapports",
    analyse: "Analyse",

    // Patient Table Headers
    nomEtPrenom: "NOM ET PRÉNOM",
    gp: "GP",
    ph: "PH",
    f: "F",
    c: "C",
    l: "L",
    derniereT: "DERNIÈRE T",
    prochaineT: "PROCHAINE T",
    jecoulés: "J/ÉCOULÉS",
    renseignements: "ACTIONS",
    bloodType: "Groupe Sanguin",
    lastTransfusion: "Dernière Transfusion",
    nextTransfusion: "Prochaine Transfusion",

    // Actions
    view: "Voir",
    edit: "Modifier",
    delete: "Supprimer",
    schedule: "Programmer",
    done: "Terminé",
    completed: "Complété",
    markAsDone: "Marquer comme Terminé",
    add: "Ajouter",
    create: "Créer",
    update: "Mettre à Jour",
    remove: "Retirer",

    // Common
    loading: "Chargement...",
    save: "Enregistrer",
    cancel: "Annuler",
    confirm: "Confirmer",
    search: "Rechercher",
    filter: "Filtrer",
    export: "Exporter",
    import: "Importer",
    noData: "Aucune donnée disponible",

    // Dashboard
    totalPatients: "Total des Patients",
    urgentCases: "Cas Urgents",
    activeTransfusions: "Transfusions Actives",
    scheduledTransfusions: "Transfusions Programmées",
    completedToday: "Complétées Aujourd'hui",

    // Scheduling
    scheduleTransfusion: "Programmer une Transfusion",
    regular: "Régulier",
    urgent: "Urgent",
    scheduledForTomorrow: "Programmé pour demain à 9h00",
    scheduledForToday: "Programmé pour aujourd'hui au prochain créneau disponible",
    selectDate: "Sélectionner la Date",
    selectTime: "Sélectionner l'Heure",
    selectType: "Sélectionner le Type",

    // Forms
    firstName: "Prénom",
    lastName: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    address: "Adresse",
    dateOfBirth: "Date de Naissance",
    gender: "Genre",
    bloodGroup: "Groupe Sanguin",
    rhFactor: "Facteur RH",
    note: "Remarque",
    notes: "Remarques",
    reason: "Raison",
    status: "Statut",

    // Status
    pending: "En attente",
    inProgress: "En Cours",
    cancelled: "Annulé",
    successful: "Réussi",
    failed: "Échoué",

    // Settings
    language: "Langue",
    selectLanguage: "Sélectionner la Langue",
    theme: "Thème",
    darkMode: "Mode Sombre",
    notifications: "Notifications",
    soundEnabled: "Son Activé",
    emailNotifications: "Notifications par E-mail",
    updateProfile: "Mettre à Jour le Profil",
    changePassword: "Changer le Mot de Passe",
    logout: "Déconnexion",
    myProfile: "Mon Profil",
    profileSettings: "Paramètres du Profil",

    // Analytics
    totalTransfusions: "Total des Transfusions",
    numberOfBags: "Nombre de Poches",
    avgHemoglobin: "Hémoglobine Moyenne",
    criticalCases: "Cas Critiques",
    activePatients: "Patients Actifs",
    transfusionsToday: "Transfusions Aujourd'hui",
    rarePhenotypes: "Phénotypes Rares",
    dominantBloodType: "Groupe Sanguin Dominant",
    chartsAndTrends: "Graphiques et Tendances",
    transfusionDataVisualization: "Représentation visuelle des données de transfusion",
    transfusionsAndBags: "Transfusions et Poches Sanguines",
    transfusionsScheduledVsCompleted: "Transfusions programmées vs complétées avec nombre de poches",
    bloodGroupsAndHemoglobin: "Groupes Sanguins et Hémoglobine",
    hemoglobinDistribution: "Distribution avec taux d'hémoglobine moyen",
    prioritiesAndBags: "Priorités et Poches Sanguines",
    distributionByPriority: "Distribution par priorité avec nombre de poches",
    monthlyTrends: "Tendances Mensuelles",
    transfusionByMonth: "Transfusions par mois avec progression",
    vsLastWeek: "vs semaine précédente",
    vsLastPeriod: "vs période précédente",
    bagPerTransfusion: "poches par transfusion",
    range: "Plage",
    newPatients: "nouveaux patients",
    patients: "patients",
    completed: "complétées",
    data: "Données",
    chart: "Graphique",
    no: "Aucune",

    // Transfusions
    noTransfusionScheduled: "Aucune transfusion programmée",
    noBloodTransfusionsScheduled: "Il n'y a pas de transfusions sanguines programmées pour demain",
    noBloodTransfusionsScheduledToday: "Il n'y a pas de transfusions sanguines programmées pour aujourd'hui",
    print: "Imprimer",
    dailyTransfusionReport: "Rapport Quotidien des Transfusions",
    transfusionSchedule: "Programme des Transfusions Sanguines",
    confirmDeleteTransfusion: "Êtes-vous sûr de vouloir supprimer cette transfusion?",
    deleted: "Supprimé",
    transfusionDeleted: "Transfusion supprimée avec succès",
    deletionFailed: "Échec de la suppression de la transfusion",

    // Messages
    success: "Succès",
    error: "Erreur",
    warning: "Avertissement",
    info: "Information",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer ceci?",
    confirmLogout: "Êtes-vous sûr de vouloir vous déconnecter?",
    invalidInput: "Entrée invalide",
    required: "Ce champ est obligatoire",
  },
  ar: {
    // Navigation
    dashboard: "لوحة التحكم",
    patients: "المرضى",
    analytics: "التحليلات",
    settings: "الإعدادات",
    todayTransfusions: "نقل الدم اليوم",
    tomorrowTransfusions: "نقل الدم غدًا",
    history: "السجل",
    reports: "التقارير",
    analyse: "التحليل",

    // Patient Table Headers
    nomEtPrenom: "الاسم",
    gp: "GP",
    ph: "PH",
    f: "F",
    c: "C",
    l: "L",
    derniereT: "آخر نقل",
    prochaineT: "نقل قادم",
    jecoulés: "أيام مضت",
    renseignements: "الإجراءات",
    bloodType: "فصيلة الدم",
    lastTransfusion: "آخر نقل دم",
    nextTransfusion: "نقل الدم القادم",

    // Actions
    view: "عرض",
    edit: "تعديل",
    delete: "حذف",
    schedule: "جدولة",
    done: "تم",
    completed: "مكتمل",
    markAsDone: "وضع علامة كمكتمل",
    add: "إضافة",
    create: "إنشاء",
    update: "تحديث",
    remove: "إزالة",

    // Common
    loading: "جاري التحميل...",
    save: "حفظ",
    cancel: "إلغاء",
    confirm: "تأكيد",
    search: "البحث",
    filter: "تصفية",
    export: "تصدير",
    import: "استيراد",
    noData: "لا توجد بيانات",

    // Dashboard
    totalPatients: "إجمالي المرضى",
    urgentCases: "حالات طارئة",
    activeTransfusions: "عمليات نقل نشطة",
    scheduledTransfusions: "عمليات نقل مجدولة",
    completedToday: "مكتملة اليوم",

    // Scheduling
    scheduleTransfusion: "جدولة نقل دم",
    regular: "منتظم",
    urgent: "طارئ",
    scheduledForTomorrow: "مجدول لغدًا الساعة 9:00 صباحًا",
    scheduledForToday: "مجدول لليوم في أقرب وقت متاح",
    selectDate: "اختر التاريخ",
    selectTime: "اختر الوقت",
    selectType: "اختر النوع",

    // Forms
    firstName: "الاسم الأول",
    lastName: "الاسم الأخير",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    address: "العنوان",
    dateOfBirth: "تاريخ الميلاد",
    gender: "الجنس",
    bloodGroup: "فصيلة الدم",
    rhFactor: "عامل RH",
    note: "ملاحظة",
    notes: "ملاحظات",
    reason: "السبب",
    status: "الحالة",

    // Status
    pending: "قيد الانتظار",
    inProgress: "قيد التنفيذ",
    cancelled: "ملغى",
    successful: "نجح",
    failed: "فشل",

    // Settings
    language: "اللغة",
    selectLanguage: "اختر اللغة",
    theme: "المظهر",
    darkMode: "الوضع الداكن",
    notifications: "الإخطارات",
    soundEnabled: "الصوت مفعل",
    emailNotifications: "إخطارات البريد الإلكتروني",
    updateProfile: "تحديث الملف الشخصي",
    changePassword: "تغيير كلمة المرور",
    logout: "تسجيل الخروج",
    myProfile: "ملفي الشخصي",
    profileSettings: "إعدادات الملف الشخصي",

    // Analytics
    totalTransfusions: "إجمالي عمليات النقل",
    numberOfBags: "عدد الأكياس",
    avgHemoglobin: "متوسط الهيموجلوبين",
    criticalCases: "حالات حرجة",
    activePatients: "المرضى النشطون",
    transfusionsToday: "عمليات النقل اليوم",
    rarePhenotypes: "الأنماط الظاهرية النادرة",
    dominantBloodType: "فصيلة الدم السائدة",
    chartsAndTrends: "الرسوم البيانية والاتجاهات",
    transfusionDataVisualization: "تصور مرئي لبيانات النقل",
    transfusionsAndBags: "عمليات النقل والأكياس",
    transfusionsScheduledVsCompleted: "عمليات النقل المجدولة مقابل المكتملة مع عدد الأكياس",
    bloodGroupsAndHemoglobin: "فصائل الدم والهيموجلوبين",
    hemoglobinDistribution: "التوزيع مع متوسط مستوى الهيموجلوبين",
    prioritiesAndBags: "الأولويات والأكياس",
    distributionByPriority: "التوزيع حسب الأولوية مع عدد الأكياس",
    monthlyTrends: "الاتجاهات الشهرية",
    transfusionByMonth: "عمليات النقل حسب الشهر مع التقدم",
    vsLastWeek: "مقابل الأسبوع الماضي",
    vsLastPeriod: "مقابل الفترة السابقة",
    bagPerTransfusion: "أكياس لكل نقل",
    range: "النطاق",
    newPatients: "مرضى جدد",
    patients: "مرضى",
    completed: "مكتملة",
    data: "البيانات",
    chart: "مخطط",
    no: "لا توجد",

    // Transfusions
    noTransfusionScheduled: "لا توجد نقل مجدولة",
    noBloodTransfusionsScheduled: "لا توجد عمليات نقل دم مجدولة لغد",
    noBloodTransfusionsScheduledToday: "لا توجد عمليات نقل دم مجدولة لليوم",
    print: "طباعة",
    dailyTransfusionReport: "التقرير اليومي للنقل",
    transfusionSchedule: "جدول نقل الدم",
    confirmDeleteTransfusion: "هل أنت متأكد من رغبتك في حذف هذه النقل؟",
    deleted: "تم الحذف",
    transfusionDeleted: "تم حذف النقل بنجاح",
    deletionFailed: "فشل حذف النقل",

    // Messages
    success: "نجح",
    error: "خطأ",
    warning: "تحذير",
    info: "معلومات",
    confirmDelete: "هل أنت متأكد من حذف هذا؟",
    confirmLogout: "هل أنت متأكد من تسجيل الخروج؟",
    invalidInput: "إدخال غير صالح",
    required: "هذا الحقل مطلوب",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Load language from localStorage
    const savedSettings = localStorage.getItem("systemSettings")
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      if (settings.language) {
        setLanguage(settings.language)
        updateLanguageUI(settings.language)
      }
    }

    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language)
      updateLanguageUI(event.detail.language)
    }

    window.addEventListener("languageChanged", handleLanguageChange as EventListener)
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange as EventListener)
    }
  }, [])

  const updateLanguageUI = (lang: Language) => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    document.documentElement.className = lang === "ar" ? "rtl" : "ltr"
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
