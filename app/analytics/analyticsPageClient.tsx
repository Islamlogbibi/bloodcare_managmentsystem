"use client";

import { Suspense, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnalyticsStats } from "@/components/analytics-stats";
import { AnalyticsCharts } from "@/components/analytics-charts";
import { AnalyticsPageActions } from "@/components/analytics-page-actions";
import { DatePickerWithRange } from "@/components/date-range-picker";
import type { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { RefreshCw, TrendingUp, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const analyticsTitles = {
  en: {
    title: "Analytics Dashboard",
    description: "Detailed analysis of transfusions and trends",
    period: "Analysis Period",
    selectPeriod: "Select a period to see analytics",
    days7: "7 days",
    days30: "30 days",
    days90: "90 days",
    refresh: "Refresh",
  },
  fr: {
    title: "Tableau d'analyses",
    description: "Analyses détaillées des transfusions et tendances",
    period: "Période d'analyse",
    selectPeriod: "Sélectionnez une période pour voir les analyses",
    days7: "7 jours",
    days30: "30 jours",
    days90: "90 jours",
    refresh: "Actualiser",
  },
  ar: {
    title: "لوحة التحليلات",
    description: "تحليل مفصل لعمليات النقل والاتجاهات",
    period: "فترة التحليل",
    selectPeriod: "اختر فترة لعرض التحليلات",
    days7: "7 أيام",
    days30: "30 يوم",
    days90: "90 يوم",
    refresh: "تحديث",
  },
}

export default function AnalyticsPageClient() {
  const { language } = useLanguage()
  const content = analyticsTitles[language as keyof typeof analyticsTitles]
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);
  const handleQuickSelect = (days: number) => {
    setDateRange({
      from: subDays(new Date(), days),
      to: new Date(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center">
              <BarChart3 className="mr-3 h-8 w-8 text-blue-600" />
              {content.title}
            </h1>
            <p className="text-gray-600 mt-1">{content.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleQuickSelect(7)} className="text-xs">
                {content.days7}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleQuickSelect(30)} className="text-xs">
                {content.days30}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleQuickSelect(90)} className="text-xs">
                {content.days90}
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleRefresh} className="flex items-center bg-transparent">
                <RefreshCw className="mr-2 h-4 w-4" />
                {content.refresh}
              </Button>
              <AnalyticsPageActions />
            </div>
          </div>
        </div>

        {/* Period card */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
              {content.period}
            </CardTitle>
            <CardDescription>
              {dateRange?.from && dateRange?.to ? (
                <>
                  {language === "en" && `From ${dateRange.from.toLocaleDateString("en-US")} to ${dateRange.to.toLocaleDateString("en-US")} `}
                  {language === "fr" && `Du ${dateRange.from.toLocaleDateString("fr-FR")} au ${dateRange.to.toLocaleDateString("fr-FR")} `}
                  {language === "ar" && `من ${dateRange.from.toLocaleDateString("ar-SA")} إلى ${dateRange.to.toLocaleDateString("ar-SA")} `}
                  ({Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))} {language === "en" ? "days" : language === "fr" ? "jours" : "أيام"})
                </>
              ) : (
                content.selectPeriod
              )}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Stats */}
        <Suspense
          fallback={
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
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
          }
        >
          <AnalyticsStats dateRange={dateRange} key={`stats-${refreshKey}`} />
        </Suspense>

        {/* Charts */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-900">Graphiques et tendances</CardTitle>
            <CardDescription>Représentation visuelle des données de transfusion</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="h-96 bg-gray-100 rounded animate-pulse"></div>}>
              <AnalyticsCharts dateRange={dateRange} key={`charts-${refreshKey}`} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
