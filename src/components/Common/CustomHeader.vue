<template>
  <header>
    <div class="logo-wrapper">
      <i class="logo"></i>
    </div>
    <div class="header-content">
      <h1>源来后台管理系统</h1>
      <div class="login-info" v-if="userValid && userInfo">
        <i class="user-avatar" :style="{backgroundImage: `url(${userInfo.avatar})`}"></i>
        <p class="user-name">欢迎您，{{userInfo.nickName}}</p>
        <a href="javascript:void(0);" class="login-out" @click="loginOut">退出登录</a>
      </div>
    </div>
  </header>
</template>

<script>
  import * as Storage from '@/assets/js/storage'
  export default {
    name: 'CustomHeader',
    mounted () {
      if (this.userValid) {
        this.userInfo = JSON.parse(Storage.getLocalStorage('__VALID_USER_INFO__'))
        console.log(this.userInfo)
      }
    },
    data () {
      return {
        userValid: JSON.parse(Storage.getSessionStorage('__USER_VALID__')),
        userInfo: null
      }
    },
    methods: {
      loginOut () {
        let self = this
        Storage.removeStorageItem('__VALID_USER_INFO__')
        Storage.removeStorageItem('__USER_VALID__', true)
        setTimeout(function () {
          self.$router.replace({
            path: '/login'
          })
        }, 2000)
      }
    }
  }
</script>

<style scoped lang="sass">
  header
    position: fixed
    display: flex
    width: 100%
    top: 0px
    z-index: 99
    background-image: url(../../assets/images/header.jpg)
    -webkit-background-size: cover
    background-size: cover
  .logo-wrapper
    width: 100px
    height: 100px
    .logo
      display: block
      width: 60px
      height: 60px
      background-image: url(../../assets/images/yuanlai.png)
      -webkit-background-size: contain
      background-size: contain
      margin: 20px auto
  .header-content
    display: flex
    justify-content: space-between
    flex-grow: 1
    padding-right: 30px
    h1
      line-height: 100px
      font-size: 28px
      color: #fff
  .login-info
    display: flex
    align-items: center
    height: 100px
    .user-avatar
      display: block
      width: 40px
      height: 40px
      border-radius: 50%
      background-size: contain
      background-position: 50% 50%
    .user-name
      line-height: 30px
      margin-left: 20px
      color: #ccc
      &:hover
        color: white
        cursor: pointer
    .login-out
      color: #999;
      margin-left: 20px;
      &:hover
        color: white;
</style>
