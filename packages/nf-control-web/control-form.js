import { reactive, watch, unref } from 'vue'
import { createModel } from './control-model'

/**
 * 定义表单需要的三个model、字段排序、td占几个位置，
 * 以及 外部属性 赋值 给 内部 model
 * @param { object } props 组件的参数 props
 * @returns 三个model、formColSpan、formColSort
 */
const createFormModel = (props) => {
  // 定义 完整的 v-model
  const formModel = reactive({})
  // 定义局部的 model
  const formPartModel = reactive({})
  // 定义精简的 model，去掉空白和默认值相同的
  const formMiniModel = reactive({})

  // 表单子控件的属性
  const formItemProps = props.itemMeta
  // 表单验证meta，备用
  // const formRuleMeta = props.ruleMeta

  // 根据子控件的meta，设置默认的model
  Object.assign(formModel, createModel(formItemProps))

  // 判断是不是修改和查看状态，是的话设置要修改的model值
  // if (formProps.state !== 'add') {
  // 属性里面的model，叠加给内部的model
  // 依据model，设置属性值
  if (typeof props.modelValue !== 'undefined') {
    for (const key in formModel) {
      if (typeof unref(props.modelValue)[key] !== 'undefined') {
        formModel[key] = unref(props.modelValue)[key]
      }
    }
  }
  // Object.assign(formModel, unref(props.modelValue))
  // Object.assign(formPartModel, unref(props.partModel))
  // Object.assign(formMiniModel, unref(props.miniModel))
  // }

  // 监听属性变化，同步内部model
  watch(() => props.modelValue, (v1, v2) => {
    Object.assign(formModel, unref(props.modelValue))
  })
  watch(() => props.partModel, (v1, v2) => {
    if (typeof props.partModel !== 'undefined') {
      Object.assign(formPartModel, unref(props.partModel))
    }
  })
  watch(() => props.miniModel, (v1, v2) => {
    if (typeof props.miniModel !== 'undefined') {
      Object.assign(formMiniModel, unref(props.miniModel))
    }
  })

  return {
    formModel,
    formPartModel,
    formMiniModel
  }
}

/**
 * 设置表单的各种model
 * @param { object } props 表单组件的属性
 * @returns 
 */
 const setFormModel = (props, context, formModel, formPartModel, formMiniModel) => {
  // 表单子控件的属性
  const formItemProps = props.itemMeta

  // 设置部分model和精简model
  const setPartModel = (controlId, colName) => {
    // 同步到部分model
    if (typeof formPartModel[colName] !== 'undefined') {
      formPartModel[colName] = formModel[colName]
      // 设置精简版
      if (formModel[colName] === formItemProps[controlId].defValue ||
        formModel[colName] === 0 ||
        formModel[colName] === '' ||
        formModel[colName] === null) {
        delete formMiniModel[colName]
      } else {
        formMiniModel[colName] = formModel[colName]
      }
    }
  }

  // 提交部分model和精简model
  const submitPratModel = () => {
    // 提交部分model
    if (typeof props.partModel !== 'undefined') {
      Object.assign(props.partModel, formPartModel)
    }
    // 提交精简的model，formMiniModel
    if (typeof props.miniModel !== 'undefined') {
      Object.assign(props.miniModel, formMiniModel)
    }
  }

  // 向父组件提交 model
  const myChange = (val, controlId, colName) => {
    // 手动设置
    // 提交完整的
    // context.emit('update:modelValue', formModel)
    Object.assign(props.modelValue, formModel)

    setPartModel(controlId, colName)
    submitPratModel()
    // 触发父组件的事件
    context.emit('my-change', val, controlId, colName, formModel, formPartModel)
  }

  // 依据用户选项，创建对应的 model
  const createPartModel = (array) => {
    // 删除内部局部 model 的 属性
    for (const key in formPartModel) {
      delete formPartModel[key]
    }
    for (const key in formMiniModel) {
      delete formMiniModel[key]
    }
    // 删除外部局部 model 的 属性
    for (const key in props.partModel) {
      delete props.partModel[key]
    }
    for (const key in props.miniModel) {
      delete props.miniModel[key]
    }

    // 建立新属性
    for (let i = 0; i < array.length; i++) {
      const colName = formItemProps[array[i]].colName
      formPartModel[colName] = formModel[colName]
    }
    for (let i = 0; i < array.length; i++) {
      const colName = formItemProps[array[i]].colName
      const value = formModel[colName]
      const defValue = formItemProps[array[i]].defValue
      // 值不为空，不和默认值相同，才赋值
      if (value === '') {
      } else if (typeof defValue !== 'undefined' && value === defValue) {
      } else {
        formMiniModel[colName] = value
      }
    }

    // 提交精简的model，formMiniModel
    // 提交部分model
    submitPratModel()
  }

  return {
    setPartModel,
    submitPratModel,
    myChange,
    createPartModel
  }
}

/**
 * 处理一个字段占用几个td的需求
 * @param { object } props 表单组件的属性
 * @returns 
 */
const getColSpan = (props) => {
  // 确定一个组件占用几个格子
  const formColSpan = reactive({})
  
  // 表单子控件的属性
  const formItemProps = props.itemMeta

  // 根据配置里面的colCount，设置 formColSpan
  const setFormColSpan = () => {
    const formColCount = props.formColCount // 列数
    const moreColSpan = 24 / formColCount // 一个格子占多少份

    if (formColCount === 1) {
      // 一列的情况
      for (const key in formItemProps) {
        const m = formItemProps[key]
        if (typeof m.colCount === 'undefined') {
          formColSpan[m.controlId] = moreColSpan
        } else {
          if (m.colCount >= 1) {
            // 单列，多占的也只有24格
            formColSpan[m.controlId] = moreColSpan
          } else if (m.colCount < 0) {
            // 挤一挤的情况， 24 除以 占的份数
            formColSpan[m.controlId] = moreColSpan / (0 - m.colCount)
          }
        }
      }
    } else {
      // 多列的情况
      for (const key in formItemProps) {
        const m = formItemProps[key]
        if (typeof m.colCount === 'undefined') {
          formColSpan[m.controlId] = moreColSpan
        } else {
          if (m.colCount < 0 || m.colCount === 1) {
            // 多列，挤一挤的占一份
            formColSpan[m.controlId] = moreColSpan
          } else if (m.colCount > 1) {
            // 多列，占的格子数 * 份数
            formColSpan[m.controlId] = moreColSpan * m.colCount
          }
        }
      }
    }
  }

  return {
    formColSpan,
    setFormColSpan
  }
}

/**
 * 处理字段排序的需求
 * @param { object } props 表单组件的属性
 * @returns 
 */
const getColSort = (props) => {
  // 定义排序依据
  const formColSort = reactive([])

  // 设置组件的显示顺序
  const setFormColSort = (array = props.colOrder) => {
    formColSort.length = 0
    formColSort.push(...array)
  }
  // 先运行一下
  setFormColSort()

  return {
    formColSort,
    setFormColSort
  }

}

/**
 * 创建表单的验证规则
 * @param { object } props 表单组件的属性
 * @returns 
 */
const getRules = (props) => {
  const rules = {}

  // 表单子控件的属性
  const itemMeta = props.itemMeta

  for (const key in props.ruleMeta) {
    const rule = props.ruleMeta[key]
    rules[itemMeta[key].colName] = rule
  }

  return rules
}

/**
 * @function 表单控件的管理类
 * @description 创建 v-model，创建局部model，设置行列、排序相关的处理
 * @param { object } props 组件参数
 * @param { object } context 上下文
 * @returns { function } 表单管理类
 * * formModel 表单v-model
 * * 创建v-model
 * * 调整列数
 * * 合并
 */
export default function controlForm (props, context) {
  // 定义内部需要的几个对象。
  const {
    formModel, // 完整的表单model
    formPartModel, // 局部的表单model
    formMiniModel // 局部化简的表单model
  } = createFormModel(props)

  // 设置表单的各种model
  const {
    setPartModel,
    submitPratModel,
    myChange,
    createPartModel
  } = setFormModel (props, context, formModel, formPartModel, formMiniModel)

  // 关于一个字段占用几个td的问题
  const {
    formColSpan, // 一个字段占几个td的对象
    setFormColSpan // 设置的函数
  } = getColSpan(props)

  // 先运行一次
  setFormColSpan()

  // 关于字段显示顺序的文
  const {
    formColSort,
    setFormColSort
  } = getColSort(props)

  // 数据变化，联动组件的显示
  if (typeof props.formColShow !== 'undefined') {
    for (const key in props.formColShow) {
      const ctl = props.formColShow[key]
      const colName = props.itemMeta[key].colName
      // 监听组件的值，有变化就重新设置局部model
      watch(() => formModel[colName], (v1, v2) => {
        if (typeof ctl[v1] === 'undefined') {
          // 没有设定，显示默认组件
          setFormColSort()
        } else {
          // 按照设定显示组件
          setFormColSort(ctl[v1])
          // 设置部分的 model
          createPartModel(ctl[v1])
        }
      })
    }
  }

  const rules = getRules(props)

  return {
    // 对象
    formModel, // 完整的 v-model
    formPartModel, // 用户选择的组件的 model
    formMiniModel, // 局部的基础上去掉空白和默认值相同的
    formColSpan, // 确定组件占位
    formColSort, // 确定组件排序
    formRules: rules, // 表单的验证规则
    // 函数
    setFormColSpan, // 设置组件占位
    setFormColSort, // 设置组件排序
    myChange // 提交
  }
}
