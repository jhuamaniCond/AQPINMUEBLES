import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MapPage from '../views/MapPage.vue'
import SearchDepa from '../views/SearchDepa.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/map', component: MapPage },
  { path: '/search', component: SearchDepa }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
