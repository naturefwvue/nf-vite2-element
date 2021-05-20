<!--查询用的单行文本-->
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
    <!--范围查询-->
    <template v-if="findChoiceKind === 417 || findChoiceKind === 427">
      <component
        :is="ctlList[controlType]"
        v-model="findRange[0]"
        v-bind="$attrs"
        @myChange="myChange">
      </component>
      至
      <component
        :is="ctlList[controlType]"
        v-model="findRange[1]"
        v-bind="$attrs"
        @myChange="myChange">
      </component>
    </template>
    <!--单条件查询-->
    <template v-else>
      <div style="float:left;" :style="{width: (150 * colCount - 40 ) + 'px'}">
        <component
          :is="ctlList[controlType]"
          v-model="findText"
          v-bind="$attrs"
          @myChange="myChange">
        </component>
      </div>
      <div style="float:left;" v-if="controlType >= 150 || controlType === 151 || controlType === 153 || controlType === 160">
        &nbsp;&nbsp;&nbsp;<i class="el-icon-error" @click="clear" style="cursor:pointer"></i>
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
* 查询子控件，基础版，包括文本查询、数字查询、下拉选择、单选组、复选组、日期和时间
*
*/
export default defineComponent({
  name: 'el-find-item-base',
  inheritAttrs: false,
  props: {
    controlId: Number, // 控件ID
    controlType: Number, // 控件类型
    colName: String, // 字段名称
    modelValue: [Array, String, Object], // 查询结果，数组形式
    colCount: {
      type: Number,
      default: 1
    },
    findKind: {
      type: Array,
      default: () => { return [] }
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
    const myChange = () => {
      switch (findChoiceKind.value) {
        case 417:
        case 427:
          // 范围查询，开始到结束，提交数组
          mySubmit(findRange.value)
          break
        case 441:
          if (props.controlType === 153) {
            props.controlType = 152
          }
          mySubmit(findText.value)
          break
        default:
          // 一个关键字查询
          mySubmit(findText.value)
          break
      }
    }

    // 清空开关、勾选和单选的查询关键字
    const clear = (key) => {
      mySubmit('')
      switch (props.controlType) {
        case 152:
        case 161:
          findText.value = []
          break
        case 150:
        case 151:
          findText.value = null
          break
        default:
          findText.value = ''
          break
      }
      findRange.value = []
    }

    // 根据控件类型设置默认的查询方式
    watchEffect (() => {
      props.findKind.length = 0
      switch(props.controlType) {
        case 100: // 文本类
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
          props.findKind.push(...[403, 401, 402, 404, 405, 406, 407, 408])
          
          break
        case 120: // 数字类
        case 121: // 数字类
          props.findKind.push(...[401, 417, 402, 413, 414, 415, 416, 418, 419])
          break
        case 110: // 日期
        case 111: // 日期时间
        case 112: // 年月
        case 113: // 年周
        case 114: // 年
          props.findKind.push(...[401, 417, 402, 413, 414, 415, 416, 418, 419])
          break
        case 115: // 任意时间
        case 116: // 选择时间
          props.findKind.push(...[401, 417, 402, 413, 414, 415, 416, 418, 419])
          break
        case 150: // 勾选
        case 151: // 开关
          props.findKind.push(...[401])
          break
        case 153: // 单选
          props.findKind.push(...[401])
          break
        case 152: // 多选
        case 161: // 下拉多选
          props.findKind.push(...[401, 402, 441])
          break
        case 160: // 下拉
        case 162: // 下拉联动
          props.findKind.push(...[401, 402])
          break
       
      }
      
    })

    // 设置默认查询方式
    findChoiceKind.value = props.findKind[0]

    return {
      clear, // 清空开关、勾选和单选的查询关键字
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
