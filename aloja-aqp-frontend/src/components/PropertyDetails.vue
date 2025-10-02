<template>
    <div class="hidden lg:block">
        <div class="sticky top-24">
            <div class="relative">
                <div class="w-full aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden h-80">
                    <MapView :latitud="latitud" :longitud="longitud" />
                </div>
                <div class="absolute bottom-4 right-4 flex flex-col gap-2">
                    <button
                        class="flex size-10 items-center justify-center rounded-lg bg-white/80 dark:bg-background-dark/80 shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-background-dark transition-colors">
                        <svg class="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor"
                            stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4.5v15m7.5-7.5h-15" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                    <button
                        class="flex size-10 items-center justify-center rounded-lg bg-white/80 dark:bg-background-dark/80 shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-background-dark transition-colors">
                        <svg class="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor"
                            stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5 12h-15" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="mt-6 bg-white dark:bg-background-dark p-6 rounded-xl shadow-md">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ title }}</h3>
                <p class="text-gray-600 dark:text-gray-400 mt-1">{{ direccion }}</p>
                <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between text-lg">
                        <span class="font-semibold text-gray-800 dark:text-gray-200">Price:</span>
                        <span class="text-primary font-bold">${{ precio }}<span
                                class="text-sm font-medium text-gray-500 dark:text-gray-400">/month</span></span>
                    </div>
                    <div class="mt-3 flex items-center justify-between text-sm">
                        <span class="font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                            <span class="material-symbols-outlined text-base">directions_walk</span>
                            <span>Distance to University:</span>
                        </span>
                        <span class="font-semibold text-gray-800 dark:text-white">{{ distacia }}</span>
                    </div>
                    <div class="mt-2 flex items-center justify-between text-sm">
                        <span class="font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                            <span class="material-symbols-outlined text-base">bed</span>
                            <span>Rooms available:</span>
                        </span>
                        <span class="font-semibold text-gray-800 dark:text-white">{{ habitaciones }}</span>
                    </div>
                </div>
                <div class="mt-4">
                    <h4 class="font-semibold text-gray-800 dark:text-white mb-2">Key Highlights:</h4>
                    <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                        <li v-for="(servicio, index) in servicios" :key="index">
                            {{ servicio }}
                        </li>
                    </ul>
                </div>
                <router-link to="/view"
                    class="mt-6 block w-full bg-primary text-white text-center py-3 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                    View Full Listing
                </router-link>
            </div>
        </div>
    </div>
</template>


<script>
import MapView from "../components/MapView.vue";

export default {
  name: "PropertyDetails",
  props: {
    title: String,
    direccion: String,
    precio: Number,
    distacia: Number,
    habitaciones: Number,
    servicios: {
      type: Array,
      default: () => []
    },
    latitud:Number,
    longitud:Number

  },
  components:{
    MapView
  }
};
</script>