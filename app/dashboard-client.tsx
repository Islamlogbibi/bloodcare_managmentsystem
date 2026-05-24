"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock, Plus, Activity, AlertTriangle, BarChart3 } from "lucide-react"
import Link from "next/link"
import { StatsCard } from "@/components/stats-card"
import { useLanguage } from "@/contexts/language-context"
import type { PatientStats } from "./lib/actions"

interface DashboardClientProps {
  stats: PatientStats
}

export function DashboardClient({ stats }: DashboardClientProps) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="animate-slide-up">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">{t("dashboard")}</h1>
            <p className="text-gray-600 mt-1">{t("patients")}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/patients/new">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 focus-ring transition-all duration-200 hover:shadow-lg"
                aria-label={t("add")}
              >
                <Plus className="mr-2 h-5 w-5" />
                {t("add")}
              </Button>
            </Link>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in">
          <StatsCard
            title={t("totalPatients")}
            value={stats.totalPatients}
            icon={Users}
            description={t("totalPatients")}
          />
          <StatsCard
            title={t("todayTransfusions")}
            value={stats.todayTransfusions}
            icon={Clock}
            description={t("todayTransfusions")}
            trend={stats.urgentCases + " " + t("urgentCases")}
            variant="warning"
          />
          <StatsCard
            title={t("tomorrowTransfusions")}
            value={stats.tomorrowTransfusions}
            icon={Calendar}
            description={t("tomorrowTransfusions")}
            trend={t("success")}
            variant="success"
          />
          <StatsCard
            title={t("urgentCases")}
            value={stats.urgentCases}
            icon={AlertTriangle}
            description={t("urgentCases")}
            trend=""
            variant="destructive"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-slide-up">
          <Card className="border-0 shadow-md card-hover glass-effect">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-gray-900">
                <Users className="mr-3 h-5 w-5 text-red-600" />
                {t("patients")}
              </CardTitle>
              <CardDescription>{t("patients")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/patients" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-gray-200 hover:bg-gray-50 focus-ring transition-all duration-200"
                  aria-label={t("view")}
                >
                  <Users className="mr-3 h-4 w-4" />
                  {t("view")}
                </Button>
              </Link>
              <Link href="/patients/new" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-gray-200 hover:bg-gray-50 focus-ring transition-all duration-200"
                  aria-label={t("add")}
                >
                  <Plus className="mr-3 h-4 w-4" />
                  {t("add")}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md card-hover glass-effect">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-gray-900">
                <Calendar className="mr-3 h-5 w-5 text-blue-600" />
                {t("scheduleTransfusion")}
              </CardTitle>
              <CardDescription>{t("scheduleTransfusion")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/transfusions/today" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-gray-200 hover:bg-gray-50 focus-ring transition-all duration-200"
                  aria-label={t("todayTransfusions")}
                >
                  <Clock className="mr-3 h-4 w-4" />
                  {t("todayTransfusions")}
                </Button>
              </Link>
              <Link href="/transfusions/tomorrow" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-gray-200 hover:bg-gray-50 focus-ring transition-all duration-200"
                  aria-label={t("tomorrowTransfusions")}
                >
                  <Calendar className="mr-3 h-4 w-4" />
                  {t("tomorrowTransfusions")}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md card-hover glass-effect">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-gray-900">
                <BarChart3 className="mr-3 h-5 w-5 text-green-600" />
                {t("analytics")}
              </CardTitle>
              <CardDescription>{t("analytics")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/analytics" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-gray-200 hover:bg-gray-50 focus-ring transition-all duration-200"
                  aria-label={t("analytics")}
                >
                  <Activity className="mr-3 h-4 w-4" />
                  {t("analytics")}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 animate-slide-up">
          <Card className="border-0 shadow-md card-hover">
            <CardHeader>
              <CardTitle className="text-gray-900">{t("schedule")}</CardTitle>
              <CardDescription>{t("schedule")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3" role="group" aria-label={t("schedule")}>
                <Link href="/patients/new">
                  <Button
                    variant="outline"
                    className="w-full h-16 flex-col space-y-1 border-gray-200 hover:bg-gray-50 focus-ring transition-all duration-200 hover:shadow-md"
                    aria-label={t("add")}
                  >
                    <Plus className="h-5 w-5" />
                    <span className="text-xs">{t("add")}</span>
                  </Button>
                </Link>
                <Link href="/transfusions/schedule">
                  <Button
                    variant="outline"
                    className="w-full h-16 flex-col space-y-1 border-gray-200 hover:bg-gray-50 focus-ring transition-all duration-200 hover:shadow-md"
                    aria-label={t("schedule")}
                  >
                    <Calendar className="h-5 w-5" />
                    <span className="text-xs">{t("schedule")}</span>
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button
                    variant="outline"
                    className="w-full h-16 flex-col space-y-1 border-gray-200 hover:bg-gray-50 focus-ring transition-all duration-200 hover:shadow-md"
                    aria-label={t("analytics")}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span className="text-xs">{t("analytics")}</span>
                  </Button>
                </Link>
                <Link href="/patients">
                  <Button
                    variant="outline"
                    className="w-full h-16 flex-col space-y-1 border-gray-200 hover:bg-gray-50 focus-ring transition-all duration-200 hover:shadow-md"
                    aria-label={t("patients")}
                  >
                    <Users className="h-5 w-5" />
                    <span className="text-xs">{t("patients")}</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
