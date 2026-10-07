# Portfolio de Luis Jardón Piquero

Web personal en **español e inglés**, hecha con Astro (salida estática), GSAP y Lenis. Paleta "Piedra": grises neutros,
un único acento verde y Geist Sans + Geist Mono.

## Estructura

```
src/data/contenido.ts        ← TODO el contenido (es + en): proyectos, experiencia, stack, flujos y textos de la interfaz
src/data/iconos.ts           ← logos de tecnologías (Simple Icons, incrustados)
src/components/Portada.astro ← la portada (sirve para los dos idiomas)
src/components/ProyectoPagina.astro ← la página de cada proyecto
src/components/Nav.astro, Pie.astro ← menú y pie
src/layouts/Base.astro       ← <head>: idioma, vista previa para redes, analítica opcional, paleta y fuentes
src/styles/portfolio.css     ← estilos
src/scripts/comun.ts         ← scroll suave, menú, logo, títulos (todas las páginas)
src/scripts/inicio.ts        ← mazo, flujo "¿Encajamos?", formulario… (portada)
src/pages/                   ← rutas: /, /en/, /proyectos/<slug>/, /en/projects/<slug>/
servidor/                    ← cabeceras de seguridad para Caddy y Umami opcional (ver servidor/README.md)
scripts/                     ← capturar-webs.mjs (capturas de página completa) y generar-og.mjs (imagen para redes)
originales/                  ← imágenes originales antes de pasarlas a WebP (no se publican)
```

## Comandos

```bash
npm run dev                       # http://localhost:4321 (en el lanzador de Claude: puerto 4420)
npm run build                     # genera dist/
node scripts/capturar-webs.mjs    # rehace public/img/completa/*.webp
node scripts/generar-og.mjs       # rehace public/og.png
```

## Configuración opcional (.env)

Ver `.env.example`: servicio de envío del formulario y Umami, ambos opcionales. Sin ellos la web funciona igual.

## Publicar

Copiar `dist/` a `/opt/portfolio` en el servidor `192.168.1.48` **sin borrar `/opt/portfolio/cafeteria`**.
