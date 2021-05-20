<!--日期-->
<template>
  <div style="float:left;width:65px;text-align:center;">
    <find-kind
      v-model="findChoiceKind"
      :findKind="findKind"
      @change="myChange"
    />
  </div>
  <!--范围查询-->
  <template v-if="findChoiceKind === 417">
    <template v-if="dateChoiceKind === '年周' || dateChoiceKind === '年'">
      <!--年、年周的范围查询-->
      <el-date-picker
        v-model="findText[0]"
        :type="rangeType"
        v-bind="$attrs"
        style="width:120px;"
        @input="myChange"
      >
      </el-date-picker>
      至
      <el-date-picker
        v-model="findText[1]"
        :type="rangeType"
        v-bind="$attrs"
        style="width:120px;"
        @input="myChange"
      >
      </el-date-picker>
    </template>
    <!--日期、日期时间、年月的范围查询-->
    <el-date-picker v-else
      v-model="findText"
      :type="rangeType"
      style="width:256px;"
      :unlink-panels="false"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="myChange"
    >
    </el-date-picker>
  </template>
  <!--非范围查询-->
  <template v-else>
    <el-date-picker
      v-model="findText[0]"
      :type="rangeType"
      v-bind="$attrs"
      style="width:140px;"
      @input="myChange"
    >
    </el-date-picker>
  </template>&nbsp;
  <!--日期类型-->
  <date-kind
    v-model="dateChoiceKind"
    @change="myChange"
  />
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'
// 引入查询子控件的管理类
import { findItemManage } from '/nf-control-web'
// 查询方式的控件
import selectFindKind from './s-findkind.vue'
// 查询方式的控件
import selectDateKind from './s-datekind.vue'
// 查询日期
// import datedom from '../nf-el-form-item/d-date'

// eslint-disable-next-line no-undef
const dateFormat = dayjs // 避免每次使用的时候，都加上面那个注释

export default defineComponent({
  name: 'el-find-item-date',
  props: {
    controlId: Number, // 控件ID
    controlType: Number, // 控件类型
    colName: String, // 字段名称
    modelValue: [Array],
    submitFormat: { // 提交给后端的格式化，使用dayjs实现
      type: String,
      default: () => 'YYYY-MM-DD' // date：取原生date()；timestamp：取时间戳
    },
    findKind: {
      type: Array,
      default: () => [401, 417, 402, 413, 414, 415, 416]
    }
  },
  components: {
    'find-kind': selectFindKind,
    'date-kind': selectDateKind
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    const {
      findChoiceKind, // 用户选择的查询方式
      findText, // 查询关键字
      mySubmit
    } = findItemManage(props, context)
    findChoiceKind.value = 417
    // findText.value = [new Date(), new Date()]
    findText.value = []

    // 日期格式
    const dateChoiceKind = ref('日期')
    // 范围查询类型
    const rangeType = ref('daterange')

    // 根据日期类型，设置日期控件的type
    watchEffect(() => {
      switch (dateChoiceKind.value) {
        case '日期':
          rangeType.value = 'date' + (findChoiceKind.value === 417 ? 'range' : '')
          break
        case '日期时间':
          rangeType.value = 'datetime' + (findChoiceKind.value === 417 ? 'range' : '')
          break
        case '年月':
          rangeType.value = 'month' + (findChoiceKind.value === 417 ? 'range' : '')
          break
        case '年':
          rangeType.value = 'year'
          break
        case '年周':
          rangeType.value = 'week'
          break
      }
    })

    // 提交查询结果
    const myChange = () => {
      let re1 = ''
      let re2 = ''
      switch (props.submitFormat) {
        case 'date':
          re1 = findText.value[0]
          re2 = findText.value[1]
          break
        case 'timestamp':
          re1 = findText.value[0].valueOf()
          re2 = findText.value[1].valueOf()
          break
        default:
          re1 = dateFormat(findText.value[0]).format(props.submitFormat)
          console.log('提交日期', re1)
          re2 = dateFormat(findText.value[1]).format(props.submitFormat)
          console.log('提交日期', re2)
          break
      }
      // const hour = val.getHours().toString().padStart(2, '0')
      // const mm = val.getMinutes().toString().padStart(2, '0')
      // const ss = val.getSeconds().toString().padStart(2, '0')
      // 判断查询方式
      if (findChoiceKind.value === 417) {
        const val = []
        val.push(re1)
        val.push(re2)
        mySubmit([re1, re2]) // 查询关键字
        console.log('日期范围', val)
      } else {
        mySubmit(re1) // 查询关键字
      }
    }

    return {
      dateChoiceKind, // 用户选择的日期类型
      rangeType, // 日期控件的type
      findText,
      findChoiceKind,
      myChange
    }
  }
})
</script>
