<template>
  <div class="cardContain">
    <header>
      <div>{{this.titlename}}</div>
      <div>
        <span>
          <i class="iconfont icon-guanbi"></i>
        </span>
        <span>
          <i class="iconfont icon-gengduo"></i>
        </span>
      </div>
    </header>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    titlename: {
      default: '标题'
    }
  }
}
</script>

<style lang="scss">
.cardContain {
  padding: 5px;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #ccc;
  }
}
</style>
