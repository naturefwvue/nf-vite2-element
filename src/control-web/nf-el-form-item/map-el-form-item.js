import { defineAsyncComponent } from 'vue'

/**
 * 组件里面注册控件用
 * * 文本
 * ** el-form-text 单行文本、电话、邮件、搜索
 * ** el-form-area 多行文本
 * ** el-form-password 密码
 * ** el-form-url
 * * 数字
 * ** el-form-number 数字
 * ** el-form-range 滑块
 * * 日期
 * ** el-form-date 日期、年月、年周、年
 * ** el-form-time 时间
 * * 选择
 * ** el-form-checkbox 勾选
 * ** el-form-switch 开关
 * ** el-form-checkboxs 多选组
 * ** el-form-radios 单选组
 * ** el-form-select 下拉选择
 */
export const formItemList = {
  // 文本类 defineComponent
  'el-form-text': defineAsyncComponent(() => import('./t-text.vue')),
  'el-form-area': defineAsyncComponent(() => import('./t-area.vue')),
  'el-form-url': defineAsyncComponent(() => import('./t-url.vue')),
  'el-form-password': defineAsyncComponent(() => import('./t-password.vue')),
  'el-form-autocomplete': defineAsyncComponent(() => import('./t-autocomplete.vue')),
  // 数字
  'el-form-number': defineAsyncComponent(() => import('./n-number.vue')),
  'el-form-range': defineAsyncComponent(() => import('./n-range.vue')),
  // 日期、时间
  'el-form-date': defineAsyncComponent(() => import('./d-date.vue')),
  'el-form-datetime': defineAsyncComponent(() => import('./d-datetime.vue')),
  'el-form-year': defineAsyncComponent(() => import('./d-year.vue')),
  'el-form-month': defineAsyncComponent(() => import('./d-month.vue')),
  'el-form-week': defineAsyncComponent(() => import('./d-week.vue')),
  'el-form-time-select': defineAsyncComponent(() => import('./d-time-select.vue')),
  'el-form-time-picker': defineAsyncComponent(() => import('./d-time-picker.vue')),
  // 选择、开关
  'el-form-checkbox': defineAsyncComponent(() => import('./s-checkbox.vue')),
  'el-form-switch': defineAsyncComponent(() => import('./s-switch.vue')),
  'el-form-checkboxs': defineAsyncComponent(() => import('./s-checkboxs.vue')),
  'el-form-radios': defineAsyncComponent(() => import('./s-radios.vue')),
  'el-form-select': defineAsyncComponent(() => import('./s-select.vue')),
  'el-form-selwrite': defineAsyncComponent(() => import('./s-selwrite.vue')),
  'el-form-select-cascader': defineAsyncComponent(() => import('./s-select-cascader.vue'))

}

/**
 * 动态组件的字典，便于v-for循环里面设置控件
 */
export const formItemListKey = {
  // 文本类
  100: formItemList['el-form-area'], // 多行文本
  101: formItemList['el-form-text'], // 单行文本
  102: formItemList['el-form-password'], // 密码
  103: formItemList['el-form-text'], // 电话
  104: formItemList['el-form-text'], // 邮件
  105: formItemList['el-form-url'], // url
  106: formItemList['el-form-text'], // 搜索
  107: formItemList['el-form-autocomplete'], // 可填可选
  // 数字
  120: formItemList['el-form-number'], // 数字
  121: formItemList['el-form-range'], // 滑块
  // 日期、时间
  110: formItemList['el-form-date'], // 日期
  111: formItemList['el-form-datetime'], // 日期 + 时间
  112: formItemList['el-form-month'], // 年月
  113: formItemList['el-form-week'], // 年周
  114: formItemList['el-form-year'], // 年
  115: formItemList['el-form-time-picker'], // 任意时间
  116: formItemList['el-form-time-select'], // 选择固定时间
  // 选择、开关
  150: formItemList['el-form-checkbox'], // 勾选
  151: formItemList['el-form-switch'], // 开关
  152: formItemList['el-form-checkboxs'], // 多选组
  153: formItemList['el-form-radios'], // 单选组
  160: formItemList['el-form-select'], // 下拉
  161: formItemList['el-form-selwrite'], // 下拉多选
  162: formItemList['el-form-select-cascader'] // 下拉联动

}

