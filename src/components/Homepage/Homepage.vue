<template>
  <div ref="homepageContainer">
    <div class="right-container">
      <container title="用户实时数据">
        <ul class="realtime-data">
          <li>
            <h3>今日新增用户</h3>
            <p>29199</p>
          </li>
          <li>
            <h3>累计用户数量</h3>
            <p>8283712</p>
          </li>
          <li>
            <h3>今日新增帖子</h3>
            <p>1234132</p>
          </li>
          <li>
            <h3>累计帖子数量</h3>
            <p>12342</p>
          </li>
        </ul>
      </container>
      <container title="系统功能及使用介绍">
      </container>
    </div>
    <main>
      <container title="热门标签 TOP10">
        <div class="tags-wrapper">
          <el-tag>标签一</el-tag>
          <el-tag type="gray">标签二</el-tag>
          <el-tag type="primary">标签三</el-tag>
          <el-tag type="success">标签四</el-tag>
          <el-tag type="warning">标签五</el-tag>
          <el-tag type="danger">标签六</el-tag>
        </div>
      </container>
      <container title="热门帖子 TOP10">
        <ul class="post-list">
          <li>
            <h3>论坛和帖子用英语怎么说?</h3>
            <p class="post-content">一般用BBS当然书面上用FORUM意思完全一样了。帖子一般用NOTE：便条</p>
            <!--<ul class="post-images">-->
              <!--<li><img src="" alt=""></li>-->
            <!--</ul>-->
            <time class="post-time">2017-10-15 12:23:34</time>
            <div class="bottom-border"></div>
          </li>
        </ul>
      </container>
    </main>
  </div>
</template>

<script>
  import Container from '@/components/Common/Container'
  export default {
    name: 'Homepage',
    components: {
      Container
    },
    mounted () {
      this.$refs.homepageContainer.parentNode.style.height = 'auto'
    }
  }
</script>

<style scoped lang="sass">
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
    p
      font-weight: bold
  .post-list
    &>li
      position: relative
      padding: 0 10px 10px
    &>li + li
      margin-top: 10px
    .bottom-border
      position: absolute
      width: 100%
      height: 1px
      margin-top: 10px
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
    h3
      font-weight: bold
      line-height: 30px
    .post-content
      line-height: 24px
      max-height: 48px
      overflow: hidden
      -ms-text-overflow: ellipsis
      text-overflow: ellipsis
      margin: 5px 0 10px
</style>
