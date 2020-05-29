import { RECEIVE_SONGS, RECEIVE_SONGURL } from './mutation-type'

export default {
  [RECEIVE_SONGS] (state, { song }) {
    if (!state.playList.find((item) => { return item.id === song.id })) {
      state.playList[state.playList.length] = song
    }

    state.songDetail = song
  },
  [RECEIVE_SONGURL] (state, { url }) {
    state.songUrl = url
  }
}
