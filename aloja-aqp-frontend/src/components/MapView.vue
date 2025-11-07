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

    const drawRecorrido = () => {
      const houseLatLng = getHouseLatLng();
      const uniLatLng = getUniLatLng();
      if (!houseLatLng || !uniLatLng) return; // nothing to draw

      const routing = L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1/"
      });

      routing.route(
        [
          { latLng: L.latLng(houseLatLng[0], houseLatLng[1]) },
          { latLng: L.latLng(uniLatLng[0], uniLatLng[1]) }
        ],
        (err, routes) => {
          if (!err && routes && routes.length > 0) {
            const bestRoute = routes[0];

            // Si ya hay una ruta dibujada, eliminarla
            if (routeLine) {
              map.value.removeLayer(routeLine);
            }

            // Azul externo (bordes)
            const blueOuter = L.polyline(bestRoute.coordinates, {
              color: "#2563eb",
              weight: 8,
              opacity: 1
            });

            // Blanco en el medio
            const whiteMiddle = L.polyline(bestRoute.coordinates, {
              color: "#ffffff",
              weight: 6,
              opacity: 1
            });

            // Azul fino encima (para remarcar)
            const blueInner = L.polyline(bestRoute.coordinates, {
              color: "#2563eb",
              weight: 2,
              opacity: 1
            });

            // Agrupar todas las capas
            routeLine = L.layerGroup([blueOuter, whiteMiddle, blueInner]).addTo(map.value);

            emit("ruta-calculada", {
              distancia: bestRoute.summary.totalDistance,
              duracion: bestRoute.summary.totalTime
            });

            console.log("Distancia (m):", bestRoute.summary.totalDistance);
            console.log("Duración (s):", bestRoute.summary.totalTime);
          } else {
            console.error("Error calculando ruta:", err);
          }
        }
      );
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