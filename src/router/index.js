import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/products-details',
      name: 'productsDetails',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/ProductsDetailsPage.vue')
    },
    {
      path: '/new-product',
      name: 'createNewProduct',
      component: () => import('../pages/CreateNewProductPage.vue')
    }
  ]
})

export default router
