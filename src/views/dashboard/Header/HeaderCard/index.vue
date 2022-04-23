<template>
  <div>
    <el-card>
      <div class="card-header">
        <span>{{ title }}</span
        ><span class="iconfont icon-info"></span>
      </div>
      <!-- 数字内容 -->
      <div class="card-content">{{ count }}</div>
      <!-- 图表 -->
      <div class="card-charts">
        <slot name="charts"></slot>
      </div>
      <!-- 底部数据 -->
      <div class="card-footer">
        {{ number }}
        <slot name="numbers"></slot>
      </div>
      <div></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HeaderCard",
  props: ["title", "count", "number"],
};
</script>

<style scoped >
.card-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}
.card-header .icon-info {
  font-size: 22px;
  color: #c7c7c6;
}
.card-content {
  font-size: 28px;
}

.card-footer {
  text-align: center;
  color: #78a6ff;
  margin-top: 10px;
}
</style>