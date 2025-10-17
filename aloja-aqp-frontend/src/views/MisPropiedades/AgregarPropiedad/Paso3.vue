<template>
    <div class="flex-1 flex flex-col w-full max-w-4xl mx-auto py-8">
        <h3 class="text-gray-800 dark:text-white text-2xl font-bold mb-4 text-center">Visual Storyteller: Bring
            Your Property to Life!</h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-8">Rapidly upload and organize your property
            photos here!</p>
        <div class="grid grid-cols-1 gap-8">
            <div class="flex flex-col gap-6">
                <div
                    class="border-2 border-dashed border-primary/50 bg-primary/5 dark:bg-primary/10 rounded-xl p-6 text-center flex flex-col items-center justify-center transition-all duration-300 hover:border-primary cursor-pointer h-40">
                    <span class="material-symbols-outlined text-primary text-5xl mb-2">cloud_upload</span>
                    <p class="text-lg font-semibold text-primary">Drag &amp; Drop Photos Here</p>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">or <span class="text-primary font-medium">browse
                            files</span> (Max 10MB per image)</p>
                </div>
                <div class="overflow-x-auto pb-4 scrollbar-hide">
                    <div class="flex gap-4" id="image-filmstrip">
                        <div
                            class="relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm aspect-video flex-shrink-0 w-48">
                            <img alt="Property image" class="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNJsh0Mz5hqwGwGlRdr2jGZkE8N1CxU0ziEVsZX50Q_xyyNGpyNLNJTTPtRivPU_1MkLF8mWXw-T5u1xxXkUshEWDtPa3ayKOg760ZrAOboWiRk88wZaMotmxvO8N47_IwKEN_R_mIpgfIUMOOeVM3xt4_kK-1MqMOB29A5qBquLLNXHL0yNLx_jgh2-JhRaIhEGg2zxHB_PxHnHQQzQ36wdkEsS9jLOd2e6s50teKnMFgJael9f6cv8hFN61cdhBWpjVnsfiMzhQ" />
                            <div
                                class="absolute top-2 right-2 cursor-grab text-white bg-black/30 rounded-full p-1 flex items-center justify-center">
                                <span class="material-symbols-outlined text-base">drag_indicator</span>
                            </div>
                            <button
                                class="absolute top-2 left-2 size-7 bg-red-500/80 backdrop-blur-sm rounded-full text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                                <span class="material-symbols-outlined text-sm">delete</span>
                            </button>
                        </div>
                        <div
                            class="relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm aspect-video flex-shrink-0 w-48">
                            <img alt="Property image" class="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNJsh0Mz5hqwGwGlRdr2jGZkE8N1CxU0ziEVsZX50Q_xyyNGpyNLNJTTPtRivPU_1MkLF8mWXw-T5u1xxXkUshEWDtPa3ayKOg760ZrAOboWiRk88wZaMotmxvO8N47_IwKEN_R_mIpgfIUMOOeVM3xt4_kK-1MqMOB29A5qBquLLNXHL0yNLx_jgh2-JhRaIhEGg2zxHB_PxHnHQQzQ36wdkEsS9jLOd2e6s50teKnMFgJael9f6cv8hFN61cdhBWpjVnsfiMzhQ" />
                            <div
                                class="absolute top-2 right-2 cursor-grab text-white bg-black/30 rounded-full p-1 flex items-center justify-center">
                                <span class="material-symbols-outlined text-base">drag_indicator</span>
                            </div>
                            <button
                                class="absolute top-2 left-2 size-7 bg-red-500/80 backdrop-blur-sm rounded-full text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                                <span class="material-symbols-outlined text-sm">delete</span>
                            </button>
                        </div>
                        <div
                            class="relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm aspect-video flex-shrink-0 w-48">
                            <img alt="Property image" class="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNJsh0Mz5hqwGwGlRdr2jGZkE8N1CxU0ziEVsZX50Q_xyyNGpyNLNJTTPtRivPU_1MkLF8mWXw-T5u1xxXkUshEWDtPa3ayKOg760ZrAOboWiRk88wZaMotmxvO8N47_IwKEN_R_mIpgfIUMOOeVM3xt4_kK-1MqMOB29A5qBquLLNXHL0yNLx_jgh2-JhRaIhEGg2zxHB_PxHnHQQzQ36wdkEsS9jLOd2e6s50teKnMFgJael9f6cv8hFN61cdhBWpjVnsfiMzhQ" />
                            <div
                                class="absolute top-2 right-2 cursor-grab text-white bg-black/30 rounded-full p-1 flex items-center justify-center">
                                <span class="material-symbols-outlined text-base">drag_indicator</span>
                            </div>
                            <button
                                class="absolute top-2 left-2 size-7 bg-red-500/80 backdrop-blur-sm rounded-full text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                                <span class="material-symbols-outlined text-sm">delete</span>
                            </button>
                        </div>
                        <div
                            class="relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm aspect-video flex-shrink-0 w-48">
                            <img alt="Property image" class="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNJsh0Mz5hqwGwGlRdr2jGZkE8N1CxU0ziEVsZX50Q_xyyNGpyNLNJTTPtRivPU_1MkLF8mWXw-T5u1xxXkUshEWDtPa3ayKOg760ZrAOboWiRk88wZaMotmxvO8N47_IwKEN_R_mIpgfIUMOOeVM3xt4_kK-1MqMOB29A5qBquLLNXHL0yNLx_jgh2-JhRaIhEGg2zxHB_PxHnHQQzQ36wdkEsS9jLOd2e6s50teKnMFgJael9f6cv8hFN61cdhBWpjVnsfiMzhQ" />
                            <div
                                class="absolute top-2 right-2 cursor-grab text-white bg-black/30 rounded-full p-1 flex items-center justify-center">
                                <span class="material-symbols-outlined text-base">drag_indicator</span>
                            </div>
                            <button
                                class="absolute top-2 left-2 size-7 bg-red-500/80 backdrop-blur-sm rounded-full text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                                <span class="material-symbols-outlined text-sm">delete</span>
                            </button>
                        </div>
                        <div
                            class="relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm aspect-video flex-shrink-0 w-48">
                            <img alt="Property image" class="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNJsh0Mz5hqwGwGlRdr2jGZkE8N1CxU0ziEVsZX50Q_xyyNGpyNLNJTTPtRivPU_1MkLF8mWXw-T5u1xxXkUshEWDtPa3ayKOg760ZrAOboWiRk88wZaMotmxvO8N47_IwKEN_R_mIpgfIUMOOeVM3xt4_kK-1MqMOB29A5qBquLLNXHL0yNLx_jgh2-JhRaIhEGg2zxHB_PxHnHQQzQ36wdkEsS9jLOd2e6s50teKnMFgJael9f6cv8hFN61cdhBWpjVnsfiMzhQ" />
                            <div
                                class="absolute top-2 right-2 cursor-grab text-white bg-black/30 rounded-full p-1 flex items-center justify-center">
                                <span class="material-symbols-outlined text-base">drag_indicator</span>
                            </div>
                            <button
                                class="absolute top-2 left-2 size-7 bg-red-500/80 backdrop-blur-sm rounded-full text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                                <span class="material-symbols-outlined text-sm">delete</span>
                            </button>
                        </div>
                        <div
                            class="relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm aspect-video flex-shrink-0 w-48">
                            <img alt="Property image" class="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNJsh0Mz5hqwGwGlRdr2jGZkE8N1CxU0ziEVsZX50Q_xyyNGpyNLNJTTPtRivPU_1MkLF8mWXw-T5u1xxXkUshEWDtPa3ayKOg760ZrAOboWiRk88wZaMotmxvO8N47_IwKEN_R_mIpgfIUMOOeVM3xt4_kK-1MqMOB29A5qBquLLNXHL0yNLx_jgh2-JhRaIhEGg2zxHB_PxHnHQQzQ36wdkEsS9jLOd2e6s50teKnMFgJael9f6cv8hFN61cdhBWpjVnsfiMzhQ" />
                            <div
                                class="absolute top-2 right-2 cursor-grab text-white bg-black/30 rounded-full p-1 flex items-center justify-center">
                                <span class="material-symbols-outlined text-base">drag_indicator</span>
                            </div>
                            <button
                                class="absolute top-2 left-2 size-7 bg-red-500/80 backdrop-blur-sm rounded-full text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                                <span class="material-symbols-outlined text-sm">delete</span>
                            </button>
                        </div>
                    </div>
                </div>
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

const router = useRouter()

function nextStep() {
    router.push('/mis-propiedades/agregar/paso4')
}
function previousStep() {
    router.push('/mis-propiedades/agregar/paso2')
}

</script>