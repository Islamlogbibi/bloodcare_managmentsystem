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

          {/* Contact Information */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Phone className="mr-2 h-5 w-5 text-green-600" />
                {t("contactInformation")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("phoneNumber")}</p>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">{patient.phone || t("notAvailable")}</p>
                </div>
              </div>
              {patient.email && (
                <div>
                  <p className="text-sm font-medium text-gray-500">{t("email")}</p>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900">{patient.email}</p>
                  </div>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-500">{t("address")}</p>
                <p className="text-gray-900">{patient.address || t("notProvided")}</p>
              </div>
              {patient.emergencyContact && (
                <div>
                  <p className="text-sm font-medium text-gray-500">{t("emergencyContact")}</p>
                  <p className="text-gray-900">{patient.emergencyContact}</p>
                  <p className="text-sm text-gray-600">{patient.emergencyPhone || t("notAvailable")}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Heart className="mr-2 h-5 w-5 text-red-600" />
                {t("medicalInformation")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">{t("bloodType")}</p>
                  <Badge className="bg-red-100 text-red-800 font-semibold">{patient.bloodType || t("notAvailable")}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t("ph")}</p>
                  <Badge className="bg-red-100 text-red-800 font-semibold">{patient.ph || t("notAvailable")}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">{t("weight")}</p>
                  <p className="text-gray-900">{patient.weight ? `${patient.weight} kg` : t("notAvailable")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t("height")}</p>
                  <p className="text-gray-900">{patient.height ? `${patient.height} cm` : t("notAvailable")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t("hemoglobinLevel")}</p>
                  <p className="text-gray-900">{patient.hemoglobinLevel ? `${patient.hemoglobinLevel} g/dL` : t("notAvailable")}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{t("medicalHistory")}</p>
                <p className="text-gray-900 text-sm">{patient.medicalHistory || t("noMedicalHistory")}</p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Medical Information - Not printed */}
          <Card className="border-0 shadow-md print:hidden">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Heart className="mr-2 h-5 w-5 text-orange-600" />
                {t("additionalMedicalInformation")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("pathology")}</p>
                <p className="text-gray-900 text-sm">{patient.pathologie || t("notProvided")}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{t("alloImmunisationStatus")}</p>
                <p className="text-gray-900 text-sm">{patient.alloImmunisationStatus || t("notProvided")}</p>
              </div>
            </CardContent>
          </Card>

          {/* Transfusion History */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Clock className="mr-2 h-5 w-5 text-purple-600" />
                {t("transfusionHistory")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("admissionDate")}</p>
                <p className="text-gray-900">
                  {patient.admissionDate ? format(new Date(patient.admissionDate), "dd MMM yyyy") : t("notAvailable")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{t("lastTransfusionDate")}</p>
                <p className="text-gray-900">
                  {patient.lastTransfusionDate
                    ? format(new Date(patient.lastTransfusionDate), "dd MMM yyyy")
                    : t("neverTransfused")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{t("status")}</p>
                <Badge variant="outline" className="border-green-200 text-green-700">
                  {t("patientActive")}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
