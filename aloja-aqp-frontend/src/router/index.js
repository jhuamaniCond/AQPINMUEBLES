import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchDepa from '../views/SearchDepa.vue'
import ViewDepa from '../views/ViewDepa.vue'
import RegisterStudent from '../views/RegisterStudent.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/search', name: 'SearchDepa', component: SearchDepa },
  { path: '/view', name: 'VerDepa', component: ViewDepa },
  { path: '/register-student', name: 'RegisterStudent', component: RegisterStudent },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Si el navegador guarda la posición (por ejemplo, al usar "back"), la usa
    if (savedPosition) {
      return savedPosition
    } else {
      // De lo contrario, siempre sube al tope de la página
      return { top: 0 }
    }
  },
})

export default router