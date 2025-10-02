<template>
  <div id="map" class="h-full w-full"></div>
</template>

<script>
import { onMounted, watch,ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import houseIconUrl from "../assets/house.svg";

export default {
  name: "MapView",
  props: {
    latitud: {
      type: Number,
      default: -16.409047, // Coordenada por defecto (Arequipa)
    },
    longitud: {
      type: Number,
      default: -71.537451, // Coordenada por defecto (Arequipa)
    },
  },
  setup(props) {
    const map = ref(null);
    let markerLayer = null; 
    let marker = null;

    const houseIcon = L.icon({
      iconUrl: houseIconUrl,   
      iconSize: [40, 40],      // tamaño del ícono
      iconAnchor: [20, 40],    // punto de anclaje (mitad abajo)
      popupAnchor: [0, -40],   // dónde aparece el popup
    });


    onMounted(() => {
      map.value = L.map("map").setView([props.latitud, props.longitud], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      }).addTo(map.value);

      markerLayer = L.layerGroup().addTo(map.value);

      marker = L.marker([props.latitud, props.longitud], { icon: houseIcon }).addTo(markerLayer);
    });

    

    watch(
      () => [props.latitud, props.longitud],
      ([newLat, newLng]) => {
        if (map.value && marker) {
          map.value.setView([newLat, newLng], 13); 
          marker.setLatLng([newLat, newLng]);

        }
      }
    );

  },
};
</script>
