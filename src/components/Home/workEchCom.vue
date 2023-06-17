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
    xAxis: {
      type: 'category',
      data: ['智能系统', '消防系统', '清洁绿化','空调维修','电梯问题','其它问题'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [70, 20, 5,50,52,12,15],
        type: 'bar',
        barWidth: '20%',
        itemStyle: {
          borderRadius:5,
          color: '#ff9d00',
        },
      },
    ],
  };
  myChart.setOption(option);
};
</script>

<style>
div {
  z-index: 100;
}
</style>
