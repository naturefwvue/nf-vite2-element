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
        <span>商户管理</span>
        </template>
        <el-menu-item-group>
        <el-menu-item index="1-1">商户信息</el-menu-item>
        <el-menu-item index="1-2">产品信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
        <el-submenu index="2">
        <template #title>
        <i class="el-icon-location"></i>
        <span>客户管理</span>
        </template>
        <el-menu-item-group>
        <el-menu-item index="2-1">客户信息</el-menu-item>
        <el-menu-item index="2-2">订单信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    
  </el-menu>
</template>

<script setup>
// 菜单

import { ref, watch, onMounted, defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  getModuleId: Function
})


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
    router.push({ name: 'crud-list', params: { moduleId: index }})

    props.getModuleId(index)

  }
  const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
  }
  const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
  }

</script>