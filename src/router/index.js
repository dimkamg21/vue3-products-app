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
      path: '/product/:id',
      name: 'productsDetails',
      props: true,
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
