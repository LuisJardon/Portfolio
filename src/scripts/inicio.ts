// Comportamiento propio de la portada: copiar el correo, tarjeta, mazo, apariciones, flujo "¿Encajamos?" y formulario.
import { gsap, ScrollTrigger, SplitText, reducir, $, $$ } from "./comun";

// ---------- Copiar el correo ----------
$$<HTMLAnchorElement>("[data-copiar]").forEach((a) => a.addEventListener("click", () => {
  const email = a.dataset.copiar!;
  navigator.clipboard?.writeText(email).catch(() => {});
  const texto = a.querySelector<HTMLElement>("[data-copiar-texto]")!;
  texto.textContent = a.dataset.txtCopiado!;
  setTimeout(() => (texto.textContent = email), 2200);
}));

// ---------- Tarjeta de contacto: girar al pulsar ----------
const tarjeta = $<HTMLButtonElement>("[data-tarjeta]");
tarjeta.addEventListener("click", () => tarjeta.setAttribute("aria-pressed", String(tarjeta.getAttribute("aria-pressed") !== "true")));

// ---------- Mazo de la portada: se arrastra, se toca o se pasa con el botón ----------
const zonaMazo = $("[data-mazo]");
const cartas = $$("[data-carta]");
const verMazo = $<HTMLAnchorElement>("[data-mazo-ver]");
const nombreMazo = $("[data-mazo-nombre]");
const ayuda = $("[data-mazo-ayuda]");
let orden = [...cartas];
let ocupado = false;
let tocado = false; // tras la primera interacción el mazo deja de barajarse solo y muestra "n / total"

const colocarCartas = (dur: number) => {
  orden.forEach((c, d) => gsap.to(c, { x: 0, y: 0, xPercent: -d * 5, yPercent: d * 5.5, rotate: -d * 3.5 + 2, scale: 1 - d * 0.05, zIndex: 10 - d, opacity: 1, duration: dur, ease: "expo.out" }));
  const delante = orden[0];
  nombreMazo.textContent = delante.dataset.titulo!;
  verMazo.href = delante.dataset.ancla!;
  if (tocado) ayuda.textContent = `${cartas.indexOf(delante) + 1} / ${cartas.length}`;
};
colocarCartas(0);

// Saca la carta de delante en la dirección dada y la manda al fondo.
const pasar = (dx = -1, dy = -0.15) => {
  if (ocupado) return;
  ocupado = true;
  const c = orden.shift()!;
  orden.push(c);
  const dur = reducir ? 0 : 0.45;
  gsap.timeline({ onComplete: () => { ocupado = false; } })
    .to(c, { x: dx * 480, y: dy * 480, rotate: dx * 20, opacity: 0, duration: dur, ease: "power2.in" })
    .add(() => colocarCartas(reducir ? 0 : 0.8));
};
const interactuar = () => {
  if (tocado) return;
  tocado = true;
};

$("[data-pasar]").addEventListener("click", () => { interactuar(); pasar(); });

let inicio: { x: number; y: number; id: number } | null = null;
zonaMazo.addEventListener("pointerdown", (e) => {
  if (ocupado || e.button !== 0) return;
  inicio = { x: e.clientX, y: e.clientY, id: e.pointerId };
  zonaMazo.setPointerCapture(e.pointerId);
  zonaMazo.classList.add("arrastrando");
});
zonaMazo.addEventListener("pointermove", (e) => {
  if (!inicio || e.pointerId !== inicio.id) return;
  const dx = e.clientX - inicio.x, dy = e.clientY - inicio.y;
  gsap.set(orden[0], { x: dx, y: dy, rotate: 2 + dx * 0.06 });
});
const soltar = (e: PointerEvent) => {
  if (!inicio || e.pointerId !== inicio.id) return;
  const dx = e.clientX - inicio.x, dy = e.clientY - inicio.y;
  const dist = Math.hypot(dx, dy);
  inicio = null;
  zonaMazo.classList.remove("arrastrando");
  interactuar();
  if (e.type === "pointercancel") { colocarCartas(0.5); return; }
  if (dist > 90) pasar(dx / dist, dy / dist); // lanzada
  else if (dist < 6) pasar(); // toque
  else colocarCartas(0.6); // vuelve a su sitio
};
zonaMazo.addEventListener("pointerup", soltar);
zonaMazo.addEventListener("pointercancel", soltar);

if (!reducir) {
  document.fonts.ready.then(() => {
    // ---------- Entrada: aparece el titular ----------
    gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 })
      .from("[data-linea]", { yPercent: 110, duration: 1.3, stagger: 0.1 }, 0.2)
      .from("[data-aparece]", { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, 0.5)
;
    // El mazo entra deslizándose solo en escritorio: en móvil queda en su sitio desde el principio
    // (si se mueve al cargar, el navegador tarda más en darlo por pintado y la página puntúa peor).
    gsap.matchMedia().add("(min-width: 861px)", () => {
      gsap.from(".mazo-zona", { y: 100, scale: 0.96, duration: 1.4, ease: "expo.out", delay: 0.55 });
    });

    // Mientras nadie lo toque, el mazo se baraja solo de vez en cuando (pausa con el ratón encima).
    let encima = false;
    zonaMazo.addEventListener("pointerenter", () => (encima = true));
    zonaMazo.addEventListener("pointerleave", () => (encima = false));
    const auto = setInterval(() => {
      if (tocado) return clearInterval(auto);
      if (encima || document.hidden) return;
      pasar();
    }, 3800);

    // ---------- Sobre mí: la foto se descubre y el texto se ilumina al leer ----------
    gsap.from("[data-foto]", { clipPath: "inset(0% 0% 100% 0% round 10px)", duration: 1.5, ease: "expo.inOut", scrollTrigger: { trigger: "[data-foto]", start: "top 80%" } });
    // Las palabras se encienden solas en un segundo al llegar (no hace falta ir bajando para leerlo).
    const relleno = SplitText.create("[data-relleno]", { type: "words", aria: "none" });
    // immediateRender: false -> el texto está a opacidad normal hasta que asoma (buen contraste mientras no se ve).
    gsap.fromTo(relleno.words, { opacity: 0.15 }, { opacity: 1, duration: 0.5, stagger: { amount: 1 }, ease: "power1.out", immediateRender: false, scrollTrigger: { trigger: "[data-relleno]", start: "top 92%" } });
    gsap.from(".formacion li, .datos > div", { y: 24, opacity: 0, stagger: 0.07, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: ".formacion", start: "top 85%" } });

    // ---------- Proyectos: entran al llegar ----------
    $$("[data-proy]").forEach((p) => {
      gsap.from(p.querySelector(".ventana"), { y: 60, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: p, start: "top 85%" } });
      // clearProps: un transform en el título encerraría su enlace y dejaría de ser clicable todo el bloque.
      gsap.from(p.querySelector(".proy-info")!.children, { y: 20, opacity: 0, stagger: 0.05, duration: 0.9, ease: "expo.out", clearProps: "transform", scrollTrigger: { trigger: p, start: "top 75%" } });
    });

    // ---------- Stack y experiencia ----------
    gsap.from("[data-grupo]", { y: 40, opacity: 0, stagger: 0.08, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".stack-filas", start: "top 80%" } });
    gsap.from("[data-exp]", { y: 30, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".exp", start: "top 80%" } });

    // ---------- Contacto: la tarjeta entra y gira sola una vez ----------
    gsap.from(".tarjeta-zona", {
      y: 80, rotate: -4, opacity: 0, duration: 1.4, ease: "expo.out",
      scrollTrigger: { trigger: ".tarjeta-zona", start: "top 80%", onEnter: () => setTimeout(() => tarjeta.setAttribute("aria-pressed", "true"), 1300) },
    });

    ScrollTrigger.refresh();
  });
}

// ---------- Flujo "¿Encajamos?" ----------
const seccionFlujo = $("[data-seccion-flujo]");
// Se ve el flujo de la pestaña elegida (empieza en "empresa").
let tipoActivo = "empresa";
const mostrarFlujo = (tipo: string) => {
  tipoActivo = tipo;
  $$(".flujo[data-flujo]").forEach((f) => (f.hidden = f.dataset.flujo !== tipo));
  $$("[data-pestana]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.pestana === tipo)));
};
mostrarFlujo(tipoActivo);

let corriendo = false;
const ejecutar = () => {
  if (corriendo) return;
  const caja = $(`.flujo[data-flujo="${tipoActivo}"]`);
  const pasos = [...caja.querySelectorAll<HTMLElement>("[data-paso]")];
  const lineas = [...caja.querySelectorAll<HTMLElement>("[data-linea-consola]")];
  corriendo = true;
  seccionFlujo.classList.add("ejecutado");
  pasos.forEach((p) => p.classList.remove("activo"));
  lineas.forEach((l) => l.classList.remove("visible"));
  caja.classList.remove("terminado");
  const espera = reducir ? 0 : 520;
  pasos.forEach((p, i) => setTimeout(() => {
    p.classList.add("activo");
    if (i === 0) lineas[0].classList.add("visible");
    if (i === 2) lineas[1].classList.add("visible");
    if (i === pasos.length - 1) { lineas[2].classList.add("visible"); caja.classList.add("terminado"); corriendo = false; }
  }, i * espera));
};
// Se ejecuta solo al llegar a la sección; al cambiar de pestaña se ejecuta el otro flujo.
ScrollTrigger.create({ trigger: seccionFlujo, start: "top 55%", once: true, onEnter: ejecutar });
$$("[data-pestana]").forEach((b) => b.addEventListener("click", () => { if (corriendo) return; mostrarFlujo(b.dataset.pestana!); ejecutar(); }));


// ---------- Formulario de contacto ----------
// Con endpoint (webhook de n8n en mi servidor) se envía por fetch; sin él, abre el correo con el mensaje preparado.
const form = $<HTMLFormElement>("[data-form]");
const estado = $("[data-form-estado]");
const enviar = $<HTMLButtonElement>("[data-form-enviar]");
const campos = ["nombre", "email", "mensaje"].map((n) => form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement);

const validar = (c: HTMLInputElement | HTMLTextAreaElement) => {
  const ok = c.name === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.value.trim()) : c.name === "mensaje" ? c.value.trim().length >= 10 : c.value.trim().length > 0;
  const caja = c.closest(".campo")!;
  caja.classList.toggle("con-error", !ok);
  let aviso = caja.querySelector<HTMLElement>(".campo-error");
  if (!ok && !aviso) {
    aviso = document.createElement("span");
    aviso.className = "campo-error";
    aviso.id = `error-${c.name}`;
    caja.append(aviso);
  }
  if (aviso) aviso.textContent = ok ? "" : c.dataset.error!;
  c.setAttribute("aria-invalid", String(!ok));
  if (!ok) c.setAttribute("aria-describedby", `error-${c.name}`); else c.removeAttribute("aria-describedby");
  return ok;
};
campos.forEach((c) => c.addEventListener("blur", () => { if (c.value) validar(c); }));
campos.forEach((c) => c.addEventListener("input", () => { if (c.closest(".con-error")) validar(c); }));

const ponerEstado = (texto: string, tipo: "ok" | "error" | "") => {
  estado.textContent = texto;
  estado.dataset.tipo = tipo;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const validos = campos.map(validar);
  if (validos.includes(false)) { campos[validos.indexOf(false)].focus(); return; }
  const datos = Object.fromEntries(new FormData(form)) as Record<string, string>;
  if (datos.web) return; // un bot ha rellenado la trampa
  // Limpieza: sin saltos de línea ni caracteres de control en los campos de una línea, y con tope de longitud.
  const linea = (v: string, max: number) => v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max);
  datos.nombre = linea(datos.nombre, 80);
  datos.email = linea(datos.email, 120);
  datos.mensaje = datos.mensaje.replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").trim().slice(0, 3000);
  const motivoTexto = form.querySelector<HTMLInputElement>("input[name=motivo]:checked")?.nextElementSibling?.textContent ?? datos.motivo;

  const endpoint = form.dataset.endpoint;
  if (!endpoint) {
    const asunto = `${motivoTexto} · ${datos.nombre}`;
    const cuerpo = `${datos.mensaje}\n\n${datos.nombre} · ${datos.email}`;
    location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    ponerEstado(form.dataset.txtCorreo!, "ok");
    return;
  }
  enviar.disabled = true;
  ponerEstado(form.dataset.txtEnviando!, "");
  try {
    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: datos.nombre, email: datos.email, motivo: motivoTexto, mensaje: datos.mensaje, idioma: form.dataset.lang, pagina: location.href }),
    });
    if (!r.ok) throw new Error(String(r.status));
    form.reset();
    ponerEstado(form.dataset.txtOk!, "ok");
  } catch {
    ponerEstado(form.dataset.txtError!, "error");
  } finally {
    enviar.disabled = false;
  }
});
