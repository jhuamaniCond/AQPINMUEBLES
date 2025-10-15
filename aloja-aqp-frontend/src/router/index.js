import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchDepa from '../views/SearchDepa.vue'
import ViewDepa from '../views/ViewDepa.vue'
import RegisterStudent from '../views/RegisterStudent.vue'
import RegisterOwner from '../views/RegisterOwner.vue'
import MisPropiedades from '../views/MisPropiedades/MisPropiedades.vue'
import AgregarPropiedad from '../views/MisPropiedades/AgregarPropiedad.vue'
import VerPropiedades from '../views/MisPropiedades/VerPropiedades.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/search', name: 'SearchDepa', component: SearchDepa },
  { path: '/view', name: 'VerDepa', component: ViewDepa },
  { path: '/register-student', name: 'RegisterStudent', component: RegisterStudent },
  { path: '/register-owner', name: 'RegisterOwner', component: RegisterOwner },
  {
    path: "/mis-propiedades",
    component: MisPropiedades,
    children: [
      { path: "", name: "VerPropiedades", component: VerPropiedades },
      { path: "agregar", name: "AgregarPropiedad", component: AgregarPropiedad },
    ],
  },
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