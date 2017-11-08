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
          <p>用户总数</p>
        </card>
        <div class="card-columns">
          <section>
            <card title="活跃用户">
              <!--<date-control title="时限" slot="widget"></date-control>-->
              <div class="small-chart" id="active-user-chart"></div>
            </card>
          </section>
          <section>
            <card title="留存用户">
              <!--<date-control title="时限" slot="widget"></date-control>-->
              <div class="small-chart" id="remain-user-chart"></div>
            </card>
          </section>
        </div>
      </div>
      <div class="tab" slot="userProperty">
        <div class="columns-wrapper">
          <div>
            <div class="pie-wrapper">
              <h2>学历</h2>
              <div class="pie" id="education-statistics"></div>
            </div>
          </div>
          <div>
            <div class="pie-wrapper">
              <h2>性别</h2>
              <div class="pie" id="gender-statistics"></div>
            </div>
          </div>
          <div>
            <div class="pie-wrapper">
              <h2>方向</h2>
              <div class="pie" id="hobby-statistics"></div>
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
            <div class="arc" id="day-count-arc"></div>
            <div class="arc" id="week-count-arc"></div>
            <div class="arc" id="month-count-arc"></div>
          </div>
        </card>
        <div class="card-columns">
          <section>
            <card title="求助帖活跃比">
              <div class="content-wrapper">
                <div class="total-count">
                  <h2 class="type-name">求助帖</h2>
                  <p>10203次</p>
                </div>
                <ul class="active-ratio">
                  <li><p>日活跃比：<span>22%</span></p></li>
                  <li><p>周活跃比：<span>22%</span></p></li>
                  <li><p>月活跃比：<span>22%</span></p></li>
                </ul>
              </div>
            </card>
          </section>
          <section>
            <card title="分享帖活跃比">
              <div class="content-wrapper">
                <div class="total-count">
                  <h2 class="type-name">分享帖</h2>
                  <p>10203次</p>
                </div>
                <ul class="active-ratio">
                  <li><p>日活跃比：<span>22%</span></p></li>
                  <li><p>周活跃比：<span>22%</span></p></li>
                  <li><p>月活跃比：<span>22%</span></p></li>
                </ul>
              </div>
            </card>
          </section>
        </div>
        <div class="card-columns">
          <section>
            <card title="互动数">
              <div class="small-chart" id="interact-chart"></div>
            </card>
          </section>
          <section>
            <card title="页面点击次数">
              <p>分享帖活跃比</p>
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
  export default {
    name: 'UserBehavior',
    components: {
      TabPanel,
      Card,
      DateControl
    },
    mounted () {
      // 新增用户数
      this._getAMonthNewUserNum()

      drawLine(document.getElementById('active-user-chart'), {
        data: ['2017-10-15', '2017-10-16', '2017-10-17', '2017-10-18', '2017-10-19', '2017-10-20', '2017-10-21']
      }, {
        name: '单日新增用户数',
        data: [2123, 2029, 7812, 3829, 9923, 9231, 9912]
      })
      drawLine(document.getElementById('remain-user-chart'), {
        data: ['2017-10-15', '2017-10-16', '2017-10-17', '2017-10-18', '2017-10-19', '2017-10-20', '2017-10-21']
      }, {
        name: '单日新增用户数',
        data: [2123, 2029, 7812, 3829, 9923, 9231, 9912]
      })
      const tabsWidth = this.$refs.tabsWrapper.clientWidth
      const TABS_PADDING = 50 + 4
      let pieWidth = (tabsWidth - TABS_PADDING) / 3
      ;[].forEach.call(document.getElementsByClassName('pie'), e => {
        e.style.width = e.style.height = `${pieWidth}px`
      })
      // 用户属性：学历
      drawPie(document.getElementById('education-statistics'), [{
        name: '博士',
        val: 120
      }, {
        name: '高中以下',
        val: 1340
      }, {
        name: '高中',
        val: 2523
      }, {
        name: '硕士',
        val: 4372
      }, {
        name: '本科',
        val: 5231
      }])

      drawPie(document.getElementById('gender-statistics'), [{
        name: '男',
        val: 1200
      }, {
        name: '女',
        val: 1340
      }])

      drawPie(document.getElementById('hobby-statistics'), [{
        name: 'HTML/CSS',
        val: 1200
      }, {
        name: 'Java',
        val: 3404
      }, {
        name: 'C++',
        val: 2523
      }, {
        name: 'JavaScript',
        val: 4372
      }, {
        name: 'Python',
        val: 5231
      }])

      //
      drawChinaMap(document.getElementById('china-map'))

      drawArc(document.getElementById('day-count-arc'), '日活跃比', 40)
      drawArc(document.getElementById('week-count-arc'), '周活跃比', 60)
      drawArc(document.getElementById('month-count-arc'), '月活跃比', 80)
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
        monthDate: [],
        monthNewUsers: [],
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
        }]
      }
    },
    methods: {
      handleTabClick () {

      },
      _getAMonthNewUserNum () {
        userBehaviorApi.getAMonthNewUserNum().then(data => {
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
      _drawMonthNewUser (d) {
        var xdata = this.monthDate.slice(0, d).reverse()
        var ydata = this.monthNewUsers.slice(0, d).reverse()
        drawLine(document.getElementById('add-user-chart'), {
          data: xdata
        }, {
          name: '单日新增用户数',
          data: ydata
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
</style>
