<template>
  <!--表单-->
  <div v-dialogdrag="">
    <el-dialog
      title="收货地址"
      v-model="formState.show"
      :modal="true"
    >
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
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="formState.show = false">取 消</el-button>
          <el-button type="primary" @click="formState.show = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue"
import elForm from '/ctrl/nf-el-form/el-form-div.vue'

// 状态
import VueDS from 'vue-data-state'

</script>

<script setup>

// 属性：模块ID
const props = defineProps({
  moduleId: Number,
  formProps: Object
})

// 访问状态
const { reg, get } = VueDS.useStore()
// 子组件里面获取状态
const dataListState = get.dataListState(props.moduleId)
const formState = get.formState(props.moduleId)

const model = reactive({})
// 定义局部的model
const partModel = reactive({})
// 定义局部的model
const miniModel = reactive({})
 
</script>
