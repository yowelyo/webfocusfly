// Focus Flight (Web) — App principal
// Todo en el navegador, sin backend.

// ----------------------------- Datos: aeropuertos -----------------------------
// Lista concisa de aeropuertos (IATA) para demo. Puedes ampliar fácilmente.
const AIRPORTS = [
  { code: "MAD", name: "Adolfo Suárez Madrid–Barajas", city: "Madrid", country: "España", lat: 40.472, lng: -3.561 },
  { code: "BCN", name: "Barcelona–El Prat", city: "Barcelona", country: "España", lat: 41.297, lng: 2.078 },
  { code: "AGP", name: "Málaga–Costa del Sol", city: "Málaga", country: "España", lat: 36.675, lng: -4.499 },
  { code: "SVQ", name: "Sevilla", city: "Sevilla", country: "España", lat: 37.417, lng: -5.898 },
  { code: "VLC", name: "Valencia", city: "Valencia", country: "España", lat: 39.491, lng: -0.473 },
  { code: "BIO", name: "Bilbao", city: "Bilbao", country: "España", lat: 43.301, lng: -2.911 },

  { code: "LIS", name: "Lisboa Humberto Delgado", city: "Lisboa", country: "Portugal", lat: 38.774, lng: -9.134 },
  { code: "OPO", name: "Oporto Francisco Sá Carneiro", city: "Porto", country: "Portugal", lat: 41.248, lng: -8.681 },

  { code: "CDG", name: "Paris Charles de Gaulle", city: "París", country: "Francia", lat: 49.0097, lng: 2.5479 },
  { code: "ORY", name: "Paris Orly", city: "París", country: "Francia", lat: 48.726, lng: 2.365 },
  { code: "LHR", name: "London Heathrow", city: "Londres", country: "Reino Unido", lat: 51.470, lng: -0.454 },
  { code: "LGW", name: "London Gatwick", city: "Londres", country: "Reino Unido", lat: 51.1537, lng: -0.1821 },
  { code: "AMS", name: "Amsterdam Schiphol", city: "Ámsterdam", country: "Países Bajos", lat: 52.3105, lng: 4.7683 },
  { code: "FRA", name: "Frankfurt am Main", city: "Frankfurt", country: "Alemania", lat: 50.0379, lng: 8.5622 },
  { code: "MUC", name: "Munich", city: "Múnich", country: "Alemania", lat: 48.3538, lng: 11.7861 },
  { code: "ZRH", name: "Zurich", city: "Zúrich", country: "Suiza", lat: 47.458, lng: 8.555 },
  { code: "VIE", name: "Vienna", city: "Viena", country: "Austria", lat: 48.1103, lng: 16.5697 },
  { code: "CPH", name: "Copenhagen", city: "Copenhague", country: "Dinamarca", lat: 55.618, lng: 12.656 },
  { code: "OSL", name: "Oslo Gardermoen", city: "Oslo", country: "Noruega", lat: 60.1939, lng: 11.1004 },

  { code: "JFK", name: "New York John F. Kennedy", city: "Nueva York", country: "EE. UU.", lat: 40.6413, lng: -73.7781 },
  { code: "EWR", name: "Newark Liberty", city: "Nueva York", country: "EE. UU.", lat: 40.6895, lng: -74.1745 },
  { code: "BOS", name: "Boston Logan", city: "Boston", country: "EE. UU.", lat: 42.3656, lng: -71.0096 },
  { code: "MIA", name: "Miami", city: "Miami", country: "EE. UU.", lat: 25.7959, lng: -80.2870 },
  { code: "ORD", name: "Chicago O'Hare", city: "Chicago", country: "EE. UU.", lat: 41.9742, lng: -87.9073 },
  { code: "DFW", name: "Dallas/Fort Worth", city: "Dallas", country: "EE. UU.", lat: 32.8998, lng: -97.0403 },
  { code: "LAX", name: "Los Angeles", city: "Los Ángeles", country: "EE. UU.", lat: 33.9416, lng: -118.4085 },
  { code: "SFO", name: "San Francisco", city: "San Francisco", country: "EE. UU.", lat: 37.6213, lng: -122.3790 },
  { code: "SEA", name: "Seattle-Tacoma", city: "Seattle", country: "EE. UU.", lat: 47.4502, lng: -122.3088 },

  { code: "GRU", name: "São Paulo Guarulhos", city: "São Paulo", country: "Brasil", lat: -23.4356, lng: -46.4731 },
  { code: "EZE", name: "Buenos Aires Ezeiza", city: "Buenos Aires", country: "Argentina", lat: -34.812, lng: -58.539 },

  { code: "DXB", name: "Dubai", city: "Dubái", country: "EAU", lat: 25.2532, lng: 55.3657 },
  { code: "DOH", name: "Doha Hamad", city: "Doha", country: "Qatar", lat: 25.2731, lng: 51.6081 },
  { code: "IST", name: "Istanbul", city: "Estambul", country: "Turquía", lat: 41.2753, lng: 28.7519 },

  { code: "HND", name: "Tokyo Haneda", city: "Tokio", country: "Japón", lat: 35.5494, lng: 139.7798 },
  { code: "NRT", name: "Tokyo Narita", city: "Tokio", country: "Japón", lat: 35.773, lng: 140.392 },
  { code: "ICN", name: "Seúl Incheon", city: "Seúl", country: "Corea del Sur", lat: 37.4602, lng: 126.4407 },
  { code: "HKG", name: "Hong Kong", city: "Hong Kong", country: "China", lat: 22.308, lng: 113.9185 },
  { code: "SIN", name: "Singapur Changi", city: "Singapur", country: "Singapur", lat: 1.3644, lng: 103.9915 },
  { code: "SYD", name: "Sydney", city: "Sídney", country: "Australia", lat: -33.9399, lng: 151.1753 },
];

// ----------------------------- Estado global -----------------------------
const state = {
  departure: null, // {code, ...}
  destination: null, // {code, ...}
  durationMinutes: 60,
  view: "setup",
  map: null,
  routeLine: null,
  planeMarker: null,
  rafId: null,
  flightPath: null, // array de [lat, lng] geodésico
  timer: {
    isRunning: false,
    isPaused: false,
    startEpochMs: 0,
    durationMs: 0,
    pauseAccumulatedMs: 0,
    lastPauseStartMs: 0,
  },
  audio: {
    ctx: null,
    masterGain: null,
    whiteNoise: { source: null, gain: null },
    engine: { source: null, filter: null, lfo: null, lfoGain: null, gain: null },
    volume: 0.25,
  },
  picker: {
    map: null,
    markers: new Map(), // code -> marker
    selected: null, // airport object seleccionado en overlay
  },
};

// ----------------------------- Utilidades -----------------------------
function formatDurationHMS(totalMs) {
  const ms = Math.max(0, Math.floor(totalMs));
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const h = hours.toString().padStart(2, "0");
  const m = minutes.toString().padStart(2, "0");
  const s = seconds.toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function degreesToRadians(deg) { return (deg * Math.PI) / 180; }
function radiansToDegrees(rad) { return (rad * 180) / Math.PI; }

function computeBearingDegrees(lat1, lng1, lat2, lng2) {
  const φ1 = degreesToRadians(lat1);
  const φ2 = degreesToRadians(lat2);
  const Δλ = degreesToRadians(lng2 - lng1);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  let θ = Math.atan2(y, x);
  θ = (radiansToDegrees(θ) + 360) % 360; // normaliza a [0, 360)
  return θ;
}

function interpolateLinear(a, b, t) { return a + (b - a) * t; }

// Distancia gran círculo (Haversine) en km
function greatCircleDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const φ1 = degreesToRadians(lat1);
  const φ2 = degreesToRadians(lat2);
  const Δφ = degreesToRadians(lat2 - lat1);
  const Δλ = degreesToRadians(lon2 - lon1);
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.asin(Math.min(1, Math.sqrt(a)));
  return R * c;
}

// Puntos intermedios de geodésica mediante slerp
function generateGreatCirclePoints(lat1, lon1, lat2, lon2, segments = 128) {
  const φ1 = degreesToRadians(lat1);
  const λ1 = degreesToRadians(lon1);
  const φ2 = degreesToRadians(lat2);
  const λ2 = degreesToRadians(lon2);

  const sinφ1 = Math.sin(φ1), cosφ1 = Math.cos(φ1);
  const sinφ2 = Math.sin(φ2), cosφ2 = Math.cos(φ2);
  const Δλ = λ2 - λ1;
  const a = Math.sin((φ2 - φ1) / 2) ** 2 + cosφ1 * cosφ2 * Math.sin(Δλ / 2) ** 2;
  const δ = 2 * Math.asin(Math.min(1, Math.sqrt(a))); // angular distance

  if (δ === 0) return [[lat1, lon1]];

  const points = [];
  for (let i = 0; i <= segments; i++) {
    const f = i / segments;
    const A = Math.sin((1 - f) * δ) / Math.sin(δ);
    const B = Math.sin(f * δ) / Math.sin(δ);

    const x = A * cosφ1 * Math.cos(λ1) + B * cosφ2 * Math.cos(λ2);
    const y = A * cosφ1 * Math.sin(λ1) + B * cosφ2 * Math.sin(λ2);
    const z = A * sinφ1 + B * sinφ2;

    const φi = Math.atan2(z, Math.sqrt(x * x + y * y));
    const λi = Math.atan2(y, x);
    points.push([radiansToDegrees(φi), radiansToDegrees(λi)]);
  }
  return points;
}

function lookupAirportByCode(code) {
  const u = (code || "").trim().toUpperCase();
  return AIRPORTS.find(a => a.code === u) || null;
}

function searchAirportFromInput(value) {
  if (!value) return null;
  const raw = value.trim();
  const maybeCode = raw.split(/\s|-|—/)[0].toUpperCase();
  if (/^[A-Z]{3}$/.test(maybeCode)) {
    const byCode = lookupAirportByCode(maybeCode);
    if (byCode) return byCode;
  }
  // buscar por nombre/ciudad
  const lower = raw.toLowerCase();
  return (
    AIRPORTS.find(a => a.name.toLowerCase().includes(lower)) ||
    AIRPORTS.find(a => a.city.toLowerCase().includes(lower)) ||
    null
  );
}

function airportShortLabel(a) { return `${a.code} — ${a.city}, ${a.country}`; }
function airportFullName(a) { return `${a.name} (${a.code}) — ${a.city}, ${a.country}`; }

function saveLastSelections() {
  try {
    const payload = {
      dep: state.departure?.code || null,
      dst: state.destination?.code || null,
      dur: state.durationMinutes,
    };
    localStorage.setItem("ff_last", JSON.stringify(payload));
  } catch {}
}

function restoreLastSelections() {
  try {
    const raw = localStorage.getItem("ff_last");
    if (!raw) return;
    const { dep, dst, dur } = JSON.parse(raw);
    if (dep) state.departure = lookupAirportByCode(dep);
    if (dst) state.destination = lookupAirportByCode(dst);
    if (dur && Number.isFinite(dur)) state.durationMinutes = dur;
  } catch {}
}

// ----------------------------- UI / Navegación -----------------------------
function setView(id) {
  state.view = id;
  document.querySelectorAll(".view").forEach(v => v.classList.remove("visible"));
  document.getElementById(`view-${id}`).classList.add("visible");
}

// (Se elimina datalist; ahora hay selector visual)

function syncSetupFormFromState() {
  const depTag = document.getElementById("selected-departure");
  const durSelect = document.getElementById("select-duration");

  depTag.textContent = state.departure ? airportFullName(state.departure) : "No seleccionado";
  durSelect.value = String(state.durationMinutes);

  renderDestinationSuggestions();
  validateGenerateButton();
}

function validateGenerateButton() {
  const btn = document.getElementById("btn-generate");
  const ok = Boolean(state.departure && state.destination && state.departure.code !== state.destination.code);
  btn.disabled = !ok;
}

function attachSetupHandlers() {
  const durSelect = document.getElementById("select-duration");
  const genBtn = document.getElementById("btn-generate");
  const btnPick = document.getElementById("btn-pick-departure");

  const onChange = () => {
    state.durationMinutes = parseInt(durSelect.value, 10);
    state.destination = null; // duración cambia => recalcula
    renderDestinationSuggestions();
    validateGenerateButton();
    saveLastSelections();
  };

  durSelect.addEventListener("change", onChange);
  genBtn.addEventListener("click", () => {
    renderBoardingPass();
    setView("boarding");
  });
  btnPick.addEventListener("click", () => openAirportPicker());
}

function renderBoardingPass() {
  const bpDep = document.getElementById("bp-departure");
  const bpDst = document.getElementById("bp-destination");
  const bpDur = document.getElementById("bp-duration");
  bpDep.textContent = state.departure ? airportFullName(state.departure) : "—";
  bpDst.textContent = state.destination ? airportFullName(state.destination) : "—";
  bpDur.textContent = `${state.durationMinutes} min`;
}

// ----------------------------- Selector visual de aeropuertos -----------------------------
function openAirportPicker() {
  const overlay = document.getElementById("airport-picker");
  overlay.classList.add("visible");
  overlay.setAttribute("aria-hidden", "false");
  initAirportPickerIfNeeded();
  setTimeout(() => state.picker.map && state.picker.map.invalidateSize(), 50);
}

function closeAirportPicker() {
  const overlay = document.getElementById("airport-picker");
  overlay.classList.remove("visible");
  overlay.setAttribute("aria-hidden", "true");
}

function initAirportPickerIfNeeded() {
  if (state.picker.map) return;
  const map = L.map("airport-map", { worldCopyJump: true });
  const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 7, attribution: "&copy; OpenStreetMap" });
  tiles.addTo(map);
  state.picker.map = map;

  // posicion inicial global
  map.setView([30, 0], 2);

  // crea marcadores
  AIRPORTS.forEach(a => {
    const marker = L.circleMarker([a.lat, a.lng], {
      radius: 6,
      color: "#76d1ff",
      weight: 1,
      fillColor: "#76d1ff",
      fillOpacity: 0.5,
    });
    marker.addTo(map).bindTooltip(`${airportFullName(a)}`, { direction: 'top' });
    marker.on('click', () => {
      state.picker.selected = a;
      updateAirportPickerSelection();
    });
    state.picker.markers.set(a.code, marker);
  });

  // botones overlay
  document.getElementById('ap-close').onclick = () => closeAirportPicker();
  document.getElementById('ap-cancel').onclick = () => { state.picker.selected = null; updateAirportPickerSelection(); closeAirportPicker(); };
  document.getElementById('ap-confirm').onclick = () => {
    if (!state.picker.selected) return;
    state.departure = state.picker.selected;
    state.destination = null;
    state.picker.selected = null;
    closeAirportPicker();
    syncSetupFormFromState();
  };
}

function updateAirportPickerSelection() {
  const sel = document.getElementById('ap-selection');
  const btn = document.getElementById('ap-confirm');
  if (state.picker.selected) {
    sel.textContent = airportFullName(state.picker.selected);
    btn.disabled = false;
    // resaltar marcador seleccionado
    state.picker.markers.forEach((m, code) => {
      const selected = code === state.picker.selected.code;
      m.setStyle({
        radius: selected ? 8 : 6,
        color: selected ? '#6bdcc2' : '#76d1ff',
        fillColor: selected ? '#6bdcc2' : '#76d1ff',
        fillOpacity: selected ? 0.7 : 0.5,
      });
    });
  } else {
    sel.textContent = 'No seleccionado';
    btn.disabled = true;
  }
}

// ----------------------------- Sugerencias de destino -----------------------------
function renderDestinationSuggestions() {
  const grid = document.getElementById("dest-suggestions");
  if (!grid) return;
  grid.innerHTML = "";

  const dep = state.departure;
  if (!dep) {
    grid.innerHTML = '<div class="helper">Primero elige el aeropuerto de salida.</div>';
    return;
  }

  const base = AIRPORTS.filter(a => a.code !== dep.code);
  const durMin = state.durationMinutes;
  const CRUISE_KMH = 820; // velocidad de crucero aproximada
  const targetKm = (CRUISE_KMH * durMin) / 60;
  const tolerance = Math.max(200, targetKm * 0.25); // al menos 200km o ±25%

  const scored = base.map(a => {
    const d = greatCircleDistanceKm(dep.lat, dep.lng, a.lat, a.lng);
    const diff = Math.abs(d - targetKm);
    const within = d >= targetKm - tolerance && d <= targetKm + tolerance;
    return { a, d, diff, within };
  });

  // prioriza los que caen dentro del rango, ordenados por cercanía a target
  const within = scored.filter(s => s.within).sort((x, y) => x.diff - y.diff);
  const outside = scored.filter(s => !s.within).sort((x, y) => x.diff - y.diff);
  const combined = [...within, ...outside];
  const top = combined.slice(0, 8);
  top.forEach(a => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "suggestion" + (state.destination?.code === a.a.code ? " selected" : "");
    const title = document.createElement("div");
    title.className = "title";
    title.textContent = airportFullName(a.a);
    const sub = document.createElement("div");
    sub.className = "subtitle";
    const bearing = Math.round(computeBearingDegrees(dep.lat, dep.lng, a.a.lat, a.a.lng));
    const mins = Math.round((a.d / CRUISE_KMH) * 60);
    sub.textContent = `${dep.code} → ${a.a.code} · ${Math.round(a.d)} km · ~${mins} min · rumbo ${bearing}°`;
    card.appendChild(title);
    card.appendChild(sub);
    card.addEventListener("click", () => {
      state.destination = a.a;
      grid.querySelectorAll('.suggestion').forEach(el => el.classList.remove('selected'));
      card.classList.add('selected');
      validateGenerateButton();
      saveLastSelections();
    });
    grid.appendChild(card);
  });
}

function dedupe(list) {
  const seen = new Set();
  const out = [];
  for (const item of list) {
    if (seen.has(item.code)) continue;
    seen.add(item.code);
    out.push(item);
  }
  return out;
}

function attachBoardingHandlers() {
  document.getElementById("btn-edit").addEventListener("click", () => {
    setView("setup");
  });
  document.getElementById("btn-board").addEventListener("click", async () => {
    await ensureAudioContext();
    startFlight();
  });
}

// ----------------------------- Mapa y vuelo -----------------------------
function initMapIfNeeded() {
  if (state.map) return;
  const map = L.map("map", {
    zoomControl: false,
    worldCopyJump: true,
  });
  const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap",
  });
  tiles.addTo(map);
  state.map = map;
}

function fitMapToRoute() {
  const bounds = L.latLngBounds([
    [state.departure.lat, state.departure.lng],
    [state.destination.lat, state.destination.lng],
  ]);
  state.map.fitBounds(bounds.pad(0.25));
}

function drawRouteLine() {
  if (state.routeLine) {
    state.routeLine.removeFrom(state.map);
    state.routeLine = null;
  }
  // calcula geodésica
  state.flightPath = generateGreatCirclePoints(
    state.departure.lat, state.departure.lng,
    state.destination.lat, state.destination.lng,
    256
  );
  const line = L.polyline(state.flightPath, { color: "#76d1ff", weight: 3, opacity: 0.9 });
  line.addTo(state.map);
  state.routeLine = line;
}

function createOrUpdatePlaneMarker(lat, lng, bearingDeg) {
  const svg = `
  <svg class="plane" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="#fff">
      <path d="M32 2l6 20 20 6-18 6 6 18-14-12-14 12 6-18-18-6 20-6z"/>
    </g>
  </svg>`;

  if (!state.planeMarker) {
    const icon = L.divIcon({
      className: "plane-marker",
      html: svg,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });
    state.planeMarker = L.marker([lat, lng], { icon }).addTo(state.map);
  } else {
    state.planeMarker.setLatLng([lat, lng]);
  }

  const iconEl = state.planeMarker.getElement();
  if (iconEl) {
    const plane = iconEl.querySelector(".plane");
    if (plane) {
      plane.style.transform = `translate(-50%, -50%) rotate(${bearingDeg}deg)`;
    }
  }
}

function startFlight() {
  setView("flight");
  initMapIfNeeded();
  fitMapToRoute();
  drawRouteLine();

  // Inicializa temporizador
  state.timer.durationMs = state.durationMinutes * 60 * 1000;
  state.timer.startEpochMs = performance.now();
  state.timer.pauseAccumulatedMs = 0;
  state.timer.lastPauseStartMs = 0;
  state.timer.isRunning = true;
  state.timer.isPaused = false;

  // Botones
  const pauseBtn = document.getElementById("btn-pause");
  pauseBtn.textContent = "Pausar";
  pauseBtn.onclick = () => togglePause();
  document.getElementById("btn-cancel").onclick = () => cancelFlight();

  // Audio: aplica volumen
  const vol = document.getElementById("volume");
  vol.value = String(state.audio.volume);
  vol.oninput = () => setMasterVolume(parseFloat(vol.value));

  document.getElementById("toggle-white-noise").onchange = (e) => {
    if (e.target.checked) startWhiteNoise(); else stopWhiteNoise();
  };
  document.getElementById("toggle-engine").onchange = (e) => {
    if (e.target.checked) startEngine(); else stopEngine();
  };

  // Arranca animación
  startAnimationLoop();
}

function getElapsedMs() {
  if (!state.timer.isRunning) return 0;
  const now = performance.now();
  const pausedPart = state.timer.pauseAccumulatedMs + (state.timer.isPaused ? (now - state.timer.lastPauseStartMs) : 0);
  return now - state.timer.startEpochMs - pausedPart;
}

function getRemainingMs() {
  return Math.max(0, state.timer.durationMs - getElapsedMs());
}

function startAnimationLoop() {
  const loop = () => {
    const remaining = getRemainingMs();
    const elapsed = state.timer.durationMs - remaining;
    const t = Math.min(1, Math.max(0, elapsed / state.timer.durationMs));

    let lat = state.departure.lat;
    let lng = state.departure.lng;
    let bearing = computeBearingDegrees(state.departure.lat, state.departure.lng, state.destination.lat, state.destination.lng);
    if (Array.isArray(state.flightPath) && state.flightPath.length > 1) {
      const N = state.flightPath.length;
      const pos = t * (N - 1);
      const i = Math.max(0, Math.min(N - 2, Math.floor(pos)));
      const frac = pos - i;
      const p0 = state.flightPath[i];
      const p1 = state.flightPath[i + 1];
      lat = interpolateLinear(p0[0], p1[0], frac);
      lng = interpolateLinear(p0[1], p1[1], frac);
      bearing = computeBearingDegrees(p0[0], p0[1], p1[0], p1[1]);
    }
    createOrUpdatePlaneMarker(lat, lng, bearing);

    // Actualiza tiempo cada frame para suavidad (texto muestra h:m:s)
    const disp = document.getElementById("timer-display");
    disp.textContent = formatDurationHMS(remaining);

    // progreso
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = `${Math.round(t * 100)}%`;

    if (remaining <= 0) {
      endFlight();
      return;
    }

    state.rafId = requestAnimationFrame(loop);
  };

  cancelAnimationFrame(state.rafId);
  state.rafId = requestAnimationFrame(loop);
}

function togglePause() {
  if (!state.timer.isRunning) return;
  const btn = document.getElementById("btn-pause");
  if (!state.timer.isPaused) {
    // Pausar
    state.timer.isPaused = true;
    state.timer.lastPauseStartMs = performance.now();
    btn.textContent = "Reanudar";
    cancelAnimationFrame(state.rafId);
    suspendAudio();
  } else {
    // Reanudar
    state.timer.isPaused = false;
    state.timer.pauseAccumulatedMs += performance.now() - state.timer.lastPauseStartMs;
    btn.textContent = "Pausar";
    resumeAudio();
    startAnimationLoop();
  }
}

function cancelFlight() {
  state.timer.isRunning = false;
  cancelAnimationFrame(state.rafId);
  stopWhiteNoise();
  stopEngine();
  setView("setup");
}

function endFlight() {
  state.timer.isRunning = false;
  cancelAnimationFrame(state.rafId);
  stopWhiteNoise();
  stopEngine();
  // Muestra una breve animación o alerta simple
  alert("¡Has aterrizado! Buen trabajo ✈️");
  setView("setup");
}

// ----------------------------- Audio -----------------------------
async function ensureAudioContext() {
  if (state.audio.ctx) return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  master.gain.value = state.audio.volume;
  master.connect(ctx.destination);
  state.audio.ctx = ctx;
  state.audio.masterGain = master;
}

function setMasterVolume(v) {
  state.audio.volume = v;
  if (state.audio.masterGain) state.audio.masterGain.gain.value = v;
}

function suspendAudio() {
  if (state.audio.ctx && state.audio.ctx.state === "running") state.audio.ctx.suspend();
}
function resumeAudio() {
  if (state.audio.ctx && state.audio.ctx.state !== "running") state.audio.ctx.resume();
}

function createNoiseBuffer(ctx, seconds = 2) {
  const sampleRate = ctx.sampleRate;
  const frameCount = seconds * sampleRate;
  const buffer = ctx.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    data[i] = Math.random() * 2 - 1; // ruido blanco
  }
  return buffer;
}

function startWhiteNoise() {
  if (!state.audio.ctx) return;
  stopWhiteNoise();
  const source = state.audio.ctx.createBufferSource();
  source.buffer = createNoiseBuffer(state.audio.ctx, 2);
  source.loop = true;
  const gain = state.audio.ctx.createGain();
  gain.gain.value = 0.35; // relativo al master
  source.connect(gain).connect(state.audio.masterGain);
  source.start();
  state.audio.whiteNoise.source = source;
  state.audio.whiteNoise.gain = gain;
}
function stopWhiteNoise() {
  if (state.audio.whiteNoise.source) {
    try { state.audio.whiteNoise.source.stop(0); } catch {}
    try { state.audio.whiteNoise.source.disconnect(); } catch {}
  }
  state.audio.whiteNoise.source = null;
  state.audio.whiteNoise.gain = null;
}

function startEngine() {
  if (!state.audio.ctx) return;
  stopEngine();
  // motor: ruido blanco filtrado + LFO de amplitud para un leve vaivén
  const ctx = state.audio.ctx;
  const source = ctx.createBufferSource();
  source.buffer = createNoiseBuffer(ctx, 2);
  source.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 400; // recorta agudos
  filter.Q.value = 0.0001;

  const gain = ctx.createGain();
  gain.gain.value = 0.25;

  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 2.0; // 2 Hz
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.12; // profundidad de modulación

  lfo.connect(lfoGain).connect(gain.gain);
  source.connect(filter).connect(gain).connect(state.audio.masterGain);

  source.start();
  lfo.start();

  state.audio.engine.source = source;
  state.audio.engine.filter = filter;
  state.audio.engine.lfo = lfo;
  state.audio.engine.lfoGain = lfoGain;
  state.audio.engine.gain = gain;
}
function stopEngine() {
  const e = state.audio.engine;
  if (e.source) { try { e.source.stop(0); } catch {} try { e.source.disconnect(); } catch {} }
  if (e.lfo) { try { e.lfo.stop(0); } catch {} try { e.lfo.disconnect(); } catch {} }
  if (e.filter) { try { e.filter.disconnect(); } catch {} }
  if (e.lfoGain) { try { e.lfoGain.disconnect(); } catch {} }
  if (e.gain) { try { e.gain.disconnect(); } catch {} }
  e.source = e.filter = e.lfo = e.lfoGain = e.gain = null;
}

// ----------------------------- Inicio -----------------------------
function init() {
  restoreLastSelections();
  attachSetupHandlers();
  attachBoardingHandlers();
  syncSetupFormFromState();
  // abrir picker al entrar si no hay salida seleccionada
  if (!state.departure) {
    setTimeout(() => openAirportPicker(), 200);
  }
}

document.addEventListener("DOMContentLoaded", init);
