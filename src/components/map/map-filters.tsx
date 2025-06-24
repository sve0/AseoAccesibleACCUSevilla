"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FilterType } from "@/types/location";
import { Globe, Accessibility, Store, Landmark } from "lucide-react";

type MapFiltersProps = {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

const filters: { id: FilterType; label: string; icon: React.ReactNode }[] = [
  { id: 'TODOS', label: 'Todos', icon: <Globe /> },
  { id: 'ADAPTADO', label: 'Adaptado', icon: <Accessibility /> },
  { id: 'Establecimiento', label: 'Establecimiento', icon: <Store /> },
  { id: 'CentroPublico', label: 'Centro Público', icon: <Landmark /> },
];

export function MapFilters({ activeFilter, onFilterChange }: MapFiltersProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
      <Card className="p-1.5 shadow-lg">
        <div className="flex items-center gap-1">
          {filters.map((filter) => (
            <Button
              key={filter.id}
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
          ))}
        </div>
      </Card>
    </div>
  );
}
