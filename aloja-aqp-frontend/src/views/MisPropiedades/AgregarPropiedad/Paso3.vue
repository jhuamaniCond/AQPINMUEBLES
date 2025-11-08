<template>
    <StepsBar :step="3" />

    <div class="flex-1 flex flex-col w-full max-w-4xl mx-auto py-8">
        <h3 class="text-gray-800 dark:text-white text-2xl font-bold mb-4 text-center">
            ¡Da vida a tu propiedad!
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-8">
            Carga y organiza rápidamente las fotos de tu propiedad aquí.
        </p>

        <!-- Zona de subida -->
        <div class="border-2 border-dashed border-primary/50 bg-primary/5 dark:bg-primary/10 rounded-xl p-6 text-center flex flex-col items-center justify-center transition-all duration-300 hover:border-primary cursor-pointer h-40"
            @dragover.prevent @drop.prevent="handleDrop" @click="fileInput.click()">
            <span class="material-symbols-outlined text-primary text-5xl mb-2">cloud_upload</span>
            <p class="text-lg font-semibold text-primary">Arrastra y suelta las fotos aquí</p>
            <p class="text-gray-500 dark:text-gray-400 text-sm">
                o <span class="text-primary font-medium">buscar archivos</span> (máx. 10MB por imagen)
            </p>
            <input type="file" accept="image/*" multiple class="hidden" ref="fileInput" @change="handleFiles" />
        </div>

        <!-- Galería de imágenes -->
        <div class="mt-6 overflow-x-auto pb-4 scrollbar-hide">
            <div class="flex gap-4" id="image-filmstrip">
                <div v-for="(img, index) in imagenes" :key="index"
                    :class="['relative overflow-hidden shadow-sm aspect-video flex-shrink-0 w-48 rounded-lg', index === mainImageIndex ? 'ring-4 ring-primary/40' : 'bg-gray-100 dark:bg-gray-700']">
                    <img :src="img" alt="Imagen de la propiedad" class="w-full h-full object-cover" />

                    <!-- Selector de main -->
                    <div class="absolute top-2 left-2">
                        <button @click.stop="setMain(index)"
                            :class="index === mainImageIndex ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border border-gray-200'"
                            class="rounded-full px-3 py-1 text-sm font-semibold shadow-sm flex items-center gap-2">
                            <span v-if="index === mainImageIndex" class="inline-block w-2 h-2 rounded-full bg-white/90"></span>
                            <span>{{ index === mainImageIndex ? 'Principal' : 'Marcar principal' }}</span>
                        </button>
                    </div>

                    <div class="absolute top-2 right-2 cursor-grab text-white bg-black/30 rounded-full p-1 flex items-center justify-center">
                        <span class="material-symbols-outlined text-base">drag_indicator</span>
                    </div>

                    <button @click="removeImage(index)"
                        :disabled="imagenes.length <= minImages"
                        :title="imagenes.length <= minImages ? 'Se requieren al menos ' + minImages + ' imágenes' : 'Eliminar imagen'"
                        class="absolute bottom-2 left-2 size-7 bg-red-500/80 backdrop-blur-sm rounded-full text-white flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Botones de navegación -->
    <div class="mt-10 w-full flex justify-between">
        <button @click="previousStep"
            class="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-lg font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600">
            <span class="material-symbols-outlined mr-2">arrow_back</span>
            <span class="truncate">Paso anterior</span>
        </button>

        <button @click="nextStep"
            class="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-blue-600">
            <span class="truncate">Siguiente paso</span>
            <span class="material-symbols-outlined ml-2">arrow_forward</span>
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCreateProperty } from '../../../stores/useCreateProperty.js'
import StepsBar from '../../../components/MisPropiedades/AgregarPropiedad/StepsBar.vue';
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = useCreateProperty()
const fileInput = ref(null)

// Recuperar imágenes del store (persistentes entre pasos)
const { imagenes, main_image_index } = storeToRefs(store)

// límites
const maxImages = 10
const minImages = 3

const mainImageIndex = main_image_index

// Manejo de archivos seleccionados
function handleFiles(event) {
    const files = event.target.files
    processFiles(files)
}

// Manejo de arrastrar/soltar
function handleDrop(event) {
    const files = event.dataTransfer.files
    processFiles(files)
}

// Procesar archivos y crear URLs temporales
function processFiles(files) {
    // Determine how many images we can still accept
    const capacity = maxImages - imagenes.value.length
    if (capacity <= 0) {
        alert(`Has alcanzado el máximo de ${maxImages} imágenes.`)
        return
    }

    let accepted = 0
    for (const file of files) {
        if (accepted >= capacity) break
        if (!file.type.startsWith('image/')) continue
        if (file.size > 10 * 1024 * 1024) {
            console.warn('Skipped file > 10MB', file.name)
            continue // 10MB límite
        }
        const reader = new FileReader()
        reader.onload = e => imagenes.value.push(e.target.result)
        reader.readAsDataURL(file)
        accepted++
    }
    if (accepted < files.length) {
        alert(`Solo se aceptaron ${accepted} archivos. Límite máximo ${maxImages}.`)
    }
}

// Eliminar imagen
function removeImage(index) {
    if (imagenes.value.length <= minImages) {
        alert(`Se requieren al menos ${minImages} imágenes.`)
        return
    }
    const wasMain = Number(mainImageIndex.value) === index
    imagenes.value.splice(index, 1)
    if (wasMain) {
        const newIndex = Math.max(0, Math.min(index, imagenes.value.length - 1))
        store.setMainImageIndex(newIndex)
    } else if (Number(mainImageIndex.value) > index) {
        store.setMainImageIndex(Number(mainImageIndex.value) - 1)
    }
}

function setMain(idx) {
    store.setMainImageIndex(idx)
}

// Guardar en store y avanzar
function nextStep() {
    if (imagenes.value.length < minImages) {
        alert(`Debes subir al menos ${minImages} imágenes antes de continuar.`)
        return
    }
    router.push('/mis-propiedades/agregar/paso4')
}

// Volver al paso anterior
function previousStep() {
    router.push('/mis-propiedades/agregar/paso2')
}
</script>
