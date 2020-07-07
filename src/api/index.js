import ajax from './ajax'
const BASE_URL = '/api'
// 轮播图
export const reqBanner = (num) => ajax(`${BASE_URL}/banner?type=${num}`)
// 推荐歌单
export const reqRecSongSheet = (limit) => ajax(`${BASE_URL}/personalized?limit=${limit}`)
// 歌单详情页
export const reqSongSheetDetail = (id) => ajax(`${BASE_URL}/playlist/detail?id=${id}`)
// 歌曲详情
export const reqSongDetail = (str) => ajax(`${BASE_URL}/song/detail`, str)
// 歌曲URL
export const reqSongUrl = (str) => ajax(`${BASE_URL}/song/url`, str)
// 获取歌词
export const reqSongLyric = (id) => ajax(`${BASE_URL}/lyric`, id)
// 获取推荐歌曲
export const reqrecNewSong = () => ajax(`${BASE_URL}/personalized/newsong`)
// 获取歌单广场类别
export const reqsongSheetPg = () => ajax(`${BASE_URL}/playlist/hot`)
// 获取歌单分类数据
export const reqsongSheetTag = (data) => ajax(`${BASE_URL}/top/playlist`, data)
// 发送验证码
export const sendCaptcha = (data) => ajax(`${BASE_URL}/captcha/sent`, data)
// 验证验证码
export const verifyCaptcha = ({ phone, captcha }) => ajax(`${BASE_URL}/captcha/verify`, { phone, captcha })
// 默认搜索关键词
export const defaultKeyword = ({ time }) => ajax(`${BASE_URL}/search/default`, { time })
// 热搜列表
export const hotSearch = () => ajax(`${BASE_URL}/search/hot/detail`)
// 获取搜索内容
export const searchContent = ({ keywords }) => ajax(`${BASE_URL}/search`, { keywords })
