<!--年 + 月 v-bind="$attrs"-->
<template>
  <el-date-picker
    style="width:130px"
    v-model="mydate"
    :size="size"
    type="month"
    :placeholder="$attrs.placeholder"
    :title="$attrs.title"
    :format="showFormat"
    @change="myChange"
  >
  </el-date-picker>
</template>

<script>
import { ref, watch, defineComponent } from 'vue'
// 引入组件需要的属性 引入表单子控件的管理类
import { baseProps, controlItemManage } from '/nf-control-web'
// 日期管理
import dateManage from './manage-date.js'

export default defineComponent({
  name: 'el-from-item-month',
  inheritAttrs: false,
  props: {
    ...baseProps, // 基础属性
    showFormat: { // 返回数据的格式化。date：日期类型
      type: String,
      default: 'YYYY年 MM月'
    },
    returnFormat: { // 返回数据的格式化。date：日期类型
      type: String,
      default: 'YYYY-MM'
    },
    modelValue: [String, Date, Number]
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    const { value } = controlItemManage(props, context)
    // console.log('props-month', props)

    return {
      ...dateManage(value, props)
    }
  }
})
</script>
