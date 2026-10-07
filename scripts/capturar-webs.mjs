// Uso: node scripts/capturar-webs.mjs [nombre]   (rehace las capturas de página completa de public/img/completa)
// Captura la página completa de cada proyecto (1440 px de ancho) y la guarda reducida para el portfolio.
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const SALIDA = "C:/Users/Luis/Music/Proyectos/portfolio-2026/public/img/completa";
const webs = [
  ["cafe-jardon", "https://luisjardonpiquero.com/cafeteria/"],
  ["judo-astures", "http://localhost:4321/"],
  ["gestionbarber", "https://gestionbarber.rozadasnas.duckdns.org/"],
  ["happiness", "https://luisjp1999.neocities.org/"],
];
const soloEsta = process.argv[2];

const fs = await import("fs");
fs.mkdirSync(SALIDA, { recursive: true });
const navegador = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });

for (const [nombre, url] of webs) {
  if (soloEsta && soloEsta !== nombre) continue;
  const p = await navegador.newPage();
  await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await p.evaluateOnNewDocument(() => { try { localStorage.setItem("demo-motion", "off"); localStorage.setItem("lj-motion", "off"); } catch (e) {} });
  try {
    await p.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  } catch (e) { console.log(nombre, "ERROR", e.message); await p.close(); continue; }
  // Oculta el botón de "activar/reducir animaciones" de las demos: no forma parte del diseño.
  await p.evaluate(() => document.querySelectorAll("button").forEach((b) => { if (/animaciones/i.test(b.textContent || "")) b.style.display = "none"; }));
  // Y la barra de herramientas del modo desarrollo de Astro (aparece al capturar desde un servidor local).
  await p.evaluate(() => document.querySelectorAll("astro-dev-toolbar").forEach((t) => t.remove()));
  // Recorre la página para cargar imágenes perezosas y disparar apariciones.
  const alto = await p.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 800));
    return document.documentElement.scrollHeight;
  });
  const png = await p.screenshot({ fullPage: true, type: "png" });
  const img = sharp(png).resize({ width: 720 });
  const meta = await img.toBuffer({ resolveWithObject: true });
  await sharp(meta.data).webp({ quality: 72, effort: 6 }).toFile(`${SALIDA}/${nombre}.webp`);
  console.log(nombre, "alto página:", alto, "→ imagen", meta.info.width + "x" + meta.info.height);
  await p.close();
}
await navegador.close();
