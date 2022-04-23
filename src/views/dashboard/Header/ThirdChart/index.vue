<template>
  <div ref="thirdChart" class="thirdChart">11</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "ThirdChart",
  mounted() {
    var myEchart = echarts.init(this.$refs.thirdChart);
    myEchart.setOption({
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      grid: {
        top: "0%",
        left: "0%",
        right: "0%",
        bottom: "0%",
        containLabel: true,
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    });
  },
};
</script>

<style>
.thirdChart {
  height: 208px;
}
</style>