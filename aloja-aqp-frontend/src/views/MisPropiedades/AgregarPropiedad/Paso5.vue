<template>
    <StepsBar :step="5" />
    <div class="flex-1 flex flex-col w-full max-w-3xl mx-auto py-8">
        <CardBeforePublish />
        <PropertyDetails />

        <!-- 🟡 Botón Guardar borrador -->
    <button
      @click="guardarBorrador"
      class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-16 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-xl font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600 mt-6"
    >
      <span class="material-symbols-outlined mr-2">save</span>
      <span class="truncate">Guardar borrador</span>
    </button>

    <!-- 🟢 Botón Publicar propiedad -->
        <button @click="publicarPropiedad"
            class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-16 bg-primary text-white text-xl font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-blue-600 mt-8">
            <span class="material-symbols-outlined mr-2">send</span>
            <span class="truncate">Publish Property</span>
        </button>
    </div>
    <div class="mt-10 w-full flex justify-between">
        <button @click="previousStep"
            class="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-lg font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600">
            <span class="material-symbols-outlined mr-2">arrow_back</span>
            <span class="truncate">Previous Step</span>
        </button>
    </div>
    <Loader :show="loading" :message="loaderMessage"/>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCreateProperty } from '../../../stores/useCreateProperty.js'
import PropertyDetails from '../../../components/MisPropiedades/AgregarPropiedad/PropertyDetailsBeforePublish.vue'
import StepsBar from '../../../components/MisPropiedades/AgregarPropiedad/StepsBar.vue';
import CardBeforePublish from '../../../components/MisPropiedades/AgregarPropiedad/CardBeforePublish.vue';
import { useGestionPropiedades } from "/src/stores/useGestionPropiedades.js";
import Loader from '../../../components/Loader.vue';

const router = useRouter()
const store = useCreateProperty()
const storePropiedades = useGestionPropiedades();
const loading = ref(false)
const loaderMessage = ref('')

function previousStep() {
    if (!loading.value) {
    router.push('/mis-propiedades/agregar/paso4')
  }
}

async function publicarPropiedad() {

    try {
        loading.value = true
        loaderMessage.value = 'Publishing property...'
        await store.publicarPropiedad();
        await storePropiedades.updateStateMisPropiedades();
        router.push('/mis-propiedades')
    } catch (err) {
        console.error("❌ Error al publicar propiedad:", err.response?.data || err);
    }finally{
        loading.value = false
    }

}
async function guardarBorrador() {

    try {
        loading.value = true
        loaderMessage.value = 'Guardando borrador...'
        await store.publicarPropiedad();
        await storePropiedades.updateStateMisPropiedades();
        
        router.push('/mis-propiedades')
    } catch (err) {
        console.error("❌ Error al guardar propiedad:", err.response?.data || err);
    }finally{
        loading.value = false
    }

}
</script>