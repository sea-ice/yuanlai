<template>
  <header>
    <div class="logo-wrapper">
      <i class="logo"></i>
    </div>
    <div class="header-content">
      <h1>源来后台管理系统</h1>
      <div class="login-info">
        <i class="user-avatar"></i>
        <p class="user-name">刘亚欧</p>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'CustomHeader'
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
    padding: 0 15px
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
    .user-name
      line-height: 30px
</style>
