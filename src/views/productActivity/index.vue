<template>
  <div>
    <!-- 搜索功能 -->
    <el-input
      placeholder="请输入内容"
      v-model="input"
      @keydown.enter.native="search"
      clearable
      style="width:20%;padding-bottom:5px"
    ></el-input>
    <el-button type="primary" @click="search">搜索</el-button>
    <el-button type="primary" style="padding-left:20px" @click="add_dialogForm=true">添加活动</el-button>

    <!-- 添加产品对话框 -->

    <el-dialog title="活动添加" :visible.sync="add_dialogForm" @close="add_Initialize" center>
      <el-form
        :model="addForm"
        ref="addProductActivityForm"
        :rules="ProductActivityRules"
        label-position="right"
        label-width="130px"
      >
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动价格" prop="price">
          <el-input v-model="addForm.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动赠送vcl量" prop="vcl">
          <el-input v-model="addForm.vcl" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动开始时间" prop="start_time">
          <el-date-picker v-model="addForm.start_time" type="datetime" placeholder="选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束时间" prop="end_time">
          <el-date-picker v-model="addForm.end_time" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="add_dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="addActivity">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改产品对话框 -->

    <el-dialog title="修改活动" :visible.sync="edit_dialogForm" @close="edit_Initialize" center>
      <el-form
        :model="editForm"
        ref="editProductActivityForm"
        :rules="ProductActivityRules"
        label-position="right"
        label-width="130px"
      >
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动价格" prop="price">
          <el-input v-model="editForm.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动赠送vcl量" prop="vcl">
          <el-input v-model="editForm.vcl" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动开始时间" prop="start_time">
          <el-date-picker v-model="editForm.start_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束时间" prop="end_time">
          <el-date-picker v-model="editForm.end_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit_dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="editActivity">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 产品列表展示 -->
    <el-table :data="activityList" stripe border style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" align="center" ></el-table-column>
      <el-table-column prop="promotionName" label="活动名称" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="promotionPrice" label="活动价格" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="promotionVcl" label="活动赠送vcl量" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="startPromotionTime" label="活动开始时间" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">{{ scope.row.startPromotionTime | timeFormat }}</template>
      </el-table-column>
      <el-table-column prop="endPromotionTime" label="活动结束时间" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">{{ scope.row.endPromotionTime | timeFormat }}</template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="showEditActivity(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="delProductActivity(scope.row.id)"
            ></el-button>
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
  </div>
</template>
<script>
import {
  getProductActivityList,
  addProductActivity,
  editProductActivity,
  delProductActivity
} from '@/api/productActivity.js'
// import { timeTpye } from '@/utils/utils.js'
export default {
  // filters: {
  //   timeType: function (time) {
  //     return timeTpye(time)
  //   }
  // },
  
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
      add_dialogForm: false,
      edit_dialogForm: false,
      editForm: {
        id: '',
        name: '',
        price: '',
        vcl: '',
        start_time: '',
        end_time: ''
      },
      addForm: {
        name: '',
        price: '',
        vcl: '',
        start_time: '',
        end_time: ''
      },
      activityList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      input: '',
      ProductActivityRules: {
        name: [
          { required: true, message: '请输入产品活动名称', trigger: 'blur' },
          { validator: isempty, trigger: 'blur'}
        ],
        price: [
          { required: true, message: '请输入活动价格', trigger: 'blur' },
          {
            pattern: /^\d+(\.\d+)?$/,
            message: '请填写正确的价格数字',
            trigger: 'blur'
          }
        ],
        vcl: [
          { required: true, message: '请输入vcl', trigger: 'blur' },
          {
            pattern: /^\d+$/,
            message: '请填写正确的vcl数字',
            trigger: 'blur'
          }
        ],
        start_time: [
          { required: true, message: '请选择活动开始时间', trigger: 'blur' }
        ],
        end_time: [
          { required: true, message: '请选择活动开始时间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 清空对话缓存
    edit_Initialize () {
      for (let key in this.editForm) {
        this.editForm[key] = ''
      }
      this.$refs.editProductActivityForm.resetFields()
    },
    // 清空对话缓存
    add_Initialize () {
      for (let key in this.addForm) {
        this.addForm[key] = ''
      }
      this.$refs.addProductActivityForm.resetFields()
    },
    // 展示要修改的活动
    showEditActivity (row) {
      console.log(row)
      let {
        id,
        promotionName,
        promotionPrice,
        promotionVcl,
        startPromotionTime,
        endPromotionTime
      } = row
      this.editForm.id = id
      this.editForm.name = promotionName
      this.editForm.price = promotionPrice
      this.editForm.vcl = promotionVcl
      this.editForm.start_time = new Date(startPromotionTime)
      this.editForm.end_time = new Date(endPromotionTime)
      this.edit_dialogForm = true
    },
    // 确认修改活动
    editActivity () {
      console.log(this.editForm)
      this.$refs.editProductActivityForm.validate(valid => {
        if (valid) {
          editProductActivity(this.editForm).then(res => {
            this.edit_dialogForm = false
            console.log(res)
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: res.t
              })
              this.init()
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
        }
      })
    },
    // 删除产品活动
    delProductActivity (id) {
      console.log(id)
      this.$confirm('是否删除该活动？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delProductActivity(id).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: res.t
              })
              // 还要判断当前页是否还有数据
              this.currentPage =
                Math.ceil((this.total - 1) / this.pageSize) >= this.currentPage
                  ? this.currentPage
                  : this.currentPage - 1
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
    // 添加活动
    addActivity () {
      console.log(this.addForm)
      this.$refs.addProductActivityForm.validate(valid => {
        if (valid) {
          addProductActivity(this.addForm)
            .then(res => {
              this.add_dialogForm = false
              console.log(res)
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.message
                })
                this.init()
              } else {
                this.$message({
                  type: 'warning',
                  message: res.message
                })
              }
            })
            .catch(err => {
              this.$message({
                type: 'warning',
                message: err.message
              })
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
    search () {
      this.currentPage = 1
      this.init()
    },
    init () {
      this.loading = true
      getProductActivityList(this.input, this.currentPage, this.pageSize).then(
        res => {
          this.loading = false
          console.log(res)
          this.activityList = res.t.records
          this.total = res.t.total
        }
      )
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
