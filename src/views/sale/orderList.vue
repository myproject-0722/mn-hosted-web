<template>
  <div>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" @keydown.enter.native="search" v-model="input" clearable style="width:20%;margin-right:5px"></el-input>
    <el-select v-model="search_status" clearable placeholder="支付状态" style="width:8%;margin-right:5px">
      <el-option key="0" label="待支付" :value="0"></el-option>
      <el-option key="1" label="已支付" :value="1"></el-option>
      <el-option key="-1" label="已取消" :value="-1"></el-option>
      <el-option key="-2" label="已失效" :value="-2"></el-option>
    </el-select>
    <el-select v-model="search_payWay" clearable placeholder="支付方式" style="width:8%;margin-right:5px">
      <el-option key="-1" label="预消费" :value="-1"></el-option>
      <el-option key="1" label="支付宝" :value="1"></el-option>
      <el-option key="2" label="微信" :value="2"></el-option>
      <el-option key="3" label="余额" :value="3"></el-option>
    </el-select>
    <el-select v-model="search_productType" clearable placeholder="结算方式" style="width:8%;margin-right:5px">
      <el-option key="0" label="按天" :value="0"></el-option>
      <el-option key="1" label="按月" :value="1"></el-option>
      <el-option key="2" label="按年" :value="2"></el-option>
    </el-select>
    <el-button type="primary" @click="search">搜索</el-button>

    <!-- 列表展示 -->
    <el-table v-loading="tbLoading" :data="orderList" border style="width: 100%;margin-top:5px">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="id" label="订单ID"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="custName" label="所属客户"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="userTel" label="用户手机"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="productName" label="产品" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="productType" label="计费类型" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          {{scope.row.productType|productType}}
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="金额" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="payWay" label="支付方式" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          {{scope.row.payWay|payWay}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="支付状态" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          {{scope.row.status|payStatus}}
        </template>
      </el-table-column>
      <el-table-column prop="payTime" label="支付时间" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          {{scope.row.payTime|timeFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          {{scope.row.createTime|timeFormat}}
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button size="small" type="primary" icon="el-icon-edit" @click="showEditCustomer(scope.row)"></el-button>
          </el-tooltip>
          <el-button size="small" type="primary" @click="paramEdit(scope.row.id)">参数</el-button>
        </template>
      </el-table-column> -->
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
import { orderPage } from '@/api/sale'

export default {
  data () {
    return {
      search_status: null,
      search_payWay: null,
      search_productType: null,
      tbLoading: false,
      // 数据列表
      orderList: [],
      // 搜索条件
      input: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {

    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.init()
    },

    // 条件搜索
    search () {
      this.currentPage = 1
      this.init()
    },
    // 列表展示
    init () {
      this.tbLoading = true
      orderPage(this.currentPage, this.pageSize, this.input, this.search_productType, this.search_payWay, this.search_status).then(res => {
        this.tbLoading = false
        this.orderList = res.t.records
        this.total = res.t.total
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
