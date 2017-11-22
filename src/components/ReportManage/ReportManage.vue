<template>
  <div class="report-wrapper">
    <div class="tabs-wrapper" ref="reportContainer">
      <tab-panel
        :tabs="reportTabs"
        :activeName="activeName"
        @tab-click="handleTabClick"
      >
        <div class="tab" slot="unhandled">
          <el-table
            :data="unhandledList"
            border
            :height="tableHeight"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="#"
              align="center"
              width="50"
              :resizable="false"
            >
            </el-table-column>
            <el-table-column
              label="被举报用户"
              align="center"
              width="120"
              :resizable="false"
            >
              <template slot-scope="scope">
                <el-popover
                  trigger="hover"
                  placement="top"
                  :open-delay="500"
                >
                  <user-info-tooltip :user="scope.row.toUser"></user-info-tooltip>
                  <div slot="reference" class="avatar-wrapper">
                    <i :style="{backgroundImage: `url(${scope.row.toUser.avator || (scope.row.toUser.gender === '男' ? Images.MaleNull : Images.FemaleNull)})`}"></i>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="举报用户"
              align="center"
              width="100"
              :resizable="false"
            >
              <template slot-scope="scope">
                <el-popover
                  trigger="hover"
                  placement="top"
                  :open-delay="500"
                >
                  <user-info-tooltip :user="scope.row.fromUser"></user-info-tooltip>
                  <div slot="reference" class="avatar-wrapper">
                    <i :style="{backgroundImage: `url(${scope.row.fromUser.avator || (scope.row.fromUser.gender === '男' ? Images.MaleNull : Images.FemaleNull)})`}"></i>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="type"
              label="举报类型"
              align="center"
              width="100"
              :resizable="false"
            >
            </el-table-column>
            <el-table-column
              prop="reason"
              label="举报原因"
              align="center"
              width="100"
              :resizable="false"
            >
            </el-table-column>
            <el-table-column
              label="反馈内容"
              align="center"
              :resizable="false"
            >
              <template slot-scope="scope">
                <div class="content-wrapper" v-if="scope.row.content">
                  <p class="feedback-content">{{ scope.row.content }}</p>
                  <a href="javascript:void(0)" @click.stop="showReportDetail(scope.row)">查看详情</a>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              width="180"
              align="center"
              label="反馈时间"
              :resizable="false"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="操作处理"
              width="200"
              :resizable="false"
            >
              <template slot-scope="scope">
                <div class="operation-wrapper">
                  <el-select v-model="scope.row.operation" class="report-select">
                    <el-option
                      v-for="item in operations"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  <a href="javascript:void(0)" @click="showHandleConfirm(scope.row)">确定</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="tab" slot="handled">
          <el-table
            :data="handledList"
            border
            :height="tableHeight"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="#"
              align="center"
              width="50"
              :resizable="false"
            >
            </el-table-column>
            <el-table-column
              label="被举报用户"
              align="center"
              width="120"
              :resizable="false"
            >
              <template slot-scope="scope">
                <el-popover
                  trigger="hover"
                  placement="top"
                  :open-delay="500"
                >
                  <user-info-tooltip :user="scope.row.toUser"></user-info-tooltip>
                  <div slot="reference" class="avatar-wrapper">
                    <i :style="{backgroundImage: `url(${scope.row.toUser.avator || (scope.row.toUser.gender === '男' ? Images.MaleNull : Images.FemaleNull)})`}"></i>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="举报用户"
              align="center"
              width="100"
              :resizable="false"
            >
              <template slot-scope="scope">
                <el-popover
                  trigger="hover"
                  placement="top"
                  :open-delay="500"
                >
                  <user-info-tooltip :user="scope.row.fromUser"></user-info-tooltip>
                  <div slot="reference" class="avatar-wrapper">
                    <i :style="{backgroundImage: `url(${scope.row.fromUser.avator || (scope.row.fromUser.gender === '男' ? Images.MaleNull : Images.FemaleNull)})`}"></i>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="type"
              label="举报类型"
              align="center"
              width="100"
              :resizable="false"
            >
            </el-table-column>
            <el-table-column
              prop="reason"
              label="举报原因"
              align="center"
              width="100"
              :resizable="false"
            >
            </el-table-column>
            <el-table-column
              label="反馈内容"
              align="center"
              :resizable="false"
            >
              <template slot-scope="scope">
                <div class="content-wrapper" v-if="scope.row.content">
                  <p class="feedback-content">{{ scope.row.content }}</p>
                  <a href="javascript:void(0)" @click.stop="showFeedbackDetail(scope.row)">查看详情</a>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              width="180"
              align="center"
              label="反馈时间"
              :resizable="false"
            >
            </el-table-column>
            <el-table-column
              prop="state"
              align="center"
              label="处理状态"
              width="100"
              :resizable="false"
            >
            </el-table-column>
          </el-table>
        </div>
      </tab-panel>
      <el-dialog
        title="提示"
        :visible.sync="showHandleDialog"
        size="tiny">
        <span>您确定要对被举报的用户采用该处理方式吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showHandleDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleReport">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import TabPanel from '@/components/Common/TabPanel'
  import UserInfoTooltip from '@/components/Common/UserInfoTooltip'
  import * as reportApi from '@/api/reportMessage'
  import moment from 'moment'
  import Images from '@/assets/js/images'
  export default {
    name: 'ReportManage',
    components: {
      TabPanel,
      UserInfoTooltip
    },
    mounted () {
      const TITLE_HEIGHT = 67 + 25
      let container = this.$refs.reportContainer
      container.parentNode.style.height = container.parentNode.parentNode.style.height = '100%'
      this.tableHeight = container.clientHeight - TITLE_HEIGHT
      window.addEventListener('resize', () => {
        this.tableHeight = container.clientHeight - TITLE_HEIGHT
      })

      this._getUnhandledList()
      this._getHandledList()
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
        unhandledList: [],
        handledList: [],
        operations: [{
          label: '不处理',
          value: '1'
        }, {
          label: '警告',
          value: '2'
        }, {
          label: '禁言一天',
          value: '3'
        }, {
          label: '禁言一周',
          value: '4'
        }, {
          label: '禁言一月',
          value: '5'
        }, {
          label: '封号',
          value: '6'
        }],
        chosenReport: null,
        showHandleDialog: false,
        Images
      }
    },
    methods: {
      handleTabClick () {

      },
      showReportDetail () {},
      _getUnhandledList () {
        reportApi.getData('/admin/accusation/getUnhandledInfoList').then(data => {
          console.log(data)
          if (data.code === 0) {
            this.unhandledList = data.data.list.map(v => Object.assign({}, v, {
              time: moment(v.time, 'YYYY-MM-DD HH:mm').fromNow(),
              operation: this.operations[0].value
            }))
          }
        }).catch(error => {
          console.log(error)
        })
      },
      showHandleConfirm (item) {
        this.chosenReport = item
        this.showHandleDialog = true
      },
      handleReport () {
        this.showHandleDialog = false
        console.log(this.chosenReport.id)
        console.log(this.chosenReport.operation)
        reportApi.handleReport(this.chosenReport.id, this.chosenReport.operation).then(data => {
          if (data.code === 0) {
            this.$message({
              message: '举报信息处理成功!',
              type: 'success'
            })
            this._getUnhandledList()
            this._getHandledList()
          }
        }).catch(error => {
          console.log(error)
        })
      },
      _getHandledList () {
        reportApi.getData('/admin/accusation/getHandledInfoList').then(data => {
          console.log(data)
          if (data.code === 0) {
            this.handledList = data.data.list.map(v => Object.assign({}, v, {
              time: moment(v.time, 'YYYY-MM-DD HH:mm').fromNow()
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
  .report-wrapper
    padding-right: 25px

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
