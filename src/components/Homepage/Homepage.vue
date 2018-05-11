<template>
  <div ref="homepageContainer" class="homepage-wrapper">
    <div class="right-container">
      <container title="用户实时数据">
        <ul class="realtime-data">
          <li>
            <h3>{{ userInfo.newUserToday }}</h3>
            <p>今日新增用户</p>
          </li>
          <li>
            <h3>{{ userInfo.totalUsers }}</h3>
            <p>累计用户数量</p>
          </li>
          <li>
            <h3>{{ userInfo.newArticlesToday }}</h3>
            <p>今日新增帖子</p>
          </li>
          <li>
            <h3>{{ userInfo.totalArticles }}</h3>
            <p>累计帖子数量</p>
          </li>
        </ul>
      </container>
      <container title="系统功能及使用介绍">
      </container>
    </div>
    <main>
      <container title="热门标签 TOP10">
        <div class="tags-wrapper">
          <!--<el-tag color="#E9FAF0">{{ label }}</el-tag>-->
          <span
            v-for="(label, i) in hotLabels" class="tag"
            :key="i"
          >{{ label }}</span>
        </div>
      </container>
      <container title="热门帖子 TOP10">
        <ul class="post-list">
          <li
            v-for="(article, i) in hotArticles"
            :key="i"
          >
            <i class="top-rank">{{ i + 1 }}</i>
            <h3>{{ article.title }}</h3>
            <p class="post-content">{{ article.content }}</p>
            <!--<ul class="post-images" v-if="article.image.length">-->
              <!--<li v-for="image in article.image" :style="{backgroundImage: `url(${image}})`}"></li>-->
            <!--</ul>-->
            <p class="post-time">
              by
              <i
                v-if="article.avator"
                :style="{backgroundImage: `url(${article.avator})`}"
              ></i>&nbsp;
              <span class="user-nickname">{{ article.nickName }}</span>
              at
              <time>{{ article.time | timeFormat }}</time>
            </p>
            <div class="bottom-border"></div>
          </li>
        </ul>
      </container>
    </main>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  import Container from '@/components/Common/Container'
  import * as homepageApi from '@/api/homepage'
  export default {
    name: 'Homepage',
    components: {
      Container
    },
    filters: {
      timeFormat (val) {
        return dayjs(Number(val)).format('YYYY年MM月DD日 HH:mm')
      }
    },
    mounted () {
      this.$refs.homepageContainer.parentNode.style.height = 'auto'
      this._getHotLabels()
      this._getHotPosts()
      this._getUserRealtimeData()
    },
    data () {
      return {
        hotLabels: [],
        hotArticles: [],
        userInfo: {}
      }
    },
    methods: {
      _getHotLabels () {
        homepageApi.getData('/admin/analysis/getHotLabel').then(data => {
          if (data.code === 0) {
            this.hotLabels = data.data.labels
          }
        }).catch(error => {
          console.log(error)
        })
      },
      _getHotPosts () {
        homepageApi.getData('/admin/analysis/getHotArticle').then(data => {
          console.log(data)
          if (data.code === 0) {
            this.hotArticles = data.data.articles
          }
        }).catch(error => {
          console.log(error)
        })
      },
      _getUserRealtimeData () {
        homepageApi.getData('/admin/analysis/getUserRealtimeData').then(data => {
          console.log(data)
          if (data.code === 0) {
            this.userInfo = data.data
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped lang="sass">
  @import '../../assets/sass/variables'
  .homepage-wrapper
    padding-right: 25px


  .right-container
    float: right
    width: 350px
  main
    padding-right: 365px
  .realtime-data
    display: flex
    flex-wrap: wrap
    li
      width: 50%
      text-align: center
      line-height: 30px
      &:nth-of-type(n+3)
        margin-top: 10px
      h3
        font-weight: bold
        color: $color-purple
        font-family: Impact
        font-size: 26px
      p
        font-size: 14px

  .tags-wrapper
    display: flex
    align-items: center
    flex-wrap: wrap
    margin-left: -20px
    .tag
      display: block
      -webkit-border-radius: 13px
      -moz-border-radius: 13px
      border-radius: 13px
      border: 1px solid $color-purple
      line-height: 24px
      font-size: 14px
      padding: 0px 10px
      color: $color-purple
      white-space: nowrap
      margin-top: 10px
      margin-left: 20px
  .post-list
    &>li
      position: relative
      padding: 0 10px 10px
    &>li:nth-child(10) .top-rank
      padding-left: 7px
    &>li:last-child .bottom-border
      display: none
    &>li + li
      margin-top: 10px
    h3
      font-weight: bold
      line-height: 50px
      font-size: 20px
      padding-left: 30px
      -webkit-box-sizing: border-box
      -moz-box-sizing: border-box
      box-sizing: border-box
      white-space: nowrap
      overflow: hidden
      -ms-text-overflow: ellipsis
      text-overflow: ellipsis
    .top-rank
      position: absolute
      width: 40px
      height: 40px
      line-height: 40px
      -webkit-box-sizing: border-box
      -moz-box-sizing: border-box
      box-sizing: border-box
      margin-left: -20px
      margin-top: 5px
      padding-left: 12px
      background-image: url(../../assets/images/top.svg)
      -webkit-background-size: contain
      background-size: contain
      background-repeat: no-repeat
      background-position: 50% 50%
      font-size: 24px
      color: $color-purple
      font-family: 'Impact'
    .post-content
      line-height: 24px
      max-height: 48px
      color: #666
      overflow: hidden
      -ms-text-overflow: ellipsis
      text-overflow: ellipsis
      margin-top: 5px
    .post-images
      font-size: 0px
      margin-top: 10px
      li
        display: inline-block
        width: 19%
        background-position: 50% 50%
        -webkit-background-size: cover
        background-size: cover
        &:after
          content: ''
          display: block
          padding-top: calc(133.3333%)
      li + li
        margin-left: 1.25%
    .post-time
      line-height: 30px
      text-align: right
      padding-top: 10px
      i
        display: inline-block
        width: 30px
        height: 30px
        -webkit-background-size: contain
        background-size: contain
        background-repeat: no-repeat
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        vertical-align: top
      .user-nickname
        font-size: 14px
        color: #666
      time
        font-style: italic

  .bottom-border
    position: absolute
    width: 100%
    height: 1px
    margin-top: 10px
    margin-left: -10px
    background-color: rgb(209, 219, 229)
    &:before
      content: ''
      position: absolute
      width: 28px
      height: 28px
      background-color: #fff
      left: 50%
      margin-top: -14px
      margin-left: -14px
    &:after
      content: ''
      position: absolute
      width: 8px
      height: 8px
      -webkit-border-radius: 50%
      -moz-border-radius: 50%
      border-radius: 50%
      border: 1px solid rgb(209, 219, 229)
      left: 50%
      margin-top: -4px
      margin-left: -4px

</style>
