import { Suspense } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getPatientStats } from "./lib/actions"
import { DashboardClient } from "./dashboard-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Blood transfusion management dashboard with patient statistics and quick actions",
}

async function DashboardStats() {
  const stats = await getPatientStats()
  return <DashboardClient stats={stats} />
}

export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="flex-1 space-y-6 p-4 md:p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <DashboardStats />
    </Suspense>
  )
}
