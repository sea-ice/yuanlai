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
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        label="用户ID"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        label="用户头像"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
            :open-delay="500"
          >
            <div class="user-info">
              <p>用户名：{{ scope.row.user.name }}</p>
            </div>
            <div slot="reference" class="avatar-wrapper">
              <i :style='{backgroundImage: `url(${scope.row.user.avatar})`}'></i>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="反馈内容"
        align="center"
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
        label="反馈时间">
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        width="100"
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
            <i :style='{backgroundImage: `url(${chosenFeedback.user.avatar})`}'></i>&nbsp;
            {{ chosenFeedback.user.name }}&nbsp;
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
    },
    data () {
      return {
        tableHeight: 0,
        feedbackList: [{
          id: '13412923',
          name: 'xxx',
          user: {
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2770691011,100164542&fm=27&gp=0.jpg',
            name: 'xxx'
          },
          content: '...',
          date: '2017-10-30 21:59:55',
          handled: true
        }, {
          id: '13412923',
          name: 'xxx',
          user: {
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2770691011,100164542&fm=27&gp=0.jpg',
            name: 'xxx'
          },
          content: '...',
          date: '2017-10-30 21:59:55',
          handled: false
        }, {
          id: '13412923',
          name: 'xxx',
          user: {
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2770691011,100164542&fm=27&gp=0.jpg',
            name: 'xxx'
          },
          content: '...',
          date: '2017-10-30 21:59:55',
          handled: false
        }, {
          id: '13412923',
          name: 'xxx',
          user: {
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2770691011,100164542&fm=27&gp=0.jpg',
            name: 'xxx'
          },
          content: '上面这几行配置大致的含义：由最新版本的alpine image（一个很小的包含Linux环境的image）开始构建一个新的image。FROM指定了一个基础镜像。MAINTAINER指明了当前Image的创建者。RUN指定要执行哪些bash命令。CMD指定了在Container启动时运行的一些命令。',
          date: '2017-10-30 21:59:55',
          handled: true
        }, {
          id: '13412923',
          name: 'xxx',
          user: {
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2770691011,100164542&fm=27&gp=0.jpg',
            name: 'xxx'
          },
          content: '...',
          date: '2017-10-30 21:59:55',
          handled: true
        }, {
          id: '13412923',
          name: 'xxx',
          user: {
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2770691011,100164542&fm=27&gp=0.jpg',
            name: 'xxx'
          },
          content: '...',
          date: '2017-10-30 21:59:55',
          handled: true
        }],
        dialogVisible: false,
        chosenFeedback: null
      }
    },
    methods: {
      showFeedbackDetail (item) {
        this.chosenFeedback = item
        this.dialogVisible = true
      },
      confirmReceiveFeedback () {
        this.dialogVisible = false
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
