<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="交易详情" name="first">
        <el-button type="primary" size="small" @click="fundGrant" round>发放基金</el-button>
        <el-table
          :data="dealDetailsList"
          style="width: 100%"
          stripe
          border
          @selection-change="handleSelectionChange"
          v-loading="loading"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column
            label="计划金额"
            prop="planAmount"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            label="实际转账金额"
            prop="amount"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
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

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="交易订单详情" placement="top">
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-tickets"
                  @click="details(scope.row.txDetails)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
        
      </el-tab-pane>
      <el-tab-pane label="订单详情" name="second" disabled>
        <el-table :data="dealOrderList">
          <el-table-column property="srcAccount" label="转出账户"></el-table-column>
          <el-table-column property="dstAccount" label="目标账户"></el-table-column>
          <el-table-column property="amount" label="转出金额"></el-table-column>
          <el-table-column property="remark" label="备注信息"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- <el-button type="primary" size="small" round>发放基金</el-button>
    <el-table
      :data="dealDetailsList"
      style="width: 100%"
      stripe
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="计划金额" prop="planAmount" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="实际转账金额" prop="amount" align="center" :show-overflow-tooltip="true"></el-table-column>
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

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="交易订单详情" placement="top">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-tickets"
              @click="details(scope.row.txDetails)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>-->

    <el-button size="small" round @click="backPage">返回</el-button>

    
  </div>
</template>
<script>
import {
  getTxDetailBy_PerformanceId,
  performanceFundGran
} from "@/api/fund.js";
export default {
  data() {
    return {
      total: 0,
      pageSize: 5,
      currPage: 1,
      activeName: "first",
      dealOrderList: [],
      // dialogTableVisible: false,
      dealDetailsList: [],
      dealDetailsListAll: [],
      fundGrantId: "",
      loading: false,
      performanceId: ""
    };
  },
  methods: {
    paging() {
      // console.log(this.dealDetailsListAll);
      this.dealDetailsList = this.dealDetailsListAll.slice(
        (this.currPage-1) * this.pageSize,
        (this.currPage-1) * this.pageSize + this.pageSize
      );
      // console.log(this.dealDetailsList);
      
    },
    handleSizeChange(val) {
      this.currPage = 1;
      this.pageSize = val;
      this.paging();
    },
    handleCurrentChange(val) {
      this.currPage = val;
      this.paging();
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    fundGrant() {
      if (!this.fundGrantId) {
        this.$message({
          type: "warning",
          message: "请先选择要发放的基金！"
        });
        return false;
      }
      this.$confirm("是否发放这些基金?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(this.fundGrantId);
          console.log(this.$route.query.id);
          // performanceFundGran(this.fundGrantId,this.$route.query.id).then(res => {
          //   console.log(res);
          //   if (res.code === 200) {
          //     //
          //     this.$message({
          //       type: "success",
          //       message: res.t
          //     });
          //     this.init();
          //   }
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发放"
          });
        });
    },
    handleSelectionChange(row) {
      console.log(row);
      console.log(this.fundGrantId);
      let grantId = "";
      row.forEach(e => {
        if (!grantId) {
          grantId = grantId + e.id;
        } else {
          grantId = grantId + "," + e.id;
        }
      });
      console.log(grantId);
      this.fundGrantId = grantId;
    },
    details(arr) {
      console.log(arr);
      this.dealOrderList = arr;
      // this.dialogTableVisible = true;
      this.activeName = "second";
    },
    backPage() {
      this.$router.go(-1);
    },
    async init() {
      this.loading = true;
      let { t } = await getTxDetailBy_PerformanceId(this.performanceId)
      // console.log(t)
      this.dealDetailsListAll = t.fundTxList;
      this.total = t.fundTxList.length;
        // .then(res => {
        //   this.loading = false;
        //   console.log(res);
        //   this.dealDetailsListAll = res.t.fundTxList;
        //   this.total = res.t.fundTxList.length;
        // })
        // .catch(err => {
        //   console.log(err);
        // });
        this.loading = false;
        this.paging()
    }
  },
  created() {
    console.log(this.$route.query.id);
    this.performanceId = this.$route.query.id;
  },
  mounted() {
    this.init()
    
  }
};
</script>
<style lang="less" scoped>
/deep/ .el-tabs__nav {
  position: relative;
  left: 50%;
  margin-left: -100px;
}
</style>
