<template>
  <div class="cardItem">
    <div>
      <slot></slot>
    </div>
    <div>
      <i v-if="moreInfo" class="iconfont icon-gengduo"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    moreInfo: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.cardItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 20px;
}
</style>
