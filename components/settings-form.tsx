"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, User, Bell, Database, Globe } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

// Additional settings translations
const settingsTranslations = {
  en: {
    profileSettings: "Profile Settings",
    updatePersonalInfo: "Update your personal information",
    fullName: "Full Name",
    department: "Department",
    saveProfile: "Save Profile",
    saving: "Saving...",
    notificationSettings: "Notification Settings",
    configureNotifications: "Configure your notification preferences",
    receiveEmailAlerts: "Receive email alerts for important events",
    urgentCaseAlerts: "Urgent Case Alerts",
    getNotifiedEmergency: "Get notified of emergency transfusions",
    dailyReports: "Daily Reports",
    receiveDailySummary: "Receive daily summary reports",
    systemMaintenance: "System Maintenance",
    notificationsAboutSystem: "Notifications about system updates",
    systemSettings: "System Settings",
    configureSystem: "Configure system preferences",
    timezone: "Timezone",
    dateFormat: "Date Format",
    autoSave: "Auto-save",
    automaticallySave: "Automatically save changes",
    selectLanguage: "Select Language",
    english: "English",
    french: "Français",
    arabic: "العربية",
  },
  fr: {
    profileSettings: "Paramètres du Profil",
    updatePersonalInfo: "Mettre à jour vos informations personnelles",
    fullName: "Nom Complet",
    department: "Département",
    saveProfile: "Enregistrer le Profil",
    saving: "Enregistrement...",
    notificationSettings: "Paramètres de Notification",
    configureNotifications: "Configurez vos préférences de notification",
    receiveEmailAlerts: "Recevoir des alertes par email pour les événements importants",
    urgentCaseAlerts: "Alertes de Cas Urgents",
    getNotifiedEmergency: "Être notifié des transfusions d'urgence",
    dailyReports: "Rapports Quotidiens",
    receiveDailySummary: "Recevoir des rapports quotidiens",
    systemMaintenance: "Maintenance du Système",
    notificationsAboutSystem: "Notifications concernant les mises à jour du système",
    systemSettings: "Paramètres du Système",
    configureSystem: "Configurer les préférences du système",
    timezone: "Fuseau Horaire",
    dateFormat: "Format de Date",
    autoSave: "Sauvegarde Automatique",
    automaticallySave: "Enregistrer automatiquement les modifications",
    selectLanguage: "Sélectionner la Langue",
    english: "English",
    french: "Français",
    arabic: "العربية",
  },
  ar: {
    profileSettings: "إعدادات الملف الشخصي",
    updatePersonalInfo: "تحديث معلوماتك الشخصية",
    fullName: "الاسم الكامل",
    department: "القسم",
    saveProfile: "حفظ الملف الشخصي",
    saving: "جاري الحفظ...",
    notificationSettings: "إعدادات الإخطارات",
    configureNotifications: "قم بتكوين تفضيلات الإخطارات الخاصة بك",
    receiveEmailAlerts: "تلقي تنبيهات البريد الإلكتروني للأحداث المهمة",
    urgentCaseAlerts: "تنبيهات الحالات الطارئة",
    getNotifiedEmergency: "تلقي إشعارات نقل الدم الطارئ",
    dailyReports: "التقارير اليومية",
    receiveDailySummary: "استقبال التقارير اليومية",
    systemMaintenance: "صيانة النظام",
    notificationsAboutSystem: "إشعارات حول تحديثات النظام",
    systemSettings: "إعدادات النظام",
    configureSystem: "قم بتكوين تفضيلات النظام",
    timezone: "المنطقة الزمنية",
    dateFormat: "صيغة التاريخ",
    autoSave: "الحفظ التلقائي",
    automaticallySave: "حفظ التغييرات تلقائيًا",
    selectLanguage: "اختر اللغة",
    english: "English",
    french: "Français",
    arabic: "العربية",
  },
}

export function SettingsForm() {
  const { language, setLanguage, t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "Pr. brouk hacene",
    email: "brouk.hacene@hospital.com",
    phone: "0792299343",
    department: "hemobiology",
  })

  const currentLang = settingsTranslations[language as keyof typeof settingsTranslations]

  useEffect(() => {
    // Load saved settings from localStorage if available
    const savedProfileData = localStorage.getItem("profileData")
    

    if (savedProfileData) {
      setProfileData(JSON.parse(savedProfileData))
    }

    
  }, [])

  const handleProfileSave = async () => {
    setIsLoading(true)
    try {
      // Save to localStorage
      localStorage.setItem("profileData", JSON.stringify(profileData))

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Trigger a custom event to notify header component
      window.dispatchEvent(new CustomEvent("profileUpdated", { detail: profileData }))

      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as "en" | "fr" | "ar")
    // Save to localStorage
    const settings = JSON.parse(localStorage.getItem("systemSettings") || "{}")
    settings.language = newLanguage
    localStorage.setItem("systemSettings", JSON.stringify(settings))
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: { language: newLanguage } }))
  }

  

  

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Profile Settings */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <User className="mr-2 h-5 w-5 text-blue-600" />
            {currentLang.profileSettings}
          </CardTitle>
          <CardDescription>{currentLang.updatePersonalInfo}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">{currentLang.fullName}</Label>
            <Input
              id="fullName"
              value={profileData.fullName}
              onChange={(e) => setProfileData((prev) => ({ ...prev, fullName: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t("phone")}</Label>
            <Input
              id="phone"
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">{currentLang.department}</Label>
            <Select
              value={profileData.department}
              onValueChange={(value) => setProfileData((prev) => ({ ...prev, department: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hematology">Hemobiology</SelectItem>
                <SelectItem value="emergency">Ergance</SelectItem>
                <SelectItem value="surgery">Surgery</SelectItem>
                <SelectItem value="administration">Administration</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleProfileSave} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? currentLang.saving : currentLang.saveProfile}
          </Button>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Globe className="mr-2 h-5 w-5 text-blue-600" />
            {currentLang.selectLanguage}
          </CardTitle>
          <CardDescription>{t("language")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">{t("selectLanguage")}</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{currentLang.english}</SelectItem>
                <SelectItem value="fr">{currentLang.french}</SelectItem>
                <SelectItem value="ar">{currentLang.arabic}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
            <p>
              {language === "en"
                ? "Language changed. The interface will update to reflect your selection."
                : language === "fr"
                  ? "Langue modifiée. L'interface sera mise à jour pour refléter votre sélection."
                  : "تم تغيير اللغة. سيتم تحديث الواجهة لتعكس اختيارك."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
