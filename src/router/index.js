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
const search = () => import('../views/search/search')
const searchDefault = () => import('../views/search/defaultContent')
const searchContent = () => import('../views/search/searchContent')
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

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
  // search页 1级
  {
    path: '/search',
    component: search,
    children: [
      {
        path: '/default',
        component: searchDefault
      },
      {
        path: '/content',
        component: searchContent
      },
      {
        path: '/',
        redirect: '/default'
      }
    ]
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
    name: 'login',
    component: login
  },
  {
    path: '/',
    redirect: '/discovery'
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
