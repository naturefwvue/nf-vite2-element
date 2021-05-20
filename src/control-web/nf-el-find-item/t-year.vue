<!--年、年月、年周查询-->
<template>
  <!--范围方式-->
  <div style="float:left;width:65px;text-align:center;">
    <find-kind
      v-model="findChoiceKind"
      :findKind="findKind"
      @change="myChange('kind')"
    />
  </div>
  <div :style="{width: (150 * colCount - 10 ) + 'px'}" style="float:left;">
    <!--范围查询-->{{findRange}}
    <template v-if="findChoiceKind === 417 || findChoiceKind === 427">
      <component
        :is="ctlList[controlType]"
        v-model="findRange[0]"
        v-bind="$attrs"
        @myChange="myChange('range1')">
      </component>
      至
      <component
        :is="ctlList[controlType]"
        v-model="findRange[1]"
        v-bind="$attrs"
        @myChange="myChange('range2')">
      </component>
    </template>
    <!--单条件查询-->
    <template v-else>
      <div style="float:left;" :style="{width: (150 * colCount - 40 ) + 'px'}">
        <component
          :is="ctlList[controlType]"
          v-model="findText"
          v-bind="$attrs"
          @myChange="myChange('text')">
        </component>
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent, watchEffect } from 'vue'
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
  name: 'el-find-item-text',
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
      type: Array, // , 418, 419
      default: () => { return [401, 417, 402, 413, 414, 415, 416] }
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

    const {
      findChoiceKind, // 选择的查询方式
      findText, // 一个关键字查询
      findRange, // 范围查询
      mySubmit
    } = findItemManage(props, context)
    
    // 根据控件类型设置初始条件
    switch (props.controlType) {
      case 152:
        findText.value = []
        break
    }

    // 提交查询结果
    const myChange = (kind) => {
      switch (kind) {
        case 'kind': // 查询方式的变化
          if (findChoiceKind.value === 417) {
            // 使用范围查询
            findRange.value = [findText.value, findText.value]
          } else {
            // 使用其他
            if (findRange.value[0] !== '') {
              findText.value = findRange.value[0]
            }
          }
          break
          
      }

      switch (findChoiceKind.value) {
        case 417:
        case 427:
          // 范围查询，开始到结束，提交数组
          const _arr = [findRange.value[0], findRange.value[1]]
          mySubmit(_arr)
          break
        default:
          // 一个关键字查询
          mySubmit(findText.value)
          break
      }
    }
  
    // 设置默认查询方式
    findChoiceKind.value = props.findKind[0]

    return {
      ctlList, // 控件字典，用于加载具体的控件
      findChoiceKind, // 查询方式
      findText, // 一个查询关键字
      findRange, // 范围查询
      mySubmit,
      myChange // 触发提交事件
    }
  }
})
</script>
