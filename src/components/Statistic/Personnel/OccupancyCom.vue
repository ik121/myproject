<template>
  <div ref="chart" style="width: 200px; height: 200px"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, watch, reactive } from 'vue';

const props = defineProps({
  people:Number,
  util:Number
});
const chart = ref();
onMounted(() => {
  watch(()=>{
    init(props.util, props.people);
  })
});
const init = (util, people) => {
  const myChart = echarts.init(chart.value);
  let value = people;
  let maxValue = util;
  let option = {
    title: {
      //标题内容
      textStyle: {
        fontWeight: 'bold',
        fontFamily: 'Microsoft YaHei',
        fontSize: 24,
      },
      //标题位置
      top: '5%',
      left: '5%',
    },
    //环形中间文字
    graphic: [
      //第一行文字
      //内容 + 位置
      {
        type: 'text',
        left: 'center',
        top: '40%',
        style: {
          //value当前进度
          text: ((value / maxValue) * 100).toFixed(2) + '%',
          textAlign: 'center',
          fill: '#05ff7e',
          fontSize: 28,
        },
      },
      //第二行文字
      //内容 + 位置
      {
        type: 'text',
        left: 'center',
        top: '55%',
        style: {
          text: '入住率',
          textAlign: 'center',
          fill: '#999',
          fontSize: 10,
        },
      },
    ],
    series: [
      {
        type: 'pie',
        radius: ['90%', '64%'], //['外圆大小', '内圆大小']
        center: ['50%', '50%'], //圆心位置['左右'， '上下']
        hoverAnimation: false, //取消鼠标悬停动画
        animationEasing: 'cubicOut', //设置动画缓动效果
        //取消显示饼图自带数据线条
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [
          //value当前进度 + 颜色
          {
            value: value,
            itemStyle: {
              normal: {
                color: '#ffffff',
              },
            },
          },
          //(maxValue进度条最大值 - value当前进度) + 颜色
          {
            value: maxValue - value,
            itemStyle: {
              normal: {
                color: '#05ff7e',
              },
            },
          },
        ],
      },
    ],
  };
  myChart.setOption(option);
};
</script>

<style>
a {
  border: 1px solid #05ff7e;
}
</style>
