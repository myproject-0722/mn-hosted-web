<template>
  <el-form ref="form" :model="form" label-width="160px">
  <el-form-item>
    请输入主节点备注名称(如mn01)
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item>
    请输入主节点密钥(钱包需要有10000UTXO地址,不需要输入UTXO私钥地址相同，可重新生成一份)
    <el-input v-model="form.mnkey"></el-input>
  </el-form-item>
  <el-form-item>
    请输入交易ID(10000UTXO的交易ID)
    <el-input v-model="form.txid"></el-input>
  </el-form-item>
  <el-form-item>
    请输入交易序号(getrawtransaction获取)
    <el-input v-model="form.txindex"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即修改</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

</template>

<script>
import { modifySnowgem } from '@/api/masternode'

  export default {
    data() {
      return {
        form: {
          name: '',
          mnkey: '',
          txid: '',
          txindex: '',
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
        modifySnowgem(this.mnid, this.form.name, this.form.mnkey, this.form.txid, this.form.txindex).then(res => {
          this.$message.info('修改成功!')
          this.$router.push({path:'/home/masternodeList'})
        })
        .catch(err => {
          this.$message.error('修改失败:' + err)
        })
      }
    }
  }
</script>