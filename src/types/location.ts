export type Location = {
  id: string;
  nombre: string;
  direccion: string;
  coordenadas: { lat: number; lng: number };
  horario: string;
  adaptado: boolean;
  tipo: 'Establecimiento' | 'CentroPublico' | string;
};

export type FilterType = 'TODOS' | 'ADAPTADO' | 'Establecimiento' | 'CentroPublico';

export type LocationWithDistance = Location & {
  distance: number;
};
