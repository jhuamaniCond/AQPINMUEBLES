<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200">
    <div class="flex flex-col min-h-screen">
      <header class="absolute top-0 left-0 right-0 z-10">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-20">
            <div class="flex items-center gap-8">
              <a class="flex items-center gap-2 text-xl font-bold text-white" href="#">
                <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd"
                    d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                    fill="currentColor" fill-rule="evenodd"></path>
                  <path clip-rule="evenodd"
                    d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                    fill="currentColor" fill-rule="evenodd"></path>
                </svg>
                <span>AlojaAQP</span>
              </a>
              <nav class="hidden md:flex items-center gap-6">
                <router-link to="/search" class="text-sm font-medium text-white/80 hover:text-white transition-colors">
                  Explorar
                </router-link>
                <a class="text-sm font-medium text-white/80 hover:text-white transition-colors" href="#">Universidades</a>
                <a class="text-sm font-medium text-white/80 hover:text-white transition-colors" href="#">Para
                  Propietarios</a>
              </nav>
            </div>
            <div class="flex items-center gap-4">
              <button
                @click="handlePublishClick"
                class="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition-colors rounded-lg shadow-md hover:shadow-lg">
                <span class="truncate">
                  {{ isOwner ? "Publica aquí" : "Publica tu alojamiento" }}
                </span>
              </button>



              <!-- Si el usuario está logeado -->
              <div v-if="user" class="flex items-center gap-3">
                <div
                  class="bg-center bg-no-repeat bg-cover rounded-full size-10"
                  :style="{ backgroundImage: `url(${user.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'})` }"
                ></div>
                <span class="font-medium text-white truncate max-w-[120px]">
                  {{ user.full_name }}
                </span>
                <button @click="logout" class="text-sm text-red-300 hover:text-red-400 ml-2">
                  Cerrar sesión
                </button>
              </div>

              <!-- Si no hay usuario -->
              <button
                v-else
                @click="showLogin = true"
                class="text-white border border-primary hover:bg-primary hover:border-primary font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Iniciar sesión
              </button>

              <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuADjJKCAs20JoPIHSq5oRFuZRonfFDVZ-Ph55drMXrZHVsuGCAJQ_IiagW_9h6jLaBLzws1xCnkEL2aq3d4RFprYg_zFEByJSeUlrTkFMMUKWoUye_4fdbuMVmDMpcmVP4R6A0MPtxVnKu0DO8e6gDCbCS6_OO2ip7dcJhNxM-0WSNM8oXTlq86Lisn7l7_pqgQ3ahuikO7iW_KZ3XSvK_3rZ9XZk0igqI5cA5LNmCLmBwYUwy-LjyYUF8BdTQcPBqI6C7lE9nntbIF");'>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main class="flex-grow">


        <section class="relative h-[60vh] md:h-[75vh] flex items-center justify-center text-white overflow-hidden">
          <!-- Video de fondo -->
          <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover">
            <source src="../public/arequipa.mp4" type="video/mp4">
          </video>

          <!-- Sombra en la parte superior para mejor contraste con el header -->
          <div class="overlay-top"></div>

          <!-- Contenido encima -->
          <div class="relative z-10 text-center px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">Encuentra tu alojamiento estudiantil en Arequipa</h1>
            <p class="text-lg md:text-xl max-w-3xl mx-auto mb-8">
              La forma más fácil de encontrar y reservar tu alojamiento cerca de las mejores universidades.
            </p>
            <a href="#explore"
              class="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
              Empieza a explorar
            </a>
          </div>
        </section>

        <section class="py-16 sm:py-24">
          <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Cómo funciona AlojaAQP</h2>
              <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Simplificamos tu búsqueda del
                alojamiento perfecto en tres pasos sencillos.</p>
            </div>
            <div class="grid md:grid-cols-3 gap-8 text-center">
              <div class="flex flex-col items-center">
                <div class="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
                  <span class="material-symbols-outlined text-3xl text-primary">search</span>
                </div>
                <h3 class="text-xl font-semibold mb-2">Busca fácilmente</h3>
                <p class="text-slate-600 dark:text-slate-400">Usa nuestro mapa interactivo y filtros para encontrar alojamiento cerca
                  de tu universidad.</p>
              </div>
              <div class="flex flex-col items-center">
                <div class="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
                  <span class="material-symbols-outlined text-3xl text-primary">schedule</span>
                </div>
                <h3 class="text-xl font-semibold mb-2">Ahorra tiempo</h3>
                <p class="text-slate-600 dark:text-slate-400">Consulta al instante los tiempos a pie o en bus hasta tu campus.</p>
              </div>
              <div class="flex flex-col items-center">
                <div class="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
                  <span class="material-symbols-outlined text-3xl text-primary">task_alt</span>
                </div>
                <h3 class="text-xl font-semibold mb-2">Reserva con seguridad</h3>
                <p class="text-slate-600 dark:text-slate-400">Reserva tu alojamiento ideal a través de nuestra plataforma segura y confiable.</p>
              </div>
            </div>
          </div>
        </section>

        <section class="py-16 sm:py-24" id="explore">
          <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Encuentra alojamiento por universidad</h2>
              <p class="text-lg text-slate-600 dark:text-slate-400 mt-2">Selecciona tu universidad para ver los alojamientos disponibles cerca.</p>
            </div>
            <div class="flex flex-col items-center gap-8">
              <div class="flex justify-center gap-8 md:gap-16">
                <router-link class="group flex flex-col items-center text-center w-40" :to="{ path: '/search', query: { uni: 'Universidad Nacional de San Agustin' }}">
                  <div class="w-28 h-28 flex items-center justify-center">
                    <img alt="Logo Universidad 1"
                      class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                      src="../public/Escudo_UNSA.png" />
                  </div>
                  <span
                    class="mt-4 font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Universidad
                    Nacional de San Agustín</span>
                </router-link>
                <router-link class="group flex flex-col items-center text-center w-40" :to="{ path: '/search', query: { uni: 'Universidad Catolica de Santa Maria' }}">
                  <div class="w-28 h-28 flex items-center justify-center">
                    <img alt="Logo Universidad 2"
                      class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                      src="../public/Escudo_UCSM.png" />
                  </div>
                  <span
                    class="mt-4 font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Universidad
                    Católica de Santa María</span>
                </router-link>
                <router-link class="group flex flex-col items-center text-center w-40" :to="{ path: '/search', query: { uni: 'Universidad Tecnologica del Peru' }}">
                  <div class="w-28 h-28 flex items-center justify-center">
                    <img alt="Logo Universidad 3"
                      class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                      src="../public/Escudo_UTP.png" />
                  </div>
                  <span
                    class="mt-4 font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Universidad
                    Tecnológica del Perú</span>
                </router-link>
              </div>
              <div class="flex justify-center gap-8 md:gap-16">
                <router-link class="group flex flex-col items-center text-center w-40" :to="{ path: '/search', query: { uni: 'Universidad Continental' }}">
                  <div class="w-28 h-28 flex items-center justify-center">
                    <img alt="Logo Universidad 4"
                      class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                      src="../public/Escudo_Continental.jpg" />
                  </div>
                  <span
                    class="mt-4 font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Universidad
                    Continental</span>
                </router-link>
                <router-link class="group flex flex-col items-center text-center w-40" :to="{ path: '/search', query: { uni: 'Universidad de San Martin de Porres' }}">
                  <div class="w-28 h-28 flex items-center justify-center">
                    <img alt="Logo Universidad 5"
                      class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                      src="../public/Escudo_USMP.png" />
                  </div>
                  <span
                    class="mt-4 font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Universidad
                    de San Martín de Porres</span>
                </router-link>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-slate-100 dark:bg-slate-900/50 py-16 sm:py-24 relative overflow-hidden">
          <div class="absolute right-15 top-0 bottom-0 z-0 flex justify-end">
            <img
              alt="Arequipa Cathedral"
              :class="[
                'w-full h-full object-contain object-bottom opacity-10 dark:opacity-5 pointer-events-none transition-all duration-500',
                isDark ? 'invert brightness-200 contrast-100' : ''
              ]"
              src="../public/catedral.png"
            />
          </div>
          <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto text-center">
              <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">¿Listo para encontrar tu nuevo hogar?</h2>
              <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">Explora cientos de anuncios verificados. Tu aventura en Arequipa te espera.</p>
              <div class="relative max-w-xl mx-auto">
                <span
                  class="material-symbols-outlined absolute left-4 top-10 -translate-y-1/2 text-slate-400 dark:text-slate-500">search</span>
                <input
                  class="w-full h-14 pl-12 pr-32 bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                  placeholder="Busca por universidad o zona..." type="text" />
                <button
                  class="absolute right-4 top-12 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterComponent/>
    </div>
  
    <LoginModal 
      :show="showLogin" 
      @close="showLogin = false" 
      @login-success="onLoginSuccess" 
    />

  </div>
</template>


<script setup>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
import FooterComponent from "../components/FooterComponent.vue";
import LoginModal from "../components/authorization/LoginModal.vue";

const router = useRouter();
const isDark = ref(false);
const showLogin = ref(false);
const user = ref(null);

// Computed para saber si el usuario es owner
const isOwner = computed(() => {
  return user.value?.roles?.includes("owner");
});

// --- Publicar propiedad ---
const handlePublishClick = () => {
  if (!user.value) {
    // no está logeado → abrir modal de login
    showLogin.value = true;
  } else if (isOwner.value) {
    alert("✅ Ya tienes perfil de propietario. Pronto podrás publicar tus propiedades aquí.");
  } else {
    router.push("/register-owner");
  }
};

// --- Cargar tema oscuro y usuario guardado ---
onBeforeMount(() => {
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  }

  const storedUser = localStorage.getItem("user_info");
  if (storedUser) user.value = JSON.parse(storedUser);
});

// --- Publicar propiedad ---
const publishProperty = () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    // Si no está logueado → abrir modal de login
    showLogin.value = true;
    return;
  }

  // Si ya tiene rol de propietario
  if (user.value && user.value.roles?.includes("owner")) {
    alert("✅ Ya eres propietario. Puedes publicar tus anuncios desde tu perfil.");
    return;
  }

  // Si está logueado pero no es propietario → ir al formulario
  router.push("/register-owner");
};

// --- Login exitoso ---
const onLoginSuccess = (userData) => {
  user.value = userData;
  localStorage.setItem("user_info", JSON.stringify(userData));
  showLogin.value = false;
};

// --- Logout ---
const logout = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const accessToken = localStorage.getItem("access_token");

    if (refreshToken && accessToken) {
      const res = await fetch("http://127.0.0.1:8000/api/auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (res.ok) console.log("✅ Logout exitoso en el backend");
      else console.warn("⚠️ El backend respondió:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("❌ Error al cerrar sesión:", error);
  } finally {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_info");
    user.value = null;
    alert("👋 Sesión cerrada");
  }
};

// --- Escucha de cambios globales ---
onMounted(() => {
  window.addEventListener("storage", () => {
    const storedUser = localStorage.getItem("user_info");
    user.value = storedUser ? JSON.parse(storedUser) : null;
  });
});

</script>


<style scoped>
.overlay-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  /* ajusta el alto de la sombra */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.0) 100%);
  z-index: 0;
  pointer-events: none;
  /* evita que bloquee clics */
}
</style>
