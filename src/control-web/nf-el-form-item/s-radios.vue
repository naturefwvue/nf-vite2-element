<!--单选组-->
<template>
  <el-radio-group
    v-model="value"
    :id="'c' + controlId"
    :name="'c' + controlId"
    :size="size"
  >
    <el-radio
      v-for="item in optionList"
      :key="'radio' + controlId + item.value"
      :label="item.value">
        {{item.label}}
    </el-radio>
  </el-radio-group>
</template>

<script>
import { defineComponent } from 'vue'
// 引入组件需要的属性 引入表单子控件的管理类
import { baseProps, controlItemManage } from '/nf-control-web'

export default defineComponent({
  name: 'el-from-radios',
  props: {
    ...baseProps, // 基础属性
    modelValue: [Boolean, String, Number]
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    return {
      ...controlItemManage(props, context)
    }
  }
})
</script>
