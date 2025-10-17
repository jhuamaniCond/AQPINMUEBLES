<template>
    <div class="flex-1 flex flex-col w-full max-w-4xl mx-auto py-8">
        <h3 class="text-gray-800 dark:text-white text-2xl font-bold mb-6 text-center">Gamified Feature Selector:
            Add Amenities!</h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-8">Select amenities to add to your property.
            Collect more cards to unlock bonus tips!</p>
        <div class="flex justify-between items-center mb-6 px-4">
            <h4 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Selected Amenities: <span
                    class="text-primary font-bold">0</span></h4>
            <div class="flex items-center gap-2 text-primary">
                <span class="material-symbols-outlined text-lg">lightbulb</span>
                <p class="text-sm font-medium">Add 3 more for a Pro Tip!</p>
            </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            <div
                class="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-primary hover:bg-primary/10 transition-all duration-200 ease-in-out group">
                <div
                    class="bg-white dark:bg-gray-800 rounded-full size-16 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                    <span
                        class="material-symbols-outlined text-4xl text-gray-500 group-hover:text-primary">kitchen</span>
                </div>
                <p class="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary mb-2">
                    Full Kitchen</p>
                <button
                    class="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                    <span class="material-symbols-outlined text-base">add</span>
                    Add
                </button>
            </div>
            <div
                class="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-primary hover:bg-primary/10 transition-all duration-200 ease-in-out group">
                <div
                    class="bg-white dark:bg-gray-800 rounded-full size-16 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined text-4xl text-gray-500 group-hover:text-primary">wifi</span>
                </div>
                <p class="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary mb-2">
                    Wi-Fi Included</p>
                <button
                    class="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                    <span class="material-symbols-outlined text-base">add</span>
                    Add
                </button>
            </div>
            <div
                class="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-primary hover:bg-primary/10 transition-all duration-200 ease-in-out group">
                <div
                    class="bg-white dark:bg-gray-800 rounded-full size-16 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                    <span
                        class="material-symbols-outlined text-4xl text-gray-500 group-hover:text-primary">local_laundry_service</span>
                </div>
                <p class="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary mb-2">
                    In-unit Laundry</p>
                <button
                    class="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                    <span class="material-symbols-outlined text-base">add</span>
                    Add
                </button>
            </div>
            <div
                class="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-primary hover:bg-primary/10 transition-all duration-200 ease-in-out group">
                <div
                    class="bg-white dark:bg-gray-800 rounded-full size-16 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                    <span
                        class="material-symbols-outlined text-4xl text-gray-500 group-hover:text-primary">ac_unit</span>
                </div>
                <p class="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary mb-2">
                    Air Conditioning</p>
                <button
                    class="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                    <span class="material-symbols-outlined text-base">add</span>
                    Add
                </button>
            </div>
            <div
                class="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-primary hover:bg-primary/10 transition-all duration-200 ease-in-out group">
                <div
                    class="bg-white dark:bg-gray-800 rounded-full size-16 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined text-4xl text-gray-500 group-hover:text-primary">park</span>
                </div>
                <p class="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary mb-2">
                    Balcony/Patio</p>
                <button
                    class="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                    <span class="material-symbols-outlined text-base">add</span>
                    Add
                </button>
            </div>
            <div
                class="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-primary hover:bg-primary/10 transition-all duration-200 ease-in-out group">
                <div
                    class="bg-white dark:bg-gray-800 rounded-full size-16 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined text-4xl text-gray-500 group-hover:text-primary">pets</span>
                </div>
                <p class="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary mb-2">
                    Pet-Friendly</p>
                <button
                    class="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                    <span class="material-symbols-outlined text-base">add</span>
                    Add
                </button>
            </div>
            <div
                class="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-primary hover:bg-primary/10 transition-all duration-200 ease-in-out group">
                <div
                    class="bg-white dark:bg-gray-800 rounded-full size-16 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                    <span
                        class="material-symbols-outlined text-4xl text-gray-500 group-hover:text-primary">local_parking</span>
                </div>
                <p class="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary mb-2">
                    Parking Available</p>
                <button
                    class="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                    <span class="material-symbols-outlined text-base">add</span>
                    Add
                </button>
            </div>
            <div
                class="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-primary hover:bg-primary/10 transition-all duration-200 ease-in-out group">
                <div
                    class="bg-white dark:bg-gray-800 rounded-full size-16 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined text-4xl text-gray-500 group-hover:text-primary">pool</span>
                </div>
                <p class="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary mb-2">
                    Swimming Pool</p>
                <button
                    class="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                    <span class="material-symbols-outlined text-base">add</span>
                    Add
                </button>
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
    router.push('/mis-propiedades/agregar/paso3')
}
function previousStep() {
    router.push('/mis-propiedades/agregar/paso1')
}

</script>