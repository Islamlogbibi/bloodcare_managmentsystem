"use client"

import { TodayTransfusionList } from "@/components/today-transfusion-list"
import { useLanguage } from "@/contexts/language-context"

interface TransfusionsClientProps {
  transfusions: any[]
  page: "today" | "tomorrow"
}

const transfusionTitles = {
  en: {
    today: {
      title: "Today's Transfusions",
      description: "Manage and track blood transfusions scheduled for today",
      loading: "Loading transfusions...",
    },
    tomorrow: {
      title: "Tomorrow's Transfusions",
      description: "Manage and track blood transfusions scheduled for tomorrow",
      loading: "Loading transfusions...",
    },
  },
  fr: {
    today: {
      title: "Les transfusions d'aujourd'hui",
      description: "Gérer et suivre les transfusions sanguines programmées aujourd'hui",
      loading: "Chargement des transfusions...",
    },
    tomorrow: {
      title: "Les transfusions de demain",
      description: "Gérer et suivre les transfusions sanguines programmées demain",
      loading: "Chargement des transfusions...",
    },
  },
  ar: {
    today: {
      title: "نقل الدم اليوم",
      description: "إدارة ومتابعة نقل الدم المجدول لليوم",
      loading: "جاري تحميل نقل الدم...",
    },
    tomorrow: {
      title: "نقل الدم غدًا",
      description: "إدارة ومتابعة نقل الدم المجدول لغدًا",
      loading: "جاري تحميل نقل الدم...",
    },
  },
}

export function TransfusionsClient({ transfusions, page }: TransfusionsClientProps) {
  const { language } = useLanguage()
  const content = transfusionTitles[language as keyof typeof transfusionTitles][page]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
        <p className="text-gray-600">{content.description}</p>
      </div>

      <div>
        <TodayTransfusionList transfusions={transfusions} />
      </div>
    </div>
  )
}
