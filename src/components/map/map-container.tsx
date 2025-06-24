"use client";

import { Map, AdvancedMarker, useMap, type MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import type { Location } from '@/types/location';
import { BriefcaseMedical, Landmark, Store, MapPin as DefaultPinIcon } from 'lucide-react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useEffect, useState } from 'react';

const getIconComponent = (location: Location) => {
    const commonClasses = "h-4 w-4 text-white";
    if (location.tipo === 'Adaptado') {
        return <BriefcaseMedical className={commonClasses} />;
    }
    if (location.tipo === 'Establecimiento') {
        return <Store className={commonClasses} />;
    }
    if (location.tipo === 'CentroPublico') {
        return <Landmark className={commonClasses} />;
    }
    return <DefaultPinIcon className={commonClasses} />;
};

const MarkerContent = ({ location }: { location: Location }) => (
    <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center border-2 border-white shadow-lg">
        {getIconComponent(location)}
    </div>
);

function buildClusterContent(count: number) {
    const clusterElement = document.createElement('div');
    clusterElement.className = "w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center border-2 border-white shadow-lg text-white font-bold text-sm";
    clusterElement.textContent = String(count);
    return clusterElement;
}

const renderer = {
    render: ({ count, position }: { count: number, position: google.maps.LatLngLiteral }) => {
        return new google.maps.marker.AdvancedMarkerElement({
            position,
            content: buildClusterContent(count),
            zIndex: 10
        });
    }
};

const Markers = ({ locations, onMarkerClick }: { locations: Location[]; onMarkerClick: (location: Location) => void; }) => {
  const map = useMap();
  const [clusterer, setClusterer] = useState<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (clusterer) return;

    setClusterer(new MarkerClusterer({ map, renderer }));
  }, [map, clusterer]);
  
  useEffect(() => {
    return () => {
      clusterer?.clearMarkers();
    }
  }, [clusterer]);

  return (
    <>
      {locations.map(location => (
        <AdvancedMarker
          key={location.id}
          position={location.coordenadas}
          clusterer={clusterer}
          onClick={() => onMarkerClick(location)}
          title={location.nombre}
        >
          <MarkerContent location={location} />
        </AdvancedMarker>
      ))}
    </>
  );
};


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
