"use client";

import { useState, useMemo, useCallback } from 'react';
import type { Location, FilterType, LocationWithDistance } from '@/types/location';
import { APIProvider, type MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { MapFilters } from '@/components/map/map-filters';
import { MapSidebar } from '@/components/map/map-sidebar';
import { LocationSheet } from '@/components/map/location-sheet';
import { ProximitySheet } from '@/components/map/proximity-list-sheet';
import { InfoSheet } from '@/components/map/info-sheet';
import { getDistanceFromLatLonInKm } from '@/lib/utils';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const MapContainer = dynamic(
  () => import('@/components/map/map-container').then(mod => mod.MapContainer),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-full w-full" /> 
  }
);


type AseoMapProps = {
  locations: Location[];
  apiKey: string;
};

export function AseoMap({ locations, apiKey }: AseoMapProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('TODOS');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  
  const [isInfoSheetOpen, setInfoSheetOpen] = useState(false);
  const [isProximitySheetOpen, setProximitySheetOpen] = useState(false);

  const [mapCenter, setMapCenter] = useState({ lat: 37.3890924, lng: -5.9844589 }); // Default to Seville
  const [zoom, setZoom] = useState(13);

  const { toast } = useToast();

  const handleCameraChange = useCallback((e: MapCameraChangedEvent) => {
    setMapCenter(e.detail.center);
    setZoom(e.detail.zoom);
  }, []);

  const handleCenterOnUser = useCallback(() => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      toast({ title: 'Error', description: 'La geolocalización no es compatible con su navegador.', variant: 'destructive' });
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newUserLocation = { lat: latitude, lng: longitude };
        setUserLocation(newUserLocation);
        setMapCenter(newUserLocation);
        setZoom(15);
        setIsLocating(false);
        toast({ title: 'Ubicación encontrada', description: 'Mapa centrado en su posición.', duration: 3000 });
      },
      () => {
        toast({ title: 'Error de Geolocalización', description: 'No se pudo obtener su ubicación. Por favor, compruebe los permisos.', variant: 'destructive' });
        setIsLocating(false);
      }
    );
  }, [toast]);
  
  const filteredLocations = useMemo(() => {
    if (activeFilter === 'TODOS') {
      return locations;
    }
    return locations.filter((location) => location.tipo === activeFilter);
  }, [activeFilter, locations]);

  const nearestLocations = useMemo((): LocationWithDistance[] => {
    if (!userLocation) return [];
    return locations
      .map(location => ({
        ...location,
        distance: getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, location.coordenadas.lat, location.coordenadas.lng),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  }, [userLocation, locations]);

  const handleMarkerClick = useCallback((location: Location) => {
    setSelectedLocation(location);
  }, []);
  
  const handleSheetClose = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  const handleProximityClick = useCallback(() => {
    if (userLocation) {
        setProximitySheetOpen(true);
    } else {
        toast({ title: 'Ubicación requerida', description: 'Primero céntranos en tu ubicación para encontrar los aseos más cercanos.', variant: 'destructive' });
    }
  }, [userLocation, toast]);
  
  const handleCenterOnLocation = useCallback((location: Location) => {
    setMapCenter(location.coordenadas);
    setZoom(17);
    setSelectedLocation(location);
  }, []);

  return (
    <APIProvider apiKey={apiKey} libraries={['marker']}>
      <div className="relative h-[100dvh] w-screen font-body">
        <MapContainer
          locations={filteredLocations}
          onMarkerClick={handleMarkerClick}
          center={mapCenter}
          zoom={zoom}
          userLocation={userLocation}
          onCameraChanged={handleCameraChange}
        />
        <div className="absolute top-4 left-4 z-10 bg-card p-2 rounded-lg shadow-lg">
          <Image src="/logo.jpg" alt="Logo AseoAccesibleACCUSevilla" width={50} height={17} data-ai-hint="company logo" className="object-contain" />
        </div>

        <MapSidebar onCenterUser={handleCenterOnUser} onShowProximity={handleProximityClick} onShowInfo={() => setInfoSheetOpen(true)} isLocating={isLocating} />
        <MapFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <LocationSheet location={selectedLocation} isOpen={!!selectedLocation} onClose={handleSheetClose} />
        <ProximitySheet 
          locations={nearestLocations} 
          isOpen={isProximitySheetOpen} 
          onClose={() => setProximitySheetOpen(false)}
          onCenterLocation={handleCenterOnLocation}
        />
        <InfoSheet isOpen={isInfoSheetOpen} onClose={() => setInfoSheetOpen(false)} />
      </div>
    </APIProvider>
  );
}
