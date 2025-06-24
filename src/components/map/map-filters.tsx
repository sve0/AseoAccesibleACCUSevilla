"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { FilterType } from "@/types/location";
import { Globe, Store, Landmark } from "lucide-react";

type MapFiltersProps = {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

const AdaptadoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        {...props}
    >
        <path d="M19 10v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9" />
        <path d="M16.5 10V6.5a4.5 4.5 0 0 0-9 0V10" />
        <rect x="8" y="14" width="8" height="4" rx="1" />
    </svg>
);

const filters: { id: FilterType; label: string; icon: React.ReactNode }[] = [
  { id: 'TODOS', label: 'Todos', icon: <Globe /> },
  { id: 'Adaptado', label: 'Adaptado', icon: <AdaptadoIcon /> },
  { id: 'Establecimiento', label: 'Establecimiento', icon: <Store /> },
  { id: 'CentroPublico', label: 'Centro Público', icon: <Landmark /> },
];

export function MapFilters({ activeFilter, onFilterChange }: MapFiltersProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
      <TooltipProvider>
        <Card className="p-1.5 shadow-lg">
          <div className="flex items-center gap-1">
            {filters.map((filter) => (
              <Tooltip key={filter.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeFilter === filter.id ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => onFilterChange(filter.id)}
                    className={cn(
                      "h-9 w-9 transition-all",
                      activeFilter === filter.id && "bg-primary text-primary-foreground",
                      activeFilter !== filter.id && "text-muted-foreground",
                    )}
                  >
                    {filter.icon}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{filter.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </Card>
      </TooltipProvider>
    </div>
  );
}
