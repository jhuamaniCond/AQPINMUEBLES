<template>
  <div
    class="min-h-screen flex flex-col bg-background-light text-content-light font-display overflow-hidden"
  >
    <!-- Header -->
    <header
      class="flex items-center justify-between border-b border-slate-200 px-10 py-4 bg-white shadow-sm animate-fade-down"
    >
      <div class="flex items-center gap-3 text-primary">
        <svg
          class="h-8 w-8"
          fill="currentColor"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
            fill="currentColor"
            fill-rule="evenodd"
          />
        </svg>
        <h1 class="text-xl font-bold">AlojaAQP</h1>
      </div>

      <button
        @click="goToLogin"
        class="rounded-lg h-10 px-4 bg-primary/10 text-primary font-bold hover:bg-primary/20 transition-colors"
      >
        Iniciar sesión
      </button>
    </header>

    <!-- Main -->
    <main
      class="flex flex-1 items-center justify-center py-16 px-4 sm:px-6 lg:px-8 animate-fade-in"
    >
      <div
        class="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 space-y-8 border border-gray-100"
      >
        <div class="animate-fade-up">
          <h2 class="text-center text-3xl font-extrabold text-slate-800">
            Crear cuenta
          </h2>
          <p class="mt-2 text-center text-slate-500 text-sm">
            Únete a nuestra comunidad de estudiantes.
          </p>
        </div>

        <form @submit.prevent="registerStudent" class="mt-6 space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              v-model="first_name"
              type="text"
              placeholder="Nombre"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
              required
            />
            <input
              v-model="last_name"
              type="text"
              placeholder="Apellido"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
              required
            />
          </div>

          <input
            v-model="email"
            type="email"
            placeholder="Correo electrónico"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
            required
          />

          <input
            v-model="password"
            type="password"
            placeholder="Contraseña"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
            required
          />

          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
            required
          />

          <input
            v-model="phone_number"
            type="tel"
            placeholder="Número de teléfono"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
            required
          />

          <div class="relative">
            <select
              v-model="selectedCampus"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all pr-10"
              required
            >
              <option disabled value="">Selecciona tu campus</option>
              <option
                v-for="campus in campuses"
                :key="campus.id"
                :value="campus.id"
              >
                {{ campus.name }}
              </option>
            </select>
            <span
              class="material-symbols-outlined absolute right-3 top-3 text-gray-400 pointer-events-none"
            >
              expand_more
            </span>
          </div>

          <div class="flex items-center text-sm">
            <input
              v-model="acceptedTerms"
              type="checkbox"
              class="form-checkbox h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label class="ml-2">
              Acepto los
              <a href="#" class="text-primary hover:underline"
                >Términos y condiciones</a
              >.
            </label>
          </div>

          <button
            type="submit"
            class="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md"
          >
            Registrarse
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Asegurar fondo claro al entrar
onMounted(() => {
  document.documentElement.classList.remove("dark");
});

const first_name = ref("");
const last_name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const phone_number = ref("");
const selectedCampus = ref("");
const acceptedTerms = ref(false);

const campuses = [
  { id: 1, name: "Área de Ingenierías - UNSA" },
  { id: 2, name: "Área Biomédicas - UNSA" },
  { id: 3, name: "Área Sociales - UNSA" },
];

const registerStudent = async () => {
  if (!acceptedTerms.value) return alert("⚠️ Debes aceptar los términos.");
  if (password.value !== confirmPassword.value)
    return alert("⚠️ Las contraseñas no coinciden.");

  const payload = {
    email: email.value,
    password: password.value,
    first_name: first_name.value,
    last_name: last_name.value,
    phone_number: phone_number.value,
    campuses: [selectedCampus.value],
  };

  try {
    const res = await fetch("http://127.0.0.1:8000/api/auth/register-student/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("💡 Respuesta del backend:", data);

    if (res.ok) {
      alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
      router.push("/");
    } else {
      alert(`❌ Error al registrar: ${data.message || "Verifica los datos"}`);
    }
  } catch (err) {
    console.error("❌ Error en registro:", err);
    alert("Error al comunicarse con el servidor");
  }
};

const goToLogin = () => router.push("/");
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
.animate-fade-up {
  animation: fadeIn 0.7s ease-out;
}
@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-down {
  animation: fadeDown 0.5s ease-out;
}
</style>

