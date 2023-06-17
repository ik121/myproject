<template>
  <div ref="chart" style="width: 400px; height: 230px"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, watch } from 'vue';
const chart = ref();
const props = defineProps({
  OwnerList: Object,
});
onMounted(() => {
  watch(
    () => props.OwnerList,
    () => {
      let a = 0;
      let b = 0
      let c = 0
      let d = 0
      props.OwnerList.forEach((item) => {
        switch (item.type) {
          case '业主':
            a++;
            break;
          case '租客':
            b++;
            break;
          case '亲属':
            c++;
            break;
          case '其他':
            d++;
            break;
        }
      });
      init(a, b, c, d);
    }
  );
});
const init = (a, b, c, d) => {
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
        name: '住户类型分析',
        right: '20%',
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: a, name: '业主' },
          { value: b, name: '租户' },
          { value: c, name: '亲属' },
          { value: d, name: '其它' },
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
