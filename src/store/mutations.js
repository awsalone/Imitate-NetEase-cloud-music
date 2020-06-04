import { RECEIVE_SONGS, RECEIVE_SONGURL, RECEIVE_PLAYMODE, DELETE_PLAYLIST, DELETE_SONG, RECEIVE_PLAYSTATE, PLAY_ALL } from './mutation-type'

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
  }
}
