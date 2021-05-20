<!--下拉选择-->
<template>
  <el-select
    v-model="value"
    @change="mySubmit"
    :id="'c' + controlId"
    :name="'c' + controlId"
    :size="size"
  >
    <el-option
      v-for="item in optionList"
      :key="'select' + controlId + item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import { defineComponent } from 'vue'
// 引入组件需要的属性 引入表单子控件的管理类
import { baseProps, controlItemManage } from '/nf-control-web'

export default defineComponent({
  name: 'el-from-select',
  props: {
    ...baseProps, // 基础属性
    modelValue: [String, Array, Number]
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    return {
      ...controlItemManage(props, context)
    }
  }
})
</script>
