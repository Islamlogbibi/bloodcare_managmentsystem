"use client"

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function PrintButton() {
  const { t } = useLanguage()

  const handlePrint = () => {
    window.print()
  }

  return (
    <Button variant="outline" onClick={handlePrint}>
      <Printer className="mr-2 h-4 w-4" />
      {t("print")}
    </Button>
  )
}
