<template>
  <div class="map-page">
    <!-- Título flotante -->
    <div class="map-title">Casas en renta - Arequipa</div>

    <!-- Botón para abrir/cerrar filtros -->
    <button class="toggle-btn" @click="toggleSidebar">
      {{ showSidebar ? "✖" : "☰ Filtros" }}
    </button>

    <!-- Panel flotante de filtros -->
    <transition name="slide">
      <div class="sidebar" v-if="showSidebar">
        <h3>Filtros</h3>

        <!-- Selección de universidad -->
        <label for="uni">Universidad</label>
        <select v-model="selectedUniversity" id="uni">
          <option disabled value="">Selecciona universidad</option>
          <option v-for="u in universities" :key="u" :value="u">{{ u }}</option>
        </select>

        <!-- Filtro por distancia -->
        <label for="distance">Distancia (km)</label>
        <input
          type="range"
          id="distance"
          min="1"
          max="20"
          v-model="distance"
        />
        <span>{{ distance }} km</span>

        <!-- Filtro por precio -->
        <label for="price">Precio máximo (S/.)</label>
        <input
          type="range"
          id="price"
          min="300"
          max="2000"
          step="50"
          v-model="maxPrice"
        />
        <span>S/. {{ maxPrice }}</span>

        <button class="apply-btn" @click="applyFilters">
          Aplicar filtros
        </button>
      </div>
    </transition>

    <!-- Contenedor del mapa -->
    <div id="map"></div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "MapPage",
  data() {
    return {
      map: null,
      showSidebar: false,
      universities: ["UNSA", "UCSP", "Continental", "UCSM"],
      selectedUniversity: "",
      distance: 5,
      maxPrice: 1000,
    };
  },
  mounted() {
    // 1. Leer coordenadas desde la URL
    const lat = parseFloat(this.$route.query.lat) || -16.409;
    const lng = parseFloat(this.$route.query.lng) || -71.5375;

    // 2. Crear mapa centrado en esas coordenadas
    this.map = L.map("map", { zoomControl: false }).setView([lat, lng], 15);

    // 3. Control de zoom en esquina inferior derecha
    L.control.zoom({ position: "bottomright" }).addTo(this.map);

    // 4. Cargar tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map);

    // 5. Poner marcador en coordenadas recibidas
    L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup("Ubicación seleccionada")
      .openPopup();
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    applyFilters() {
      alert(
        `Filtrando:\nUniversidad: ${this.selectedUniversity}\nDistancia: ${this.distance} km\nPrecio máx: S/. ${this.maxPrice}`
      );
    },
  },
};
</script>


<style scoped>
.map-page {
  height: 100vh;
  width: 100vw;
  position: relative;
}

#map {
  height: 100%;
  width: 100%;
}

/* Título flotante */
.map-title {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

/* Botón de abrir/cerrar filtros */
.toggle-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  z-index: 1100;
}
.toggle-btn:hover {
  background: #1565c0;
}

/* Panel lateral izquierdo */
.sidebar {
  position: absolute;
  top: 50px;
  left: 10px;
  width: 260px;
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
  z-index: 1050;
}

.sidebar h3 {
  margin-top: 0;
  font-size: 18px;
  text-align: center;
}

.sidebar label {
  display: block;
  margin: 10px 0 4px;
  font-size: 14px;
  font-weight: bold;
}

.sidebar select,
.sidebar input[type="range"] {
  width: 100%;
  margin-bottom: 5px;
}

.sidebar span {
  display: block;
  margin-bottom: 10px;
  font-size: 13px;
  color: #555;
}

.apply-btn {
  width: 100%;
  padding: 8px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.apply-btn:hover {
  background: #1565c0;
}

/* Animación de entrada/salida de la barra */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-120%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-120%);
  opacity: 0;
}
</style>
