<template>
  <div>

    <!-- 列表展示 -->
    <el-table v-loading="tbLoading" :data="masternodeList" :default-sort="{prop: 'MNID', order: 'ascending'}" border style="width: 100%; margin-top:5px">
      <el-table-column prop="coinName" label="币种" min-width="45" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="MNID" label="ID" min-width="25" align="center"></el-table-column>
      <!-- <el-table-column prop="MNKey" label="MNKey"  align="center" :show-overflow-tooltip='true'></el-table-column> -->
      <el-table-column prop="MNPayee" label="收益地址(payoutAddress)" min-width="180" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="SyncStatus" label="同步状态" min-width="45" :formatter="syncStateFormat"></el-table-column>
      <el-table-column prop="MNStatus" label="主节点状态" :formatter="mnStateFormat"></el-table-column>
      <el-table-column prop="vps" label="地址" min-width="100" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="earn" label="收益(当前币种)" min-width="40" align="center" :formatter="dataFormat" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="expireTime" label="到期时间" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column label="续期" min-width="100" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <!-- <el-button type="primary" @click="onRenewDay(scope.row.coinName, scope.row.MNKey)">一天</el-button> -->
          <el-button type="primary" @click="onRenewMonth(scope.row.coinName, scope.row.MNKey)">一月</el-button>
          <el-button type="primary" @click="onRenewYear(scope.row.coinName, scope.row.MNKey)">一年</el-button>
          <!-- <el-link :href="'/home/'+scope.row.coinName+''" type="primary">添加{{scope.row.coinName}}主节点</el-link> -->
        </template>
      </el-table-column>
      <el-table-column label="信息修改" min-width="60" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <el-button type="primary" @click="onModify(scope.row.coinName, scope.row.MNID)">修改</el-button>
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
import { get } from '@/api/masternode'
import { getcount } from '@/api/masternode'
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
    sortByID(obj1, obj2) {
      let val1 = obj1.ID
      let val2 = obj2.ID
      return val1 > val2
    },

    dataFormat(row, column) {
      if (row.earn === undefined) {
        return '0'
      }
      return row.earn
    },

    onRenewDay(coinName, mnkey) {
      console.log('submit!');
      renew(coinName, mnkey, "1").then(res => {
        //this.$router.push({ name: 'home' })
        window.location.href =res.payUrl; //  跳转链接
      })
      .catch(err => {
        this.$message.error('续期失败:' + err)
      })
    },

    onRenewMonth(coinName, mnkey) {
      console.log('submit!');
      renew(coinName, mnkey, "2").then(res => {
        //this.$router.push({ name: 'home' })
        window.location.href =res.payUrl; //  跳转链接
      })
      .catch(err => {
        this.$message.error('续期失败:' + err)
      })
    },

    onRenewYear(coinName, mnkey) {
      console.log('submit!');
      renew(coinName, mnkey, "3").then(res => {
        //this.$router.push({ name: 'home' })
        window.location.href =res.payUrl; //  跳转链接
      })
      .catch(err => {
        this.$message.error('续期失败:' + err)
      })
    },

    onModify(coinName, mnid) {
      console.log('submit!');
      if (coinName == 'dash') {
        this.$router.push({
          path:'./modifydash',
          query:{
            mnId:mnid
          },
        })
      }
      else if (coinName == 'vds') {
        this.$router.push({
          path:'./modifyvds',
          query:{
            mnId:mnid
          },
        })
      }
      else if (coinName == 'snowgem') {
        this.$router.push({
          path:'./modifysnowgem',
          query:{
            mnId:mnid
          },
        })
      }
      
    },

    syncStateFormat(row, column) {
      if (row.SyncStatus === 1) {
        return row.SyncStatusEx
      } else  {
        return '进行中'
      } 
    },

    mnStateFormat(row, column) {
      if (row.Status === 2) {
        return '已过期'
      } else  {
        return row.MNStatus
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
      get(this.currentPage, this.pageSize).then(res => {
        this.tbLoading = false
        this.masternodeList = res.masternodelist
        //this.total = 6 //this.masternodeList.length
      })
      getcount().then(res => {
        if (res) {
          if (res.count === undefined) {
            this.total = 0
          }
          else {
            this.total = res.count
          }
        }
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
