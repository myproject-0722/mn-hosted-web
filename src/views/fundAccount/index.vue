<template>
  <div>
    <el-input
      placeholder="请输入搜索内容"
      @keydown.enter.native="search"
      v-model="searchKey"
      clearable
      style="width:150px;padding-bottom:5px"
    ></el-input>
     <el-button type="primary" @click="search">搜索</el-button>


    <!-- 列表展示 -->
    <el-table :data="fundTxList" style="width: 100%" stripe border v-loading="loading">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column label="所属客户" prop="custName" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column
        label="绩效基金总量"
        prop="performanceAmount"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        label="绩效基金发放量"
        prop="finalAmount"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column label="周期数" prop="cycleNum" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="周期开始时间" prop="fromTime" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{ scope.row.fromTime | timeFormat }}</template>
      </el-table-column>
      <el-table-column label="周期结束时间" prop="toTime" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{ scope.row.toTime | timeFormat }}</template>
      </el-table-column>
      <el-table-column label="备注信息" prop="remark" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="交易状态" prop="txFlag" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="scope.row.txFlag === '1' ? 'success' : 'danger'"
            disable-transitions
          >{{scope.row.txFlag === '1' ? '正常' : '异常'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="交易详情" placement="top">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-tickets"
              @click="dealDetails(scope.row.id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="绩效详情" placement="top">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-tickets"
              @click="performanceDetails(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { getTxDetailByPerformanceId, fundPerformanceList } from "@/api/fund.js";
import { timeTpye } from "@/utils/utils.js";
export default {
  filters: {
    // timeType: function(time) {
    //   if (time) {
    //     return timeTpye(time);
    //   } else {
    //     return time;
    //   }
    // }
  },
  data() {
    return {
      fundTxList: [],
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchKey:''
    };
  },
  methods: {
    search(){
      this.init()
    },
    // 改变每页数据数量
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.init();
    },
    // 改变当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.init();
    },
    dealDetails(id) {
      console.log(id);
      this.$router.push("/home/fundDealDetails?id=" + id);
    },
    performanceDetails(id) {
      console.log(id);
      this.$router.push("/home/fundPerformanceDetails?id=" + id);
    },
    init() {
      this.loading = true;
      fundPerformanceList(this.searchKey,this.currentPage,this.pageSize).then(res => {
        this.loading = false;
        console.log(res);
        this.fundTxList = res.t.records;
        this.total = res.t.total
      }).catch(err=>{
        console.log(err)
        this.$message({
            message: err.message,
            type: 'warning'
          })
      })
    }
  },
  mounted() {
    this.init()
  }
};
</script>
<style lang="less" scoped>
// .demo-table-expand {
//   font-size: 0;
// }
// .demo-table-expand label {
//   width: 90px;
//   color: #99a9bf;
// }
// .demo-table-expand .el-form-item {
//   margin-right: 0;
//   margin-bottom: 0;
//   width: 50%;
// }
</style>
