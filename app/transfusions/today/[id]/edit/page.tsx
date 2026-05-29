import { getTransfusionById } from "@/app/lib/actions"
import { notFound } from "next/navigation"
import EditPatientPageClient from "./edit-page-client"

interface EditPatientPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPatientPage({ params }: EditPatientPageProps) {
  const { id } = await params
  const transfusion = await getTransfusionById(id)

  if (!transfusion) {
    notFound()
  }

  return <EditPatientPageClient transfusion={transfusion} />
}
