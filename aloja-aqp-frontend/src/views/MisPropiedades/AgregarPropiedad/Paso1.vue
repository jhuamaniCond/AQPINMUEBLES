<template>
    <div class="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto py-8">
        <h3 class="text-gray-800 dark:text-white text-2xl font-bold mb-6">Property Details</h3>
        <div class="grid grid-cols-1 gap-6 w-full">
            <label class="flex flex-col gap-2">
                <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Property Title</span>
                <input
                    class="form-input w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base"
                    placeholder="e.g., Spacious 2-Bedroom Apartment" type="text" />
            </label>
            <label class="flex flex-col gap-2">
                <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Property Description</span>
                <textarea
                    class="form-textarea w-full h-32 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base resize-none"
                    placeholder="Describe your property in detail..."></textarea>
            </label>
            <label class="flex flex-col gap-2">
                <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Address</span>
                <input
                    class="form-input w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base"
                    placeholder="Street Address, City, Postal Code" type="text" />
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label class="flex flex-col gap-2">
                    <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Property Type</span>
                    <select
                        class="form-select w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary text-base">
                        <option>Apartment</option>
                        <option>House</option>
                        <option>Condo</option>
                        <option>Room</option>
                    </select>
                </label>
                <label class="flex flex-col gap-2">
                    <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Bedrooms</span>
                    <input
                        class="form-input w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base"
                        min="0" placeholder="e.g., 2" type="number" />
                </label>
            </div>
        </div>
        
    </div>
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

const router = useRouter()

function nextStep() {
    router.push('/mis-propiedades/agregar/paso2')
}
</script>