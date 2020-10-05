<template>
  <div class="promptContain" v-if="promptShow">
    <div class="promptmask" @click="closeClick"></div>
    <div class="prompt">
      <div class="promptTitle">新建歌单</div>
      <input type="text" v-model="data" placeholder="请输入歌单标题" />
      <div class="promptBottom">
        <span @click="closeClick">取消</span>
        <span @click="submit" :class="{disable:!this.data}">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: ''
    }
  },
  model: {
    prop: 'promptShow',
    change: 'change'
  },
  props: {
    promptShow: {
      default: false
    }
  },
  methods: {
    closeClick () {
      this.$emit('close-click')
      this.data = ''
    },
    submit () {
      const content = this.data
      this.$emit('submit', content)
      this.data = ''
    }
  }
}
</script>
<style lang="scss">
.promptContain {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2020;
  .promptmask {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  .prompt {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 70%;
    input {
      margin: 10px auto;
      border-radius: 5px;
      margin: 15px auto;
      padding: 7px 0;
      outline-style: none;
      border-bottom: 1px solid #ccc;
      width: 100%;
    }
    .promptBottom {
      float: right;

      span {
        color: rgb(221, 63, 63);
      }
      span:nth-child(1) {
        margin-right: 8px;
      }
      .disable {
        pointer-events: none;
        color: rosybrown;
      }
    }
  }
}
</style>
