<template>
    <!-- PageHeading -->
    <div class="flex flex-wrap justify-between gap-3 mb-8">
        <h2 class="text-gray-800 dark:text-white text-3xl font-bold leading-tight">Mis Propiedades</h2>
    </div>
    <!-- ImageGrid -->
    <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">

        <MyPropertyCard v-for="propiedad in propiedades" :key="propiedad.id" :id="propiedad.id"
            :titulo="propiedad.title" :precio="propiedad.monthly_price" :estado="propiedad.status" :imagen="propiedad.photos[0].image"
            @editar="editarPropiedad" @ver="verPropiedad" @eliminar="eliminarPropiedad" />


    </div>
</template>

<script setup >
import MyPropertyCard from '../../components/MisPropiedades/MyPropertyCard.vue';
import { ref ,onMounted } from 'vue'
import { webPageData } from '/src/stores/webPageData.js';

const propiedades = ref([])
const storeWebPageData = webPageData();

const fetchMyProperties = async () => {
  try {
    propiedades.value = await storeWebPageData.getMisPropiedades();
  } catch (err) {
    console.error("Error al obtener properties:", err);
  }
};

const editarPropiedad = (id) => {
  console.log("Editar propiedad con ID:", id);
};

const verPropiedad = (id) => {
  console.log("Ver propiedad con ID:", id);
};

const eliminarPropiedad = (id) => {
  console.log("eliminar con ID:", id);
};
onMounted(() => {
  fetchMyProperties();
});
</script>