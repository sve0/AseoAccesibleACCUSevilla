import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Skeleton className="h-full w-full" />
      <div className="absolute inset-0 flex items-center justify-center bg-background/50">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-semibold text-primary-foreground bg-primary px-4 py-2 rounded-lg">Cargando Aseos...</p>
        </div>
      </div>
    </div>
  );
}
