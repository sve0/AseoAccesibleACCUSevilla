import { getLocations } from '@/lib/data';
import { AseoMap } from '@/components/map/aseo-map';
import { Card, CardContent } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const locations = await getLocations();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background p-4">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-xl font-semibold text-destructive">Error de Configuración</h1>
            <p className="text-muted-foreground mt-2">
              La clave de API de Google Maps no está configurada. Por favor, añada NEXT_PUBLIC_GOOGLE_MAPS_API_KEY a sus variables de entorno.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <AseoMap locations={locations} apiKey={apiKey} />;
}
