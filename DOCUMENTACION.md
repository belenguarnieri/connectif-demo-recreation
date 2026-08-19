# Connectif — Documentación de análisis y guía de recreación para demo interactiva

> Análisis realizado sobre `stage.connectif.cloud` (cuenta demo "Connectif Demo" / "Demo Store ES"), agosto 2026.
> Objetivo: documentar visual, marca y funcionalidades para recrear una **demo educativa e interactiva** (no una copia 1:1) en GitHub, con actividades y juegos que expliquen cómo funciona una plataforma de marketing automation / personalización.

---

## 1. Qué es Connectif (resumen funcional)

Connectif es una plataforma SaaS de **marketing automation, personalización web (CRO) y CDP (Customer Data Platform)** orientada a e-commerce. Combina:

- Un **CDP**: unifica contactos, su comportamiento (web, app, email, compras, tiendas físicas) y los segmenta.
- Un **motor de workflows visuales** (estilo "if this then that" avanzado) que dispara acciones de marketing multicanal (email, SMS, push web/móvil, popups on-site, WhatsApp, etc.) en base a disparadores y condiciones.
- Un **motor de personalización on-site** (popups, banners, recomendaciones de producto) inyectado vía script en la web del cliente.
- Un módulo de **analítica/BI** con dashboards de e-commerce, contenido, tráfico y contactos.
- Un asistente de **IA generativa ("Copilot")** integrado transversalmente: genera emails, workflows, segmentos, textos y responde preguntas sobre los datos del negocio.

Es una herramienta B2B, pensada para equipos de marketing/CRM de tiendas online, con una cuenta que puede gestionar **múltiples tiendas/idiomas** desde el mismo panel.

---

## 2. Manual de marca (Brand Manual)

Extraído directamente del CSS computado de la aplicación (no de assets de marketing, sino del producto real), por lo que refleja fielmente el "look & feel" del panel.

### 2.1 Logotipo

- Isotipo: arco/curva estilizada en gradiente azul (de azul medio a celeste), sobre fondo blanco, forma similar a un puente o arco abstracto — recuerda a una "sonrisa" o "arcoíris" minimalista. Se usa solo (sin texto) en la barra lateral, en tamaño pequeño (~38×38px).
- Wordmark: "Connectif" en tipografía sans-serif regular, usado en el selector de cuenta ("Connectif Demo") junto al isotipo.
- Placeholder de logo de cliente en plantillas de email: bloque de texto "LOGO" + "BRAND" en dos pesos/colores distintos (gris oscuro + magenta/rosa), indicando dónde va el logo del cliente final.

### 2.2 Paleta de colores

| Uso | Color | Hex aprox. |
|---|---|---|
| Primario (botones, links activos, foco) | `rgb(94, 145, 235)` | `#5E91EB` |
| Texto de cuerpo | `rgb(71, 83, 93)` | `#47535D` |
| Encabezados grandes (H1, "Hola Belén") | `rgb(66, 66, 66)` | `#424242` |
| Encabezados de sección | `rgb(33, 33, 33)` | `#212121` |
| Fondo general | `rgb(255, 255, 255)` | `#FFFFFF` |
| Borde de tarjetas (cards) | `rgb(238, 238, 238)` | `#EEEEEE` |
| Acento de estado "activo" | verde/teal | usado en chips "En uso", "Activo" |
| Acento de alerta/error | rojo | icono de error en editor de workflow, badges "BORRADOR" |
| Acento IA / Copilot | violeta/púrpura sobre fondo casi negro | `#7C5CFC` aprox. sobre `#14121F` aprox. |

**Tema dual muy importante para la identidad**: la aplicación tiene dos "modos" visuales conviviendo:
1. **UI principal**: fondo blanco, minimalista, con acentos en azul `#5E91EB`, tarjetas con `border-radius: 16px` y bordes muy sutiles, sombras casi inexistentes (flat design).
2. **Panel Copilot (IA)**: modal/drawer con fondo oscuro (casi negro azulado) y gradientes violeta/púrpura, tipografía blanca, icono de "chispitas" (sparkles) como marca del asistente. Este contraste day/night es una señal de marca fuerte y fácil de recrear.

### 2.3 Tipografía

- Fuente principal: **"Source Sans Pro"**, con fallback `Helvetica, Arial, sans-serif`.
- Tamaño base del cuerpo: `14px`.
- H1 (saludo, títulos de página): `34px`, peso `400` (regular, no bold — el peso visual lo dan el tamaño y el color oscuro, no el grosor).
- Títulos de sección: `24px`, peso `400`.
- Botones: `15px`, peso `400`.
- Conclusión: **no usan negritas agresivas**; la jerarquía se construye con tamaño y color, tipografía humanista/redondeada (Source Sans Pro), lo cual da una sensación amigable y "menos corporativa" que otras herramientas B2B.

### 2.4 Componentes UI (design system)

Basado en **Material UI (MUI)** de React, personalizado:
- Tarjetas (`Card`): fondo blanco, `border-radius: 16px`, borde `0.8px solid #EEEEEE`, sin sombra.
- Botones primarios: fondo `#5E91EB`, texto blanco, `border-radius: 4px`, sin sombra, padding horizontal generoso (`0 20px`).
- Barra lateral de navegación: fija, angosta (~78px), fondo blanco, iconos monocromos grises que se colorean en azul al pasar/seleccionar, con tooltips al hacer hover.
- Iconografía: set de iconos lineales simples (home, personas, organigrama, calendario, documento, carrito, gráfico de barras, chispas/sparkles, engranaje) — estilo Material Icons.
- Barras de progreso (uso de plan): línea fina, color primario, con fondo gris claro.
- Chips/etiquetas de estado: pill-shaped, colores semánticos (gris=borrador, celeste=programado, azul=activo, etc.)
- Modales de configuración de nodo: pantalla completa tipo "wizard" con pasos numerados (1-2-3) y breadcrumbs horizontales con línea conectora.
- Editor visual (workflows/popups): canvas infinito con zoom/pan, nodos tipo "app" (icono + etiqueta) conectados por curvas Bézier grises, panel derecho deslizable de "Herramientas" con pestañas.

### 2.5 Tono de voz (copys observados)

- Cercano y en 2ª persona: *"Hola Belén"*, *"Tu negocio de un vistazo"*, *"Estás a un paso de encontrar a tu persona ideal"*.
- Orientado a beneficio/resultado, no a feature: *"Fomenta la recurrencia de compra..."*, *"Incentiva las compras ajustándote al perfil de gasto..."*.
- Preguntas como títulos de sección en analítica: *"¿Cuál es el estado de mis compras?"*, *"¿Quién te compra: clientes nuevos o habituales?"*.

---

## 3. Arquitectura técnica observada (para inspirar la recreación)

- **SPA en React + Material UI** (clases `MuiPaper-root`, `MuiCard-root`, `css-xxxxx` de Emotion/MUI styled-components).
- Idioma del `<html lang="en">` aunque la interfaz se sirve en español (i18n por textos, no por atributo lang).
- Navegación por rutas tipo `/store/{storeId}/{seccion}`, ej: `/dashboard`, `/workflows`, `/workflow-edit/{id}`, `/segments`, `/contacts`, `/contents/web`, `/web-content-edit/{id}`, `/analytics/overview`, `/store-edit?tabId=web`.
- **Script de integración cliente** (lo que se instala en la tienda del cliente final): un snippet asíncrono mínimo en el `<body>` que carga de forma diferida un script real desde un CDN (`cdn.connectif.cloud/.../client-script/{accountId}`), evitando bloquear el render de la web anfitriona. Patrón muy similar a Google Tag Manager / Segment.
  ```html
  <script async id="__cn_generic_script__{id}">
  !function(e){function t(){if(!e.querySelector("#__cn_client_script_{id}")){
    var t=e.createElement("script");
    t.setAttribute("src","https://cdn.connectif.cloud/.../client-script/{id}"),
    e.body.appendChild(t)}}
    "complete"===e.readyState||"interactive"===e.readyState?t():e.addEventListener("DOMContentLoaded",t)
  }(document);
  </script>
  ```
- Configuración de **dominios autorizados** (allowlist) para validar el origen de los eventos que llegan del script cliente — mecanismo anti-spoofing.
- Toggles para habilitar/deshabilitar recolección de **formularios** y **eventos web** por separado, y opción de **auto-inicializar** o de **auto-enviar eventos** al cargar (para integraciones "a medida").
- **Identidad de contacto compartida entre subdominios** (fingerprint anónimo) opcional, con advertencia de impacto en rendimiento.
- Widget flotante de **Copilot** (icono redondo violeta, esquina inferior derecha) presente en todas las pantallas — patrón de "asistente omnipresente".

---

## 4. Inventario exhaustivo de funcionalidades

### 4.1 Navegación principal (sidebar)

1. **Inicio / Dashboard**
2. **Audiencia** (icono personas): Contactos · Segmentos · Campos del contacto
3. **Workflows** (icono organigrama)
4. **Calendario** (calendario de marketing)
5. **Contenidos** (icono documento): Mis emails · Bloques globales · Kit de marca · Contenido web · Formularios · Notificaciones push web · Notificaciones push móvil · SMS
6. **Comercio electrónico** (icono carrito): Catálogo · Segmentos de productos · Compras · Cupones
7. **Analítica** (icono gráfico de barras): Dashboards · Data Explorer
8. **Copilot** (icono chispas) — asistente IA flotante
9. **Ajustes** (icono engranaje) — configuración de cuenta/tienda
10. Selector de tienda / idioma (parte inferior fija) + cuenta de usuario + ayuda

### 4.2 Dashboard (Inicio)

- Saludo personalizado ("Hola {Nombre}") + selector de tienda/idioma activo.
- **Resumen de plan del mes**: barras de consumo de "Actividades" (eventos trackeados), "Emails" enviados y créditos de "Copilot" (IA), con fecha de fin de ciclo y botón "Gestionar suscripción". → Indica **modelo de precios por consumo/uso** (activity-based pricing), no solo por asientos.
- **"Tu negocio de un vistazo"**: KPIs de los últimos 30 días — Compras, Compras atribuidas a Connectif, Ticket medio, Carritos recuperados — cada uno con un mini-sparkline.
- **Clientes nuevos vs. habituales**: comparación de ingresos por tipo de comprador.
- Accesos directos a: calendario de marketing, dashboard de audiencia, actividad en tiempo real, rendimiento por canal.
- Botón CTA fijo arriba a la derecha: **"Crear workflow"** (con desplegable de accesos rápidos).

### 4.3 Audiencia

- **Contactos**: tabla paginada (hasta 100 páginas) con búsqueda por email, filtros por teléfono/suscripción push/segmento, columnas configurables (email, fecha creación, teléfono, apellidos, estado de email, nombre, estado de newsletter), acciones editar/eliminar por fila, exportación.
- **Segmentos**: listado en grid/lista de segmentos con tipo (Estático / Dinámico / Dinámico Plus), número de contactos, fecha de creación y última sincronización, badge "En uso". Filtros por tipo/estado/etiquetas.
  - **Estático**: asignación manual de contactos (o vía nodos de workflow "Añadir/Eliminar de segmento").
  - **Dinámico**: reglas sobre campos del contacto (demográficos/CRM).
  - **Dinámico Plus**: reglas que combinan campos **y comportamiento** (navegación, compras, apertura de emails, etc.) — es el nivel más avanzado, con cupo limitado por plan ("50 de 50 segmentos creados").
  - Builder de condiciones: "Los contactos deben cumplir [todas/alguna] de las condiciones", filas de `Campo` + `Operador` + `Valor`, hasta 10 condiciones, con **previsualización en vivo** del número de contactos que matchean.
  - **Generación de segmentos con IA** ("Generar segmento con IA") y **galería de plantillas** de segmentos por objetivo/canal (ej. "A punto de comprar").
- **Campos del contacto**: gestión de propiedades custom del CDP.

### 4.4 Workflows (el corazón del producto)

- Listado masivo (la cuenta demo tiene **3.414 workflows**) con estados: Borrador, Programado, Activo, Pausado, Finalizado.
- Cada tarjeta muestra: miniatura del diagrama de nodos, estado, nombre, objetivo (Fidelización/Conversión/Retención/Reactivación/Adquisición...), canal(es), pack/plantilla de origen, descripción, fecha de creación, acciones (Editar/Iniciar/Finalizar/Más).
- Organización en **carpetas**, prioridad entre workflows, filtro por etiquetas, vista grid/lista.
- **"Crear workflow con IA"** (Copilot Workflow): generación completa de un flujo a partir de un objetivo en lenguaje natural.
- **Editor visual** (canvas infinito, zoom, pan):
  - Panel derecho **"Herramientas"** con 3 pestañas: **Disparadores**, **Acciones**, **Condiciones**, organizadas por categorías expandibles (acordeón) y buscador.
  - Categorías nativas: **Sistema, Contacto, Email, SMS, Web, App Móvil, Comercio electrónico**, más conectores de terceros: **Facebook, Salesforce CRM, Zoho, Stores offline, Hubspot, Dynamics ERP, WhatsApp, Adobe**, y un mecanismo de **"Integraciones personalizadas" (webhooks)** que permite crear disparadores/acciones a medida (la cuenta demo tiene ~60 integraciones custom creadas para distintos clientes: tiendas físicas, ERPs, CRMs, formularios, etc. — prueba de que el sistema de eventos es totalmente extensible vía webhook).
  - **Disparadores nativos relevados**:
    - Contacto: *Al entrar a segmento, Al salir de segmento*
    - Email: *Al abrir email, Al hacer clic en email, Al dar de baja email*
    - Web: *Al visitar página web, Al abrir/clicar contenido web, Al enviar formulario web, Al abrir/clicar notificación push web, Al suscribirse/cancelar notificaciones push web, Al registrarse en web, Al hacer login en web, Al buscar en web*
    - App Móvil: *Al visitar página en app, Al hacer clic en notificación push móvil, Al registrarse, Al hacer login, Al buscar*
    - Comercio electrónico: *Al comprar, Al visitar un producto, Al buscar un producto, Al abandonar carrito, Al añadir al carrito*
  - **Acciones nativas relevadas**:
    - Sistema: *Esperar, Planificar, Iniciar Test A/B/X, Evaluar rama A/B/X, Split*
    - Contacto: *Establecer campo, Añadir a segmento, Eliminar de segmento*
    - Email: *Enviar email* · SMS: *Enviar SMS*
    - Web: *Enviar contenido web (mostrar popup/banner), Mostrar notificación push web, Compartir datos*
    - App Móvil: *Mostrar notificación push móvil*
    - Comercio electrónico: *Obtener datos de compra, Obtener productos, Obtener último carrito, Asignar cupón*
  - **Condiciones nativas relevadas**: *Comprobar valor* (nodo genérico de comparación, replicado por categoría según el dato a evaluar).
  - Nodos con forma/color por tipo: disparadores en violeta (rombo), acciones en color por canal (amarillo=email, gris=espera/tiempo, etc.), condiciones como bifurcación Sí/No.
  - Herramientas de canvas: notas adhesivas (post-its amarillos), alinear/seleccionar, autolayout ("organizar"), zoom in/out, papelera de nodos, copiar/pegar (portapapeles), renombrar nodo.
  - Cada nodo se configura en una **pantalla dedicada de pasos** (ej. "Enviar email" → paso 1 elegir/crear plantilla → paso 2 configuración de envío → paso 3 variables).
  - Contador de errores de validación (icono rojo con número) antes de poder activar el workflow.
  - Etiquetado de workflows (tags) y campo de objetivo/canal visibles en el header.

### 4.5 Calendario de marketing

- Vista mensual tipo calendario clásico, con workflows activos/programados anclados a sus fechas de inicio/fin, filtros por estado/workflow/duración/etiqueta, comparación de actividad vs. periodo anterior (ej. "-100%").
- Aviso de workflows "sin fecha de fin" pendientes de revisar.

### 4.6 Contenidos (creatividades)

- **Emails**: librería con **miles de plantillas** (1.921 en la demo), buscador y filtro por etiquetas, botones "Crear nuevo contenido" y **"Generar email con IA"**.
  - **Editor de email drag&drop**: panel de "Componentes" con: Texto, Imagen, Botón, Producto(s), Redes Sociales, "Ver en el navegador", Pie de página, HTML libre, Divisor, Espacio. Pestañas: General / Componentes / Plantillas / Variables. Soporte de **bloques globales reutilizables** (ej. un header que se reutiliza en toda la cuenta) y variables tipo `{{nombre}}`, `{{id-compra}}` para personalización dinámica. Vista previa, traducción multi-idioma y toggle "ver como código".
- **Contenido web** (on-site personalization / CRO): **3.100 piezas** en la demo. 5 tipos de formato: **Popup, Full Screen, Slide In, Floating Bar, Inline**; filtrables por "Con formulario" / "Sin formulario". Estados "En uso" / "Sin usar" / archivado, con histórico de exportación.
  - **Editor visual**: disposición en columnas (1 a 4 columnas), componentes básicos (Texto, Imagen, Botón enlace, Divisor, Espacio), avanzados (Productos dinámicos, HTML custom, botón de WhatsApp, Vídeo, Cuenta atrás/countdown), y un **bloque de Formulario y encuesta** completo (Texto, Número, Fecha, Email, Multilínea, Botón enviar, Radio, Selección, Checkbox...). Pestaña "General" con posicionamiento en pantalla (grid de 9 posiciones: esquinas/centros/centro), ancho en px y animaciones de entrada configurables (tipo y duración en ms).
- **Formularios** independientes (fuera de popups).
- **Notificaciones push web** y **push móvil**.
- **SMS**.
- **Bloques globales**: fragmentos reutilizables entre piezas de contenido.
- **Kit de marca**: feature de IA que **crea automáticamente un tema visual (logo, tipografía, colores) a partir de la URL de la web del cliente**, para que Copilot genere diseños "on-brand" en emails/popups sin configuración manual. También permite creación manual desde cero.

### 4.7 Comercio electrónico

- **Catálogo**: listado sincronizado de productos (imagen, nombre, ID, precio, estado — En stock/Descontinuado, categorías/breadcrumb, URL de ficha, fecha de creación), con sincronización automática y **verificación** contra la tienda real para evitar productos inventados/corruptos, más sincronización avanzada vía scraping o feed.
- **Segmentos de productos**: agrupaciones dinámicas de catálogo (ej. por categoría/precio) usables en personalización.
- **Compras**: histórico de pedidos con atribución a Connectif.
- **Cupones**: gestión/emisión de cupones de descuento (usados como acción dentro de workflows, ej. cumpleaños, reactivación).

### 4.8 Analítica

- **Dashboards** organizados en 4 bloques navegables desde un menú lateral propio:
  - *Comercio Electrónico*: Resumen, Compras, Carritos, Productos.
  - *Contenido*: Resumen, Email, Notificaciones push web, Contenido web, Notificaciones push móvil, SMS.
  - *Tráfico web*: Resumen.
  - *Contactos*: Resumen.
- Filtros globales por rango de fechas y por segmento ("Todos los contactos" + "Añadir segmento" para comparar cohortes).
- Widgets: KPIs numéricos con gráfico de líneas embebido, gráfico de anillo/donut con desglose "atribuido a Connectif Sí/No", **embudos de conversión** (web y app móvil por separado), tarjetas "pineables" para fijar la métrica favorita.
- **Data Explorer**: herramienta de exploración de datos más libre/tabular (para analistas).

### 4.9 Copilot (IA transversal)

- Botón flotante violeta (icono sparkles) presente en toda la app; al abrirse despliega un **panel oscuro con gradientes púrpura**, mensaje de bienvenida personalizado ("Buenos días {Nombre}, ¿en qué te puedo ayudar?"), campo de prompt libre y **tarjetas de sugerencias contextuales** (varían según la pantalla: en Analítica sugiere "Generar informe de resultados", "¿Cuántos contactos activos hay?", "¿Día de la semana con más compras?").
- Accesos rápidos por categoría en el menú contextual: Analítica → *Hablar sobre mis datos*; Email → *Genera un email*; Workflows → *Generar workflow*; Segmentos → *Generar segmento*; General → *Genera un texto / Reescribe / Revisa el texto / Cambia el tono / Traduce al...*.
- Guarda **historial de chats recientes**.
- Concepto clave: la IA no es un chatbot aislado, está **incrustada en cada módulo con acciones contextuales**, y usa el "Kit de marca" para mantener consistencia visual.

### 4.10 Ajustes (Settings)

- **Ajustes generales**: Detalles de tienda, Comercio electrónico (reglas de carrito abandonado, sincronización/verificación de catálogo), Gestión de miembros (usuarios/permisos del equipo).
- **Canales**: configuración técnica de Email, **Web** (script de integración, dominios autorizados, recolección de formularios/eventos, identidad cross-subdominio), Notificaciones Web Push, App móvil, SMS.
- **Integraciones**: Ads y Audiencias (probablemente Meta/Google Ads), **Plataformas e-commerce** con integraciones oficiales listadas (BigCommerce, Magento, Tiendanube, PrestaShop, Shopify, VTEX y más), **Integraciones personalizadas (webhooks)**, Extensiones.
- **API y accesos**: API Keys, IPs excluidas (allowlist de seguridad).
- **Facturación**: Facturación y Pago, Suscripción (modelo por consumo: actividades/eventos, emails enviados, créditos de Copilot).
- Sistema de **permisos granular por rol** (varias secciones mostraban "No tienes permisos para acceder a esta sección" con el usuario demo).

### 4.11 Multi-tienda / Multi-idioma

- Selector persistente en la esquina inferior izquierda: icono de cuenta (Connectif Demo) + bandera de idioma/tienda activa (ej. 🇪🇸 "Demo Store ES"), lo que confirma soporte **multi-tienda y multi-idioma** desde una misma cuenta, clave para grupos de e-commerce internacionales.

---

## 5. Consideraciones éticas y de datos (importante)

La cuenta explorada es una **demo con datos de ejemplo y algunos datos de clientes reales de Connectif usados como referencia de casos de uso** (nombres de integraciones como "Farmacia Rodriguez", "NIKE - Tiendas Fisicas Madrid", etc.), además de contactos reales con emails/teléfonos en la sección "Contactos" (175 mil registros). **Para esta documentación no se ha extraído, copiado ni incluido ningún dato personal identificable** (emails, teléfonos, nombres de contactos) — solo se documentó la existencia y el diseño de la funcionalidad. Al recrear la demo en GitHub se recomienda usar **exclusivamente datos ficticios generados** (Faker.js o similar), nunca los nombres de clientes/integraciones reales vistos en la cuenta.

---

## 6. Propuesta: demo interactiva más dinámica (con actividades y juegos)

La idea es **no clonar el SaaS real** (inviable y no aporta valor), sino construir una **experiencia educativa/showroom** que enseñe los mismos conceptos de forma más entretenida que un producto real, usando el mismo lenguaje visual (marca) documentado arriba.

### 6.1 Estructura de la demo (single-page app estática)

```
/ (Landing tipo "Hola {Nombre}" — dashboard falso con métricas animadas)
/workflow-lab      → Juego "Arma tu Workflow" (drag & drop)
/segment-quiz      → Quiz interactivo de segmentación de audiencias
/popup-designer    → Mini editor visual de popups (en vivo, sin backend)
/copilot-sim       → Simulador de chat con el "Copilot" (respuestas guionizadas)
/analytics-playground → Dashboard de analítica con datos simulados y sliders
```

### 6.2 Actividades/juegos concretos

1. **"Arma tu Workflow" (drag & drop, con puntuación)**
   Se da un objetivo de negocio (ej. "Recupera un carrito abandonado") y el usuario debe arrastrar, en orden correcto, disparador → condición → acción → espera → acción desde una paleta de nodos (idéntica visualmente a la real: rombo violeta, condición Sí/No, acción amarilla). Al completar bien la secuencia se anima la conexión y se suma puntaje; hay 5-6 retos con dificultad creciente (bienvenida, cumpleaños, reactivación de dormidos, cross-sell post-compra...).

2. **Quiz de segmentación**
   Preguntas tipo "¿Qué tipo de segmento usarías para: contactos que visitaron 'zapatillas running' 3 veces en 7 días?" con opciones (Estático / Dinámico / Dinámico Plus) y feedback educativo inmediato explicando el porqué.

3. **Popup Designer en vivo**
   Editor simplificado (sin backend) que replica el panel de "Contenido web": elegir tipo (Popup/Slide In/Floating Bar), arrastrar texto/imagen/botón, elegir posición en el grid de 9 celdas, ver preview en tiempo real sobre una mockup de tienda de fondo. Al final se puede "exportar" el HTML generado (realmente funcional, no solo cosmético).

4. **Simulador de Copilot**
   Chat con respuestas pre-programadas (sin IA real ni costo de API) que demuestra el patrón de sugerencias contextuales y el tema oscuro/púrpura, incluyendo un modo "genera un email" que rellena una plantilla en vivo.

5. **Analytics Playground**
   Dashboard con datos ficticios generados con semillas aleatorias + sliders para simular "qué pasaría si mejoro la tasa de apertura en un X%", recalculando KPIs en vivo (gamifica el entendimiento de métricas de e-commerce).

6. (Opcional, fase 2) **Modo "carrera contra el tiempo"**: cronómetro para armar el mayor número de workflows correctos posible en 60 segundos — leaderboard local (localStorage… salvo que se publique como Artifact, ver nota técnica).

### 6.3 Stack técnico recomendado

- **Vanilla HTML/CSS/JS** (o Vite + vanilla) para que sea 100% estático y desplegable gratis en **GitHub Pages**, sin backend.
- Sin frameworks pesados: se puede lograr el mismo look con CSS puro replicando los tokens documentados en la sección 2.
- Librería ligera de drag & drop (ej. `SortableJS` o implementación nativa con Drag and Drop API) para el juego de workflows.
- Persistencia de progreso/puntajes con `localStorage` (en el repo de GitHub; **no aplica la restricción de "no usar localStorage" de los artifacts de Claude**, esa limitación es solo para artifacts renderizados dentro de Claude — en un repo propio en GitHub Pages sí se puede usar libremente).
- Datos ficticios con una función `generateFakeContact()`/`generateFakeProduct()` simple, sin dependencias externas si se quiere mantener el bundle mínimo.

### 6.4 Estructura de carpetas sugerida para el repositorio

```
connectif-demo-recreation/
├── index.html                # Landing / dashboard falso
├── pages/
│   ├── workflow-lab.html
│   ├── segment-quiz.html
│   ├── popup-designer.html
│   ├── copilot-sim.html
│   └── analytics-playground.html
├── css/
│   ├── tokens.css            # Variables de marca (colores, tipografía, radios)
│   ├── layout.css            # Sidebar, topbar, grid general
│   └── components.css        # Cards, botones, chips, nodos de workflow
├── js/
│   ├── app.js                # Navegación / estado global
│   ├── workflow-lab.js
│   ├── segment-quiz.js
│   ├── popup-designer.js
│   ├── copilot-sim.js
│   └── fake-data.js          # Generadores de datos ficticios
├── assets/
│   ├── logo.svg              # Isotipo recreado (arco azul)
│   └── icons/                # Set de iconos lineales (sidebar)
├── docs/
│   └── DOCUMENTACION.md      # Este documento
└── README.md
```

---

## 7. Próximos pasos sugeridos

1. Revisar y ajustar la paleta/tipografía de este documento si tenés guidelines oficiales de marca propia distintas a las de Connectif (esta demo puede usar la marca de Connectif como inspiración de UX, pero para publicar conviene usar una marca ficticia propia, ej. "Flowmatic Demo", para evitar confusión con el producto real).
2. Priorizar 2-3 de las actividades propuestas para un MVP rápido (recomendado: Workflow Lab + Popup Designer, son las más "wow" visualmente).
3. Subir el esqueleto de proyecto (incluido en el ZIP entregado) a un repo de GitHub y activar GitHub Pages.
4. Iterar sobre contenido/copys en tono cercano, como el documentado en 2.5.
