<template>
  <div>

    <!-- 列表展示 -->
    <el-table v-loading="tbLoading" :data="coinsList" border style="width: 100%; margin-top:5px">
      <el-table-column prop="coinName" label="币种"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="MNRequired" label="主节点质押费用(数字货币)"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="DPrice" label="日托管费用(￥)" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="MPrice" label="月托管费用(￥)" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="YPrice" label="年托管费用(￥)" align="center" :show-overflow-tooltip='true'></el-table-column>
      <!-- <el-table-column prop="volume" label="volume" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="roi" label="收益率" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="monthlyIncome" label="月收益" align="center" :show-overflow-tooltip='true'></el-table-column>-->
      <el-table-column prop="MNHosted" label="当前主节点托管数" :formatter="mnhostedFormat" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column label="" min-width="250" align="center">
        <template slot-scope="scope">
          <el-link :href="'/home/'+scope.row.coinName+''" type="primary">添加{{scope.row.coinName}}主节点</el-link>
          <!-- <a :href="'/home/'+scope.row.coinName+''" class="btn btn-sm btn-rounded btn-outline-primary"><i class="fas fa-plus-circle"></i>{{scope.row.coinName}}</a> -->
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
import { coinPage } from '@/api/nodes'

export default {
  data () {
    return {
      search_status: null,
      search_step: null,
      tbLoading: false,
      // 数据列表
      coinsList: [],
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
    mnhostedFormat(row, column) {
      if (row.MNHosted) {
        return row.MNHosted
      }
      else  {
        return 0
      } 
    },
    // 条件搜索
    search () {
      this.currentPage = 1
      this.init()
    },
    // 列表展示
    init () {
      this.tbLoading = true
      coinPage(this.currentPage, this.pageSize, this.input, this.search_status, this.search_step).then(res => {
        this.tbLoading = false
        this.coinsList = res.coinlist
        this.total = this.coinsList.length
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
