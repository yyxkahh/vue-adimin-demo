<template>
  <div>
    <el-card shadow="always" style="margin: 10px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card shadow="always">
      <!-- 底部这里将来是有三部分进行切换 -->
      <div v-show="scene === 0">
        <!-- 展示SPU列表的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSpu"
          :disabled="!category3Id"
          >添加Spu</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="row">
              <el-tooltip effect="light" content="添加sku" placement="bottom">
                <el-button
                  type="success"
                  icon="el-icon-plus"
                  size="mini"
                  @click="addSku(row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="修改spu" placement="bottom" effect="light">
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  size="mini"
                  @click="updateSpu(row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                content="查看当前spu全部sku列表"
                placement="bottom"
                effect="light"
              >
                <el-button
                  type="info"
                  icon="el-icon-info"
                  size="mini"
                  @click="skuList(row.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="删除spu" placement="bottom" effect="light">
                <el-popconfirm
                  title="确定要删除吗？"
                  @onConfirm="deleteSpu(row)"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    slot="reference"
                  ></el-button>
                </el-popconfirm>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->, sizes,total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
          :total="total"
        >
        </el-pagination>
      </div>
      <SpuForm
        v-show="scene === 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm
        v-show="scene === 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></SkuForm>
      <!-- 查看sku列表 -->
      <el-dialog
        :title="`${spu.spuName}的sku列表`"
        :visible.sync="dialogTableVisible"
        :before-close="close"
      >
        <el-table
          style="width: 100%"
          border
          :data="skuLists"
          v-loading="loading"
        >
          <el-table-column prop="skuName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="width">
          </el-table-column>
          <el-table-column prop="weight" label="重量" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="默认图片" width="width">
            <template slot-scope="{ row }">
              <img
                :src="row.skuDefaultImg"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import SkuForm from "./SkuForm";
import SpuForm from "./SpuForm";
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1, //分页器当前第几页
      limit: 3, //每一页需要展示多少条数据
      records: [], //spu列表的数据
      total: 0, //分页器一共需要展示数据的条数
      scene: 0, //0代表展示SPU列表数据   1 添加SPU|修改SPU   2 添加SKU
      dialogTableVisible: false,
      spu: {},
      skuLists: [],
      loading: true,
    };
  },
  methods: {
    //自定义事件的回调函数
    getCategoryId(cForm) {
      this.category1Id = cForm.category1Id;
      this.category2Id = cForm.category2Id;
      this.category3Id = cForm.category3Id;
      this.getSpuList();
    },
    //获取spu列表
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //当分页器的某一个展示数据条数发生变化的回调
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    //添加spu按钮回调函数
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpuInfo(this.category3Id);
    },
    //修改spu按钮回调函数
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    //自定义事件回调函数
    changeScene({ scene, flag }) {
      this.scene = scene;
      //子组件通知父组件切换场景，需要再次获取SPU列表的数据进行展示
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    //删除spu按钮回调
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    //添加sku按钮回调
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row.row);
    },
    //自定义回调事件
    changeScenes(scene) {
      this.scene = scene;
    },
    //查看spu的sku列表
    async skuList(spu) {
      this.dialogTableVisible = true;
      this.spu = spu;
      //发请求
      let result = await this.$API.spu.reqSkuList(spu.id);
      if (result.code == 200) {
        this.skuLists = result.data;
        this.loading = false;
      }
    },
    //关闭对话框之前的回调
    close(done) {
      this.loading = true;
      this.skuLists = [];
      done();
    },
  },
  components: {
    SkuForm,
    SpuForm,
  },
};
</script>

<style>
</style>