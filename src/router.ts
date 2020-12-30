import {createWebHistory, createRouter} from 'vue-router'
import App from './App.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/:catchAll(.*)*',
    name: 'Not Found',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
