<template>
  <div class="tabs-wrapper" ref="reportContainer">
    <tab-panel
      :tabs="reportTabs"
      :activeName="activeName"
      @tab-click="handleTabClick"
    >
      <div class="tab" slot="unhandled">
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
      this.$refs.reportContainer.parentNode.style.height = '100%'
    },
    data () {
      return {
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
        activeName: 'unhandled'
      }
    },
    methods: {
      handleTabClick () {

      }
    }
  }
</script>

<style scoped lang="sass">

</style>
