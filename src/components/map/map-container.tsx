"use client";

import { Map, AdvancedMarker, type MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import type { Location } from '@/types/location';
import { Markers } from './markers';

type MapContainerProps = {
  locations: Location[];
  onMarkerClick: (location: Location) => void;
  center: { lat: number; lng: number };
  zoom: number;
  userLocation: { lat: number; lng: number } | null;
  onCameraChanged: (e: MapCameraChangedEvent) => void;
};

export function MapContainer({ locations, onMarkerClick, center, zoom, userLocation, onCameraChanged }: MapContainerProps) {
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
      <Markers locations={locations} onMarkerClick={onMarkerClick} />
      {userLocation && (
        <AdvancedMarker position={userLocation} title="Tu ubicación">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-md" />
        </AdvancedMarker>
      )}
    </Map>
  );
}
