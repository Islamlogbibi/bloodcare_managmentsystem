import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calendar, Droplets, Users, Activity, TestTube, Heart } from "lucide-react"
import { getAnalyticsStats } from "@/app/lib/actions"
import type { DateRange } from "react-day-picker"

interface AnalyticsStatsProps {
  dateRange: DateRange | undefined
  language?: "en" | "fr" | "ar"
}

const statsLabels = {
  en: {
    totalTransfusions: "Total Transfusions",
    numberOfBags: "Number of Bags",
    avgHemoglobin: "Average Hemoglobin",
    criticalCases: "Critical Cases",
    activePatients: "Active Patients",
    transfusionsToday: "Transfusions Today",
    rarePhenotypes: "Rare Phenotypes",
    dominantBloodType: "Dominant Blood Type",
    vsLastPeriod: "vs last period",
    bagPerTransfusion: "bags per transfusion",
    completed: "completed",
    range: "Range",
    patients: "patients",
    newPatients: "new patients",
  },
  fr: {
    totalTransfusions: "Total des Transfusions",
    numberOfBags: "Nombre de Poches",
    avgHemoglobin: "Hémoglobine Moyenne",
    criticalCases: "Cas Critiques",
    activePatients: "Patients Actifs",
    transfusionsToday: "Transfusions Aujourd'hui",
    rarePhenotypes: "Phénotypes Rares",
    dominantBloodType: "Groupe Sanguin Dominant",
    vsLastPeriod: "vs période précédente",
    bagPerTransfusion: "poches par transfusion",
    completed: "complétées",
    range: "Plage",
    patients: "patients",
    newPatients: "nouveaux patients",
  },
  ar: {
    totalTransfusions: "إجمالي عمليات النقل",
    numberOfBags: "عدد الأكياس",
    avgHemoglobin: "متوسط الهيموجلوبين",
    criticalCases: "حالات حرجة",
    activePatients: "المرضى النشطون",
    transfusionsToday: "عمليات النقل اليوم",
    rarePhenotypes: "الأنماط الظاهرية النادرة",
    dominantBloodType: "فصيلة الدم السائدة",
    vsLastPeriod: "مقابل الفترة السابقة",
    bagPerTransfusion: "أكياس لكل نقل",
    completed: "مكتملة",
    range: "النطاق",
    patients: "مرضى",
    newPatients: "مرضى جدد",
  },
}

export async function AnalyticsStats({ dateRange, language = "en" }: AnalyticsStatsProps) {
  const stats = await getAnalyticsStats(dateRange)
  const labels = statsLabels[language as keyof typeof statsLabels]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">{labels.totalTransfusions}</CardTitle>
          <Activity className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.totalTransfusions}</div>
          <div className="flex items-center text-xs text-green-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            {stats.transfusionTrend > 0 ? "+" : ""}
            {stats.transfusionTrend}% {labels.vsLastPeriod}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">{labels.numberOfBags}</CardTitle>
          <Droplets className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.totalBloodUnits}</div>
          <div className="flex items-center text-xs text-blue-600">
            <Activity className="h-3 w-3 mr-1" />
            {stats.avgBloodUnitsPerTransfusion.toFixed(1)} {labels.bagPerTransfusion}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">{labels.avgHemoglobin}</CardTitle>
          <Heart className="h-4 w-4 text-pink-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.avgHemoglobin.toFixed(1)} g/dL</div>
          <div className="flex items-center text-xs text-gray-600">
            <TestTube className="h-3 w-3 mr-1" />
            {labels.range}: {stats.minHemoglobin}-{stats.maxHemoglobin} g/dL
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">{labels.criticalCases}</CardTitle>
          <Activity className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.criticalCases}</div>
          <div className="flex items-center text-xs text-yellow-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            {stats.criticalCasesTrend > 0 ? "+" : ""}
            {stats.criticalCasesTrend} {labels.vsLastPeriod}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">{labels.activePatients}</CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.activePatients}</div>
          <div className="flex items-center text-xs text-green-600">
            <TrendingUp className="h-3 w-3 mr-1" />+{stats.newPatientsThisPeriod} {labels.newPatients}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">{labels.transfusionsToday}</CardTitle>
          <Calendar className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.todayTransfusions}</div>
          <div className="flex items-center text-xs text-blue-600">
            <Activity className="h-3 w-3 mr-1" />
            {stats.completedToday} {labels.completed}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">{labels.rarePhenotypes}</CardTitle>
          <TestTube className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.rarePhenotypes}</div>
          <div className="flex items-center text-xs text-emerald-600">
            <Users className="h-3 w-3 mr-1" />
            {stats.rarePhenotypePercentage.toFixed(1)}% {language === "ar" ? "من المرضى" : "des patients"}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">{labels.dominantBloodType}</CardTitle>
          <Droplets className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.dominantBloodType}</div>
          <div className="flex items-center text-xs text-gray-600">
            <Users className="h-3 w-3 mr-1" />
            {stats.dominantBloodTypePercentage}% {language === "ar" ? "من المرضى" : "des patients"}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
