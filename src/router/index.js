import Vue from 'vue'
import VueRouter from 'vue-router'
const discovery = () => import('../views/discovery/discovery')
const mine = () => import('../views/mine/mine')
const movie = () => import('../views/movie/movie')
const town = () => import('../views/town/town')
const songSheet = () => import('../views/songSheet/songSheet')
const playerList = () => import('../views/playerList/playerList')
const songSheetPG = () => import('../views/songSheetPG/songSheetPG')
const songSheetView = () => import('../views/songSheetPG/songSheetView')
const login = () => import('../views/login/login')
Vue.use(VueRouter)

const routes = [
  // 发现页 1级
  {
    path: '/discovery',
    component: discovery,
    meta: {
      headerShow: true
    }
  },
  // 我的 1级
  {
    path: '/mine',
    component: mine,
    meta: {
      headerShow: true
    }
  },
  // 视频页 1级
  {
    path: '/movie',
    component: movie,
    meta: {
      headerShow: true
    }
  },
  // 云村 1级
  {
    path: '/town',
    component: town,
    meta: {
      headerShow: true
    }
  },
  // 歌单页
  {
    path: '/songSheet/:id',
    component: songSheet

  },
  // 播放页
  {
    path: '/playerList/:id',
    component: playerList,
    meta: {
      playerShowHide: true
    }
  },
  // 歌单广场
  {
    path: '/songSheetPG',
    component: songSheetPG,
    children: [
      {
        path: 'songSheetView/:id',
        component: songSheetView
      }, {
        path: 'songSheetView',
        redirect: 'songSheetView/华语',
        component: songSheetView
      }
    ]
  },
  // 登陆页
  {
    path: '/login',
    component: login,
    children: [

    ]
  },
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      if (window.localStorage.getItem('userlogin') || window.localStorage.getItem('touristLogin')) { next({ path: '/discovery' }) } else { next({ path: '/login' }) }
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
