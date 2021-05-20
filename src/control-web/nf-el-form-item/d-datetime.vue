<!--日期-->
<template>
  <el-date-picker style="width:190px"
    v-model="mydate"
    :size="size"
    type="datetime"
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

// 类型的字典
const dateType = {
  100: 'dates/datetimerange/daterange/monthrange',
  110: 'date',
  111: 'datetime',
  112: 'month',
  113: 'week',
  114: 'year'
}

export default defineComponent({
  name: 'el-from-item-datetime',
  inheritAttrs: false,
  props: {
    ...baseProps, // 基础属性
    showFormat: { // 返回数据的格式化。date：日期类型
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    },
    returnFormat: { // 返回数据的格式化。date：日期类型
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    },
    modelValue: [String, Date]
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    const { value } = controlItemManage(props, context)
    // console.log('props-date', props)

    return {
      ...dateManage(value, props)
    }
  }
})
</script>
