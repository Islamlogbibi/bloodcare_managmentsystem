"use client"

import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import Link from "next/link"
import PrintStyles from "./style"
import PrintButton from "./Button"
import { useLanguage } from "@/contexts/language-context"

interface PatientHistoryClientProps {
  patient: any
  transfusions: any[]
  patientId: string
}

export default function PatientHistoryClient({ patient, transfusions, patientId }: PatientHistoryClientProps) {
  const { t } = useLanguage()
  const pastSchedules = transfusions || []

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-end mb-4 print:hidden">
        <PrintButton />
      </div>

      {/* Patient Info Block */}
      <div className="print-area"></div>
      <div className="patient-info print-header border rounded-lg p-4 bg-gray-50">
        <h1 className="text-2xl font-bold">{t("chuAnnaba")}</h1>
        <h2 className="text-xl font-semibold mb-2">
          {t("patient")} :{" "}
          {patient.firstName && patient.lastName
            ? `${patient.firstName} ${patient.lastName}`
            : patient.name || t("notAvailable")}
        </h2>
        <p>
          <span className="font-semibold">{t("bloodType")} :</span>{" "}
          {patient.bloodType || t("notAvailable")}
        </p>
        <p>
          <span className="font-semibold">{t("phenotype")} :</span>{" "}
          {patient.ph || t("notAvailable")}
        </p>
      </div>

      <h1 className="text-2xl font-bold">{t("transfusionHistory")}</h1>

      {pastSchedules.length === 0 ? (
        <p>{t("noPastSchedules")}</p>
      ) : (
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>{t("date")}</TableHead>
                <TableHead>{t("priority")}</TableHead>
                <TableHead>{t("bloodType")}</TableHead>
                <TableHead>{t("phenotype")}</TableHead>
                <TableHead>{t("hasF")}</TableHead>
                <TableHead>{t("hasC")}</TableHead>
                <TableHead>{t("hasL")}</TableHead>
                <TableHead>Hb</TableHead>
                <TableHead>{t("hbPT")}</TableHead>
                <TableHead>{t("bags")}</TableHead>
                <TableHead>{t("don")}</TableHead>
                <TableHead>{t("hdist")}</TableHead>
                <TableHead>{t("hreceived")}</TableHead>
                <TableHead className="print:hidden">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pastSchedules.map((schedule: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{format(new Date(schedule.scheduledTime || schedule.date || schedule.createdAt), "yyyy-MM-dd HH:mm")}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        schedule.priority === "urgent"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }
                    >
                      {schedule.priority === "urgent" ? t("urgente") : t("normale")}
                    </Badge>
                  </TableCell>
                  <TableCell>{schedule.bloodType || "-"}</TableCell>
                  <TableCell>{schedule.ph || "-"}</TableCell>
                  <TableCell className="text-center">{schedule.hasF ? "✓" : ""}</TableCell>
                  <TableCell className="text-center">{schedule.hasC ? "✓" : ""}</TableCell>
                  <TableCell className="text-center">{schedule.hasL ? "✓" : ""}</TableCell>
                  <TableCell>{schedule.hb || "-"}</TableCell>
                  <TableCell>{schedule.hbf || "-"}</TableCell>
                  <TableCell>{schedule.poches || "-"}</TableCell>
                  <TableCell>{schedule.don === "yes" ? t("yesLabel") : schedule.don === "no" ? t("noLabel") : schedule.don || "-"}</TableCell>
                  <TableCell>{schedule.Hdist || "-"}</TableCell>
                  <TableCell>{schedule.Hrecu || "-"}</TableCell>
                  <TableCell className="print:hidden">
                    <Link href={`/patients/${patientId}/history/${schedule._id}/edit`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-20 p-0 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4 text-blue-600" /> {t("edit")}
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Print-specific styles */}
      <PrintStyles />
    </div>
  )
}
