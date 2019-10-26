<template>
  <div>

    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" v-model="searchKey" clearable style="width:20%;margin-right:5px"></el-input>
    <el-button type="primary" @click="search">搜索</el-button>
    <el-button type="primary" @click="dialogFormVisible=true">新增</el-button>

    <!-- 列表展示 -->
    <el-table v-loading="tbLoading" :data="accountList" border style="width: 100%; margin-top:5px">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="name" label="基金名称"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="custName" label="所属客户"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="fundAccount" label="账户地址"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="fundMnemonic" label="助记词" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="fundType" label="基金类型" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          {{scope.row.fundType|fundType}}
        </template>
      </el-table-column>
      <el-table-column prop="signCount" label="签名数量" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column label="是否启用" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isUse"
            @change="changeState(scope.row.id)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          {{scope.row.updateTime|dateFormat}}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditAccount(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button size="mini" type="primary" icon="el-icon-delete" @click="deleteAccount(scope.row.id)"></el-button>
          </el-tooltip>
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


    <el-dialog title="新增/编辑基金账户" :visible.sync="dialogFormVisible">
      <fm-generate-form 
        :data="jsonData" 
        :remote="remoteFuncs" 
        :value="editData" 
        ref="generateForm"
      >
      </fm-generate-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { selectAccountList, changeAccountStatus, createOrUpdateAccount, deleteAccountById } from '@/api/fund'
import { getCustomerList } from '@/api/sms'

export default {
  data () {
    return {
      dialogFormVisible: false,
      tbLoading: false,
      jsonData: {"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","customClass":"","disabled":true,"labelWidth":100,"isLabelWidth":false,"hidden":true,"dataBind":false,"showPassword":false,"remoteFunc":"func_1570593650722"},"name":"基金ID","key":"1570593650722","model":"id","rules":[{"type":"string","message":"基金ID格式不正确"}]},{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":true,"dataType":"string","pattern":"","placeholder":"输入基金名称","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1570547570325"},"name":"账户名称","key":"1570547570325","model":"name","rules":[{"type":"string","message":"账户名称格式不正确"},{"required":true,"message":"账户名称必须填写"}]},{"type":"select","icon":"icon-select","options":{"defaultValue":"","multiple":false,"disabled":false,"clearable":false,"placeholder":"选择基金类型","required":true,"showLabel":true,"width":"","options":[{"value":"1","label":"业绩基金"},{"value":"2","label":"生态基金"},{"value":"3","label":"团队基金"}],"remote":false,"filterable":false,"remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_1570549064476","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true},"name":"基金类型","key":"1570549064476","model":"fundType","rules":[{"required":true,"message":"基金类型必须填写"}]},{"type":"select","icon":"icon-select","options":{"defaultValue":"","multiple":false,"disabled":false,"clearable":false,"placeholder":"选择基金所属客户","required":true,"showLabel":true,"width":"","options":[{"value":"Option 1"},{"value":"Option 2"},{"value":"Option 3"}],"remote":true,"filterable":false,"remoteOptions":[],"props":{"value":"id","label":"name"},"remoteFunc":"loadCustList","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true},"name":"客户","key":"1570549334281","model":"custId","rules":[{"required":true,"message":"客户必须填写"}]},{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":true,"dataType":"string","pattern":"","placeholder":"输入控制钱包助记词","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1570549467205"},"name":"助记词","key":"1570549467205","model":"fundMnemonic","rules":[{"type":"string","message":"助记词格式不正确"},{"required":true,"message":"助记词必须填写"}]},{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":true,"dataType":"string","pattern":"","placeholder":"输入基金R地址","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1570549513829"},"name":"基金地址","key":"1570549513829","model":"fundAccount","rules":[{"type":"string","message":"基金地址格式不正确"},{"required":true,"message":"基金地址必须填写"}]},{"type":"number","icon":"icon-number","options":{"width":"","required":true,"defaultValue":0,"min":1,"max":5,"step":1,"disabled":false,"controlsPosition":"","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"remoteFunc":"func_1570549628833"},"name":"多签数量","key":"1570549628833","model":"signCount","rules":[{"required":true,"message":"多签数量必须填写"}]},{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"0.01","required":false,"dataType":"string","pattern":"","placeholder":"输入交易手续费","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1570549714823"},"name":"交易手续费","key":"1570549714823","model":"fee","rules":[{"type":"string","message":"交易手续费格式不正确"}]},{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1570549788474"},"name":"备注","key":"1570549788474","model":"remark","rules":[{"type":"string","message":"备注格式不正确"}]}],"config":{"labelWidth":100,"labelPosition":"right","size":"mini","customClass":""}},
      editData: {},
      remoteFuncs: {
            loadCustList (resolve) {
              // 客户 custId
              // 获取到远端数据后执行回调函数
              // resolve(data)
              getCustomerList(1, 100, null).then(res => {
                if(res.success){
                  let arr = res.t.records
                  arr.forEach(v => {
                    v.name=v.custName
                  })
                  resolve(arr)
                }
              })
            }
      },
      accountList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchKey: null
    }
  },
  methods: {

    handleSubmit () {
      this.$refs.generateForm.getData().then(data => {
        // 数据校验成功
        // data 为获取的表单数据
        console.log(data)
        data.foundType = Number(data.fundType)
        this.createOrUpdate(data)
      }).catch(e => {
        // 数据校验失败
        console.log('数据校验失败',e)
      })
    },
    //创建或者更新
    createOrUpdate(data) {
      this.tbLoading = true
      createOrUpdateAccount(data).then(res => {
        this.tbLoading = false
        console.log(res)
        if(res.success){
          this.$message.success('操作成功')
        }else{
          this.$message.warning(res.message)
        }
        this.init()
        this.dialogFormVisible = false
      })
    },
    //修改基金账户
    showEditAccount(data) {

      this.editData = data
      data.fundType = String(data.fundType)
      this.dialogFormVisible = true

    },

    search() {
      this.accountList = []
      this.currentPage = 1
      this.init()
    },

    /**
     * 加载数据
     */
    init() {
      this.tbLoading = true
      selectAccountList(this.currentPage, this.pageSize, this.searchKey).then(res => {
        this.tbLoading = false
        if(res.success){
          this.accountList = res.t.records
          this.total = res.t.total
          this.accountList.forEach(v => {
            if(v.useFlag === '0' || v.useFlag === 0){
              v.isUse = false
            }else {
              v.isUse = true
            }
          })
        }else {
          this.$message.warning(res.message)
        }
      })

    },
    changeState(id) {
      this.tbLoading = true
      changeAccountStatus(id).then(res => {
        this.tbLoading = false
        if (res.success) {
          this.$message.success('状态修改成功')
        } else {
          this.$message.warning('状态修改失败')
        }
        this.init()
      })
    },

    deleteAccount(id) {
      this.tbLoading = true
      deleteAccountById(id).then(res => {
        this.tbLoading = false
        if (res.success) {
          this.$message.success('删除成功')
        } else {
          this.$message.warning('删除失败')
        }
        this.init()
      })
    },

    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.init()
    }

  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
