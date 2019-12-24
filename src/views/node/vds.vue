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
    <el-select v-model="form.expiretimetype" placeholder="请选择有效期">
      <el-option label="一天" value="1"></el-option>
      <el-option label="一个月" value="2"></el-option>
      <el-option label="一年" value="3"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

</template>

<script>
import { create } from '@/api/masternode'

  export default {
    data() {
      return {
        form: {
          mnkey: '',
          expiretimetype: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        create("vds", this.form.mnkey, this.form.expiretimetype).then(res => {
          //this.$router.push({ name: 'home' })
          //window.open(href, res.payUrl);
          //this.$router.push({ name: 'home/masternodeList' })
          window.location.href =res.payUrl; //  跳转链接
        })
        .catch(err => {
          this.$message.error('登录失败:' + err)
        })
      }
    }
  }
</script>