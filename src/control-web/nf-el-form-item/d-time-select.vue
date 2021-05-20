<!--时间-->
<template>
  <el-time-select
    style="width:130px;"
    v-model="mytime"
    :size="size"
    :placeholder="$attrs.placeholder"
    :title="$attrs.title"
    @change="myChange"
 
  >
  </el-time-select>
</template>

<script>
import { ref, watch, defineComponent } from 'vue'
// 引入组件需要的属性 引入表单子控件的管理类
import { baseProps, controlItemManage } from '/nf-control-web'

/**
 * 日期管理类
 * * 功能：
 * ** 按照类型提交数据，不是date()
 * ** 监听属性，设置value
 * * 参数：
 * ** value： control类的value
 * ** mySubmit： control类的mySubmit，直接就提交了
 * ** controlType：属性里的控件类型
 * * 返回
 * ** 绑定控件的 mydate
 * ** change 事件的 myChange
 */
const timeManage = (value) => {
  // 日期控件用的v-model，便于做类型转换
  const mytime = ref('')

  if (value.value !== null) {
    mytime.value = value.value
  }

  // 监听属性，设置给 mydate
  watch(() => value.value, (v1, v2) => {
    // 把周数转换成日期
    mytime.value = v1
  })

  // 向父组件提交数据。
  const myChange = (_val) => {
    value.value = _val // 提交给父组件

    // console.log('时间的 select：', _val)
  }
 
  return {
    mytime,
    myChange
  }
}

export default defineComponent({
  name: 'el-from-item-time-select',
  inheritAttrs: false, // 禁止Attribute 继承
  props: {
    ...baseProps, // 基础属性
    showFormat: { // 返回数据的格式化。date：日期类型
      type: String,
      default: 'HH:mm'
    },
    returnFormat: { // 返回数据的格式化。date：日期类型
      type: String,
      default: 'HH:mm'
    },
    modelValue: [String, Date]
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    const { value, mySubmit } = controlItemManage(props, context)

    const { mytime, myChange } = timeManage(value, mySubmit, props.controlType)
    return {
      mytime,
      myChange
    }
  }
})
</script>
