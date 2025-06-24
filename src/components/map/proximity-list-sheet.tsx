"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { LocationWithDistance } from "@/types/location";

type ProximitySheetProps = {
  locations: LocationWithDistance[];
  isOpen: boolean;
  onClose: () => void;
};

export function ProximitySheet({ locations, isOpen, onClose }: ProximitySheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Aseos más cercanos</SheetTitle>
          <SheetDescription>
            Los 5 aseos más cercanos a tu ubicación actual.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-grow mt-4">
          {locations.length > 0 ? (
            <div className="space-y-3 pr-4">
              {locations.map((location, index) => (
                <div key={location.id}>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{location.nombre}</h3>
                      <p className="text-sm text-muted-foreground">{location.direccion}</p>
                      <p className="text-sm font-medium text-primary mt-1">
                        Aprox. {location.distance.toFixed(2)} km de distancia
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No se encontraron ubicaciones cercanas.</p>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
