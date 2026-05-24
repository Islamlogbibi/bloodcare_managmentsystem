"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updatehistory } from "@/app/lib/actions"
import { Save, Heart } from "lucide-react"

import { createPatient, updatePatient } from "@/app/lib/actions"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PatientFormProps {
  patient?: any
  isEditing?: boolean
}

export function PatientForm({ patient: transfusion, isEditing = false }: PatientFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [Hdist, setHdist] = useState<string | null>(transfusion?.Hdist ?? null)

  const [Hrecu, setHrecu] = useState<string | null>(transfusion?.Hrecu ?? null)
  const [poches, setPoches] = useState<string | null>(transfusion?.poches?.toString() ?? transfusion?.bloodUnits?.toString() ?? null)
  const [hb, sethb] = useState<string | null>(transfusion?.hb?.toString() ?? null)
  const [don, setdon] = useState<string | null>(transfusion?.don ?? null);

  async function onSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      const parsedPoches = poches ? parseInt(poches) : undefined;
      const parsedHb = hb ? parseFloat(hb) : undefined;

      const data: any = {
        transfusionId: transfusion?._id,
        Hdist,
        Hrecu,
        poches: parsedPoches,
        bloodUnits: parsedPoches,
        hb: parsedHb,
        don: don ?? null,
      };

      if (isEditing && transfusion) {
        await updatehistory(data)
        
        toast({
          title: "Transfusion mise à jour",
          description: "Les informations de la transfusion ont été mises à jour avec succès.",
        })
      } else {
        await createPatient(data)
        toast({
          title: "Patient enregistré",
          description: "Le nouveau patient a été enregistré avec succès.",
        })
      }

      router.push("/transfusions/today")
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
    
  }

  return (
    <form action={onSubmit} className="space-y-8">
      {/* Informations médicales */}
      <Card className="border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-gray-900">
            <Heart className="mr-2 h-5 w-5 text-red-600" />
            Informations médicales
          </CardTitle>
          <CardDescription>Groupe sanguin et détails médicaux</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">H.dist (Heure)</Label>
              <input
                type="time"
                value={Hdist ?? ""}
                onChange={(e) => setHdist(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">H.recu (Heure)</Label>
              <input
                type="time"
                value={Hrecu ?? ""}
                onChange={(e) => setHrecu(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="poches" className="text-sm font-medium text-gray-700">
              Poches
            </Label>
            <Select value={poches} onValueChange={setPoches}>
              <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                <SelectValue placeholder="Poches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <Label htmlFor="hb" className="text-sm font-medium text-gray-700">
                Hb
              </Label>
              <Input
                id="hb"
                name="hb"
                type="number"
                step="0.1"
                value={hb ?? ""}
                onChange={(e) => sethb(e.target.value)}
                required
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <Label htmlFor="don" className="text-sm font-medium text-gray-700">
              Don
            </Label>
            <Select value={don} onValueChange={setdon}>
              <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                <SelectValue placeholder="Don" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4 pt-6">
        <Button type="button" variant="outline" onClick={() => router.back()} className="border-gray-300">
          Annuler
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700">
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "Enregistrement..." : isEditing ? "Mettre à jour le patient" : "Enregistrer le patient"}
        </Button>
      </div>
    </form>
  )
}
