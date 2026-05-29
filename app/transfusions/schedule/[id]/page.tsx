import { getPatientById } from "@/app/lib/actions"
import { notFound } from "next/navigation"
import ScheduleTransfusionPageClient from "./schedule-page-client"

interface ScheduleTransfusionPageProps {
  params: Promise<{ id: string }>
}

export default async function ScheduleTransfusionPage({ params }: ScheduleTransfusionPageProps) {
  const { id } = await params
  const patient = await getPatientById(id)

  if (!patient) {
    notFound()
  }

  return <ScheduleTransfusionPageClient patient={patient} />
}
