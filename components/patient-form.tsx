"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save, User, Phone, Heart } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { createPatient, updatePatient } from "@/app/lib/actions"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/contexts/language-context"

interface PatientFormProps {
  patient?: any
  isEditing?: boolean
}

export function PatientForm({ patient, isEditing = false }: PatientFormProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [admissionDate, setAdmissionDate] = useState<Date | undefined>(
    patient?.admissionDate ? new Date(patient.admissionDate) : undefined,
  )
  const [lastTransfusionDate, setLastTransfusionDate] = useState<Date | undefined>(
    patient?.lastTransfusionDate ? new Date(patient.lastTransfusionDate) : undefined,
  )

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    const gender = formData.get("gender") as string
    const patientCategory = formData.get("patientCategory") as string
    const bloodType = formData.get("bloodType") as string
    const ph = formData.get("ph") as string
    if (!gender) {
      toast({
        title: t("validationError"),
        description: t("selectGender"),
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }
    if (!patientCategory) {
      toast({
        title: t("validationError"),
        description: t("selectCategory"),
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }
    if (!bloodType) {
      toast({
        title: t("validationError"),
        description: t("selectBloodType"),
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }
    if (!ph) {
      toast({
        title: t("validationError"),
        description: t("selectPhenotype"),
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }
    try {
      const patientData = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        dateOfBirth: formData.get("dateOfBirth") as string,
        gender: formData.get("gender") as string,
        bloodType: formData.get("bloodType") as string,
        ph: formData.get("ph") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
        emergencyContact: formData.get("emergencyContact") as string,
        emergencyPhone: formData.get("emergencyPhone") as string,
        medicalHistory: formData.get("medicalHistory") as string,
        admissionDate: admissionDate?.toISOString(),
        lastTransfusionDate: lastTransfusionDate?.toISOString(),
        weight: Number.parseFloat(formData.get("weight") as string),
        height: Number.parseFloat(formData.get("height") as string),
        hemoglobinLevel: Number.parseFloat(formData.get("hemoglobinLevel") as string),
        hasF: formData.get("hasF") === "on",
        hasC: formData.get("hasC") === "on",
        hasL: formData.get("hasL") === "on",
        patientCategory: formData.get("patientCategory") as string,
        pathologie: formData.get("pathologie") as string,
        alloImmunisationStatus: formData.get("alloImmunisationStatus") as string,
      }

      if (isEditing && patient) {
        await updatePatient(patient._id, patientData)
        toast({
          title: t("patientUpdated"),
          description: t("patientUpdatedMessage"),
        })
      } else {
        await createPatient(patientData)
        toast({
          title: t("patientAdded"),
          description: t("patientAddedMessage"),
        })
      }

      router.push("/patients")
    } catch (error) {
      toast({
        title: t("error"),
        description: t("failedToSavePatient"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={onSubmit} className="space-y-8">
      {/* Personal Information */}
      <Card className="border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-gray-900">
            <User className="mr-2 h-5 w-5 text-red-600" />
            {t("patientInformation")}
          </CardTitle>
          <CardDescription>{t("editPersonalInfo")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                {t("firstName")} *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                defaultValue={patient?.firstName}
                required
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                {t("lastName")} *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                defaultValue={patient?.lastName}
                required
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                {t("dateOfBirth")}
              </Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                defaultValue={patient?.dateOfBirth}
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                {t("gender")} *
              </Label>
              <Select name="gender" defaultValue={patient?.gender}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder={t("selectGender")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t("male")}</SelectItem>
                  <SelectItem value="female">{t("female")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-gray-900">
            <Phone className="mr-2 h-5 w-5 text-blue-600" />
            {t("contactInformation")}
          </CardTitle>
          <CardDescription>{t("contactDetailsDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                {t("phone")}
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={patient?.phone}
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                {t("email")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={patient?.email}
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium text-gray-700">
              {t("address")}
            </Label>
            <Textarea
              id="address"
              name="address"
              defaultValue={patient?.address}
              rows={3}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContact" className="text-sm font-medium text-gray-700">
                {t("emergencyContact")}
              </Label>
              <Input
                id="emergencyContact"
                name="emergencyContact"
                defaultValue={patient?.emergencyContact}
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyPhone" className="text-sm font-medium text-gray-700">
                {t("emergencyPhone")}
              </Label>
              <Input
                id="emergencyPhone"
                name="emergencyPhone"
                type="tel"
                defaultValue={patient?.emergencyPhone}
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card className="border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-gray-900">
            <Heart className="mr-2 h-5 w-5 text-red-600" />
            {t("medicalInformation")}
          </CardTitle>
          <CardDescription>{t("medicalDetailsDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bloodType" className="text-sm font-medium text-gray-700">
                {t("bloodType")} *
              </Label>
              <Select name="bloodType" defaultValue={patient?.bloodType}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder={t("selectBloodType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+ {t("positive")}</SelectItem>
                  <SelectItem value="A-">A- {t("negative")}</SelectItem>
                  <SelectItem value="B+">B+ {t("positive")}</SelectItem>
                  <SelectItem value="B-">B- {t("negative")}</SelectItem>
                  <SelectItem value="AB+">AB+ {t("positive")}</SelectItem>
                  <SelectItem value="AB-">AB- {t("negative")}</SelectItem>
                  <SelectItem value="O+">O+ {t("positive")}</SelectItem>
                  <SelectItem value="O-">O- {t("negative")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ph" className="text-sm font-medium text-gray-700">
                {t("phenotype")} *
              </Label>
              <Select name="ph" defaultValue={patient?.ph}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder={t("selectPhenotype")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cceek+">cc ee KEL (+)</SelectItem>
                  <SelectItem value="cceek-">cc ee KEL (-)</SelectItem>
                  <SelectItem value="CcEEk+">Cc EE KEL (+)</SelectItem>
                  <SelectItem value="CcEEk-">Cc EE KEL (-)</SelectItem>
                  <SelectItem value="Cceek+">Cc ee KEL (+)</SelectItem>
                  <SelectItem value="Cceek-">Cc ee KEL (-)</SelectItem>
                  <SelectItem value="CcEek+">Cc Ee KEL (+)</SelectItem>
                  <SelectItem value="CcEek-">Cc Ee KEL (-)</SelectItem>
                  <SelectItem value="CCEEk+">CC EE KEL (+)</SelectItem>
                  <SelectItem value="CCEEk-">CC EE KEL (-)</SelectItem>
                  <SelectItem value="CCeek+">CC ee KEL (+)</SelectItem>
                  <SelectItem value="CCeek-">CC ee KEL (-)</SelectItem>
                  <SelectItem value="ccEEk+">cc EE KEL (+)</SelectItem>
                  <SelectItem value="ccEEk-">cc EE KEL (-)</SelectItem>
                  <SelectItem value="CCEek+">CC Ee KEL (+)</SelectItem>
                  <SelectItem value="CCEek-">CC Ee KEL (-)</SelectItem>
                  <SelectItem value="ccEek+">cc Ee KEL (+)</SelectItem>
                  <SelectItem value="ccEek-">cc Ee KEL (-)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
                {t("weight")}
              </Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                step="0.1"
                defaultValue={patient?.weight}
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height" className="text-sm font-medium text-gray-700">
                {t("height")}
              </Label>
              <Input
                id="height"
                name="height"
                type="number"
                step="0.1"
                defaultValue={patient?.height}
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hemoglobinLevel" className="text-sm font-medium text-gray-700">
              {t("hemoglobinLevel")}
            </Label>
            <Input
              id="hemoglobinLevel"
              name="hemoglobinLevel"
              type="number"
              step="0.1"
              defaultValue={patient?.hemoglobinLevel}
              className="w-full md:w-1/3 border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">{t("admissionDate")}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50",
                      !admissionDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {admissionDate ? format(admissionDate, "PPP", { locale: fr }) : t("selectAdmissionDate")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={admissionDate} onSelect={setAdmissionDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">{t("lastTransfusionDate")}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50",
                      !lastTransfusionDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {lastTransfusionDate
                      ? format(lastTransfusionDate, "PPP", { locale: fr })
                      : t("selectLastTransfusionDate")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={lastTransfusionDate} onSelect={setLastTransfusionDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* New F, C, L checkboxes */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">{t("patientAttributes")}</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="hasF" name="hasF" defaultChecked={patient?.hasF} />
                <Label htmlFor="hasF" className="text-sm font-medium">
                  F
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="hasC" name="hasC" defaultChecked={patient?.hasC} />
                <Label htmlFor="hasC" className="text-sm font-medium">
                  C
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="hasL" name="hasL" defaultChecked={patient?.hasL} />
                <Label htmlFor="hasL" className="text-sm font-medium">
                  L
                </Label>
              </div>
            </div>
          </div>

          {/* Patient Category */}
          <div className="space-y-2">
            <Label htmlFor="patientCategory" className="text-sm font-medium text-gray-700">
              {t("patientCategory")} *
            </Label>
            {/* Hidden input for native form validation */}
            <input type="text" name="patientCategory" value={patient?.patientCategory || ""} required readOnly hidden />
            <Select
              name="patientCategory"
              defaultValue={patient?.patientCategory}
              onValueChange={(value) => {
                // Update the hidden input when select changes
                const hiddenInput = document.querySelector<HTMLInputElement>('input[name="patientCategory"]')
                if (hiddenInput) hiddenInput.value = value
              }}
            >
              <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                <SelectValue placeholder={t("selectPatientCategory")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HyperRegime">{t("hyperRegime")}</SelectItem>
                <SelectItem value="PolyTransfuses">{t("polyTransfused")}</SelectItem>
                <SelectItem value="Echanges">{t("exchanges")}</SelectItem>
                <SelectItem value="PDV">{t("pdv")}</SelectItem>
                <SelectItem value="Echanges Occasionnels">{t("occasionalExchanges")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pathologie" className="text-sm font-medium text-gray-700">
                {t("pathology")}
              </Label>
              <Textarea
                id="pathologie"
                name="pathologie"
                defaultValue={patient?.pathologie}
                rows={3}
                placeholder={t("pathologyPlaceholder")}
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alloImmunisationStatus" className="text-sm font-medium text-gray-700">
                {t("alloImmunisationStatus")}
              </Label>
              <Textarea
                id="alloImmunisationStatus"
                name="alloImmunisationStatus"
                defaultValue={patient?.alloImmunisationStatus}
                rows={3}
                placeholder={t("alloImmunisationStatusPlaceholder")}
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalHistory" className="text-sm font-medium text-gray-700">
              {t("medicalHistoryAndNotes")}
            </Label>
            <Textarea
              id="medicalHistory"
              name="medicalHistory"
              defaultValue={patient?.medicalHistory}
              rows={4}
              placeholder={t("medicalHistoryPlaceholder")}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4 pt-6">
        <Button type="button" variant="outline" onClick={() => router.back()} className="border-gray-300">
          {t("cancel")}
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700">
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? t("saving") : isEditing ? t("updatePatient") : t("savePatient")}
        </Button>
      </div>
    </form>
  )
}
