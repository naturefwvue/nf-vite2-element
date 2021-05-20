<template>
  <!--多标签的增删改查-->
  <el-row class="tac">
    <el-col :span="4">
      <!--菜单-->
      <menu1 :getModuleId="getModuleId"/>
    </el-col>
    <el-col  :span="20">{{moduleId}}
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="1-1">用户管理
         </el-tab-pane>
        <el-tab-pane label="配置管理" name="1-2">配置管理
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="1-3">角色管理
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="1-4">定时任务补偿
        </el-tab-pane>
      </el-tabs>
      <!--列表-->
      <router-view v-show="moduleId === '1-1'"/>
      <router-view v-show="moduleId === '1-2'"/>
      <router-view v-show="moduleId === '1-3'"/>
      <router-view v-show="moduleId === '1-4'"/>
  
    </el-col>
  </el-row>
</template>

<script setup>
// 增删改查
import { reactive, ref } from 'vue'
import menu1 from './menu.vue'

// 属性：模块ID
const props = defineProps({
  moduleId: Number
})
// 动态标签
const activeName = ref('1-1')

const handleClick = (tab, event) => {
  console.log(tab, event)
 
}

// 获取当前模块ID
const moduleId = ref(1)

const getModuleId = (id) => {
  moduleId.value = id
  activeName.value = id
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