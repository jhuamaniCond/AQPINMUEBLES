<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-white">
    <div class="flex flex-col min-h-screen">

      <HeaderComponent />

      <main class="flex-grow">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <div class="mb-8">
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg aria-hidden="true" class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="currentColor"
                      viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        fill-rule="evenodd"></path>
                    </svg>
                  </div>
                  <input
                    class="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary transition"
                    placeholder="Busca alojamientos cerca de universidades ..." type="text" />
                </div>


                <div class="mt-4 flex flex-wrap gap-4">
                  <FilterButtonMultipleOptions titulo="Selecciona la Universidad" v-if="selectedUniversity"
                    :opciones="universities?.map(u => u.name) || []" @optionFiltroSelected="handleUniversitySelected"
                    :defaultOption="selectedUniversity?.name || ''" />

                  <FilterButtonMultipleOptions titulo="Selecciona la Sede" v-if="selectedUniversity"
                    :opciones="selectedUniversity?.sedes?.map(s => s.name) || []"
                    @optionFiltroSelected="handleSedeSelected" :defaultOption="selectedSede?.name || ''" />

                  <FilterButtonRange title="Precio" :min="0" :max="3000" :start="500" :end="2000" tipoDato="$"
                    @rangeSelected="handlePriceSelecter" />

                  <FilterButtonRange title="Habitaciones" :min="1" :max="5" :start="1" :end="2"
                    @rangeSelected="handleBedroomsSelected" />

                </div>

              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Alojamiento cerca de
                  <span class="text-primary">
                    {{ selectedUniversity?.name || '' }}
                  </span>

                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                  <PropertyCard v-for="(property, index) in propertiesPublicas" :key="property.id"
                    :title="property.title" :description="property.description" distance="222 km"
                    :image="property.photos[0]?.image ? property.photos[0].image : 'https://placehold.co/500x300?text=Sin+imagen' " :isSelected="selectedIndex === index"
                    @card-clicked="handleCardClicked(index)" />

                </div>
                <div class="mt-8 flex justify-center">
                  <nav class="flex items-center gap-2">
                    <a class="flex items-center justify-center h-10 w-10 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      href="#">
                      <svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd"
                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                          fill-rule="evenodd"></path>
                      </svg>
                    </a>
                    <a class="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-sm"
                      href="#">1</a>
                    <a class="flex items-center justify-center h-10 w-10 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm transition-colors"
                      href="#">2</a>
                    <a class="flex items-center justify-center h-10 w-10 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm transition-colors"
                      href="#">3</a>
                    <span class="text-gray-500 dark:text-gray-400">...</span>
                    <a class="flex items-center justify-center h-10 w-10 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm transition-colors"
                      href="#">8</a>
                    <a class="flex items-center justify-center h-10 w-10 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      href="#">
                      <svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          fill-rule="evenodd"></path>
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>

            <div v-if="!isCelular" class="hidden lg:block dark:!border-gray-800 border border-gray-200 p-6 rounded-xl">
              <PropertyDetails v-if="propertiesPublicas?.length && selectedSede && selectedUniversity"
                :id="propertiesPublicas[selectedIndex].id" :title="propertiesPublicas[selectedIndex].title"
                :direccion="propertiesPublicas[selectedIndex].address"
                :precio="Number(propertiesPublicas[selectedIndex].monthly_price)"
                :habitaciones="propertiesPublicas[selectedIndex].rooms"
                :servicios="propertiesPublicas[selectedIndex].services"
                :latitudCasa="propertiesPublicas[selectedIndex].latitude"
                :longitudCasa="propertiesPublicas[selectedIndex].longitude" :latitudUni="selectedSede.lat"
                :longitudUni="selectedSede.lng" :UniImgUrl="selectedUniversity?.imageUrl || ''" />

            </div>


            <transition name="fade">
              <div v-if="showModal && isCelular"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ">
                <div
                  class="relative bg-background-light dark:!bg-background-dark w-11/12 max-h-[90vh] bg-white rounded-2xl shadow-2xl p-4 overflow-hidden">
                  <!-- Botón cerrar -->
                  <button
                    class="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700 hover:text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-md z-10"
                    @click="showModal = false">
                    ✕
                  </button>

                  <!-- Contenido -->
                  <PropertyDetails v-if="propertiesPublicas?.length && selectedSede && selectedUniversity"
                    :id="propertiesPublicas[selectedIndex].id" :title="propertiesPublicas[selectedIndex].title"
                    :direccion="propertiesPublicas[selectedIndex].address"
                    :precio="Number(propertiesPublicas[selectedIndex].monthly_price)"
                    :habitaciones="propertiesPublicas[selectedIndex].rooms"
                    :servicios="propertiesPublicas[selectedIndex].services"
                    :latitudCasa="propertiesPublicas[selectedIndex].latitude"
                    :longitudCasa="propertiesPublicas[selectedIndex].longitude" :latitudUni="selectedSede.lat"
                    :longitudUni="selectedSede.lng" :UniImgUrl="selectedUniversity?.imageUrl || ''" />
                </div>
              </div>
            </transition>

          </div>
        </div>
      </main>

      <FooterComponent />

    </div>

  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

import PropertyCard from "../components/PropertyCard.vue";
import PropertyDetails from "../components/PropertyDetails.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import FilterButtonMultipleOptions from "../components/FilterButtonMultipleOptions.vue";
import FilterButtonRange from "../components/FilterButtonRange.vue";
import { useRoute } from "vue-router";
import { useGestionPropiedades } from "/src/stores/useGestionPropiedades.js";


const storePropiedades = useGestionPropiedades();
const route = useRoute();

const selectedIndex = ref(0);
const showModal = ref(false);
const isCelular = ref(false);
const propertiesPublicas = ref([])

const fetchPublicProperties = async () => {
  try {
    propertiesPublicas.value = await storePropiedades.getPropiedadesPublicas();
    console.log(JSON.stringify(propertiesPublicas.value, null, 2))
  } catch (err) {
    console.error("Error al obtener propiedades publicas:", err);
  }
};


const universities = ref([
  {
    name: "Universidad Nacional de San Agustin",
    imageUrl: "../public/Escudo_UNSA.png",
    sedes: [
      { name: "Ingenieria", lat: -16.404684, lng: -71.524577 },
      { name: "Biomedicas", lat: -16.412480, lng: -71.534752 },
      { name: "Sociales", lat: -16.405969, lng: -71.520543 },
    ],
  },
  {
    name: "Universidad Catolica de Santa Maria",
    imageUrl: "../public/Escudo_UCSM.png",
    sedes: [{ name: "Campus Central Umacollo", lat: -16.406310, lng: -71.547563 }],
  },
  {
    name: "Universidad Tecnologica del Peru",
    imageUrl: "../public/Escudo_UTP.png",
    sedes: [
      { name: "Sede av. Tacna y arica", lat: -16.408627, lng: -71.541031 },
      { name: "Sede av. Parra", lat: -16.408469, lng: -71.542242 },
      { name: "Nueva Sede", lat: -16.409622, lng: -71.543182 },
    ],
  },
  {
    name: "Universidad Continental",
    imageUrl: "../public/Escudo_Continental.jpg",
    sedes: [{ name: "Campus Principal", lat: -16.412307, lng: -71.524355 }],
  },
  {
    name: "Universidad de San Martin de Porres",
    imageUrl: "../public/Escudo_USMP.png",
    sedes: [{ name: "Campus Principal Arequipa", lat: -16.424397, lng: -71.521655 }],
  },
]);

const selectedUniversity = ref(null);
const selectedSede = ref(null);

// ===== Inicialización =====
const initUniversitySelection = () => {
  const uniParam = route.query.uni;
  console.log("Parámetro recibido:->", uniParam);

  if (uniParam) {
    const index = universities.value.findIndex(
      (u) => u.name.toLowerCase().trim() === uniParam.toLowerCase().trim()
    );

    if (index !== -1) {
      selectedUniversity.value = universities.value[index];
      selectedSede.value = selectedUniversity.value.sedes[0];
      console.log(`Universidad seleccionada: ${selectedUniversity.value.name}`);
    } else {
      selectedUniversity.value = universities.value[0];
      selectedSede.value = selectedUniversity.value.sedes[0];
    }
  } else {
    selectedUniversity.value = universities.value[0];
    selectedSede.value = selectedUniversity.value.sedes[0];
  }
};

// ===== Eventos =====
const handleUniversitySelected = (universityName) => {
  selectedUniversity.value = universities.value.find((u) => u.name === universityName);
  selectedSede.value = selectedUniversity.value.sedes[0];
};

const handleSedeSelected = (sedeName) => {
  selectedSede.value = selectedUniversity.value.sedes.find((s) => s.name === sedeName);
};

const handlePriceSelecter = (range) => {
  console.log("Rango de precios seleccionado:", range);
};

const handleBedroomsSelected = (range) => {
  console.log("Rango de habitaciones seleccionado:", range);
};

const handleCardClicked = (index) => {
  selectedIndex.value = index;
  if (isCelular.value) showModal.value = true;
};

// ===== Ciclo de vida =====
onMounted(() => {
  initUniversitySelection();
  fetchPublicProperties()
  isCelular.value = window.innerWidth < 1024;

  const resizeHandler = () => {
    isCelular.value = window.innerWidth < 1024;
  };

  window.addEventListener("resize", resizeHandler);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler);
  });
});
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
}
</style>
