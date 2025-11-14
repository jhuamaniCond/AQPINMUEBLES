<template>

    <div class="sticky top-24 ">
        <div class="relative">
            <div class="w-full aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden ">
                <MapView :latitudCasa="latitudCasa" :longitudCasa="longitudCasa" :latitudUni="latitudUni"
                    :longitudUni="longitudUni" :UniImgUrl="UniImgUrl" :routeGeoJson="routeGeoJson" />
            </div>
        </div>

        <div class="mt-6 bg-white dark:!bg-background-dark p-6 rounded-xl shadow-md">
            <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ title }}</h3>
                <button @click="onToggleFavorite"
                    :class="[ 'ml-3 rounded-full flex items-center justify-center transition-all', isFavorite ? 'bg-primary text-white p-2' : 'bg-white dark:bg-background-dark border-2 border-primary text-primary p-1' ]"
                >
                    <span v-if="isFavorite" class="material-symbols-outlined">favorite</span>
                    <span v-else class="material-symbols-outlined">favorite_border</span>
                </button>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mt-1">{{ direccion }}</p>
            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between text-lg">
                    <span class="font-semibold text-gray-800 dark:text-gray-200">Precio:</span>
            <span class="text-primary font-bold">S/{{ precio }}<span
                class="text-sm font-medium text-gray-500 dark:text-gray-400">/mes</span></span>
                </div>
                <div class="mt-3 flex items-center justify-between text-sm">
                    <span class="font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <span class="material-symbols-outlined text-base">directions_walk</span>
                        <span>Distancia a la universidad:</span>
                    </span>
                        <span class="font-semibold text-gray-800 dark:text-white">{{ distanceDisplay || '-' }}</span>
                </div>
                <div class="mt-2 flex items-center justify-between text-sm">
                    <span class="font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <span class="material-symbols-outlined text-base">bed</span>
                        <span>Habitaciones disponibles:</span>
                    </span>
                    <span class="font-semibold text-gray-800 dark:text-white">{{ habitaciones }}</span>
                </div>
            </div>
            <div class="mt-4">
                <h4 class="font-semibold text-gray-800 dark:text-white mb-2">Aspectos Destacados:</h4>
                <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                    <!-- Mostrar solo los primeros 3 servicios -->
                    <li v-for="(servicio, index) in servicios.slice(0, 3)" :key="index"
                        class="relative flex justify-between items-center pl-4 pr-2 before:content-['•'] before:absolute before:left-0 before:text-gray-600 dark:before:text-gray-400">
                        <span>{{ servicio.service.name }}</span>
                        <ServiceIcon :name="servicio.service.icon_name || servicio.service.icon_class" :url="servicio.service.image_url" class="text-blue-500" :size="18" />
                    </li>

                    <!-- Mostrar el mensaje si hay más de 3 -->
                    <li v-if="servicios.length > 3" class="relative flex justify-between items-center pl-4 pr-2 before:content-['•'] before:absolute before:left-0 before:text-gray-600 dark:before:text-gray-400 text-gray-500 italic pl-4">
                        {{ servicios.length - 3 }} servicios más...
                    </li>
                </ul>
            </div>
            <router-link :to="`/view/${id}`"
                class="mt-6 block w-full bg-primary text-white text-center py-3 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                Ver Información Completa
            </router-link>
        </div>
    </div>
</template>


<script>
import MapView from "../components/MapView.vue";
import ServiceIcon from '/src/components/icons/ServiceIcon.vue'
import { useGestionPropiedades } from '/src/stores/useGestionPropiedades.js';

export default {
    name: "PropertyDetails",
    components: {
        MapView
        , ServiceIcon
    },
    
    props: {
        id: Number,
        title: String,
        direccion: String,
        precio: Number,
        habitaciones: Number,
        servicios: {
            type: Array,
            default: () => []
        },
        latitudCasa: Number,
        longitudCasa: Number,
        latitudUni: Number,
        longitudUni: Number,
        UniImgUrl: String,
        routeGeoJson: {
            type: Object,
            default: null
        },
        // distanceDisplay: pre-formatted string from backend (e.g. "0.45 km (6 min)")
        distanceDisplay: {
            type: String,
            default: null
        }
    },
    mounted() {
        console.log('PropertyDetails mounted -> id, distanceDisplay, routeGeoJson', { id: this.id, distanceDisplay: this.distanceDisplay, hasRoute: !!this.routeGeoJson });
    },
    watch: {
        routeGeoJson(newVal) {
            console.log('PropertyDetails -> routeGeoJson changed', newVal);
        },
        distanceDisplay(newVal) {
            console.log('PropertyDetails -> distanceDisplay changed', newVal);
        }
    },
    methods: {},
    computed: {
        isFavorite() {
                try {
                    const store = useGestionPropiedades();
                    return !!(store.favoritesMap && store.favoritesMap[this.id]);
                } catch (e) {
                    return false;
                }
        }
    },
    methods: {
        async onToggleFavorite() {
            const store = useGestionPropiedades();
            if (!this.id) return;
            try {
                if (store.favoritesMap && store.favoritesMap[this.id]) {
                    await store.removeFavoriteByAccommodation(this.id);
                } else {
                    await store.addFavorite(this.id);
                }
            } catch (err) {
                console.error('PropertyDetails toggle favorite error', err);
            }
        }
    },
};
</script>