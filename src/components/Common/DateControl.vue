<template>
  <div class="date-select-wrapper">
    <el-select
      size="mini"
      v-model="d"
      @change='handleDimensionChange'
    >
      <el-option
        v-for="item in dimensions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: 'DateControl',
    props: {
      topic: {
        type: String,
        default: ''
      },
      statistics: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        dimensions: [{
          label: '按日统计',
          value: 'day'
        }, {
          label: '按周统计',
          value: 'week'
        }, {
          label: '按月统计',
          value: 'month'
        }],
        d: 'day'
      }
    },
    methods: {
      handleDimensionChange () {
        this.$emit('date-dimension-change', this.statistics, this.d, this.topic)
      }
    }
  }
</script>

<style scoped lang="sass">
</style>
