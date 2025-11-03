<template>
  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm overflow-hidden p-6 mb-8">
    <!-- Encabezado con switch -->
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-gray-800 dark:text-white">Resumen de la propiedad</h3>

      <!-- Switch -->
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="open" class="sr-only peer" />
        <div class="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors">
          <div
            class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5">
          </div>
        </div>
        <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">Mostrar detalles</span>
      </label>
    </div>

    <!-- Contenido colapsable con animación -->
    <transition name="slide-fade">
      <div v-show="open" class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm overflow-hidden">
        <div v-for="(detail, index) in detallesPropiedad" :key="index"
          class="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-600">
          <p class="text-gray-700 dark:text-gray-300 font-medium">{{ detail.label }}:</p>
          <div class="flex items-center gap-2">
            <!-- Amenidades con íconos -->
            <template v-if="detail.label === 'Amenidades'">
              <div v-if="detail.value.length" class="flex flex-wrap gap-3 justify-end">
                <span v-for="a in detail.value" :key="a.id" class="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <ServiceIcon :name="a.icon_name || a.icon_class" :url="a.image_url" :size="18" />
                </span>
              </div>
              <span v-else class="text-gray-400">No agregadas</span>
            </template>

            <!-- Para los demás campos -->
            <template v-else>
              <span class="text-gray-600 dark:text-gray-400">{{ detail.value }}</span>
            </template>

            <!-- Icono de completitud -->
            <span class="material-symbols-outlined text-xl"
              :class="detail.completo ? 'text-green-500' : 'text-orange-400'">
              {{ detail.completo ? 'check_circle' : 'pending' }}
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
//import ServiceIcon from '/src/components/icons/ServiceIcon.vue'
import { useCreateProperty } from '/src/stores/useCreateProperty' // Ajusta la ruta según tu estructura
import { webPageData } from '/src/stores/webPageData.js';


const open = ref(true)
const store = useCreateProperty()
const storeWebPageData = webPageData();

const amenities = ref([])

const fetchAmenities = async () => {
  try {
    amenities.value = await storeWebPageData.getServicios();
  } catch (err) {
    console.error("Error al obtener tipos de servicios:", err);
  }
};

onMounted(async () => {
  await fetchAmenities()
})

// Función para mapear IDs de amenidades a nombres + iconos
const amenidadesConIconos = computed(() => {
  if (!store.amenidades?.length || !amenities.value?.length) return []
  return store.amenidades
    .map(id => amenities.value.find(a => a.id === id))
    .filter(Boolean)
})

// Computed: genera los detalles dinámicamente desde el store
const detallesPropiedad = computed(() => [
  { label: 'Título', value: store.title || 'No especificado', completo: !!store.title },
  { label: 'Descripción', value: store.description || 'No especificada', completo: !!store.description },
  { label: 'Dirección', value: store.address || 'No especificada', completo: !!store.address },
  { label: 'Tipo', value: store.accommodation_type || 'No especificado', completo: !!store.accommodation_type },
  { label: 'Habitaciones', value: store.rooms || 'No especificadas', completo: !!store.rooms },
  { label: 'Amenidades', value: amenidadesConIconos.value, completo: !!amenidadesConIconos.value.length },
  { label: 'Imágenes', value: store.imagenes.length ? `${store.imagenes.length} subidas` : 'No subidas', completo: !!store.imagenes.length },
  { label: 'Precio', value: store.monthly_price ? `$${store.monthly_price}` : 'No definido', completo: !!store.monthly_price },
])
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
  overflow: hidden;
}

.slide-fade-enter-from {
  max-height: 0;
  opacity: 0;
}

.slide-fade-enter-to {
  max-height: 1000px;
  opacity: 1;
}

.slide-fade-leave-from {
  max-height: 1000px;
  opacity: 1;
}

.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
