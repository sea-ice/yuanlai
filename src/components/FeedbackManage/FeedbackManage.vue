<template>
  <container
    title="反馈管理"
    style="height: 100%;"
    ref="feedbackContainer"
  >
    <el-table
      :data="feedbackList"
      border
      :height="tableHeight"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        align="center"
        :resizable="false"
        width="70">
      </el-table-column>
      <el-table-column
        prop="user.id"
        label="用户ID"
        align="center"
        :resizable="false"
        width="100">
      </el-table-column>
      <el-table-column
        label="用户头像"
        align="center"
        :resizable="false"
        width="100">
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
            :open-delay="500"
          >
            <div class="user-info">
              <p>用户名：{{ scope.row.user.nickName }}</p>
            </div>
            <div slot="reference" class="avatar-wrapper">
              <i :style="{backgroundImage: `url(${scope.row.user.avator || (scope.row.user.gender === '男' ? Images.MaleNull : Images.FemaleNull)})`}"></i>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="反馈内容"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <div class="content-wrapper">
            <p class="feedback-content">{{ scope.row.content }}</p>
            <a href="javascript:void(0)" @click.stop="showFeedbackDetail(scope.row)">查看详情</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        width="180"
        align="center"
        :resizable="false"
        label="反馈时间">
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        width="100"
        :resizable="false"
      >
        <template slot-scope="scope">
          <p class="handled" v-if="scope.row.handled">已查看</p>
          <p class="unhandled" v-else>未查看</p>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="反馈内容"
      :visible.sync="dialogVisible"
      center
      v-if="chosenFeedback"
    >
      <section class="dialog-content">
        <header>
          <p>
            用户&nbsp;
            <i :style="{backgroundImage: `url(${chosenFeedback.user.avator || (chosenFeedback.user.gender === '男' ? Images.MaleNull : Images.FemaleNull)})`}"></i>&nbsp;
            {{ chosenFeedback.user.nickName }}&nbsp;
            反馈：
          </p>
        </header>
        <p class="d-content">{{ chosenFeedback.content }}</p>
        <p>反馈时间：<time>{{ chosenFeedback.date }}</time></p>
      </section>
      <span slot="footer">
        <el-button type="primary" @click="confirmReceiveFeedback">确 定</el-button>
      </span>
    </el-dialog>
  </container>
</template>

<script>
  import Container from '@/components/Common/Container'
  import * as feedbackApi from '@/api/feedback'
  import moment from 'moment'
  import Images from '@/assets/js/images'
  export default {
    name: 'FeedbackManage',
    components: {
      Container
    },
    mounted () {
      const TITLE_HEIGHT = 50 + 15
      let container = this.$refs.feedbackContainer
      container.$el.parentNode.style.height = '100%'
      this.tableHeight = container.$el.clientHeight - TITLE_HEIGHT
      window.addEventListener('resize', () => {
        this.tableHeight = container.$el.clientHeight - TITLE_HEIGHT
      })

      this._getFeedbackList()
    },
    data () {
      return {
        tableHeight: 0,
        feedbackList: [],
        dialogVisible: false,
        chosenFeedback: null,
        Images
      }
    },
    methods: {
      showFeedbackDetail (item) {
        this.chosenFeedback = item
        this.dialogVisible = true
      },
      confirmReceiveFeedback () {
        this.dialogVisible = false
      },
      _getFeedbackList () {
        feedbackApi.getData('/admin/feedback/getInfoList').then(data => {
          console.log(data)
          if (data.code === 0) {
            this.feedbackList = data.data.list.map(v => ({
              handled: v.handled === 1,
              id: v.id,
              date: moment(v.time, 'YYYY-MM-DD HH:mm').fromNow(),
              user: v.user,
              content: v.content.content
            }))
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped lang="sass">
  .avatar-wrapper
    padding: 10px 0
    i
      width: 40px
      height: 40px
  .avatar-wrapper i, .dialog-content i
    display: inline-block
    -webkit-border-radius: 50%
    -moz-border-radius: 50%
    border-radius: 50%
    -webkit-background-size: contain
    background-size: contain
    margin: 0 auto
    vertical-align: top
  .content-wrapper
    padding: 10px 0 5px
    &:after
      content: ''
      display: block
      width: 0px
      height: 0px
      clear: left
  .feedback-content
    line-height: 18px
    max-height: 36px
    overflow: hidden
    -ms-text-overflow: ellipsis
    text-overflow: ellipsis
    margin-bottom: 5px
    text-align: justify
  a
    float: left
    line-height: 18px
    color: #20a0ff
    &:hover
      color: #999
  .handled
    color: green
  .unhandled
    color: red

  .dialog-content
    i
      width: 30px
      height: 30px
    header
      p
        line-height: 30px
    .d-content
      margin: 20px 0
      line-height: 16px
</style>
