<template>
  <header
    class="bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-8">
          <a class="flex items-center gap-2 text-gray-900 dark:text-white" href="#">
            <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd"
                d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                fill="currentColor" fill-rule="evenodd"></path>
              <path clip-rule="evenodd"
                d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                fill="currentColor" fill-rule="evenodd"></path>
            </svg>
            <router-link to="/" class="text-xl font-bold">
              AlojaAQP
            </router-link>
          </a>

          <nav class="hidden md:flex items-center gap-6">
            <a class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              href="#">Explore</a>
            <a class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              href="#">List your place</a>
            <a class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              href="#">Help</a>
          </nav>
        </div>

        <!-- Toggle y usuario -->
        <div class="flex items-center gap-4">
          <!-- BOTÓN DARK MODE -->
          <button @click="toggleDarkMode"
            class="relative inline-flex items-center h-8 rounded-full w-14 transition-colors"
            :class="isDark ? 'bg-gray-700' : 'bg-gray-200'">
            <span class="sr-only">Toggle dark mode</span>
            <span class="absolute inline-flex items-center justify-center w-6 h-6 bg-white rounded-full" :class="[
              isDark ? 'translate-x-4' : 'translate-x-0',
              buttonDarkhasInteracted ? 'transition-transform duration-300 ease-in-out' : ''
            ]">
              <span class="material-symbols-outlined text-base text-gray-700 dark:hidden">light_mode</span>
              <span class="material-symbols-outlined text-base text-gray-700 hidden dark:inline">dark_mode</span>
            </span>
          </button>

          <button
            class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
            Sign up
          </button>

          <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAlo91pnfJSsmHzc7pE-x3DyhQpI5SdlPENuRZV09BVDE07nVggll8-ZPJv_zOvrbGND65gR_1J1PkODUb__E4-qoBIEklzVkCJdqbKXmo7K3YMwkG4waSkHJsJr-czKTozUCQvl8Kt43MwPX2yN3M-BOBZr3_kL8M3-RuXO58o5SMBBG1kDO35zhXduURZU2Jm6HkHDCEHapiNvC5Y-iyVdtU9D4zhkzgwkwa-4aV3gzkJU038j6day4QXDxGw1qavnntTNVitAE");'>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onBeforeMount  } from "vue";

const isDark = ref(false);
const buttonDarkhasInteracted = ref(false);

  onBeforeMount(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      isDark.value = true;
      document.documentElement.classList.add("dark");
    }
  });

function toggleDarkMode() {
  buttonDarkhasInteracted.value = true; 
  isDark.value = !isDark.value;

  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}
</script>
