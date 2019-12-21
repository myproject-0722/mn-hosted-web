<template>
  <div>

    <!-- 列表展示 -->
    <el-table v-loading="tbLoading" :data="rewardsList" border style="width: 100%; margin-top:5px">
      <el-table-column prop="coinName" label="币种"  align="center" :show-overflow-tooltip='true'/>
      <el-table-column prop="MNCount" label="主节点数"  align="center" :show-overflow-tooltip='true'/>
      <el-table-column prop="rewards" label="收益(当前币种)"  align="center" :show-overflow-tooltip='true'/>
    </el-table>
  </div>
</template>
<script>
import { getrewardslist } from '@/api/masternode'

export default {
  data () {
    return {
      search_status: null,
      search_step: null,
      tbLoading: false,
      // 数据列表
      rewardsList: [],
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
      getrewardslist(this.currentPage, this.pageSize, this.input, this.search_status, this.search_step).then(res => {
        this.tbLoading = false
        this.rewardsList = res.rewardslist
        this.total = res.rewardslist.length
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
