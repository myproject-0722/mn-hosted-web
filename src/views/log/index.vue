<template>
  <div class="log">
    <el-input
      placeholder="请输入模块"
      @keydown.enter.native="search"
      v-model="searchInfo.model"
      clearable
      style="width:150px;padding-bottom:5px"
    ></el-input>
    <el-input
      placeholder="请输入方法名"
      @keydown.enter.native="search"
      v-model="searchInfo.aopMethod"
      clearable
      style="width:150px;padding-bottom:5px"
    ></el-input>
    <el-input
      placeholder="请输入错误信息"
      @keydown.enter.native="search"
      v-model="searchInfo.erroeMessage"
      clearable
      style="width:150px;padding-bottom:5px"
    ></el-input>
    <el-date-picker v-model="searchInfo.startTime" type="datetime" placeholder="选择开始日期"></el-date-picker>
    <el-date-picker v-model="searchInfo.endTime" type="datetime" placeholder="选择结束日期"></el-date-picker>
    <el-button size="small" type="primary" @click="search">搜索</el-button>
    <el-button size="small" type="primary" @click="handleDownload">导出Excel</el-button>
    <el-select
      v-model="searchInfo.seq"
      @change="orderChange"
      placeholder="排序顺序"
      style="width:120px;margin-left:10px;"
    >
      <el-option v-for="item in timeOrder" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>

    <el-button type="danger" @click="del_logs" size="small">批量删除</el-button>

    <el-table
      :data="logList"
      stripe
      border
      style="width: 100%"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="model" label="模块" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="aopMethod" label="方法名" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="url" label="路径" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="targetClass" label="控制器" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="addr" label="请求者地址" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="parameterMap" label="请求参数" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.parameterMap|map2String}}</template>
      </el-table-column>
      <el-table-column prop="authCustomes" label="请求方" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="requestMethod" label="请求方式" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column
        prop="erroeMessage"
        label="错误信息"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="startTime" label="开始时间" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{ scope.row.startTime | timeFormat }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="del_log(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchInfo.currPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="searchInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { getLogList, delLogsById } from '@/api/log.js'
import { timeTpye } from '@/utils/utils.js'
import { stringify } from 'querystring'

export default {
  // filters: {
  //   timeType: function (time) {
  //     if (time) {
  //       return timeTpye(time)
  //     } else {
  //       return time
  //     }
  //   }
  // },
  data () {
    return {
      loading: false,
      total: 0,
      logList: [],
      timeOrder: [{ id: '0', name: '倒序' }, { id: '1', name: '正序' }],
      searchInfo: {
        model: '',
        aopMethod: '',
        erroeMessage: '',
        startTime: '',
        endTime: '',
        seq: '1',
        pageSize: 10,
        currPage: 1
      },
      delId: "",
      delIds: ""
    };
  },
  methods: {
    del_log (id) {
      console.log(id)
      this.$confirm('是否删除该日志?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delId = id
          console.log(this.delId)
          delLogsById(this.delId).then(res => {
            console.log(res)
            if (res.code === 200) {
              //
              this.$message({
                type: 'success',
                message: res.t
              })
              // 还要判断当前页是否还有数据
              this.searchInfo.currPage =
                Math.ceil((this.total - 1) / this.searchInfo.pageSize) >=
                this.searchInfo.currPage
                  ? this.searchInfo.currPage
                  : this.searchInfo.currPage - 1
              this.init()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    del_logs() {
      if (!this.delIds) {
        this.$message({
          type: "warning",
          message: "请先选择要删除的日志！"
        });
        return false
      }
      this.$confirm("是否删除这些日志?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(this.delIds)
          delLogsById(this.delIds).then(res => {
            console.log(res)
            
            if (res.code === 200) {
              //
              this.$message({
                type: 'success',
                message: res.t
              })
              // 还要判断当前页是否还有数据
              this.searchInfo.currPage =
                Math.ceil((this.total - 1) / this.searchInfo.pageSize) >=
                this.searchInfo.currPage
                  ? this.searchInfo.currPage
                  : this.searchInfo.currPage - 1
              this.init()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    orderChange(order) {
      //   console.log(order);
      this.searchInfo.seq = order;
      this.init();
    },
    handleSelectionChange (val) {
      // this.multipleSelection = val;
      let delLog = "";
      val.forEach(e => {
        // delLog = delLog + "," + e.id
        if (!delLog) {
          delLog = delLog + e.id;
        } else {
          delLog = delLog + "," + e.id;
        }
      })
      this.delIds = delLog
    },
    handleSizeChange (val) {
      this.searchInfo.currPage = 1
      this.searchInfo.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.searchInfo.currPage = val
      this.init()
    },
    search () {
      this.searchInfo.currPage = 1
      this.init()
    },
    init() {
      this.loading = true;
      getLogList(this.searchInfo).then(res => {
        this.loading = false;
        console.log(res);
        if (res.code == 200) {
          this.logList = res.t.recodes;
          this.total = res.t.total;
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    /**
     * 导出EXCEL
     */
    handleDownload() {
      this.loading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', 'IP', '方法', '客户', '错误信息','模块','请求方法','请求时间','控制器','路径']
        const filterVal = ['id', 'addr', 'aopMethod', 'authCustomes', 'erroeMessage','model','requestMethod','startTime','targetClass','url']
        const list = this.logList
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '日志导出',
          autoWidth: true,
          bookType: 'xlsx'
        })
        this.loading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
