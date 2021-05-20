<!--单行文本-->
<template>
  <el-rate
    v-model="value"
    :size="size"
  >
  </el-rate>
</template>

<script>
import { defineComponent } from 'vue'
// 引入组件需要的属性 引入表单子控件的管理类
import { baseProps, controlItemManage } from '/nf-control-web'

// 五星评分
export default defineComponent({
  name: 'el-form-item-rate',
  props: {
    ...baseProps, // 基础属性
    modelValue: [String, Number]
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    return {
      ...controlItemManage(props, context) // value、mySubmit
    }
  }
})
</script>
