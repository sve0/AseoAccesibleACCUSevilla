"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import Image from "next/image";

type InfoSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function InfoSheet({ isOpen, onClose }: InfoSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <div className="mx-auto w-fit mb-4">
            <Image src="/logo.jpg" alt="Logo AseoAccesibleACCUSevilla" width={150} height={50} data-ai-hint="company logo" />
          </div>
          <SheetTitle className="text-center text-2xl">AseoAccesible ACCU Sevilla</SheetTitle>
          <SheetDescription className="text-center">
            Facilitando el acceso a aseos públicos y de establecimientos colaboradores.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
                Esta aplicación ha sido desarrollada para ayudar a los miembros de ACCU Sevilla y al público en general a localizar rápidamente aseos accesibles en la ciudad.
            </p>
            <p>
                Los datos son proporcionados por colaboradores y se actualizan periódicamente. Utilice los filtros para encontrar el tipo de aseo que necesita.
            </p>
            <p className="font-semibold text-foreground">
                ¡Esperamos que esta herramienta le sea de gran utilidad!
            </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
