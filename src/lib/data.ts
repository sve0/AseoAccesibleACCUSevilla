import type { Location } from '@/types/location';
import Papa from 'papaparse';

// A simple hand-rolled CSV parser as a fallback
function parseCsv(csvText: string): Record<string, string>[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length === headers.length) {
      const row: Record<string, string> = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[j].trim();
      }
      rows.push(row);
    }
  }
  return rows;
}


export async function getLocations(): Promise<Location[]> {
  try {
    const response = await fetch(process.env.CSV_DATA_URL!, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!response.ok) {
      console.error('Failed to fetch CSV data:', response.statusText);
      return [];
    }
    const csvText = await response.text();

    const parsedData = await new Promise<any[]>((resolve, reject) => {
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            transformHeader: header => header.trim().replace(/"/g, ''),
            complete: (results) => resolve(results.data),
            error: (error: any) => reject(error),
        });
    });

    return parsedData
      .map((item: any, index: number): Location | null => {
        const latLng = item.Localización?.split(',');
        if (!latLng || latLng.length !== 2) return null;

        const lat = parseFloat(latLng[0]);
        const lng = parseFloat(latLng[1]);
        if (isNaN(lat) || isNaN(lng)) return null;

        const esAdaptado = item.Adaptado?.toUpperCase() === 'SI';
        // If it is adapted, we classify its type as 'ADAPTADO' to unify the filtering logic.
        // Otherwise, we use the type from the 'Tipo' column.
        const tipo = esAdaptado ? 'ADAPTADO' : (item.Tipo || 'No especificado');

        return {
          id: item.id || `${index}`,
          nombre: item.Nombre || 'Sin nombre',
          direccion: item.Dirección || 'Sin dirección',
          coordenadas: { lat, lng },
          horario: item.Horario || 'No especificado',
          adaptado: esAdaptado,
          tipo: tipo,
        };
      })
      .filter((item): item is Location => item !== null);

  } catch (error) {
    console.error('Error fetching or parsing locations:', error);
    return [];
  }
}
