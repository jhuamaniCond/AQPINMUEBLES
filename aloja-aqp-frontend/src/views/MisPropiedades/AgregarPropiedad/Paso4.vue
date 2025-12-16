<template>
    <StepsBar :step="4" />
    <div class="flex-1 flex flex-col w-full max-w-4xl mx-auto py-8">
        <h3 class="text-gray-800 dark:text-white text-2xl font-bold mb-4 text-center">
            Establece el precio de tu propiedad
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-8">
            Define rápidamente los detalles de precio para publicar tu alojamiento.
        </p>

        <!-- Mensaje temporal de error -->
        <transition name="fade-slide">
          <div v-if="showError" class="fixed top-6 right-6 z-50 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
            {{ errorMsg }}
          </div>
        </transition>

        <div class="flex flex-col gap-6">
            <label class="block">
                <span class="text-gray-700 dark:text-gray-300 text-lg font-medium mb-2 block">
                    Precio mensual
                </span>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 dark:text-gray-400 text-xl font-bold">S/</span>
                    </div>
                    <input v-model="precio"
                        class="form-input text-gray-800 dark:text-white w-full rounded-lg bg-gray-100 dark:bg-gray-700 border-none focus:ring-primary focus:border-primary text-2xl py-3 pl-10 pr-4 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="p.ej., 400" type="number" min="1" />
                </div>
            </label>

            <!-- Quitar reglas de convivencia y texto informativo -->
            <!--
            <label class="flex flex-col gap-2">
                <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Reglas de convivencia</span>
                <textarea v-model="coexistence_rules"
                    class="form-textarea w-full h-40 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base resize-vertical"
                    placeholder="Escribe las normas de convivencia (saltos de línea y viñetas permitidas)">
                </textarea>
                <p class="text-sm text-gray-500">Puedes usar listas y saltos de línea. El contenido será sanitizado antes de almacenarse.</p>
            </label>
            -->

            <div class="bg-primary/10 dark:bg-primary/20 border border-primary/30 rounded-lg p-6 text-center mt-6">
                <p class="text-lg text-primary font-medium mb-2">Precio mensual recomendado</p>
                <p class="text-primary text-4xl font-bold">S/ 400</p>
                <p class="text-primary/80 dark:text-primary/90 text-sm mt-2">
                    Basado en el tamaño y ubicación de la propiedad.
                </p>
            </div>
        </div>
    </div>

    <div class="mt-10 w-full flex justify-between">
        <button @click="previousStep"
            class="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-lg font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600">
            <span class="material-symbols-outlined mr-2">arrow_back</span>
            <span class="truncate">Paso anterior</span>
        </button>

        <button @click="nextStep"
            class="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-blue-600">
            <span class="truncate">Siguiente paso</span>
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
const { monthly_price: precio, coexistence_rules } = storeToRefs(propiedadStore)

// Validación y mensaje temporal
const showErrorPrecio = ref(false)
const showError = ref(false)
const errorMsg = ref("")
let errorTimeout = null
function showTempError(msg) {
  errorMsg.value = msg
  showError.value = true
  if (errorTimeout) clearTimeout(errorTimeout)
  errorTimeout = setTimeout(() => {
    showError.value = false
    errorMsg.value = ""
  }, 3000)
}

function nextStep() {
    if (!precio.value || Number(precio.value) < 1) {
        showErrorPrecio.value = true
        showTempError('Es necesario ingresar el precio mensual')
        setTimeout(() => (showErrorPrecio.value = false), 3000)
        return
    }
    router.push('/mis-propiedades/agregar/paso5')
}

function previousStep() {
    router.push('/mis-propiedades/agregar/paso3')
}
</script>

<style>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
