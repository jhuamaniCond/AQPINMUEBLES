<template>
    <div id="select-map" class="h-full w-full rounded-lg overflow-hidden"></div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import houseIconUrl from "../../../assets/house.svg";

export default {
    name: "SelectLocationMap",
    emits: ["ubicacion-seleccionada"],
    setup(_, { emit }) {
        const map = ref(null);
        let markerLayer = null;
        let houseMarker = null;

        const houseIcon = L.icon({
            iconUrl: houseIconUrl,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
        });

        onMounted(async () => {
            await nextTick();

            // Crear el mapa centrado en una posición por defecto
            map.value = L.map("select-map").setView([-16.409047, -71.537451], 13);

            // Cargar los tiles de OpenStreetMap
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            }).addTo(map.value);

            // Capa para los marcadores
            markerLayer = L.layerGroup().addTo(map.value);

            // Escuchar clics en el mapa
            map.value.on("click", (e) => {
                const { lat, lng } = e.latlng;

                // Si ya hay un marcador, moverlo
                if (houseMarker) {
                    houseMarker.setLatLng([lat, lng]);
                } else {
                    // Crear un nuevo marcador
                    houseMarker = L.marker([lat, lng], { icon: houseIcon })
                        .addTo(markerLayer)
                        .bindPopup("Selected Location")
                        .openPopup();
                }

                // Emitir la ubicación al componente padre
                emit("ubicacion-seleccionada", { latitud: lat, longitud: lng });
            });

            // Asegurar que el mapa se renderice bien si está en un contenedor oculto
            const ensureSize = () => {
                if (map.value && map.value._container.offsetHeight > 0) {
                    setTimeout(() => {
                        map.value.invalidateSize();
                        map.value.setView([-16.409047, -71.537451], 13);
                    }, 100);
                } else {
                    requestAnimationFrame(ensureSize);
                }
            };
            ensureSize();
        });

        return {};
    },
};
</script>

<style scoped>
#select-map {
    min-height: 300px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* Animación suave al colocar el marcador */
.leaflet-marker-icon {
    transition: transform 0.2s ease-in-out;
}
</style>
