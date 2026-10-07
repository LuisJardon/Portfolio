// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://luisjardonpiquero.com',
  trailingSlash: 'ignore',
  // El CSS va dentro del HTML: la primera pintura no espera a descargar una hoja de estilos aparte.
  build: { inlineStylesheets: 'always' },
  integrations: [
    // Mapa del sitio con las dos versiones de cada página enlazadas (español por defecto, inglés en /en/).
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', en: 'en-GB' } },
      filter: (pagina) => !pagina.includes('/404'),
    }),
  ],
});
