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
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 10px;
}
</style>
