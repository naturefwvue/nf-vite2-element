<template>
  <!--div形式的全部查询条件-->
  <el-drawer
    title="查询条件"
    :before-close="handleClose"
    v-model="isOpen"
    direction="ttb"
    custom-class="demo-drawer"
    ref="drawer"
    size="300px"
    >
    <el-scrollbar style="height:200px;text-align: left;">
      <el-form
        inline
        label-position="right"
        :model="formModel"
        ref="formControl"
        class="demo-form-expand"
        label-suffix="："
        label-width="100px"
        size="mini"
      >
        <el-form-item
          v-for="(ctrId, index) in allFind"
          :key="'form_'+index"
          style="border:1px solid #cfe1f3;min-height:33px;"
          :style="{width: ( 160 * getCtrMeta(ctrId).colCount + 160 + 6 * (getCtrMeta(ctrId).colCount - 1) ) + 'px'}"
          :label="getCtrMeta(ctrId).label"
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
              @myChange="moreChange">
            </component>
          </template>
        </el-form-item>
        <el-form-item style="width:60px">
          <el-button type="primary" round>查询</el-button>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="moreClose">取 消</el-button>
        <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
      </div>
    </el-scrollbar>
  </el-drawer>
</template>

<script>
import { ref, onMounted, reactive, computed } from 'vue'
import { formItemToFindItem, findItemListKey } from '../nf-el-find-item/map-el-find-item.js'
import { findProps } from '/nf-control-web'

/**
 * 查询控件的管理类
*/
const findManage = (props, context) => {
  // 查询子控件的model
  const findItemModel = ref({})

  // 更多查询里面子控件的事件
  const moreChange = (query, ctlId, colName) => {
    // console.log('more', colName, query)
    props.moreFind(query, ctlId, colName)
  }

  // 抽屉是否打开
  const isOpen = computed({
    get: () => {
      if (props.isShow) {
        // 清空查询条件和子控件的值
        findItemModel.value = {}
        
      }
      return props.isShow
    },
    set: (v) => {
      context.emit('update:isShow', v)
    }
  })

  // 收起抽屉判断快捷是否为空
  const moreClose = () => {
    isOpen.value = false
  }

  return {
    isOpen, // 抽屉是否打开
    findItemModel, // 查询子控件的model
    moreChange, // 更多查询里面子控件的事件
    moreClose // 收起抽屉，设置默认
  }
}

export default {
  props: {
    ...findProps,
    moreFind: Function, // 提供更多查询里面的查询条件
    isShow: Boolean // 是否打开抽屉
  },
  emits:['update:isShow'],
  setup(props, context) {
     // 控件字典
    const ctlList = findItemListKey

    // 依据ID获取组件的meta，因为model不支持【】嵌套
    const getCtrMeta = (id) => {
      return props.itemMeta[id] || {}
    }

    // 获取 $ref
    const drawer = ref(null)
    const formControl = ref(null)
    onMounted(() => {
      // console.log('表单dom', formControl)
    })

    const resetForm = () => {
      // 清空表单
      formControl.value.resetFields()
    }

    const {
      isOpen, // 抽屉是否打开
      findItemModel, // 查询子控件的model
      moreChange, // 更多查询里面子控件的事件
      moreClose // 收起抽屉，设置默认
    } = findManage(props, context)

    return {
      isOpen, // 抽屉是否打开
      // arrQuickFind, // 快捷栏的数组
      ctlList, // 子控件字典
      resetForm, // 重置表单
      formControl, // 获取表单的dom
      getCtrMeta, // 返回子控件的meta
      findItemModel, // 查询子控件的model
      moreChange, // 更多查询里面子控件的事件
      moreClose // 收起抽屉，设置默认
    }
  }
}
</script>