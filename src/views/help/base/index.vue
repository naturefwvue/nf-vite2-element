<template>
  基础功能 {{v}}
  表和字段
  <column/>

  建表语句——mysql 、 websql
  各种实体类——websql、列表
  各种meta——表单、列表、查询、分页
  <el-tabs tab-position="left" style="height: 200px;">
    <el-tab-pane label="实体类">用户管理</el-tab-pane>
    <el-tab-pane label="websql">配置管理</el-tab-pane>
    <el-tab-pane label="表单">角色管理</el-tab-pane>
    <el-tab-pane label="查询">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
import { ref } from 'vue'
import VueDS from 'vue-data-state'

</script>

<script setup>
import column from './colmun.vue'

  const v = ref(2)

  // 注册局部状态，保存表名、字段信息，
  // 依据字段信息，生成 表单、查询、列表、SQL建表语句等信息

  const { reg, get } = VueDS.useStore()
  const baseSet = reg.helpBaseSet()

</script>