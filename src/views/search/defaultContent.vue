<template>
  <div class="defaultSearchContain">
    <div class="history" v-if="this.keyWords.length">
      <div class="historyTop">
        <span>历史记录</span>
        <i style="font-size:16px" class="iconfont icon-huishouzhan_huaban" @click="clearKeyword"></i>
      </div>
      <div class="historyContent">
        <span
          class="hisotryItem"
          v-for="(item,index) in keyWords"
          :key="index"
          @click="defaultJump(item)"
        >{{item}}</span>
      </div>
    </div>
    <div class="hotSearch">
      <div class="hotSearchTop">热搜榜</div>
      <ul>
        <li
          class="hotSearchContent"
          v-for="(item,index) in hotSearchs"
          :key="index"
          @click="defaultJump(item.searchWord)"
        >
          <div class="index">{{index+1}}</div>
          <div class="songContain">
            <div class="songItems">
              <span>{{item.searchWord}}</span>
              <span>{{item.score}}</span>
            </div>
            <span class="songContent">{{item.content}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { hotSearch, searchContent } from '../../api/index'

import { mapState } from 'vuex'
export default {
  data () {
    return {
      hotSearchs: []
    }
  },
  computed: {
    ...mapState(['keyWords'])
  },
  methods: {
    init: async function () {
      const hotSearchs = await hotSearch()
      this.hotSearchs = hotSearchs.data
    },
    defaultJump: async function (keyWord) {
      this.$emit('keyword-push', keyWord)
      this.$store.commit('receive_keywords', keyWord)
      const result = await searchContent({ keywords: keyWord })
      const res = result.result.songs
      this.$store.commit('receive_search', res)
      this.$router.push('/content')
    },
    clearKeyword: function () {
      this.$store.commit('delete_keywords')
    }

  },
  created () {
    this.init()
  }
}
</script>
<style lang="scss">
.defaultSearchContain {
  .history {
    .historyTop {
      display: flex;
      justify-content: space-between;
      height: 25px;
      align-items: center;
      padding: 5px;
    }
    .historyContent {
      padding: 5px;
      margin-bottom: 5px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .hisotryItem {
        margin: 5px;
        padding: 5px 10px;
        border-radius: 15px;
        background-color: rgb(100, 82, 184);
        box-sizing: border-box;
      }
    }
  }
  .hotSearch {
    .hotSearchTop {
      padding: 10px;
      font-weight: bold;
    }
    ul {
      .hotSearchContent {
        display: flex;
        align-items: center;
        height: 40px;
        margin: 15px 0;
        .index {
          width: 40px;
          height: 40px;
          line-height: 40px;

          text-align: center;
        }
        .songContain {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 40px;
          justify-content: center;

          .songItems {
            display: flex;
            justify-content: space-between;
            padding-right: 5px;
            flex: 1;
            :first-child {
              font-size: 18px;
              font-weight: bold;
            }
            :last-child {
              color: #ccc;
            }
          }
          .songContent {
            flex: 1;
            color: #ccc;
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>
