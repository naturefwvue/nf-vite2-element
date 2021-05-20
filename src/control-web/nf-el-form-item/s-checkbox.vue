<!--勾选框-->
<template>
  <el-checkbox
    v-model="value"
    @change="mySubmit"
    :id="'c' + controlId"
    :name="'c' + controlId"
    :size="size"
  >
    {{title}}
  </el-checkbox>
</template>

<script>
import { defineComponent } from 'vue'
// 引入组件需要的属性 引入表单子控件的管理类
import { baseProps, controlItemManage } from '/nf-control-web'

export default defineComponent({
  name: 'el-from-item-checkbox',
  props: {
    title: String,
    ...baseProps, // 基础属性
    modelValue: [Boolean, String]
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    return {
      ...controlItemManage(props, context)
    }
  }
})
</script>
