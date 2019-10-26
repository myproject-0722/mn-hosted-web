<template>
  <div>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容"  v-model="searchStr" clearable style="width:20%;padding-bottom:5px;margin-right:5px"></el-input>
    <el-button type="primary" @click="search">搜索</el-button>
    <el-button type="primary" @click="add_dialogForm =true" style="padding-left:20px">添加参数</el-button>

        <!-- 添加参数对话框 -->
    <el-dialog title="添加参数" :visible.sync="add_dialogForm" center>
      <el-form :model="newParamForm" :rules="rules" ref="add_ruleForm">
        <el-form-item label="参数代码" :label-width="'120px'" prop="code">
          <el-input v-model="newParamForm.code" auto-complete="off" @change="checkCode"></el-input>
        </el-form-item>
        <el-form-item label="参数值" :label-width="'120px'" prop="value">
          <el-input v-model="newParamForm.value" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" :label-width="'120px'" prop="remark">
          <el-input v-model="newParamForm.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="add_dialogForm = false;newParamForm = {}">取 消</el-button>
        <el-button type="primary" @click="addCustomer">确 定</el-button>
      </div>
    </el-dialog>

    <el-table v-loading="listLoading" :data="paramList" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>

      <el-table-column width="200" align="center" label="参数代码">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="备注">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.remark" size="small" />
          </template>
          <span v-else>{{ row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200" label="参数值">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.value" size="small" />
          </template>
          <span v-else>{{ row.value }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="{row}">
          <el-button v-if="row.edit"
            size="small"
            icon="el-icon-refresh"
            type="warning"
            @click="cancelEdit(row)"
          >
            取消
          </el-button>
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            保存
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { parameterPage, searchParam, setCustomerParam } from '@/api/sms'

export default {
  data () {
    return {
      add_dialogForm: false,
      listLoading: false,
      custId: null,
      // 数据列表
      paramList: [],
      // 搜索条件
      searchStr: '',
      pageSize: 10,
      total: 0,
      newParamForm: {},
      rules: {
        code: [
          { required: true, message: '请输入参数代码，不能输入汉字', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请输入参数值', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入备注信息', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addCustomer () {
      this.$refs.add_ruleForm.validate(async valid => {
        if (valid) {
          this.listLoading = true
          const res = await setCustomerParam(this.custId, this.newParamForm.code, this.newParamForm.value, this.newParamForm.remark)
          if (res.success) {
            this.$message.success('参数修改成功')
          } else {
            this.$message.warning('参数修改失败')
          }
          this.listLoading = false
          this.add_dialogForm = false
          this.newParamForm = {}
          this.init()
        }
      })
    },
    checkCode (str) {
      var temp = ''
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255) { temp += str.charAt(i) }
      }
      this.newParamForm.code = temp
    },
    cancelEdit (row) {
      row.value = row.originalValue
      row.remark = row.orginalRemark
      row.edit = false
    },
    async confirmEdit (row) {
      row.edit = false
      row.originalValue = row.value
      row.orginalRemark = row.remark
      this.listLoading = true
      const res = await setCustomerParam(this.custId, row.code, row.value, row.remark)
      if (res.success) {
        this.$message.success('参数修改成功')
      } else {
        this.$message.warning('参数修改失败')
      }
      this.listLoading = false
    },
    search () {
      if (!this.searchStr) {
        return
      }
      searchParam(this.custId, this.searchStr).then(res => {
        if (res.success) {
          this.paramList = res.t
        } else {
          this.$message.warning(res.message)
        }
        console.log(res)
      }).catch(err => { this.$message.error(err) })
    },
    // 列表展示
    async init () {
      this.listLoading = true
      const { t } = await parameterPage(this.custId)
      this.paramList = t.map(v => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        v.originalValue = v.value //  will be used when user click the cancel botton
        v.orginalRemark = v.remark
        return v
      })
      this.listLoading = false
    }
  },
  created () {
    // this.custId = this.$route.query.custId
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less">
</style>
