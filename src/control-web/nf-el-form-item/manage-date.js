import { ref, watch } from 'vue'
import dayjs from 'dayjs'

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
 export default function (value, props) {
    // 定义内部变量，实现  date 类型和 string 直接的转换
    //const mydate = ref(null)
    let mydate = null
    if (typeof value.value === 'string' || typeof value.value === 'number') {
      if (value.value !== '') {
        // mydate.value = new Date(value.value)
        mydate = new Date(value.value)
        value.value = dayjs(mydate.value).format(props.returnFormat)
      }
    }
    
    // 监听属性，设置给 mydate
    watch(() => value.value, (v1) => {
      // if (typeof v1 === 'string') {
        if (value.value !== '') {
          // mydate.value = new Date(v1)
          mydate = new Date(v1)
        } else {
          // mydate.value = ''
        }
      // }
    })
  
    // 向父组件提交数据。
    const myChange = (val) => {
      if (val === '' || val === null) {
        console.log('清空：', val)
        value.value = '' // 提交给父组件
      } else {
        const re = dayjs(val).format(props.returnFormat)
        console.log('选择：', val, re)
        value.value = re // 提交给父组件
      }
    }
  
    return {
      mydate,
      myChange
    }
  }