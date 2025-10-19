<template>
    <div class="flex flex-col gap-3 pb-3 bg-white dark:!bg-gray-800 rounded-xl shadow-sm overflow-hidden max-w-sm">
        <div class="w-full bg-center bg-no-repeat aspect-video bg-cover" data-alt="Imagen de la propiedad"
            :style="{ backgroundImage: `url(${props.imagen})` }"></div>

        <div class="p-4 flex flex-col gap-3">
            <p class="text-gray-800 dark:text-white text-lg font-semibold">
                {{ props.titulo }}
            </p>

            <div class="flex items-center justify-between">
                <p class="text-primary text-lg font-bold">${{ props.precio }}/month</p>
            </div>

            <div class="flex items-center justify-between">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" :class="estadoClase">
                    {{ props.estado }}
                </span>

                <div class="flex gap-2">
                    <button aria-label="Edit property"
                        class="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 ease-in-out"
                        @click="$emit('editar', props.id)">
                        <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button aria-label="View property"
                        class="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary/20 text-primary text-xl hover:bg-primary/30 transition-colors duration-200 ease-in-out"
                        @click="$emit('ver', props.id)">
                        <span class="material-symbols-outlined">visibility</span>
                    </button>

                    <button aria-label="Delete property"
                        class="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-red-100 text-red-700 text-xl hover:bg-red-200 dark:hover:bg-red-900 transition-colors duration-200 ease-in-out"
                        @click="$emit('eliminar', props.id)">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

// ✅ Definimos las props y las guardamos en una variable
const props = defineProps({
    id: {
        type: [String, Number],
        required: true,
    },
    titulo: {
        type: String,
        required: true,
    },
    precio: {
        type: [String, Number],
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: true,
    },
});

// ✅ Computed para cambiar color según estado
const estadoClase = computed(() => {
    const estado = props.estado.toLowerCase();

    if (estado === "published") return "bg-green-100 text-green-800";  // ✅ Publicado
    if (estado === "draft") return "bg-yellow-100 text-yellow-800";    // 📝 Borrador
    if (estado === "hidden") return "bg-gray-200 text-gray-800";       // 👁️‍🗨️ Oculto
    if (estado === "deleted") return "bg-red-100 text-red-800";        // ❌ Eliminado
    return "bg-gray-100 text-gray-800";
});
</script>
