<template>
  <!--查询-->
  <find  moduleId="moduleId" :findProps="findMeta"/>
  <!--按钮-->
  <el-button type="primary" @click="add()"> 添 加 </el-button>
  <!--列表-->
  <elGridList
    v-bind="girdMeta"
    :data-list="dataList"
  />
  <!--分页-->
  <pager/>
  <!--表单-->
  <form1 moduleId="moduleId" :formProps="formMeta"/>
</template>

<script>
import { defineProps, reactive } from "vue"
import { useRouter, onBeforeRouteUpdate} from 'vue-router'
// 状态
import VueDS from 'vue-data-state'


// 从json 加载 列表数据 的 meta
const _girdMeta = reactive({})
const _formMeta = reactive({})
const _findMeta = reactive({reload: true})

// 加载meta
const loadJosn = (id) => {
  // 加载列表
  import('../../../public/json-crud/grid-' + id + '.json').then((data) => {
    // console.log('异步加载', data.default)
    const meta = data.default.gridListMeta
    Object.assign(_girdMeta, meta.baseMeta)
    _girdMeta.itemMeta = meta.itemMeta
  })

  // 加载查询
  import('../../../public/json-crud/find-' + id + '.json').then((data) => {
    // console.log('异步加载', data.default)
    const meta = data.default.findMeta
    Object.assign(_findMeta, meta.baseMeta)
    _findMeta.itemMeta = meta.itemMeta // 表单子控件的属性
    _findMeta.findKind = meta.findKind // 查询方式
    _findMeta.reload = false // 添加重新绑定的开关
  })

  // 加载表单
  import('../../../public/json-crud/form-' + id + '.json').then((data) => {
    console.log('异步加载', data.default)
    const meta = data.default.formMeta
    Object.assign(_formMeta, meta.baseMeta)
    _formMeta.reload = false // 添加重新绑定的开关
    _formMeta.itemMeta = meta.itemMeta // 表单子控件的属性
    _formMeta.formColShow = meta.formColShow // 表单字段的排序
    _formMeta.ruleMeta = meta.ruleMeta // 表单字段的验证方式
    console.log('异步加载22', _formMeta)
  })
}

</script>

<script setup>
// 查询
import find from './find.vue'
// 列表
import elGridList from '/ctrl/nf-el-grid/nf-el-grid-list.vue'
// 分页
import pager from './pager.vue'
// 表单
import form1 from './form.vue'
// 路由

// 属性：模块ID
const props = defineProps({
  moduleId: Number
})

  // 访问状态
  const { reg, get } = VueDS.useStore()
  // 子组件里面获取状态
  const dataListState = reg.dataListState(props.moduleId)
  const formState = reg.formState(props.moduleId)
  const findState = reg.findState(props.moduleId)

  // 返回给 模板 列表的meta
  const girdMeta = _girdMeta

  // 设置 查询的 meta
  const findMeta = _findMeta
  const formMeta = _formMeta

  formState.meta = _formMeta

  const dataList = reactive([])

  // 操作按钮
  // 添加
  const add = () => {
    // 添加数据
    formState.show = true
  }

  // 初始化的时候，依据参数加载meta
  loadJosn(props.moduleId)
  // =============

  // 依据路由，更改meta
  onBeforeRouteUpdate((to, from , next) => {
    console.log('路由', to)
    loadJosn(to.params.moduleId)
    next()
  })

  setTimeout(() => {
    dataList.length = 0
    dataList.push(...[{
      id: 1,
      companyName: '上海某公司',
      date: '2016-05-03',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      id: 2,
      companyName: '上海某公司',
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      id: 3,
      companyName: '上海某公司',
      date: '2016-05-04',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      id: 4,
      companyName: '上海某公司',
      date: '2016-05-01',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      id: 5,
      companyName: '上海某公司',
      date: '2016-05-08',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      id: 6,
      companyName: '上海某公司',
      date: '2016-05-06',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      id: 6,
      companyName: '上海某公司',
      date: '2016-05-07',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }])
  }, 100)

</script>