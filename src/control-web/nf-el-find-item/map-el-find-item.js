import { defineAsyncComponent } from 'vue'
import { formItemListKey, formItemList } from '../nf-el-form-item/map-el-form-item.js'

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
export const findItemList = {
  // 文本类 defineComponent
  'el-find-base': defineAsyncComponent(() => import('./t-base.vue')),
  'el-find-text': defineAsyncComponent(() => import('./t-text.vue')),
  // 'el-form-area': defineAsyncComponent(() => import('./t-area.vue')),
  // 'el-form-url': defineAsyncComponent(() => import('./t-url.vue')),
  // 'el-form-password': defineAsyncComponent(() => import('./t-password.vue')),
  // 数字
  'el-find-number': defineAsyncComponent(() => import('./t-number.vue')),
  // 日期、时间
  'el-find-date': defineAsyncComponent(() => import('./d-date.vue')),
  'el-find-year': defineAsyncComponent(() => import('./t-year.vue')),
  // 'el-find-datetime': defineAsyncComponent(() => import('./d-datetime.vue')),
  // 'el-find-year': defineAsyncComponent(() => import('./d-year.vue')),
  // 'el-find-month': defineAsyncComponent(() => import('./d-month.vue')),
  // 'el-find-week': defineAsyncComponent(() => import('./d-week.vue')),
  // 'el-find-time-select': defineAsyncComponent(() => import('./d-time-select.vue')),
  // 'el-find-time-picker': defineAsyncComponent(() => import('./d-time-picker.vue'))
  // 选择类
  // 开关和打钩
  'el-find-check': defineAsyncComponent(() => import('./c-check.vue')),
  // 多选组
  'el-find-checks': defineAsyncComponent(() => import('./c-checks.vue')),
  // 单选组
  'el-find-radios': defineAsyncComponent(() => import('./c-radios.vue')),
  'el-find-change': defineAsyncComponent(() => import('./t-change.vue'))
  
}

/**
 * 查询控件用的，动态组件的字典，便于v-for循环里面设置控件
 */
export const findItemListKey = {
  // 文本类
  100: findItemList['el-find-text'], // 多行文本
  101: findItemList['el-find-text'], // 单行文本
  102: findItemList['el-find-text'], // 密码
  103: findItemList['el-find-text'], // 电话
  104: findItemList['el-find-text'], // 邮件
  105: findItemList['el-find-text'], // url
  106: findItemList['el-find-text'], // 搜索
  // 数字
  120: findItemList['el-find-number'], // 数字
  121: findItemList['el-find-number'], // 滑块
  // 日期、时间
  110: findItemList['el-find-date'], // 日期
  111: findItemList['el-find-date'], // 日期 + 时间
  112: findItemList['el-find-year'], // 年月
  113: findItemList['el-find-year'], // 年周
  114: findItemList['el-find-year'], // 年
  115: findItemList['el-find-base'], // 任意时间
  116: findItemList['el-find-base'], // 选择固定时间
  // 选择、开关
  150: findItemList['el-find-check'], // 勾选
  151: findItemList['el-find-check'], // 开关
  152: findItemList['el-find-checks'], // 多选组
  153: findItemList['el-find-radios'], // 单选组
  160: findItemList['el-find-change'], // 下拉
  161: findItemList['el-find-change'], // 下拉多选
  162: findItemList['el-find-change'] // 下拉联动

}

/**
 * 查询控件用的，表单子控件转换成查询子控件，通过类型编号对应不同的组件实现
 */
 export const formItemToFindItem = {
  // 文本类 =》 el-form-text
  100: formItemList['el-form-text'], // 单行文本
  101: formItemList['el-form-text'], // 单行文本
  102: formItemList['el-form-text'], // 单行文本
  103: formItemList['el-form-text'], // 单行文本
  104: formItemList['el-form-text'], // 单行文本
  105: formItemList['el-form-text'], // 单行文本
  106: formItemList['el-form-text'], // 单行文本
  // 数字 =》 el-form-number
  120: formItemList['el-form-number'], // 数组
  121: formItemList['el-form-number'], // 数组
  // 日期 =》 el-form-date
  110: formItemList['el-form-date'], // 日期
  111: formItemList['el-form-datetime'], // 日期 + 时间
  112: formItemList['el-form-month'], // 年月
  113: formItemList['el-form-week'], // 年周
  114: formItemList['el-form-year'], // 年
  // 时间 =》 el-form-time
  115: formItemList['el-form-time-picker'], // 任意时间
  116: formItemList['el-form-time-select'], // 选择固定时间
  // 选择、开关 =》el-form-checkboxs
  150: formItemList['el-form-checkbox'], // 勾选
  151: formItemList['el-form-switch'], // 开关
  152: formItemList['el-form-checkboxs'], // 多选组
  153: formItemList['el-form-radios'], // 单选组
  160: formItemList['el-form-select'], // 下拉
  161: formItemList['el-form-selwrite'], // 下拉
  // 161: findItemForComponent['el-find-selwrite'], // 下拉多选
  162: formItemList['el-form-select-cascader'] // 下拉联动

}