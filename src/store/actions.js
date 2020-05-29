import { RECEIVE_SONGS, RECEIVE_SONGURL } from './mutation-type'
import { reqSongUrl, reqSongDetail } from '../api/index'

export default {
  async getSongDetail ({ commit }, id) {
    const result = await reqSongDetail(id)
    if (result.code === 200) {
      const song = result.songs[0]
      commit(RECEIVE_SONGS, { song, id })
    }
  },
  async getSongUrl ({ commit }, id) {
    const result = await reqSongUrl(id)
    if (result.code === 200) {
      const url = result.data[0].url
      commit(RECEIVE_SONGURL, { url })
    }
  }
}
