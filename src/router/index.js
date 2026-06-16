import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConstanciaView from '../views/ConstanciaView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/constancia/:cui',
      name: 'constancia',
      component: ConstanciaView
    }
  ],
})

export default router
