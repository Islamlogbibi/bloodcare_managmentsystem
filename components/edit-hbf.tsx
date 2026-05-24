"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { updatehbf } from "@/app/lib/actions";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";

export function Hbfform({ history, patientId, transfusionId, isEditing = false }: any) {
  const { t } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hbf, setHbf] = useState(history?.hbf?.toString() ?? "");

  async function onSubmit() {
    setIsLoading(true);
    try {
      await updatehbf({ transfusionId: transfusionId || history?._id || history?.transfusionId, hbf: parseFloat(hbf) });
      toast({ title: t("misAJour"), description: t("hbfUpdated") });
      router.push(`/patients/${patientId}/history`);
    } catch {
      toast({ title: t("error"), description: t("failedToSavePatient"), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-8">
      {isEditing && (
        <h2 className="text-3xl font-bold tracking-tight">
          {t("modifierHbPostTransfusion")}
        </h2>
      )}
      <Card>
        <CardHeader>
          <CardTitle>{t("hbPostTransfusion")} {history?.scheduledTime || history?.date ? `${t("hbPostTransfusionOf")} ${new Date(history.scheduledTime || history.date).toLocaleDateString()}` : ""}</CardTitle>
        </CardHeader>
        <CardContent> 
          <Input
            type="number"
            step="0.1"
            value={hbf}
            onChange={(e) => setHbf(e.target.value)}
            required
          />
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t("saving") : t("update")}
        </Button>
      </div>
    </form>
  );
}
