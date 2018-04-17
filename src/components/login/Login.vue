<template>
  <div class="login-page">
    <div id="particles-js">
    </div>
    <div class="login-wrapper" v-if="loginned">
      <h1>你已经登录，请勿重复登录！</h1>
      <p>{{ count }} 秒后将自动跳转...</p>
    </div>
    <div class="login-wrapper" v-if="!loginned">
      <h1>
        <img src="../../assets/images/yuanlai.png" alt=""> 来后台管理系统
      </h1>
      <el-form
        ref="loginForm"
        :model="login"
        label-width="60px"
        label-position="left"
      >
        <el-form-item label="用户名">
          <el-input v-model="login.name"></el-input>
        </el-form-item>
        <el-form-item label="密 码">
          <el-input type="password" v-model="login.password"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" size="large" @click='userLogin'>登 录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import * as LoginApi from '@/api/login'
  import * as Storage from '@/assets/js/storage'
  export default {
    name: 'LoginPage',
    mounted () {
      window.particlesJS.load('particles-js', '/static/json/particles-data.json')
      if (this.loginned) {
        let timer = setInterval(() => {
          this.count--
          if (this.count === 0) {
            clearInterval(timer)
            // 重置count
            this.count = 5
            this.$router.replace({
              path: '/'
            })
          }
        }, 1000)
      }
    },
    data () {
      return {
        login: {},
        loginned: JSON.parse(Storage.getSessionStorage('__USER_VALID__')),
        count: 5
      }
    },
    methods: {
      userLogin () {
        if (!this.login.name) return this.$message.error('用户名不允许为空！')
        if (!this.login.password) return this.$message.error('登录密码不允许为空！')
        LoginApi.login(this.login.name, this.login.password).then(response => {
          console.log(response)
          if (response.code === 0) {
            Storage.getLocalStorage('__VALID_USER_INFO__', JSON.stringify({
              userId: response.data.userId,
              nickName: response.data.nickName,
              avatar: response.data.avator,
              token: response.data.token
            }))
            this.$message({
              type: 'success',
              message: '登录成功！'
            })
            Storage.getSessionStorage('__USER_VALID__', true)
            setTimeout(() => {
              this.$router.replace({
                path: '/'
              })
            }, 2000)
          } else {
            this.$message({
              type: 'error',
              message: '用户名或者密码错误！'
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang='sass'>
  .login-page
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 100
    background-color: #fff
    #particles-js
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      background-color: #36A2EB
      background-repeat: no-repeat
      background-size: cover
      background-position: 50% 50%
    .login-wrapper
      position: absolute
      width: 350px
      top: 50%
      left: 50%
      padding: 15px
      border: 1px solid #bfcbd9
      border-radius: 5px
      transform: translate3d(-50%, -50%, 0)
      background-color: #fff
      h1
        line-height: 30px
        margin-bottom: 22px
        text-align: center
        img
          width: 30px
          height: 30px
          vertical-align: top
      p
        text-align: center
        font-size: 16px
      .login-btn
        text-align: center
</style>
