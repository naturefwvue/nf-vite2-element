<template>
  显示字段列表 {{currentRow}}
  <el-table
    :data="colData"
    stripe
    border
    highlight-current-row
    @current-change="handleCurrentChange"
    max-height="350"
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column 
      v-for="(item, index) in colList"
      :key="'col_' + index"
      :label="item.label"
      :width="item.width">
      <template #default="scope">
        <!--
        <template v-if="currentRow.columnId !== scope.row.columnId">
          {{scope.row[item.colName]}}
        </template>-->
        <component
          :is="dictControl[item.controlType]"
          v-model="tableData[scope.$index][item.colName]"
          v-bind="item"
          @my-change="myChange">
        </component>
      </template>
    </el-table-column>
    <el-table-column label="操作" fixed="right">
      <template #default="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  {{tableData}}
</template>

<script>
import { reactive, ref } from "vue"
// 状态管理
import VueDS from 'vue-data-state'
// 读取json配置，配置字段的表单
import json from './json/form-column.json'

</script>

<script setup>
// 注册表单子控件
import { formItemListKey } from '/ctrl/nf-el-form-item/map-el-form-item.js'

  // 控件字典
  const dictControl = formItemListKey

  // 字段的表单
  const colMeta = json.formMeta
  // 字段的子控件
  const colList = colMeta.itemMeta


  // 访问状态
  const { get } = VueDS.useStore()
  // 字段等数据
  const baseSet = get.helpBaseSet()

  // 选择的行
  const currentRow = ref({columnId: 0})

  // 设置选择行
  const handleCurrentChange = (val) => {
    currentRow.value = val;
  }

  const v = ref(2)

  const tableData = reactive([
    {
      columnId: 101, // 主键
      tableId: 1, // 表ID
      colName: '字段名', // 名称
      label: '', // 中文名
      colType: '', // 类型
      colSize: 4, // 大小
      controlTypeId: 1, // 控件类型
      defValue: '', // 默认值
      isNull: false // 允许空
    }, {
      columnId: 102, // 主键
      tableId: 1, // 表ID
      colName: '字段名', // 名称
      label: '', // 中文名
      colType: '', // 类型
      colSize: 1, // 大小
      controlTypeId: 1, // 控件类型
      defValue: '', // 默认值
      isNull: false // 允许空
    }, {
      columnId: 103, // 主键
      tableId: 1, // 表ID
      colName: '字段名', // 名称
      label: '', // 中文名
      colType: '', // 类型
      colSize: 1, // 大小
      controlTypeId: 1, // 控件类型
      defValue: '', // 默认值
      isNull: false // 允许空
    }, {
      columnId: 104, // 主键
      tableId: 1, // 表ID
      colName: '字段名', // 名称
      label: '', // 中文名
      colType: '', // 类型
      colSize: 1, // 大小
      controlTypeId: 1, // 控件类型
      defValue: '', // 默认值
      isNull: false // 允许空
    }
  ])

  const colData = []
  for (const key in tableData) {
    const t = tableData[key]
    colData[key] = {
      columnId: t.columnId
    }
  }
  
  const handleEdit = (index, row) => {
    console.log(index, row)
  }
  const handleDelete = (index, row) => {
    console.log(index, row)
  }
</script>