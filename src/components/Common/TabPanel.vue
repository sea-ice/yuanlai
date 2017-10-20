<template>
  <el-tabs v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane
      :label="tab.label"
      :name="tab.name"
      v-for="tab in tabs"
    >{{ tab.text }}</el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    name: 'TabPanel',
    props: {
      tabs: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        activeName: tabs[0] && tabs[0].name
      }
    },
    methods: {
      handleTabClick (tab) {
        this.$emit('tab-click', tab)
      }
    }
  }
</script>

<style scoped lang="sass">

</style>
