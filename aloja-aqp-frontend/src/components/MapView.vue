<template>
  <div id="map" class="h-full w-full"></div>
</template>

<script>
import { onMounted, watch, ref, nextTick } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import houseIconUrl from "../assets/house.svg";

export default {
  name: "MapView",
  props: {
    latitudCasa: Number,
    longitudCasa: Number,
    latitudUni: Number,
    longitudUni: Number,
    UniImgUrl: String,
  },
  emits: ["ruta-calculada"],
  setup(props, { emit }) {
  const map = ref(null);
  let markerLayer = null;
  let houseMarker = null;
  let uniMarker = null;
  let routeLine = null;

  const validNumber = (v) => typeof v === "number" && !isNaN(v);
  const getHouseLatLng = () => (validNumber(props.latitudCasa) && validNumber(props.longitudCasa)) ? [props.latitudCasa, props.longitudCasa] : null;
  const getUniLatLng = () => (validNumber(props.latitudUni) && validNumber(props.longitudUni)) ? [props.latitudUni, props.longitudUni] : null;

    const houseIcon = L.icon({
      iconUrl: houseIconUrl,
      iconSize: [40, 40],      // tamaño del ícono
      iconAnchor: [20, 40],    // punto de anclaje (mitad abajo)
      popupAnchor: [0, -40],   // dónde aparece el popup
    });

    const fitToMarkers = () => {
      const houseLatLng = getHouseLatLng();
      const uniLatLng = getUniLatLng();
      if (map.value && houseLatLng && uniLatLng) {
        const bounds = L.latLngBounds(houseLatLng, uniLatLng);
        map.value.fitBounds(bounds, { padding: [50, 50] });
      }
    };

    const haversineDistance = (a, b) => {
      // a and b are [lat, lng]
      const toRad = (v) => (v * Math.PI) / 180;
      const lat1 = a[0];
      const lon1 = a[1];
      const lat2 = b[0];
      const lon2 = b[1];
      const R = 6371000; // m
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const radLat1 = toRad(lat1);
      const radLat2 = toRad(lat2);
      const sinDLat = Math.sin(dLat / 2);
      const sinDLon = Math.sin(dLon / 2);
      const aHarv = sinDLat * sinDLat + Math.cos(radLat1) * Math.cos(radLat2) * sinDLon * sinDLon;
      const c = 2 * Math.atan2(Math.sqrt(aHarv), Math.sqrt(1 - aHarv));
      return R * c;
    };

    const drawRecorrido = async () => {
      const houseLatLng = getHouseLatLng();
      const uniLatLng = getUniLatLng();
      if (!houseLatLng || !uniLatLng) {
        console.warn('drawRecorrido: coordenadas faltantes', { houseLatLng, uniLatLng });
        return; // nothing to draw
      }

      // Ensure numeric types
      const hLat = Number(houseLatLng[0]);
      const hLng = Number(houseLatLng[1]);
      const uLat = Number(uniLatLng[0]);
      const uLng = Number(uniLatLng[1]);
      if ([hLat, hLng, uLat, uLng].some((v) => Number.isNaN(v))) {
        console.error('drawRecorrido: coordenadas inválidas', { houseLatLng, uniLatLng });
        return;
      }

      console.log('drawRecorrido -> from (lat,lng)', [hLat, hLng], 'to', [uLat, uLng]);

      // Remove previous route if present
      if (routeLine && map.value) {
        try { map.value.removeLayer(routeLine); } catch (e) { /* noop */ }
        routeLine = null;
      }

      // Build a diagnostic OSRM URL (for logging only)
      const base = 'https://router.project-osrm.org/route/v1/driving/';
      const osrmDebugUrl = `${base}${hLng},${hLat};${uLng},${uLat}?overview=full&geometries=geojson`;
      console.log('drawRecorrido -> osrm url (debug):', osrmDebugUrl);

      // Try using Leaflet Routing Machine (OSRM demo by default)
      try {
        const routing = L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1/'
        });

        routing.route(
          [
            { latLng: L.latLng(hLat, hLng) },
            { latLng: L.latLng(uLat, uLng) }
          ],
          (err, routes) => {
            try {
              if (!err && routes && routes.length > 0) {
                const bestRoute = routes[0];

                // extract coordinates for polyline (try multiple shapes)
                let coords = bestRoute.coordinates || bestRoute.geometry || null;
                // If GeoJSON geometry: coordinates are [lon,lat] pairs, convert to [lat,lng]
                if (coords && coords.type === 'LineString' && Array.isArray(coords.coordinates)) {
                  coords = coords.coordinates.map((c) => [c[1], c[0]]);
                }

                // If still null, try route's waypoints -> latLngs
                if (!coords && bestRoute.coordinates && Array.isArray(bestRoute.coordinates)) {
                  coords = bestRoute.coordinates;
                }

                // fallback: if no coords, build simple two-point line
                if (!coords) coords = [[hLat, hLng], [uLat, uLng]];

                // draw layered polyline for style
                const blueOuter = L.polyline(coords, { color: '#2563eb', weight: 8, opacity: 1 });
                const whiteMiddle = L.polyline(coords, { color: '#ffffff', weight: 6, opacity: 1 });
                const blueInner = L.polyline(coords, { color: '#2563eb', weight: 2, opacity: 1 });
                routeLine = L.layerGroup([blueOuter, whiteMiddle, blueInner]).addTo(map.value);

                // Try to extract distance/duration from route summary
                const summary = bestRoute.summary || bestRoute.properties || {};
                const distance = summary.totalDistance ?? summary.distance ?? (summary?.length || null);
                const duration = summary.totalTime ?? summary.duration ?? (summary?.time || null);

                // If the route didn't provide numeric summary, compute haversine fallback
                let finalDistance = typeof distance === 'number' ? distance : haversineDistance([hLat, hLng], [uLat, uLng]);
                let finalDuration = typeof duration === 'number' ? duration : Math.ceil(finalDistance / 10); // estimate: 10 m/s (~36 km/h)

                emit('ruta-calculada', { distancia: finalDistance, duracion: finalDuration });
                console.log('Distancia (m):', finalDistance);
                console.log('Duración (s):', finalDuration);
              } else {
                console.warn('drawRecorrido -> OSRM returned no routes or error', err);
                // fallback: draw straight line and emit estimated distance/duration
                const straight = [[hLat, hLng], [uLat, uLng]];
                routeLine = L.polyline(straight, { color: '#ef4444', weight: 3, dashArray: '6,6' }).addTo(map.value);
                const straightDistance = haversineDistance([hLat, hLng], [uLat, uLng]);
                const straightDuration = Math.ceil(straightDistance / 10);
                emit('ruta-calculada', { distancia: straightDistance, duracion: straightDuration });
                console.log('Fallback distancia (m):', straightDistance, 'duracion (s):', straightDuration);
              }
            } catch (innerErr) {
              console.error('drawRecorrido -> error processing routes callback', innerErr);
            }
          }
        );
      } catch (e) {
        console.error('drawRecorrido -> error initializing routing', e);
        // fallback: draw straight line
        const straight = [[hLat, hLng], [uLat, uLng]];
        routeLine = L.polyline(straight, { color: '#ef4444', weight: 3, dashArray: '6,6' }).addTo(map.value);
        const straightDistance = haversineDistance([hLat, hLng], [uLat, uLng]);
        const straightDuration = Math.ceil(straightDistance / 10);
        emit('ruta-calculada', { distancia: straightDistance, duracion: straightDuration });
      }
    };

    const createUniIcon = (url) => {
      const safeUrl = url || '';
      let src = '';
      try {
        // if absolute URL, use as-is; otherwise try to resolve relative
        if (/^https?:\/\//.test(safeUrl)) src = safeUrl;
        else if (safeUrl) src = new URL(safeUrl, import.meta.url).href;
      } catch (err) {
        console.warn('createUniIcon: unable to resolve url', url, err);
        src = '';
      }
      return L.divIcon({
        className: "custom-uni-icon",
        html: `
          <div class="uni-marker">
            ${src ? `<img src="${src}" alt="uni" />` : '<div style="width:26px;height:26px;border-radius:50%;background:#ef4444"></div>'}
          </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50],
      });
    };

    onMounted(async () => {

      await nextTick();

  // Pick a sensible initial center: house -> uni -> default (Arequipa)
  const houseLatLng = getHouseLatLng();
  const uniLatLng = getUniLatLng();
  const defaultCenter = [-16.409047, -71.537451];
  const initialCenter = houseLatLng || uniLatLng || defaultCenter;
  map.value = L.map("map").setView(initialCenter, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      }).addTo(map.value);

      markerLayer = L.layerGroup().addTo(map.value);

      // Create markers only if coordinates are present
      if (houseLatLng) {
        houseMarker = L.marker(houseLatLng, { icon: houseIcon }).addTo(markerLayer);
      }
      if (uniLatLng) {
        uniMarker = L.marker(uniLatLng, { icon: createUniIcon(props.UniImgUrl) }).addTo(markerLayer);
      }

      

      //para que el mapa no este bug
      const ensureSize = () => {
        if (map.value && map.value._container.offsetHeight > 0) {
          map.value.invalidateSize();
          drawRecorrido();

          fitToMarkers();
        } else {
          requestAnimationFrame(ensureSize);
        }
      };
      ensureSize();


    });

    watch(
      () => [props.latitudCasa, props.longitudCasa],
      ([newLat, newLng]) => {
        const newHouse = (validNumber(newLat) && validNumber(newLng)) ? [newLat, newLng] : null;
        if (map.value) {
          if (newHouse) {
            if (houseMarker) houseMarker.setLatLng(newHouse);
            else houseMarker = L.marker(newHouse, { icon: houseIcon }).addTo(markerLayer);
          }
          drawRecorrido();
          fitToMarkers();
        }
      }
    );

    watch(
      () => [props.latitudUni, props.longitudUni],
      ([newLat, newLng]) => {
        const newUni = (validNumber(newLat) && validNumber(newLng)) ? [newLat, newLng] : null;
        if (map.value) {
          if (newUni) {
            if (uniMarker) uniMarker.setLatLng(newUni);
            else uniMarker = L.marker(newUni, { icon: createUniIcon(props.UniImgUrl) }).addTo(markerLayer);
          }
          drawRecorrido();
          fitToMarkers();
        }
      }
    );

    watch(
      () => props.UniImgUrl,
      (newUrl) => {
        if (uniMarker && newUrl) {
          uniMarker.setIcon(createUniIcon(newUrl));
        }
      }
    );

    return {
      drawRecorrido
    };
  },
};
</script>
<style>
.uni-marker {
  background-color: white;
  /* azul Tailwind (blue-600) */
  border-radius: 50%;
  /* redondeado completo */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.uni-marker img {
  width: 70%;
  /* que no ocupe todo el círculo */
  height: 70%;
  object-fit: contain;
}
</style>