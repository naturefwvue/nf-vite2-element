<!--文本域-->
<template>
  <el-input
    type="textarea"
    v-model="value"
    :id="'c' + controlId"
    :name="'c' + controlId"
    :size="size"
    :rows="rows"
    :validate-event="validate_event"
    :show-word-limit="show_word_limit"
  >
  </el-input>
</template>

<script>
import { defineComponent } from 'vue'
// 引入组件需要的属性 引入表单子控件的管理类
import { baseProps, controlItemManage } from '/nf-control-web'

export default defineComponent({
  name: 'el-from-item-area',
  props: {
    ...baseProps, // 基础属性
    rows: {
      type: Number,
      default: 3
    },
    modelValue: [String, Number]
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    // console.log('对行文本框的属性：', props)
    return {
      ...controlItemManage(props, context)
    }
  }
})
</script>
