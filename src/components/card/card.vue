<template>
  <div class="cardContain">
    <div class="cardTitle" v-if="titleShow">
      <div>{{this.titlename}}</div>
      <div>
        <span v-if="close">
          <i class="iconfont icon-guanbi"></i>
        </span>
        <span v-if="moreInfo">
          <i class="iconfont icon-gengduo"></i>
        </span>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    titlename: {
      default: '标题'
    },
    close: {
      type: Boolean,
      default: false
    },
    moreInfo: {
      type: Boolean,
      default: false
    },
    titleShow: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style lang="scss">
.cardContain {
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  .cardTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #ccc;
  }
}
</style>
