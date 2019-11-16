<template>
  <el-row :gutter="40" class="panel-group">
    您拥有的主节点数量: {{nodeCount}}
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getcount } from '@/api/masternode'
export default {
  components: {
    CountTo
  },
  data () {
    return {
      nodeCount: 0
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
    .card-panel-description {
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
  .card-panel-description {
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
