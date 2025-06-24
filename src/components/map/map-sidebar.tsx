"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LocateFixed, List, Info, LoaderCircle } from "lucide-react";

type MapSidebarProps = {
  onCenterUser: () => void;
  onShowProximity: () => void;
  onShowInfo: () => void;
  isLocating: boolean;
};

export function MapSidebar({ onCenterUser, onShowProximity, onShowInfo, isLocating }: MapSidebarProps) {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
      <TooltipProvider>
        <Card className="p-1.5 shadow-lg">
          <div className="flex flex-col gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onCenterUser} disabled={isLocating}>
                  {isLocating ? <LoaderCircle className="animate-spin" /> : <LocateFixed />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Centrar en mi ubicación</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onShowProximity}>
                  <List />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>5 más cercanos</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onShowInfo}>
                  <Info />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Información de la App</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Card>
      </TooltipProvider>
    </div>
  );
}
