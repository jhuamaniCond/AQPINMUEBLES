<template>
  <div id="map" class="h-full w-full"></div>
</template>

<script>
import { onMounted, watch,ref } from "vue";
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
    
    const houseIcon = L.icon({
      iconUrl: houseIconUrl,   
      iconSize: [40, 40],      // tamaño del ícono
      iconAnchor: [20, 40],    // punto de anclaje (mitad abajo)
      popupAnchor: [0, -40],   // dónde aparece el popup
    });

    const fitToMarkers = () => {
      if (map.value && houseMarker && uniMarker) {
        const bounds = L.latLngBounds(
          [props.latitudCasa, props.longitudCasa],
          [props.latitudUni, props.longitudUni]
        );
        map.value.fitBounds(bounds, { padding: [50, 50] });
      }
    };

    const drawRecorrido = () => {
      const routing = L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1/"
      });

      routing.route(
        [
          { latLng: L.latLng(props.latitudCasa, props.longitudCasa) },
          { latLng: L.latLng(props.latitudUni, props.longitudUni) }
        ],
        (err, routes) => {
          if (!err && routes.length > 0) {
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


    const drawRecorridoCaminando = async () => {
      try {
        // Coordenadas inicio y fin
        const start = `${props.longitudCasa},${props.latitudCasa}`;
        const end = `${props.longitudUni},${props.latitudUni}`;

        // Perfil de enrutamiento (puedes cambiar a "driving-car", "cycling-regular", etc.)
        const profile = "foot-walking";

        // Tu API Key de OpenRouteService
        const apiKey = "APIKEY_AQUI";

        // URL (con proxy CORS si trabajas en local)
        const url = `https://cors-anywhere.herokuapp.com/https://api.openrouteservice.org/v2/directions/${profile}?api_key=${apiKey}&start=${start}&end=${end}`;

        // Llamada a ORS
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Accept": "application/geo+json, application/json", // ORS exige esto
            "Content-Type": "application/json; charset=utf-8"
          }
        });

        // Manejo de errores
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`ORS error ${res.status}: ${errorText}`);
        }

        // Parsear respuesta
        const data = await res.json();

        // Extraer coordenadas (ORS devuelve [lon, lat], se invierte a [lat, lon])
        const coords = data.features[0].geometry.coordinates.map(c => [c[1], c[0]]);

        // Si ya hay una ruta dibujada, la eliminamos
        if (routeLine) {
          map.value.removeLayer(routeLine);
        }

        // Dibujar la nueva polyline en el mapa
        routeLine = L.polyline(coords, {
          color: "#2563eb", // azul
          weight: 5,
          opacity: 0.8
        }).addTo(map.value);

        // Mostrar distancia y duración en consola
        const summary = data.features[0].properties.summary;
        console.log("Distancia (m):", summary.distance);
        console.log("Duración (s):", summary.duration);

      } catch (err) {
        console.error("Error calculando ruta:", err);
      }
    };


    const createUniIcon = (url) => {
      const resolvedUrl = new URL(url, import.meta.url).href;
      return L.divIcon({
        className: "custom-uni-icon",
        html: `
          <div class="uni-marker">
            <img src="${resolvedUrl}" alt="uni" />
          </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50],
      });
    };

    onMounted(() => {
      map.value = L.map("map").setView([props.latitudCasa, props.longitudCasa], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      }).addTo(map.value);

      markerLayer = L.layerGroup().addTo(map.value);

      houseMarker = L.marker([props.latitudCasa, props.longitudCasa], { icon: houseIcon }).addTo(markerLayer);

      uniMarker = L.marker(
                  [props.latitudUni, props.longitudUni], 
                  { icon: createUniIcon(props.UniImgUrl) }
                ).addTo(markerLayer);
      
      drawRecorrido();

      fitToMarkers();
    });

    watch(
      () => [props.latitudCasa, props.longitudCasa],
      ([newLat, newLng]) => {
        if (map.value && houseMarker) {
          
          houseMarker.setLatLng([newLat, newLng]);
          drawRecorrido();
          fitToMarkers();
        }
      }
    );

     watch(
      () => [props.latitudUni, props.longitudUni],
      ([newLat, newLng]) => {
        if (map.value && uniMarker) {
          
          uniMarker.setLatLng([newLat, newLng]);
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
  background-color: white; /* azul Tailwind (blue-600) */
  border-radius: 50%;        /* redondeado completo */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}

.uni-marker img {
  width: 70%;   /* que no ocupe todo el círculo */
  height: 70%;
  object-fit: contain;
}

</style>