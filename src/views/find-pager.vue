<template>分页状态：{{dataListState}}
  <el-pagination
    background
    layout="prev, pager, next"
    v-model:currentPage="dataListState.page.pageIndex"
    :page-size="dataListState.page.pageSize"
    :total="dataListState.page.pageTotal">
  </el-pagination>
</template>

<script setup>
// 统一的数据列表的分页组件
import { defineProps } from 'vue'
// 数据列表的状态
import dataListControl from '../control/data-list'

// 获取列表的局部状态
const { dataListState } = dataListControl('findtest')

</script>
