import { RECEIVE_SONGS, RECEIVE_SONGURL } from './mutation-type'

export default {
  [RECEIVE_SONGS] (state, { song }) {
    state.playList[state.playList.length] = song
    state.songDetail = song
  },
  [RECEIVE_SONGURL] (state, { url }) {
    state.songUrl = url
  }
}
