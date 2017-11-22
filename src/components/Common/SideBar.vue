<template>
  <ul class="nav-menu">
    <li :class="{active: activeUrl === item.url}" v-for="item in menu">
      <a
        href="javascript:void(0)"
        :data-url="item.url"
        @click="togglePage"
      >
        <i class="fa" :class="item.icon"></i>
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
          icon: 'fa-home',
          title: '首页',
          url: '/',
          m: -2
        }, {
          icon: 'fa-bell-o',
          title: '系统消息',
          url: '/system',
          m: 2
        }, {
          icon: 'fa-line-chart',
          title: '用户行为',
          url: '/user',
          m: 0
        }, {
          icon: 'fa-send',
          title: '反馈管理',
          url: '/feedback',
          m: 2
        }, {
          icon: 'fa-exclamation-triangle',
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
    z-index: 99
    padding-top: 20px
    li
      height: 100px
      text-align: center
      &:first-child
        a
          padding-top: 27px
        i
          font-size: 34px
      &:not(:first-child)
        a
          padding-top: 30px
        i
          font-size: 28px
      &.active
        i, p
          color: rgb(98, 85, 215)
      a
        display: block
        height: 100%
        -webkit-box-sizing: border-box
        -moz-box-sizing: border-box
        box-sizing: border-box
        &:hover
          i, p
            color: rgb(98, 85, 215)
      i
        font-size: 28px
      p
        font-size: 12px
        line-height: 14px
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
      top: 45px + 100px * ($i - 1)
</style>
