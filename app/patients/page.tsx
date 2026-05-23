import { PatientsClient } from "./patients-client"

interface PatientsPageProps {
  searchParams: {
    search?: string
    category?: string
    bloodType?: string
    gender?: string
  }
}

export default function PatientsPage({ searchParams }: PatientsPageProps) {
  return <PatientsClient searchParams={searchParams} />
}
