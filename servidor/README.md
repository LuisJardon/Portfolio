# Piezas del servidor para el portfolio

Extras para el servidor `192.168.1.48` (Caddy en el contenedor `gb_caddy`). La web funciona sin ellos.

## Formulario de contacto

No necesita servidor: el botón "Abrir en mi correo" abre el programa de correo del visitante con el mensaje preparado
para **luisjardonpiquero@gmail.com** (el dominio no tiene correo propio). La web no guarda ni envía nada, así que el
formulario no tiene superficie de ataque: el texto nunca se pinta como HTML y el enlace `mailto:` va codificado.

Si algún día se quiere que envíe solo, basta con poner la URL de un servicio de envío en `PUBLIC_CONTACTO_ENDPOINT` (`.env`):
la web ya hace `POST` con JSON `{ nombre, email, motivo, mensaje, idioma, pagina }`. Ese servicio tendría que volver a validar
los datos y no mandar respuestas automáticas al visitante (se podría usar para enviar spam a terceros).

## Caddyfile (aplicado el 2026-10-07)

`servidor/Caddyfile` es la copia del `/opt/gestionbarber/Caddyfile` del servidor: GestionBarber, n8n, VeoVeo y el
portfolio con cabeceras de seguridad, caché de `/_astro/`, redirecciones de la web antigua y la 404 propia.
Copia anterior en el servidor: `/opt/gestionbarber/Caddyfile.bak-2026-10-07`.

Para cambiarlo: editar aquí, subirlo como `Caddyfile.nuevo`, validarlo y aplicarlo (`cat` para no romper el montaje del archivo):

```
scp servidor\Caddyfile root@192.168.1.48:/opt/gestionbarber/Caddyfile.nuevo
ssh root@192.168.1.48 "cd /opt/gestionbarber && docker cp Caddyfile.nuevo gb_caddy:/tmp/Caddyfile.nuevo && docker exec gb_caddy caddy validate --config /tmp/Caddyfile.nuevo --adapter caddyfile"
ssh root@192.168.1.48 "cd /opt/gestionbarber && cat Caddyfile.nuevo > Caddyfile && docker exec gb_caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile"
```

## 1. Cabeceras de seguridad (ya aplicadas, ver Caddyfile)

En el bloque de `luisjardonpiquero.com` del Caddyfile:

```
header {
    Strict-Transport-Security "max-age=31536000; includeSubDomains"
    X-Content-Type-Options "nosniff"
    X-Frame-Options "SAMEORIGIN"
    Referrer-Policy "strict-origin-when-cross-origin"
    Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"
    -Server
}
```

Y para que las rutas que no existen muestren la página 404 propia (en el mismo bloque):

```
handle_errors {
    @404 expression {err.status_code} == 404
    rewrite @404 /404.html
    file_server
}
```

Después `docker exec gb_caddy caddy reload --config /etc/caddy/Caddyfile` y comprobar en https://securityheaders.com.

## 2. Estadísticas con Umami (opcional)

1. Copiar `umami/docker-compose.yml` a `/opt/umami/` en el servidor, crear su `.env` (instrucciones dentro) y `docker compose up -d`.
2. En el Caddyfile, añadir un subdominio (y su registro DNS apuntando al servidor):

   ```
   stats.luisjardonpiquero.com {
       reverse_proxy host.docker.internal:3005
   }
   ```

   (si Caddy no ve `host.docker.internal`, usar la IP `172.17.0.1` o meter Umami en la misma red Docker que Caddy).
3. Entrar en `https://stats.luisjardonpiquero.com` (usuario inicial `admin` / `umami`: **cambiarla nada más entrar**),
   añadir el sitio `luisjardonpiquero.com` y copiar su *Website ID*.
4. En `portfolio-2026/.env`: `PUBLIC_UMAMI_URL=https://stats.luisjardonpiquero.com` y `PUBLIC_UMAMI_ID=<id>`.
5. `npm run build` y publicar.

Umami no usa cookies ni guarda datos personales, así que no hace falta banner de cookies.
