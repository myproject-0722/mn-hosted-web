<template>
  <div class="content">
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>

    <el-cascader
      :options="options2"
      v-model="selectedOptions"
      clearable
      :props="cascaderProps"
      @change="handleChange"
      placeholder="请选择主题/模块"
    ></el-cascader>

    <el-input placeholder="请输入关键字搜索" v-model="input" clearable style="width:20%;padding-bottom:5px"></el-input>
    <el-button type="primary" @click="search">搜索</el-button>
    <el-button type="info" plain size="small">清空条件</el-button>
    <el-button type="primary" style="padding-left:20px">添加产品</el-button>

    <el-table :data="contentList" border style="width: 100%">
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column prop="tid" label="主题" align="center"></el-table-column>
      <el-table-column prop="cid" label="板块" align="center"></el-table-column>
      <el-table-column prop="title" label="内容标题" align="center"></el-table-column>
      <el-table-column prop="img_url" label="缩略图" align="center" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.img_url" style="width: 100%;" />
        </template>
      </el-table-column>

      <el-table-column prop="promotionName" label="内容作者" align="center"></el-table-column>
      <el-table-column prop="promotionPrice" label="发布状态" align="center"></el-table-column>
      <el-table-column prop="promotionPrice" label="发布时间" align="center"></el-table-column>
      <el-table-column prop="promotionPrice" label="阅读次数" align="center"></el-table-column>
      <el-table-column prop="promotionPrice" label="有用" align="center"></el-table-column>
      <el-table-column prop="promotionPrice" label="无用" align="center"></el-table-column>
      <el-table-column prop="promotionPrice" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="contentEditInfo(scope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

export default {
  
  data () {
    return {
      
      options2: [
        {
          id: 'zhinan',
          label: '指南',
          children: [
            {
              id: 'shejiyuanze',
              label: '设计原则'
            },
            {
              id: 'daohang',
              label: '导航'
            }
          ]
        },
        {
          id: 'zujian',
          label: '组件',
          children: [
            {
              id: 'basic',
              label: 'Basic'
            },
            {
              id: 'form',
              label: 'Form'
            },
            {
              id: 'data',
              label: 'Data'
            },
            {
              id: 'notice',
              label: 'Notice'
            },
            {
              id: 'navigation',
              label: 'Navigation'
            },
            {
              id: 'others',
              label: 'Others'
            }
          ]
        },
        {
          id: 'ziyuan',
          label: '资源',
          children: [
            {
              id: 'axure',
              label: 'Axure Components'
            },
            {
              id: 'sketch',
              label: 'Sketch Templates'
            },
            {
              id: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      selectedOptions: [],
      contentList: [
        {
          id: 12,
          tid: 23,
          cid: 34,
          title: 'qqq',
          desc: 'www',
          img_url:
            'http://52.82.52.64:8888/group1/M00/00/03/rB8a-l13USSALFwcAALJcsk6azM395.png',
          content: 'eee',
          author: 'rrr',
          publish_flag: '1',
          publish_time: '2019-09-07 23:32:42',
          cread_count: 8,
          useful_count: 7,
          useless_count: 1,
          create_time: ' 2019-09-07 23:32:30',
          update_time: '',
          create_by: '久零',
          update_by: ''
        }
      ],
      cascaderProps: {
        label: 'label',
        value: 'id',
        children: 'children'
      },
      input: '',
      options: [
        {
          value: 0,
          label: '显示所有'
        },
        {
          value: 1,
          label: '已发布'
        },
        {
          value: 2,
          label: '未发布'
        }
      ],
      value: 0
    }
  },
  methods: {
    contentEditInfo(id){
      console.log(id)
      this.$router.push("/home/contentEdit?id=" + id);
    },
    handleChange (value) {
      console.log(value)
    },
    search () {
      console.log(this.value, this.input, this.selectedOptions)
    },
    init () {}
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
