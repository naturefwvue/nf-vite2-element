<!--颜色-->
<template>
  <el-color-picker
    v-model="value"
    :size="size"
  >
  </el-color-picker>
</template>

<script>
// 没有 i d和 name 属性，设置会出警告

import { defineComponent } from 'vue'
// 引入组件需要的属性 引入表单子控件的管理类
import { baseProps, controlItemManage } from '/nf-control-web'

export default defineComponent({
  name: 'el-form-item-color',
  props: {
    ...baseProps, // 基础属性
    modelValue: [String]
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    return {
      ...controlItemManage(props, context) // value、mySubmit
    }
  }
})
</script>
