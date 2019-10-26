<template>
  <div>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" @keydown.enter.native="search" v-model="input" clearable style="width:20%;margin-right:5px"></el-input>
    <el-select v-model="search_status" clearable placeholder="运行状态" style="width:8%;margin-right:5px">
      <el-option key="-1" label="异常状态" :value="-1"></el-option>
      <el-option key="1" label="正常" :value="1"></el-option>
    </el-select>
    <el-select v-model="search_step" clearable placeholder="安装状态" style="width:8%;margin-right:5px">
      <el-option key="0" label="初始化" :value="0"></el-option>
      <el-option key="1" label="创建VPS" :value="1"></el-option>
      <el-option key="2" label="配置环境" :value="2"></el-option>
      <el-option key="3" label="启动程序" :value="3"></el-option>
      <el-option key="4" label="同步区块" :value="4"></el-option>
      <el-option key="100" label="安装完成" :value="100"></el-option>
    </el-select>
    <el-button type="primary" @click="search">搜索</el-button>

    <!-- 列表展示 -->
    <el-table v-loading="tbLoading" :data="nodesList" border style="width: 100%; margin-top:5px">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="custId" label="客户ID"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="userId" label="用户ID"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="orderId" label="订单ID" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="ip" label="IP地址" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="vpsid" label="主机ID" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="create_time" label="IP地址" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="account" label="节点账户" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="status" label="节点状态" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <el-tag size="mini"
            :type="scope.row.status === '1' ? 'success' : 'danger'"
            disable-transitions>{{scope.row.status === '1' ? '正常' : '异常'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="step" label="安装状态" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <el-tag size="mini"
            disable-transitions>{{scope.row.step|nodeStep}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="maturityTime" label="到期时间" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          {{scope.row.maturityTime|dateFormat}}
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
import { nodePage } from '@/api/nodes'

export default {
  data () {
    return {
      search_status: null,
      search_step: null,
      tbLoading: false,
      // 数据列表
      nodesList: [],
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
      nodePage(this.currentPage, this.pageSize, this.input, this.search_status, this.search_step).then(res => {
        this.tbLoading = false
        this.nodesList = res.t.records
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
