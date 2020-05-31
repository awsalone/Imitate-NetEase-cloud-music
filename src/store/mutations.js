import { RECEIVE_SONGS, RECEIVE_SONGURL, RECEIVE_PLAYMODE, DELETE_PLAYLIST, DELETE_SONG } from './mutation-type'

export default {
  [RECEIVE_SONGS] (state, { song }) {
    if (!state.playList.find((item) => { return item.id === song.id })) {
      state.playList[state.playList.length] = song
    }

    state.songDetail = song
  },
  [RECEIVE_SONGURL] (state, { url }) {
    state.songUrl = url
  },
  [RECEIVE_PLAYMODE] (state, { num }) {
    state.playModeNum = num
  },
  [DELETE_PLAYLIST] (state) {
    state.playList = []
  },
  [DELETE_SONG] (state, { id }) {
    const index = state.playList.findIndex(item => {
      return item.id === id
    })
    state.playList.splice(index, 1)
  }
}
