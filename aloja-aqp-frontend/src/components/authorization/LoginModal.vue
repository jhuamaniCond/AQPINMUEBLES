<template>
  <transition name="fade-zoom">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      <div
        class="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl relative animate-fadeIn"
      >
        <!-- Botón de cerrar -->
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          ✕
        </button>

        <!-- Título -->
        <h2 class="text-2xl font-bold mb-6 text-center text-primary">
          Iniciar sesión
        </h2>

        <!-- Formulario -->
        <form @submit.prevent="loginUser" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="email">
              Email
            </label>
            <input
              v-model="email"
              id="email"
              type="email"
              placeholder="tu@email.com"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="password">
              Contraseña
            </label>
            <input
              v-model="password"
              id="password"
              type="password"
              placeholder="••••••••"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 placeholder-gray-400"
            />
          </div>

          <div class="text-right">
            <a href="#" class="text-sm text-primary hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            class="w-full py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
          >
            Iniciar sesión
          </button>

          <div class="relative flex items-center py-2">
            <div class="flex-grow border-t border-gray-200"></div>
            <span class="mx-4 text-sm text-gray-400">O</span>
            <div class="flex-grow border-t border-gray-200"></div>
          </div>

          <button
            type="button"
            @click="loginWithGoogle"
            class="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25C22.56 11.45 22.49 10.68 22.36 9.92H12V14.4H18.19C17.93 15.79 17.24 16.96 16.18 17.71V20.12H20.06C21.66 18.7 22.56 16.63 22.56 14.05V12.25Z"
                fill="#4285F4"
              ></path>
              <path
                d="M12 23C14.97 23 17.47 22.02 19.27 20.46L15.43 17.71C14.47 18.35 13.3 18.72 12 18.72C9.61 18.72 7.53 17.15 6.7 15.05H2.74V17.51C4.54 20.89 7.99 23 12 23Z"
                fill="#34A853"
              ></path>
              <path
                d="M6.7 15.05C6.43 14.28 6.29 13.48 6.29 12.65C6.29 11.82 6.43 11.02 6.7 10.25V7.79H2.74C1.84 9.53 1.33 11.53 1.33 13.65C1.33 15.77 1.84 17.77 2.74 19.51L6.7 17.05V15.05Z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12 5.28C13.48 5.28 14.81 5.81 15.82 6.77L19.33 3.27C17.47 1.59 14.97 0.5 12 0.5C7.99 0.5 4.54 2.61 2.74 6.09L6.7 8.55C7.53 6.45 9.61 4.78 12 4.78V5.28Z"
                fill="#EA4335"
              ></path>
            </svg>
            <span class="font-medium text-gray-700">Continuar con Google</span>
          </button>
        </form>

        <p class="text-center text-sm mt-8 text-gray-500">
          ¿No tienes una cuenta?
          <a href="#" class="font-medium text-primary hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(["close"]);

const email = ref("");
const password = ref("");

const loginUser = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user_info", JSON.stringify(data.user)); //---
      alert("✅ Inicio de sesión exitoso");
      //Emitir el usuario logeado al padre
      emit("login-success", data.user);
      emit("close");
      
    } else {
      alert("❌ Credenciales incorrectas");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};

const loginWithGoogle = () => {
  window.location.href = "http://127.0.0.1:5500/test.html";
};
</script>

<style scoped>
.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 0.25s ease;
}
.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>