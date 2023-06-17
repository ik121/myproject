<template>
  <div ref="chart" style="width: 1200px; height: 300px"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
const chart = ref();
const data = ref([]);
import { useStore } from 'vuex';
const store = useStore();
onMounted(() => {
  init(store.state.idc.HouseEnter, store.state.idc.HouseOut);
});
const fn = () => {
  data.value = [];
  for (let i = 0; i < 7; i++) {
    let day = '';
    day = new Date().getDate() - i;
    if (day < 10) {
      day = '0' + day;
    }
    data.value.push(new Date().getMonth() + 1 + '.' + day);
  }
};
fn();

const init = (HouseEnter, HouseOut) => {
  const myChart = echarts.init(chart.value);
  let option = {
    legend: {
      data: ['迁入', '迁出'],
      right: '100',
    },
    xAxis: {
      type: 'category',
      data: data.value,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: HouseEnter,
        type: 'line',
        name: '迁入',
        smooth: true,
      },
      {
        data: HouseOut,
        type: 'line',
        name: '迁出',
        smooth: true,
      },
    ],
  };
  myChart.setOption(option);
};
</script>

<style scoped lang="scss">
a {
  border: 1px solid;
}
</style>
