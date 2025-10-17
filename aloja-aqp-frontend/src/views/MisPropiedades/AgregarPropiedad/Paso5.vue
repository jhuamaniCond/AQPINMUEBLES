<template>

    <div class="flex-1 flex flex-col w-full max-w-3xl mx-auto py-8">
        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <div class="w-full h-48 bg-cover bg-center rounded-lg mb-4"
                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNJsh0Mz5hqwGwGlRdr2jGZkE8N1CxU0ziEVsZX50Q_xyyNGpyNLNJTTPtRivPU_1MkLF8mWXw-T5u1xxXkUshEWDtPa3ayKOg760ZrAOboWiRk88wZaMotmxvO8N47_IwKEN_R_mIpgfIUMOOeVM3xt4_kK-1MqMOB29A5qBquLLNXHL0yNLx_jgh2-JhRaIhEGg2zxHB_PxHnHQQzQ36wdkEsS9jLOd2e6s50teKnMFgJael9f6cv8hFN61cdhBWpjVnsfiMzhQ");'>
            </div>
            <h4 class="text-gray-800 dark:text-white text-2xl font-bold mb-2">Cozy Apartment Near Campus</h4>
            <p class="text-primary text-3xl font-bold mb-4">$1,200 <span
                    class="text-gray-600 dark:text-gray-400 text-base font-normal">/ month</span></p>
            <p class="text-gray-600 dark:text-gray-400 text-base">2 Beds • 1 Bath • Furnished</p>
        </div>
        <PropertyDetails />
        <button
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
import PropertyDetails from '../../../components/MisPropiedades/AgregarPropiedad/PropertyDetails.vue';

const router = useRouter()

function previousStep() {
    router.push('/mis-propiedades/agregar/paso4')
}

</script>