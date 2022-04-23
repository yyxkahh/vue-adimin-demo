<template>
  <div ref="lineChart" class="echarts">tuba</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "FirstChart",
  mounted() {
    //初始化echarts实例

    var lineChart = echarts.init(this.$refs.lineChart);
    lineChart.setOption({
      //提示信息
      tooltip: {
        trigger: "axis", //触发类型 坐标轴触发
        //坐标轴指示器配置项
        axisPointer: {
          type: "cross", //指示器类型,十字准星指示器
          label: {
            backgroundColor: "#6a7985", //坐标轴指示器的文本标签颜色
          },
        },
      },
      //图例组件
      legend: {
        data: ["电器", "服装", "食品", "数码"],
      },
      //工具栏
      toolbox: {
        //各工具配置项
        feature: {
          saveAsImage: {}, //保存为图片
        },
      },
      //坐标轴位置
      grid: {
        left: "0",
        right: "15px",
        bottom: "0",
        containLabel: true, //grid 区域是否包含坐标轴的刻度标签
      },
      //x轴
      xAxis: {
        type: "category", //类目轴，适用于离散的类目数据
        boundaryGap: false, //坐标轴两边留白策略
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      //y轴
      yAxis: {
        type: "value", //数值轴，适用于连续数据
      },
      series: [
        {
          name: "电器",
          type: "line",
          stack: "Total",
          areaStyle: {}, //区域填充样式。设置后显示成区域面积图。
          //折线图的高亮状态
          emphasis: {
            focus: "series", // 聚焦当前高亮的数据所在的系列的所有图形
          },
          data: [220, 182, 391, 234, 290, 330, 410],
        },
        {
          name: "服装",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [150, 232, 201, 164, 190, 330, 410],
        },
        {
          name: "食品",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [520, 632, 501, 434, 790, 830, 920],
        },
        {
          name: "图书",
          type: "line",
          stack: "Total",
          //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
          label: {
            show: true,
            position: "top", //标签的位置
          },
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [820, 932, 901, 954, 1290, 1330, 1820],
        },
      ],
    });
  },
};
</script>

<style>
.echarts {
  height: 240px;
}
</style>