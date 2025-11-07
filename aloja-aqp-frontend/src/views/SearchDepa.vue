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
                    v-model="searchQuery"
                    @input="onSearchInput"
                    @keydown.down.prevent="focusNextSuggestion"
                    @keydown.up.prevent="focusPrevSuggestion"
                    @keydown.enter.prevent="onEnterSuggestion"
                    class="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary transition"
                    placeholder="Busca alojamientos cerca de universidades ..." type="text" />

                  <!-- Suggestions dropdown -->
                  <div v-if="showSuggestions && suggestions.length" class="absolute left-0 right-0 mt-1 bg-white dark:!bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    <ul>
                      <li v-for="(s, i) in suggestions" :key="s.id" :class="['p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex gap-3 items-center', i === suggestionIndex ? 'bg-gray-100 dark:bg-gray-800' : '']" @click="selectSuggestion(s)">
                        <img v-if="s.thumbnail" :src="s.thumbnail" class="h-10 w-16 object-cover rounded" />
                        <div class="flex-1">
                          <div class="font-medium text-sm">{{ s.title }}</div>
                          <div class="text-xs text-gray-500">{{ s.address }} · ${{ s.monthly_price }} · {{ s.rooms }} hab</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>


                <div class="mt-4 flex flex-wrap gap-4 items-center">
                  <FilterButtonMultipleOptions titulo="Selecciona la Universidad" v-if="universities.length"
                    :opciones="universities.map(u => u.name)" @optionFiltroSelected="handleUniversitySelected"
                    :defaultOption="selectedUniversity?.name || ''" />

                  <FilterButtonMultipleOptions titulo="Selecciona la Sede" v-if="selectedUniversity"
                    :opciones="selectedUniversity?.sedes?.map(s => s.name) || []"
                    @optionFiltroSelected="handleSedeSelected" :defaultOption="selectedSede?.name || ''" />

                  <FilterButtonRange title="Precio" :min="0" :max="3000" :start="priceStart" :end="priceEnd" tipoDato="$"
                    @rangeSelected="handlePriceSelecter" />

                  <FilterButtonRange title="Habitaciones" :min="1" :max="10" :start="roomsStart" :end="roomsEnd"
                    @rangeSelected="handleBedroomsSelected" />

                  <!-- Services quick-toggle chips -->
                  <div class="flex gap-2 items-center">
                    <template v-for="svc in services" :key="svc.id">
                      <button @click="toggleService(svc.id)" :class="selectedServices.includes(svc.id) ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'" class="px-3 py-1 rounded-full text-sm">
                        {{ svc.name }}
                      </button>
                    </template>
                  </div>
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
                    :image="property.photos && property.photos.length ? property.photos[0].image : 'https://placehold.co/500x300?text=Sin+imagen' " :isSelected="selectedIndex === index"
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
              <PropertyDetails v-if="propertiesPublicas?.length"
                :id="propertiesPublicas[selectedIndex].id" :title="propertiesPublicas[selectedIndex].title"
                :direccion="propertiesPublicas[selectedIndex].address"
                :precio="Number(propertiesPublicas[selectedIndex].monthly_price)"
                :habitaciones="propertiesPublicas[selectedIndex].rooms"
                :servicios="propertiesPublicas[selectedIndex].services"
                :latitudCasa="propertiesPublicas[selectedIndex].latitude"
                :longitudCasa="propertiesPublicas[selectedIndex].longitude" :latitudUni="selectedSede?.lat"
                :longitudUni="selectedSede?.lng" :UniImgUrl="selectedUniversity?.imageUrl || ''" />

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
                  <PropertyDetails v-if="propertiesPublicas?.length"
                    :id="propertiesPublicas[selectedIndex].id" :title="propertiesPublicas[selectedIndex].title"
                    :direccion="propertiesPublicas[selectedIndex].address"
                    :precio="Number(propertiesPublicas[selectedIndex].monthly_price)"
                    :habitaciones="propertiesPublicas[selectedIndex].rooms"
                    :servicios="propertiesPublicas[selectedIndex].services"
                    :latitudCasa="propertiesPublicas[selectedIndex].latitude"
                    :longitudCasa="propertiesPublicas[selectedIndex].longitude" :latitudUni="selectedSede?.lat"
                    :longitudUni="selectedSede?.lng" :UniImgUrl="selectedUniversity?.imageUrl || ''" />
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
import { useRoute, useRouter } from "vue-router";
import { useGestionPropiedades } from "/src/stores/useGestionPropiedades.js";


const storePropiedades = useGestionPropiedades();
const route = useRoute();
const router = useRouter();

const selectedIndex = ref(0);
const showModal = ref(false);
const isCelular = ref(false);
const propertiesPublicas = ref([])

// search + suggestions state
const searchQuery = ref("");
const suggestions = ref([]);
const showSuggestions = ref(false);
const suggestionIndex = ref(-1);

// filters state
const universities = ref([]);
const services = ref([]);
const selectedUniversity = ref(null);
const selectedSede = ref(null);
const selectedServices = ref([]);
// Keep these null initially so we don't apply unintended filters on load
const priceStart = ref(null);
const priceEnd = ref(null);
const roomsStart = ref(null);
const roomsEnd = ref(null);

const fetchPublicProperties = async () => {
  try {
    propertiesPublicas.value = await storePropiedades.getPropiedadesPublicas();
    console.log(JSON.stringify(propertiesPublicas.value, null, 2))
  } catch (err) {
    console.error("Error al obtener propiedades publicas:", err);
  }
};


// will be populated from backend

// ===== Inicialización =====
const initUniversitySelection = async () => {
  const uniParam = route.query.uni;
  console.log("Parámetro recibido:->", uniParam);
  // fetch universities and services
  const fetchedUnis = await storePropiedades.fetchUniversities();
  const fetchedSvcs = await storePropiedades.fetchPredefinedServices();

  // guard against non-array responses
  const uniArray = Array.isArray(fetchedUnis) ? fetchedUnis : [];
  const svcArray = Array.isArray(fetchedSvcs) ? fetchedSvcs : [];

  // normalize to previous shape (sedes array with lat/lng)
  universities.value = uniArray.map((u) => ({
    id: u.id,
    name: u.name,
    imageUrl: u.logo || u.imageUrl || null,
    sedes: (u.campuses || []).map((c) => ({ id: c.id, name: c.name, lat: c.latitude, lng: c.longitude })),
  }));

  services.value = svcArray;

  // Only auto-select a university if it was passed in the query params.
  if (uniParam && universities.value.length) {
    const index = universities.value.findIndex(
      (u) => u.name.toLowerCase().trim() === String(uniParam).toLowerCase().trim()
    );
    if (index !== -1) {
      selectedUniversity.value = universities.value[index];
      selectedSede.value = selectedUniversity.value.sedes?.[0] || null;
    }
  }

  // initial load of properties: show ALL public properties (no filters) on explore
  await storePropiedades.fetchPropiedadesPublicas();
  propertiesPublicas.value = await storePropiedades.getPropiedadesPublicas();
};

// ===== Eventos =====
const handleUniversitySelected = (universityName) => {
  selectedUniversity.value = universities.value.find((u) => u.name === universityName) || null;
  selectedSede.value = selectedUniversity.value?.sedes?.[0] || null;
  applyFilters();
};

const handleSedeSelected = (sedeName) => {
  selectedSede.value = selectedUniversity.value?.sedes?.find((s) => s.name === sedeName) || null;
  applyFilters();
};

const handlePriceSelecter = (range) => {
  priceStart.value = range.start;
  priceEnd.value = range.end;
  applyFilters();
};

const handleBedroomsSelected = (range) => {
  roomsStart.value = range.start;
  roomsEnd.value = range.end;
  applyFilters();
};

const handleCardClicked = (index) => {
  // Show preview in sidebar (desktop) or modal (mobile). Do NOT navigate away.
  selectedIndex.value = index;
  const prop = propertiesPublicas.value?.[index];
  if (!prop) return;

  // Keep current selectedUniversity/selectedSede from the filters —
  // the map will draw route only when selectedSede has coordinates.

  if (isCelular.value) {
    showModal.value = true;
  } else {
    // On desktop we simply ensure the right sidebar shows the selectedIndex.
    // Optionally you could scroll to the sidebar or focus it here.
    // No navigation.
    // small UX improvement: ensure sidebar is visible (it's rendered for desktop by layout)
    // we can force a tiny delay to let UI update
    setTimeout(() => {
      const el = document.querySelector('.sticky');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }
};

// ===== Ciclo de vida =====
onMounted(() => {
  initUniversitySelection();
  // fetch public properties initially is handled inside initUniversitySelection via applyFilters
  isCelular.value = window.innerWidth < 1024;

  const resizeHandler = () => {
    isCelular.value = window.innerWidth < 1024;
  };

  window.addEventListener("resize", resizeHandler);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler);
  });
});

// --------- Helper methods for search/filtering UI ---------
let debounceTimer = null;
const onSearchInput = async () => {
  // debounce
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    if (searchQuery.value && searchQuery.value.length >= 2) {
      suggestions.value = await storePropiedades.autocompletePublicProperties(searchQuery.value, 8);
      showSuggestions.value = suggestions.value.length > 0;
      suggestionIndex.value = -1;
    } else {
      suggestions.value = [];
      showSuggestions.value = false;
    }
  }, 250);
};

const selectSuggestion = (s) => {
  // navigate to detail page
  showSuggestions.value = false;
  searchQuery.value = "";
  suggestions.value = [];
  router.push({ name: "VerDepa", params: { id: s.id } });
};

const focusNextSuggestion = () => {
  if (!suggestions.value.length) return;
  suggestionIndex.value = (suggestionIndex.value + 1) % suggestions.value.length;
};
const focusPrevSuggestion = () => {
  if (!suggestions.value.length) return;
  suggestionIndex.value = (suggestionIndex.value - 1 + suggestions.value.length) % suggestions.value.length;
};
const onEnterSuggestion = () => {
  if (suggestionIndex.value >= 0 && suggestions.value[suggestionIndex.value]) {
    selectSuggestion(suggestions.value[suggestionIndex.value]);
  } else if (searchQuery.value) {
    // if no selection, apply filters with q
    applyFilters();
  }
};

const toggleService = (id) => {
  const idx = selectedServices.value.indexOf(id);
  if (idx === -1) selectedServices.value.push(id);
  else selectedServices.value.splice(idx, 1);
  applyFilters();
};

async function applyFilters() {
  const params = {};
  if (searchQuery.value) params.q = searchQuery.value;
  if (selectedUniversity.value) params.university_id = selectedUniversity.value.id;
  if (selectedSede.value) params.campus_id = selectedSede.value.id;
  if (priceStart.value != null) params.min_price = priceStart.value;
  if (priceEnd.value != null) params.max_price = priceEnd.value;
  if (roomsStart.value != null) params.min_rooms = roomsStart.value;
  if (roomsEnd.value != null) params.max_rooms = roomsEnd.value;
  if (selectedServices.value.length) params.services = selectedServices.value.join(',');

  // If no filters provided, fetch all public properties (explore behavior)
  if (Object.keys(params).length === 0) {
    await storePropiedades.fetchPropiedadesPublicas();
    propertiesPublicas.value = await storePropiedades.getPropiedadesPublicas();
    return;
  }

  const results = await storePropiedades.fetchPropiedadesFiltradas(params);
  propertiesPublicas.value = results;
}
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
