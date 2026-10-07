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
  };
}

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
      rol: { es: "Proyecto personal", en: "Personal project" },
      resumen: {
        es: "Quería saber qué había visto y qué me quedaba pendiente sin depender de apps de terceros, así que me hice la mía.",
        en: "I wanted to know what I'd watched and what was left without relying on third-party apps, so I built my own.",
      },
      reto: {
        es: "Que la app y su servidor funcionen solos, todos los días, sin mantenimiento.",
        en: "Making the app and its server run on their own, every day, with no upkeep.",
      },
      hecho: {
        es: ["App Android nativa.", "API REST propia en Flask (Python) con SQLite.", "Servidor en Docker, publicado con HTTPS en mi propio servidor."],
        en: ["Native Android app.", "Custom Flask (Python) REST API with SQLite.", "Dockerised server, published over HTTPS on my own server."],
      },
      resultado: { es: "La uso a diario.", en: "I use it every day." },
      stack: ["Android", "Flask", "Python", "SQLite", "Docker"],
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
      reto: {
        es: "Aprender de verdad qué pasa \"bajo el capó\": usuarios, permisos, redes, contenedores y seguridad, sin depender de la nube.",
        en: "Really learning what happens under the hood: users, permissions, networking, containers and security, without relying on the cloud.",
      },
      hecho: {
        es: [
          "Base con OpenMediaVault (Debian): usuarios, permisos y datos separados de los volúmenes de Docker.",
          "SSH asegurado y acceso mínimo antes de exponer nada a internet.",
          "Servicios en Docker con Portainer; n8n con PostgreSQL en una red interna, sin exponer la base de datos.",
          "Dominio propio, DNS dinámico y proxy Caddy con certificados HTTPS automáticos.",
          "Reconstruido desde cero en 2026 siguiendo un plan documentado paso a paso.",
        ],
        en: [
          "OpenMediaVault (Debian) base: users, permissions and data kept apart from Docker volumes.",
          "Hardened SSH and minimal access before exposing anything to the internet.",
          "Dockerised services managed with Portainer; n8n with PostgreSQL on an internal network, database not exposed.",
          "Own domain, dynamic DNS and a Caddy proxy with automatic HTTPS certificates.",
          "Rebuilt from scratch in 2026 following a documented, step-by-step plan.",
        ],
      },
      resultado: {
        es: "Un servidor casero es un 20 % instalación y un 80 % mantenimiento y diseño. Hoy es la base de todo lo que publico.",
        en: "A home server is 20% installation and 80% maintenance and design. Today it runs everything I publish.",
      },
      stack: ["Debian", "OpenMediaVault", "Docker", "Portainer", "n8n", "PostgreSQL", "Caddy"],
      galeria: [
        { img: "home_server_setup.webp", alt: { es: "El servidor casero montado en su mesa", en: "The home server set up on its desk" } },
      ],
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
    animaciones: { reducir: "Reduce motion", activar: "Turn on motion" },
  },
};

// Formulario de contacto: sin endpoint (lo normal) abre el correo del visitante con el mensaje preparado.
// Si algún día se conecta un servicio de envío, basta con poner su URL en PUBLIC_CONTACTO_ENDPOINT.
export const contactoEndpoint: string = import.meta.env.PUBLIC_CONTACTO_ENDPOINT ?? "";
