<template>
  <!--支持平台-->
  <el-row class="tac">
    <el-col :span="4">
      <!--菜单-->
      <menu1/>
    </el-col>
    <el-col  :span="20">
      <!--列表-->
      <router-view/>
    </el-col>
  </el-row>
</template>

<script setup>
// 增删改查
import { reactive } from 'vue'
import menu1 from './menu.vue'

// 注册局部状态
/**
 * 模块ID
 * 列表ID
 * 根据模块ID加载各种meta
 * 表单meta
 * 查询meta
 * 列表meta
 * 
 */

// 用 aioxs 获取json 文件




</script>