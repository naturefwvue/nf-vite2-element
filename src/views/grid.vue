<template>
  <el-table
    :data="dataList"
    style="width: 100%"
    height="250"
  >
      <el-table-column
        v-for="(item, index) in girdMeta.itemMeta"
        :key="'grid-' + index"
        :fixed="index===0"
        :prop="item.colName"
        :label="item.label"
        :width="item.width">
      </el-table-column>
  </el-table>
  <hr>
  <el-grid-list
    v-bind="girdMeta"
    :data-list="dataList"
  />
  <el-grid-edit
    v-bind="girdEditMeta"
    :data-list="dataList"
  />
</template>

<script>
import { reactive, ref } from 'vue'
import elGridList from '/ctrl/nf-el-grid/nf-el-grid-list.vue'
import elGridEdit from '/ctrl/nf-el-grid/nf-el-grid-edit.vue'

import json from '/json/grid-list.json'
import json2 from '/json/grid-edit.json'

export default {
  name: 'eleGrid',
  components: {
    'el-grid-list': elGridList,
    'el-grid-edit': elGridEdit
  },
  setup () {
    const value = ref('1')
    const dataList = reactive([])

    // 从json 加载 列表数据 的 meta
    const meta = reactive(json.gridListMeta)
    const girdMeta = reactive(meta.baseMeta)
    girdMeta.itemMeta = meta.itemMeta

    // 从json 加载 批量修改 的 meta
    const meta2 = reactive(json2.gridListMeta)
    const girdEditMeta = reactive(meta2.baseMeta)
    girdEditMeta.itemMeta = meta2.itemMeta
    girdEditMeta.editMeta = meta2.editMeta

    setTimeout(() => {
      dataList.length = 0
      dataList.push(...[{
        id: 1,
        companyName: '上海某公司',
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 2,
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 3,
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 4,
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 5,
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 6,
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 6,
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }])
    }, 100)

    return {
      girdEditMeta, // 批量修改的属性
      girdMeta, // grid的属性
      value,
      dataList
    }
  }

}
</script>
