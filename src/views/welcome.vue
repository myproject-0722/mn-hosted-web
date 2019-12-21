<template>

  <div class="dashboard-editor-container">
    <panel-group/>
    主节点收益
    <RewardsList/>
    订单列表
    <OrderList/>
  </div>

</template>
<script>
import PanelGroup from '@/components/MasterNodeCount'
import OrderList from '@/components/OrderList'
import RewardsList from '@/components/RewardsList'

export default {

  components: {
    PanelGroup,
    OrderList,
    RewardsList
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
