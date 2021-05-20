<!--下拉选择-->
<template>
  <el-cascader
    v-model="value"
    :id="'c' + controlId"
    :name="'c' + controlId"
    :clearable="clearable"
    :props="propsCascader"
    :size="size"
    :options="optionList2"
    :filter-method="filterMethod"
    filterable
  >
  </el-cascader>
</template>

<script>
import { defineComponent } from 'vue'
// 引入组件需要的属性 引入表单子控件的管理类
import { baseProps, controlItemManage } from '/nf-control-web'

const options = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'shejiyuanze',
        label: '设计原则',
        children: [
          { value: 'yizhi', label: '一致' },
          { value: 'fankui', label: '反馈' },
          { value: 'xiaolv', label: '效率' },
          { value: 'kekong', label: '可控' }
        ]
      },
      { 
        value: 'daohang',
        label: '导航',
        children: [
          { value: 'cexiangdaohang', label: '侧向导航' },
          { value: 'dingbudaohang', label: '顶部导航' }
        ]
      }
    ]
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          { value: 'layout', label: 'Layout 布局' },
          { value: 'color', label: 'Color 色彩' },
          { value: 'typography', label: 'Typography 字体' },
          { value: 'icon', label: 'Icon 图标' },
          { value: 'button', label: 'Button 按钮' }
        ]
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          { value: 'radio', label: 'Radio 单选框' },
          { value: 'checkbox', label: 'Checkbox 多选框' },
          { value: 'input', label: 'Input 输入框' },
          { value: 'input-number', label: 'InputNumber 计数器' },
          { value: 'select', label: 'Select 选择器' }, 
          { value: 'cascader', label: 'Cascader 级联选择器' },
          { value: 'switch', label: 'Switch 开关' },
          { value: 'slider', label: 'Slider 滑块' },
          { value: 'time-picker', label: 'TimePicker 时间选择器' }, 
          { value: 'date-picker', label: 'DatePicker 日期选择器' },
          { value: 'datetime-picker', label: 'DateTimePicker 日期时间选择器' }, 
          { value: 'upload', label: 'Upload 上传' },
          { value: 'rate', label: 'Rate 评分' }, 
          { value: 'form', label: 'Form 表单' }
        ]
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          { value: 'table', label: 'Table 表格' },
          { value: 'tag', label: 'Tag 标签' },
          { value: 'progress', label: 'Progress 进度条' },
          { value: 'tree', label: 'Tree 树形控件' },
          { value: 'pagination', label: 'Pagination 分页' },
          { value: 'badge', label: 'Badge 标记' }
        ]
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          { value: 'alert', label: 'Alert 警告' },
          { value: 'loading', label: 'Loading 加载' },
          { value: 'message', label: 'Message 消息提示' },
          { value: 'message-box', label: 'MessageBox 弹框' },
          { value: 'notification', label: 'Notification 通知' }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          { value: 'menu', label: 'NavMenu 导航菜单' },
          { value: 'tabs', label: 'Tabs 标签页' },
          { value: 'breadcrumb', label: 'Breadcrumb 面包屑' },
          { value: 'dropdown', label: 'Dropdown 下拉菜单' },
          { value: 'steps', label: 'Steps 步骤条' }
        ]
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          { value: 'dialog', label: 'Dialog 对话框' },
          { value: 'tooltip', label: 'Tooltip 文字提示' }, 
          { value: 'popover', label: 'Popover 弹出框' }, 
          { value: 'card', label: 'Card 卡片' }, 
          { value: 'carousel', label: 'Carousel 走马灯' }, 
          { value: 'collapse', label: 'Collapse 折叠面板' }
        ]
      }
    ]
  },
  {
    value: 'ziyuan',
    label: '资源',
    children: [
      { value: 'axure', label: 'Axure Components' },
      { value: 'sketch', label: 'Sketch Templates' },
      { value: 'jiaohu', label: '组件交互文档' }
    ]
  }
]

const foo = {
  levelName: ['foo1', 'foo2', 'foo3'],
  foo1: [
    { value: 'zhinan', label: '指南' },
    { value: 'zujian', label: '组件' },
    { value: 'ziyuan', label: '资源' }
  ],
  foo2: [
    { pId: 'zhinan', value: 'shejiyuanze', label: '设计原则' },
    { pId: 'zhinan', value: 'daohang', label: '导航', leaf: true },
    { pId: 'zujian', value: 'basic', label: 'basic', leaf: true },
    { pId: 'zujian', value: 'form', label: 'form', leaf: true }
  ],
  foo3: [
    { pId: 'shejiyuanze', value: 'yizhi', label: '一致', leaf: true },
    { pId: 'shejiyuanze', value: 'fankui', label: '反馈', leaf: true }
  ]
}

const foo2 = [
  { pId: '', value: 'zhinan', label: '指南' },
  { pId: '', value: 'zujian', label: '组件' },
  { pId: '',  value: 'ziyuan', label: '资源' },
  { pId: 'zhinan', value: 'shejiyuanze', label: '设计原则' },
  { pId: 'zhinan', value: 'daohang', label: '导航', leaf: true },
  { pId: 'zujian', value: 'basic', label: 'basic', leaf: true },
  { pId: 'zujian', value: 'form', label: 'form', leaf: true },
  { pId: 'shejiyuanze', value: 'yizhi', label: '一致', leaf: true },
  { pId: 'shejiyuanze', value: 'fankui', label: '反馈', leaf: true }
]

// 获取子节点，一个数组
const getChildrenOne = (data, pid, level) => {
  const arr = []
  // 查找子集
  const opts = data.filter(item => item.pId === pid)
  // 添加子集
  for (let i = 0; i< opts.length; i++) {
    // 遍历arr
    arr.push({
      value: opts[i].value,
      label: opts[i].label + '-1',
      children: [...getChildrenOne(data, opts[i].value, level + 1)]
    })
    if (arr[arr.length - 1].children.length === 0) {
      delete arr[arr.length - 1].children
    }
  }
  return arr
}


// 获取子节点，多个数组
const getChildren = (data, pid, level) => {
  const arr = []
  // 记录最大层数
  const maxLevel = data.levelName.length
 
  if (maxLevel === level) {
    // 没有下一级了
    return arr
  } else {
    // 记录本级的名称
    const levelName = data.levelName[level]
    // 依据父ID查找子集
    const opts = data[levelName].filter(item => item.pId === pid)
   
    // 遍历添加
    for (let i = 0; i< opts.length; i++) {
      // 遍历arr
      arr.push({
        value: opts[i].value,
        label: opts[i].label + '-son',
        children: [...getChildren(data, opts[i].value, level + 1)]
      })
      // 没有children ，删除
      if (arr[arr.length - 1].children.length === 0) {
        delete arr[arr.length - 1].children
      }
    }
    return arr
  }
}

// 递归，浅层转嵌套
const shallowToDeep = (data) => {
  const arr = []
  // 记录每一级的名称
  const levelName = data.levelName
  const opts = data[levelName[0]]
  for (let i = 0; i< opts.length; i++) {
    arr.push({
      value: opts[i].value,
      label: opts[i].label + '-top',
      children: [...getChildren(data, opts[i].value, 1)]
    })
    if (arr[arr.length - 1].children.length === 0) {
      delete arr[arr.length - 1].children
    }
  }
  return arr
}
 

const cascaderManage = (data) => {
  // let id = 0

  const levelName = data.levelName
  // const options = []

  // 级联需要的属性 props
  const propsCascader = {
    // multiple: false, // 单选还是多选 多选返回 value 的二维数组
    lazy: false, // 动态级联
    lazyLoad (node, resolve) { // 响应函数
      // console.log('node', node)
      const { level } = node
      // 判断级数是否超过数组下标
      if (levelName.length >= level) {
        // 找到子数据-
        // console.log(levelName[level])
        const key = levelName[level]
        const newNode = data[key].filter((item) => item.pId === node.value)
        resolve(newNode) // 交给组件
      } else {
        resolve([{
          value: '22',
          label: '选项11',
          leaf: true
        }])
      }
    }
  }

  return {
    propsCascader
  }
}

export default defineComponent({
  name: 'el-from-item-select-cascader',
  props: {
    ...baseProps, // 基础属性
    optionKind: {
      type: String,
      default: 'deep' // deep 前端嵌套风格； shallow 后端浅层多数组风格
    },
    cascaderProps: { // cascader 的 props
      type: String,
      default: () => {} 
    },
    modelValue: [String, Number, Array]
  },
  emits: ['update:modelValue', 'my-change'],
  setup (props, context) {
    const {
      value,
      mySubmit
    } = controlItemManage(props, context)  // value、mySubmit

    const {
      propsCascader
    } = cascaderManage(foo)

    const filterMethod = (node, value) => {
      // console.log('filterMethod1', node)
      // console.log('filterMethod2', value)
    }

    const newOpt = shallowToDeep(foo)
    // console.log('newOpt', newOpt)

    const newOpt2 = getChildrenOne(foo2, '', 0)
    // console.log('newOpt2', newOpt2)

    return {
      propsCascader,
      filterMethod,
      optionList1: options,
      optionList2: newOpt2, //foo.foo1,
      value
    }
  }
})
</script>
