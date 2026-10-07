// Comportamiento común a todas las páginas: scroll suave, menú (fondo, sección actual y versión móvil),
// el logo que se dibuja y los títulos que entran. La portada y las páginas de proyecto lo importan.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };
export const reducir = document.documentElement.classList.contains("reduce");
export const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s)!;
export const $$ = <T extends Element = HTMLElement>(s: string) => [...document.querySelectorAll<T>(s)];

// ---------- Scroll suave ----------
export let lenis: Lenis | null = null;
if (!reducir) {
  lenis = new Lenis({ lerp: 0.09 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
// Enlaces internos (también los que se crean o cambian después, como "ver proyecto" del mazo).
document.addEventListener("click", (e) => {
  const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
  if (!a) return;
  const destino = a.getAttribute("href") === "#contenido" ? document.body : document.querySelector(a.getAttribute("href")!);
  if (!destino || !lenis) return;
  e.preventDefault();
  lenis.scrollTo(destino === document.body ? 0 : (destino as HTMLElement), { offset: -90 });
});

// ---------- Menú: fondo al bajar y enlace de la sección en la que estás ----------
const nav = $("[data-nav]");
ScrollTrigger.create({ start: 40, end: () => ScrollTrigger.maxScroll(window) + 1, invalidateOnRefresh: true, onToggle: (s) => nav.classList.toggle("solida", s.isActive) });
$$<HTMLAnchorElement>('.nav-links a[href^="#"]').forEach((a) => {
  const sec = document.querySelector(a.getAttribute("href")!);
  if (sec) ScrollTrigger.create({ trigger: sec, start: "top 50%", end: "bottom 50%", onToggle: (s) => a.classList.toggle("actual", s.isActive) });
});

// ---------- Menú móvil ----------
const menuBtn = $<HTMLButtonElement>("[data-menu-btn]");
const menu = $("[data-menu]");
const abrirMenu = (abrir: boolean) => {
  menuBtn.setAttribute("aria-expanded", String(abrir));
  menuBtn.querySelector(".sr-only")!.textContent = abrir ? menuBtn.dataset.txtCerrar! : menuBtn.dataset.txtAbrir!;
  document.documentElement.classList.toggle("menu-abierto", abrir);
  if (abrir) {
    menu.hidden = false;
    if (!reducir) gsap.from(menu.querySelectorAll("a"), { yPercent: 60, opacity: 0, stagger: 0.05, duration: 0.7, ease: "expo.out" });
  } else {
    menu.hidden = true;
  }
};
menuBtn.addEventListener("click", () => abrirMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => abrirMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { abrirMenu(false); menuBtn.focus(); } });

// ---------- Entrada del logo y títulos de sección ----------
if (!reducir) {
  document.fonts.ready.then(() => {
    gsap.timeline({ delay: 0.15 })
      .fromTo(".trazo", { strokeDashoffset: 1, fillOpacity: 0 }, { strokeDashoffset: 0, duration: 1.3, stagger: 0.35, ease: "power2.inOut" }, 0)
      .to(".trazo", { fillOpacity: 1, strokeWidth: 0, duration: 0.6 }, 1.2);
    $$("[data-titulo]").forEach((t) => {
      const s = SplitText.create(t, { type: "chars", mask: "chars" });
      gsap.from(s.chars, { yPercent: 100, stagger: 0.02, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: t, start: "top 85%" } });
    });
    $$("[data-sube]").forEach((el) => gsap.from(el, { y: 30, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
  });
}
