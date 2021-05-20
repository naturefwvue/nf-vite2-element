<!--数字-->
<template>
  <el-input-number
    style="width:110px"
    v-model="value"
    :id="'c' + controlId"
    :name="'c' + controlId"
    :size="size"
    :controls-position="controls_position"
  >
  </el-input-number>
</template>

<script>
import { defineComponent } from 'vue'
// 引入组件需要的属性 引入表单子控件的管理类
import { baseProps, controlItemManage } from '/nf-control-web'

export default defineComponent({
  name: 'el-from-number',
  props: {
    ...baseProps, // 基础属性
    'controls_position': {
      type:String,
      default: 'right'
    },
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
