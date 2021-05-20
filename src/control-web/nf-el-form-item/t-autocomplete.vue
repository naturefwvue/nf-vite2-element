<!--单行文本-->
<template>
  <el-autocomplete
    class="inline-input"
    v-model="value"
    :id="'c' + controlId"
    :name="'c' + controlId"
    :size="size"
    :clearable="clearable"
    @clear="mySubmit"
    @select="handleSelect"
    :fetch-suggestions="querySearch"
  >
  </el-autocomplete>
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

    // com的查询事件
    const querySearch = (str, cb) => {
      const results = str
        ? props.optionList.filter((item) =>
          item.value.indexOf(str.toLowerCase()) === 0)
        : props.optionList

      // 调用 callback 返回建议列表的数据
      cb(results)
    }
    
    

    return {
      value,
      mySubmit,
      querySearch
    }
  }
})
</script>