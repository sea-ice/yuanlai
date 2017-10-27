<template>
  <div class="date-select-wrapper">
    <el-select
      size="mini"
      v-model="range"
      :placeholder="title"
    >
      <el-option
        v-for="item in ranges"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        @change='handleRangeChange'>
      </el-option>
    </el-select>
    <el-date-picker
      v-show="range === 'week'"
      size="mini"
      v-model="week"
      align="right"
      type="week"
      format="第 WW 周"
      placeholder="选择周">
    </el-date-picker>
    <el-date-picker
      v-show="range === 'month'"
      size="mini"
      v-model="month"
      align="right"
      type="month"
      placeholder="选择月">
    </el-date-picker>
    <el-date-picker
      v-show="range === 'year'"
      size="mini"
      v-model="year"
      align="right"
      type="year"
      placeholder="选择年">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    name: 'DateControl',
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        ranges: [{
          label: '最近一周',
          value: 'week'
        }, {
          label: '月',
          value: 'month'
        }, {
          label: '年',
          value: 'year'
        }],
        range: '',
        year: '',
        month: '',
        week: ''
      }
    },
    methods: {
      handleRangeChange () {

      }
    }
  }
</script>

<style scoped lang="sass">
</style>
