<template>
  <div class="app-container">
    <el-row style="margin-bottom: 15px;">
      <el-button type="primary" @click="showDialog(form, null)">新增</el-button>


        <el-select v-model="themeId" placeholder="请选择主题" style="margin-left:5px">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary" style="margin-left:5px" @click="fetchData" plain>搜索</el-button>
    </el-row>



    <el-dialog title="板块编辑" :visible.sync="dialogFormVisible">
      <el-form ref="form" :rules="rules" :model="form">
        <el-input v-show="false" v-model="form.id" autocomplete="off" />
        <el-form-item label="主题名称" prop="tid" :label-width="formLabelWidth">
          <el-select v-model="form.tid" placeholder="请选择主题">
            <el-option v-for="item in options" :label="item.name" :value="item.id" :key="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="板块名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="板块说明" prop="desc" :label-width="formLabelWidth">
          <el-input v-model="form.desc" autocomplete="off" />
        </el-form-item>
        <el-form-item label="板块图片" prop="imgUrl" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :with-credentials='true'
            :name="'myFile'"
            :action="serverUrl"
            :show-file-list="false"
            accept='image/*'
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
          >
            <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddOrUpdate()">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="板块名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="板块说明" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="板块图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" width="100">
        </template>
      </el-table-column>
      <el-table-column label="所属主题" align="center">
        <template slot-scope="scope">
          {{ scope.row.themeName }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime|dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="update_at" label="更新时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updateTime|dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

  </div>
</template>

<script>
import { getList, addCategory, getCategory, editCategory, deleteCategory } from '@/api/cms/category'
import { getThemeOptions } from '@/api/cms/theme'

export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      total: 0,
      list: [],
      listLoading: true,
      dialogFormVisible: false,
      loading: false,
      themeId: '',
      themeOptions: [],
      options: [],
      form: {
        id: '',
        tid: '',
        name: '',
        desc: '',
        imgUrl: ''
      },
      formLabelWidth: '120px',
      serverUrl: `${process.env.VUE_APP_BASE_API}/common/upload`,
      rules: {
        tid: [
          { required: true, message: '请选择主题名称', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入板块名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入板块说明', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请选择板块图片', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
    getThemeOptions().then(response => {
      console.log(response)
      this.options = response.t
    })
  },
  methods: {
    handleUploadSuccess(res, file) {
      this.form.imgUrl = res.data.filename
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2


      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return
      }

      return isLt2M
    },

    showDialog(form, data) {
      getThemeOptions().then(response => {
        
        this.options = response.data
        console.log(this.options)
      })
      if (data === null || data === '') {
        form.id = ''
        form.tid = ''
        form.name = ''
        form.desc = ''
        form.imgUrl = ''
      } else {
        form.id = data.id
        form.tid = data.tid
        form.name = data.name
        form.desc = data.desc
        form.imgUrl = data.imgUrl
      }
      this.dialogFormVisible = true
    },
    handleEdit(index, row) {
      getCategory(row.id).then(response => {
        if(response.success){
          let arr = response.t
          this.showDialog(this.form, arr[0])
        }
        
      })
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        deleteCategory(row.id).then(response => {
          if(response.success){
            this.fetchData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }else{
            this.$message.error('删除失败!')
          }
          
        })

      })
    },
    handleAddOrUpdate() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.listLoading = true
          if (this.form.id === null || this.form.id === '') {
            addCategory(this.form).then(response => {
              this.fetchData()
            })
          } else {
            editCategory(this.form).then(response => {
              this.fetchData()
            })
          }
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        } else {
          return false
        }
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        getThemeOptions(query).then(response => {
          this.themeOptions = response.data
          this.loading = false;
        })
      } else {
        this.themeOptions = [];
      }
    },

    handleSizeChange: function(size) {
      this.pagesize = size
      this.fetchData()
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getList(this.themeId, this.currentPage, this.pagesize).then(response => {
        console.log(response)
        if(response.success){
          this.list = response.t.records
          this.total = response.t.total
        }
        this.listLoading = false
      })
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.page{
  margin-top: 10px;
}
</style>
