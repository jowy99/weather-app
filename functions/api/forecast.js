// Cloudflare Pages Function: GET /api/forecast?q=...&days=3
// Añade la clave de RapidAPI en el servidor. Solo permite el endpoint de previsión y parámetros validados.
const UPSTREAM = "https://weatherapi-com.p.rapidapi.com/forecast.json";

export async function onRequestGet({ request, env }) {
  if (!env.RAPIDAPI_KEY) {
    return json({ error: "Servidor sin configurar" }, 500);
  }
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") || "").trim();
  const days = Number(url.searchParams.get("days") || "3");
  // q: nombre de lugar o "lat,lon"; longitud limitada
  if (!q || q.length > 100 || !/^[\p{L}\p{N}\s,.'()-]+$/u.test(q)) {
    return json({ error: "Parámetro q no válido" }, 400);
  }
  if (!Number.isInteger(days) || days < 1 || days > 3) {
    return json({ error: "Parámetro days no válido" }, 400);
  }
  const params = new URLSearchParams({ q, days: String(days), aqi: "yes", alerts: "yes" });
  const upstream = await fetch(`${UPSTREAM}?${params}`, {
    headers: {
      "x-rapidapi-key": env.RAPIDAPI_KEY,
      "x-rapidapi-host": env.RAPIDAPI_HOST || "weatherapi-com.p.rapidapi.com",
    },
    cf: { cacheTtl: 600, cacheEverything: true },
  });
  const body = await upstream.text();
  return new Response(body, {
    status: upstream.status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=600",
      "x-content-type-options": "nosniff",
    },
  });
}

export function onRequest() {
  return json({ error: "Método no permitido" }, 405);
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
