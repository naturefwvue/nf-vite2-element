<template>
  <!--菜单-->
  <el-menu
    ref="domMenu"
    :default-active="index"
    class="el-menu-vertical-demo"
    @select="select"
    @open="handleOpen"
    @close="handleClose">
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">角色管理</el-menu-item>
          <el-menu-item index="1-2">操作日志</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template #title>
          <i class="el-icon-location"></i>
          <span>项目管理-设计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">基础设定</el-menu-item>
          <el-menu-item index="2-2">Excel文档</el-menu-item>
          <el-menu-item index="2-3">数据库信息</el-menu-item>
          <el-menu-item index="2-4">实体类</el-menu-item>
          <el-menu-item index="2-5">功能模块</el-menu-item>
          <el-menu-item index="2-6"></el-menu-item>
          <el-menu-item index="2-7"></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template #title>
          <i class="el-icon-location"></i>
          <span>项目管理-前端</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">表单</el-menu-item>
          <el-menu-item index="3-2">查询</el-menu-item>
          <el-menu-item index="3-3">列表</el-menu-item>
          <el-menu-item index="3-4">操作按钮</el-menu-item>
          <el-menu-item index="3-5"></el-menu-item>
          <el-menu-item index="3-6"></el-menu-item>
          <el-menu-item index="3-7"></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    
  </el-menu>
</template>

<script setup>
// 菜单

import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

  const index = ref(1)
  const domMenu = ref(null)

  onMounted(() => {
    domMenu.value.open('1')
    domMenu.value.open('2')

  })

  watch(() => index, () => {
    // console.log('当前激活节点', index)
  })

  const select = ( index, indexPath) => {
    // console.log('当前激活节点11', index, indexPath)
    switch(index) {
      case '2-1':
        router.push({ name: 'plat-baseset'})
        break
      case '2-2':
        router.push({ name: 'plat-excel'})
        break
       default:
        router.push({ name: 'plat-list', params: { moduleId: index }})
        break
    }

  }
  const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
  }
  const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
  }

</script>