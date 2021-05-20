<template>
  <el-form
    :model="formModel"
    :rules="rules"
    ref="formControl"
    :inline="false"
    class="demo-form-inline"
    label-suffix="："
    label-width="130px"
    size="mini"
  >
    <el-row>
      <!--不循环row，直接循环col，放不下会自动往下换行。-->
      <el-col
        v-for="(ctrId, index) in formColSort"
        :key="'form_'+index"
        :span="formColSpan[ctrId]"
      ><!--:prop="getCtrMeta(ctrId).colName"-->
        <transition name="el-fade-in-linear">
          <el-form-item
            :label="getCtrMeta(ctrId).label"
            :prop="getCtrMeta(ctrId).colName"
          >
            <!--判断要不要加载插槽-->
            <template v-if="getCtrMeta(ctrId).controlType === 1">
              <!--<slot :name="ctrId">父组件没有设置插槽</slot>-->
              <slot :name="getCtrMeta(ctrId).colName">父组件没有设置插槽</slot>
            </template>
            <!--占空位-->
            <template v-else-if="ctrId===0">
            </template>
            <!--表单item组件，采用动态组件的方式-->
            <template v-else>
              <component
                draggable="true"
                @dragover="$event.preventDefault()"
                :is="dictControl[getCtrMeta(ctrId).controlType]"
                v-model="formModel[getCtrMeta(ctrId).colName]"
                v-bind="getCtrMeta(ctrId)"
                @my-change="myChange">
              </component>
            </template>
          </el-form-item>
        </transition>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { watch, ref, onMounted, defineAsyncComponent, reactive } from 'vue'
// 注册表单子控件
import { formItemListKey } from '../nf-el-form-item/map-el-form-item.js'
// 表单控件的管理代码 表单控件的属性
import { formManage, formProps } from '/nf-control-web'

/**
 * @function div格式的表单控件
 * @description 可以依据json动态生成表单，可以多行多列、排序、插槽、自定义子组件、验证等
 * @returns {*} Vue组件，表单控件
 */
export default {
  name: 'el-form-div',
  props: {
    ...formProps // 表单属性
  },
  setup (props, context) {
    // 控件字典
    const dictControl = formItemListKey
    // console.log(formItemList)
    // 可以添加调用者定义的自定义子控件
    // 字符串，直接添加
    // 函数，添加函数 defineAsyncComponent
    for (const key in props.customerControl) {
      const ctrl = props.customerControl[key]
      if (typeof ctrl === 'string') {
        dictControl[key] = ctrl
      } else if (typeof ctrl === 'function') {
        dictControl[key] = defineAsyncComponent(ctrl)
      }
    }

    // 表单管理类
    const {
      formModel, // 依据meta，创建 Model
      // formMiniModel, // 精简的model
      formColSpan, // 依据meta，创建 span
      formColSort,
      formRules, // 表单验证规则
      setFormColSpan,
      setFormColSort, // 设置组件排序
      myChange
    } = formManage(props, context)

    // 监听列数的变化
    watch(() => props.formColCount, (v1, v2) => {
      setFormColSpan()
    })
    // 监听reload
    watch(() => props.reload, (v1, v2) => {
      Object.assign(formModel, props.modelValue)
      // Object.assign(formModel, props.partModel)
      // Object.assign(formModel, props.miniModel)
      setFormColSpan()
      setFormColSort()
    })

    // 依据ID获取组件的meta，因为model不支持【】嵌套
    const getCtrMeta = (id) => {
      return props.itemMeta[id] || {}
    }

    // 表单验证的测试
    const rules = reactive(formRules)

    // 获取 $ref
    const formControl = ref(null)
    onMounted(() => {
      // console.log('表单dom', formControl)
    })

    const resetForm = () => {
      // 清空表单
      formControl.value.resetFields()
    }

    console.log('表单控件的model', formModel)

    return {
      resetForm, // 重置表单
      formControl, // 获取表单dom
      formModel, // 实体类
      rules, // 验证规则
      formColSpan, // 一个子控件占几份
      formColSort, // 排序依据
      dictControl, // 子控件字典
      getCtrMeta, // 返回子控件的meta
      myChange
    }
  }
}
</script>
