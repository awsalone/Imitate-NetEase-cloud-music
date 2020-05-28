import Vue from 'vue'
import VueRouter from 'vue-router'
const discovery = () => import('../views/discovery/discovery')
const mine = () => import('../views/mine/mine')
const movie = () => import('../views/movie/movie')
const town = () => import('../views/town/town')
const songSheet = () => import('../views/songSheet/songSheet')
const playerList = () => import('../views/playerList/playerList')
Vue.use(VueRouter)

const routes = [
  {
    path: '/discovery',
    component: discovery,
    meta: {
      headerShow: true
    }
  },
  {
    path: '/mine',
    component: mine,
    meta: {
      headerShow: true
    }
  },
  {
    path: '/movie',
    component: movie,
    meta: {
      headerShow: true
    }
  },
  {
    path: '/town',
    component: town,
    meta: {
      headerShow: true
    }
  }, {
    path: '/songSheet/:id',
    component: songSheet

  }, {
    path: '/playerList/:id',
    component: playerList,
    meta: {
      playerShowHide: true
    }
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
