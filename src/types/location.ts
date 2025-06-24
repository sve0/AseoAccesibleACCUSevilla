export type Location = {
  id: string;
  nombre: string;
  direccion: string;
  coordenadas: { lat: number; lng: number };
  horario: string;
  adaptado: boolean;
  tipo: string;
};

export type FilterType = 'TODOS' | 'Adaptado' | 'Establecimiento' | 'CentroPublico';

export type LocationWithDistance = Location & {
  distance: number;
};
