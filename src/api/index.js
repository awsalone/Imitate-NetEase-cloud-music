import ajax from './ajax'
const BASE_URL = '/api'
// 轮播图
export const reqBanner = (num) => ajax(`${BASE_URL}/banner?type=${num}`)
// 推荐歌单
export const reqRecSongSheet = (limit) => ajax(`${BASE_URL}/personalized?limit=${limit}`)
// 歌单详情页
export const reqSongSheetDetail = (id) => ajax(`${BASE_URL}/playlist/detail?id=${id}`)
// 歌曲URL
export const reqSongUrl = (str) => ajax(`${BASE_URL}/song/url`, str)
// 歌曲详情
export const reqSongDetail = (str) => ajax(`${BASE_URL}/song/detail`, str)
