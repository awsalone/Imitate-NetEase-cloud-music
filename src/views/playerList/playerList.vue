<template>
  <div class="contain" @touchmove.prevent>
    <!-- 背景 -->
    <div class="background" :style="{backgroundImage:songPic}"></div>
    <!-- 头部 -->
    <HeaderTop style="backgroundColor:rgba(0,0,0,0)">
      <template #left>
        <div class="leftContain">
          <span @click="routerpush()">
            <i class="iconfont icon-jiantou3" style="font-size:20px"></i>
          </span>
          <span class="titleName">
            <div class="songName">{{songDetail.name}}</div>
            <div class="author">{{songAuthor}}</div>
          </span>
        </div>
      </template>
      <template #right>
        <div class="rightContain">
          <i class="iconfont icon-fenxiang" style="font-size:20px"></i>
        </div>
      </template>
    </HeaderTop>
    <!-- cd转盘 -->
    <div class="songContainer" @click="middleShow = !middleShow">
      <div class="songPic" v-if="middleShow">
        <div class="pic active" :style="{backgroundImage: songPic}" :class="{pause:playStateC}"></div>
      </div>
      <!-- 歌词 -->
      <div class="lyricContain" v-else @click.stop="middleShow = !middleShow">未获取到歌词</div>
    </div>
    <!--底部菜单-->
    <div>
      <ul class="bottomMenu">
        <li @click="commentPage()">
          <div class="bottomMenuItem">
            <i class="iconfont icon-pinglun"></i>
          </div>
        </li>
        <li>
          <div class="bottomFav" @click="toggleLoveClick" :class="{toggleLove:loved}">
            <svg viewBox="3.5 5 25 25">
              <path
                class="lovePic"
                stroke="lavender"
                fill="none"
                stroke-width="1"
                d="M20.5,9.5
        c-1.955,0,-3.83,1.268,-4.5,3
        c-0.67,-1.732,-2.547,-3,-4.5,-3
        C8.957,9.5,7,11.432,7,14
        c0,3.53,3.793,6.257,9,11.5
        c5.207,-5.242,9,-7.97,9,-11.5
        C25,11.432,23.043,9.5,20.5,9.5z"
              />
            </svg>
          </div>
        </li>
      </ul>
    </div>
    <!-- 底部播放器 -->
  </div>
</template>

<script>
import HeaderTop from '../../components/headerTop/headerTop'
import { mapState } from 'vuex'
import { reqSongLyric, toggleFav, favSongList } from '../../api/index'
export default {
  data () {
    return {
      songAuthor: '', // 作者
      songPic: '',
      middleShow: true, // true cd播放 false 歌词界面
      id: '',
      loved: false
    }
  },
  components: {
    HeaderTop
  },

  methods: {
    routerpush () {
      this.$router.go(-1)
    },
    // 喜欢状态切换
    toggleLoveClick () {
      this.loved = !this.loved
      const data = { id: this.$route.params.id, like: this.loved }
      toggleFav(data)
      setTimeout(() => {
        this.getfavSongList()
      }, 1)
    },
    // 获取喜欢音乐列表
    getfavSongList: async function () {
      const id = window.localStorage.getItem('uid') || this.uid
      const date = new Date().getTime()
      const uid = { uid: id, timestamp: date }
      if (id) {
        const res = await favSongList(uid)
        this.$store.commit('get_likelist', res.ids)
      } else {
        return false
      }
    },
    // 歌词
    async getLyric () {
      const result = await reqSongLyric({ id: this.$route.params.id })
      this.lyric = result
    },
    // 初始化
    init (id) {
      this.$store.dispatch('getSongDetail', { ids: id })
    },
    commentPage () {
      this.$store.commit('toggle_songorlist', 1)

      this.$router.push({ path: `/songComment/${this.$route.params.id}` })
    },
    judgeLoved (id) {
      if (this.likeListIds) {
        const res = JSON.parse(JSON.stringify(this.likeListIds)).includes(id - 0)
        if (res) {
          this.loved = true
        } else {
          this.loved = false
        }
      }
    }
  },
  computed: {
    ...mapState(['songDetail', 'playStateC', 'likeListIds'])
  },

  watch: {
    // 获取歌曲歌手名
    songDetail: function () {
      if (Object.keys(this.songDetail).length) {
        this.songAuthor = this.songDetail.ar[0].name
        this.songPic = `url(${this.songDetail.al.picUrl})`
        this.id = this.songDetail.id
      }
    },

    // 监听页面内id变化重新渲染
    id: function () {
      this.init(this.id)
    }
  },
  // created(){
  //   let id = this.$route.params.id

  // },
  mounted () {
    this.getLyric()
    this.id = this.$route.params.id
    this.init(this.id)
    this.getfavSongList(this.id)
    this.judgeLoved(this.id)
  }
}
</script>
<style lang="scss">
@import url('../../static/support.css');
@keyframes rotatePic {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.contain {
  height: 100%;
  overflow: hidden;
  .iconfont {
    color: lavender;
    font-size: 30px;
  }
  .background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    -webkit-filter: blur(50px) brightness(0.8); /* Chrome, Safari, Opera */
    filter: blur(50px) brightness(0.8);
    transform: scale(1.3);
    z-index: -1;
  }
  .leftContain {
    display: flex;
    align-items: center;
    span {
      margin: 0 10px;
    }
    .titleName {
      color: #ccc;
      .author {
        font-size: 12px;

        margin-top: 3px;
      }
    }
  }
  .rightContain {
    margin: 0 10px;
  }
  .songContainer {
    display: flex;
    .songPic {
      width: 220px;
      height: 220px;
      border-radius: 50%;
      background: rgba(224, 221, 221, 0.5);
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);

      .pic {
        width: 200px;
        height: 200px;
        position: absolute;
        top: 10px;
        left: 10px;
        border-radius: 50%;
        background-size: 100% 100%;
        &.active {
          animation: rotatePic 20s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  // 底部导航
  .bottomMenu {
    position: absolute;
    bottom: 100px;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .bottomFav {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      &.toggleLove {
        .lovePic {
          fill: red;
          stroke-width: 0;
        }
      }
    }
  }
  // 歌词
  .lyricContain {
    text-align: center;
    top: 70px;
    bottom: 80px;
    position: absolute;
    width: 100%;
  }
}
</style>
