"use client";

import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import type { Location } from '@/types/location';

type MapContainerProps = {
  locations: Location[];
  onMarkerClick: (location: Location) => void;
  center: { lat: number; lng: number };
  zoom: number;
  userLocation: { lat: number; lng: number } | null;
};

export function MapContainer({ locations, onMarkerClick, center, zoom, userLocation }: MapContainerProps) {
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
      style={{
        transition: 'center 0.5s ease-in-out, zoom 0.5s ease-in-out',
      }}
    >
      {locations.map((location) => (
        <AdvancedMarker
          key={location.id}
          position={location.coordenadas}
          onClick={() => onMarkerClick(location)}
          title={location.nombre}
        >
          <Pin 
            background={location.adaptado ? 'var(--colors-accent)' : 'var(--colors-primary)'}
            glyphColor="#fff"
            borderColor={location.adaptado ? 'var(--colors-accent)' : 'var(--colors-primary)'}
          />
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
