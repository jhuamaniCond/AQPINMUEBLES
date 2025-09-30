<template>
  <div>
    <!-- Barra de búsqueda y filtros -->
    <v-container class="mt-6">
      <v-row class="align-center mb-4" justify="center" no-gutters>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="search"
            label="Ingresa departamentos o distritos"
            variant="outlined"
            density="comfortable"
            clearable
            prepend-inner-icon="mdi-magnify"
          />
        </v-col>

        <v-col cols="12" md="8" class="d-flex flex-wrap justify-center">
          <v-select
            v-model="filters.tipo"
            :items="['Comprar', 'Alquilar']"
            label="Tipo"
            variant="outlined"
            density="comfortable"
            class="mx-2 my-1"
          />
          <v-select
            v-model="filters.propiedad"
            :items="['Departamento', 'Casa', 'Habitación']"
            label="Propiedad"
            variant="outlined"
            density="comfortable"
            class="mx-2 my-1"
          />
          <v-select
            v-model="filters.dormitorios"
            :items="['1', '2', '3', '4+']"
            label="Dormitorios"
            variant="outlined"
            density="comfortable"
            class="mx-2 my-1"
          />
          <v-select
            v-model="filters.precio"
            :items="['< S/500', 'S/500 - S/1000', 'S/1000 - S/1500', 'S/1500+']"
            label="Precio"
            variant="outlined"
            density="comfortable"
            class="mx-2 my-1"
          />
          <v-btn class="mx-2 my-1" variant="outlined">Más filtros</v-btn>
          <v-btn color="primary" class="mx-2 my-1">Crear alerta</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Resultados -->
    <v-container>
      <p class="text-grey-darken-1 mb-4">
        {{ departamentos.length }} Departamentos encontrados en Perú
      </p>
      <v-row>
        <v-col
          v-for="d in departamentos"
          :key="d.id"
          cols="12"
        >
<v-card class="d-flex flex-row elevation-2 mb-4" style="position: relative;">
  <!-- Botón flotante arriba a la derecha -->
  <v-btn
    icon
    class="map-btn"
    @click="goToMap(d.lat, d.lng)"
  >
    <v-img
      src="../public/ubicacion.png"
      alt="Ver en mapa"
      width="24"
      height="24"
      cover
    />
  </v-btn>

  <!-- Imagen -->
  <v-img
    :src="d.imagen"
    width="300"
    height="200"
    cover
  />

  <!-- Info -->
  <div class="pa-4 flex-grow-1">
    <h3 class="text-h6 font-weight-bold">S/ {{ d.precio }}</h3>
    <p class="text-subtitle-2">{{ d.direccion }}</p>
    <p class="text-body-2 text-grey-darken-1">
      {{ d.descripcion }}
    </p>

    <!-- Tags -->
    <div class="mt-2">
      <v-chip
        v-for="tag in d.tags"
        :key="tag"
        class="ma-1"
        color="primary"
        variant="outlined"
        size="small"
      >
        {{ tag }}
      </v-chip>
    </div>

    <!-- Acciones -->
    <div class="mt-4 d-flex align-center">
      <v-btn
        icon="mdi-whatsapp"
        color="success"
        variant="flat"
        class="mr-2"
      />
      <v-btn
        color="primary"
        variant="flat"
      >
        Contactar
      </v-btn>
    </div>
  </div>
</v-card>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SearchDepa",
  data() {
    return {
      search: "",
      filters: {
        tipo: "Comprar",
        propiedad: "Departamento",
        dormitorios: null,
        precio: null,
      },
      departamentos: [
        {
          id: 1,
          precio: 273000,
          direccion: "Jr. Santa Susana 163, Cercado",
          descripcion: "Proyecto con bono verde. Entrega 2027.",
          imagen: "https://img10.naventcdn.com/avisos/resize/111/01/47/46/55/51/1200x1200/1557112788.jpg",
          tags: ["Parrilla", "Áreas verdes"],
          lat: -12.0464,
          lng: -77.0428
        },
        {
          id: 2,
          precio: 250653,
          direccion: "Av. Simón Bolívar 959, Pueblo Libre",
          descripcion: "Departamentos desde 38 m², en planos.",
          imagen: "https://img10.naventcdn.com/avisos/resize/111/01/46/64/83/50/1200x1200/1536994532.jpg",
          tags: ["Áreas verdes"],
          lat: -12.0725,
          lng: -77.05
        },{
          id: 3,
          precio: 3049,
          direccion: "Av. los prados 67",
          descripcion: "Departamentos desde 41 m², en planos.",
          imagen: "https://img10.naventcdn.com/avisos/resize/111/01/47/44/22/45/1200x1200/1556496120.jpg",
          tags: ["Áreas verdes"],
          lat: -12.0725,
          lng: -78.05
        },
      ],methods: {
        goToMap(lat, lng) {
            this.$router.push({
            name: "MapPage", // asegúrate que en router/index.js tu ruta se llame así
            query: { lat, lng }
            });
        }
    }
    };
  },
};
</script>

<style scoped>
/* Ajusta los filtros para que se vean tipo chips */
.v-select {
  min-width: 150px;
}
</style>
