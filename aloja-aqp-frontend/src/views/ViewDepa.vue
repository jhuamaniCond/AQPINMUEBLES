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
                                        <div class="flex items-center gap-3">
                                            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                                                {{ propiedad.title || "aca va el titulo" }}
                                            </h1>
                                            <button @click="toggleFavorite"
                                                :class="[ 'rounded-full flex items-center justify-center transition-all', isFavorite ? 'bg-primary text-white p-2' : 'bg-white dark:bg-background-dark border-2 border-primary text-primary p-1' ]"
                                            >
                                                <span v-if="isFavorite" class="material-symbols-outlined">favorite</span>
                                                <span v-else class="material-symbols-outlined">favorite_border</span>
                                            </button>
                                        </div>
                                        <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">
                                            {{ propiedad.address || "aca va la direccion" }}
                                        </p>
                                        <div class="mt-4 flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                                                <div class="flex items-center gap-2">
                                                    <span class="material-symbols-outlined text-base">bed</span>
                                                    <span>{{ propiedad.rooms || '-' }} hab</span>
                                                </div>
                                                <div class="flex items-center gap-2">
                                                    <span class="material-symbols-outlined text-base">directions_walk</span>
                                                    <span>{{ routeInfo.label || '—' }}</span>
                                                </div>
                                                <div v-if="routeInfo.durationText" class="flex items-center gap-2 text-sm text-gray-500">
                                                    <span class="material-symbols-outlined text-sm">schedule</span>
                                                    <span>{{ routeInfo.durationText }}</span>
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
                                    <div v-if="propiedad.coexistence_rules" class="mt-6">
                                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Reglas de convivencia</h3>
                                        <div class="prose max-w-none text-gray-700 dark:text-gray-300" v-html="coexistenceHtml"></div>
                                    </div>
                                </div>
                                <div v-if="propiedad?.services?.length"
                                    class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                                        Servicios
                                    </h2>

                                    <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                        <div v-for="(item, index) in propiedad.services" :key="item.id || index"
                                                class="flex items-center gap-2">
                                                <ServiceIcon :name="item.service.icon_name || item.service.icon_class" :url="item.service.image_url" class="text-primary" :size="20" />
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
                                        Ubicacion
                                    </h2>
                                    <div class="mt-4 flex flex-wrap gap-4">
                                                            <FilterButtonMultipleOptions :opciones="universities.map((u) => u.name)"
                                                                :defaultOption="selectedUniversity?.name || ''"
                                                                @optionFiltroSelected="handleUniversitySelected" />

                                                            <FilterButtonMultipleOptions v-if="selectedUniversity"
                                                                :opciones="selectedUniversity.sedes.map((s) => s.name)"
                                                                :defaultOption="selectedSede?.name || ''"
                                                                @optionFiltroSelected="handleSedeSelected" />
                                    </div>

                                        <div
                                            class="mt-4 aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
                                        <MapView v-if="propiedad.latitude && propiedad.longitude"
                                            :latitudCasa="propiedad.latitude" :longitudCasa="propiedad.longitude"
                                            :latitudUni="selectedSede?.lat" :longitudUni="selectedSede?.lng"
                                            :UniImgUrl="selectedUniversity?.imageUrl || ''" :routeGeoJson="routeInfo.route" />
                                    </div>
                                </div>
                                <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                                        Comentarios
                                    </h2>
                                    <div class="mt-6 space-y-6">

                                        <Comentario v-for="review in actualReviews" :key="review.id"
                                            :imagen="review.user.avatar || '/src/public/default_avatar.png'"
                                            :autor="`${toStartCase(review.user.first_name)} ${toStartCase(review.user.last_name)}`"
                                            :diasAntiguedad="calcularDiasAntiguedad(review.review_date)"
                                            :comentario="review.comment" :isAutor="esAutor(review.user.id)" />


                                        <div class="mt-8">
                                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                                Deja un comentario
                                            </h3>
                                            <div class="flex items-start gap-4">
                                                <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                                                    :style="{
                                                        backgroundImage: `url(${auth.user?.avatar || '/src/public/default_avatar.png'
                                                            })`,
                                                    }"></div>
                                                <div class="flex-1">
                                                    <textarea v-model="nuevoComentarioComment"
                                                        class="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary transition"
                                                        placeholder="Escribe tu comentario..." rows="4"></textarea>
                                                    <button @click="publicarComentario"
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
    <LoginModal :show="showLogin" @close="showLogin = false" @login-success="onLoginSuccess" />
    
</template>

<script setup>
import LoginModal from "../components/authorization/LoginModal.vue";
import ServiceIcon from '/src/components/icons/ServiceIcon.vue'
import { ref, computed, onMounted } from "vue";
import DOMPurify from 'dompurify';
import { useRoute, useRouter } from "vue-router";
import MapView from "../components/MapView.vue";
import FilterButtonMultipleOptions from "../components/FilterButtonMultipleOptions.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import { useGestionPropiedades } from "/src/stores/useGestionPropiedades.js";
import Comentario from "../components/Comentario.vue";
import { useGestionComments } from "/src/stores/useGestionComments.js";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";
const auth = useAuthStore();
console.log("usuario en view depa", JSON.stringify(auth.user, null, 2));
const showLogin = ref(false);

// Accedemos al parámetro "id" desde la URL
const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id);
const storePropiedades = useGestionPropiedades();
const storeComentarios = useGestionComments();
const isPrivate = route.query.isPrivate === "true";

const { nuevoComentarioComment, nuevoComentarioAccomodationId } = storeToRefs(storeComentarios);
const actualReviews = ref([])

const publicarComentario = async () => {
    if (auth.user){
        const newComentario= await storeComentarios.publicarComentario();
        actualReviews.value = [...actualReviews.value, newComentario]
    }else{
        //si el usuario no esta logeado abrir modal
        showLogin.value = true;
    }
    
};

const onLoginSuccess = () => {
    console.log('Evento login-success recibido');
  showLogin.value = false;
};

// Variables reactivas
const universities = ref([]);
const selectedUniversity = ref(null);
const selectedSede = ref(null);

// Load universities from API and normalize shape (id, name, imageUrl, sedes with lat/lng)
const loadUniversities = async () => {
    try {
        const fetched = await storePropiedades.fetchUniversities();
        const uniArray = Array.isArray(fetched) ? fetched : [];
        const parseNum = (v) => {
            if (v === null || v === undefined) return null;
            const n = Number(v);
            return Number.isFinite(n) ? n : null;
        };
        universities.value = uniArray.map((u) => ({
            id: u.id,
            name: u.name,
            imageUrl: u.logo || u.imageUrl || null,
            sedes: (u.campuses || []).map((c) => ({
                id: c.id,
                name: c.name,
                lat: parseNum(c.latitude ?? c.lat ?? c.latitud ?? (c.location && c.location.lat) ?? null),
                lng: parseNum(c.longitude ?? c.lng ?? c.longitud ?? (c.location && c.location.lng) ?? null),
            })),
        }));

        // default selection: first university + first campus if not already set
        if (!selectedUniversity.value && universities.value.length) {
            selectedUniversity.value = universities.value[0];
            selectedSede.value = selectedUniversity.value.sedes?.[0] || null;
        }
    } catch (e) {
        console.error('loadUniversities error', e);
        universities.value = [];
    }
};
const propiedad = ref({});

const fetchMyPropertiePrivate = async (id) => {
    try {
        await storePropiedades.updateStateMyPropiedadActual(id);
        propiedad.value = await storePropiedades.getMyPropiedadActual(id);
        nuevoComentarioAccomodationId.value = propiedad.value.id
        actualReviews.value = propiedad.value.reviews
    } catch (err) {
        console.error("Error al obtener propiedad id ", id, " :", err);
    }
};
const fetchMyPropertiePublic = async (id) => {
    try {
        // Pass selected university id so serializer can include route GeoJSON for that university
        const params = {};
        if (selectedUniversity.value && selectedUniversity.value.id) params.university_id = selectedUniversity.value.id;
        await storePropiedades.updateStatePropiedadPublicaActual(id, params);
        propiedad.value = await storePropiedades.getPropiedadPublicaActual(id);
        nuevoComentarioAccomodationId.value = propiedad.value.id
        actualReviews.value = propiedad.value.reviews
    } catch (err) {
        console.error("Error al obtener propiedad id ", id, " :", err);
    }
};

const defaultImage = "https://placehold.co/500x300?text=Sin+imagen";

// Compute route/distance/duration info for the currently selected university/campus
const routeInfo = computed(() => {
    try {
        if (!propiedad.value || !selectedUniversity.value || !Array.isArray(propiedad.value.university_distances)) {
            return { route: null, label: null, durationText: null };
        }

        const match = propiedad.value.university_distances.find((d) => {
            if (d.campus_university_id != null) return Number(d.campus_university_id) === Number(selectedUniversity.value.id);
            if (d.campus && typeof d.campus === 'string') return d.campus.toLowerCase().includes(String(selectedUniversity.value.name).toLowerCase());
            // fallback: if selectedSede coordinates are available, try match by coordinates
            if (selectedSede.value && d.campus_lat != null && d.campus_lng != null) {
                const a = Number(d.campus_lat);
                const b = Number(d.campus_lng);
                return Math.abs(a - selectedSede.value.lat) < 0.0005 && Math.abs(b - selectedSede.value.lng) < 0.0005;
            }
            return false;
        });

        if (!match) {
            return { route: null, label: null, durationText: null };
        }

        // Build label and duration
        const distanceKm = match.distance_km != null ? String(match.distance_km) : (match.distance_meters != null ? `${(Number(match.distance_meters)/1000).toFixed(2)}` : null);
        const minutes = match.walk_time_minutes != null ? Number(match.walk_time_minutes) : (match.duration_seconds != null ? Math.round(Number(match.duration_seconds)/60) : null);
        const label = distanceKm ? (minutes ? `${distanceKm} km` : `${distanceKm} km`) : (minutes ? `${minutes} min` : null);
        const durationText = minutes ? `${minutes} min` : (match.duration_text || null);

        return { route: match.route || null, label, durationText };
    } catch (e) {
        console.warn('routeInfo compute error', e);
        return { route: null, label: null, durationText: null };
    }
});

const mainPhoto = computed(
    () =>
        propiedad.value?.photos?.find((p) => p.is_main) ||
        propiedad.value?.photos?.[0] ||
        null
);

const sidePhotos = computed(
    () => propiedad.value?.photos?.filter((p) => !p.is_main) || []
);

const coexistenceHtml = computed(() => {
    try {
        const raw = propiedad.value?.coexistence_rules || '';
        // DOMPurify.sanitize returns a string safe for v-html
        return DOMPurify.sanitize(raw);
    } catch (e) {
        console.warn('coexistenceHtml sanitize failed', e);
        return '';
    }
});

const calcularDiasAntiguedad = (fecha) => {
  const fechaReview = new Date(fecha)
  const hoy = new Date()
  const diff = Math.floor((hoy - fechaReview) / (1000 * 60 * 60 * 24))
  return diff
}

// Determina si el usuario actual es el autor
const esAutor = (userId) => userId === propiedad.value.user.id


// Inicialización
onMounted(async () => {
    console.log("ID recibido desde la URL:", id.value);
    // load universities first so we have real ids and campus coords
    await loadUniversities();
    // Ensure favoritesMap is populated for authenticated users so heart state is correct
    try {
        if (auth.user) await storePropiedades.fetchFavorites();
    } catch (e) {
        console.warn('Could not fetch favorites on mount', e);
    }
    if (isPrivate) {
        console.log("propiedad privada");
        fetchMyPropertiePrivate(id.value);
    } else {
        console.log("propiedad publica");
        await fetchMyPropertiePublic(id.value);
    }
});

// Métodos
const handleUniversitySelected = (universityName) => {
    // pick the university object from the normalized `universities` list
    const found = universities.value.find((u) => u.name === universityName) || null;
    selectedUniversity.value = found;
    selectedSede.value = found ? (found.sedes?.[0] || null) : null;
    console.log("Universidad seleccionada:", selectedUniversity.value);
    // After user selects a different university, refetch the public property detail
    // so backend can include route/distance for the newly selected university.
    if (!isPrivate) {
        fetchMyPropertiePublic(id.value);
    }
};

const handleSedeSelected = (sedeName) => {
    if (!selectedUniversity.value) return;
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

// Favorites helpers
const isFavorite = computed(() => {
    const id = propiedad.value?.id;
    if (!id) return false;
    // Read a snapshot of favoritesMap so Vue tracks changes to it
    const snapshot = storePropiedades.favoritesMap ? JSON.stringify(storePropiedades.favoritesMap) : '';
    void snapshot;
    return !!(storePropiedades.favoritesMap && storePropiedades.favoritesMap[id]);
});

const toggleFavorite = async () => {
    const id = propiedad.value?.id;
    if (!id) return;
    if (!auth.user) {
        showLogin.value = true;
        return;
    }
    try {
        if (storePropiedades.favoritesMap && storePropiedades.favoritesMap[id]) {
            await storePropiedades.removeFavoriteByAccommodation(id);
        } else {
            await storePropiedades.addFavorite(id);
        }
    } catch (err) {
        console.error('toggleFavorite error', err);
    }
};
</script>
