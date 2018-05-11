<template>
  <ul class="nav-menu">
    <li
      v-for="(item, index) in menu"
      :class="{active: activeUrl === item.url}"
      :key="index"
    >
      <a
        href="javascript:void(0)"
        :data-url="item.url"
        @click="togglePage"
      >
        <i :class="(activeUrl === item.url) ? item.activeIcon : item.icon"></i>
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
          icon: 'homepage-icon',
          activeIcon: 'homepage-active-icon',
          m: -2
        }, {
          title: '帖子管理',
          icon: 'feedback-icon',
          activeIcon: 'feedback-active-icon',
          url: '/post',
          m: 2
        }, {
          title: '系统消息',
          icon: 'message-icon',
          activeIcon: 'message-active-icon',
          url: '/system',
          m: 2
        }, {
          title: '用户行为',
          icon: 'user-icon',
          activeIcon: 'user-active-icon',
          url: '/user',
          m: 0
        }, {
          title: '反馈管理',
          icon: 'feedback-icon',
          activeIcon: 'feedback-active-icon',
          url: '/feedback',
          m: 2
        }, {
          title: '举报管理',
          icon: 'report-icon',
          activeIcon: 'report-active-icon',
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
      .homepage-icon
        background-image: url(../../assets/images/homepage.png)
      .homepage-active-icon
        background-image: url(../../assets/images/homepage_active.png)
      .feedback-icon
        background-image: url(../../assets/images/feedback.png)
      .feedback-active-icon
        background-image: url(../../assets/images/feedback_active.png)
      .message-icon
        background-image: url(../../assets/images/message.png)
      .message-active-icon
        background-image: url(../../assets/images/message_active.png)
      .user-icon
        background-image: url(../../assets/images/user.png)
      .user-active-icon
        background-image: url(../../assets/images/user_active.png)
      .report-icon
        background-image: url(../../assets/images/report.png)
      .report-active-icon
        background-image: url(../../assets/images/report_active.png)
      &.active
        i
          width: 40px
          height: 40px
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
  @for $i from 1 through 6
    .active:nth-of-type(#{$i}) ~ .indicator
      top: 42px + 100px * ($i - 1)
</style>
