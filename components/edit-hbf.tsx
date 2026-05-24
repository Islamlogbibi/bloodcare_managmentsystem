"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { updatehbf } from "@/app/lib/actions";
import { toast } from "@/hooks/use-toast";

export function Hbfform({ history, patientId, transfusionId, isEditing = false }: any) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hbf, setHbf] = useState(history?.hbf?.toString() ?? "");

  async function onSubmit() {
    setIsLoading(true);
    try {
      await updatehbf({ transfusionId: transfusionId || history?._id || history?.transfusionId, hbf: parseFloat(hbf) });
      toast({ title: "Mis à jour", description: "HbF mis à jour." });
      router.push(`/patients/${patientId}/history`);
    } catch {
      toast({ title: "Erreur", description: "Veuillez réessayer.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Hb Post Transfusion {history?.scheduledTime || history?.date ? `du ${new Date(history.scheduledTime || history.date).toLocaleDateString()}` : ""}</CardTitle>
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
          {isLoading ? "Enregistrement..." : "Mettre à jour"}
        </Button>
      </div>
    </form>
  );
}
