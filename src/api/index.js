import ajax from './$axios'

// 轮播图
export const reqBanner = (num) => ajax(`/banner?type=${num}`)
// 推荐歌单
export const reqRecSongSheet = (limit) => ajax(`/personalized?limit=${limit}`)
// 歌单详情页
export const reqSongSheetDetail = (id) => ajax(`/playlist/detail?id=${id}`)
// 歌曲详情
export const reqSongDetail = (str) => ajax(`/song/detail`, { params: str })
// 歌曲URL
export const reqSongUrl = (str) => ajax(`/song/url`, { params: str })
// 获取歌词
export const reqSongLyric = (id) => ajax(`/lyric`, { params: id })
// 获取推荐歌曲
export const reqrecNewSong = () => ajax(`/personalized/newsong`)
// 获取歌单广场类别
export const reqsongSheetPg = () => ajax(`/playlist/hot`)
// 获取歌单分类数据
export const reqsongSheetTag = (data) => ajax(`/top/playlist`, { params: data })
// 发送验证码
export const sendCaptcha = (data) => ajax(`/captcha/sent`, { params: data })
// 验证验证码
export const verifyCaptcha = ({ phone, captcha }) => ajax(`/captcha/verify`, { params: { phone, captcha } })
// 修改密码
export const modifypwd = ({ phone, captcha, password }) => ajax(`register/cellphone`, { data: { phone, password, captcha }, method: 'post' })
// 登陆
export const login = ({ phone, password }) => ajax(`/login/cellphone`, { data: { phone, password }, method: 'post' })
// 每日推荐歌曲
export const recSong = () => ajax('/recommend/songs')
// 默认搜索关键词
export const defaultKeyword = ({ time }) => ajax(`/search/default?${time}`)
// 热搜列表
export const hotSearch = () => ajax(`/search/hot/detail`)
// 获取搜索内容
export const searchContent = (keywords) => ajax(`/search`, { params: keywords })
// 获取用户信息
export const getUserInfo = (uid) => ajax(`/user/detail`, { params: uid })
// 登出
export const userLogout = () => ajax(`/logout`)
// 获取歌曲评论
export const getSongComment = ({ id, before = 0 }) => ajax(`/comment/music`, { params: { id, before } })
// 音乐的喜欢与取消
export const toggleFav = ({ id, like = true }) => ajax(`/like`, { params: { id, like } })
// 喜欢音乐列表
export const favSongList = ({ uid, timestamp }) => ajax(`/likelist`, { params: { uid, timestamp } })
