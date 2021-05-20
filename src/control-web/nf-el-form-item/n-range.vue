<!--数字滑块-->
<template>
  <el-slider
    v-model="value"
    :id="'c' + controlId"
    :name="'c' + controlId"
    :size="size"
  >
  </el-slider>
</template>

<script>
import { defineComponent } from 'vue'
// 引入组件需要的属性 引入表单子控件的管理类
import { baseProps, controlItemManage } from '/nf-control-web'

export default defineComponent({
  name: 'el-from-range',
  props: {
    ...baseProps, // 基础属性
    modelValue: [String, Number]
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    return {
      ...controlItemManage(props, context)
    }
  }
})
</script>
