<template>
  <!--演示查询控件-->
  <nf-find
    v-model="query"
    v-bind="formProps"
  />
  查询条件：{{query}}
  <!--数据列表 演示查询结果-->
  <findGrid :dataList="dataList"/>
  <!--可以分页-->
  <findPager/>
  
</template>

<script>
import { reactive, watch } from 'vue'
import findCom from '../control-web/nf-el-find/el-find-div.vue'

// 组件
import findGrid from './find-grid.vue'
import findPager from './find-pager.vue'

import json from '/json/find-test.json'

// 数据列表的状态
import dataListControl from '../control/data-list'


export default {
  name: 'eleFindComponent',
  components: {
    findGrid,
    findPager,
    'nf-find': findCom
  },
  setup () {
    const query = reactive({})
  
    const findTest = json.findTest
    // 读取json，获得配置。
    const formProps = reactive({})
    // 添加重新绑定的开关
    formProps.reload = false

    // 模拟异步加载meta
    setTimeout(() => {
      Object.assign(formProps, findTest.baseProps)
      formProps.itemMeta = findTest.itemMeta // 表单子控件的属性
      formProps.findKind = findTest.findKind // 查询方式
      formProps.reload = !formProps.reload
    }, 1)
   
    // 设置组件类型
    // meta.itemMeta[103].optionList = typeOptionList
    // console.log('formProps', formProps)

    // 获取操作函数：注入状态，列表数组，
    const { regDataListState, dataList } = dataListControl('findtest')
    
    // 注册状态，注入获取博文列表需要 查询条件 和 分页信息
    const findState = regDataListState()
    // blogState.find.title = ''
    findState.find = {}
    findState.findKind = {}

    findState.isReload = !findState.isReload

    watch (() => query, () => {
      findState.find = {}
      findState.findKind = {}
      for (const key in query) {
        const q = query[key]
        findState.find[key] = q[1]
        findState.findKind[key] = q[0]
      }
      findState.isReload = !findState.isReload
    }, {deep: true})

    return {
      query,
      dataList,
      // 渲染表单的meta
      formProps 
    }
  }
}
</script>
