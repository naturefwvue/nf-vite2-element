<template>
  <el-row :gutter="50" style="text-align:left">
    <el-col :span="13">
      <div style="padding-left:20px;">
        列数：<el-slider v-model="formProps.formColCount" :min="1" :max="5"></el-slider>
        <elForm
          ref="formControl"
          v-model="model"
          v-model:partModel="partModel"
          v-model:miniModel="miniModel"
          v-bind="formProps">
            <template v-slot:text="">
              <h3>使用插槽建立的子控件</h3>
              <el-input v-model="model.text" placeholder="请输入内容"></el-input>
            </template>
        </elForm>
        <el-button type="" @click="addData">添加数据</el-button>
      </div>
    </el-col>
    <el-col :span="6">
      <!--排序-->
      <div @dragover="allowDrop($event)">
        <div :style="styleCol"
          v-for="(id, index) in formProps.colOrder"
          :key="index"
          draggable="true"
          @dragstart="myDrag(id, index)"
          @mousemove="myMove"
        >
          {{formProps.itemMeta[id].label}}
          <span style="font-size:9px;color:blue;" @drop="myDrop1(id, index, $event)">
            插入
          </span>
          <span style="font-size:9px;color:blue;" @drop="myDrop2(id, index, $event)">
            交换
          </span>
          <!--设置一个组件占多少格子-->
          <elselect
            @change="spanChange"
            style="width:90px;"
            v-model="formProps.itemMeta[id].colCount"
            v-bind="spanSelectMeta"
          />
        </div>
      </div>
    </el-col>
    <el-col :span="5">
      完整的 model 值：<br><br>
      <template v-for="(item, key) in model" :key="key">
        {{key}}：{{item}}<br>
      </template>
      <br>
      <hr>
      局部的 model 值：<br><br>
      <template v-for="(item, key) in partModel" :key="key">
        {{key}}：{{item}}<br>
      </template>
      <hr>
      局部精简的 model 值：<br><br>
      <template v-for="(item, key) in partModel" :key="key">
        {{key}}：{{item}}<br>
      </template>
    </el-col>
   
  </el-row>
</template>

<script>

// 设置组件占位的meta
const spanSelectMeta1 = {
  controlId: 9527,
  colName: 'controlType',
  controlType: 160,
  defValue: '1',
  optionList: [
    { value: 1, label: '一格' },
    { value: 2, label: '二格' },
    { value: 3, label: '三格' },
    { value: 4, label: '四格' },
    { value: -2, label: '一半' },
    { value: -3, label: '三份' },
    { value: -4, label: '四份' },
    { value: -5, label: '五份' }
  ]
}

// 拖拽排序的框
const styleCol1 = {
  width: '230px',
  height: '22px',
  margin: '4px',
  padding: '5px',
  border: '1px solid #eee'
}

// 拖拽排序管理类
const dragManage = (meta) => {
  // 记录拖拽组件的数据
  const ctl = reactive({
    id: 1, // 组件ID
    index: 1 // 在数组里的下标
  })

  // 允许拖拽，拦截默认事件
  const allowDrop = (ev) => {
    ev.preventDefault()
  }

  // 选择的字段
  const myDrag = (id, index) => {
    ctl.id = id
    ctl.index = index
  }

  // 小号插入大号的前面
  const myDrop1 = (id, index, e) => {
    console.log('myDrop1', e)

    if (ctl.index < index - 1) {
      for (let i = ctl.index; i < index; i++) {
        meta.colOrder[i] = meta.colOrder[i + 1]
      }
      meta.colOrder[index - 1] = ctl.id
    }
    meta.reload = !meta.reload
  }
  // 交互顺序
  const myDrop2 = (id, index, e) => {
    meta.colOrder[ctl.index] = id
    meta.colOrder[index] = ctl.id
    meta.reload = !meta.reload
  }

  // 拖拽经过
  const myMove = (e) => {
    // console.log('拖拽经过', e)
  }

  return {
    allowDrop,
    myMove,
    myDrag,
    myDrop1,
    myDrop2
  }
}
</script>

<script setup>
  import { reactive, ref, onMounted, watch } from 'vue'
  import { createModel, toChildMeta } from '/nf-control-web'
  import elForm from '/ctrl/nf-el-form/el-form-div.vue'
  import elselect from '/ctrl/nf-el-form-item/s-select.vue'

  // webSQL
  import { webSQLVue } from 'nf-web-storage'

  import json from '/json/form-test.json'

  // @ is an alias to /src

  // 读取json，获得配置。
  const formTest = json.formTest
  const formProps = reactive(formTest.baseProps) // 表单自己的属性
  // 添加重新绑定的开关
  formProps.reload = false
  formProps.itemMeta = formTest.itemMeta // 表单子控件的属性
  formProps.formColShow = formTest.formColShow // 表单字段的排序
  formProps.ruleMeta = formTest.ruleMeta // 表单字段的验证方式
  console.log('formProps', formProps)

  // 依据meta 创建model
  const model = createModel(formTest.itemMeta)
  // model.date = '2021-03-04'
  // model.text = '外面设置的初始值22'
  // 定义局部的model
  const partModel = reactive({})
  // 定义局部的model
  const miniModel = reactive({})

  // 子控件的meta
  const childMeta = toChildMeta(formProps.itemMeta)


  // 重新渲染表单
  const spanChange = () => {
    formProps.reload = !formProps.reload
  }

  // 实现拖拽排序的功能
  const {
    allowDrop,
    myMove,
    myDrag,
    myDrop1,
    myDrop2
  } = dragManage(formProps)
  
  const spanSelectMeta = spanSelectMeta1
  const styleCol = styleCol1

  // 数据联动

  watch (() => model.radio, (v1, v2) => {
    console.log('监听值的变化', v1)
    model.checks = []
    const arr = [
      {"value": 1 + v1, "label": `单选${v1}的planA` + v1},
      {"value": 2 + v1, "label": `单选${v1}的planB` + v1}
    ]
    // formProps.itemMeta[152].optionList.length = 0
    // formProps.itemMeta[152].optionList.push(...arr)

    childMeta.checks.optionList.length = 0
    childMeta.checks.optionList.push(...arr)

  })


  // 设置插槽
  // childMeta.text.controlType = 1

  // 添加临时动态组件
  formProps.customerControl = {
    300: 'el-transfer'
  }
  // 设置表单字段
  // childMeta.select.controlType = 300

  // 重置表单
  // 获取 $ref
  const formControl = ref(null)
  onMounted(() => {
    console.log('表单dom', formControl)
  })
  const resetForm = () => {
    // 清空表单
    formControl.value.resetForm()
  }


  // 数据库
  const { crudtest } = webSQLVue.useHelp()

  // 添加数据到webSQL
  const addData = () => {
    crudtest.insert(model).then((id) => {
      // 返回
      console.log('新记录', id)
    })
  }

</script>