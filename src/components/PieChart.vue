<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts' // echarts theme
import resize from '@/utils/resize'
import { blockDataCountByType } from '@/api/bi'
require('echarts/theme/macarons')

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data () {
    return {
      chart: null,
      legendData: [],
      seriesData: []
    }
  },
  mounted () {
    this.loadCountData()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {

    loadCountData () {
      // let custId = '67d4ad71950c47136db8275fe64fb921'
      var custId = '6'
      blockDataCountByType(custId).then(res => {
        if (res.success) {
          let arr = res.t
          for (var i = 0; i < arr.length; i++) {
            this.legendData.push(arr[i].tn)
            this.seriesData.push({ value: arr[i].count, name: arr[i].tn })
          }

          this.initChart()
        }
      })
    },

    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.legendData
        },
        series: [
          {
            name: '上链数据统计',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: this.seriesData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
