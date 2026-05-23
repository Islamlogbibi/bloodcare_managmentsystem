"use client"

import { Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TomorrowTransfusionList } from "@/components/tomorrow-transfusion-list"
import { useLanguage } from "@/contexts/language-context"

interface TomorrowClientProps {
  transfusions: any[]
  algeriaTime: string
}

const tomorrowContent = {
  en: {
    title: "Tomorrow's Transfusions",
    cardTitle: "Tomorrow's Schedule",
    cardDescription: "Patients scheduled to receive blood transfusions tomorrow",
  },
  fr: {
    title: "Les transfusions de demain",
    cardTitle: "Programme de demain",
    cardDescription: "Patients devant recevoir des transfusions sanguines demain",
  },
  ar: {
    title: "نقل الدم غدًا",
    cardTitle: "جدول غدًا",
    cardDescription: "المرضى المجدول لهم تلقي نقل الدم غدًا",
  },
}

export function TomorrowClient({ transfusions, algeriaTime }: TomorrowClientProps) {
  const { language } = useLanguage()
  const content = tomorrowContent[language as keyof typeof tomorrowContent]

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{content.title}</h1>
            <p className="text-gray-600 mt-1">{algeriaTime}</p>
          </div>
        </div>

        <Card className="border-0 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-gray-900">
              <Calendar className="mr-2 h-5 w-5 text-green-600" />
              {content.cardTitle}
            </CardTitle>
            <CardDescription>{content.cardDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <TomorrowTransfusionList transfusions={transfusions} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
