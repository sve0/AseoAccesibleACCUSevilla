"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Location } from "@/types/location";
import { MapPin, Clock, Building, BriefcaseMedical, Landmark, Store } from "lucide-react";

type LocationSheetProps = {
  location: Location | null;
  isOpen: boolean;
  onClose: () => void;
};

const TypeIcon = ({ type }: { type: string }) => {
    const className="h-5 w-5 text-primary flex-shrink-0";
    if (type === 'Adaptado') {
        return <BriefcaseMedical className={className} />;
    }
    if (type === 'Establecimiento') {
        return <Store className={className} />;
    }
    if (type === 'CentroPublico') {
        return <Landmark className={className} />;
    }
    return <Building className={className} />; // Fallback
};

export function LocationSheet({ location, isOpen, onClose }: LocationSheetProps) {
  if (!location) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">{location.nombre}</SheetTitle>
          <div className="flex items-center gap-2 text-muted-foreground mt-2 text-sm">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{location.direccion}</span>
          </div>
        </SheetHeader>
        <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                    <p className="font-semibold">Horario</p>
                    <p className="text-muted-foreground">{location.horario}</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <TypeIcon type={location.tipo} />
                <div>
                    <p className="font-semibold">Tipo</p>
                    <p className="text-muted-foreground">{location.tipo === 'CentroPublico' ? 'Centro Público' : location.tipo}</p>
                </div>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
