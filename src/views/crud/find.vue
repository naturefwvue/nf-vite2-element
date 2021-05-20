<template>
  <!--查询-->
  <findCom
    v-model="query"
    v-bind="findProps"
  />
</template>

<script>
import { reactive } from "vue"
// 状态
import VueDS from 'vue-data-state'

</script>

<script setup>
// 组件
import findCom from '/ctrl/nf-el-find/el-find-div.vue'

// 属性：模块ID
const props = defineProps({
  moduleId: Number,
  findProps: Object
})

  const query = reactive({})

</script>