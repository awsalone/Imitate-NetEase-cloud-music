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
        <router-link to="/content" class="iconfont icon-icon-" style="font-size:25px"></router-link>
      </template>
    </HeaderTop>
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderTop from '../../components/headerTop/headerTop'
import { defaultKeyword, hotSearch } from '../../api/index'
export default {
  data () {
    return {
      defaultKeyword: '请输入搜索项',
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
  margin-top: 70px;
  .searchInput {
    height: 45px;
    width: 80%;
    font-size: 20px;
    border-bottom: 1px solid #ccc;
  }
}
</style>
