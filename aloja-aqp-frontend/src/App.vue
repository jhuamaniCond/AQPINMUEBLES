<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()

// 🔄 Mantiene sincronizado el login/logout entre pestañas
const syncStorage = () => {
  const storedUser = localStorage.getItem('user_info')
  if (storedUser) {
    auth.user = JSON.parse(storedUser)
    auth.isLogged = true
  } else {
    auth.user = null
    auth.isLogged = false
  }
}

onMounted(() => {
  window.addEventListener('storage', syncStorage)
})

onUnmounted(() => {
  window.removeEventListener('storage', syncStorage)
})
</script>
