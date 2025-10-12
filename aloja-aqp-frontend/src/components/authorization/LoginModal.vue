<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
    <div class="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl relative">
      <!-- Botón de cerrar -->
      <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">✕</button>

      <!-- Título -->
      <h2 class="text-2xl font-bold mb-6 text-center text-primary">Iniciar sesión</h2>

      <!-- Formulario normal -->
      <form @submit.prevent="loginUser" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2" for="email">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="tu@email.com"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary bg-white text-gray-900 placeholder-gray-400"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2" for="password">Contraseña</label>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="••••••••"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary bg-white text-gray-900 placeholder-gray-400"
          />
        </div>

        <div class="text-right">
          <a href="#" class="text-sm text-primary hover:underline">¿Olvidaste tu contraseña?</a>
        </div>

        <button
          type="submit"
          class="w-full py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary"
        >
          Iniciar sesión
        </button>

        <!-- Separador -->
        <div class="relative flex items-center py-2">
          <div class="flex-grow border-t border-gray-200"></div>
          <span class="mx-4 text-sm text-gray-400">O</span>
          <div class="flex-grow border-t border-gray-200"></div>
        </div>

        <!-- Botón de Google -->
        <div class="flex justify-center">
          <div ref="googleButton"></div>
        </div>
      </form>

      <p class="text-center text-sm mt-8 text-gray-500">
        ¿No tienes una cuenta?
        <button
            @click="goToRegister"
            class="font-medium text-primary hover:underline"
        >
            Regístrate
        </button>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({ show: Boolean });
const emit = defineEmits(["close", "login-success"]);

//Register
const router = useRouter();

const goToRegister = () => {
  emit("close"); // Cierra el modal
  router.push("/register-student"); // Redirige a la vista de registro
};

const email = ref("");
const password = ref("");
const googleButton = ref(null);

// --- Login normal ---
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
      localStorage.setItem("user_info", JSON.stringify(data.user));
      emit("login-success", data.user);
      alert("✅ Inicio de sesión exitoso");
      emit("close");
      window.dispatchEvent(new Event("storage"));
    } else {
      alert("❌ Credenciales incorrectas");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};

// --- Google Login ---
function handleCredentialResponse(response) {
  console.log("💡 ID Token recibido de Google:", response.credential);

  if (!response.credential) {
    alert("Error: no se recibió ID Token de Google");
    return;
  }

  fetch("http://127.0.0.1:8000/api/auth/google-login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token: response.credential }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.access) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("user_info", JSON.stringify(data.user));
        emit("login-success", data.user);
        alert("✅ Login exitoso con Google");
        emit("close");
        window.dispatchEvent(new Event("storage"));
      } else {
        alert("❌ Error en el login con Google");
      }
    })
    .catch((err) => {
      console.error("❌ Error al comunicarse con el backend:", err);
      alert("Error al comunicarse con el backend");
    });
}

// --- Inicializar Google cuando esté listo ---
function ensureGoogleLoaded(callback) {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    callback();
  } else {
    setTimeout(() => ensureGoogleLoaded(callback), 100);
  }
}

function renderGoogleButton() {
  if (!googleButton.value) return;
  ensureGoogleLoaded(() => {
    if (!window.googleInitialized) {
      window.google.accounts.id.initialize({
        client_id:
          "708526682489-s8pf4a79o51jr6bdgi2pl8f1kutlvch7.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      window.googleInitialized = true;
    }

    // Limpia el contenido anterior para evitar duplicación del botón
    googleButton.value.innerHTML = "";

    window.google.accounts.id.renderButton(googleButton.value, {
      theme: "outline",
      size: "large",
      width: 300,
    });
  });
}

// --- Renderiza el botón al montar y al abrir el modal ---
onMounted(() => renderGoogleButton());

watch(
  () => props.show,
  (visible) => {
    if (visible) {
      // Espera un poco por la animación del modal
      setTimeout(renderGoogleButton, 150);
    }
  }
);
</script>
