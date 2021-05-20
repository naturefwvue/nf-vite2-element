<!--多选组-->
<template>
  <el-checkbox-group
    v-model="checkValue"
    :id="'c' + controlId"
    :name="'c' + controlId"
    :size="size"
  >
    <el-checkbox
      v-for="item in optionList"
      :key="'check' + controlId + item.value"
      :label="item.value">
        {{item.label}}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
import { computed, defineComponent } from 'vue'
// 引入组件需要的属性 引入表单子控件的管理类
import { baseProps, controlItemManage } from '/nf-control-web'

export default defineComponent({
  name: 'el-from-checkboxs',
  props: {
    ...baseProps, // 基础属性
    modelValue: [Array]
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    // console.log('多选属性', props)

    const { value } = controlItemManage(props, context)

    const checkValue = computed({
      set: (v) => value.value = v,
      get: () => {
        if (typeof value.value === 'undefined') {
          value.value = []
        }
        return value.value
      }
    })

    return {
      checkValue
    }
  }
})
</script>
