<template>
  <ul class="nav-menu">
    <li>
      <a
        href="javascript:void(0)"
        style="padding-top: 8px;"
        data-url="/"
        @click="togglePage"
      >
        <i class="fa fa-home" style="font-size: 32px;"></i>
        <p style="margin-top: -2px;">首页</p>
      </a>
    </li>
    <li>
      <a
        href="javascript:void(0)"
        style="padding-top: 8px;"
        data-url="/system"
        @click="togglePage"
      >
        <i class="fa fa-users" style="font-size: 28px;"></i>
        <p style="margin-top: 2px;">系统消息</p>
      </a>
    </li>
    <li>
      <a
        href="javascript:void(0)"
        style="padding-top: 9px;"
        data-url="/user"
        @click="togglePage"
      >
        <i class="fa fa-vimeo" style="font-size: 28px;"></i>
        <p>用户行为</p>
      </a>
    </li>
    <li>
      <a
        href="javascript:void(0)"
        style="padding-top: 8px;"
        data-url="/feedback"
        @click="togglePage"
      >
        <i class="fa fa-bank" style="font-size: 28px;"></i>
        <p style="margin-top: 2px;">反馈管理</p>
      </a>
    </li>
    <li>
      <a
        href="javascript:void(0)"
        style="padding-top: 9px;"
        data-url="/report"
        @click="togglePage"
      >
        <i class="fa fa-frown-o" style="font-size: 28px;"></i>
        <p>举报管理</p>
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'SideBar',
    methods: {
      togglePage (e) {
        this.$emit('toggle-page', e)
      }
    }
  }
</script>

<style scoped lang="sass">
  .nav-menu
    position: fixed
    top: 60px
    left: 0px
    width: 60px
    bottom: 0px
    background-color: #DCC7C7
    li
      height: 60px
      text-align: center
      a
        display: block
        height: 100%
        -webkit-box-sizing: border-box
        -moz-box-sizing: border-box
        box-sizing: border-box
      p
        font-size: 12px
        line-height: 14px
</style>
