<template>
  <div ref="lastEchart" class="lastEchart">sds</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LastChart",
  mounted() {
    var lastEchart = echarts.init(this.$refs.lastEchart);
    lastEchart.setOption({
      polar: {
        center: ["50%", "54%"],
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      angleAxis: {
        type: "value",
        startAngle: 0,
      },
      radiusAxis: {
        min: 0,
      },
      series: [
        {
          coordinateSystem: "polar",
          name: "line",
          type: "line",
          showSymbol: false,
          data: [120, 200, 150, 80, 70, 110, 130],
        },
      ],
      animationDuration: 2000,
    });
  },
};
</script>

<style>
.lastEchart {
  height: 208px;
}
</style>