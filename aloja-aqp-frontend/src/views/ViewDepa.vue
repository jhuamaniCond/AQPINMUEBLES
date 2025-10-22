<template>
    <div class="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-white">
        <div class="flex flex-col min-h-screen">
            <HeaderComponent />

            <main class="flex-grow">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="mb-4">
                        <button @click="goBack"
                            class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                            <span class="material-symbols-outlined">arrow_back</span>
                            <span>Volver</span>
                        </button>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div class="lg:col-span-2">
                            <div v-if="propiedad?.photos?.length"
                                class="grid grid-cols-4 gap-2 rounded-xl overflow-hidden h-[500px] items-stretch">
                                <!-- Imagen principal -->
                                <div class="col-span-3 h-[500px]">
                                    <img :src="mainPhoto?.image" alt="Imagen principal"
                                        class="w-full h-full object-cover" />
                                </div>

                                <!-- Otras imágenes -->
                                <div class="col-span-1 grid grid-rows-4 gap-2 h-[500px]">
                                    <template v-for="(photo, index) in (sidePhotos.length < 4
                                        ? [
                                            ...sidePhotos,
                                            ...Array(4 - sidePhotos.length).fill({
                                                image: defaultImage,
                                            }),
                                        ]
                                        : sidePhotos
                                    ).slice(0, 4)" :key="index">
                                        <div class="relative h-full">
                                            <img :src="photo.image || defaultImage" alt="Foto adicional"
                                                class="w-full h-full object-cover" />

                                            <!-- Si hay más de 5 fotos y esta es la última visible -->
                                            <div v-if="index === 3 && propiedad?.photos?.length > 5"
                                                class="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xl font-semibold">
                                                +{{ propiedad.photos.length - 5 }}
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>

                            <!-- Si no hay fotos -->
                            <div v-else
                                class="h-[500px] bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">
                                Sin imágenes disponibles
                            </div>
                            <div class="mt-8">
                                <div class="flex flex-col md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                                            {{ propiedad.title || "aca va el titulo" }}
                                        </h1>
                                        <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">
                                            {{ propiedad.address || "aca va la direccion" }}
                                        </p>
                                        <div
                                            class="mt-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <div class="flex items-center gap-1">
                                                <span class="material-symbols-outlined text-base">bed</span>
                                                <span>1 Habitaion</span>
                                            </div>
                                            <div class="flex items-center gap-1">
                                                <span class="material-symbols-outlined text-base">bathtub</span>
                                                <span>1 Bañera</span>
                                            </div>
                                            <div class="flex items-center gap-1">
                                                <span class="material-symbols-outlined text-base">square_foot</span>
                                                <span>600 sqft</span>
                                            </div>
                                            <div class="flex items-center gap-1">
                                                <span class="material-symbols-outlined text-base">directions_walk</span>
                                                <span>0.8 km al campus</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-4 md:mt-0">
                                        <div class="text-3xl font-bold text-primary">
                                            {{ propiedad.monthly_price || "aca va monthly_price"
                                            }}<span
                                                class="text-lg font-medium text-gray-500 dark:text-gray-400">/mes</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                                        Acerca de esta propiedad
                                    </h2>
                                    <p class="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {{ propiedad.description || "aca va description" }}
                                    </p>
                                </div>
                                <div v-if="propiedad?.services?.length"
                                    class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                                        Servicios
                                    </h2>

                                    <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                        <div v-for="(item, index) in propiedad.services" :key="item.id || index"
                                            class="flex items-center gap-2">
                                            <span class="material-symbols-outlined text-primary">
                                                {{ item.service.icon_class }}
                                            </span>
                                            <span>{{ item.service.name }}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Opcional: mensaje si no hay servicios -->
                                <div v-else class="mt-8 text-gray-500 dark:text-gray-400">
                                    No hay servicios disponibles
                                </div>

                                <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                                        Planos de la Casa
                                    </h2>
                                    <div
                                        class="mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex justify-center items-center">
                                        <img alt="Floor plan" class="max-w-full h-auto rounded-md"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2d_f_g-h_j_k-l_m_n-p_q_r-s_t_u-v_w_x-y_z_a-b_c_d_e_f-g_h_j_k-l_m_n_p-q_r_s_t-u_v_w_x_y_z_a_b-c_d_e_f-g_h_j_k-l_m_n_p_q_r_s" />
                                    </div>
                                </div>

                                <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                                        Ubicacion
                                    </h2>
                                    <div class="mt-4 flex flex-wrap gap-4">
                                        <FilterButtonMultipleOptions :opciones="universities.map((u) => u.name)"
                                            :defaultOption="selectedUniversity.name"
                                            @optionFiltroSelected="handleUniversitySelected" />

                                        <FilterButtonMultipleOptions v-if="selectedUniversity"
                                            :opciones="selectedUniversity.sedes.map((s) => s.name)"
                                            :defaultOption="selectedSede.name"
                                            @optionFiltroSelected="handleSedeSelected" />
                                    </div>

                                    <div
                                        class="mt-4 aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
                                        <MapView v-if="selectedSede && propiedad.latitude && propiedad.longitude" :latitudCasa="propiedad.latitude"
                                            :longitudCasa="propiedad.longitude" :latitudUni="selectedSede.lat"
                                            :longitudUni="selectedSede.lng" :UniImgUrl="selectedUniversity.imageUrl" />
                                    </div>
                                </div>
                                <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                                        Comentarios
                                    </h2>
                                    <div class="mt-6 space-y-6">
                                        <div class="flex gap-4">
                                            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                                                style="
                          background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAlo91pnfJSsmHzc7pE-x3DyhQpI5SdlPENuRZV09BVDE07nVggll8-ZPJv_zOvrbGND65gR_1J1PkODUb__E4-qoBIEklzVkCJdqbKXmo7K3YMwkG4waSkHJsJr-czKTozUCQvl8Kt43MwPX2yN3M-BOBZr3_kL8M3-RuXO58o5SMBBG1kDO35zhXduURZU2Jm6HkHDCEHapiNvC5Y-iyVdtU9D4zhkzgwkwa-4aV3gzkJU038j6day4QXDxGw1qavnntTNVitAE');
                        "></div>
                                            <div class="flex-1">
                                                <p class="font-semibold text-gray-800 dark:text-white">
                                                    Kenji Tanaka
                                                </p>
                                                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                    hace 2 días
                                                </p>
                                                <p class="text-gray-600 dark:text-gray-300">
                                                    "¿Alguien sabe si la cocina tiene microondas? No está
                                                    incluido en la lista de servicios, pero no puedo
                                                    imaginar una cocina moderna sin uno."
                                                </p>
                                            </div>
                                        </div>
                                        <div class="flex gap-4">
                                            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                                                style="
                          background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB-q5pD2v7R6e3F-h4G-i2J_k1L_m3N_o5P_q7R_s9T-u0V-w2X-y4Z_a6B-c8D_e0F_g1H_i3J_k5L-m7N_o9P_q1R_s3T-u5V-w7X_y9Z_a1B-c3D_e5F_g7H');
                        "></div>
                                            <div class="flex-1">
                                                <p class="font-semibold text-gray-800 dark:text-white">
                                                    Sarah Johnson (Agente)
                                                </p>
                                                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                    hace 1 día
                                                </p>
                                                <p class="text-gray-600 dark:text-gray-300">
                                                    "¡Hola Kenji, excelente pregunta! Sí, la cocina está
                                                    totalmente equipada e incluye un microondas.
                                                    Actualizaremos la lista de servicios. ¡Avísame si
                                                    tienes alguna otra pregunta!"
                                                </p>
                                            </div>
                                        </div>

                                        <div class="mt-8">
                                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                                Deja un comentario
                                            </h3>
                                            <div class="flex items-start gap-4">
                                                <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                                                    style="
                            background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAlo91pnfJSsmHzc7pE-x3DyhQpI5SdlPENuRZV09BVDE07nVggll8-ZPJv_zOvrbGND65gR_1J1PkODUb__E4-qoBIEklzVkCJdqbKXmo7K3YMwkG4waSkHJsJr-czKTozUCQvl8Kt43MwPX2yN3M-BOBZr3_kL8M3-RuXO58o5SMBBG1kDO35zhXduURZU2Jm6HkHDCEHapiNvC5Y-iyVdtU9D4zhkzgwkwa-4aV3gzkJU038j6day4QXDxGw1qavnntTNVitAE');
                          "></div>
                                                <div class="flex-1">
                                                    <textarea
                                                        class="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary transition"
                                                        placeholder="Escribe tu comentario..." rows="4"></textarea>
                                                    <button
                                                        class="mt-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                                                        Publicar Comentario
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hidden lg:block relative">
                            <div class="sticky top-24">
                                <div
                                    class="bg-white dark:!bg-background-dark rounded-xl shadow-lg border border-gray-200 dark:!border-gray-800 p-6">
                                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                                        Contactar Propietario
                                    </h3>

                                    <div class="mt-4 flex items-center gap-4">
                                        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-14"
                                            :style="{
                                                backgroundImage: `url(${propiedad.user?.avatar || '/src/public/default_avatar.png'
                                                    })`,
                                            }"></div>

                                        <div>
                                            <p class="font-semibold text-gray-800 dark:text-white">
                                                {{ toStartCase(propiedad.user?.first_name) }}
                                                {{ toStartCase(propiedad.user?.last_name) }}
                                            </p>
                                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                                Agente de Rentas
                                            </p>

                                            <!-- NUEVO: teléfono y correo -->
                                            <div class="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                                <div class="flex items-center gap-2">
                                                    <span class="material-symbols-outlined text-base">call</span>
                                                    <span>{{ propiedad.owner?.phone_number || 'Sin número disponible'
                                                        }}</span>
                                                </div>
                                                <div class="flex items-center gap-2">
                                                    <span class="material-symbols-outlined text-base">mail</span>
                                                    <span>{{ propiedad.user?.email || 'Sin correo disponible' }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-6 space-y-4">
                                        <button
                                            class="w-full bg-primary text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                                            <span class="material-symbols-outlined">calendar_month</span>
                                            <span>Programar una visita</span>
                                        </button>

                                        <button
                                            class="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                                            <span class="material-symbols-outlined">mail</span>
                                            <span>Consultar sobre la propiedad</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import MapView from "../components/MapView.vue";
import FilterButtonMultipleOptions from "../components/FilterButtonMultipleOptions.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import { useGestionPropiedades } from "/src/stores/useGestionPropiedades.js";

// Accedemos al parámetro "id" desde la URL
const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id);
const storePropiedades = useGestionPropiedades();
const isPrivate = route.query.isPrivate === "true";

// Datos base
const dataHouse = ref({
    lat: -16.409047,
    lng: -71.537451,
});

const universities = ref([
    {
        name: "Universidad Nacional de San Agustin",
        imageUrl: "../public/Escudo_UNSA.png",
        sedes: [
            { name: "Ingenieria", lat: -16.404684, lng: -71.524577 },
            { name: "Biomedicas", lat: -16.41248, lng: -71.534752 },
            { name: "Sociales", lat: -16.405969, lng: -71.520543 },
        ],
    },
    {
        name: "Universidad Catolica de Santa Maria",
        imageUrl: "../public/Escudo_UCSM.png",
        sedes: [
            { name: "Campus Central Umacollo", lat: -16.40631, lng: -71.547563 },
        ],
    },
    {
        name: "Universidad Tecnologica del Peru",
        imageUrl: "../public/Escudo_UTP.png",
        sedes: [
            { name: "Sede av. Tacna y arica", lat: -16.408627, lng: -71.541031 },
            { name: "Sede av. Parra", lat: -16.408469, lng: -71.542242 },
            { name: "Nueva Sede", lat: -16.409622, lng: -71.543182 },
        ],
    },
    {
        name: "Universidad Continental",
        imageUrl: "../public/Escudo_Continental.jpg",
        sedes: [{ name: "Campus Principal", lat: -16.412307, lng: -71.524355 }],
    },
    {
        name: "Universidad de San Martin de Porres",
        imageUrl: "../public/Escudo_USMP.png",
        sedes: [
            { name: "Campus Principal Arequipa", lat: -16.424397, lng: -71.521655 },
        ],
    },
]);

// Variables reactivas
const selectedUniversity = ref(universities.value[0]);
const selectedSede = ref(selectedUniversity.value.sedes[0]);
const propiedad = ref({});

const fetchMyPropertiePrivate = async (id) => {
    try {
        await storePropiedades.updateStateMyPropiedadActual(id);
        propiedad.value = await storePropiedades.getMyPropiedadActual(id);
        console.log("propiedad actual :", JSON.stringify(propiedad.value));
    } catch (err) {
        console.error("Error al obtener propiedad id ", id, " :", err);
    }
};
const fetchMyPropertiePublic = async (id) => {
    try {
        await storePropiedades.updateStatePropiedadPublicaActual(id);
        propiedad.value = await storePropiedades.getPropiedadPublicaActual(id);
        console.log("propiedad actual :", JSON.stringify(propiedad.value));
    } catch (err) {
        console.error("Error al obtener propiedad id ", id, " :", err);
    }
};

const defaultImage = "https://placehold.co/500x300?text=Sin+imagen";

const mainPhoto = computed(
    () =>
        propiedad.value?.photos?.find((p) => p.is_main) ||
        propiedad.value?.photos?.[0] ||
        null
);

const sidePhotos = computed(
    () => propiedad.value?.photos?.filter((p) => !p.is_main) || []
);

// Inicialización
onMounted(() => {
    console.log("ID recibido desde la URL:", id.value);
    if (isPrivate) {
        console.log("propiedad privada");
        fetchMyPropertiePrivate(id.value);
    } else {
        console.log("propiedad publica");
        fetchMyPropertiePublic(id.value);
    }
});

// Métodos
const handleUniversitySelected = (universityName) => {
    selectedUniversity.value = universities.value.find(
        (u) => u.name === universityName
    );
    console.log("Universidad seleccionada:", selectedUniversity.value);
    selectedSede.value = selectedUniversity.value.sedes[0];
};

const handleSedeSelected = (sedeName) => {
    selectedSede.value = selectedUniversity.value.sedes.find(
        (s) => s.name === sedeName
    );
    console.log("Sede seleccionada:", selectedSede.value);
};
const toStartCase = (text) => {
    if (!text) return ''; // si es null, undefined o vacío → devuelve cadena vacía
    return text
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
};

const goBack = () => {
    router.back();
};
</script>
