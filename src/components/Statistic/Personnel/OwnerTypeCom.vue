<template>
  <div ref="chart" style="width: 400px; height: 250px"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { watch, onMounted, ref } from 'vue';
const props = defineProps({
  OwnerList: '',
});
const chart = ref();
onMounted(() => {
  watch(
    () => props.OwnerList,
    () => {
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;
      let e = 0;
      props.OwnerList.forEach((item) => {
        switch (item.career) {
          case '上班族':
            a++;
            break;
          case '全职妈妈':
            b++;
            break;
          case '学生':
            c++;
            break;
          case '自由职业':
            d++;
            break;
          case '其它':
            e++;
            break;
        }
      });
      init(a, b, c, d, e);
    }
  );
});
const init = (a, b, c, d, e) => {
  const myChart = echarts.init(chart.value);
  let option = {
    yAxis: {
      type: 'category',
      data: ['上班族', '全职妈妈', '学生', '自由职业', '其它'],
    },
    xAxis: {
      type: 'value',
    },
    grid: {
      top: 30,
      x: 60,
      x2: 40,
      y2: 80,
    },
    series: [
      {
        data: [a, b, c, d, e],
        type: 'bar',
        barWidth: '30%',
        itemStyle: {
          barBorderRadius: 20,
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
