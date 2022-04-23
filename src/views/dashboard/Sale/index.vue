<template>
  <el-card class="box-card" style="margin-top: 10px">
    <div slot="header" class="clearfix">
      <!-- @tab-click="handleClick" -->
      <!-- 头部左侧内容 -->
      <el-tabs v-model="activeName" class="tab">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <!-- :picker-options="pickerOptions"  -->
      <div class="right">
        <span class="set-time" @click="setDay">今日</span>
        <span class="set-time" @click="setWeek">本周</span>
        <span class="set-time" @click="setMonth">本月</span>
        <span class="set-time" @click="setYear">本年</span>
        <el-date-picker
          class="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          align="right"
          size="small"
          v-model="date"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>

    <el-row :gutter="10">
      <!-- 容器 -->
      <el-col :span="18">
        <div class="charts" ref="charts"></div>
      </el-col>
      <!-- 右侧排名 -->
      <el-col :span="6">
        <div class="rank">
          <h2>门店{{ title }}排名Top10</h2>
          <ul class="father">
            <li>
              <span class="radio top1">1</span><span class="text">肯德基</span
              ><span class="number">896,294</span>
            </li>
            <li>
              <span class="radio top2">2</span><span class="text">麦当劳</span
              ><span class="number">866,403</span>
            </li>
            <li>
              <span class="radio top3">3</span><span class="text">海底捞</span
              ><span class="number">835,678</span>
            </li>
            <li>
              <span class="radio">4</span><span class="text">小绵羊</span
              ><span class="number">786,454</span>
            </li>
            <li>
              <span class="radio">5</span><span class="text">汉堡王</span
              ><span class="number">776,443</span>
            </li>
            <li>
              <span class="radio">6</span><span class="text">必胜客</span
              ><span class="number">749,375</span>
            </li>
            <li>
              <span class="radio">7</span><span class="text">十月楼</span
              ><span class="number">706,294</span>
            </li>
            <li>
              <span class="radio">8</span><span class="text">望湘楼</span
              ><span class="number">685,435</span>
            </li>
            <li>
              <span class="radio">9</span><span class="text">真功夫</span
              ><span class="number">606,244</span>
            </li>
            <li>
              <span class="radio">10</span><span class="text">杨国福</span
              ><span class="number">582,945</span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import dayjs from "dayjs";
import * as echarts from "echarts";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      myEcharts: null,
      date: [],
      //带快捷选项
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.myEcharts = echarts.init(this.$refs.charts);
    this.myEcharts.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: 0,
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 244, 543, 646, 325, 646],
        },
      ],
    });
  },
  computed: {
    //计算属性-标题
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
    data() {
      const data1 = [
        70, 59, 200, 334, 390, 330, 220, 159, 389, 169, 159, 349, 289,
      ];
      const data2 = [
        290, 199, 339, 269, 189, 399, 269, 90, 72, 200, 394, 330, 330,
      ];
      return this.activeName == "sale" ? data1 : data2;
    },
  },
  watch: {
    title() {
      this.myEcharts.setOption({
        title: {
          text: this.title + "趋势",
        },
      });
    },
    data() {
      this.myEcharts.setOption({
        series: {
          data: this.data,
        },
      });
    },
  },
  methods: {
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      let start = dayjs().day(1).format("YYYY-MM-DD");
      let end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setMonth() {
      let start = dayjs().startOf("month").format("YYYY-MM-DD");
      let end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setYear() {
      let start = dayjs().startOf("year").format("YYYY-MM-DD");
      let end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>


<style>
.el-card__header {
  border-bottom: 0;
}
.set-time {
  padding: 5px;
  margin-right: 8px;
  border-radius: 5px;
  background: #f5f5f5;
  color: #70a1ff;
  cursor: pointer;
}
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  font-size: 16px;
  position: absolute;
  right: 0;
  top: -7px;
}
.right span {
  margin-right: 7px;
  height: 40px;
}
.right .date {
  height: 38px;
  width: 300px;
}
.charts {
  width: 100%;
  height: 500px;
}
.rank h2 {
  text-align: center;
}
.father {
  list-style: none;
  width: 100%;
  height: 500px;
}
.father li {
  height: 5%;
  margin: 20px 0;
}
.radio {
  border-radius: 50%;
  background-color: #dfe4ea;
  float: left;
  width: 25px;
  height: 25px;
  color: #fff;
  line-height: 25px;
  text-align: center;
  margin-right: 10px;
}
.text {
  line-height: 25px;
}
.number {
  float: right;
  line-height: 25px;
}
.top1 {
  background-color: #ff7979;
}
.top2 {
  background-color: #f9ca24;
}
.top3 {
  background-color: #7ed6df;
}
</style>