<template>
  <el-table
    ref="gridDom"
    :data="dataList"
    style="width: 100%"
    :height="height"
    :stripe="true"
    :border="true"
    size="mini"
    :fit="true"
    :highlight-current-row="true"
    :current-row-key="idName"
    @selection-change="handleSelectionChange"
  >
    <!--显示对号框-->
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <!--显示字段列表-->
    <el-table-column
      v-for="(item, index) in colOrder"
      :key="'grid_list_' + index"
      :fixed="index < fixedIndex"
      :prop="itemMeta[item].colName"
      :label="itemMeta[item].label"
      :width="itemMeta[item].width"
      :min-width="50"
      :align="itemMeta[item].align"
      :header-align="itemMeta[item]['header-align']"
      :filter-multiple="false"
      :show-overflow-tooltip="true"
      :formatter="myformatter"
    >
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px;display:none">
    <el-button @click="toggleSelection([dataList[1], dataList[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
  <br>
  <template v-for="(item, index) in multipleSelection" :key="index">
    {{item}}<br>
  </template>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
/**
 * * height: 250, // 高度
 * * colOrder: [101], // 显示顺序
 * * fixedIndex: 0 // 锁定的列数
 * * itemMeta: {
 * * --101: {
 * * ----id: 101,
 * * ----label: '编号11',
 * * ----prop: 'code',
 * * ----width: 120
 * * --}
 */
export default {
  name: 'nf-el-grid-list',
  props: {
    controlId: { // 101 gridID，必填
      type: Number,
      required: true
    },
    height: { // table的高度
      type: Number,
      default: 300
    },
    colOrder: { // 字段显示的顺序
      type: Array,
      default: () => []
    },
    fixedIndex: { //  锁定的列数
      type: Number,
      default: 0
    },
    idName: { // 主键字段的名称
      type: String,
      default: 'id'
    },
    itemMeta: Object, // table的列的meta
    'data-selection-ids': Array, // 选择的记录的ID集合
    'data-list': { // 绑定的数据
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    // 获取table的dom，
    const gridDom = ref(null)

    // 选中的记录
    const multipleSelection = reactive([])
    // 选中的记录的ids
    const selectionIds = reactive([])

    onMounted(() => {
      console.log('gridDom', gridDom)
    })

    // 格式化
    const myformatter = (row, column) => {
      // console.log('myformatter', row, column)
      return row[column.property] // realWidth
    }

    const toggleSelection = (rows) => {
      console.log('toggleSelection', rows)
      if (rows) {
        selectionIds.length = 0
        rows.forEach(row => {
          gridDom.value.toggleRowSelection(row)
          selectionIds.push(row[props.idName])
        })
      } else {
        gridDom.value.clearSelection()
      }
    }

    const handleSelectionChange = (val) => {
      console.log('handleSelectionChange', val)
      multipleSelection.length = 0
      multipleSelection.push(...val)
      selectionIds.length = 0
      val.forEach(row => {
        selectionIds.push(row[props.idName])
      })
      // gridDom.value = val
    }

    return {
      multipleSelection,
      selectionIds, // 选中的ids
      gridDom,
      toggleSelection,
      handleSelectionChange,
      myformatter // 格式化
    }
  }
}
</script>
