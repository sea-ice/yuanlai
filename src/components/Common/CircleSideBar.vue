<template>
  <ul class="nav-menu">
    <li :class="{active: activeUrl === item.url}" v-for="item in menu">
      <a
        href="javascript:void(0)"
        :data-url="item.url"
        @click="togglePage"
      >
        <i></i>
        <p :style="{marginTop: `${item.m}px`}">{{ item.title }}</p>
      </a>
    </li>
    <li class="indicator"></li>
  </ul>
</template>

<script>
  export default {
    name: 'SideBar',
    props: {
      activeUrl: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        menu: [{
          title: '首页',
          url: '/',
          m: -2
        }, {
          title: '系统消息',
          url: '/system',
          m: 2
        }, {
          title: '用户行为',
          url: '/user',
          m: 0
        }, {
          title: '反馈管理',
          url: '/feedback',
          m: 2
        }, {
          title: '举报管理',
          url: '/report',
          m: 0
        }]
      }
    },
    methods: {
      togglePage (e) {
        this.$emit('toggle-page', e)
      }
    }
  }
</script>

<style scoped lang="sass">
  @import '../../assets/sass/variables'
  .nav-menu
    position: fixed
    top: 100px
    left: 0px
    width: 100px
    bottom: 0px
    background-color: #fff
    z-index: 1
    padding-top: 20px
    li
      height: 100px
      text-align: center
      &:nth-child(1)
        i
          background-image: url(../../assets/images/homepage.png)
      &:nth-child(2)
        i
          background-image: url(../../assets/images/message.png)
      &:nth-child(3)
        i
          background-image: url(../../assets/images/user.png)
      &:nth-child(4)
        i
          background-image: url(../../assets/images/feedback.png)
      &:nth-child(5)
        i
          background-image: url(../../assets/images/report.png)
      &.active
        i
          width: 40px
          height: 40px
        &:nth-child(1)
          i
            background-image: url(../../assets/images/homepage_active.png)
        &:nth-child(2)
          i
            background-image: url(../../assets/images/message_active.png)
        &:nth-child(3)
          i
            background-image: url(../../assets/images/user_active.png)
        &:nth-child(4)
          i
            background-image: url(../../assets/images/feedback_active.png)
        &:nth-child(5)
          i
            background-image: url(../../assets/images/report_active.png)
        p
          color: rgb(98, 85, 215)
      a
        display: block
        height: 100%
        -webkit-box-sizing: border-box
        -moz-box-sizing: border-box
        box-sizing: border-box
        padding-top: 20px
        &:hover
          p
            color: rgb(98, 85, 215)
      i
        display: block
        width: 30px
        height: 30px
        -webkit-background-size: contain
        background-size: contain
        background-position: 50% 50%
        background-repeat: no-repeat
        margin: 0 auto
      p
        font-size: 12px
        line-height: 20px
    .indicator
      position: absolute
      right: -1px
      width: 3px
      height: 50px
      -webkit-border-radius:  1px
      -moz-border-radius:  1px
      border-radius:  1px
      background-color: $color-purple
      -webkit-transition: top .3s ease-in-out
      -moz-transition: top .3s ease-in-out
      -ms-transition: top .3s ease-in-out
      -o-transition: top .3s ease-in-out
      transition: top .3s ease-in-out
  @for $i from 1 through 5
    .active:nth-of-type(#{$i}) ~ .indicator
      top: 42px + 100px * ($i - 1)
</style>
