<template>
  <div class="loginContainer">
    <span class="back" v-if="!userLogin" @click="back">
      <i class="iconfont icon-jiantou3"></i>
    </span>
    <span class="logo">
      <i class="iconfont icon-yinfu" style="fontSize:50px"></i>
    </span>
    <el-form
      label-position="left"
      :model="ruleForm"
      size="medium"
      class="loginForm"
      :rules="rules"
      ref="ruleForm"
      v-if="userLogin"
    >
      <el-form-item label="手机号码" prop="phoneNum">
        <el-input placeholder="请输入手机号码" v-model="ruleForm.phoneNum"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-button class="modifypwd" type="text" @click.prevent="togglelogin">修改密码</el-button>

      <el-form-item>
        <button
          type="button"
          class="button confirm"
          @touchstart="changeBgc({bgcolor:'#f1695f', color:'#fff',e:$event})"
          @touchend="changeBgc({bgcolor:'#fff',color:'#f1695f',e:$event})"
          @click.prevent="onsubmit"
        >确定</button>
      </el-form-item>
      <el-form-item>
        <button
          type="button"
          class="button tourist"
          @touchstart="changeBgc({bgcolor:'#f1695f', e:$event})"
          @touchend="changeBgc({bgcolor:'#dc2c1f',e:$event})"
          @click="touristStatus"
        >立即体验</button>
      </el-form-item>
    </el-form>

    <el-form
      label-position="left"
      :model="ruleForm"
      size="medium"
      class="loginForm"
      :rules="rules"
      ref="ruleForm"
      v-else
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
            @click.prevent="getCaptcha"
          >{{clicked? `(${time}s)已发送`:'获取验证码'}}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item>
        <button
          type="button"
          class="button confirm"
          @touchstart="changeBgc({bgcolor:'#f1695f', color:'#fff',e:$event})"
          @touchend="changeBgc({bgcolor:'#fff',color:'#f1695f',e:$event})"
          @click.prevent="onsubmit"
        >确定</button>
      </el-form-item>
      <el-form-item>
        <button
          type="button"
          class="button tourist"
          @touchstart="changeBgc({bgcolor:'#f1695f', e:$event})"
          @touchend="changeBgc({bgcolor:'#dc2c1f',e:$event})"
          @click="touristStatus"
        >立即体验</button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { sendCaptcha, verifyCaptcha, modifypwd, login } from '../../api/index'
export default {
  data () {
    var validatorPhone = (rules, value, callback) => {
      if (/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(value)) {
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
    var validatorpwd = (rules, value, callback) => {
      if (/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确密码'))
      }
    }
    return {
      userLogin: true,
      clicked: false,
      time: 30,
      ruleForm: {
        phoneNum: '',
        captcha: null,
        password: ''
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
        ],
        password: [
          {
            trigger: 'blur',
            validator: validatorpwd
          }
        ]

      }
    }
  },

  methods: {
    // get captcha
    getCaptcha: function () {
      this.$refs.ruleForm.validateField('phoneNum', (valid) => {
        if (valid) { return false } else {
          this.clicked = true
          sendCaptcha({ phone: this.ruleForm.phoneNum })
          this.timer = setInterval(() => {
            this.time -= 1
          }, 1000)
        }
      })
    },
    // submit
    onsubmit: function () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.userLogin) {
            // login
            const res = await login({ phone: this.ruleForm.phoneNum, password: this.ruleForm.password })
            if (res.code === 200) {
              console.log(res)
              const data = res.cookie
              window.localStorage.setItem('token', res.token)
              const remb = data.search('__remember_me')
              const csrf = data.search('__csrf')
              document.cookie = data.substring(0, remb)
              document.cookie = data.substring(remb, csrf)
              document.cookie = data.substring(csrf)
              this.$store.commit('receive_uid', res.profile.userId)
              this.$router.push('/discovery')
            } else {
              this.$refs.ruleForm.validateField('password', (valid) => {
                return false
              })
            }
          } else {
            // 修改密码
            const result = await verifyCaptcha({ phone: this.ruleForm.phoneNum, password: this.ruleForm.password, captcha: this.ruleForm.captcha })
            if (result.code === 200) {
              const res = await modifypwd({ phone: this.ruleForm.phoneNum, password: this.ruleForm.password, captcha: this.ruleForm.captcha })
              window.localStorage.setItem('token', res.token)
              this.touristStatus()
              this.$router.push('/discovery')
              console.log(res)
            } else {
              this.$refs.ruleForm.validateField('captcha', (valid) => {
                return false
              })
            }
          }
        } else {
          return false
        }
      })
    },
    // change button bgc
    changeBgc ({ bgcolor, color, e }) {
      e.target.style.backgroundColor = bgcolor
      if (color) {
        e.target.style.color = color
      }
    },
    // touristStatus
    touristStatus () {
      window.localStorage.setItem('tourist', 'true')
      setTimeout(() => {
        this.$router.push('/discovery')
      }, 1000)
    },
    togglelogin: function () {
      this.userLogin = false
      this.$refs.ruleForm.resetFields()
    },
    back: function () {
      this.userLogin = true
      this.$refs.ruleForm.resetFields()
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
  },
  mounted () {

  }

}
</script>
<style lang='scss'>
.el-form-item__label {
  color: #fff;
}
.el-form-item__error {
  color: #fff;
}
.loginContainer {
  height: 100%;
  background-color: #dc2c1f;
  .back {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #fff;
    font-size: 20px;
  }
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
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 40%;
    width: 70%;
    .modifypwd {
      float: right;
      transform: translateY(-25px);
      color: #fff;
    }
    .button {
      display: block;
      width: 100%;
      outline: none;
      height: 36px;
      border-radius: 30px;
      border: 0;
      &.confirm {
        background-color: #fff;
        color: #dc2c1f;
        margin: 10px 0 -10px;
      }
      &.tourist {
        background-color: #dc2c1f;
        color: #fff;
        border: 1px solid #fff;
      }
    }
  }
}
</style>
