<template>
  <el-menu
    :default-active="activeIndex"
    :router="true"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/"><router-link to="/">首页</router-link></el-menu-item>
    <el-menu-item index="/base"><router-link :to="{name:'base'}">基础控件</router-link></el-menu-item>
    <el-menu-item index="/form"><router-link :to="{name:'form'}">表单控件</router-link></el-menu-item>
    <el-menu-item index="/find"><router-link :to="{name:'find'}">查询控件</router-link></el-menu-item>
    <el-menu-item index="/grid"><router-link :to="{name:'grid'}">列表控件</router-link></el-menu-item>
    <el-menu-item index="/crud"><router-link :to="{name:'crud'}">增删改查1</router-link></el-menu-item>
    <el-menu-item index="/crud2"><router-link :to="{name:'crud2', params: { moduleId: 1-1 }}">增删改查2</router-link></el-menu-item>
    <el-menu-item index="/plat"><router-link :to="{name:'plat'}">支撑平台</router-link></el-menu-item>
    <el-menu-item index="/tocol"><router-link :to="{name:'tocol'}">行列转换</router-link></el-menu-item>
  </el-menu>
  <router-view/>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref('/')

const handleSelect = () => {

}

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 10px;
}
</style>