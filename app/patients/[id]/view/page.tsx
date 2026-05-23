import { getPatientById } from "@/app/lib/actions"
import { notFound } from "next/navigation"
import PatientViewClient from "./patient-view-client"

interface ViewPatientPageProps {
  params: Promise<{ id: string }>
}

export default async function ViewPatientPage({ params }: ViewPatientPageProps) {
  const { id } = await params
  const patient = await getPatientById(id)

  if (!patient) {
    notFound()
  }

  return <PatientViewClient patient={patient} />
}
