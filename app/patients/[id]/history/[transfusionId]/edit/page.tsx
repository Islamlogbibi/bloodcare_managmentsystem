import { notFound } from "next/navigation";
import { Hbfform } from "@/components/edit-hbf";
import { getTransfusionById } from "@/app/lib/actions";

interface EditPageProps {
  params: Promise<{ id: string; transfusionId: string }>;
}

export default async function HistoryPageEdit({ params }: EditPageProps) {
  const { id, transfusionId } = await params;

  // Fetch the transfusion
  const transfusion = await getTransfusionById(transfusionId);
  if (!transfusion) notFound();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">
        Modifier Hb Post Transfusion
      </h2>

      <Hbfform
        patientId={id}
        transfusionId={transfusionId}
        history={transfusion}
        isEditing
      />
    </div>
  );
}
