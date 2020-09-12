<template>
  <div id="example-1">
    <button @click="show = !show">Toggle render</button>
    <transition name="slideFade">
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: true
    }
  }
}
</script>
<style lang="scss">
#example-1 {
  position: absolute;
  top: 100px;
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slideFade-enter-active,
  .slideFade-leave-active {
    transition: all 0.3s ease;
  }
  .slideFade-enter, .slideFade-leave-to
/* .slideFade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>
