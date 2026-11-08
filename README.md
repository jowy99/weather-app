<div align="center">
  <img src="public/weather-app-banner.png" alt="Matiz – App del tiempo" width="1200" height="400">
</div>

# Matiz

Una aplicación del tiempo con cielo animado que refleja las condiciones reales y una PWA instalable.

## Funciones

- **Fondo animado** que cambia según la condición meteorológica y la fase día/noche
- **Previsión por horas** con condiciones, precipitación y viento
- **Previsión a 10 días**
- **Avisos meteorológicos** en español
- **Calidad del aire** (índice AQI)
- **UV, viento, presión, sol y luna**
- **Búsqueda de ciudades** y **geolocalización**
- **Mis ubicaciones** para guardar favoritos
- **Funciona sin conexión** (PWA)
- **Accesible**: contraste AA, navegación por teclado, soporte para movimiento reducido

## Tecnologías

- React 18
- Vite 5
- Tailwind CSS 3
- vite-plugin-pwa (Workbox)
- Cloudflare Pages Functions

## Fuentes de datos

- **WeatherAPI.com** (vía RapidAPI) — tiempo actual, previsión por horas, 3 días, avisos y calidad del aire
- **Open-Meteo** — previsión de 4 a 10 días y búsqueda de ciudades (gratis, uso no comercial, CC BY 4.0)
- **OpenStreetMap Nominatim** — nombre del lugar a partir de coordenadas
- **Meteocons** de Bas Milius — iconos meteorológicos (MIT)

## Puesta en marcha en local

### Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- [pnpm](https://pnpm.io/) (también funciona con npm)

### Pasos

```bash
git clone https://github.com/jowy99/weather-app.git
cd weather-app
pnpm install
```

Copia `.env.example` a `.env` y rellena tu clave de API:

```bash
cp .env.example .env
```

Abre `.env` y añade tu clave de RapidAPI:

```
RAPIDAPI_KEY=tu_clave_aqui
```

> **Nota:** la variable se llama `RAPIDAPI_KEY` (sin el prefijo `VITE_`). Esto es intencional: las variables sin `VITE_` no se exponen al navegador, así que tu clave solo vive en el servidor.

```bash
pnpm dev
```

### Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Sirve la app en modo desarrollo con proxy de API |
| `pnpm build` | Compila la app para producción |
| `pnpm preview` | Previsualiza la compilación de producción en local |
| `pnpm lint` | Ejecuta ESLint |

## Despliegue en Cloudflare Pages

1. Conecta este repositorio en [Cloudflare Pages](https://pages.cloudflare.com).
2. **Comando de compilación:** `npm run build`
3. **Carpeta de salida:** `dist`
4. La carpeta `functions/` se despliega automáticamente como [Pages Functions](https://developers.cloudflare.com/pages/functions/) — el endpoint `/api/forecast` queda disponible sin configuración extra.
5. Añade la variable de entorno secreta `RAPIDAPI_KEY` (y opcional `RAPIDAPI_HOST`).
6. Las cabeceras de seguridad se aplican automáticamente desde `public/_headers`.

**Recomendación:** crea una regla de *rate limiting* para `/api/*` para proteger tu clave de RapidAPI.

## Seguridad

- La clave de RapidAPI **solo vive en el servidor**: la Pages Function en producción y el proxy de Vite en desarrollo. Nunca llega al navegador.
- El proxy valida los parámetros de consulta (`q` y `days`) antes de reenviar la petición.
- **CSP** y cabeceras de seguridad (`X-Frame-Options`, `X-Content-Type-Options`, `HSTS`, `COOP`) se aplican desde `public/_headers`.

## Estructura del proyecto

```
├── functions/api/          # Cloudflare Pages Functions (proxy de API)
├── public/                 # Archivos estáticos, iconos PWA, cabeceras HTTP
├── src/
│   ├── components/
│   │   ├── blocks/         # Bloques principales (tiempo actual, horas, días…)
│   │   └── UI/             # Componentes de interfaz reutilizables
│   ├── hooks/              # Hooks personalizados
│   ├── layout/             # Layout general (header, footer)
│   ├── services/           # Llamadas a APIs externas
│   └── utils/              # Funciones auxiliares
├── .env.example            # Variables de entorno de ejemplo
├── manifest.json           # Configuración PWA
└── vite.config.js          # Configuración de Vite + PWA
```

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---

Datos: WeatherAPI.com · Open-Meteo · OpenStreetMap
