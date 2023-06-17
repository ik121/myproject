<template>
  <div ref="chart" style="width: 340px; height: 260px"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
const chart = ref();
onMounted(() => {
  init();
});
const init = () => {
  const myChart = echarts.init(chart.value);
  const colors = ['#FB3B90', '#0CD1E5'];
  let option = {
    color: colors,
    grid: {
      top: 70,
      bottom: 50,
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[1],
          },
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return (
                'Precipitation  ' +
                params.value +
                (params.seriesData.length
                  ? '：' + params.seriesData[0].data
                  : '')
              );
            },
          },
        },
        // prettier-ignore
      },
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[0],
          },
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return (
                'Precipitation  ' +
                params.value +
                (params.seriesData.length
                  ? '：' + params.seriesData[0].data
                  : '')
              );
            },
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        type: 'line',
        xAxisIndex: 1,
        smooth: true,
        symbol: 'none', //去掉圆点
        emphasis: {
          focus: 'series',
        },
        data: [
          10, 20, 25, 26, 20.3, 29.2, 20.6, 26.6, 25.4, 28.4, 20.3, 21.7, 49,
        ],
      },
      {
        type: 'line',
        smooth: true,
        symbol: 'none', //去掉圆点
        emphasis: {
          focus: 'series',
        },
        data: [25, 30, 29, 34, 28, 34, 27, 31, 26, 31, 25],
      },
    ],
  };
  myChart.setOption(option);
};
</script>

<style></style>
