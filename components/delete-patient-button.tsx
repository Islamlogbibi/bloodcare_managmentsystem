"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deletePatient } from "@/app/lib/actions"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

interface DeletePatientButtonProps {
  patientId: string
  onDelete?: () => void
}

export function DeletePatientButton({ patientId, onDelete }: DeletePatientButtonProps) {
  const { t } = useLanguage()
  const [isDeleting, setIsDeleting] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      console.log("Tentative de suppression du patient avec ID:", patientId)

      const result = await deletePatient(patientId)

      if (result.success) {
        toast({
          title: t("patientDeletedTitle"),
          description: t("patientDeletedDescription"),
        })

        if (onDelete) {
          onDelete()
        }

        router.refresh()
        setOpen(false)
      } else {
        throw new Error("Failed to delete")
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du patient:", error)
      toast({
        title: t("error"),
        description: t("deletePatientFailed"),
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">{t("deletePatientTooltip")}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deletePatientConfirmTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("deletePatientConfirmDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
            {isDeleting ? t("deleting") : t("delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
