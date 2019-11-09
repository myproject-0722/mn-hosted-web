<template>
  <div>

    <!-- 列表展示 -->
    <el-table v-loading="tbLoading" :data="masternodeList" border style="width: 100%; margin-top:5px">
      <el-table-column prop="coinName" label="CoinName"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="MNKey" label="MNKey"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="SyncStatus" label="同步状态" :formatter="syncStateFormat"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="expireTime" label="到期时间" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column label="续期" min-width="250" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <el-button type="primary" @click="onRenewDay(scope.row.coinName, scope.row.MNKey)">一天</el-button>
          <el-button type="primary" @click="onRenewMonth(scope.row.coinName, scope.row.MNKey)">一月</el-button>
          <el-button type="primary" @click="onRenewYear(scope.row.coinName, scope.row.MNKey)">一年</el-button>
          <!-- <el-link :href="'/home/'+scope.row.coinName+''" type="primary">添加{{scope.row.coinName}}主节点</el-link> -->
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
import { get } from '@/api/masternode'
import { renew } from '@/api/masternode'

export default {
  data () {
    return {
      search_status: null,
      search_step: null,
      tbLoading: false,
      // 数据列表
      masternodeList: [],
      // 搜索条件
      input: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {

    onRenewDay(coinName, mnkey) {
      console.log('submit!');
      renew(coinName, mnkey, "1", "192.168.0.197").then(res => {
        //this.$router.push({ name: 'home' })
      })
      .catch(err => {
        this.$message.error('续期失败:' + err)
      })
    },

    onRenewMonth(coinName, mnkey) {
      console.log('submit!');
      renew(coinName, mnkey, "2", "192.168.0.197").then(res => {
        //this.$router.push({ name: 'home' })
      })
      .catch(err => {
        this.$message.error('续期失败:' + err)
      })
    },

    onRenewYear(coinName, mnkey) {
      console.log('submit!');
      renew(coinName, mnkey, "2", "192.168.0.197").then(res => {
        //this.$router.push({ name: 'home' })
      })
      .catch(err => {
        this.$message.error('续期失败:' + err)
      })
    },

    syncStateFormat(row, column) {
      if (row.SyncStatus === 1) {
        return '完成'
      } else  {
        return '进行中'
      } 
    },
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
      get().then(res => {
        this.tbLoading = false
        this.masternodeList = res.masternodelist
        this.total = this.masternodeList.length
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
