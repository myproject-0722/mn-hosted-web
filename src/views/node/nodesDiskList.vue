<template>
  <div>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" @keydown.enter.native="search" v-model="input" clearable style="width:20%;margin-right:5px"></el-input>
    <el-select v-model="search_custId" clearable placeholder="选择客户" style="width:15%;margin-right:5px">
      <el-option v-for="(item,index) in custList" :key="index" :label="item.custName" :value="item.id"></el-option>
    </el-select>
    <el-button type="primary" @click="search">搜索</el-button>

    <!-- 列表展示 -->
    <el-table v-loading="tbLoading" :data="nodeDiskList" border style="width: 100%; margin-top:5px">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="vpsid" label="主机ID"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="volumeId" label="磁盘ID"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="diskSize" label="磁盘空间" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="diskPath" label="磁盘路径" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="mountPath" label="挂载目录" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="usedSize" label="使用大小" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="usedPercent" label="使用百分比" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="custId" label="所属客户" align="center" :show-overflow-tooltip='true'></el-table-column>
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
import { nodeDiskPage } from '@/api/nodes'
import { getCustomerList } from '@/api/sms'

export default {
  data () {
    return {
      search_custId: null,
      custList: [],
      tbLoading: false,
      // 数据列表
      nodeDiskList: [],
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
      nodeDiskPage(this.currentPage, this.pageSize, this.input, this.search_custId).then(res => {
        this.tbLoading = false
        this.nodeDiskList = res.t.records
        this.total = res.t.total
      })
    },
    loadCustmoer() {
      getCustomerList(1, 100, null).then(res => {
        if(res.success){
          this.custList = res.t.records
        }
      })
    }
  },
  mounted () {
    this.init()
    this.loadCustmoer()
  }
}
</script>
<style lang="less" scoped>
</style>
