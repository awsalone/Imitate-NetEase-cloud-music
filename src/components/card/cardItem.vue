<template>
  <div class="cardItem">
    <div class="left">
      <slot></slot>
    </div>
    <div @click="moreInfoClick">
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
  },
  methods: {
    moreInfoClick () {
      this.$emit('moreInfoClick')
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
  .left {
    flex-grow: 1;
  }
}
</style>
