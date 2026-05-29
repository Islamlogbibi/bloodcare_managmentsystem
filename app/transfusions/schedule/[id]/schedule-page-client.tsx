"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransfusionScheduleForm } from "@/components/transfusion-schedule-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface ScheduleTransfusionPageClientProps {
  patient: any
}

export default function ScheduleTransfusionPageClient({ patient }: ScheduleTransfusionPageClientProps) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center space-x-4">
          <Link href="/patients">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("back")}
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{t("scheduleTransfusion")}</h1>
            <p className="text-gray-600 mt-1">
              {t("scheduleTransfusionForPatient")}
              {patient.firstName} {patient.lastName}
            </p>
          </div>
        </div>

        <Card className="max-w-2xl border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">{t("transfusionDetails")}</CardTitle>
            <CardDescription>{t("updateTransfusionDetailsDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <TransfusionScheduleForm patient={patient} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
