import { TOGGLE_SONGORLIST, GET_COLLECTSHEETLIST, GET_LIKELIST, GET_USERINFO, TOGGLE_MENU, RECEIVE_SONGS, RECEIVE_SONGURL, RECEIVE_UID, RECEIVE_PLAYMODE, DELETE_PLAYLIST, DELETE_SONG, RECEIVE_PLAYSTATE, PLAY_ALL, RECEIVE_KEYWORDS, RECEIVE_SEARCH, DELETE_KEYWORDS } from './mutation-type'

export default {
  // 当前播放和播放列表判断
  [RECEIVE_SONGS] (state, { song }) {
    if (!state.playList.find((item) => { return item.id === song.id })) {
      state.playList[state.playList.length] = song
    }

    state.songDetail = song
  },
  // 歌曲链接
  [RECEIVE_SONGURL] (state, { url }) {
    state.songUrl = url
  },
  // 播放模式
  [RECEIVE_PLAYMODE] (state, { num }) {
    state.playModeNum = num
  },
  // 删除播放列表
  [DELETE_PLAYLIST] (state) {
    state.playList = []
    state.songUrl = ''
    state.songDetail = {}
    state.currentTime = ''
    state.playStateC = true
  },
  // 删除选定歌曲
  [DELETE_SONG] (state, { id }) {
    const index = state.playList.findIndex(item => {
      return item.id === id
    })
    state.playList.splice(index, 1)
  },
  // 播放状态
  [RECEIVE_PLAYSTATE] (state, { zt }) {
    state.playStateC = zt
  },
  [PLAY_ALL] (state, { playList }) {
    state.playList = playList
  },
  // 关键词
  [RECEIVE_KEYWORDS] (state, keyword) {
    const key = state.keyWords.filter(item => {
      return item === keyword
    })
    if (key.length) {

    } else {
      state.keyWords.push(keyword)
    }
  },
  // 搜索结果
  [RECEIVE_SEARCH] (state, data) {
    state.searchRes = data
  },
  // 清空搜索历史
  [DELETE_KEYWORDS] (state) {
    state.keyWords = []
  },
  // 获取用户id
  [RECEIVE_UID] (state, uid) {
    state.uid = uid
    window.localStorage.setItem('uid', uid)
  },
  // 切换菜单显示状态
  [TOGGLE_MENU] (state) {
    state.lMenu = !state.lMenu
  },
  // 用户信息
  [GET_USERINFO] (state, info) {
    state.userInfo = info
  },
  // 喜欢音乐列表
  [GET_LIKELIST] (state, data) {
    state.likeListIds = data
  },
  // 用户歌单
  [GET_COLLECTSHEETLIST] (state, data) {
    state.collectsheetList = data
  },
  // 判断歌曲或歌单请求 0歌曲 1歌单
  [TOGGLE_SONGORLIST] (state, data) {
    state.songOrsonglist = !!data
  }
}
