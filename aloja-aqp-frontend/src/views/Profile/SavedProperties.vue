<template>

    <main class="flex-1 p-6 sm:p-8 md:p-10">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-2xl font-bold mb-1 text-black dark:!text-white">Propiedades guardadas</h2>
            <p class="text-sm text-black/60 dark:text-white/60 mb-8">Organiza y administra visualmente tus propiedades favoritas.</p>
            <div class="flex items-center gap-4 mb-8">
                <div class="relative">
                    <select
                        class="block w-48 appearance-none bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 text-black dark:!text-white py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-background-light dark:focus:bg-background-dark focus:border-primary">
                        <option>Todas las propiedades</option>
                        <option>Apartamentos ideales</option>
                        <option>Opción económica</option>
                        <option>Hogares familiares</option>
                    </select>
                    <div
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black/60 dark:text-white/60">
                        <svg class="fill-current h-4 w-4" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                        </svg>
                    </div>
                </div>
                <button
                    class="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                    <span class="material-symbols-outlined text-lg">add</span>
                    Nuevo tablero
                </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="saved-properties-grid">
                <PropertyCard v-for="(property, index) in propertiesList" :key="property.id || index" :id="property.id" :title="property.title" :description="property.description" :image="property.photos?.[0]?.image || property.image || defaultImage" />
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useGestionPropiedades } from '/src/stores/useGestionPropiedades.js';
import PropertyCard from '/src/components/PropertyCard.vue';
import { storeToRefs } from 'pinia';

const store = useGestionPropiedades();
const { favoriteProperties } = storeToRefs(store);
const defaultImage = 'https://placehold.co/500x300?text=Sin+imagen';

// Load favorites on mount. The template binds directly to the store ref
// so changes to `favoriteProperties` will update the UI immediately.
onMounted(async () => {
    await store.fetchFavoriteProperties();
});

const propertiesList = computed(() => favoriteProperties.value || []);
</script>