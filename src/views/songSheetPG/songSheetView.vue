<template>
  <div class="container">
    <ul class="boxcontain">
      <li class="box" v-for="(item,index) in playList" :key="index" @click="skipSongSheet(item.id)">
        <img v-lazy="item.coverImgUrl" alt />
        <span class="boxText">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { reqsongSheetTag } from '../../api/index'
export default {
  data () {
    return {
      name: '',
      playList: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      this.name = this.$route.params.id
      const result = await reqsongSheetTag({ cat: this.$route.params.id })
      this.playList = result.playlists
    },
    // 跳转歌单页面
    skipSongSheet (id) {
      this.$router.push({ path: `/songSheet/${id}` })
    }

  },
  watch: {
    $route (to, from) {
      this.init()
    }
  }
}
</script>
<style lang="scss">
.container {
  margin: 100px 8px 0;
  .boxcontain {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px 8px;
    .box {
      overflow: hidden;
      img {
        width: 100%;
        border-radius: 10px;
      }
      .boxText {
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin: 5px 0;
        line-height: 1.5;
        font-size: 13px;
        letter-spacing: 3px;
      }
    }
  }
}
</style>
