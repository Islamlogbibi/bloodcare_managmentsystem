import { Suspense } from "react"
import { TomorrowClient } from "./tomorrow-client"
import { getTomorrowTransfusions } from "@/app/lib/actions"

export default async function TomorrowTransfusionsPage() {
  const transfusions = await getTomorrowTransfusions()

  const now = new Date()

  const algeriaTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Algiers",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(now)

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50/50">
          <div className="flex-1 space-y-6 p-6">Loading...</div>
        </div>
      }
    >
      <TomorrowClient transfusions={transfusions} algeriaTime={algeriaTime} />
    </Suspense>
  )
}
