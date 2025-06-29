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

---

## Preguntas Frecuentes sobre Costes y Presupuestos

### ¿Qué pasa si mi uso supera el umbral del presupuesto?
**La aplicación continúa funcionando.** Un presupuesto, por defecto, **solo envía notificaciones por correo electrónico**. No detiene los servicios automáticamente. Es una herramienta de alerta, no un interruptor de apagado.

### ¿El presupuesto se descuenta de mi crédito gratuito?
No. El flujo de costes es el siguiente:
1.  Tu aplicación utiliza servicios (p. ej., la API de Google Maps), lo que genera un coste.
2.  Ese coste se deduce primero del **crédito mensual gratuito de $200**.
3.  El presupuesto simplemente **monitoriza el coste total generado**, independientemente del crédito, y te avisa cuando se alcanzan los umbrales que definiste (p. ej., 5 €).
En resumen, puedes recibir una alerta de presupuesto y aun así no pagar nada porque el coste está cubierto por el crédito.

### ¿Se me cobrará si supero el crédito mensual gratuito?
**Sí.** Este es el punto más importante. Si el coste total de tu uso en un mes supera los $200 del crédito gratuito, la cantidad excedente **se facturará a tu método de pago**. Por eso las alertas de presupuesto son tan importantes.

### ¿Cómo puedo detener la aplicación automáticamente para evitar cargos?
Si prefieres que los servicios se detengan en lugar de generar cargos extra, necesitas una **configuración avanzada**. El método estándar implica:
1.  **Crear un tema de Pub/Sub** en Google Cloud.
2.  **Conectar tu presupuesto a ese tema de Pub/Sub** para que envíe un mensaje programático cuando se alcance el 100% del presupuesto.
3.  **Crear una Cloud Function** que se active con los mensajes de ese tema.
4.  **Programar la función** para que realice una acción drástica, como **deshabilitar la facturación del proyecto** o desactivar la API específica.

Esta es una medida de seguridad muy potente, pero es una configuración avanzada. Para la mayoría de los casos, las alertas por correo electrónico son suficientes para mantener el control.

---

## Cómo Gestionar el Estado de la Aplicación

Una vez que hayas terminado de usar o probar la aplicación, tienes las siguientes opciones para gestionar los costes.

### Opción 1: Inhabilitar la Facturación (Recomendado y Reversible)
Esta es la forma más segura de "apagar" tu aplicación sin perder tu trabajo. Detendrá todos los servicios de pago, pero mantendrá tu proyecto y configuración intactos por si decides reactivarlos más adelante.

**Pasos para Deshabilitar:**
1. Ve a la **Consola de Google Cloud**.
2. En el menú de navegación (☰), ve a **Facturación**.
3. Si tienes más de una cuenta de facturación, selecciona la cuenta vinculada a tu proyecto.
4. En el menú de la cuenta de facturación, haz clic en **Administración de cuentas**.
5. Busca tu proyecto en la lista. En la columna "Acciones", haz clic en el menú de tres puntos (⋮) y selecciona **Inhabilitar facturación**.

**Pasos para Reactivar:**
Si en el futuro decides volver a usar la aplicación, puedes reactivarla fácilmente volviendo a vincular tu cuenta de facturación.
1. Ve a la **Consola de Google Cloud** y selecciona tu proyecto.
2. En el menú de navegación (☰), ve a **Facturación**.
3. Es posible que veas un mensaje indicando que "Este proyecto no tiene ninguna cuenta de facturación".
4. Haz clic en el botón **"VINCULAR UNA CUENTA DE FACTURACIÓN"**.
5. Selecciona tu cuenta de facturación existente en la lista y haz clic en **"ESTABLECER CUENTA"**.
Los servicios de pago se reactivarán y tu aplicación volverá a estar en línea en unos minutos.

### Opción 2: Eliminar el Proyecto (Permanente e Irreversible)
Si estás completamente seguro de que no necesitarás más este proyecto, puedes eliminarlo. Esto borrará todos los recursos asociados, incluyendo tu app alojada, bases de datos y configuraciones.

**Pasos:**
1. En la **Consola de Google Cloud**, ve a **IAM y administración > Configuración del proyecto**.
2. Haz clic en el botón **CERRAR** en la parte superior.
3. Sigue las instrucciones en pantalla para confirmar la eliminación del proyecto. Se te pedirá que introduzcas el ID del proyecto para confirmar.
