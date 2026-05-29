"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { scheduleTransfusion } from "@/app/lib/actions"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

interface TransfusionScheduleFormProps {
  patient: any
}

export function TransfusionScheduleForm({ patient }: TransfusionScheduleFormProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined)

  async function onSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      const scheduledTime = formData.get("scheduledTime") as string
      const [hours, minutes] = scheduledTime.split(":")

      const combinedDateTime = new Date(scheduledDate!)
      combinedDateTime.setHours(Number.parseInt(hours), Number.parseInt(minutes))

      const transfusionData = {
        patientId: patient._id,
        scheduledDate: scheduledDate?.toISOString(),
        scheduledTime: combinedDateTime.toISOString(),
        priority: formData.get("priority") as string,
        bloodUnits: Number.parseInt(formData.get("bloodUnits") as string),
        notes: formData.get("notes") as string,
      }

      await scheduleTransfusion(transfusionData)
      toast({
        title: t("scheduleTransfusion"),
        description: t("scheduleSuccess"),
      })

      router.push("/transfusions/today")
    } catch (error) {
      toast({
        title: t("error"),
        description: t("scheduleError"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t("patient")}</Label>
          <Input value={`${patient.firstName} ${patient.lastName}`} disabled />
        </div>
        <div className="space-y-2">
          <Label>{t("bloodType")}</Label>
          <Input value={patient.bloodType} disabled />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t("selectDate")} *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !scheduledDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {scheduledDate ? format(scheduledDate, "PPP") : t("selectDate")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={scheduledDate}
                onSelect={setScheduledDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="scheduledTime">{t("selectTime")} *</Label>
          <Input id="scheduledTime" name="scheduledTime" type="time" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority">{t("priority")} *</Label>
          <Select name="priority" defaultValue="regular">
            <SelectTrigger>
              <SelectValue placeholder={t("selectType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regular">{t("regular")}</SelectItem>
              <SelectItem value="urgent">{t("urgent")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bloodUnits">{t("bloodUnits")} *</Label>
          <Input id="bloodUnits" name="bloodUnits" type="number" min="1" max="10" defaultValue="1" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">{t("notes")}</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder={t("notesPlaceholder")}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          {t("cancel")}
        </Button>
        <Button type="submit" disabled={isLoading || !scheduledDate} className="bg-red-600 hover:bg-red-700">
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? t("scheduleTransfusion") + "..." : t("scheduleTransfusion")}
        </Button>
      </div>
    </form>
  )
}
