"use client"

import { SettingsForm } from "@/components/settings-form"
import { useLanguage } from "@/contexts/language-context"

const settingsTitles = {
  en: {
    title: "Settings",
    description: "Manage your preferences and application configuration",
  },
  fr: {
    title: "Paramètres",
    description: "Gérez les préférences et la configuration de votre application",
  },
  ar: {
    title: "الإعدادات",
    description: "إدارة تفضيلاتك وتكوين التطبيق",
  },
}

export function SettingsClient() {
  const { language } = useLanguage()
  const content = settingsTitles[language as keyof typeof settingsTitles]

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{content.title}</h1>
            <p className="text-gray-600 mt-1">{content.description}</p>
          </div>
        </div>

        <SettingsForm />
      </div>
    </div>
  )
}
