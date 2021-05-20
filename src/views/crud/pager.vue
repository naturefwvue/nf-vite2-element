<template>
  <!--分页-->
  <el-pagination
    background
    layout="prev, pager, next"
    v-model:currentPage="dataListState.page.pageIndex"
    :page-size="dataListState.page.pageSize"
    :total="dataListState.page.pageTotal">
  </el-pagination>
</template>

<script setup>
// 分页
// 统一的数据列表的分页组件
import { defineProps } from 'vue'
// 数据列表的状态
// import dataListControl from '../control/data-list'

// 获取列表的局部状态
// const { dataListState } = dataListControl()

const dataListState = {
  page: {
    pageIndex: 1,
    pageSize: 20,
    pageTotal: 100
  }
}
</script>