<template>
  <div ref="chart" style="width: 400px; height: 230px"></div>
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
      let boy = 0;
      let girl = 0;
      props.OwnerList.forEach((item) => {
        switch (item.sex) {
          case '男':
            boy++;
            break;
          case '女':
            girl++;
            break;
        }
      });
      init(boy, girl);
    }
  );
});
const init = (boy, girl) => {
  const myChart = echarts.init(chart.value);
  let option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    series: [
      {
        name: '男女比例',
        type: 'pie',
        radius: ['40%', '70%'],
        labelLine: {
          normal: {
            show: false,
          },
        },
        label: {
          formatter: '{b|{b}}',
          backgroundColor: '#00ff9d',
          borderColor: '#ffffff',
          borderWidth: 1,
          borderRadius: 160,
          rich: {
            b: {
              color: '#ffffff',
              width: 35,
              fontSize: 14,
              align: 'center',
              fontWeight: 'bold',
              lineHeight: 33,
            },
          },
        },
        data: [
          {
            value: boy,
            name: '男',
            itemStyle: {
              color: '#1890FF',
              shadowColor: '#91cc75',
              borderType: 'dashed',
            },
          },
          {
            value: girl,
            name: '女',
            itemStyle: {
              color: '#01CA86',
              shadowColor: '#91cc75',
              borderType: 'dashed',
            },
          },
        ],
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
