<!--单行文本-->
<template>
  <el-input
    v-model="value"
    @clear="mySubmit"
    :id="'c' + controlId"
    :name="'c' + controlId"
    :size="size"
    :clearable="clearable"
    :validate_event="validate_event"
    :show-word-limit="show_word_limit"
  >
  </el-input>
</template>

<script >
import { defineComponent } from 'vue'
// 引入组件需要的属性 引入表单子控件的管理类
import { baseProps, controlItemManage } from '/nf-control-web'

export default defineComponent({
  name: 'el-form-item-text',
  props: {
    ...baseProps, // 基础属性
    modelValue: [String, Array, Number]
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    // console.log('props-text', props)
    // console.log('props-ctx', context)
    const {
      value,
      mySubmit
    } = controlItemManage(props, context)  // value、mySubmit

    return {
      value,
      mySubmit
    }
  }
})
</script>