<template>
    <StepsBar :step="2" />
    <div class="flex-1 flex flex-col w-full max-w-4xl mx-auto py-8">
        <h3 class="text-gray-800 dark:text-white text-2xl font-bold mb-6 text-center">
            Gamified Feature Selector: Add Amenities!
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-8">
            Select amenities to add to your property. Collect more cards to unlock bonus tips!
        </p>

        <!-- Contador de amenidades -->
        <div class="flex justify-between items-center mb-6 px-4">
            <h4 class="text-xl font-semibold text-gray-700 dark:text-gray-300">
                Selected Amenities:
                <span class="text-primary font-bold">{{ selectedAmenities.length }}</span>
            </h4>
            <div class="flex items-center gap-2 text-primary">
                <span class="material-symbols-outlined text-lg">lightbulb</span>
                <p class="text-sm font-medium">
                    Add {{ Math.max(0, 3 - selectedAmenities.length) }} more for a Pro Tip!
                </p>
            </div>
        </div>

        <!-- Lista de amenidades -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            <div v-for="amenity in amenities" :key="amenity.id" @click="toggleAmenity(amenity.id)"
                class="flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ease-in-out cursor-pointer group"
                :class="[
                    selectedAmenities.includes(amenity.id)
                        ? 'bg-primary/10 border-primary'
                        : 'bg-gray-100 dark:bg-gray-700 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/10'
                ]">
                <div
                    class="bg-white dark:bg-gray-800 rounded-full size-16 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined text-4xl"
                        :class="selectedAmenities.includes(amenity.id) ? 'text-primary' : 'text-gray-500 group-hover:text-primary'">
                        {{ amenity.icon_class }}
                    </span>
                </div>
                <p class="text-lg font-medium mb-2" :class="selectedAmenities.includes(amenity.id)
                    ? 'text-primary'
                    : 'text-gray-700 dark:text-gray-300 group-hover:text-primary'">
                    {{ amenity.name }}
                </p>

                <button
                    class="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold transition-all duration-300"
                    :class="[
                        selectedAmenities.includes(amenity.id)
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                    ]">
                    <span class="material-symbols-outlined text-base">
                        {{ selectedAmenities.includes(amenity.id) ? 'check' : 'add' }}
                    </span>
                    {{ selectedAmenities.includes(amenity.id) ? 'Added' : 'Add' }}
                </button>
            </div>
        </div>
    </div>

    <!-- Botones de navegación -->
    <div class="mt-10 w-full flex justify-between">
        <button @click="previousStep"
            class="flex min-w-[120px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-lg font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600">
            <span class="material-symbols-outlined mr-2">arrow_back</span>
            <span class="truncate">Previous Step</span>
        </button>

        <button @click="nextStep"
            class="flex min-w-[120px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-blue-600">
            <span class="truncate">Next Step</span>
            <span class="material-symbols-outlined ml-2">arrow_forward</span>
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCreateProperty } from '../../../stores/useCreateProperty.js'
import StepsBar from '../../../components/MisPropiedades/AgregarPropiedad/StepsBar.vue'
import { webPageData } from '/src/stores/webPageData.js'

const router = useRouter()
const store = useCreateProperty()
const storeWebPageData = webPageData()

// 🔗 Usamos storeToRefs para mantener sincronización directa
const { amenidades } = storeToRefs(store)

const amenities = ref([])

const fetchAmenities = async () => {
  try {
    amenities.value = await storeWebPageData.getServicios()
  } catch (err) {
    console.error("Error al obtener tipos de servicios:", err)
  }
}

onMounted(() => {
  fetchAmenities()
})

// ⚙️ selectedAmenities apunta directamente a amenidades del store
const selectedAmenities = amenidades

// Alternar selección
function toggleAmenity(id) {
  const index = selectedAmenities.value.indexOf(id)
  if (index >= 0) {
    selectedAmenities.value.splice(index, 1)
  } else {
    selectedAmenities.value.push(id)
  }
}

// Navegación
function nextStep() {
  console.log("datos en pinia", JSON.stringify(store.$state))
  router.push('/mis-propiedades/agregar/paso3')
}

function previousStep() {
  router.push('/mis-propiedades/agregar/paso1')
}
</script>