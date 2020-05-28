<template>
  <header>
    <slot name="left"></slot>
    <slot name="center"></slot>
    <slot name="right"></slot>
  </header>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
header {
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
</style>
