<template>
  <div class="user-behavior-wrapper">
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
              <div id="china-map" ref="chinaMap"></div>
              <div class="province-data">
                <h2>{{ selectProvince.name }}</h2>
                <ul class="province-info">
                  <li>
                    <i class="province-placeholder" :style="{backgroundImage: `url(${Images.All})`}"></i>
                    <div class="province-statistic">
                      <h3>用户总数</h3>
                      <p>{{ selectProvince.totalUser.num }}</p>
                      <p>
                        <span>{{ selectProvince.totalUser.percentage }}</span>
                        同比上周
                      </p>
                    </div>
                  </li>
                  <li>
                    <i class="province-placeholder" :style="{backgroundImage: `url(${Images.NewUser})`}"></i>
                    <div class="province-statistic">
                      <h3>当天新增用户</h3>
                      <p>{{ selectProvince.addUser.num }}</p>
                      <p>
                        <span>{{ selectProvince.addUser.percentage }}</span>
                        同比上周
                      </p>
                    </div>
                  </li>
                  <li>
                    <i class="province-placeholder" :style="{backgroundImage: `url(${Images.Post})`}"></i>
                    <div class="province-statistic">
                      <h3>当天新增帖子</h3>
                      <p>{{ selectProvince.newArticles.num }}</p>
                      <p>
                        <span>{{ selectProvince.newArticles.percentage }}</span>
                        同比上周
                      </p>
                    </div>
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
                <div class="select-type">
                  <h2 class="type-name">{{ currentTag.name }}</h2>
                  <a href="javascript:void(0);" @click="showTagsDialog">点击更换标签</a>
                </div>
                <p>{{ tagStatistic.totalArticles }}次</p>
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
      <el-dialog
        title="标签列表"
        :visible.sync="tagsDialogVisible"
        size="small"
        :close-on-click-modal="false"
      >
        <div class="tags-wrapper">
          <ul>
            <li v-for="type in types">
              <h4 class="tag-type-name">{{ type.name }}</h4>
              <div class="tags">
              <span
                class="tag"
                :class="{selected: selectedTag.id === tag.id}"
                v-for="tag in type.tags"
                @click="selectTag(tag)"
              >{{ tag.name }}</span>
              </div>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showTagStatistic">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import TabPanel from '@/components/Common/TabPanel'
  import Card from '@/components/Common/Card'
  import DateControl from '@/components/Common/DateControl'
  import {drawLine, drawPie, drawChinaMap, drawArc} from '@/assets/js/charts'
  import * as userBehaviorApi from '@/api/userBehavior'
  import moment from 'moment'
  import Images from '@/assets/js/images'
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

      let PROVINCE_MAP = {
        '北京': {
          id: 0,
          fullName: '北京市'
        },
        '广东': {
          id: 1,
          fullname: '广东省'
        },
        '山东': {
          id: 2,
          fullname: '山东省'
        },
        '江苏': {
          id: 3,
          fullname: '江苏省'
        },
        '河南': {
          id: 4,
          fullname: '河南省'
        },
        '上海': {
          id: 5,
          fullname: '上海市'
        },
        '河北': {
          id: 6,
          fullname: '河北省'
        },
        '浙江': {
          id: 7,
          fullname: '浙江省'
        },
        '香港': {
          id: 8,
          fullname: '香港特别行政区'
        },
        '陕西': {
          id: 9,
          fullname: '陕西省'
        },
        '湖南': {
          id: 10,
          fullname: '湖南省'
        },
        '重庆': {
          id: 11,
          fullname: '重庆市'
        },
        '福建': {
          id: 12,
          fullname: '福建省'
        },
        '天津': {
          id: 13,
          fullname: '天津市'
        },
        '云南': {
          id: 14,
          fullname: '云南省'
        },
        '四川': {
          id: 15,
          fullname: '四川省'
        },
        '广西': {
          id: 16,
          fullname: '广西省'
        },
        '安徽': {
          id: 17,
          fullname: '安徽省'
        },
        '海南': {
          id: 18,
          fullname: '海南省'
        },
        '江西': {
          id: 19,
          fullname: '江西省'
        },
        '湖北': {
          id: 20,
          fullname: '湖北省'
        },
        '山西': {
          id: 21,
          fullname: '山西省'
        },
        '辽宁': {
          id: 22,
          fullname: '辽宁省'
        },
        '台湾': {
          id: 23,
          fullname: '台湾省'
        },
        '黑龙江': {
          id: 24,
          fullname: '黑龙江省'
        },
        '内蒙古': {
          id: 25,
          fullname: '内蒙古自治区'
        },
        '澳门': {
          id: 26,
          fullname: '澳门特别行政区'
        },
        '贵州': {
          id: 27,
          fullname: '贵州省'
        },
        '甘肃': {
          id: 28,
          fullname: '甘肃省'
        },
        '青海': {
          id: 29,
          fullname: '青海省'
        },
        '新疆': {
          id: 30,
          fullname: '新疆维吾尔自治区'
        },
        '西藏': {
          id: 31,
          fullname: '西藏自治区'
        },
        '吉林': {
          id: 32,
          fullname: '吉林省'
        },
        '宁夏': {
          id: 33,
          fullname: '宁夏回族自治区'
        }
      }
      this.CLICK_NAMES = ['主页面搜索框', '主页面“分享帖”按钮', '主页面“求助帖”按钮', '发现页面搜索框', '搜索用户结果页面“附近”按钮', '发帖按钮（分享、求助）']
      // 新增用户数
      this._getAMonthNewUserNum()
      this._getAWeekTotalUser()

      this._getDayWeekMonth('/admin/main/getActiveUserNum', this.activeUsers, this.$refs.activeUserChart, '单日活跃用户数')
      this._getDayWeekMonth('/admin/main/getRemainUserNum', this.remainUsers, this.$refs.remainUserChart, '单日留存用户数')

      this._initPieChart()
      window.addEventListener('resize', () => {
        this._initPieChart()
        this._resizeSmallLineChart()
      })
      //
      drawChinaMap(document.getElementById('china-map'))
      this._getProvinceData(PROVINCE_MAP['陕西'])
      let chinaMap = this.$refs.chinaMap
      let tooltip = chinaMap.childNodes[1]
      chinaMap.childNodes[0].childNodes[0].addEventListener('click', () => {
        if (tooltip.style.display === 'none') return
        this._getProvinceData(PROVINCE_MAP[tooltip.innerHTML])
      })

      this.getTagStatistic({
        id: 1,
        name: 'Java'
      })
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
        selectProvince: {
          name: '',
          newArticles: {},
          addUser: {},
          totalUser: {}
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
        clickData: [],
        tagsDialogVisible: false,
        types: [],
        selectedTag: {},
        currentTag: {},
        tagStatistic: {},
        Images
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
        this[t.chart] = drawLine(e, {
          data: t[p].date
        }, {
          name,
          data: t[p].num
        })
      },
      _resizeSmallLineChart () {
        var self = this
        var tabsWidth = this.$refs.tabsWrapper.clientWidth
        var lineWidth = (tabsWidth - 25 - 54) / 2 - 60
        var lineHeight = lineWidth * 3 / 4
        let chartNames = ['activeUser', 'remainUser', 'interactiveUser']
        ;[].forEach.call(document.getElementsByClassName('small-chart'), (e, i) => {
          e.style.width = `${lineWidth}px`
          e.style.height = `${lineHeight}px`
          self[`${chartNames[i]}Chart`].resize()
        })
      },
      _initPieChart () {
        var self = this
        var tabsWidth = this.$refs.tabsWrapper.clientWidth
        const TABS_PADDING = 50 + 4
        let pieWidth = (tabsWidth - TABS_PADDING) / 3
        let pieDataUrl = [{
          url: '/admin/analysis/getEducation',
          dataProp: 'education'
        }, {
          url: '/admin/analysis/getGender',
          dataProp: 'gender'
        }, {
          url: '/admin/analysis/getHobby',
          dataProp: 'hobby'
        }]
        ;[].forEach.call(document.getElementsByClassName('pie'), (e, i) => {
          e.style.width = e.style.height = `${pieWidth}px`
          var cache = self[pieDataUrl[i].dataProp]
          if (cache) {
            self[`${pieDataUrl[i].dataProp}Chart`].resize()
          } else {
            self._getPieData(pieDataUrl[i].url, pieDataUrl[i].dataProp, e)
          }
        })
      },
      _getPieData (url, prop, ele) {
        userBehaviorApi.getData(url).then(data => {
          console.log(data)
          if (data.code === 0) {
            this[prop] = data.data.result.map(v => ({
              name: v.label,
              val: v.num
            }))
            this[`${prop}Chart`] = drawPie(ele, this[prop])
          }
        }).catch(error => {
          console.log(error)
        })
      },
      _getProvinceData (p) {
        userBehaviorApi.getProvinceData(p.id).then(data => {
          console.log(data)
          if (data.code === 0) {
            let result = data.data.result
            Object.keys(result).forEach(k => {
              this.selectProvince[k] = result[k]
            })
            this.selectProvince.name = p.fullname
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
      },
      showTagsDialog () {
        if (this.types.length === 0) this._getAllTags()
        this.selectedTag = this.currentTag
        this.tagsDialogVisible = true
      },
      _getAllTags () {
        userBehaviorApi.getData('/admin/analysis/getLabelList').then(data => {
          console.log(data)
          if (data.code === 0) {
            let types = {}
            this.types[0] = {
              name: '热门标签',
              tags: []
            }
            data.data.labels.forEach(tag => {
              if (tag.type === '热门') {
                this.types[0].tags.push(tag)
              } else {
                if (!types[tag.type]) types[tag.type] = []
                types[tag.type].push(tag)
              }
            })
            console.log(this.types)
            console.log(types)
            Object.keys(types).forEach(key => {
              this.types.push({
                name: key,
                tags: types[key]
              })
            })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      selectTag (tag) {
        this.selectedTag = tag
      },
      getTagStatistic (tag) {
        userBehaviorApi.getActiveLabel(tag.id).then(data => {
          console.log(data)
          if (data.code === 0) {
            data = data.data
            this.currentTag = tag
            this.tagStatistic = data
            drawArc(this.$refs.tagDayCountArc, '日活跃比', parseFloat(data.day))
            drawArc(this.$refs.tagWeekCountArc, '周活跃比', parseFloat(data.week))
            drawArc(this.$refs.tagMonthCountArc, '月活跃比', parseFloat(data.month))
          }
        }).catch(error => {
          console.log(error)
        })
      },
      showTagStatistic () {
        this.getTagStatistic(this.selectedTag)
        this.tagsDialogVisible = false
      }
    }
  }
</script>

<style scoped lang="sass">
  @import '../../assets/sass/mixin'
  @import '../../assets/sass/variables'
  .user-behavior-wrapper
    min-width: 935px
    padding-right: 25px

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
    @include boxShadow
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
    width: 400px
    height: 300px

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

  .province-info
    padding-left: 70px
    li
      display: flex
      margin-top: 40px
      align-items: center
      .province-placeholder
        display: block
        width: 50px
        height: 50px
        -webkit-background-size: contain
        background-size: contain
        background-position: 50% 50%
        background-repeat: no-repeat
      .province-statistic
        margin-left: 20px
      h3
        font-size: 14px
        line-height: 16px
      p:first-of-type
        font-size: 24px
        font-weight: bold
        line-height: 40px
        font-family: Impact
        color: $color-purple
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
      max-width: 180px
      white-space: nowrap
      overflow: hidden
      -ms-text-overflow: ellipsis
      text-overflow: ellipsis
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

  .select-type
    display: flex
    align-items: center
    a
      color: #2CA2FC
      margin-left: 20px
      line-height: 30px

  .tags-wrapper
    height: 300px
    overflow: auto
    .tag-type-name
      line-height: 40px
      border-bottom: 2px solid #d1dbe5
      margin-right: 15px
    .tags
      display: flex
      align-items: center
      flex-wrap: wrap
      padding: 10px
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
        cursor: pointer
        &.selected, &:hover
          background-color: $color-purple
          color: #fff
</style>
