<template>
  <div>
    <el-row :gutter="10">
      <!-- 第一个card -->
      <el-col :span="6">
        <HeaderCard title="总销售额" number="日销售额 ￥28742984">
          <template slot="charts">
            <FirstChart></FirstChart>
          </template> </HeaderCard
      ></el-col>
      <!-- 第二个card -->
      <el-col :span="6">
        <HeaderCard title="访问量" count="88460" number="日访问量 747975">
          <template slot="charts">
            <SecondChart></SecondChart>
          </template> </HeaderCard
      ></el-col>
      <!-- 第三个card -->
      <el-col :span="6">
        <HeaderCard title="支付笔数" count="9496" number="日转化率 68%">
          <template slot="charts">
            <ThirdChart></ThirdChart> </template></HeaderCard
      ></el-col>
      <!-- 第四个card -->
      <el-col :span="6">
        <HeaderCard title="运营活动效果 " count="86%">
          <template slot="numbers">
            <span>周同比 12%</span>
            <span class="iconfont icon-ico_arrowdown">
              <span class="day">日同比 11% </span
              ><span class="iconfont icon-ico_arrowdown-copy"></span>
            </span>
          </template>
          <template slot="charts">
            <LastChart></LastChart>
          </template> </HeaderCard
      ></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {
    HeaderCard: () => import("./HeaderCard"),
    FirstChart: () => import("./FirstChart"),
    SecondChart: () => import("./SecondChart"),
    ThirdChart: () => import("./ThirdChart"),
    LastChart: () => import("./LastChart"),
  },
};
</script>

<style scoped>
.iconfont .icon-ico_arrowdown {
  color: green;
}
.day {
  margin-left: 10px;
}
.iconfont .icon-ico_arrowdown-copy {
  color: red;
}
</style>