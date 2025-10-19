<template>
    <StepsBar :step="1" />
    <div class="flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto py-8">
        <h3 class="text-gray-800 dark:text-white text-2xl font-bold mb-6">Property Details</h3>

        <div class="flex flex-col md:flex-row gap-8 w-full">
            <div class="grid grid-cols-1 gap-6 w-full md:w-2/3">
                <!-- Título -->
                <label class="flex flex-col gap-2">
                    <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Property Title</span>
                    <input v-model="titulo"
                        class="form-input w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base"
                        placeholder="e.g., Spacious 2-Bedroom Apartment" type="text" />
                </label>

                <!-- Descripción -->
                <label class="flex flex-col gap-2">
                    <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Property Description</span>
                    <textarea v-model="descripcion"
                        class="form-textarea w-full h-32 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base resize-none"
                        placeholder="Describe your property in detail..."></textarea>
                </label>

                <!-- Dirección -->
                <label class="flex flex-col gap-2">
                    <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Address</span>
                    <input v-model="direccion"
                        class="form-input w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base"
                        placeholder="Street Address, City, Postal Code" type="text" />
                </label>

                <!-- Tipo y habitaciones -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label class="flex flex-col gap-2">
                        <span class="text-lg font-medium text-gray-700 dark:text-gray-300">
                            Property Type
                        </span>

                        <select v-model="tipo"
                            class="form-select w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary text-base">
                            <option v-for="t in tiposPropiedad" :key="t.id" :value="t.id">
                                {{ t.name }}
                            </option>
                        </select>
                    </label>

                    <label class="flex flex-col gap-2">
                        <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Bedrooms</span>
                        <input v-model.number="habitaciones"
                            class="form-input w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base"
                            min="0" placeholder="e.g., 2" type="number" />
                    </label>
                </div>
            </div>
            <div class="w-full md:w-1/3 flex flex-col gap-4 items-center">
                <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Selecciona la ubicacion del
                    alojamiento en el mapa</span>
                <MapSelectUbi @ubicacion-seleccionada="actualizarUbicacion" />

                <div class="grid grid-cols-1 gap-4 w-full">
                    <label class="flex flex-col gap-2">
                        <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Latitude</span>
                        <input disabled v-model="latitud"
                            class="form-input w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-base"
                            type="text" />
                    </label>

                    <label class="flex flex-col gap-2">
                        <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Longitude</span>
                        <input disabled v-model="longitud"
                            class="form-input w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-base"
                            type="text" />
                    </label>
                </div>
            </div>
        </div>


    </div>

    <!-- Botón siguiente -->
    <div class="mt-10 w-full flex justify-end">
        <button @click="nextStep"
            class="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-blue-600">
            <span class="truncate">Next Step</span>
            <span class="material-symbols-outlined ml-2">arrow_forward</span>
        </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useCreateProperty } from '../../../stores/useCreateProperty.js'
import StepsBar from '../../../components/MisPropiedades/AgregarPropiedad/StepsBar.vue';
import MapSelectUbi from '../../../components/MisPropiedades/AgregarPropiedad/MapSelectUbi.vue';
import { webPageData } from '/src/stores/webPageData.js';

const router = useRouter()
const store = useCreateProperty()
const storeWebPageData = webPageData();

// Campos sincronizados con Pinia (valores iniciales desde el store)
const titulo = ref(store.titulo)
const descripcion = ref(store.descripcion)
const direccion = ref(store.direccion)
const tipo = ref(store.tipo)
const habitaciones = ref(store.habitaciones || 0)
const latitud = ref(store.latitud || '')
const longitud = ref(store.longitud || '')

const tiposPropiedad = ref([]);

const fetchTiposPropiedad = async () => {
    try {
        tiposPropiedad.value = await storeWebPageData.getTiposDePropiedad();
    } catch (err) {
        console.error("Error al obtener tipos de propiedad:", err);
    }
};

onMounted(async () => {
    await fetchTiposPropiedad();
    if (tiposPropiedad.value.length > 0) {
        tipo.value = tiposPropiedad.value[0].id;
    }
});

// Guardar y avanzar al siguiente paso
function nextStep() {
    store.setDatosPaso1({
        titulo: titulo.value,
        descripcion: descripcion.value,
        direccion: direccion.value,
        tipo: tipo.value,
        habitaciones: habitaciones.value,
        latitud: latitud.value,
        longitud: longitud.value
    })
    console.log("datos en pinia", JSON.stringify(store.$state))
    router.push('/mis-propiedades/agregar/paso2') // siguiente paso
}
function actualizarUbicacion({ latitud: lat, longitud: lng }) {
    latitud.value = lat.toFixed(6);
    longitud.value = lng.toFixed(6);
}
</script>
