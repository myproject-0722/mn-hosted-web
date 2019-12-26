<template>
  <el-form ref="form" :model="form" label-width="160px">
  <el-form-item>
    请输入BLS私钥(详情见https://docs.dash.org/zh_CN/stable/masternodes/setup.html)
    <el-input v-model="form.mnkey"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即修改</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

</template>

<script>
import { modifyDash } from '@/api/masternode'

  export default {
    data() {
      return {
        form: {
          mnkey: '',
          expiretimetype: '',
          mnid: 0
        }
      }
    },
    created:function(){
      this.getParams();
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    },
    methods: {
      getParams:function(){
        // 取到路由带过来的参数
        var routerParams = this.$route.query.mnId
        // 将数据放在当前组件的数据内
        console.log("传来的参数=="+routerParams)
        this.mnid = routerParams
      },
      onSubmit() {
        console.log('submit!');
        modifyDash(this.mnid, this.form.mnkey).then(res => {
          console.log(res);
          //this.$router.push({ name: 'home' })
          //window.open(href, res.payUrl);
          //this.$router.push({ name: 'home/masternodeList' })
          //window.location.href =res.payUrl; //  跳转链接
        })
        .catch(err => {
          this.$message.error('登录失败:' + err)
        })
      }
    }
  }
</script>