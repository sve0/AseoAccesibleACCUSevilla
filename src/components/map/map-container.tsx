"use client";

import { Map, AdvancedMarker, type MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import type { Location } from '@/types/location';
import { Store, Landmark, Accessibility, MapPin as DefaultPinIcon } from 'lucide-react';

type MapContainerProps = {
  locations: Location[];
  onMarkerClick: (location: Location) => void;
  center: { lat: number; lng: number };
  zoom: number;
  userLocation: { lat: number; lng: number } | null;
  onCameraChanged: (e: MapCameraChangedEvent) => void;
};

export function MapContainer({ locations, onMarkerClick, center, zoom, userLocation, onCameraChanged }: MapContainerProps) {
  
  const getMarkerIcon = (location: Location) => {
    const commonClasses = "h-5 w-5 text-white";
    if (location.adaptado) {
      return <Accessibility className={commonClasses} />;
    }
    if (location.tipo === 'Establecimiento') {
      return <Store className={commonClasses} />;
    }
    if (location.tipo === 'CentroPublico') {
      return <Landmark className={commonClasses} />;
    }
    return <DefaultPinIcon className={commonClasses} />;
  };
  
  return (
    <Map
      mapId="aseo-accesible-map"
      className="h-full w-full"
      defaultCenter={center}
      defaultZoom={zoom}
      center={center}
      zoom={zoom}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      mapTypeId="roadmap"
      onCameraChanged={onCameraChanged}
    >
      {locations.map((location) => (
        <AdvancedMarker
          key={location.id}
          position={location.coordenadas}
          onClick={() => onMarkerClick(location)}
          title={location.nombre}
        >
           <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center border-2 border-white shadow-lg">
            {getMarkerIcon(location)}
          </div>
        </AdvancedMarker>
      ))}
      {userLocation && (
        <AdvancedMarker position={userLocation} title="Tu ubicación">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-md" />
        </AdvancedMarker>
      )}
    </Map>
  );
}
