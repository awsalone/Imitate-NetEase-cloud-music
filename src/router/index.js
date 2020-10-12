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
const daliyRecSongs = () => import('../views/discovery/daliyRecSong/daliyRecSong')
const songComment = () => import('../views/playerList/songComment')
Vue.use(VueRouter)
// 路由跳转至当前路由报错问题
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
        path: 'default',
        component: searchDefault
      },
      {
        path: 'content',
        component: searchContent
      },
      {
        path: '/',
        redirect: 'default'
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
        path: '/',
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
  // 每日推荐歌曲
  {
    path: '/daliyRecSong',
    component: daliyRecSongs,
    beforeEnter (to, from, next) {
      const flag = router.app.$options.store.state.uid || window.localStorage.getItem('uid')
      if (flag) {
        next()
      } else {
        window.localStorage.removeItem('tourist')
        next({ path: '/login' })
      }
    }
  },
  // 歌曲评论页
  {
    name: 'sComment',
    path: '/songComment/:id',
    component: songComment,
    meta: {
      playerHide: true
    }
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

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')
  const tourist = window.localStorage.getItem('tourist')
  const flag = token || tourist
  if (to.name !== 'login' && !flag) {
    next({ name: 'login' })
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  if (from.path === '/login' && to.path !== '/login') {
    window.location.reload()
  }
})

export default router
