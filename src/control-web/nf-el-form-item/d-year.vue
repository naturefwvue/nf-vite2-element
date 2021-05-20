<!--日期 v-bind="{{$attrs}}"-->
<template>
  <el-date-picker
    style="width:130px"
    v-model="mydate"
    :size="size"
    type="year" 
    :placeholder="$attrs.placeholder"
    :title="$attrs.title"
    :format="showFormat"
    @change="myChange"
  >
  </el-date-picker>
</template>

<script>
import { defineComponent } from 'vue'
// 引入组件需要的属性 引入表单子控件的管理类
import { baseProps, controlItemManage } from '/nf-control-web'
// 日期管理
import dateManage from './manage-date.js'

export default defineComponent({
  name: 'el-from-item-year',
  inheritAttrs: false,
  props: {
    ...baseProps, // 基础属性
    controlType: {
      type: Number,
      default: 114
    },
    showFormat: { // 返回数据的格式化。date：日期类型
      type: String,
      default: 'YYYY 年'
    },
    returnFormat: { // 返回数据的格式化。date：日期类型
      type: String,
      default: 'YYYY'
    },
    modelValue: [String, Date, Number]
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    const { value } = controlItemManage(props, context)
    console.log('props-year', props)

    return {
      ...dateManage(value, props)
    }
  }
})
</script>
