<!--年周 v-bind="$attrs"-->
<template>
  <el-date-picker
    style="width:130px"
    v-model="mydate"
    :size="size"
    type="week"
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

// 类型的字典
const dateType = {
  100: 'dates/datetimerange/daterange/monthrange',
  110: 'date',
  111: 'datetime',
  112: 'month',
  113: 'week',
  114: 'year'
}
 

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
 * ** change 事件的 myChange  value instanceof Date
 */
const dateManage = (value, props) => {
  // 日期控件用的v-model，便于做类型转换
  const mydate = ref('')
  value.value = '' // dayjs(mydate.value).format(props.returnFormat)

  // 把 2021xx 的形式变成 date 类型
  const weekToDate = (week) => {
    if (week === '' || week === 0) {
      return new Date()
    }
    // 拆分week
    const year = week.substr(0, 4)
    const w = week.substr(week.length - 2, 2)
    // console.log (year, w)

    // 计算一月一号是周几
    const dayOfWeek = new Date(year + '-01-01').getDay()
    // 计算第一周的第一天是几号。
    let firstDay = new Date(year + '-01-01')
    switch(dayOfWeek) {
      case 1: // 周一
        firstDay = new Date(year + '-01-01')
        break
      case 2:
        firstDay = new Date(parseInt(year - 1) + '-12-31')
        break
      case 3:
        firstDay = new Date(parseInt(year - 1) + '-12-30')
        break
      case 4: // 周二到周四
        // 1号在第一周，记录下周一的日期，是去年12月份的
        firstDay = new Date(parseInt(year - 1) + '-12-29')
        break
      case 5:
        firstDay = new Date(year + '-01-04')
        break
      case 6: // 周五到周六
        // 下周一为今年第一周
        firstDay = new Date(year + '-01-03')
        break
      case 0: // 周日
        // 下周一为今年第一周
        firstDay = new Date(year + '-01-02')
        break
    }

    // 按照周数计算日期
    return dayjs(firstDay).add(7 * (w-1), 'day').toDate()
  } 

  // 监听属性，设置给 mydate
  watch(() => value.value, (v1, v2) => {
    // 把周数转换成日期
    if (v1 === '') {
      mydate.value = ''
    } else {
      mydate.value = weekToDate(v1)
    }
    // console.log('监听属性值：', v1, mydate.value)

  })

  // 向父组件提交数据。
  const myChange = (val) => {
    if (val === null) {
      // 清空的情况
       value.value = ''
    } else {
      const re = dayjs(val).format(props.returnFormat)
      value.value = re
      // console.log('日期控件值：', re, val)
    }
  }

  return {
    mydate,
    myChange
  }
}

export default defineComponent({
  name: 'el-from-item-week',
  inheritAttrs: false,
  props: {
    ...baseProps, // 基础属性
    showFormat: { // 返回数据的格式化。date：日期类型
      type: String,
      default: 'gggg 第ww周'
    },
    returnFormat: { // 返回数据的格式化。date：日期类型
      type: String,
      default: 'YYYYww'
    },
    modelValue: [String, Date]
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    const { value } = controlItemManage(props, context)
    // console.log('props-date', props)

    return {
      ...dateManage(value, props),
    
    }
  }
})
</script>
