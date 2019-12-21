<template>
  <el-row :gutter="40" class="panel-payout">
    订单数量/总支出
    <el-col :xs="12" :sm="12" :lg="6" class="card-payout-col">
      <div class="card-payout">
        <!-- <div class="card-payout-icon-wrapper icon-message">
          <i class="iconfont icon-gonggongyinyongmokuai home-icon" ></i>
        </div> -->
        <div class="card-payout-description">
          <div class="card-payout-text">
            订单数量/总支出
          </div>
          <CountTo :startVal='0' :endVal='num' :duration='2000' class="card-payout-num"></CountTo>
          /
          <CountTo :startVal='0' :endVal='payout' :duration='2000' :decimals='2' class="card-payout-num"></CountTo>
          <!-- 您拥有的主节点数量: {{nodeCount}} -->
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getorderinfo } from '@/api/order'
export default {
  components: {
    CountTo
  },
  data () {
    return {
      num: 0,
      payout: 0.1
    }
  },
  methods: {
    init () {
      getorderinfo().then(res => {
        if (res) {
          if (res.num === undefined) {
            //this.$message.error('getcount:' + 0)
            this.num = 0
            return
          }

          if (res.payout === undefined) {
            this.payout = 0
            return
          }

          else {
            this.num = res.num
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
.panel-payout {
  margin-top: 18px;
  .card-payout-col {
    margin-bottom: 32px;
  }
  .card-payout {
    height: 108px;
    font-size: 12px;
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
    .card-payout-icon-wrapper {
      // font-size: 50px;
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-payout-icon {
      float: left;
      font-size: 48px;
    }
    .card-payout-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-payout-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-payout-num {
        font-size: 20px;
      }
    }
  }
}
@media (max-width:550px) {
  .card-payout-description {
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
