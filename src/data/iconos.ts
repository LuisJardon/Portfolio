// Logos de tecnologías desde Simple Icons (se incrustan como SVG en la página, sin peticiones externas).
import * as si from "simple-icons";

const porSlug = new Map<string, { path: string; title: string }>();
for (const icono of Object.values(si) as { slug?: string; path?: string; title?: string }[]) {
  if (icono?.slug && icono.path) porSlug.set(icono.slug, { path: icono.path, title: icono.title ?? icono.slug });
}

/** Trazo SVG (viewBox 0 0 24 24) del logo, o null si no existe. */
export const icono = (slug: string) => (slug ? porSlug.get(slug)?.path ?? null : null);

/** Slug de Simple Icons para el nombre de una tecnología tal como aparece en los proyectos. */
const alias: Record<string, string> = {
  "Three.js": "threedotjs", HTML: "html5", CSS: "css", Java: "openjdk", "Android Studio": "androidstudio",
  OpenMediaVault: "openmediavault", PostgreSQL: "postgresql", TypeScript: "typescript", JavaScript: "javascript",
};
export const iconoDe = (nombre: string) => icono(alias[nombre] ?? nombre.toLowerCase().replace(/[^a-z0-9]/g, ""));
