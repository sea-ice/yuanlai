<template>
  <div class="tabs-wrapper" ref="tabsWrapper">
    <tab-panel
      :tabs="userTabs"
      :activeName="activeName"
      @tab-click="handleTabClick"
    >
      <div class="tab" slot="lifecycle">
        <card title="新增用户">
          <!--<date-control title="时限" slot="widget"></date-control>-->
          <el-select
            v-model="addUserVal"
            placeholder="请选择"
            slot="widget"
            size="mini"
          >
            <el-option
              v-for="item in addUserOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="large-chart" id="add-user-chart"></div>
        </card>
        <card title="用户总数">
          <div class="large-chart" id="total-user-chart"></div>
        </card>
        <div class="card-columns">
          <section>
            <card title="活跃用户">
              <date-control
                topic="活跃用户"
                :statistics="activeUsers"
                slot="widget"
                @date-dimension-change="handleDimensionChange"
              ></date-control>
              <div class="small-chart" ref="activeUserChart"></div>
            </card>
          </section>
          <section>
            <card title="留存用户">
              <date-control
                topic="留存用户"
                :statistics="remainUsers"
                slot="widget"
                @date-dimension-change="handleDimensionChange"
              ></date-control>
              <div class="small-chart" ref="remainUserChart"></div>
            </card>
          </section>
        </div>
      </div>
      <div class="tab" slot="userProperty">
        <div class="columns-wrapper">
          <div>
            <div class="pie-wrapper">
              <h2>学历</h2>
              <div class="pie" ref="education"></div>
            </div>
          </div>
          <div>
            <div class="pie-wrapper">
              <h2>性别</h2>
              <div class="pie" ref="gender"></div>
            </div>
          </div>
          <div>
            <div class="pie-wrapper">
              <h2>方向</h2>
              <div class="pie" ref="hobby"></div>
            </div>
          </div>
        </div>
        <card title="位置分布">
          <div class="map-wrapper">
            <div id="china-map"></div>
            <div class="province-data">
              <h2>陕西省</h2>
              <ul class="provice-info">
                <li>
                  <h3>用户总数</h3>
                  <p>54,233</p>
                  <p>
                    <span>10%</span>
                    同比上周
                  </p>
                </li>
                <li>
                  <h3>当天新增用户</h3>
                  <p>323</p>
                  <p>
                    <span>10%</span>
                    同比上周
                  </p>
                </li>
                <li>
                  <h3>当天新增帖子</h3>
                  <p>3232</p>
                  <p>
                    <span>10%</span>
                    同比上周
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </card>
      </div>
      <div class="tab" slot="usage">
        <card title="标签活跃比">
          <div class="content-wrapper">
            <div class="total-count">
              <h2 class="type-name">Python</h2>
              <p>10203次</p>
            </div>
            <div class="arc" ref="tagDayCountArc"></div>
            <div class="arc" ref="tagWeekCountArc"></div>
            <div class="arc" ref="tagMonthCountArc"></div>
          </div>
        </card>
        <div class="card-columns">
          <section>
            <card title="求助帖活跃比">
              <div class="content-wrapper">
                <div class="total-count">
                  <h2 class="type-name">求助帖</h2>
                  <p>{{ helpArticle.totalArticles }}次</p>
                </div>
                <ul class="active-ratio">
                  <li><p>日活跃比：<span>{{ helpArticle.day }}%</span></p></li>
                  <li><p>周活跃比：<span>{{ helpArticle.week }}%</span></p></li>
                  <li><p>月活跃比：<span>{{ helpArticle.month }}%</span></p></li>
                </ul>
              </div>
            </card>
          </section>
          <section>
            <card title="分享帖活跃比">
              <div class="content-wrapper">
                <div class="total-count">
                  <h2 class="type-name">分享帖</h2>
                  <p>{{ shareArticle.totalArticles }}次</p>
                </div>
                <ul class="active-ratio">
                  <li><p>日活跃比：<span>{{ shareArticle.day }}%</span></p></li>
                  <li><p>周活跃比：<span>{{ shareArticle.week }}%</span></p></li>
                  <li><p>月活跃比：<span>{{ shareArticle.month }}%</span></p></li>
                </ul>
              </div>
            </card>
          </section>
        </div>
        <div class="card-columns">
          <section>
            <card title="互动数">
              <date-control
                topic="互动"
                :statistics="interactiveUsers"
                slot="widget"
                @date-dimension-change="handleDimensionChange"
              ></date-control>
              <div class="small-chart" ref="interactiveUserChart"></div>
            </card>
          </section>
          <section>
            <card title="页面点击次数">
              <el-table
                :data="clickData"
                stripe
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="#"
                  align="center"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="控件名称"
                  align="center"
                  width="200">
                </el-table-column>
                <el-table-column
                  label="比例"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div class="proportion-wrapper">
                      <p class="proportion-indicator">{{ scope.row.percentage }}</p>
                      <p class="proportion">
                        <i :style="{width: `${scope.row.percentage}`}"></i>
                      </p>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </card>
          </section>
        </div>
      </div>
    </tab-panel>
  </div>
</template>

<script>
  import TabPanel from '@/components/Common/TabPanel'
  import Card from '@/components/Common/Card'
  import DateControl from '@/components/Common/DateControl'
  import {drawLine, drawPie, drawChinaMap, drawArc} from '@/assets/js/charts'
  import * as userBehaviorApi from '@/api/userBehavior'
  import moment from 'moment'
  export default {
    name: 'UserBehavior',
    components: {
      TabPanel,
      Card,
      DateControl
    },
    mounted () {
      this.EN_CH_MAP = {
        day: '日',
        week: '周',
        month: '月'
      }
      this.CLICK_NAMES = ['主页面搜索框', '主页面“分享帖”按钮', '主页面“求助帖”按钮', '发现页面搜索框', '搜索用户结果页面“附近”按钮', '发帖按钮（分享、求助）']
      // 新增用户数
      this._getAMonthNewUserNum()
      this._getAWeekTotalUser()

      this._getDayWeekMonth('/admin/main/getActiveUserNum', this.activeUsers, this.$refs.activeUserChart, '单日活跃用户数')
      this._getDayWeekMonth('/admin/main/getRemainUserNum', this.remainUsers, this.$refs.remainUserChart, '单日留存用户数')

      const tabsWidth = this.$refs.tabsWrapper.clientWidth
      const TABS_PADDING = 50 + 4
      let pieWidth = (tabsWidth - TABS_PADDING) / 3
      ;[].forEach.call(document.getElementsByClassName('pie'), e => {
        e.style.width = e.style.height = `${pieWidth}px`
      })
      // 用户属性：学历
      this._getPieData('/admin/analysis/getEducation', this.$refs.education)
      this._getPieData('/admin/analysis/getGender', this.$refs.gender)
      this._getPieData('/admin/analysis/getHobby', this.$refs.hobby)
      //
      drawChinaMap(document.getElementById('china-map'))

//      this._getTagActiveRatio(70)
      this._getActiveArticle('/admin/analysis/getHelpArticle', this.helpArticle)
      this._getActiveArticle('/admin/analysis/getShareArticle', this.shareArticle)

      this._getInteractiveUser(this.interactiveUsers, this.$refs.interactiveUserChart, '单日互动数')
      this._getClick()
    },
    watch: {
      addUserVal (newVal, oldVal) {
        if (newVal !== oldVal) {
          this._drawMonthNewUser(+newVal)
        }
      }
    },
    data () {
      return {
        userTabs: [
          {
            label: '用户生命周期',
            name: 'lifecycle'
          },
          {
            label: '用户属性',
            name: 'userProperty'
          },
          {
            label: '使用情况',
            name: 'usage'
          }
        ],
        activeName: 'lifecycle',
        currentMonth: moment().month() + 1,
        currentWeek: moment().week(),
        monthDate: [],
        monthNewUsers: [],
        weekDate: [],
        weekTotalUsers: [],
        activeUsers: {
          chart: 'activeUserChart',
          day: {
            date: [],
            num: []
          },
          week: {
            date: [],
            num: []
          },
          month: {
            date: [],
            num: []
          }
        },
        remainUsers: {
          chart: 'remainUserChart',
          day: {
            date: [],
            num: []
          },
          week: {
            date: [],
            num: []
          },
          month: {
            date: [],
            num: []
          }
        },
        interactiveUsers: {
          chart: 'interactiveUserChart',
          day: {
            date: [],
            num: []
          },
          week: {
            date: [],
            num: []
          },
          month: {
            date: [],
            num: []
          }
        },
        addUserVal: '7',
        addUserOptions: [{
          label: '最近一周',
          value: '7'
        }, {
          label: '最近15天',
          value: '15'
        }, {
          label: '最近30天',
          value: '30'
        }],
        helpArticle: {
          totalArticles: 0,
          day: 0,
          week: 0,
          month: 0
        },
        shareArticle: {
          totalArticles: 0,
          day: 0,
          week: 0,
          month: 0
        },
        clickData: []
      }
    },
    methods: {
      handleTabClick () {

      },
      handleDimensionChange (t, p, n) {
        n = `单${this.EN_CH_MAP[p]}${n}数`
        this._drawDayWeekMonth(this.$refs[t.chart], t, p, n)
      },
      _getAMonthNewUserNum () {
        userBehaviorApi.getData('/admin/main/getNewUserNum').then(data => {
          console.log(data)
          if (data.code === 0) {
            this.monthDate = data.data.month.map(v => v.date)
            this.monthNewUsers = data.data.month.map(v => v.num)
            this._drawMonthNewUser(7)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      _getAWeekTotalUser () {
        userBehaviorApi.getData('/admin/main/getTotalUserNum').then(data => {
          console.log(data)
          if (data.code === 0) {
            this.weekDate = data.data.day.map(v => v.date)
            this.weekTotalUsers = data.data.day.map(v => v.num)
            this._drawWeekTotalUser(7)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      _drawMonthNewUser (d) {
        var xdata = this.monthDate.slice(0, d).reverse()
        var ydata = this.monthNewUsers.slice(0, d).reverse()
        drawLine(document.getElementById('add-user-chart'), {
          data: xdata
        }, {
          name: '单日新增用户数',
          data: ydata
        })
      },
      _drawWeekTotalUser (d) {
        var xdata = this.weekDate.slice(0, d).reverse()
        var ydata = this.weekTotalUsers.slice(0, d).reverse()
        drawLine(document.getElementById('total-user-chart'), {
          data: xdata
        }, {
          name: '单日用户总数',
          data: ydata
        })
      },
      _getDayWeekMonth (url, t, e, n) {
        userBehaviorApi.getData(url).then(data => {
          console.log(data)
          if (data.code === 0) {
            data = data.data
            t.day.date = data.day.map(v => v.date).reverse()
            t.day.num = data.day.map(v => v.num).reverse()
            t.week.date = data.week.map(v => `第${this.currentWeek - v.week}周`).reverse()
            t.week.num = data.week.map(v => v.num).reverse()
            t.month.date = data.month.map(v => `${this.currentMonth - v.month}月份`).reverse()
            t.month.num = data.month.map(v => v.num).reverse()
            this._drawDayWeekMonth(e, t, 'day', n)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      _drawDayWeekMonth (e, t, p, name) {
        drawLine(e, {
          data: t[p].date
        }, {
          name,
          data: t[p].num
        })
      },
      _getPieData (url, ele) {
        userBehaviorApi.getData(url).then(data => {
          console.log(data)
          if (data.code === 0) {
            var d = data.data.result.map(v => ({
              name: v.label,
              val: v.num
            }))
            drawPie(ele, d)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      _getTagActiveRatio (id) {
        userBehaviorApi.getActiveLabel(id).then(data => {
          console.log(data)
          if (data.code === 0) {
            data = data.data
            drawArc(this.$refs.tagDayCountArc, '日活跃比', data.day)
            drawArc(this.$refs.tagWeekCountArc, '周活跃比', data.week)
            drawArc(this.$refs.tagMonthCountArc, '月活跃比', data.month)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      _getActiveArticle (url, t) {
        userBehaviorApi.getData(url).then(data => {
          console.log(data)
          if (data.code === 0) {
            t = data.data
          }
        }).catch(error => {
          console.log(error)
        })
      },
      _getInteractiveUser (t, e, n) {
        userBehaviorApi.getData('/admin/analysis/getInteractive').then(data => {
          console.log(data)
          if (data.code === 0) {
            data = data.data
            t.day.date = data.day.map(v => v.date).reverse()
            t.day.num = data.day.map(v => (parseFloat(v.percentage) / 100).toFixed(2)).reverse()
            t.week.date = data.week.map(v => `第${this.currentWeek - v.week}周`).reverse()
            t.week.num = data.week.map(v => (parseFloat(v.percentage) / 100).toFixed(2)).reverse()
            t.month.date = data.month.map(v => `${this.currentMonth - v.month}月份`).reverse()
            t.month.num = data.month.map(v => (parseFloat(v.percentage) / 100).toFixed(2)).reverse()
            this._drawDayWeekMonth(e, t, 'day', n)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      _getClick () {
        userBehaviorApi.getData('/admin/analysis/getClick').then(data => {
          console.log(data)
          if (data.code === 0) {
            this.clickData = data.data.result.map(v => ({
              name: this.CLICK_NAMES[v.id - 1],
              percentage: v.percentage
            }))
            this.clickData[0].percentage = '90.0%'
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped lang="sass">
  h2
    font-weight: bold
    text-align: center
  .card-columns
    display: flex
    justify-content: space-between
    section
      width: calc(50% - 12.5px)
    section + section
      margin-left: 25px
  .columns-wrapper
    display: flex
    justify-content: space-between
    -webkit-border-radius: 5px
    -moz-border-radius: 5px
    border-radius: 5px
    border: 1px solid rgb(209, 219, 229)
    h2
      line-height: 50px
    & > div
      position: relative
      width: 33.33333333%
      &:before
        content: ''
        display: block
        padding-top: calc(100% + 50px)
      & > div
        position: absolute
        width: 100%
        top: 0px
        left: 0px
    & > div:not(:last-child):after
      content: ''
      position: absolute
      width: 1px
      height: 80%
      top: 10%
      right: 0
      background-color: rgb(209, 219, 229)
  .large-chart
    width: 800px
    height: 400px
    margin: 0 auto
  .small-chart
    width: 450px
    height: 300px
    margin: 0 auto

  .pie-wrapper
    height: 100%
    .pie
      width: 100%
      height: calc(100% - 50px)

  .map-wrapper
    display: flex
    align-items: center
    width: 850px
    margin: 0 auto
    #china-map
      width: 550px
      height: 550px
    .province-data
      width: 300px

  .provice-info
    li
      margin-top: 40px
      h3
        font-size: 14px
        line-height: 16px
      p:first-of-type
        font-size: 24px
        font-weight: bold
        line-height: 40px
      p:last-of-type
        font-size: 14px
        line-height: 16px

  .content-wrapper
    display: flex
    justify-content: space-between
  .total-count
    width: 300px
    .type-name
      line-height: 100px
      font-size: 40px
      color: #666
      font-weight: bold
      text-align: left
    p
      line-height: 100px
      font-size: 50px
      font-weight: bold
  .active-ratio
    width: 200px
    padding-top: 40px
    li
      line-height: 40px
      font-size: 24px

  .arc
    width: 200px
    height: 200px

  .proportion-wrapper
    display: flex
    align-items: center
    .proportion-indicator
      width: 50px
      line-height: 30px
      white-space: nowrap
    .proportion
      width: 200px
      height: 4px
      background-color: #999
      margin-left: 10px
      & > i
        display: block
        height: 100%
        background-color: #2CA2FC
</style>
