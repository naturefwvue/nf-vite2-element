<template>
  <!--无标签的增删改查-->
  <el-row class="tac">
    <el-col :span="4">
      <!--菜单-->
      <menu1 :getModuleId="getModuleId"/>
    </el-col>
    <el-col  :span="20">{{moduleId}}
      <!--列表-->
      <router-view/>
    </el-col>
  </el-row>
</template>

<script setup>
// 增删改查
import { reactive, ref } from 'vue'
import menu1 from './menu.vue'

// 获取当前模块ID
const moduleId = ref(1)

const getModuleId = (id) => {
  moduleId.value = id
}


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