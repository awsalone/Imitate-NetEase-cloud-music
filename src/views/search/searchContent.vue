<template>
  <div>
    <div class="title">
      <span>单曲</span>
      <span @click="playAll(searchRes,searchRes[0].id)">
        <i class="iconfont icon-bofang_bg"></i>
        <span>播放全部</span>
      </span>
    </div>
    <ul>
      <li
        class="songItem"
        v-for="(item, index) in searchRes"
        :key="index"
        @click="changeSong(item.id)"
      >
        <div class="songItemL">
          <div class="musicName">
            <span class="name">{{item.name}}</span>
            <span class="author">{{item | author}}</span>
          </div>
        </div>
        <div class="songItemR">
          <i class="iconfont icon-gengduo"></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  filters: {
    author:
      function (value) {
        let str = ''
        value.artists.forEach(element => {
          str += element.name + '/'
        })
        str = str.substr(0, str.length - 1)
        str += '-' + value.album.name
        return str
      }
  },
  methods: {
    changeSong (id) {
      this.$store.dispatch('getSongDetail', { ids: id })
      this.$store.commit('receive_playState', { zt: false })
    },
    playAll (list, id) {
      this.$store.commit('play_all', { playList: list })
      this.changeSong(id)
    }
  },
  computed: {
    ...mapState(['searchRes'])
  },
  created () {
    console.log(this.searchRes)
  }
}
</script>
<style lang="scss">
.title {
  display: flex;
  justify-content: space-between;
  margin: 5px;
  align-items: center;
  height: 25px;
  span {
    display: flex;
    align-items: center;
  }
  :first-child {
    font-size: 20px;
  }
}
.songItem {
  height: 45px;
  line-height: 45px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  .songItemL {
    display: flex;
    width: 90%;
    .musicName {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 90%;
      span {
        vertical-align: middle;
      }

      .name {
        font-size: 16px;
        line-height: 100%;
        margin-bottom: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .author {
        font-size: 12px;
        color: #ccc;
        line-height: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .songItemR {
    vertical-align: middle;
  }
}
</style>
