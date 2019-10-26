<template>
  <div>
    <!-- 搜索功能 -->
    <el-input
      placeholder="请输入内容"
      @keydown.enter.native="search"
      v-model="input"
      clearable
      style="width:20%;padding-bottom:5px"
    ></el-input>
    <el-button type="primary" @click="search">搜索</el-button>
    <el-button type="primary" style="padding-left:20px" @click="add_dialogForm=true">添加产品</el-button>
    <!-- 显示详细信息对话框 -->
    <el-dialog title="产品详情" :visible.sync="show_dialogForm" @close="show_Initialize" center>
      <!-- <el-form :model="showForm" ref="showProductForm">
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="showForm.name" auto-complete="off" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="所属顾客" prop="cust_id">
          <el-select v-model="showForm.cust_id" disabled placeholder="请选择">
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.custName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品描述" prop="desc">
          <el-input v-model="showForm.desc" auto-complete="off" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="节点类型">
          <el-input v-model="showForm.node_type" auto-complete="off" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="产品价格" prop="base_price">
          <el-input v-model="showForm.base_price" auto-complete="off" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="计费方式" prop="type">
          <el-select v-model="showForm.type" disabled placeholder="请选择">
            <el-option
              v-for="item2 in editForm_type"
              :key="item2.id"
              :label="item2.name"
              :value="item2.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参与的活动" prop="activity_id">
          <el-select v-model="showForm.activity_id" disabled placeholder="请选择">
            <el-option
              v-for="item1 in activityList"
              :key="item1.id"
              :label="item1.promotionName"
              :value="item1.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品参数">
          <el-input v-model="showForm.param" auto-complete="off" style="width:400px"></el-input>
        </el-form-item>
      </el-form>-->
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">产品名称</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{showForm.name}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">产品描述</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{showForm.desc}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">所属顾客名称</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{showForm.custName}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">基础价格</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{showForm.base_price}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">计费方式</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{showForm.type | fromType}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">节点类型</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{showForm.node_type}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">参数</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{showForm.param}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">创建时间</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{showForm.createTime}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">更新时间</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{showForm.updateTime}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">促销活动名称</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{showForm.promotionName}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">促销活动价格</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{showForm.promotionPrice}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">促销活动开始时间</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{showForm.startPromotionTime}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">促销活动结束时间</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{showForm.endPromotionTime}}</div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="show_dialogForm = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 添加产品对话框 -->

    <el-dialog title="产品添加" :visible.sync="add_dialogForm" @close="add_Initialize" center>
      <el-form :model="addForm" :rules="addProductRules" ref="addProductForm" label-width="100px">
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属顾客" prop="cust_id">
          <el-select v-model="addForm.cust_id" filterable placeholder="请选择">
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.custName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品描述" prop="desc">
          <el-input v-model="addForm.desc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="节点类型">
          <el-input v-model="addForm.node_type" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品价格" prop="base_price">
          <el-input v-model="addForm.base_price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="计费方式" prop="type">
          <el-select v-model="addForm.type" placeholder="请选择计费方式">
            <el-option label="每天" value="0"></el-option>
            <el-option label="每月" value="1"></el-option>
            <el-option label="每年" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品参数">
          <el-input v-model="addForm.param" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="add_dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="addProduct">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 更新产品信息对话框 -->
    <el-dialog title="修改产品" :visible.sync="edit_dialogForm" @close="edit_Initialize" center>
      <el-form :model="editForm" :rules="addProductRules" ref="editProductForm" label-width="100px">
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属顾客" prop="cust_id">
          <el-select v-model="editForm.cust_id" filterable placeholder="请选择">
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.custName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品描述" prop="desc">
          <el-input v-model="editForm.desc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="节点类型">
          <el-input v-model="editForm.node_type" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品价格" prop="base_price">
          <el-input v-model="editForm.base_price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="计费方式" prop="type">
          <el-select v-model="editForm.type" placeholder="请选择">
            <el-option
              v-for="item2 in editForm_type"
              :key="item2.id"
              :label="item2.name"
              :value="item2.id"
            ></el-option>
            <!-- <el-option label="每月" value="1"></el-option>
            <el-option label="每年" value="2"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item label="参与的活动" prop="activity_id">
          <el-select v-model="editForm.activity_id" clearable filterable placeholder="请选择">
            <el-option
              v-for="item1 in activityList"
              :key="item1.id"
              :label="item1.promotionName"
              :value="item1.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品参数">
          <el-input v-model="editForm.param" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit_dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="editProductInfo">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 产品列表展示 -->
    <el-table :data="productList" stripe border style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column prop="name" label="产品名称" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="desc" label="产品描述" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="custName" label="所属顾客名称" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="basePrice" label="基础价格" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="type" label="计费方式" align="center" :show-overflow-tooltip='true'>
        <template slot-scope="scope">{{ scope.row.type | fromType }}</template>
      </el-table-column>
      <el-table-column prop="promotionName" label="促销活动名称" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="promotionPrice" label="促销活动价格" align="center" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="详细信息" placement="top">
            <el-button type="primary" size="small" @click="showProduct(scope.row)">详情</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="showEditProduct(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" size="small" icon="el-icon-delete" @click="del_Product(scope.row.id)"></el-button>
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
  addProduct,
  getProductList,
  getCustomerIdList,
  delProduct,
  getActivityList,
  editProductInfo
} from '@/api/product.js'
export default {
  filters: {
    fromType: function (type) {
      if (type === 0) {
        return '每天'
      } else if (type === 1) {
        return '每月'
      } else if (type === 2) {
        return '每年'
      } else {
        return '请重新选择'
      }
    }
  },
  data () {
    var validatePass = (rule, value, callback) => {
      console.log(value)
      if (value == 0 || value == 1 || value == 2) {
        callback()
      } else {
        callback(new Error('请重新选择计费方式'))
      }
    }
    var isempty = (rule, value, callback) => {
      if (value.trim()) {
        callback()
      } else {
        callback(new Error('该项不能为空'))
      }
    }
    return {
      loading: false,
      activityList: [],
      customerList: [],
      show_dialogForm: false,
      add_dialogForm: false,
      edit_dialogForm: false,
      editForm_type: [
        { id: 0, name: '每天' },
        { id: 1, name: '每月' },
        { id: 2, name: '每年' }
      ],
      showForm: {
        id: '',
        name: '',
        cust_id: '',
        desc: '',
        node_type: '',
        base_price: '',
        type: '',
        activity_id: '',
        param: '',
        custName: '',
        createTime: '',
        updateTime: '',
        promotionName: '',
        promotionPrice: '',
        startPromotionTime: '',
        endPromotionTime: ''
      },
      addForm: {
        name: '',
        cust_id: '',
        desc: '',
        node_type: '',
        base_price: '',
        type: '',
        param: ''
      },
      editForm: {
        id: '',
        name: '',
        cust_id: '',
        desc: '',
        node_type: '',
        base_price: '',
        type: '',
        activity_id: '',
        param: ''
      },
      //   产品列表展示
      productList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      input: '',
      //   添加产品规则
      addProductRules: {
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { validator: isempty, trigger: 'blur'}
          ],
        cust_id: [
          { required: true, message: '请选择所属顾客', trigger: 'change' },
          { validator: isempty, trigger: 'blur'}
        ],
        desc: [{ required: true, message: '请输入产品描述', trigger: 'blur' },
        { validator: isempty, trigger: 'blur'}],
        base_price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          {
            pattern: /^\d+(\.\d+)?$/,
            message: '请填写正确的价格数字',
            trigger: 'blur'
          }
        ],
        type: [
          { required: true, message: '请选择计费方式', trigger: 'change' },
          {
            validator: validatePass,
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    show_Initialize () {
      for (let key in this.showForm) {
        this.showForm[key] = ''
      }
    },
    showProduct (row) {
      console.log(row)
      let {
        id,
        name,
        custId,
        desc,
        basePrice,
        type,
        activityId,
        params,
        nodeType,
        custName,
        createTime,
        updateTime,
        promotionName,
        promotionPrice,
        startPromotionTime,
        endPromotionTime
      } = row
      this.showForm.id = id
      this.showForm.name = name
      this.showForm.cust_id = custId
      this.showForm.desc = desc
      this.showForm.base_price = basePrice
      this.showForm.activity_id = activityId
      this.showForm.type = type
      this.showForm.param = params
      this.showForm.node_type = nodeType
      this.showForm.custName = custName
      this.showForm.createTime = this.timeType(createTime)
      this.showForm.updateTime = this.timeType(updateTime)
      this.showForm.promotionName = promotionName
      this.showForm.promotionPrice = promotionPrice
      this.showForm.startPromotionTime = this.timeType(startPromotionTime)
      this.showForm.endPromotionTime = this.timeType(endPromotionTime)
      this.show_dialogForm = true
    },
    // 时间格式转换
    timeType (time) {
      if (time) {
        let standardDate = new Date(time)
        let year = standardDate.getFullYear()
        let month = standardDate.getMonth() + 1
        let day = standardDate.getDate()
        let hour = standardDate.getHours()
        let minute = standardDate.getMinutes()
        let second = standardDate.getSeconds()
        let formatting =
          year +
          '/' +
          month +
          '/' +
          day +
          ' ' +
          hour +
          ':' +
          minute +
          ':' +
          second
        return formatting
      }
    },
    add_Initialize () {
      this.addForm.node_type = ''
      this.addForm.param = ''
      this.$refs.addProductForm.resetFields()
    },
    // 当修改对话框关闭时清空数据
    edit_Initialize () {
      setTimeout(function () {
        for (let key in this.editForm) {
          this.editForm[key] = ''
        }
      }, 0)
      this.$refs.editProductForm.resetFields()
    },
    // 获取顾客列表
    getCustomerIdList () {
      getCustomerIdList().then(res => {
        // console.log(res);
        this.customerList = res.t
      })
    },
    // 删除产品
    del_Product (id) {
      this.$confirm('是否删除该产品?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delProduct(id).then(res => {
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
    getActivityList () {
      getActivityList().then(res => {
        console.log(res)
        if (res.code === 200) {
          this.activityList = res.t
        }
      })
    },
    showEditProduct (row) {
      console.log(row)
      let {
        id,
        name,
        custId,
        desc,
        basePrice,
        type,
        activityId,
        params,
        nodeType
      } = row
      this.editForm.id = id
      this.editForm.name = name
      this.editForm.cust_id = custId
      this.editForm.desc = desc
      this.editForm.base_price = basePrice
      this.editForm.activity_id = activityId
      this.editForm.type = type
      this.editForm.node_type = nodeType
      this.editForm.param = params
      this.edit_dialogForm = true
    },
    editProductInfo () {
      console.log(this.editForm)

      this.$refs.editProductForm.validate(va => {
        console.log(va)
        if (va) {
          editProductInfo(this.editForm).then(res => {
            this.edit_dialogForm = false
            console.log(res)
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.init()
            }
          })
        }
      })
    },
    // 添加产品
    addProduct () {
      console.log(this.addForm)
      this.$refs.addProductForm.validate(valid => {
        console.log(valid)
        if (valid) {
          addProduct(this.addForm).then(res => {
            this.add_dialogForm = false
            console.log(res)
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              })

              this.init()
            }
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
      getProductList(this.input, this.currentPage, this.pageSize).then(res => {
        this.loading = false
        console.log(res)
        this.productList = res.t.records
        this.total = res.t.total
      })
    }
  },
  mounted () {
    this.init()
    this.getCustomerIdList()
    this.getActivityList()
  }
}
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 2px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
  line-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
