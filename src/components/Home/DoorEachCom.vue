<template>
  <div ref="chart" style="width: 520px; height: 300px"></div>
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
  let option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '20%',
      right: '10%',
      orient: 'vertical',
      align: 'left',
    },
    series: [
      {
        type: 'pie',
        radius: [50, 100],
        center: ['40%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          { value: 40, name: '人脸识别' },
          { value: 38, name: '远程开门' },
          { value: 32, name: '指纹识别' },
          { value: 30, name: 'APP扫描' },
          { value: 28, name: '门禁刷卡' },
        ],
        label: {
          normal: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
      },
    ],
  };
  myChart.setOption(option);
};
</script>

<style></style>
