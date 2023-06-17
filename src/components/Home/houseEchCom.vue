<template>
  <div ref="chart" style="width: 300px; height: 250px"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted,watch,  ref } from 'vue';
const props = defineProps({
  BuildSum: Number,
  OwnerSum: Number,
  TenantSum: Number,
});
const chart = ref();
onMounted(() => {
  watch(() => {
    let Owner = 0;
    let Tenant = 0;
    let empty = 0;
    Owner = ((props.OwnerSum / props.BuildSum) * 100).toFixed(2);
    Tenant = ((props.TenantSum / props.BuildSum) * 100).toFixed(2);
    empty = 100 - Owner - Tenant;
    init(Owner, Tenant, empty);
  });
});
const init = (Owner, Tenant, empty) => {
  const myChart = echarts.init(chart.value);
  let option = {
    yAxis: {
      type: 'category',
      data: ['入住率', '出租率', '空置率'],
    },
    xAxis: {
      type: 'value',
    },
    grid: {
      top: 30,
      x: 45,
      x2: 30,
      y2: 80,
    },
    series: [
      {
        data: [Owner, Tenant, empty],
        type: 'bar',
        barWidth: '20%',
        itemStyle: {
          color: '#42b983',
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
