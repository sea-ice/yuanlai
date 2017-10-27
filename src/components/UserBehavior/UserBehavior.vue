<template>
  <div class="tabs-wrapper">
    <tab-panel
      :tabs="userTabs"
      :activeName="activeName"
      @tab-click="handleTabClick"
    >
      <div class="tab" slot="lifecycle">
        <card title="新增用户">
          <date-control title="时限" slot="widget"></date-control>
          <p>新增用户</p>
        </card>
        <card title="用户总数">
          <p>用户总数</p>
        </card>
        <div class="card-columns">
          <section>
            <card title="活跃用户">
              <p>活跃用户</p>
            </card>
          </section>
          <section>
            <card title="留存用户">
              <p>留存用户</p>
            </card>
          </section>
        </div>
      </div>
      <div class="tab" slot="userProperty">
        <div class="columns-wrapper">
          <div>
            <div class="pie-wrapper">
              <h2>学历</h2>
              <div class="pie"></div>
            </div>
          </div>
          <div>
            <div class="pie-wrapper">
              <h2>性别</h2>
              <div class="pie"></div>
            </div>
          </div>
          <div>
            <div class="pie-wrapper">
              <h2>方向</h2>
              <div class="pie"></div>
            </div>
          </div>
        </div>
        <card title="位置分布">
          <p>map</p>
        </card>
      </div>
      <div class="tab" slot="usage">
        <card title="标签活跃比">
          <p>hello</p>
        </card>
        <div class="card-columns">
          <section>
            <card title="求助帖活跃比">
              <p>求助帖活跃比</p>
            </card>
          </section>
          <section>
            <card title="分享帖活跃比">
              <p>分享帖活跃比</p>
            </card>
          </section>
        </div>
        <div class="card-columns">
          <section>
            <card title="互动数">
              <p>求助帖活跃比</p>
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
  export default {
    name: 'UserBehavior',
    components: {
      TabPanel,
      Card,
      DateControl
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
        activeName: 'lifecycle'
      }
    },
    methods: {
      handleTabClick () {

      }
    }
  }
</script>

<style scoped lang="sass">
  .card-columns
    display: flex
    justify-content: space-between
    section
      flex-grow: 1
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
      text-align: center
    & > div
      position: relative
      width: 33.33333333%
      &:before
        content: ''
        display: block
        padding-top: 100%
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
</style>
