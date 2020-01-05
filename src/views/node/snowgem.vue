<template>
  <el-form ref="form" :model="form" label-width="160px">
  <el-form-item>
    请输入主节点备注名称(如mn01)
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item>
    请输入主节点密钥
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
      <el-option label="一天" value="1">一天 (需要花费￥:{{dprice}}元)</el-option>
      <el-option label="一个月" value="2">一月 (需要花费￥:{{mprice}}元)</el-option>
      <el-option label="一年" value="3">一年天 (需要花费￥:{{yprice}}元)</el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

</template>

<script>
import { createSnowgem } from '@/api/masternode'
import { getCoinInfo } from '@/api/nodes'

  export default {
    data() {
      return {
        form: {
          name: '',
          mnkey: '',
          txid: '',
          txindex: '',
          expiretimetype: ''
        },
        dprice: 0.0,
        mprice: 0.0,
        yprice: 0.0
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        createSnowgem(this.form.name, this.form.mnkey, this.form.txid, this.form.txindex, this.form.expiretimetype).then(res => {
          //this.$router.push({ name: 'home' })
          //window.open(href, res.payUrl);
          //this.$router.push({ name: 'home/masternodeList' })
          window.location.href =res.payUrl; //  跳转链接
        })
        .catch(err => {
          this.$message.error('登录失败:' + err)
        })
      },
      // 获取初始信息
      init () {
        getCoinInfo("vds").then(res => {
          this.dprice = res.coin.DPrice
          this.mprice = res.coin.MPrice
          this.yprice = res.coin.YPrice
        })
      }
    },
    mounted () {
      this.init()
    }
  }
</script>