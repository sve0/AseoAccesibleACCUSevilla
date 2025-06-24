"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import type { Location } from "@/types/location";
import { MapPin, Clock, Building, Wheelchair } from "lucide-react";

type LocationSheetProps = {
  location: Location | null;
  isOpen: boolean;
  onClose: () => void;
};

export function LocationSheet({ location, isOpen, onClose }: LocationSheetProps) {
  if (!location) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">{location.nombre}</SheetTitle>
          <SheetDescription>
            <div className="flex items-center gap-2 text-muted-foreground mt-2">
                <MapPin className="h-4 w-4" />
                <span>{location.direccion}</span>
            </div>
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                    <p className="font-semibold">Horario</p>
                    <p className="text-muted-foreground">{location.horario}</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-primary" />
                <div>
                    <p className="font-semibold">Tipo</p>
                    <p className="text-muted-foreground">{location.tipo === 'CentroPublico' ? 'Centro Público' : location.tipo}</p>
                </div>
            </div>
            {location.adaptado && (
                <div className="flex items-center gap-3">
                    <Wheelchair className="h-5 w-5 text-accent-foreground" />
                    <div>
                        <p className="font-semibold">Accesibilidad</p>
                        <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">Aseo Adaptado</Badge>
                    </div>
                </div>
            )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
