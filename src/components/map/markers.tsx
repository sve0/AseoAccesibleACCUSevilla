'use client';

import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Location } from '@/types/location';
import { Store, Landmark, BriefcaseMedical, MapPin as DefaultPinIcon } from 'lucide-react';

type MarkersProps = {
    locations: Location[];
    onMarkerClick: (location: Location) => void;
};

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

export const Markers = ({ locations, onMarkerClick }: MarkersProps) => {
    const map = useMap();
    const clustererRef = useRef<MarkerClusterer | null>(null);
    const rootsRef = useRef<Map<string, ReturnType<typeof createRoot>>>(new Map());

    useEffect(() => {
        if (!map) return;

        if (!clustererRef.current) {
            const renderer = {
                render: ({ count, position }: { count: number, position: google.maps.LatLngLiteral }) => {
                    return new google.maps.marker.AdvancedMarkerElement({
                        position,
                        content: buildClusterContent(count),
                        zIndex: 10
                    });
                }
            };
            clustererRef.current = new MarkerClusterer({ map, renderer });
        }
        
        clustererRef.current.clearMarkers();
        
        // Defer unmounting to avoid race conditions with React's render cycle.
        const rootsToUnmount = new Map(rootsRef.current);
        rootsRef.current.clear();
        if (rootsToUnmount.size > 0) {
            setTimeout(() => rootsToUnmount.forEach(r => r.unmount()), 0);
        }

        const markers = locations.map(location => {
            const markerElement = document.createElement('div');
            markerElement.className = "w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center border-2 border-white shadow-lg";

            const root = createRoot(markerElement);
            root.render(getIconComponent(location));
            rootsRef.current.set(location.id, root);

            const marker = new google.maps.marker.AdvancedMarkerElement({
                position: location.coordenadas,
                content: markerElement,
                title: location.nombre,
                zIndex: 1 
            });
            
            marker.addEventListener('gmp-click', () => onMarkerClick(location));
            return marker;
        });

        clustererRef.current.addMarkers(markers);
    }, [map, locations, onMarkerClick]);

    useEffect(() => {
        return () => {
            if (clustererRef.current) {
                clustererRef.current.clearMarkers();
                clustererRef.current = null;
            }
            // Defer unmounting to avoid race conditions with React's render cycle.
            const rootsToUnmount = new Map(rootsRef.current);
            rootsRef.current.clear();
            if (rootsToUnmount.size > 0) {
                setTimeout(() => rootsToUnmount.forEach(r => r.unmount()), 0);
            }
        };
    }, []);

    return null;
};

function buildClusterContent(count: number) {
    const clusterElement = document.createElement('div');
    clusterElement.className = "w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center border-2 border-white shadow-lg text-white font-bold text-sm";
    clusterElement.textContent = String(count);
    return clusterElement;
}
