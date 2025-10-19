<template>
    <StepsBar :step="5" />
    <div class="flex-1 flex flex-col w-full max-w-3xl mx-auto py-8">
        <CardBeforePublish />
        <PropertyDetails />
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

</template>


<script setup>
import { useRouter } from 'vue-router'
import { useCreateProperty } from '../../../stores/useCreateProperty.js'
import PropertyDetails from '../../../components/MisPropiedades/AgregarPropiedad/PropertyDetailsBeforePublish.vue'
import StepsBar from '../../../components/MisPropiedades/AgregarPropiedad/StepsBar.vue';
import CardBeforePublish from '../../../components/MisPropiedades/AgregarPropiedad/CardBeforePublish.vue';


const router = useRouter()
const store = useCreateProperty()


function previousStep() {
    router.push('/mis-propiedades/agregar/paso4')
}

async function publicarPropiedad() {

    console.log("datos en pinia", JSON.stringify(store.$state))

    try {
        const alojamiento = await store.publicarPropiedad();
        console.log("✅ Propiedad creada con ID:", alojamiento.id);
        store.limpiarDatos()
        router.push('/mis-propiedades')
    } catch (err) {
        console.error("❌ Error al publicar propiedad:", err.response?.data || err);
    }

}

</script>