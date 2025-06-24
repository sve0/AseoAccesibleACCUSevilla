"use client";

import { Map, useMap, type MapCameraChangedEvent, AdvancedMarker } from '@vis.gl/react-google-maps';
import type { Location } from '@/types/location';
import { BriefcaseMedical, Landmark, Store, MapPin as DefaultPinIcon } from 'lucide-react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const MarkerContent = ({ location }: { location: Location }) => {
    const getIconComponent = (location: Location) => {
        const commonClasses = "h-4 w-4 text-white";
        if (location.tipo === 'Adaptado') return <BriefcaseMedical className={commonClasses} />;
        if (location.tipo === 'Establecimiento') return <Store className={commonClasses} />;
        if (location.tipo === 'CentroPublico') return <Landmark className={commonClasses} />;
        return <DefaultPinIcon className={commonClasses} />;
    };

    return (
        <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center border-2 border-white shadow-lg">
            {getIconComponent(location)}
        </div>
    );
};

const Markers = ({ locations, onMarkerClick }: { locations: Location[]; onMarkerClick: (location: Location) => void; }) => {
  const map = useMap();
  const clusterer = useRef<MarkerClusterer | null>(null);
  const markerElements = useRef<{ [key: string]: google.maps.marker.AdvancedMarkerElement }>({});
  const markerRoots = useRef<{ [key: string]: ReturnType<typeof createRoot> }>({});

  useEffect(() => {
    if (!map) return;

    function buildClusterContent(count: number) {
        const clusterElement = document.createElement('div');
        clusterElement.className = "w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center border-2 border-white shadow-lg text-white font-bold text-sm";
        clusterElement.textContent = String(count);
        return clusterElement;
    }
    const renderer = {
        render: ({ count, position }: { count: number; position: google.maps.LatLngLiteral }) => {
            return new google.maps.marker.AdvancedMarkerElement({ position, content: buildClusterContent(count), zIndex: 10 });
        }
    };
    clusterer.current = new MarkerClusterer({ map, renderer });

    return () => {
        clusterer.current?.clearMarkers();
        const rootsToUnmount = Object.values(markerRoots.current);
        setTimeout(() => rootsToUnmount.forEach(root => root.unmount()), 0);
        markerElements.current = {};
        markerRoots.current = {};
        clusterer.current = null;
    };
  }, [map]);

  useEffect(() => {
    if (!map || !clusterer.current) return;
    
    clusterer.current.clearMarkers();
    const rootsToUnmount = Object.values(markerRoots.current);
    setTimeout(() => rootsToUnmount.forEach(root => root.unmount()), 0);
    
    markerElements.current = {};
    markerRoots.current = {};
    
    locations.forEach(location => {
        const content = document.createElement('div');
        const root = createRoot(content);
        root.render(<MarkerContent location={location} />);
        
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: location.coordenadas,
            content,
            title: location.nombre,
        });

        marker.addListener('click', () => onMarkerClick(location));
        
        markerElements.current[location.id] = marker;
        markerRoots.current[location.id] = root;
    });

    clusterer.current.addMarkers(Object.values(markerElements.current));

  }, [locations, map, onMarkerClick]);

  return null;
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
