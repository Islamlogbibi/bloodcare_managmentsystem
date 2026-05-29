"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PatientForm } from "@/components/edit-form"
import { useLanguage } from "@/contexts/language-context"

interface EditPatientPageClientProps {
  transfusion: any
}

export default function EditPatientPageClient({ transfusion }: EditPatientPageClientProps) {
  const { t } = useLanguage()

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t("editPatient")}</h2>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>{t("transfusionDetails")}</CardTitle>
          <CardDescription>{t("updateTransfusionDetailsDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <PatientForm patient={transfusion} isEditing={true} />
        </CardContent>
      </Card>
    </div>
  )
}
