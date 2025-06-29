# AseoAccesibleACCUSevilla

Aplicación Next.js para mostrar aseos accesibles en Sevilla sobre Google Maps.

---

## 🚀 Desarrollo y depuración local

1. **Instala las dependencias**
   ```sh
   npm install
   ```

2. **Crea y configura la API Key de Google Maps**

   - Accede a [Google Cloud Console](https://console.cloud.google.com/).
   - Crea un proyecto o selecciona uno existente.
   - Ve a **APIs y servicios > Credenciales**.
   - Haz clic en **Crear credenciales > Clave de API**.
   - Copia la clave generada.
   - Habilita la API de **Maps JavaScript** y cualquier otra que necesite tu app (por ejemplo, Geocoding API).
   - **(Opcional pero recomendado):** Restringe la clave para uso solo en tus dominios o localhost.

3. **Configura las variables de entorno**

   Crea un archivo `.env.local` en la raíz con:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key
   CSV_DATA_URL=https://raw.githubusercontent.com/sve0/accu/refs/heads/main/datasource.csv
   ```

   > **Importante:**  
   > - **Habilita** la clave de API cuando vayas a depurar o publicar la app.  
   > - **Deshabilita** o elimina la clave de API cuando no la estés usando para evitar consumos no deseados o posibles abusos.  
   > - Puedes comentar la línea en `.env.local` para deshabilitarla temporalmente:
   >   ```
   >   #NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key
   >   ```

4. **Configura el modo desarrollo**

   - Abre `next.config.ts` y **asegúrate de que la línea** `output: 'export',` **esté comentada o eliminada**:
     ```ts
     // output: 'export',
     ```

5. **Inicia el servidor de desarrollo**
   ```sh
   npm run dev
   ```
   Accede a [http://localhost:9002](http://localhost:9002).

---

## 📦 Publicación / Exportación estática

1. **Configura el modo exportación**

   - Abre `next.config.ts` y **descomenta o añade** la línea:
     ```ts
     output: 'export',
     ```

2. **Genera la versión estática**
   ```sh
   npx next build
   ```
   Esto creará la carpeta `/out` con los archivos exportados.

3. **Despliega el contenido de `/out`**  
   Puedes subirlo a cualquier hosting estático (Vercel, Netlify, Firebase Hosting, etc.)  
   Si vas a empaquetar la app con Capacitor para Android/iOS, usa la carpeta `/out` como fuente.

---

## ⚠️ Notas importantes

- **Modo desarrollo:**  
  - No uses `output: 'export'` en `next.config.ts`.
- **Modo exportación/publicación:**  
  - Añade `output: 'export'` en `next.config.ts`.
  - Todas las páginas deben poder generarse de forma estática.
- **Variables de entorno:**  
  - Asegúrate de tener configurada la clave de Google Maps y la URL del CSV.
  - **Deshabilita la clave de API** en `.env.local` cuando no la uses para evitar consumos innecesarios.

---

## 🛑 Cómo deshabilitar la API Key en Google Cloud

Si quieres deshabilitar completamente la clave de API desde Google Cloud (no solo desde tu proyecto):

1. Ve a [Google Cloud Console](https://console.cloud.google.com/).
2. Selecciona tu proyecto.
3. Ve a **APIs y servicios > Credenciales**.
4. Busca la clave de API que quieres deshabilitar.
5. Haz clic en el icono del lápiz (editar) junto a la clave.
6. Haz clic en **Deshabilitar clave** (Disable Key).
7. Si lo prefieres, puedes **eliminar** la clave haciendo clic en el icono de la papelera.

> **Recuerda:** Si deshabilitas o eliminas la clave, la app dejará de funcionar hasta que la vuelvas a habilitar o crees una nueva.

---

## 📂 Estructura relevante

- `src/app/page.tsx` — Página principal.
- `src/lib/data.ts` — Lógica de obtención de datos.
- `src/components/map/aseo-map.tsx` — Mapa de aseos accesibles.

---