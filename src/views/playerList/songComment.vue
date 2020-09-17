<template>
  <div class="sComment">
    <HeaderTop>
      <template #left>
        <div>
          <span @click="$router.go(-1)">
            <i class="iconfont icon-jiantou3" style="font-size:20px"></i>
          </span>
          <span class="commentTitle">评论({{comment.total}})</span>
        </div>
      </template>
    </HeaderTop>
    <div class="sCommentContainer" v-if="comment">
      <ul>
        <li>
          <div v-for="(item, index) in comment.comments" :key="index" class="sCommentItem">
            <div class="sCommentItemLeft">
              <span>
                <img :src="item.user.avatarUrl" class="sCommentItemImg" />
              </span>
            </div>
            <div class="sCommentItemRight">
              <div class="sCommentItemTop">
                <div>{{item.user.nickname}}</div>
                <div>{{item.time|timeFormat}}</div>
              </div>
              <div class="sCommentItemContent">{{item.content}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSongComment } from '../../api/index'
import HeaderTop from '../../components/headerTop/headerTop'
export default {
  components: {
    HeaderTop
  },
  async created () {
    const a = { id: this.$route.params.id }
    const res = await getSongComment(a)
    console.log(res)
    this.comment = res
  },
  mounted () {

  },
  data () {
    return {
      comment: {}
    }
  },
  filters: {
    timeFormat:
      function (data) {
        const time = new Date(data)
        const year = time.getFullYear()
        const month = time.getMonth() + 1
        const day = time.getDate()
        return `${year}年${month}月${day}日`
      }
  }
}
</script>

<style lang="scss">
.sComment {
  margin-top: 70px;
  .commentTitle {
    margin-left: 15px;
    font-size: 20px;
    font-weight: bold;
  }
  .sCommentContainer {
    .sCommentItem {
      display: flex;
      padding: 10px 5px;
      border-bottom: 1px solid #ccc;
      .sCommentItemLeft {
        padding: 5px;
        .sCommentItemImg {
          border-radius: 50%;
          overflow: hidden;
          width: 50px;
          height: 50px;
        }
      }
      .sCommentItemRight {
        .sCommentItemTop {
          :nth-child(2) {
            color: rgb(172, 168, 168);
            font-size: 14px;
            padding-top: 5px;
          }
        }
        .sCommentItemContent {
          font-size: 18px;
          padding-top: 15px;
          word-break: break-all;
          line-height: 1.5rem;
        }
      }
    }
  }
}
</style>
