<template>
  <div class="loginContainer">
    <span class="logo">
      <i class="iconfont icon-yinfu" style="fontSize:50px"></i>
    </span>
    <el-form label-width="20%" label-position="left" size="medium" class="loginForm" :rules="rules">
      <el-form-item label="手机号码" prop="phoneNum">
        <el-input placeholder="请输入手机号码" v-model="phoneNum"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captchaNum">
        <el-input placeholder="请输入验证码" v-model="captcha">
          <el-button type="text" slot="suffix">{{clicked? '已发送':'获取验证码'}}</el-button>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    var validatorPhone = (rules, value, callback) => {
      if (!/^1$/.test(value)) {
        callback(new Error('请输入正确电话号码'))
      } else {
        callback()
      }
    }
    return {
      phoneNum: '',
      captcha: '',
      clicked: false,
      rules: {
        phoneNum: [
          { validator: validatorPhone, trigger: 'blur' }]
      },
      captchaNum: [
        { required: true, trigger: 'blur', type: 'number' }
      ]
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
  }
}
</style>
