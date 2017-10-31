<template>
  <div class="tabs-wrapper" ref="reportContainer">
    <tab-panel
      :tabs="reportTabs"
      :activeName="activeName"
      @tab-click="handleTabClick"
    >
      <div class="tab" slot="unhandled">
        <el-table
          :data="reportList"
          border
          :height="tableHeight"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="#"
            align="center"
            width="50"
          >
          </el-table-column>
          <el-table-column
            label="被举报用户"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-popover
                trigger="hover"
                placement="top"
                :open-delay="500"
              >
                <div class="user-info">
                  <p>用户名：{{ scope.row.reportedUser.name }}</p>
                </div>
                <div slot="reference" class="avatar-wrapper">
                  <i :style='{backgroundImage: `url(${scope.row.reportedUser.avatar})`}'></i>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="举报用户"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <el-popover
                trigger="hover"
                placement="top"
                :open-delay="500"
              >
                <div class="user-info">
                  <p>用户名：{{ scope.row.reportUser.name }}</p>
                </div>
                <div slot="reference" class="avatar-wrapper">
                  <i :style='{backgroundImage: `url(${scope.row.reportUser.avatar})`}'></i>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="举报类型"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="reason"
            label="举报原因"
            align="center"
            width="100"
          >
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
            label="反馈时间"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="操作处理"
            width="200"
          >
            <template slot-scope="scope">
              <div class="operation-wrapper">
                <el-select v-model="operation" class="report-select" placeholder="请选择">
                  <el-option
                    v-for="item in operations"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <a href="javascript:void(0)">确定</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tab" slot="handled">
      </div>
    </tab-panel>
  </div>
</template>

<script>
  import TabPanel from '@/components/Common/TabPanel'
  export default {
    name: 'ReportManage',
    components: {
      TabPanel
    },
    mounted () {
      const TITLE_HEIGHT = 67 + 25
      let container = this.$refs.reportContainer
      container.parentNode.style.height = '100%'
      this.tableHeight = container.clientHeight - TITLE_HEIGHT
      window.addEventListener('resize', () => {
        this.tableHeight = container.clientHeight - TITLE_HEIGHT
      })
    },
    data () {
      return {
        tableHeight: 0,
        reportTabs: [
          {
            label: '未处理',
            name: 'unhandled'
          },
          {
            label: '已处理',
            name: 'handled'
          }
        ],
        activeName: 'unhandled',
        reportList: [{
          reportedUser: {
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2770691011,100164542&fm=27&gp=0.jpg',
            name: 'xxx'
          },
          reportUser: {
            avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2523342981,456767842&fm=27&gp=0.jpg',
            name: 'bbb'
          },
          type: '帖子',
          reason: '小广告',
          content: '...',
          date: '2017-10-30 21:59:55'
        }, {
          reportedUser: {
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2770691011,100164542&fm=27&gp=0.jpg',
            name: 'xxx'
          },
          reportUser: {
            avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2523342981,456767842&fm=27&gp=0.jpg',
            name: 'bbb'
          },
          type: '帖子',
          reason: '小广告',
          content: '...',
          date: '2017-10-30 21:59:55'
        }, {
          reportedUser: {
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2770691011,100164542&fm=27&gp=0.jpg',
            name: 'xxx'
          },
          reportUser: {
            avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2523342981,456767842&fm=27&gp=0.jpg',
            name: 'bbb'
          },
          type: '帖子',
          reason: '小广告',
          content: '...',
          date: '2017-10-30 21:59:55'
        }, {
          reportedUser: {
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2770691011,100164542&fm=27&gp=0.jpg',
            name: 'xxx'
          },
          reportUser: {
            avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2523342981,456767842&fm=27&gp=0.jpg',
            name: 'bbb'
          },
          type: '帖子',
          reason: '小广告',
          content: '...',
          date: '2017-10-30 21:59:55'
        }, {
          reportedUser: {
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2770691011,100164542&fm=27&gp=0.jpg',
            name: 'xxx'
          },
          reportUser: {
            avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2523342981,456767842&fm=27&gp=0.jpg',
            name: 'bbb'
          },
          type: '帖子',
          reason: '小广告',
          content: '...',
          date: '2017-10-30 21:59:55'
        }, {
          reportedUser: {
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2770691011,100164542&fm=27&gp=0.jpg',
            name: 'xxx'
          },
          reportUser: {
            avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2523342981,456767842&fm=27&gp=0.jpg',
            name: 'bbb'
          },
          type: '帖子',
          reason: '小广告',
          content: '...',
          date: '2017-10-30 21:59:55'
        }],
        operations: [{
          label: '不处理',
          value: '0'
        }, {
          label: '警告',
          value: '1'
        }, {
          label: '禁言一天',
          value: '2'
        }, {
          label: '禁言一周',
          value: '3'
        }, {
          label: '禁言一月',
          value: '4'
        }, {
          label: '封号',
          value: '5'
        }],
        operation: ''
      }
    },
    methods: {
      handleTabClick () {

      },
      showFeedbackDetail () {
      }
    }
  }
</script>

<style scoped lang="sass">
  .avatar-wrapper
    padding: 10px 0
    i
      display: inline-block
      width: 40px
      height: 40px
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

  .operation-wrapper
    display: flex
    justify-content: space-around
    a
      display: block
      line-height: 36px
</style>
