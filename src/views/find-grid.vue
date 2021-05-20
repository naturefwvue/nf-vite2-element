<template>
  <el-table
    :data="dataList"
    height="250"
    border
    style="width: 100%"
  >
    <el-table-column width="50" label="编号" prop="ID"></el-table-column>
    <el-table-column width="50" label="分类" prop="kind"></el-table-column>
    <el-table-column width="100" label="文本" prop="text"></el-table-column>
    <el-table-column width="100" label="多行文本" prop="area"></el-table-column>
    <el-table-column width="130" label="url" prop="url"></el-table-column>
    <el-table-column width="100" label="日期" prop="date"></el-table-column>
    <el-table-column width="140" label="日期时间" prop="datetime"></el-table-column>
    <el-table-column width="80" label="年月" prop="month"></el-table-column>
    <el-table-column width="80" label="年周" prop="week"></el-table-column>
    <el-table-column width="80" label="年" prop="year"></el-table-column>
    <el-table-column width="80" label="时间1" prop="time1"></el-table-column>
    <el-table-column width="100" label="时间2" prop="time2"></el-table-column>
    <el-table-column width="100" label="数字" prop="number1"></el-table-column>
    <el-table-column width="100" label="滑块" prop="number2"></el-table-column>
    <el-table-column width="100" label="勾选" prop="check1"></el-table-column>
    <el-table-column width="80" label="开关" prop="check2"></el-table-column>
    <el-table-column width="80" label="多选" prop="checks"></el-table-column>
    <el-table-column width="80" label="单选" prop="radio"></el-table-column>
    <el-table-column width="80" label="下拉" prop="select1"></el-table-column>
    <el-table-column width="100" label="下拉多选" prop="selects"></el-table-column>
    <el-table-column width="180" label="联动" prop="selectunion"></el-table-column>

  </el-table>
</template>

<script setup>
import { reactive, defineProps } from 'vue'

const props = defineProps({
  dataList: Array
})

// 从数据库里面获取数据
   
</script>