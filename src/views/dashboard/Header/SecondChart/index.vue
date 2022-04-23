<template>
  <div ref="barChart" class="barcharts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "SecondChart",
  mounted() {
    //初始化echarts实例

    var barChart = echarts.init(this.$refs.barChart);
    barChart.setOption({
      //极坐标系的角度轴
      angleAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      //极坐标系的径向轴
      radiusAxis: {},
      //极坐标系，可以用于散点图和折线图
      polar: {},
      series: [
        {
          type: "bar",
          data: [1, 2, 3, 4, 3, 5, 1],
          coordinateSystem: "polar", //使用极坐标系
          name: "A",
          stack: "a",
          emphasis: {
            focus: "series",
          },
        },
        {
          type: "bar",
          data: [2, 4, 6, 1, 3, 2, 1],
          coordinateSystem: "polar",
          name: "B",
          stack: "a",
          emphasis: {
            focus: "series",
          },
        },
        {
          type: "bar",
          data: [1, 2, 3, 4, 1, 2, 5],
          coordinateSystem: "polar",
          name: "C",
          stack: "a",
          emphasis: {
            focus: "series",
          },
        },
      ],
    });
  },
};
</script>

<style>
.barcharts {
  height: 208px;
}
</style>