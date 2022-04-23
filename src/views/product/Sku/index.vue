<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="records">
      <el-table-column
        type="index"
        label="序号"
        width="50px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="skuName"
        label="名称"
        width="120px"
      ></el-table-column>
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="width"
      ></el-table-column>
      <el-table-column prop="prop" label="默认图片" width="110px">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量"
        width="80px"
      ></el-table-column>
      <el-table-column prop="price" label="价格" width="80px"></el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="success"
            icon="el-icon-bottom"
            size="mini"
            v-if="row.isSale == 1"
            @click="changeSale(row)"
          ></el-button>
          <el-button
            type="success"
            v-else
            icon="el-icon-top"
            size="mini"
            @click="changeSale(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit()"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="skuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 
       -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @current-change="getSkuList"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <!-- sku详细抽屉效果 -->
    <el-drawer
      title="sku详情"
      :visible.sync="show"
      :show-close="false"
      size="50%"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfos.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfos.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfos.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="attr in skuInfos.skuAttrValueList"
            :key="attr.id"
            style="margin-right: 8px"
            >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel :interval="2000">
            <el-carousel-item
              v-for="img in skuInfos.skuImageList"
              :key="img.id"
            >
              <img
                :src="img.imgUrl"
                style="width: 300px; height: 400px"
                alt=""
              />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1,
      limit: 3,
      records: [],
      total: 0,
      show: false, //抽屉效果
      skuInfos: {},
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    //获取sku列表数据
    async getSkuList(pages = 1) {
      this.page = pages;
      let result = await this.$API.sku.reqSkuList(this.page, this.limit);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    //修改上架和下架操作
    async changeSale(row) {
      if (row.isSale == 0) {
        let result = await this.$API.sku.reqOnSale(row.id);
        if (result.code == 200) {
          row.isSale = 1;
          this.$message({ type: "success", message: "上架成功" });
        }
      } else {
        let result1 = await this.$API.sku.reqCancelSale(row.id);
        if (result1.code == 200) {
          row.isSale = 0;
          this.$message({ type: "success", message: "下架成功" });
        }
      }
    },
    edit() {
      this.$message("正在开发中");
    },
    //信息按钮
    async skuInfo(row) {
      this.show = true;
      //发请求
      let result = await this.$API.sku.reqSkuInfo(row.id);
      if (result.code == 200) {
        this.skuInfos = result.data;
      }
    },
  },
};
</script>

<style>
.el-row .el-col-5 {
  text-align: right;
  font-size: 18px;
}
.el-col {
  margin: 10px 10px;
}
.el-carousel {
  width: 400px;
  height: 300px;
}
</style>