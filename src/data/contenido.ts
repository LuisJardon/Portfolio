// Todo el contenido del portfolio, en español y en inglés.
// Para cambiar textos, proyectos o experiencia se edita solo este archivo (las dos lenguas tienen la misma forma).

export type Lang = "es" | "en";
type Txt = Record<Lang, string>;

export const persona = {
  nombre: "Luis Jardón Piquero",
  email: "luisjardonpiquero@gmail.com",
  linkedin: "https://www.linkedin.com/in/luis-jard%C3%B3n-p/",
  github: "https://github.com/LuisJardon",
  web: "https://luisjardonpiquero.com",
  cv: { es: "CV-Luis-Jardon-Piquero.pdf", en: "CV-Luis-Jardon-Piquero-EN.pdf" } as Record<"es" | "en", string>,
};

// Rutas de cada idioma (la portada y las páginas de proyecto).
export const rutas = {
  es: { inicio: "/", proyecto: (slug: string) => `/proyectos/${slug}/` },
  en: { inicio: "/en/", proyecto: (slug: string) => `/en/projects/${slug}/` },
};

/* ---------------- Proyectos ---------------- */

export interface Proyecto {
  slug: string;
  titulo: string;
  destacado: boolean;
  anio: string;
  tipo: Txt;
  desc: Txt;
  tags: string[];
  img: string;
  alt: Txt;
  /** Imagen tipo icono: no se recorta. */
  encaje?: "icono";
  /** Captura de la página de inicio entera (public/img/completa/). */
  completa?: string;
  web?: string;
  repo?: string;
  nota?: Txt;
  /** Proyecto de cliente aún sin publicar: solo se ve la tarjeta (sin enlace ni página de detalles). */
  privado?: boolean;
  /** Página interna del proyecto. */
  pagina: {
    rol: Txt;
    resumen: Txt;
    reto: Txt;
    hecho: Record<Lang, string[]>;
    resultado: Txt;
    stack: string[];
    galeria?: { img: string; alt: Txt }[];
    /* --- Historia ampliada (proyectos que no son una web que se pueda visitar) --- */
    /** Por qué lo hice, en primera persona. */
    porque?: Txt;
    /** Cifras reales en una franja. */
    cifras?: { valor: string; etiqueta: Txt }[];
    /** Esquema de cómo funciona: cadena de piezas, ramas al final y base sobre la que corre todo. */
    esquema?: { cadena: Pieza[]; ramas?: Pieza[]; base?: Pieza; nota?: Txt };
    /** La historia por capítulos. */
    capitulos?: { cuando?: Txt; titulo: Txt; texto: Txt }[];
    /** Problemas reales y cómo los resolví. */
    problemas?: { problema: Txt; solucion: Txt }[];
    cita?: Txt;
    /** Lo siguiente que quiero hacer. */
    siguiente?: Record<Lang, string[]>;
    /** Capturas de una app móvil (se muestran en marcos de móvil). */
    pantallas?: { img: string; alt: Txt }[];
  };
}

type Pieza = { titulo: Txt; detalle: Txt };

/** Proyectos con página de detalles propia (los privados no la tienen). */
export const conPagina = () => proyectos.filter((p) => !p.privado);

export const proyectos: Proyecto[] = [
  {
    slug: "cafe-jardon",
    titulo: "Café Jardón",
    destacado: true,
    anio: "2026",
    tipo: { es: "Demo", en: "Demo" },
    desc: {
      es: "Web para una cafetería de especialidad en Gijón: intro en 3D, cada café en su recipiente real al hacer scroll y un configurador para hacerte tu pedido.",
      en: "Website for a specialty coffee shop in Gijón: a 3D intro, every coffee in its real cup as you scroll, and a builder to put together your order.",
    },
    tags: ["Astro", "Three.js", "GSAP"],
    img: "cafe-jardon.webp",
    alt: { es: "Portada de Café Jardón con vasos de café en 3D", en: "Café Jardón home page with 3D coffee cups" },
    completa: "completa/cafe-jardon.webp",
    web: "https://luisjardonpiquero.com/cafeteria/",
    repo: "https://github.com/LuisJardon/cafe-jardon",
    pagina: {
      rol: { es: "Diseño, 3D y desarrollo", en: "Design, 3D and development" },
      resumen: {
        es: "Una cafetería ficticia de Gijón para enseñar lo que se puede hacer con 3D y animación en una web que, además, funciona: eliges tu café y haces el pedido.",
        en: "A made-up coffee shop in Gijón to show what 3D and motion can do on a site that also works: you build your coffee and place the order.",
      },
      reto: {
        es: "Que una web con mucho movimiento siga siendo fácil de leer, rápida en móvil y útil, no solo bonita.",
        en: "Keeping a motion-heavy site easy to read, fast on mobile and actually useful, not just pretty.",
      },
      hecho: {
        es: [
          "Escena 3D modelada por código con Three.js: vasos con el logo, un grano que se parte y rasga la pantalla.",
          "Cada bebida en su recipiente real (espresso en demitasse, latte en vaso, Chemex para el filtro), documentado antes de modelarlo.",
          "Configurador \"Hazte tu café\" con precio en vivo y pedido guardado en el navegador.",
          "Versión móvil propia: el 3D se coloca midiendo el hueco libre para no tapar nunca el texto.",
        ],
        en: [
          "3D scene modelled in code with Three.js: branded cups and a coffee bean that cracks and tears the screen.",
          "Every drink in its real vessel (espresso in a demitasse, latte in a glass, Chemex for filter), researched before modelling.",
          "\"Build your coffee\" configurator with live pricing and an order saved in the browser.",
          "A dedicated mobile layout: the 3D measures the free space so it never covers text.",
        ],
      },
      resultado: {
        es: "Publicada en mi dominio y en GitHub Pages, con despliegue automático en cada cambio.",
        en: "Live on my domain and on GitHub Pages, deployed automatically on every change.",
      },
      stack: ["Astro", "TypeScript", "Three.js", "GSAP", "Lenis"],
    },
  },
  {
    slug: "judo-astures",
    titulo: "Judo Astures",
    destacado: true,
    anio: "2026",
    tipo: { es: "Freelance", en: "Freelance" },
    desc: {
      es: "Web para un club de judo con cinco sedes en Asturias, pensada para que las familias reserven una clase de prueba. Mapa interactivo de sedes y accesibilidad cuidada.",
      en: "Website for a judo club with five locations in Asturias, built so families book a free trial class. Interactive map of locations and careful accessibility.",
    },
    tags: ["Astro", "TypeScript", "GSAP", "Leaflet"],
    img: "judo-astures.webp",
    alt: { es: "Portada de la web de Judo Astures", en: "Judo Astures home page" },
    completa: "completa/judo-astures.webp",
    // Privado hasta que el club lance la web: para mostrarlo entero, quitar "privado" (vuelve el enlace y su página).
    privado: true,
    nota: { es: "Proyecto para un cliente · se publicará con su lanzamiento", en: "Client project · goes public at launch" },
    pagina: {
      rol: { es: "Proyecto freelance completo", en: "End-to-end freelance project" },
      resumen: {
        es: "Un club con veinte años de historia y cinco sedes necesitaba una web que se sintiera como entrar en un dojo y que llevara a una sola acción: reservar la clase de prueba.",
        en: "A club with twenty years of history and five locations needed a site that feels like walking into a dojo and leads to one action: booking the trial class.",
      },
      reto: {
        es: "Evitar la típica plantilla de gimnasio y ordenar mucha información (sedes, horarios, grupos) sin abrumar a una familia que entra por primera vez.",
        en: "Avoiding the usual gym template and organising a lot of information (locations, timetables, groups) without overwhelming a family visiting for the first time.",
      },
      hecho: {
        es: [
          "Identidad \"judo japonés, carácter asturiano\": kanji como textura, el obi como hilo conductor y fotos reales.",
          "Mapa interactivo de las cinco sedes con Leaflet y OpenStreetMap, sin servicios de pago.",
          "Horarios y contenido editables desde archivos de datos, sin tocar el diseño.",
          "Accesibilidad: contraste, textos alternativos y versión sin animaciones.",
        ],
        en: [
          "\"Japanese judo, Asturian character\" identity: kanji as texture, the obi as a running thread, real photos.",
          "Interactive map of the five locations with Leaflet and OpenStreetMap, no paid services.",
          "Timetables and content editable from data files, without touching the design.",
          "Accessibility: contrast, alt text and a reduced-motion version.",
        ],
      },
      resultado: {
        es: "Terminada y validada con el club; se publicará cuando tengan su dominio.",
        en: "Finished and reviewed with the club; it goes live once their domain is ready.",
      },
      stack: ["Astro", "TypeScript", "GSAP", "Lenis", "Leaflet"],
    },
  },
  {
    slug: "gestionbarber",
    titulo: "GestionBarber",
    destacado: true,
    anio: "2026",
    tipo: { es: "Full stack · En producción", en: "Full stack · In production" },
    desc: {
      es: "Reservas online, panel de administración, autenticación JWT, chatbot de preguntas frecuentes y app Android nativa. Desplegada con Docker en mi servidor.",
      en: "Online booking, admin dashboard, JWT authentication, an FAQ chatbot and a native Android app. Deployed with Docker on my own server.",
    },
    tags: ["React", "FastAPI", "MySQL", "Android", "Docker"],
    img: "gestionbarber.webp",
    alt: { es: "Interior de una barbería moderna", en: "Inside a modern barbershop" },
    completa: "completa/gestionbarber.webp",
    web: "https://gestionbarber.rozadasnas.duckdns.org",
    repo: "https://github.com/LuisJardon/GestionBarber",
    pagina: {
      rol: { es: "Proyecto de fin de grado · todo el stack", en: "Final degree project · whole stack" },
      resumen: {
        es: "Plataforma de reservas para una barbería: el cliente pide cita desde la web o desde la app Android y el negocio gestiona empleados, horarios y reservas desde un panel.",
        en: "A booking platform for a barbershop: customers book from the website or the Android app, and the business manages staff, schedules and bookings from a dashboard.",
      },
      reto: {
        es: "Construir un producto completo y real, de la base de datos al móvil, y mantenerlo en producción por mi cuenta.",
        en: "Building a complete, real product, from the database to the phone, and keeping it in production on my own.",
      },
      hecho: {
        es: [
          "API en FastAPI con SQLAlchemy y MySQL, autenticación JWT y roles de cliente y administrador.",
          "Web en React 19 + TypeScript: reservas, panel de administración y chatbot de preguntas frecuentes.",
          "App Android nativa (Java + Retrofit) que usa la misma API.",
          "Despliegue con Docker Compose, proxy con HTTPS y fail2ban en mi propio servidor.",
        ],
        en: [
          "FastAPI backend with SQLAlchemy and MySQL, JWT authentication and customer/admin roles.",
          "React 19 + TypeScript web app: bookings, admin dashboard and an FAQ chatbot.",
          "Native Android app (Java + Retrofit) on the same API.",
          "Deployed with Docker Compose, an HTTPS proxy and fail2ban on my own server.",
        ],
      },
      resultado: {
        es: "En producción y redesplegada desde cero cuando se perdió el servidor original.",
        en: "In production, and redeployed from scratch when the original server was lost.",
      },
      stack: ["React", "TypeScript", "Vite", "FastAPI", "Python", "MySQL", "Android", "Docker", "Nginx"],
    },
  },
  {
    slug: "veoveo",
    titulo: "VeoVeo",
    destacado: false,
    anio: "2025",
    tipo: { es: "App Android", en: "Android app" },
    desc: {
      es: "App para llevar el registro de películas y series vistas y pendientes, con API REST propia en Flask que corre en mi servidor.",
      en: "An app to keep track of watched and pending films and series, with its own Flask REST API running on my server.",
    },
    tags: ["Android", "Flask", "SQLite"],
    img: "veoveo.webp",
    alt: { es: "Icono de la app VeoVeo", en: "VeoVeo app icon" },
    encaje: "icono",
    repo: "https://github.com/LuisJardon/VeoVeoApp",
    pagina: {
      rol: { es: "Proyecto personal · todo el stack", en: "Personal project · whole stack" },
      resumen: {
        es: "Una app Android para buscar películas y series, puntuarlas y llevar la cuenta de lo que he visto y de lo que me queda, con su propia API en mi servidor.",
        en: "An Android app to search films and series, rate them and keep track of what I've watched and what's left, with its own API on my server.",
      },
      reto: { es: "", en: "" },
      hecho: { es: [], en: [] },
      porque: {
        es: "Quería algo muy simple: no perder la cuenta de qué películas y series había visto y cuáles tenía pendientes. En vez de depender de una app de terceros, me hice la mía, con mis datos guardados en mi propio servidor. Y de paso era la excusa perfecta para construir una app Android completa, de la pantalla a la base de datos.",
        en: "I wanted something very simple: never lose track of which films and series I'd watched and which were still pending. Instead of relying on a third-party app, I built my own, with my data stored on my own server. It was also the perfect excuse to build a complete Android app, from the screen to the database.",
      },
      pantallas: [
        { img: "veoveo/buscar.webp", alt: { es: "Buscador de VeoVeo con los resultados de «Titanic»", en: "VeoVeo search showing results for “Titanic”" } },
        { img: "veoveo/ficha.webp", alt: { es: "Ficha de una película con sinopsis, director, actores y género", en: "Film page with synopsis, director, cast and genre" } },
        { img: "veoveo/nota.webp", alt: { es: "Ventana para puntuar la película con estrellas", en: "Dialog to rate the film with stars" } },
        { img: "veoveo/vistas.webp", alt: { es: "Lista «Mis películas vistas» ordenable por nota o por fecha", en: "“My watched films” list, sortable by rating or date" } },
      ],
      esquema: {
        cadena: [
          { titulo: { es: "Tu móvil", en: "Your phone" }, detalle: { es: "App Android en Java", en: "Android app in Java" } },
          { titulo: { es: "HTTPS", en: "HTTPS" }, detalle: { es: "Subdominio propio detrás de Caddy", en: "Own subdomain behind Caddy" } },
          { titulo: { es: "API propia", en: "Own API" }, detalle: { es: "Flask en un contenedor Docker", en: "Flask in a Docker container" } },
          { titulo: { es: "Base de datos", en: "Database" }, detalle: { es: "SQLite: vistas, pendientes y notas", en: "SQLite: watched, pending and ratings" } },
        ],
        nota: {
          es: "La búsqueda, los carteles y las fichas vienen de la API pública de OMDb, que la app consulta directamente.",
          en: "Search results, posters and film details come from the public OMDb API, called straight from the app.",
        },
      },
      capitulos: [
        {
          titulo: { es: "La idea", en: "The idea" },
          texto: {
            es: "Empezó como proyecto de 2.º de DAM: una app Android nativa, en Java, para buscar películas y series y apuntar las que ves. Quería que pareciera una app de verdad, no un ejercicio, así que le di una estética de cine clásico, con palomitas y claquetas de fondo.",
            en: "It started as a second-year DAM project: a native Android app, in Java, to search films and series and log the ones you watch. I wanted it to feel like a real app, not an exercise, so I gave it a classic-cinema look with popcorn and clapperboards in the background.",
          },
        },
        {
          titulo: { es: "Buscar sin construir un catálogo", en: "Search without building a catalogue" },
          texto: {
            es: "En lugar de cargar yo miles de títulos, la app consulta la API de OMDb: escribes «Titanic» y aparecen el cartel, el año, la duración, la sinopsis, el director, los actores y el género. Retrofit hace las peticiones, Glide carga los carteles y Shimmer rellena el hueco mientras llegan los datos.",
            en: "Instead of loading thousands of titles myself, the app queries the OMDb API: type “Titanic” and you get the poster, year, runtime, synopsis, director, cast and genre. Retrofit handles the requests, Glide loads the posters and Shimmer fills the gap while data arrives.",
          },
        },
        {
          titulo: { es: "Mi lista, con nota", en: "My list, with ratings" },
          texto: {
            es: "Cada título se marca como visto con una nota de estrellas (con medias estrellas incluidas) o se manda a pendientes. En «Mis películas vistas» se ordenan por nota o por fecha, para acordarme de qué me gustó más y de qué vi último.",
            en: "Each title can be marked as watched with a star rating (half stars included) or sent to the pending list. “My watched films” can be sorted by rating or by date, so I remember what I liked most and what I watched last.",
          },
        },
        {
          titulo: { es: "Una API propia", en: "An API of my own" },
          texto: {
            es: "Lo que guardas no se queda solo en el móvil: lo recibe una API REST que escribí en Flask, con inicio de sesión y su base de datos SQLite. Al principio solo funcionaba conectado a la wifi de casa.",
            en: "What you save doesn't just stay on the phone: it goes to a REST API I wrote in Flask, with login and its own SQLite database. At first it only worked on my home wifi.",
          },
        },
        {
          titulo: { es: "Sacarla de casa", en: "Taking it out of the house" },
          texto: {
            es: "Hoy la API corre en un contenedor Docker de mi servidor, publicada con su propio subdominio y certificado HTTPS. La app funciona igual con wifi que con datos móviles, esté donde esté.",
            en: "Today the API runs in a Docker container on my server, published with its own subdomain and HTTPS certificate. The app works the same on wifi or mobile data, wherever I am.",
          },
        },
      ],
      problemas: [
        {
          problema: { es: "La app dejó de conectar porque la dirección del servidor estaba escrita dentro del código.", en: "The app stopped connecting because the server address was hard-coded." },
          solucion: { es: "La saqué a la configuración de compilación: cambiar de servidor ya no obliga a tocar el código.", en: "I moved it into the build configuration, so changing servers no longer means touching the code." },
        },
        {
          problema: { es: "Con datos móviles no llegaba a la API, que solo era accesible desde la red de casa.", en: "On mobile data the app couldn't reach the API, which was only reachable from my home network." },
          solucion: { es: "La publiqué detrás del proxy de mi servidor, con dominio propio y HTTPS, en vez de abrir puertos a pelo.", en: "I published it behind my server's proxy, with its own domain and HTTPS, instead of just opening ports." },
        },
        {
          problema: { es: "Las pantallas se veían vacías mientras cargaban los carteles.", en: "Screens looked empty while posters were loading." },
          solucion: { es: "Un esqueleto animado (Shimmer) ocupa el sitio mientras llegan los datos, y Glide guarda los carteles en caché.", en: "An animated skeleton (Shimmer) holds the space while data arrives, and Glide caches the posters." },
        },
      ],
      resultado: {
        es: "Es la app que uso para llevar mis películas y series. Y me enseñó a pensar en todo el recorrido: lo que ve el usuario, la API que hay detrás y el servidor donde vive.",
        en: "It's the app I use to keep track of my films and series. And it taught me to think about the whole journey: what the user sees, the API behind it and the server it lives on.",
      },
      stack: ["Android", "Java", "Retrofit", "Flask", "Python", "SQLite", "Docker"],
    },
  },
  {
    slug: "home-lab",
    titulo: "Home Lab",
    destacado: false,
    anio: "2024-2026",
    tipo: { es: "Infraestructura", en: "Infrastructure" },
    desc: {
      es: "Mi propio servidor con Debian y Docker: proxy con HTTPS automático, automatizaciones con n8n y los proyectos de esta página. Esta web también se sirve desde ahí.",
      en: "My own server with Debian and Docker: an automatic-HTTPS proxy, n8n automations and the projects on this page. This site is served from it too.",
    },
    tags: ["Linux", "Docker", "Caddy", "n8n"],
    img: "nas_home_server.webp",
    alt: { es: "Portátil y discos de un servidor casero sobre una mesa", en: "Laptop and drives of a home server on a desk" },
    pagina: {
      rol: { es: "Administración de sistemas", en: "Systems administration" },
      resumen: {
        es: "Un portátil antiguo convertido en servidor: empezó como NAS para mis archivos y hoy sirve esta web, GestionBarber, VeoVeo y mis automatizaciones.",
        en: "An old laptop turned into a server: it started as a NAS for my files and now serves this site, GestionBarber, VeoVeo and my automations.",
      },
      reto: { es: "", en: "" },
      hecho: { es: [], en: [] },
      porque: {
        es: "Nació de la curiosidad y de una necesidad: tener un sitio propio para mis archivos y una plataforma donde experimentar las 24 horas sin depender de la nube. Un portátil viejo que ya no usaba era el candidato perfecto: si rompía algo, solo rompía mi laboratorio.",
        en: "It came from curiosity and a need: a place of my own for my files and a platform to experiment on around the clock without relying on the cloud. An old laptop I no longer used was the perfect candidate: if I broke something, I only broke my lab.",
      },
      cifras: [
        { valor: "6", etiqueta: { es: "contenedores en marcha", en: "containers running" } },
        { valor: "6", etiqueta: { es: "dominios con HTTPS automático", en: "domains with automatic HTTPS" } },
        { valor: "5 min", etiqueta: { es: "entre actualizaciones del DNS", en: "between DNS updates" } },
        { valor: "2 días", etiqueta: { es: "para reconstruirlo desde cero", en: "to rebuild it from scratch" } },
      ],
      esquema: {
        cadena: [
          { titulo: { es: "Internet", en: "Internet" }, detalle: { es: "Alguien abre luisjardonpiquero.com", en: "Someone opens luisjardonpiquero.com" } },
          { titulo: { es: "DNS", en: "DNS" }, detalle: { es: "Dominio propio + DuckDNS, al día aunque cambie la IP", en: "Own domain + DuckDNS, kept current when the IP changes" } },
          { titulo: { es: "Router", en: "Router" }, detalle: { es: "Solo los puertos 80 y 443 hacia el servidor", en: "Only ports 80 and 443 to the server" } },
          { titulo: { es: "Caddy", en: "Caddy" }, detalle: { es: "Proxy con certificados HTTPS automáticos", en: "Proxy with automatic HTTPS certificates" } },
        ],
        ramas: [
          { titulo: { es: "Este portfolio", en: "This portfolio" }, detalle: { es: "Web estática en Astro", en: "Static Astro site" } },
          { titulo: { es: "GestionBarber", en: "GestionBarber" }, detalle: { es: "React + FastAPI + MySQL", en: "React + FastAPI + MySQL" } },
          { titulo: { es: "VeoVeo", en: "VeoVeo" }, detalle: { es: "API en Flask", en: "Flask API" } },
          { titulo: { es: "n8n", en: "n8n" }, detalle: { es: "Automatizaciones", en: "Automations" } },
        ],
        base: { titulo: { es: "Un portátil antiguo", en: "An old laptop" }, detalle: { es: "OpenMediaVault (Debian) + Docker Compose", en: "OpenMediaVault (Debian) + Docker Compose" } },
      },
      capitulos: [
        {
          titulo: { es: "Un portátil viejo, un NAS nuevo", en: "An old laptop, a new NAS" },
          texto: {
            es: "Lo primero fue convertirlo en un NAS de verdad con OpenMediaVault: usuarios, permisos y, sobre todo, una estructura de carpetas que separa los datos personales, las copias de seguridad y los volúmenes de Docker. Así puedo trastear con contenedores sin miedo a romper mis fotos o mis documentos.",
            en: "The first step was turning it into a proper NAS with OpenMediaVault: users, permissions and, above all, a folder structure that keeps personal data, backups and Docker volumes apart. That way I can tinker with containers without fear of breaking my photos or documents.",
          },
        },
        {
          titulo: { es: "Primero, la seguridad", en: "Security first" },
          texto: {
            es: "Antes de exponer nada a internet tocaba cerrar puertas: un usuario propio con permisos de administración para el día a día, acceso SSH controlado y entender de verdad qué implica cada puerto abierto. Fue mi primera lección práctica de ciberseguridad.",
            en: "Before exposing anything to the internet I had to close doors: my own user with admin rights for everyday work, controlled SSH access and really understanding what every open port means. It was my first hands-on cybersecurity lesson.",
          },
        },
        {
          titulo: { es: "De disco en red a servidor de aplicaciones", en: "From network drive to app server" },
          texto: {
            es: "Con la base estable llegó Docker, y con Portainer pude gestionar los contenedores, ver sus registros en tiempo real y saber de un vistazo qué estaba funcionando. Ahí el portátil dejó de ser un disco en red y pasó a ser un servidor.",
            en: "With a stable base came Docker, and Portainer let me manage containers, read their logs in real time and see at a glance what was running. That's when the laptop stopped being a network drive and became a server.",
          },
        },
        {
          titulo: { es: "Automatizar con n8n", en: "Automating with n8n" },
          texto: {
            es: "Quería flujos que conectaran servicios y APIs, así que monté n8n con su base de datos en una red interna de Docker: solo n8n puede hablar con ella y nada queda expuesto sin necesidad.",
            en: "I wanted workflows that connect services and APIs, so I set up n8n with its database on an internal Docker network: only n8n can talk to it and nothing is exposed without reason.",
          },
        },
        {
          titulo: { es: "La pelea con la red", en: "Wrestling with the network" },
          texto: {
            es: "Aquí choqué con la realidad de las redes domésticas: puertos internos y externos, el reenvío en el router y una IP pública que cambia cuando quiere. Lo resolví con DNS dinámico: un temporizador actualiza DuckDNS cada cinco minutos, así que los dominios siempre apuntan a casa.",
            en: "This is where I hit the reality of home networks: internal and external ports, router forwarding and a public IP that changes whenever it likes. I solved it with dynamic DNS: a timer updates DuckDNS every five minutes, so the domains always point home.",
          },
        },
        {
          cuando: { es: "Septiembre de 2026", en: "September 2026" },
          titulo: { es: "El día que perdí el servidor", en: "The day I lost the server" },
          texto: {
            es: "El servidor donde corría todo dejó de existir, y con él GestionBarber, VeoVeo, n8n y el portfolio. En vez de reinstalar a lo loco, primero escribí un plan por capas (red, sistema, acceso, contenedores, proxy, copias y monitorización) y después lo reconstruí todo en este portátil en dos días: formateo, IP fija reservada en el router, el portátil configurado para no dormirse al cerrar la tapa, cada servicio descrito en Docker Compose y Caddy delante con HTTPS automático.",
            en: "The server everything ran on was gone, and with it GestionBarber, VeoVeo, n8n and the portfolio. Instead of reinstalling in a rush, I first wrote a plan by layers (network, system, access, containers, proxy, backups and monitoring) and then rebuilt everything on this laptop in two days: a clean install, a fixed IP reserved on the router, the laptop set not to sleep when the lid closes, every service described in Docker Compose and Caddy in front with automatic HTTPS.",
          },
        },
        {
          cuando: { es: "Hoy", en: "Today" },
          titulo: { es: "La base de todo lo que publico", en: "The base for everything I publish" },
          texto: {
            es: "Desde ese portátil se sirven esta web, la demo de Café Jardón, GestionBarber, la API de VeoVeo y n8n, cada uno con su dominio y su certificado. Y todo está documentado paso a paso, para que la próxima vez reconstruirlo sea cuestión de horas.",
            en: "That laptop serves this site, the Café Jardón demo, GestionBarber, the VeoVeo API and n8n, each with its own domain and certificate. And it's all documented step by step, so next time rebuilding it is a matter of hours.",
          },
        },
      ],
      problemas: [
        {
          problema: { es: "El panel de OpenMediaVault ocupaba el puerto 80 y Caddy no podía conseguir los certificados HTTPS.", en: "The OpenMediaVault panel was using port 80, so Caddy couldn't obtain HTTPS certificates." },
          solucion: { es: "Moví el panel a otro puerto, solo accesible desde casa, y dejé el 80 y el 443 para Caddy.", en: "I moved the panel to another port, reachable only from home, and left 80 and 443 to Caddy." },
        },
        {
          problema: { es: "La IP pública de casa cambia sin avisar y los dominios dejaban de apuntar al servidor.", en: "My home public IP changes without warning, and the domains stopped pointing to the server." },
          solucion: { es: "Un temporizador de systemd actualiza DuckDNS cada cinco minutos y al arrancar.", en: "A systemd timer updates DuckDNS every five minutes and at boot." },
        },
        {
          problema: { es: "Al ser un portátil, se suspendía al cerrar la tapa y perdía la conexión.", en: "Being a laptop, it went to sleep when the lid closed and dropped the connection." },
          solucion: { es: "Desactivé la suspensión por tapa e inactividad: ahora trabaja cerrado, como un servidor.", en: "I disabled lid and idle suspend: it now works closed, like a server." },
        },
        {
          problema: { es: "Al principio cada servicio estaba instalado «como fue saliendo» y era difícil rehacerlo.", en: "At first every service was installed “as it came”, which made it hard to rebuild." },
          solucion: { es: "Ahora todo está en Docker Compose: unos pocos archivos describen el servidor entero y reconstruirlo es repetible.", en: "Now everything lives in Docker Compose: a few files describe the whole server and rebuilding it is repeatable." },
        },
      ],
      cita: {
        es: "No tiene sentido montar un servidor potente si dejas la puerta principal abierta.",
        en: "There's no point building a powerful server if you leave the front door open.",
      },
      resultado: {
        es: "Este proyecto ha sido mi máster personal en administración de sistemas: un servidor casero es un 20 % instalación y un 80 % mantenimiento y diseño. Ahora entiendo qué pasa «bajo el capó» de cada servicio que uso.",
        en: "This project has been my personal master's in systems administration: a home server is 20% installation and 80% maintenance and design. Now I understand what happens under the hood of every service I use.",
      },
      siguiente: {
        es: [
          "Acceso remoto por Tailscale, con SSH solo por clave y doble factor.",
          "Copias de seguridad 3-2-1, con una copia fuera de casa.",
          "Monitorización con Uptime Kuma y avisos al móvil si algo se cae.",
        ],
        en: [
          "Remote access through Tailscale, with key-only SSH and two-factor auth.",
          "3-2-1 backups, with one copy off-site.",
          "Monitoring with Uptime Kuma and phone alerts if anything goes down.",
        ],
      },
      stack: ["Debian", "OpenMediaVault", "Docker", "Portainer", "Caddy", "n8n", "Linux"],
    },
  },
  {
    slug: "happiness-co",
    titulo: "Happiness&Co",
    destacado: false,
    anio: "2024",
    tipo: { es: "Web", en: "Website" },
    desc: {
      es: "Plataforma de eventos locales en Gijón: conciertos, festivales y actividades culturales.",
      en: "Local events platform for Gijón: concerts, festivals and cultural activities.",
    },
    tags: ["HTML", "CSS"],
    img: "happiness_mockup.webp",
    alt: { es: "Portátil mostrando la web de Happiness&Co", en: "Laptop showing the Happiness&Co website" },
    completa: "completa/happiness.webp",
    web: "https://luisjp1999.neocities.org/",
    pagina: {
      rol: { es: "Primer proyecto web", en: "First web project" },
      resumen: {
        es: "Una agenda de eventos de Gijón hecha a mano con HTML y CSS, mi primera web publicada.",
        en: "A hand-coded HTML and CSS events guide for Gijón, the first website I published.",
      },
      reto: { es: "Publicar algo real por primera vez, de principio a fin.", en: "Shipping something real for the first time, end to end." },
      hecho: {
        es: ["Maquetación con HTML y CSS, sin frameworks.", "Secciones de eventos, galería y contacto.", "Publicada en Neocities."],
        en: ["Layout in plain HTML and CSS, no frameworks.", "Events, gallery and contact sections.", "Published on Neocities."],
      },
      resultado: { es: "El punto de partida: comparar esta web con las de arriba es ver todo lo aprendido.", en: "The starting point: comparing it with the projects above shows how far I've come." },
      stack: ["HTML", "CSS"],
    },
  },
];

/* ---------------- Experiencia, stack y formación ---------------- */

export const experiencia = [
  { empresa: "Grupo Cobra", cuando: { es: "Ahora", en: "Now" }, rol: { es: "Desarrollador de automatizaciones", en: "Automation developer" }, desc: { es: "Automatización de procesos internos para quitar tareas manuales. Colaboración a tiempo parcial.", en: "Automating internal processes to remove manual work. Part-time collaboration." } },
  { empresa: "Capgemini", cuando: { es: "2026", en: "2026" }, rol: { es: "Desarrollador Salesforce", en: "Salesforce developer" }, desc: { es: "Acelerador a medida en Salesforce para automatizar el envío de comunicaciones. Componentes con Lightning Web Components y lógica en Apex.", en: "Custom Salesforce accelerator to automate outgoing communications. Lightning Web Components and Apex logic." } },
  { empresa: "Funiverse", cuando: { es: "2025", en: "2025" }, rol: { es: "Desarrollador web frontend", en: "Frontend web developer" }, desc: { es: "Sitio web desde cero con HTML5, CSS3 y JavaScript, adaptado a móvil. Mantenimiento evolutivo y resolución de incidencias.", en: "Website from scratch with HTML5, CSS3 and JavaScript, mobile-friendly. Ongoing maintenance and bug fixing." } },
  { empresa: "Introvisual", cuando: { es: "2025", en: "2025" }, rol: { es: "Desarrollador web y consultor SEO", en: "Web developer and SEO consultant" }, desc: { es: "SEO orgánico, estructura web y palabras clave para mejorar la visibilidad. Contenidos en WordPress.", en: "Organic SEO, site structure and keywords to improve visibility. WordPress content." } },
];

// Iconos: slug de Simple Icons (https://simpleicons.org). Vacío = sin icono.
export const stack: { grupo: Txt; items: [string, string][] }[] = [
  { grupo: { es: "Frontend", en: "Frontend" }, items: [["React", "react"], ["TypeScript", "typescript"], ["JavaScript", "javascript"], ["Astro", "astro"], ["Vite", "vite"], ["GSAP", "gsap"], ["Three.js", "threedotjs"]] },
  { grupo: { es: "Backend", en: "Backend" }, items: [["Python", "python"], ["FastAPI", "fastapi"], ["Flask", "flask"], ["Java", "openjdk"], ["APIs REST y JWT", "jsonwebtokens"]] },
  { grupo: { es: "Datos", en: "Data" }, items: [["MySQL", "mysql"], ["PostgreSQL", "postgresql"], ["MongoDB", "mongodb"], ["SQLite", "sqlite"]] },
  { grupo: { es: "Servidores", en: "Servers" }, items: [["Docker", "docker"], ["Linux", "linux"], ["Nginx", "nginx"], ["Caddy", "caddy"], ["Git", "git"]] },
  { grupo: { es: "Móvil", en: "Mobile" }, items: [["Android", "android"], ["Android Studio", "androidstudio"]] },
  { grupo: { es: "IA y automatización", en: "AI and automation" }, items: [["Claude Code", "claude"], ["n8n", "n8n"], ["Chatbots", ""], ["Salesforce: Apex y LWC", ""]] },
];

export const formacion: { titulo: Txt; donde: string }[] = [
  { titulo: { es: "DAM, Desarrollo de Aplicaciones Multiplataforma", en: "Higher Diploma in Multiplatform App Development (DAM)" }, donde: "Tuniverse · 2026" },
  { titulo: { es: "Programación de Sistemas Informáticos (IFCT0609)", en: "Computer Systems Programming (IFCT0609)" }, donde: "SmartMind" },
  { titulo: { es: "Desarrollo con Inteligencia Artificial", en: "Building with Artificial Intelligence" }, donde: "MoureDev by Brais Moure" },
];

/* ---------------- Flujos de "¿Encajamos?" ---------------- */

type Flujo = { pestana: string; pasos: { tipo: string; titulo: string; detalle: string }[]; consola: string[] };
export const flujos: Record<Lang, { empresa: Flujo; negocio: Flujo }> = {
  es: {
    empresa: {
      pestana: "Busco un desarrollador",
      pasos: [
        { tipo: "Necesidad", titulo: "Buscas un perfil junior", detalle: "Con base sólida y ganas de crecer" },
        { tipo: "Stack", titulo: "Que sepa de todo el recorrido", detalle: "React, Python, bases de datos, Docker" },
        { tipo: "Experiencia", titulo: "Con experiencia en empresa", detalle: "Capgemini y Grupo Cobra" },
        { tipo: "Pruebas", titulo: "Y proyectos en producción", detalle: "Webs y apps que se usan a diario" },
        { tipo: "Contacto", titulo: "Me escribes", detalle: "Y lo hablamos esta semana" },
      ],
      consola: ["buscando: desarrollador junior full stack", "coincidencia: Luis Jardón, disponible ya", "siguiente paso: escribir a luisjardonpiquero@gmail.com"],
    },
    negocio: {
      pestana: "Necesito una web",
      pasos: [
        { tipo: "Idea", titulo: "Me cuentas qué necesitas", detalle: "Una web, una app o quitar tareas a mano" },
        { tipo: "Propuesta", titulo: "Te propongo una solución", detalle: "Con plazos y precio claros" },
        { tipo: "Diseño", titulo: "Lo diseñamos juntos", detalle: "Ves cada fase antes de seguir" },
        { tipo: "Desarrollo", titulo: "Lo construyo y lo publico", detalle: "Rápido, accesible y en tu dominio" },
        { tipo: "En marcha", titulo: "Tu proyecto funcionando", detalle: "Y sigo ahí si necesitas cambios" },
      ],
      consola: ["nuevo proyecto: web para tu negocio", "diseño aprobado, desarrollo en curso", "publicado en tu dominio ✓"],
    },
  },
  en: {
    empresa: {
      pestana: "I'm hiring a developer",
      pasos: [
        { tipo: "Need", titulo: "You need a junior developer", detalle: "Solid foundations, eager to grow" },
        { tipo: "Stack", titulo: "Who knows the whole journey", detalle: "React, Python, databases, Docker" },
        { tipo: "Experience", titulo: "With real company experience", detalle: "Capgemini and Grupo Cobra" },
        { tipo: "Proof", titulo: "And projects in production", detalle: "Sites and apps used every day" },
        { tipo: "Contact", titulo: "You drop me a line", detalle: "And we talk this week" },
      ],
      consola: ["searching: junior full stack developer", "match: Luis Jardón, available now", "next step: email luisjardonpiquero@gmail.com"],
    },
    negocio: {
      pestana: "I need a website",
      pasos: [
        { tipo: "Idea", titulo: "You tell me what you need", detalle: "A website, an app or less manual work" },
        { tipo: "Proposal", titulo: "I propose a solution", detalle: "Clear timeline and price" },
        { tipo: "Design", titulo: "We design it together", detalle: "You see every stage first" },
        { tipo: "Build", titulo: "I build and launch it", detalle: "Fast, accessible, on your domain" },
        { tipo: "Live", titulo: "Your project is running", detalle: "And I'm around for changes" },
      ],
      consola: ["new project: website for your business", "design approved, build in progress", "live on your domain ✓"],
    },
  },
};

/* ---------------- Textos de la interfaz ---------------- */

export const ui = {
  es: {
    titulo: "Luis Jardón Piquero · Desarrollador full stack",
    descripcion: "Desarrollo webs y apps, de la base de datos al último píxel. Portfolio de Luis Jardón Piquero, desarrollador full stack en Asturias.",
    saltar: "Saltar al contenido",
    nav: { sobre: "Sobre mí", experiencia: "Experiencia", proyectos: "Proyectos", encajamos: "¿Encajamos?", contacto: "Contacto" },
    menu: "Menú", cerrarMenu: "Cerrar menú", descargarCv: "Descargar CV", otroIdioma: "English", otroIdiomaCorto: "EN",
    disponible: "Disponible para incorporarme",
    hero: ["Desarrollo webs y apps", "de la base de datos", "al último píxel."],
    heroSub: "Desarrollador full stack con experiencia en Capgemini y Grupo Cobra. Creo aplicaciones completas y tengo un interés especial en la inteligencia artificial y en Salesforce.",
    verProyectos: "Ver proyectos ↓",
    mazoPasar: "Pasar", mazoPasarLabel: "Pasar a la siguiente carta", mazoAyuda: "Arrastra o toca la carta", mazoLabel: "Algunos de mis proyectos",
    sobreTitulo: ["Hola, soy", "Luis."],
    sobreTexto: "Programo desde antes de terminar DAM (2026) y casi todo lo que he hecho lo he llevado hasta el final: base de datos, aplicación y despliegue en mi propio servidor. En empresa he trabajado en web, automatizaciones y Salesforce. Ahora busco un equipo donde seguir aprendiendo y aportar desde el primer día.",
    datos: [["Inglés", "B2, certificado Oxford"], ["Judo", "Cinturón negro, 1.er dan"], ["Disponibilidad", "Inmediata, horario flexible"], ["Movilidad", "Asturias o remoto, vehículo propio"]],
    formacion: "Formación",
    experiencia: "Experiencia",
    stackTitulo: ["Con qué", "trabajo"],
    proyectosTitulo: ["Lo que he", "construido"],
    proyectosIntro: "Webs para negocios, apps y la infraestructura que las sostiene. Todo hecho y desplegado por mí.",
    otrosProyectos: "Más proyectos",
    verProyecto: "Ver el proyecto", verWeb: "Ver la web", codigo: "Código", detalles: "Ver detalles",
    encajamosTitulo: ["¿", "Encajamos", "?"],
    encajamosIntro: "Elige lo que buscas y mira cómo sería.",
    encajamosTabs: "Qué buscas",
    escribeme: "Escríbeme →",
    hablemos: "Hablemos.",
    contactoTexto: "Busco un equipo donde seguir aprendiendo y aportar desde el primer día. También acepto proyectos freelance.",
    correo: "Correo", copiado: "Copiado ✓", cv: "CV", descargarPdf: "Descargar PDF",
    form: {
      titulo: "O escríbeme aquí",
      nombre: "Nombre", email: "Tu correo", motivo: "Motivo", mensaje: "Mensaje",
      motivos: [["empleo", "Oferta de empleo"], ["proyecto", "Proyecto o web"], ["otro", "Otra cosa"]],
      enviar: "Enviar mensaje", enviando: "Enviando…", abrirCorreo: "Abrir en mi correo ↗",
      ok: "Mensaje enviado. Te respondo lo antes posible.",
      error: "No se ha podido enviar. Escríbeme a luisjardonpiquero@gmail.com.",
      errNombre: "Dime cómo te llamas.", errEmail: "Revisa el correo: no parece válido.", errMensaje: "Cuéntame algo (mínimo 10 caracteres).",
      privacidad: "Uso tus datos solo para responderte.",
      notaCorreo: "Se abrirá tu programa de correo con el mensaje listo para enviar. Esta web no guarda nada.",
    },
    tarjetaLabel: "Girar mi tarjeta de visita", tarjetaAyuda: "Toca la tarjeta para girarla",
    tarjetaLugar: "Asturias · Remoto", tarjetaRol: "Desarrollador full stack", tarjetaLinea: "Webs · Apps · Automatizaciones",
    tarjetaLema: ["Webs y apps,", "de la base de datos", "al último píxel."],
    pieHecha: "Hecha con Astro y GSAP, servida desde mi propio servidor",
    volverArriba: "Volver arriba ↑",
    // páginas de proyecto
    volver: "← Todos los proyectos", rol: "Rol", anio: "Año", reto: "El reto", hecho: "Qué hice", resultado: "Resultado",
    paginaCompleta: "Página de inicio completa", desplaza: "Desplázate dentro de la ventana para verla entera",
    siguiente: "Siguiente proyecto", galeria: "Imágenes", sinEnlace: "Sin enlace público",
    porque: "Por qué lo hice", comoFunciona: "Cómo funciona", historia: "La historia", problemas: "Problemas que resolví",
    problema: "El problema", solucion: "Cómo lo resolví", aprendi: "Lo que aprendí", proximo: "Lo siguiente", pantallas: "La app",
    animaciones: { reducir: "Reducir animaciones", activar: "Activar animaciones" },
  },
  en: {
    titulo: "Luis Jardón Piquero · Full stack developer",
    descripcion: "I build websites and apps, from the database to the last pixel. Portfolio of Luis Jardón Piquero, full stack developer in Asturias, Spain.",
    saltar: "Skip to content",
    nav: { sobre: "About", experiencia: "Experience", proyectos: "Projects", encajamos: "Good fit?", contacto: "Contact" },
    menu: "Menu", cerrarMenu: "Close menu", descargarCv: "Download CV", otroIdioma: "Español", otroIdiomaCorto: "ES",
    disponible: "Available to start now",
    hero: ["I build websites and apps", "from the database", "to the last pixel."],
    heroSub: "Full stack developer with experience at Capgemini and Grupo Cobra. I build complete applications, with a particular interest in artificial intelligence and Salesforce.",
    verProyectos: "See projects ↓",
    mazoPasar: "Next", mazoPasarLabel: "Show the next card", mazoAyuda: "Drag or tap the card", mazoLabel: "Some of my projects",
    sobreTitulo: ["Hi, I'm", "Luis."],
    sobreTexto: "I was coding long before finishing my DAM diploma (2026), and almost everything I've built I've taken all the way: database, application and deployment on my own server. At companies I've worked on web development, automation and Salesforce. Now I'm looking for a team where I can keep learning and contribute from day one.",
    datos: [["English", "B2, Oxford certificate"], ["Judo", "Black belt, 1st dan"], ["Availability", "Immediate, flexible hours"], ["Location", "Asturias or remote, own car"]],
    formacion: "Education",
    experiencia: "Experience",
    stackTitulo: ["What I", "work with"],
    proyectosTitulo: ["What I've", "built"],
    proyectosIntro: "Websites for businesses, apps and the infrastructure behind them. All built and deployed by me.",
    otrosProyectos: "More projects",
    verProyecto: "View project", verWeb: "Visit site", codigo: "Code", detalles: "Project details",
    encajamosTitulo: ["", "Good fit", "?"],
    encajamosIntro: "Pick what you're looking for and see how it would go.",
    encajamosTabs: "What you're looking for",
    escribeme: "Write to me →",
    hablemos: "Let's talk.",
    contactoTexto: "I'm looking for a team where I can keep learning and contribute from day one. I also take on freelance projects.",
    correo: "Email", copiado: "Copied ✓", cv: "CV", descargarPdf: "Download PDF",
    form: {
      titulo: "Or write to me here",
      nombre: "Name", email: "Your email", motivo: "About", mensaje: "Message",
      motivos: [["empleo", "Job opportunity"], ["proyecto", "Project or website"], ["otro", "Something else"]],
      enviar: "Send message", enviando: "Sending…", abrirCorreo: "Open in my email app ↗",
      ok: "Message sent. I'll get back to you soon.",
      error: "It couldn't be sent. Email me at luisjardonpiquero@gmail.com.",
      errNombre: "Tell me your name.", errEmail: "Check your email address.", errMensaje: "Tell me a bit more (10 characters minimum).",
      privacidad: "I only use your details to reply.",
      notaCorreo: "Your email app will open with the message ready to send. Nothing is stored on this site.",
    },
    tarjetaLabel: "Flip my business card", tarjetaAyuda: "Tap the card to flip it",
    tarjetaLugar: "Asturias · Remote", tarjetaRol: "Full stack developer", tarjetaLinea: "Web · Apps · Automation",
    tarjetaLema: ["Websites and apps,", "from the database", "to the last pixel."],
    pieHecha: "Built with Astro and GSAP, served from my own server",
    volverArriba: "Back to top ↑",
    volver: "← All projects", rol: "Role", anio: "Year", reto: "The challenge", hecho: "What I did", resultado: "Outcome",
    paginaCompleta: "Full home page", desplaza: "Scroll inside the window to see all of it",
    siguiente: "Next project", galeria: "Images", sinEnlace: "No public link",
    porque: "Why I built it", comoFunciona: "How it works", historia: "The story", problemas: "Problems I solved",
    problema: "The problem", solucion: "How I solved it", aprendi: "What I learned", proximo: "What's next", pantallas: "The app",
    animaciones: { reducir: "Reduce motion", activar: "Turn on motion" },
  },
};

// Formulario de contacto: sin endpoint (lo normal) abre el correo del visitante con el mensaje preparado.
// Si algún día se conecta un servicio de envío, basta con poner su URL en PUBLIC_CONTACTO_ENDPOINT.
export const contactoEndpoint: string = import.meta.env.PUBLIC_CONTACTO_ENDPOINT ?? "";
