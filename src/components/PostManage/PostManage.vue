<template>
  <div class="user-behavior-wrapper">
    <div class="tabs-wrapper" ref="tabsWrapper">
      <tab-panel
        :tabs="userTabs"
        :activeName="activeName"
      >
        <div class="tab" slot="plain">
          <ul class="post-list" v-if="plainPosts">
            <li
              v-for="(article, i) in plainPosts"
              :key="i"
            >
              <i class="top-rank">{{ i + 1 }}</i>
              <h3>{{ article.title }}</h3>
              <p class="post-content">{{ article.content }}</p>
              <p class="post-time-wrapper">
                <a
                  href="javascript:void(0);"
                  class="move-post-link"
                  @click.stop="moveToEssenceList(article.articleId)"
                >
                  <i class="move-icon"></i>
                  <span class="move-link-text">移入精华帖</span>
                </a>
                <span>by
                <i
                  v-if="article.avator"
                  :style="{backgroundImage: `url(${article.avator})`}"
                  class="user-avatar"></i>&nbsp;
                <span class="user-nickname">{{ article.nickName }}</span>
                at
                <time>{{ article.time | timeFormat }}</time></span>
              </p>
              <div class="bottom-border"></div>
            </li>
          </ul>
        </div>
        <div class="tab" slot="essence">
          <ul class="post-list" v-if="essencePosts">
            <li
              v-for="(article, i) in essencePosts"
              :key="i"
            >
              <i class="top-rank">{{ i + 1 }}</i>
              <h3>{{ article.title }}</h3>
              <p class="post-content">{{ article.content }}</p>
              <p class="post-time-wrapper">
                <span class="placeholder"></span>
                <span>
                  by
                  <i v-if="article.avator" :style="{backgroundImage: `url(${article.avator})`}"></i>
                  &nbsp;
                  <span class="user-nickname">{{ article.nickName }}</span>
                  at
                  <time>{{ article.time | timeFormat }}</time>
                </span>
              </p>
              <div class="bottom-border"></div>
            </li>
          </ul>
        </div>
      </tab-panel>
    </div>
  </div>
</template>

<script>
import TabPanel from '@/components/Common/TabPanel'
import {getData} from '@/api/homepage'
import {movePlainPost} from '@/api/postManage'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      userTabs: [
        {
          label: '普通帖',
          name: 'plain'
        },
        {
          label: '精华帖',
          name: 'essence'
        }
      ],
      activeName: 'plain',
      plainPosts: null,
      essencePosts: null
    }
  },
  components: {
    TabPanel
  },
  created () {
    this.getPlainPost()
    this.getEssencePost()
  },
  filters: {
    timeFormat (val) {
      return dayjs(Number(val)).format('YYYY年MM月DD日 HH:mm')
    }
  },
  methods: {
    getPlainPost () {
      getData('/admin/analysis/getRecommendFromHotArticle').then(response => {
        console.log(response)
        if (response.code === 0) {
          this.plainPosts = response.data.articles
        }
      })
    },
    getEssencePost () {
      getData('/admin/analysis/getRecommendArticle').then(response => {
        console.log(response)
        if (response.code === 0) {
          this.essencePosts = response.data.articles
        }
      })
    },
    moveToEssenceList (id) {
      console.log(id)
      movePlainPost(id).then(response => {
        console.log(response)
        if (response.code === 0) {
          let moveItemIndex = this.plainPosts.findIndex(item => item.articleId === id)
          let moveItem = this.plainPosts.splice(moveItemIndex, 1)
          this.essencePosts.push(moveItem[0])
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '../../assets/sass/variables'
  .post-list
    &>li
      position: relative
      padding: 10px
      &:first-child
        padding-top: 0
    &>li:nth-child(n+10) .top-rank
      padding-left: 7px
    &>li:last-child .bottom-border
      display: none
    &>li + li
      border-top: 1px solid #ccc;
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
    .post-time-wrapper
      display: flex
      justify-content: space-between
      align-items: center
      line-height: 30px
      text-align: right
      padding-top: 10px
      i
        display: inline-block
        -webkit-background-size: contain
        background-size: contain
        background-repeat: no-repeat
        vertical-align: top
      .move-post-link
        display: flex
        align-items: center
        color: $color-purple;
        .move-icon
          width: 20px
          height: 20px
          background-image: url('../../assets/images/move.svg');
        .move-link-text
          padding-left: 10px
      .user-avatar
        width: 30px
        height: 30px
        border-radius: 50%
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
      .user-nickname
        font-size: 14px
        color: #666
      time
        font-style: italic
</style>
