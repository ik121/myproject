<template>
  <div ref="chart" style="width: 830px; height: 230px"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, watch } from 'vue';
const chart = ref();
const props = defineProps({
  OwnerList: '',
});
onMounted(() => {
  watch(
    () => props.OwnerList,
    () => {
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;
      let e = 0;
      let f = 0;
      let g = 0;
      let h = 0;
      let i = 0;
      let j = 0;
      let k = 0;
      let l = 0;
      props.OwnerList.forEach((item) => {
        switch (true) {
          case item.age < 6:
            a++;
            break;
          case 6 <= item.age && item.age <= 11:
            b++;
            break;
          case 11 < item.age && item.age <= 15:
            c++;
            break;
          case 15 < item.age && item.age <= 25:
            d++;
            break;
          case 25 < item.age && item.age <= 30:
            e++;
            break;
          case 30 < item.age && item.age <= 40:
            f++;
            break;
          case 40 < item.age && item.age <= 50:
            g++;
            break;
          case 50 < item.age && item.age <= 60:
            h++;
            break;
          case 60 < item.age && item.age <= 65:
            i++;
            break;
          case 65 < item.age && item.age <= 70:
            j++;
            break;
          case 70 < item.age:
            k++;
            break;
        }
      });
      init(a, b, c, d, e, f, g, h, i, j, k);
    }
  );
});
const init = (a, b, c, d, e, f, g, h, i, j, k, l) => {
  const myChart = echarts.init(chart.value);
  let option = {
    xAxis: {
      type: 'category',
      data: [
        '6岁以下',
        '6-11',
        '11-15',
        '15-25',
        '25-30',
        '30-40',
        '40-50',
        '50-60',
        '60-65',
        '65-70',
        '70以上',
      ],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [a, b, c, d, e, f, g, h, i, j, k],
        type: 'bar',
        barWidth: '20%',
        radius: ['40%', '70%'],
        itemStyle: {
          color: '#04DDA6',
        },
      },
    ],
  };
  myChart.setOption(option);
};
</script>

<style></style>
