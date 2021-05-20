<template>
  <!--快捷查询-->
  <el-card class="box-card">
    <el-scrollbar>
      <div class="flex-content" style="min-width:400px;">
        <el-form
          inline
          label-position="right"
          :model="findItemModel"
          ref="formControl"
          class="demo-form-expand"
          label-width="1px"
          size="mini"
        >
          <el-form-item style="width:100px">
            <el-dropdown size="small">
              <el-button type="primary">
                快捷查询<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    @click="quickClick(0)"
                  >
                    快捷查询
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-for="(item, key, index) in customer"
                    :key="'quick_' + index"
                    @click="quickClick(key)"
                  >
                    {{item.title}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-form-item>
          <el-form-item
            v-for="(ctrId, index) in arrQuickFind"
            :key="'find_quick_'+index"
            style="border:1px solid #cfe1f3;min-height:33px;"
            :style="{width: ( 160 * getCtrMeta(ctrId).colCount + 80) + 'px'}"
          >
            <!--判断要不要加载插槽-->
            <template v-if="getCtrMeta(ctrId).controlType === 1">
              <slot :name="ctrId">父组件没有设置插槽</slot>
            </template>
            <!--查询的子控件，采用动态组件的方式-->
            <template v-else>
              <component
                :is="ctlList[getCtrMeta(ctrId).controlType]"
                v-model="findItemModel[ctrId]"
                v-bind="getCtrMeta(ctrId)"
                @myChange="mySubmit">
              </component>
            </template>
          </el-form-item>
          <el-form-item style="width:60px">
            <el-button type="primary" round @click="moreOpen">更多</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
  </el-card>
  <!--更多查询，放在抽屉里面-->
  <findmore
    :allFind="allFind"
    :reload="reload"
    :itemMeta="itemMeta"
    :findKind="findKind"
    :moreFind="moreFind"
    v-model:isShow="isShow"
  />
</template>

<script>
import { ref, onMounted, reactive, watch } from 'vue'
import { formItemToFindItem, findItemListKey } from '../nf-el-find-item/map-el-find-item.js'
import { findProps } from '/nf-control-web'
import findmore from './el-find-more-div.vue'

/**
 * 查询控件的管理类
*/
const findManage = (props, context) => {
  // 查询控件需要的meta
  const findMeta = props.baseMeta
  // 查询子控件需要的meta
  const findItemMeta = props.itemMeta
  // 查询子控件的 model
  const findItemModel = ref({})
  // 快捷查询的数组
  const arrQuickFind = reactive([])

  // 提交给外部的查询条件
  const findModel = props.modelValue || {}
  
  // 抽屉是否打开
  const isShow = ref(false)

  // 打开抽屉显示更多查询字段
  const moreOpen = () => {
    isShow.value = true
  }

  // 当属性变化的时候，重新设置 meta
  const reset = () => {
    // 清空子控件的值
    findItemModel.value = {}
    // 清空已有的查询条件
    for (const key in findModel) {
      delete findModel[key]
    }
    // 关闭更多查询的抽屉
    isShow.value = false

    // 重新加载快捷查询
    arrQuickFind.length = 0
    arrQuickFind.push(...props.quickFind)

    // 修改默认属性，以适合查询环境
    for (const key in findItemMeta) {
      const meta = findItemMeta[key]
      // 修改默认属性
      switch (meta.controlType) {
        case 100:
          meta['show-word-limit'] = false
          break
        case 101:
          meta['show-word-limit'] = false
          break
      }
    }
  }

  // 默认的初始化
  reset()
  
  // meta 变化的时候，重新加载属性
  watch (() => props.reload, () => {
    reset()
  })

  // 子控件变化时，向上层组件返回查询对象
  const mySubmit = (query, ctlId, colName) => {
    // console.log('ss', colName, query)
    if (typeof query[1] === 'undefined' || query[1] === '' || query[1] === null) {
      // 删掉不想查询的字段
      delete findModel[colName]
    } else {
      // 设置查询条件
      findModel[colName] = query
    }
  }

  // 个性化方案的单击事件，显示选择的个性化查询字段
  const quickClick = (key) => {
    // 清空已有的查询条件
    for (const key in findModel) {
      delete findModel[key]
    }
    // 清空子控件的值
    findItemModel.value = {}

    if (key === 0) { // 显示默认的快捷查询
      arrQuickFind.length = 0
      arrQuickFind.push(...props.quickFind)
    } else { // 显示用户选择的个性化查询方案
      arrQuickFind.length = 0
      arrQuickFind.push(...props.customer[key].ids)
    }
  }

  // 接收更多查询里面传递的查询条件
  const moreFind = (query, ctlId, colName) => {
    if (!isShow.value) return // 没打开呢，不管
    console.log('更多查询条件', query, isShow)
    
    if (Object.keys(findModel).length === 0) {
      // 清空快捷查询原有的查询字段
      arrQuickFind.length = 0
    }
    // 设置条件，显示字段
    if (arrQuickFind.filter((id) => id === ctlId).length === 0) {
      arrQuickFind.push(ctlId)
    }

    if (typeof query[1] === 'undefined' || query[1] === '' || query[1].length === 0) {
      const quickIndex = arrQuickFind.findIndex(a => a === ctlId)
      if (quickIndex > -1 ) {
        arrQuickFind.splice(quickIndex,1)
      }
    }
    
    findItemModel.value[ctlId] = query // 绑定查询值
    mySubmit(query, ctlId, colName) // 提交给外部
  }

  return {
    moreFind, // 接收更多查询 更多查询里面子控件的事件
    isShow, // 抽屉是否打开
    arrQuickFind, // 快捷栏的数组
    findItemModel, // 查询子控件的model
    moreOpen, // 点击更多，清空快捷
    quickClick, // 个性化方案的单击事件
    mySubmit // 查询子控件的事件
  }
}

/**
 * @function div 格式的查询控件
 * @description 可以依据 json 动态生成查询控件
 * @returns {*} Vue 组件，查询控件
 */
export default {
  name: 'el-find-div',
  components: {
    findmore
  },
  props: {
    ...findProps
  },
  setup (props, context) {
    // console.log('查询控件props', props)
    // 控件字典
    const ctlList = findItemListKey

    // 依据ID获取组件的meta，因为 model 不支持【】嵌套
    const getCtrMeta = (id) => {
      return props.itemMeta[id] || {}
    }

    // 获取 $ref
    const formControl = ref(null)
    onMounted(() => {
      // console.log('表单dom', formControl)
    })

    const resetForm = () => {
      // 清空表单
      formControl.value.resetFields()
    }

    const {
      moreFind, // 接收更多查询 更多查询里面子控件的事件
      isShow, // 抽屉是否打开
      arrQuickFind, // 快捷栏的数组
      findItemModel, // 查询子控件的model
      moreOpen, // 点击更多，清空快捷
      quickClick, // 个性化方案的单击事件
      mySubmit // 查询子控件的事件
    } = findManage(props, context)

    return {
      isShow, // 抽屉是否打开
      moreFind, // 接收更多查询
      arrQuickFind, // 快捷栏的数组
      ctlList, // 子控件字典
      resetForm, // 重置表单
      formControl, // 获取表单的dom
      getCtrMeta, // 返回子控件的meta
      findItemModel, // 查询子控件的model
      moreOpen, // 点击更多，清空快捷
      quickClick, // 个性化方案的单击事件
      mySubmit
    }
  }
}
</script>
