// 基础控件的相关代码，属性，事件等

/**
 * 基础控件的共用属性
 */
export const baseProps = {
  controlId: { // 101 控件ID，必填
    type: Number,
    default: () => Math.floor((Math.random()*10000000)+1) // new Date().valueOf()
  },
  colName: String, // 102 字段名称，必填，避免自动绑定
  controlType: Number, // 104 控件类型编号，必填，识别表单子控件的类型
  size: { // 109 medium / small / mini 三选一，不必填
    type: String,
    default: 'mini',
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return ['medium', 'small', 'mini'].indexOf(value) !== -1
    }
  },
  optionList: { // 备用选项
    type: Array,
    default: () => []
  },
  clearable: { // 统一设置，是否可清空，默认可以清空
    type: Boolean,
    default: true
  },
  validate_event: { // 统一设置，不必填，输入时是否触发表单的校验
    type: Boolean,
    default: true
  },
  show_word_limit: { // 统一设置，不必填，是否显示输入字数统计 text和area有效
    type: Boolean,
    default: true
  }
}

/**
 * 表单控件需要的属性
 */
export const formProps = {
  modelValue: Object, // 完整的model
  partModel: Object, // 根据选项过滤后的model
  miniModel: Object, // 精简的model
  /*
  * 自定义子控件 key:value形式
  * * key: 编号。1：插槽；100-200：保留编号
  * * value：string：标签；函数：异步组件，类似路由的设置
  */
  customerControl: { // 自定义的表单子组件
    type: Object,
    defaule: () => {}
  },
  colOrder: { // 表单字段的排序的依据
    type: Array,
    default: () => []
  },
  formColCount: { // 表单的列数
    type: Number,
    default: 1
  },
  reload: {
    type: Boolean, // 是否重新加载配置，需要来回取反
    default: false
  },
  itemMeta: {
    type: Object, // 表单子控件的属性
    default: () => {}
  },
  ruleMeta: { // 验证信息
    type: Object, 
    default: () => {}
  },
  formColShow: { // 数据变化，联动组件是否显示
    type: Object,
    default: () => {}
  } 
}


/**
 * 查询控件需要的属性
 */
 export const findProps = {
  modelValue: Object, // 完整的model
  quickFind:  { // 快速查询的字段
    type: Array,
    default: () => []
  },
  allFind:  { // 全部查询的字段
    type: Array,
    default: () => []
  },
  customer:  { // 自定义的查询方案
    type: Array,
    default: () => {}
  },
  customerDefault:  { // 默认的查询方案
    type: Array,
    default: 1
  },
  reload: { // 是否重新加载配置，需要来回取反
    type: Boolean,
    default: false
  },
  itemMeta: { // 表单子控件的属性
    type: Object,
    default: () => {}
  },
  findKind: { // 查询方式
    type: Object,
    default: () => {}
  } 
}