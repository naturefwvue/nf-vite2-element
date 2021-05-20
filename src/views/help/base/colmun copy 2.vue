<template>
  显示字段列表
  <el-scrollbar style="height:400px;width:1100px">
    <el-row :gutter="20">
      <el-col :span="2">选择</el-col>
      <el-col :span="2">编号</el-col>
      <el-col :span="3">字段名称</el-col>
      <el-col :span="3">中文名称</el-col>
      <el-col :span="2">字段类型</el-col>
      <el-col :span="2">字段大小</el-col>
      <el-col :span="2">默认值</el-col>
      <el-col :span="2">允许空</el-col>
      <el-col :span="3">控件类型</el-col>
      <el-col :span="3">说明</el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2">选择</el-col>
      <el-col :span="2">1</el-col>
      <el-col :span="3">id</el-col>
      <el-col :span="3">主键</el-col>
      <el-col :span="2">int</el-col>
      <el-col :span="2">4</el-col>
      <el-col :span="2">自增</el-col>
      <el-col :span="2">false</el-col>
      <el-col :span="3">无</el-col>
      <el-col :span="3">主键自增</el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2">选择</el-col>
      <el-col :span="2">2</el-col>
      <el-col :span="3">tableName</el-col>
      <el-col :span="3">表名</el-col>
      <el-col :span="2">varchar</el-col>
      <el-col :span="2">100</el-col>
      <el-col :span="2"></el-col>
      <el-col :span="2">false</el-col>
      <el-col :span="3">文本框</el-col>
      <el-col :span="3">数据库里表的名称</el-col>
    </el-row>
  </el-scrollbar>
</template>

<script>
import { ref } from "vue";
</script>

<script setup>
const v = ref(2);
</script>