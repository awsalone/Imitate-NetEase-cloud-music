<template>
  <div class="musicPlayer">
    <div class="musicInfo">
      <div class="musicPortrait"></div>
      <div class="musicName">
        <span class="name">残酷月光12313</span>
        <span class="author">林宥嘉</span>
      </div>
    </div>
    <div class="musicIcon">
      <i class="iconfont icon-bofang_bg"></i>
      &nbsp;&nbsp;
      <i class="iconfont icon-danchu_bg"></i>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="scss">
.musicPlayer {
  position: fixed;
  bottom: 0;
  z-index: 1;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  height: 60px;
  line-height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .musicInfo {
    display: flex;

    .musicPortrait {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #aaa;
      margin: 5px;
    }

    .musicName {
      display: flex;
      flex-direction: column;
      justify-content: center;

      span {
        vertical-align: middle;
      }

      .name {
        font-size: 16px;
        line-height: 100%;
        margin-bottom: 5px;
      }

      .author {
        font-size: 12px;
        color: #ccc;
        line-height: 100%;
      }
    }
  }

  .musicIcon {
    margin-right: 10px;
  }
}
</style>
