# Desglose de Costes Estimados para la Aplicación

Este documento proporciona una estimación de los costes asociados con el hosting y los servicios de API para esta aplicación. Los precios se basan en la información disponible actualmente y pueden cambiar.

## 1. Firebase Hosting

Tu aplicación está configurada para usar Firebase App Hosting. Firebase ofrece dos planes principales:

### Plan Spark (Nivel Gratuito)
Este es el plan ideal para empezar y para aplicaciones con un tráfico bajo a moderado.

- **Coste:** **0 €**
- **Incluye:**
    - **Almacenamiento de Hosting:** 10 GB
    - **Transferencia de datos:** 360 MB por día
    - **Instancias de backend:** 1 (configurable en `apphosting.yaml`)

**Conclusión:** Para las etapas iniciales y un número razonable de usuarios, es muy probable que tu aplicación se mantenga dentro del nivel gratuito, por lo que el coste de hosting sería de **0 €**.

### Plan Blaze (Pago por uso)
Este plan es para aplicaciones que superan los límites del nivel gratuito. Pagas solo por los recursos que consumes por encima del límite gratuito. Es el siguiente paso si tu aplicación crece significativamente.

---

## 2. API de Google Maps Platform

Tu aplicación utiliza la API de Google Maps para mostrar el mapa y los marcadores. La estructura de precios de Google Maps es de pago por uso, pero incluye un generoso crédito mensual.

### Crédito Mensual Gratuito
Google Cloud Platform proporciona **$200 de crédito gratuito cada mes** para usar en los productos de Google Maps. Este crédito se aplica automáticamente a tu cuenta de facturación.

### Precios por Uso (si se excede el crédito de $200)
El producto principal que estás utilizando es la **API de Maps JavaScript**, que sirve mapas dinámicos.

- **Producto:** Dynamic Maps
- **Coste aproximado:** $7.00 por cada 1,000 cargas de mapa.

### ¿Cuántas visitas cubre el crédito gratuito?
Con el crédito de $200, puedes tener aproximadamente:

-   `$200 / $7 * 1000 ≈` **28,500 cargas de mapa gratuitas al mes.**

Una "carga de mapa" ocurre cada vez que un usuario abre la página y el mapa se inicializa.

**Nota:** La geolocalización que usas para centrar el mapa en el usuario (`navigator.geolocation`) es una función del navegador y **es gratuita**, no consume cuota de la API de Google Maps.

---

## Resumen General de Costes

Considerando los niveles gratuitos de ambos servicios, el coste de tu aplicación probablemente será:

-   **Hosting (Firebase):** 0 €
-   **API de Google Maps:** 0 € (siempre que te mantengas por debajo de ~28,500 visitas al mapa al mes)
-   **Total Estimado:** **0 €**

## Acción Crítica: Configurar Alertas de Presupuesto

Para evitar sorpresas y tener control total sobre los gastos, es **muy recomendable** configurar alertas de presupuesto en tu cuenta de facturación de Google Cloud Platform. Esto te notificará por correo electrónico si los costes superan un umbral que tú definas.

### Pasos Resumidos:
1.  En la **Consola de Google Cloud**, ve a **Facturación > Presupuestos y alertas**.
2.  Haz clic en **"Crear presupuesto"**.
3.  Dale un nombre y déjalo aplicado a todo el proyecto.
4.  Establece un **importe objetivo bajo**, por ejemplo, **5 €**. Este es solo el umbral para las notificaciones, no un coste real.
5.  Configura las reglas de umbral para recibir notificaciones por correo electrónico (por ejemplo, al 50%, 90% y 100% del importe).
6.  Guarda el presupuesto.

Con esto, recibirás un aviso mucho antes de agotar el crédito gratuito, dándote tiempo para analizar el uso o tomar decisiones.
