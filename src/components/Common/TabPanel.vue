<template>
  <el-tabs v-model="active" @tab-click="handleTabClick">
    <el-tab-pane
      :label="tab.label"
      :name="tab.name"
      v-for="tab in tabs"
    >
      <slot :name="tab.name"></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    name: 'TabPanel',
    props: {
      activeName: {
        type: String,
        default: ''
      },
      tabs: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        active: this.activeName
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
