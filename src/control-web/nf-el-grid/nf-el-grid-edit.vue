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
    <!--显示字段列表-->
    <el-table-column
      v-for="(colId, index) in colOrder"
      :key="'grid_list_' + index"
      :fixed="index < fixedIndex"
      :prop="itemMeta[colId].colName"
      :label="itemMeta[colId].label"
      :width="itemMeta[colId].width"
      :min-width="50"
      :align="itemMeta[colId].align"
      :header-align="itemMeta[colId]['header-align']"
      :filter-multiple="false"
      :show-overflow-tooltip="true"
      :formatter="myformatter"
    >
    <!--表单控件-->
     <template #default="scope">
        <component v-if="isEdit(colId)"
          :is="ctlList[getCtrMeta(colId).controlType]"
          v-model="scope.row[getColName(colId)]"
          v-bind="getCtrMeta(colId)"
          @myChange="mySubmit">
        </component>
        {{scope.row[getColName(colId)]}}
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([dataList[1], dataList[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
  {{selectionIds}}<br>
  <template v-for="(item, index) in multipleSelection" :key="index">
    {{item}}<br>
  </template>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
// 注册表单子控件
import { formItemListKey } from '../nf-el-form-item/map-el-form-item.js'

/** 批量修改和添加
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
    editMeta: Object, // table的列的需要修改的子控件的meta
    'data-selection-ids': Array, // 选择的记录的ID集合
    'data-list': { // 绑定的数据
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    // 表单子控件字典
    const ctlList = formItemListKey

    // 获取table的dom，
    const gridDom = ref(null)

    // 选中的记录
    const multipleSelection = reactive([])
    // 选中的记录的ids
    const selectionIds = reactive([])

    onMounted(() => {
      console.log('gridDom', gridDom)
    })

    // 获取字段名称
    const getColName = (colId) => {
      return props.itemMeta[colId].colName
    }

    // 依据ID获取组件的meta，因为model不支持【】嵌套
    const getCtrMeta = (id) => {
      return props.editMeta[id]
    }

    // 依据ID获取组件的meta，因为model不支持【】嵌套
    const isEdit = (id) => {
      return typeof props.editMeta[id] !== 'undefined'
    }

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
      isEdit, // 是否变成表单子控件
      ctlList, // 表单子控件字典
      getCtrMeta, // 获取表单子控件的meta
      getColName, // 获取字段名称
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
