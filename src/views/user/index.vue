<template>
  <div class="dashboard-container">
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" @keydown.enter.native="search" v-model="input" clearable style="width:20%;padding-bottom:5px"></el-input>
    <el-button type="primary" @click="search">搜索</el-button>
    <!-- 列表展示 -->
    <el-table :data="userList" stripe border style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="name" label="会员名称"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="custName" label="所属客户名称"  align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" :show-overflow-tooltip='true'></el-table-column>
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
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editUser(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 用户信息编辑对话框 -->
    <el-dialog title="用户信息编辑" :visible.sync="dialogFormVisible" @close="Initialize" center>
      <el-form :model="userInfo" :rules="rules" ref="editForm">
        <el-form-item label="会员名称" :label-width="'120px'" prop="name">
          <el-input v-model="userInfo.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属客户名称" :label-width="'120px'" prop="custName">
          <el-input v-model="userInfo.custName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="'120px'" prop="phone">
          <el-input v-model="userInfo.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="'120px'" prop="email">
          <el-input v-model="userInfo.email" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
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
// import moment from "moment";
import { getUserList, changeUserState, editUserInfo } from '@/api/sms'
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
      userList: [],
      currentPage: 1,
      pageSize: 10,
      input: '',
      total: 0,
      dialogFormVisible: false,
      userInfo: {
        name: '',
        custName: '',
        phone: '',
        email: '',
        cust_id: '',
        id: ''
      },
      rules: {
        custName: [
          { required: true, message: '请填写所属客户名称', trigger: 'blur' },
          { validator: isempty, trigger: 'blur'}
        ],
        name: [
          { required: true, message: '请填写会员名称', trigger: 'blur' },
          { validator: isempty, trigger: 'blur'}
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[345678]\d{9}$/,
            message: '请填写正确的办公号码(11位数字)',
            trigger: 'blur'
          }
        ],
        email: [
          {
            // required: true,
            message: '请填写正确的邮箱格式',
            trigger: 'blur',
            pattern: /\w+[@]\w+[.]\w{2,3}/
          }
        ]
      }
    }
  },
  methods: {
    // 关闭对话框时清空上一次的验证提示
    Initialize () {
      this.$refs.editForm.resetFields()
    },
    // 修改用户信息
    editUser (info) {
      console.log(info)
      let { custName, email, name, phone, custId, id } = info
      this.userInfo.custName = custName
      this.userInfo.email = email
      this.userInfo.name = name
      this.userInfo.phone = phone
      this.userInfo.cust_id = custId
      this.userInfo.id = id
      console.log(this.userInfo)
      this.dialogFormVisible = true
    },
    editUserInfo () {
      let editInfo = JSON.parse(JSON.stringify(this.userInfo))
      delete editInfo.custName
      console.log(editInfo)

      this.$refs.editForm.validate(valid => {
        if (valid) {
          editUserInfo(editInfo).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.$message({
                message: res.t,
                type: 'success'
              })
              this.init()
            }
          })
          this.dialogFormVisible = false
        }
      })
    },
    // 改变用户状态
    changeState (id) {
      // console.log(id);
      changeUserState(id).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message({
            message: res.t,
            type: 'success'
          })
        }
      })
    },
    // 改变每页数据数量
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.init()
    },
    // 改变当前页数
    handleCurrentChange (val) {
      this.currentPage = val
      this.init()
    },
    // 条件搜索
    search () {
      this.currentPage = 1
      this.init()
    },
    init () {
      this.loading = true
      getUserList(this.currentPage, this.pageSize, this.input).then(res => {
        this.loading = false
        console.log(res)
        res.t.records.forEach(i => {
          i.useFlag === '1' ? (i.useFlag = true) : (i.useFlag = false)
        })

        // console.log(res.t.records);
        this.userList = res.t.records
        this.total = res.t.total
      })
    }
  },
  mounted () {
    // 数据初始化
    this.init()
  }
}
</script>

<style lang="less" scoped>
.dashboard {
  dashboard-container {
    margin: 30px;
  }
}
</style>
