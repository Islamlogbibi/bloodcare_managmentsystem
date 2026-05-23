export const dynamic = "force-dynamic";

import { Suspense } from "react"
import { TransfusionsClient } from "../transfusions-client"
import { getTodayTransfusions } from "@/app/lib/actions"

export default async function TodayTransfusionsPage() {
  const transfusions = await getTodayTransfusions()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransfusionsClient transfusions={transfusions} page="today" />
    </Suspense>
  )
}
