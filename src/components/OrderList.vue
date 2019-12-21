<template>
  <div>

    <!-- 列表展示 -->
    <el-table v-loading="tbLoading" :data="orderList" border style="width: 100%; margin-top:5px">
      <el-table-column prop="ID" label="ID"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="coinName" label="币种"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="price" label="订单价格"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="timeType" label="订单时间类型"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="Status" label="状态"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="createTime" label="订单时间"  align="center" :show-overflow-tooltip='true'></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getorderlist } from '@/api/order'

export default {
  data () {
    return {
      search_status: null,
      search_step: null,
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
      getorderlist(this.currentPage, this.pageSize, this.input, this.search_status, this.search_step).then(res => {
        this.tbLoading = false
        this.orderList = res.orderList
        this.total = res.orderList.length
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
