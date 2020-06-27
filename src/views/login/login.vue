<template>
  <div class="loginContainer">
    <span class="logo">
      <i class="iconfont icon-yinfu" style="fontSize:50px"></i>
    </span>
    <el-form
      label-width="20%"
      label-position="left"
      :model="ruleForm"
      size="medium"
      class="loginForm"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="手机号码" prop="phoneNum">
        <el-input placeholder="请输入手机号码" v-model="ruleForm.phoneNum"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input placeholder="请输入验证码" v-model="ruleForm.captcha">
          <el-button
            type="text"
            slot="suffix"
            :disabled="clicked"
            @click="sendCaptcha"
          >{{clicked? `(${time}s)已发送`:'获取验证码'}}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain class="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    var validatorPhone = (rules, value, callback) => {
      if (/^1/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确电话号码'))
      }
    }
    var validatorcaptcha = (rules, value, callback) => {
      if (/\d{4}/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确验证码'))
      }
    }
    return {
      clicked: false,
      time: 30,
      ruleForm: {
        phoneNum: '',
        captcha: null
      },
      rules: {
        phoneNum: [
          { validator: validatorPhone, trigger: 'blur' }
        ],
        captcha: [
          {
            trigger: 'blur',
            validator: validatorcaptcha

          }
        ]

      }
    }
  },
  methods: {
    sendCaptcha: function () {
      this.$refs.ruleForm.validateField('phoneNum', (valid) => {
        if (valid) { return false } else {
          this.clicked = true
          this.timer = setInterval(() => {
            this.time -= 1
          }, 1000)
        }
      })
    }
  },
  watch: {
    time () {
      if (this.time === 0) {
        clearInterval(this.timer)
        this.time = 30
        this.clicked = false
      }
    }
  }

}
</script>
<style lang='scss'>
.loginContainer {
  height: 100%;
  background-color: rgba(255, 0, 0, 0.897);
  background-color: #ccc;
  .logo {
    box-sizing: border-box;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    top: 15%;
    text-align: center;
    line-height: 100px;
    color: #fff;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #fff;
  }
  .loginForm {
    box-sizing: border-box;
    padding: 10px;
    position: absolute;
    top: 40%;
    width: 100%;
    .submit {
      float: right;
    }
  }
}
</style>
