import Vue from 'vue'
import VueRouter from 'vue-router'
const discovery = () => import('../views/discovery')
const mine = () => import('../views/mine')
const movie = () => import('../views/movie')
const town = () => import('../views/town')

Vue.use(VueRouter)

const routes = [
  {
    path: '/discovery',
    component: discovery
  },
  {
    path: '/mine',
    component: mine
  },
  {
    path: '/movie',
    component: movie
  },
  {
    path: '/town',
    component: town
  },
  {
    path: '/',
    redirect: '/discovery'
  }
]

const router = new VueRouter({
  routes
})

export default router
