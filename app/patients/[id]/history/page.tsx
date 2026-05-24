import { getPatientTransfusionView } from "@/app/lib/actions"
import { notFound } from "next/navigation"
import PatientHistoryClient from "./patient-history-client"

export default async function HistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const view = await getPatientTransfusionView(id)

  if (!view || !view.patient) {
    notFound()
  }

  const { patient, transfusions } = view

  return (
    <PatientHistoryClient
      patient={patient}
      transfusions={transfusions}
      patientId={id}
    />
  )
}
