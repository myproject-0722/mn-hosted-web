<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="主板模块">
        <!-- <el-cascader
          :options="options2"
          v-model="selectedOptions"
          clearable
          :props="cascaderProps"
          @change="handleChange"
          placeholder="请选择主题/模块"
        ></el-cascader>-->
      </el-form-item>
      <el-form-item label="内容标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容描述">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="form.desc"
        ></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="列表图片">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :with-credentials='true'
          accept='image/*'
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.img_Url" :src="form.img_Url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容">
        <Editor
          :serverUrl="imgUrl"
          :imgData="imgData"
          
          @changeContent="changeContent"
          ref="editor"
        ></Editor>
      </el-form-item>
      <!-- 富文本框 -->
      <!-- <quill-editor v-model="des" ref="myQuillEditor" :options="editorOption"></quill-editor> -->
    </el-form>
  </div>
</template>
<script>
// import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Editor from "@/components/editor";
export default {
  components: {
    Editor
  },
  data() {
    return {
      editorOption: {},
      des: "",
      content: "",
      imgUrl:`${process.env.VUE_APP_BASE_API}/common/upload`,
      form: {
        author: "久零",
        cid: 10,
        content: "",
        creadCount: 0,
        createBy: 1,
        createTime: "2019-09-07 23:32:30",
        delFlag: "0",
        desc:
          "2019年9月7日，经过一年多的准备，久零区块链专为电商系统打造的底层公链主网正式上线。这是零区块链里程碑式的进展，也标志着久零在区块链电商领域踏出的一大步，并为之后的区块链电商系统建设打下了坚实的基础。",
        id: 27,
        img_Url:
          "http://52.82.52.64:8888/group1/M00/00/01/rB8a-lzbc1qAJtziAAB7HvXUc9k248.jpg",
        publishFlag: "1",
        publishTime: "2019-09-07 23:32:42",
        tid: 17,
        title: "久零区块链主网上线",
        updateBy: 1,
        updateTime: "2019-09-10 21:16:01",
        usefulCount: 0,
        uselessCount: 0
      }
    };
  },
  computed: {
    data() {
      content: ""; //如果初始化从接口拿到显示的数据就复制给this.content
      // this.content = content;
    },
    // imgUrl() {
    //   // return "dapp/backmgr/dapp/open/uploadImg"; // 上传图片的接口地址
    //   return `${process.env.VUE_APP_BASE_API}/common/upload`
    // },
    imgData() {
      return { type: "img", token: "this.token" }; //上传图片除图片文件外需要的参数
    }
  },
  watch: {
    // 监听初始化是否有数据，有的话触发editor的getContent事件
    content(newVal, oldVal) {
      console.log(newVal, oldVal)
      this.$refs.editor.getContent(newVal);
    }
  },
  methods: {
    changeContent(value) {
      console.log(value)
      this.content = value;
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
  created() {
    console.log(this.$route.query.id);
    
  },
  mounted(){
    setTimeout(()=>{ console.log(123); this.content="<p>asdsadsad</p>";console.log(this) }, 1);
    
  }
};
</script>
<style lang="less" scoped>
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
</style>