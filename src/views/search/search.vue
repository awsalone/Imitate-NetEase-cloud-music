<template>
  <div class="searchContainer">
    <HeaderTop>
      <template #left>
        <i class="iconfont icon-jiantou3" style="font-size:25px" @click="$router.back()"></i>
      </template>
      <template #center>
        <input
          type="text"
          class="searchInput"
          @blur="refresh()"
          :placeholder="defaultKeyword"
          v-model="keyWords"
        />
      </template>
      <template #right>
        <i class="iconfont icon-icon-" style="font-size:25px"></i>
      </template>
    </HeaderTop>
    <div class="history">
      <div class="historyTop">
        <span>历史记录</span>
        <i style="font-size:16px" class="iconfont icon-huishouzhan_huaban"></i>
      </div>
      <div class="historyContent">
        <span class="hisotryItem">1231</span>
      </div>
    </div>
    <div class="hotSearch">
      <div class="hotSearchTop">热搜榜</div>
      <ul>
        <li class="hotSearchContent" v-for="(item,index) in hotSearchs" :key="index">
          <div class="index">1</div>
          <div class="songContain">
            <div class="songItem">
              <span>{{item.searchWord}}</span>
              <span>{{item.score}}</span>
            </div>
            <span>{{item.content}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import HeaderTop from '../../components/headerTop/headerTop'
import { defaultKeyword, hotSearch } from '../../api/index'
export default {
  data () {
    return {
      defaultKeyword: '请输入搜索项',
      hotSearchs: [],
      keyWords: ''
    }
  },
  components: {
    HeaderTop
  },
  methods: {
    init: async function () {
      const keyWords = await defaultKeyword((new Date()).valueOf())
      const hotSearchs = await hotSearch()
      this.defaultKeyword = keyWords.data.realkeyword
      this.hotSearchs = hotSearchs.data
    },
    refresh: async function () {
      const time = (new Date()).valueOf()
      const keyWords = await defaultKeyword({ time: time })
      this.defaultKeyword = keyWords.data.realkeyword
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss">
.searchContainer {
  background-color: #ccc;
  margin-top: 70px;
  .searchInput {
    height: 45px;
    width: 80%;
    font-size: 20px;
    border-bottom: 1px solid #ccc;
  }
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
        padding: 5px;
        border-radius: 15px;
        background-color: rgb(100, 82, 184);
        box-sizing: border-box;
      }
    }
  }
  .hotSearch {
    ul {
      .hotSearchContent {
        display: flex;
        align-items: center;
        height: 40px;
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
          .songItem {
            display: flex;
            justify-content: space-between;
            padding-right: 5px;
          }
        }
      }
    }
  }
}
</style>
