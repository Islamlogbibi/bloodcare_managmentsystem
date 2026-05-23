"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Calendar, Phone, Mail, User, Heart, Clock } from "lucide-react"
import Link from "next/link"
import { format, differenceInYears } from "date-fns"
import { useLanguage } from "@/contexts/language-context"

interface PatientViewClientProps {
  patient: any
}

export default function PatientViewClient({ patient }: PatientViewClientProps) {
  const { t } = useLanguage()
  const age = patient.dateOfBirth ? differenceInYears(new Date(), new Date(patient.dateOfBirth)) : "N/A"

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/patients">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("back")}
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {patient.firstName} {patient.lastName}
              </h1>
              <p className="text-gray-600 mt-1">ID Patient : {patient._id.slice(-6).toUpperCase()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link href={`/transfusions/schedule/${patient._id}`}>
              <Button variant="outline" className="border-gray-300 bg-transparent">
                <Calendar className="mr-2 h-4 w-4" />
                {t("scheduleTransfusion")}
              </Button>
            </Link>
            <Link href={`/patients/${patient._id}/edit`}>
              <Button className="bg-red-600 hover:bg-red-700">
                <Edit className="mr-2 h-4 w-4" />
                {t("editPatient")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <User className="mr-2 h-5 w-5 text-blue-600" />
                {t("patientInformation")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">{t("firstName")}</p>
                  <p className="text-gray-900">{patient.firstName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t("lastName")}</p>
                  <p className="text-gray-900">{patient.lastName}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">{t("dateOfBirth")}</p>
                  <p className="text-gray-900">
                    {patient.dateOfBirth ? format(new Date(patient.dateOfBirth), "dd MMM yyyy") : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t("age")}</p>
                  <p className="text-gray-900">{age} {t("years")}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{t("gender")}</p>
                <p className="text-gray-900 capitalize">{patient.gender === "male" ? t("male") : patient.gender === "female" ? t("female") : patient.gender}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
