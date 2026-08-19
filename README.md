# Flowmatic Demo — Recreación educativa inspirada en Connectif

Demo estática (sin backend) inspirada en el diseño y las funcionalidades de una plataforma de **marketing
automation / personalización web** tipo Connectif, pensada para **enseñar los conceptos** (workflows,
segmentación, popups, analítica, IA copiloto) de forma **interactiva, con juegos y actividades**, en vez de
ser un clon 1:1 del producto real.

Todo el contenido (contactos, productos, métricas) es **100% ficticio**, generado en el cliente.

## Cómo probarla localmente

No requiere build ni instalación. Alcanza con abrir `index.html` en el navegador, o servirla con cualquier
servidor estático:

```bash
npx serve .
# o
python3 -m http.server 8080
```

## Publicar en GitHub Pages

1. Subí esta carpeta como repositorio a GitHub.
2. En **Settings → Pages**, elegí la rama `main` y la carpeta raíz (`/`).
3. Listo: la demo queda disponible en `https://<usuario>.github.io/<repo>/`.

## Estructura

```
index.html                    Dashboard simulado + accesos a las actividades
pages/
  workflow-lab.html           Juego: armá el workflow correcto arrastrando nodos
  segment-quiz.html           Quiz: estático vs dinámico vs dinámico plus
  popup-designer.html         Editor visual de popups en vivo (exporta HTML real)
  analytics-playground.html   Sliders que recalculan KPIs de e-commerce en vivo
css/                          Tokens de marca + layout + componentes + estilos por página
js/                           Lógica de cada actividad (vanilla JS, sin dependencias)
assets/                       Logo recreado (SVG)
docs/DOCUMENTACION.md         Análisis completo de la herramienta original + brand manual
```

## Por qué está hecho así

- **Sin frameworks ni build step**: para que cualquiera pueda clonar, abrir y entender el código, y para que
  se pueda publicar gratis en GitHub Pages sin pipelines.
- **Sin datos reales**: todos los nombres, emails y métricas se generan con `js/fake-data.js`.
- **Componentes reutilizables por CSS variables** (`css/tokens.css`): cambiar la marca (colores, tipografía,
  logo) es cuestión de editar ese único archivo.

## Roadmap sugerido (ver `docs/DOCUMENTACION.md` §6-7)

- [ ] Simulador de chat "Copilot" con más respuestas guionizadas (ya hay una versión base como widget flotante
      en todas las páginas).
- [ ] Modo "carrera contra el tiempo" en el Workflow Lab con leaderboard en `localStorage`.
- [ ] Más retos en el Quiz y en el Workflow Lab.
- [ ] Reemplazar la marca "Flowmatic Demo" por una marca propia definitiva antes de compartir públicamente.
