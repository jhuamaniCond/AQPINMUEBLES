<template>
    <StepsBar :step="4" />
    <div class="flex-1 flex flex-col w-full max-w-4xl mx-auto py-8">
        <h3 class="text-gray-800 dark:text-white text-2xl font-bold mb-4 text-center">
            Set Your Property's Price
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-8">
            Quickly define your pricing details for a swift listing.
        </p>

        <div class="flex flex-col gap-6">
            <label class="block">
                <span class="text-gray-700 dark:text-gray-300 text-lg font-medium mb-2 block">
                    Monthly Rent
                </span>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 dark:text-gray-400 text-xl font-bold">$</span>
                    </div>
                    <input v-model="precio"
                        class="form-input text-gray-800 dark:text-white w-full rounded-lg bg-gray-100 dark:bg-gray-700 border-none focus:ring-primary focus:border-primary text-2xl py-3 pl-10 pr-4 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="e.g., 1200" type="number" />
                </div>
            </label>

            <!-- Reglas de convivencia -->
            <label class="flex flex-col gap-2">
                <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Reglas de convivencia</span>
                <textarea v-model="coexistence_rules"
                    class="form-textarea w-full h-40 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base resize-vertical"
                    placeholder="Escribe las normas de convivencia (saltos de línea y viñetas permitidas)">
                </textarea>
                <p class="text-sm text-gray-500">Puedes usar listas y saltos de línea. El contenido será sanitizado antes de almacenarse.</p>
            </label>

            <div class="bg-primary/10 dark:bg-primary/20 border border-primary/30 rounded-lg p-6 text-center mt-6">
                <p class="text-lg text-primary font-medium mb-2">Recommended Monthly Rent</p>
                <p class="text-primary text-4xl font-bold">$450</p>
                <p class="text-primary/80 dark:text-primary/90 text-sm mt-2">
                    Based on property size and location data.
                </p>
            </div>
        </div>
    </div>

    <div class="mt-10 w-full flex justify-between">
        <button @click="previousStep"
            class="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-lg font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600">
            <span class="material-symbols-outlined mr-2">arrow_back</span>
            <span class="truncate">Previous Step</span>
        </button>

        <button @click="nextStep"
            class="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-blue-600">
            <span class="truncate">Next Step</span>
            <span class="material-symbols-outlined ml-2">arrow_forward</span>
        </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useCreateProperty } from '../../../stores/useCreateProperty.js'
import StepsBar from '../../../components/MisPropiedades/AgregarPropiedad/StepsBar.vue';
import { storeToRefs } from 'pinia'

const router = useRouter()
const propiedadStore = useCreateProperty()

// Campo vinculado al store (se mantiene al cambiar de paso)

const { monthly_price: precio, coexistence_rules } = storeToRefs(propiedadStore)

function nextStep() {

    // Ir al siguiente paso
    router.push('/mis-propiedades/agregar/paso5')
}

function previousStep() {
    router.push('/mis-propiedades/agregar/paso3')
}
</script>
