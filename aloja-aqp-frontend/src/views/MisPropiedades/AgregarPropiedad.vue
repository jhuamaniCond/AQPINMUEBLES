

<template>
    <div class="flex flex-col  bg-white dark:!bg-gray-800 rounded-xl shadow-sm p-8">
        <div class="mb-8">
            <h2 class="text-gray-800 dark:text-white text-3xl font-bold leading-tight mb-2">Añadir nueva propiedad</h2>
            <p class="text-gray-500 dark:text-gray-400 text-lg">Sigue los pasos para publicar tu propiedad correctamente.</p>
        </div>
        <StepsBar :step="1"/>
        <router-view />
    </div>
</template>

<script setup>
import StepsBar from '../../components/MisPropiedades/AgregarPropiedad/StepsBar.vue';
</script>