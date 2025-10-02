import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchDepa from '../views/SearchDepa.vue'
import ViewDepa from '../views/ViewDepa.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/search', name: 'SearchDepa', component: SearchDepa },
  { path: '/view', name: 'VerDepa', component: ViewDepa },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router