import { createApp } from 'vue'
import App from './App.vue'

// 🧭 Router
import router from './router'

// 📦 Pinia
import { createPinia } from 'pinia'

// 🎨 Estilos globales
import './assets/styles.css'

// 💎 Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useAuthStore } from './stores/auth'


// Crear instancia de Vuetify
const vuetify = createVuetify({
  components,
  directives,
})

// Crear app y registrar plugins
const app = createApp(App)

app.use(createPinia()) // estado global
app.use(router)        // rutas
app.use(vuetify)       // UI


const auth = useAuthStore()
auth.loadUser()

app.mount('#app')
