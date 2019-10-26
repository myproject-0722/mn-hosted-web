<template>
  <div>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" @keydown.enter.native="search" v-model="input" clearable style="width:20%;padding-bottom:5px"></el-input>
    <el-button type="primary" @click="search">搜索</el-button>

    <el-button type="primary" @click="add_dialogForm =true" style="padding-left:20px">添加客户</el-button>
    <!-- 添加顾客对话框 -->
    <el-dialog title="添加客户" :visible.sync="add_dialogForm" @close="add_Initialize" center>
      <el-form :model="newCustomer" :rules="rules" ref="add_ruleForm">
        <el-form-item label="客户名" :label-width="'120px'" prop="custName">
          <el-input v-model="newCustomer.custName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户简称" :label-width="'120px'" prop="custShortName">
          <el-input v-model="newCustomer.custShortName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="办公电话" :label-width="'120px'" prop="contactTel">
          <el-input v-model="newCustomer.contactTel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="'120px'" prop="contactName">
          <el-input v-model="newCustomer.contactName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" :label-width="'120px'" prop="companyAddress">
          <el-input v-model="newCustomer.companyAddress" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="add_dialogForm = false;newCustomer = {}">取 消</el-button>
        <el-button type="primary" @click="addCustomer">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 列表展示 -->
    <el-table :data="customerList" stripe border style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="custName" label="客户名称"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="contactName" label="联系人"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="contactTel" label="电话" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="companyAddress" label="地址" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column label="是否启用" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.useFlag"
            @change="changeState(scope.row.id)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button size="small" type="primary" icon="el-icon-edit" @click="showEditCustomer(scope.row)"></el-button>
          </el-tooltip>
          <el-button size="small" type="primary" @click="paramEdit(scope.row.id)">参数</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 客户信息编辑对话框 -->

    <el-dialog title="信息编辑" :visible.sync="edit_dialogForm" @close="edit_Initialize" center>
      <el-form :model="editCustomer" :rules="rules" ref="edit_ruleForm">
        <el-form-item label="客户名" :label-width="'120px'" prop="custName">
          <el-input v-model="editCustomer.custName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户简称" :label-width="'120px'" prop="custShortName">
          <el-input v-model="editCustomer.custShortName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="办公电话" :label-width="'120px'" prop="contactTel">
          <el-input v-model="editCustomer.contactTel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="'120px'" prop="contactName">
          <el-input v-model="editCustomer.contactName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" :label-width="'120px'" prop="companyAddress">
          <el-input v-model="editCustomer.companyAddress" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="edit_dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="editCustomerInfo">确 定</el-button>
      </div>
    </el-dialog>

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
import { getCustomerList, changeCustomerState, addNewCustomer, editCustomerInfo } from '@/api/sms'

export default {
  data () {
    var isempty = (rule, value, callback) => {
      if (value.trim()) {
        callback()
      } else {
        callback(new Error('该项不能为空'))
      }
    }
    return {
      loading: false,
      // 数据列表
      customerList: [],
      // 搜索条件
      input: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      add_dialogForm: false,
      edit_dialogForm: false,
      newCustomer: {
        custName: '',
        custShortName: '',
        contactTel: '',
        contactName: '',
        companyAddress: ''
      },
      editCustomer: {
        custName: '',
        custShortName: '',
        contactTel: '',
        contactName: '',
        companyAddress: ''
      },
      rules: {
        custName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' },
          { validator: isempty, trigger: 'blur'}
        ],
        custShortName: [
          { required: true, message: '请输入客户简称', trigger: 'blur' },
          { validator: isempty, trigger: 'blur'}
        ],
        contactTel: [
          { required: true, message: '请输入办公电话', trigger: 'blur' },
          {
            pattern: /^1[345678]\d{9}$/,
            message: '请填写正确的办公号码(11位数字)',
            trigger: 'blur'
          }
        ],
        contactName: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { validator: isempty, trigger: 'blur'}
        ],
        companyAddress: [
          { required: true, message: '请输入公司地址', trigger: 'blur' },
          { validator: isempty, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 关闭对话框时清空上一次的验证提示
    add_Initialize () {
      this.$refs.add_ruleForm.resetFields()
    },
    edit_Initialize () {
      this.$refs.edit_ruleForm.resetFields()
    },
    addCustomer () {
      console.log(this.newCustomer)
      this.$refs.add_ruleForm.validate(valid => {
        console.log(valid)
        if (valid) {
          addNewCustomer(this.newCustomer).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.currentPage = 1
              this.init()
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
              this.currentPage = 1
              this.init()
            }
            this.newCustomer = {}
            this.add_dialogForm = false
          })
            .catch(err => {
              console.log(err)
            })
        }
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
    },
    // 展示要修改的客户数据
    showEditCustomer (row) {
      console.log(row)
      let {
        custName,
        custShortName,
        contactTel,
        contactName,
        companyAddress,
        id
      } = row
      this.editCustomer.custName = custName
      this.editCustomer.custShortName = custShortName
      this.editCustomer.contactTel = contactTel
      this.editCustomer.contactName = contactName
      this.editCustomer.companyAddress = companyAddress
      this.editCustomer.id = id
      console.log(this.editCustomer)
      this.edit_dialogForm = true
    },
    // 点击确认修改
    editCustomerInfo () {
      this.$refs.edit_ruleForm.validate(valid => {
        console.log(valid)
        if (valid) {
          editCustomerInfo(this.editCustomer).then(res => {
            console.log(res)
            this.edit_dialogForm = false
            if (res.code === 200) {
              this.$message({
                message: res.t,
                type: 'success'
              })
              this.init()
            }
          })
        }
      })
    },
    // 条件搜索
    search () {
      this.currentPage = 1
      this.init()
    },
    // 状态改变
    changeState (id) {
      console.log(id)
      changeCustomerState(id).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message({
            message: res.t,
            type: 'success'
          })
        }
      })
    },
    paramEdit (custId) {
      this.$router.push('/home/customerParameter?custId=' + custId)
    },
    // 列表展示
    init () {
      this.loading = true
      getCustomerList(this.currentPage, this.pageSize, this.input).then(res => {
        this.loading = false
        // console.log(res);
        // let customerList = []
        res.t.records.forEach(i => {
          if (i.delFlag === '0') {
            // console.log(i);
            // customerList.push(i);
          }
          i.useFlag === '1' ? (i.useFlag = true) : (i.useFlag = false)
        })
        // console.log(customerList);
        console.log(res.t.records)
        this.customerList = res.t.records
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
