// Genera public/og.png (1200x630): la imagen que sale al compartir el enlace en LinkedIn, WhatsApp, X…
// Uso: node scripts/generar-og.mjs   (usa el Chrome instalado y las fuentes del proyecto)
import puppeteer from "puppeteer-core";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const fuente = (ruta) => `data:font/woff2;base64,${readFileSync(raiz + "node_modules/" + ruta).toString("base64")}`;
const LJ = readFileSync(raiz + "src/data/logoLJ.ts", "utf8");
const trazo = (clave) => LJ.match(new RegExp(`${clave}:\\s*"([^"]+)"`))[1];
const viewBox = LJ.match(/viewBox:\s*\[([^\]]+)\]/)[1].split(",").map((n) => n.trim()).join(" ");
const foto = `data:image/webp;base64,${readFileSync(raiz + "public/img/profile-about.webp").toString("base64")}`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: G; font-weight: 400; src: url(${fuente("@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff2")}); }
@font-face { font-family: G; font-weight: 600; src: url(${fuente("@fontsource/geist-sans/files/geist-sans-latin-600-normal.woff2")}); }
@font-face { font-family: M; font-weight: 500; src: url(${fuente("@fontsource/geist-mono/files/geist-mono-latin-500-normal.woff2")}); }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #f4f4f2; color: #171716; font-family: G; display: grid; grid-template-columns: 1fr 300px; gap: 64px; padding: 72px 80px; position: relative; }
.marca { display: flex; align-items: center; gap: 14px; font: 600 26px G; letter-spacing: -0.03em; }
.marca svg { height: 44px; }
.marca .j { fill: #6f6e69; }
.disp { display: inline-flex; align-items: center; gap: 10px; margin-top: 56px; padding: 8px 14px; border-radius: 6px; background: #fbfbfa; box-shadow: 0 0 0 1px rgb(23 23 22 / .11); font: 500 18px M; }
.disp i { width: 9px; height: 9px; border-radius: 50%; background: #2f7a4f; }
h1 { margin-top: 26px; font: 600 64px/1.02 G; letter-spacing: -0.055em; }
h1 span { color: #8d8c86; }
.pie { position: absolute; left: 80px; bottom: 64px; font: 500 20px M; color: #6f6e69; }
.foto { align-self: center; width: 300px; height: 420px; border-radius: 12px; overflow: hidden; box-shadow: 0 0 0 1px rgb(23 23 22 / .11), 0 30px 60px -30px rgb(30 28 22 / .45); }
.foto img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) contrast(1.05); }
</style></head><body>
<div>
  <div class="marca"><svg viewBox="${viewBox}"><path d="${trazo("L")}"/><path class="j" d="${trazo("J")}"/></svg>Luis Jardón Piquero</div>
  <p class="disp"><i></i>Desarrollador full stack · Asturias</p>
  <h1>Desarrollo webs y apps<br><span>de la base de datos<br>al último píxel.</span></h1>
  <p class="pie">luisjardonpiquero.com</p>
</div>
<div class="foto"><img src="${foto}"></div>
</body></html>`;

const navegador = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const p = await navegador.newPage();
await p.setViewport({ width: 1200, height: 630 });
await p.setContent(html, { waitUntil: "load" });
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: raiz + "public/og.png" });
await navegador.close();
console.log("public/og.png generada");
