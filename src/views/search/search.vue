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
          v-model="keyWord"
        />
      </template>
      <template #right>
        <router-link
          to="/content"
          class="iconfont icon-icon-"
          style="font-size:25px"
          @click.native="search()"
        ></router-link>
      </template>
    </HeaderTop>
    <router-view :content="this.searchContent"></router-view>
  </div>
</template>
<script>
import HeaderTop from '../../components/headerTop/headerTop'
import { defaultKeyword, hotSearch, searchContent } from '../../api/index'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      defaultKeyword: '请输入搜索项',
      keyWord: '',
      searchContent: ''
    }
  },
  components: {
    HeaderTop
  },
  computed: {
    ...mapState(['keyWords'])
  },
  methods: {
    init: async function () {
      const keyWord = await defaultKeyword((new Date()).valueOf())
      const hotSearchs = await hotSearch()
      this.defaultKeyword = keyWord.data.realkeyword
      this.hotSearchs = hotSearchs.data
    },
    refresh: async function () {
      const time = (new Date()).valueOf()
      const keyWord = await defaultKeyword({ time: time })
      this.defaultKeyword = keyWord.data.realkeyword
    },
    search: async function () {
      const item = this.keyWord ? this.keyWord : this.defaultKeyword
      this.keyWord = item
      this.$store.commit('receive_keywords', item)
      const result = await searchContent({ keywords: this.keyWord })
      this.searchContent = result.result.songs
    }
  },
  created () {
    this.init()
    const arr = [1, 2, 3]
    const res = arr.filter((item) => {
      return item === 4
    })
    console.log(res)
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
