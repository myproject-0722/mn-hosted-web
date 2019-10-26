<template>
  <div>
    <el-table
      :data="performanceDetailsList"
      style="width: 100%"
      stripe
      border
      v-loading="loading"
    >
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column label="转账用户id" prop="userId" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="转账地址" prop="account" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="绩效值" prop="score" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="发放金额" prop="amount" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="描述" prop="userDesc" align="center" :show-overflow-tooltip="true"></el-table-column>
    </el-table>
    <el-button  size="small" round @click="backPage">返回</el-button>
  </div>
</template>
<script>
import { performanceDetailById } from "@/api/fund.js"
export default {
  data () {
    return {
      performanceDetailsList: [],
      loading:false
    }
  },
  methods: {
    backPage () {
      this.$router.go(-1)
    }
  },
  created() {
    console.log(this.$route.query.id);
    this.loading = true
    performanceDetailById(this.$route.query.id).then(res =>{
      this.loading =false
      console.log(res)
      this.performanceDetailsList = res.t
    })
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
</style>
