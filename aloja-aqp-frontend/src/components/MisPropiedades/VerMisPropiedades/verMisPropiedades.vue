<template>
  <!-- PageHeading -->
  <div class="flex flex-wrap justify-between gap-3 mb-8">
    <h2 class="text-gray-800 dark:text-white text-3xl font-bold leading-tight">
      Mis Propiedades
    </h2>
  </div>

  <!-- ImageGrid con animación -->
  <TransitionGroup name="fade" tag="div" class="grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] gap-6">
    <MyPropertyCard v-for="propiedad in propiedades" :key="propiedad.id" :id="propiedad.id" :titulo="propiedad.title"
      :precio="propiedad.monthly_price" :estado="propiedad.status" :imagen="propiedad.photos[0]?.image"
      @editar="editarPropiedad" @ver="verPropiedad" @eliminar="confirmarEliminacion" @cambiar-estado="cambiarEstado" />
  </TransitionGroup>

  <!-- Popup de confirmación -->
  <div v-if="showConfirm" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div class="bg-white dark:!bg-gray-800 rounded-xl p-6 shadow-lg w-80 text-center">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        ¿Eliminar propiedad?
      </h3>
      <p class="text-gray-600 dark:text-gray-300 mb-6">
        Esta acción no puede deshacerse.
      </p>
      <div class="flex justify-around">
        <button @click="showConfirm = false"
          class="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 transition">
          Cancelar
        </button>
        <button @click="eliminarPropiedad(confirmId)"
          class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
          Eliminar
        </button>
      </div>
    </div>
  </div>
  <Loader :show="loading" :message="loaderMessage" />
</template>

<script setup>
import Loader from '../../../components/Loader.vue';
import { ref, onMounted } from "vue";
import { useGestionPropiedades } from "/src/stores/useGestionPropiedades.js";
import MyPropertyCard from "/src/components/MisPropiedades/MyPropertyCard.vue"
import { useRouter } from 'vue-router';

const storePropiedades = useGestionPropiedades();
const propiedades = ref([]);
const showConfirm = ref(false);
const confirmId = ref(null);
const emit = defineEmits(["sinPropiedades"]);
const loading = ref(false)
const loaderMessage = ref('')
const router = useRouter();

const fetchMyProperties = async () => {
  try {
    propiedades.value = await storePropiedades.getMisPropiedades();
  } catch (err) {
    console.error("Error al obtener propiedades:", err);
  }
};

const editarPropiedad = (id) => {
  console.log("Editar propiedad con ID:", id);
};

const verPropiedad = ({ id, estado }) => {
  console.log("Ver propiedad con ID:", id , " y estado :",estado);

  let isPrivate=true

  if (estado == "published") isPrivate=false;

  
  router.push({
    path: `/view/${id}`,
    query: { isPrivate }  
  });

};

const confirmarEliminacion = (id) => {
  console.log("Confirmar eliminacion con :", id);
  confirmId.value = id;
  showConfirm.value = true;
};

const cambiarEstado = async ({ id, estado }) => {
  console.log("Cambiar esteado con ID:", id, "estado", estado);
  try {
    loading.value = true
    
    if (estado == "published") {
      loaderMessage.value = 'Cambiando estado a publicado...'
      propiedades.value = await storePropiedades.publicarPropiedad(id);

    } else if (estado == "hidden") {
      loaderMessage.value = 'Cambiando estado a oculto...'
      propiedades.value = await storePropiedades.ocultarPropiedad(id);

    } else if (estado == "draft") {
      loaderMessage.value = 'Cambiando estado a borrador...'
      console.log("cambiando estado a borrador")
    } else {
      console.log("estado invalido")
    }

  } catch (err) {
    console.error("Error al cambiar estado:", err);
  } finally {
    loading.value = false
  }

};

const eliminarPropiedad = async (id) => {
  showConfirm.value = false;
  try {
    propiedades.value = await storePropiedades.eliminarPropiedad(id);

    if (propiedades.value.length <= 0) emit("sinPropiedades");

  } catch (err) {
    console.error("Error al eliminar propiedad", id, " :", err);
  }
};

onMounted(() => {
  fetchMyProperties();
});
</script>

<style scoped>
/* ✨ Animación de desaparición suave */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
