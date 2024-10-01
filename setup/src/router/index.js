import { createRouter, createWebHistory } from 'vue-router'
import UserComponent from '../components/UserComponent.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:id',
      name: 'user',
      component: UserComponent,
    },
  ]
})

export default router
