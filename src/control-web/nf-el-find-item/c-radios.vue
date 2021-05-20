<!--单选组的查询-->
<template>
  <!--范围方式-->
  <div style="float:left;width:65px;text-align:center;">
    <find-kind
      v-model="findChoiceKind"
      :findKind="findKind"
      @change="myChange"
    />
  </div>
  <div :style="{width: (150 * colCount - 10 ) + 'px'}" style="float:left;">
    <div style="float:left;" :style="{width: (150 * colCount - 40 ) + 'px'}">
      <component v-if="findChoiceKind === 401"
        :is="ctlList[153]"
        v-model="checkValue"
        v-bind="$attrs"
        @myChange="myChange">
      </component>
      <component v-else
        :is="ctlList[152]"
        v-model="checkValues"
        v-bind="$attrs"
        @myChange="myChange">
      </component>
    </div>
    <div style="float:left;">
      &nbsp;&nbsp;&nbsp;<i class="el-icon-error" @click="clear" style="cursor:pointer"></i>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
// 引入查询子控件的管理类
import { findItemManage } from '/nf-control-web'
// 查询方式的控件
import selectFindKind from './s-findkind.vue'

// 异步组件，引入表单子控件
import { formItemToFindItem } from '../nf-el-find-item/map-el-find-item.js'

/*
* 查询子控件，文本类
* * 单行文本
* * 多行文本
* * ulr、电话、邮箱等
*/
export default defineComponent({
  name: 'el-find-item-check',
  inheritAttrs: false,
  props: {
    controlId: Number, // 控件ID
    controlType: Number, // 控件类型
    colName: String, // 字段名称
    modelValue: [Array, String], // 查询结果，数组形式
    colCount: {
      type: Number,
      default: 1
    },
    findKind: {
      type: Array,
      default: () => { return [401, 441] }
    }
  },
  components: {
    'find-kind': selectFindKind
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    // 表单子控件 to 查询子控件 的 字典
    const ctlList = formItemToFindItem
    // console.log('ctlType', ctlList)

    const checkValue = ref('')
    const checkValues = ref([])

    const {
      findChoiceKind, // 选择的查询方式
      findText, // 一个关键字查询
      mySubmit
    } = findItemManage(props, context)
    
    // 提交查询结果
    const myChange = () => {
      if (findChoiceKind.value === 401) {
        // 一个关键字查询
        mySubmit(checkValue.value)
      } else {
        // 查询多个
        mySubmit(checkValues.value)
      }
    }

    // 清空开关、勾选和单选的查询关键字
    const clear = (key) => {
      checkValue.value = false
      checkValues.value = []
      mySubmit('')
    }
   
    // 设置默认查询方式
    findChoiceKind.value = props.findKind[0]

    return {
      checkValue,
      checkValues,
      clear, // 清空开关、勾选和单选的查询关键字
      ctlList, // 控件字典，用于加载具体的控件
      findChoiceKind, // 查询方式
      findText, // 一个查询关键字
      mySubmit,
      myChange // 触发提交事件
    }
  }
})
</script>
