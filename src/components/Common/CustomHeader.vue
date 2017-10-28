<template>
  <header>
    <div class="logo-wrapper">

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
    z-index: 1000
  .logo-wrapper
    width: 60px
    height: 60px
    background-color: #806B6B
  .header-content
    display: flex
    justify-content: space-between
    flex-grow: 1
    padding: 0 15px
    background-color: #DCC7C7
    h1
      line-height: 60px
  .login-info
    display: flex
    align-items: center
    height: 60px
    .user-avatar
      display: block
      width: 40px
      height: 40px
    .user-name
      line-height: 30px
</style>
