import echarts from 'echarts'
import '@/assets/js/china'

export function drawLine (ele, x, y) {
  let myChart = echarts.init(ele)
  myChart.setOption({
    grid: {
      show: true
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: x.data
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: y.name,
      type: 'line',
      smooth: true,
      data: y.data,
      lineStyle: {
        normal: {
          color: 'rgb(98,85,215)'
        }
      },
      itemStyle: {
        normal: {
          color: 'rgb(98,85,215)',
          borderWidth: 2
        }
      }
    }]
  })
  return myChart
}

export function drawPie (ele, d) {
  let myChart = echarts.init(ele)
  let max = Math.max.apply(null, d.map(v => v.val))
  myChart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}<br/>({d}%)'
    },
    series: [{
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '50%'],
      data: d.map(v => ({
        value: v.val,
        name: v.name,
        selected: v.val === max
      }))
    }]
  })
  return myChart
}

export function drawChinaMap (ele) {
  let myChart = echarts.init(ele)
  myChart.setOption({
    tooltip: {
      show: true
    },
    series: [{
      type: 'map',
      mapType: 'china',
      selectedMode: 'single',
      left: 0,
      right: 0,
      tooltip: {
        formatter: '{b}'
      }
    }]
  })
  return myChart
}

export function drawArc (ele, name, value) {
  let myChart = echarts.init(ele)
  myChart.setOption({
    series: [{
      name: '',
      title: {
        offsetCenter: [0, '90%']
      },
      type: 'gauge',
      center: ['50%', '50%'], // 默认全局居中
      radius: '80%',
      axisLine: {
        show: false,
        lineStyle: { // 属性lineStyle控制线条样式
          color: [
            [0.8, '#0193cf'],
            [1, 'rgba(1, 147, 207, 0.3)']
          ],
          width: 10
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      pointer: {
        show: false,
        length: '0',
        width: '0'
      },
      detail: {
        formatter: '{value}%',
        offsetCenter: [0, '0%'],
        textStyle: {
          fontSize: 24
        }
      },
      data: [{
        name,
        value,
        label: {
          textStyle: {
            fontSize: 18
          }
        }
      }]
    }]
  })
  return myChart
}
