"use client";

import { Map, AdvancedMarker, type MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import type { Location } from '@/types/location';
import { Store, Landmark, MapPin as DefaultPinIcon } from 'lucide-react';

type MapContainerProps = {
  locations: Location[];
  onMarkerClick: (location: Location) => void;
  center: { lat: number; lng: number };
  zoom: number;
  userLocation: { lat: number; lng: number } | null;
  onCameraChanged: (e: MapCameraChangedEvent) => void;
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

export function MapContainer({ locations, onMarkerClick, center, zoom, userLocation, onCameraChanged }: MapContainerProps) {
  
  const getMarkerIcon = (location: Location) => {
    const commonClasses = "h-4 w-4 text-white";
    if (location.tipo === 'Adaptado') {
      return <AdaptadoIcon className={commonClasses} />;
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
           <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center border-2 border-white shadow-lg">
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
