<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <i class="iconfont icon-biaodan home-icon" ></i>
        </div>
        <div class="card-node-description">
          <div class="card-panel-text">
            订单数量
          </div>
          <CountTo :start-val="0" :end-val="orderNum" :duration="2000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="iconfont icon-shujutigonglaiyuan home-icon" ></i>
        </div>
        <div class="card-node-description">
          <div class="card-panel-text">
            总支出(￥)
          </div>
          <count-to :start-val="0" :end-val="payout" :duration="2000" :decimals='2' class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="iconfont icon-gonggongyinyongmokuai home-icon" ></i>
        </div>
        <div class="card-node-description">
          <div class="card-panel-text">
            主节点数量
          </div>
          <CountTo :startVal='0' :endVal='nodeCount' :duration='2000' class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getcount } from '@/api/masternode'
import { getorderinfo } from '@/api/order'
export default {
  components: {
    CountTo
  },
  data () {
    return {
      nodeCount: 0,
      orderNum: 0,
      payout: 0
    }
  },
  methods: {
    init () {
      getcount().then(res => {
        if (res) {
          if (res.count === undefined) {
            //this.$message.error('getcount:' + 0)
            this.nodeCount = 0
          }
          else {
            this.nodeCount = res.count
            //this.$message.error('getcount:' + res.count)
          }
        }
      })
      getorderinfo().then(res => {
        if (res) {
          if (res.num === undefined) {
            //this.$message.error('getcount:' + 0)
            this.orderNum = 0
            return
          }

          if (res.payout === undefined) {
            this.payout = 0
            return
          }

          else {
            this.orderNum = res.num
            this.payout = res.payout
            //this.$message.error('getcount:' + res.payout)
          }
        }
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.home-icon{
  font-size: 50px;
}
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    font-size: 24px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-people:before {
      content: "";
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      // font-size: 50px;
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-node-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
@media (max-width:550px) {
  .card-node-description {
    display: none;
  }
  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
