<template>
  基础控件
  {{value}}
  <el-row style="text-align:left">
    <el-col :span="10">
      <el-row>
        <el-col :span="4">文本框</el-col>
        <el-col :span="14">
          <nftext v-bind="propText" v-model="formModel.text"/>
        </el-col>
      </el-row>
      <el-row>
      <el-col :span="4">密码</el-col>
        <el-col :span="14">
          <nfpwd v-bind="propPwd" v-model="formModel.pwd"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">多行</el-col>
        <el-col :span="14">
          <nfarea v-bind="{}" v-model="formModel.area"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">URL</el-col>
        <el-col :span="14">
          <nfurl  v-model="formModel.url"/>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">数字</el-col>
        <el-col :span="14">
          <nfnumber v-bind="{}" v-model="formModel.num"/>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">滑块</el-col>
        <el-col :span="14">
          <nfslider v-bind="{}" v-model="formModel.num"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">日期</el-col>
        <el-col :span="14">
          <nfdate v-bind="{}" v-model="formModel.date"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">年</el-col>
        <el-col :span="14">
          <nfyear v-bind="{}" v-model="formModel.year"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">月</el-col>
        <el-col :span="14">
          <nfmonth v-bind="{}" v-model="formModel.month"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">时间</el-col>
        <el-col :span="14">
          <nftime v-bind="{}" v-model="formModel.time"/>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">颜色</el-col>
        <el-col :span="14">
          <nfcolor v-bind="{}" v-model="formModel.color"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">打钩</el-col>
        <el-col :span="14">
          <nfcheckbox v-bind="{}" v-model="formModel.checkbox"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">开关</el-col>
        <el-col :span="14">
          <nfswitch v-bind="{}" v-model="formModel.switch"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">评分</el-col>
        <el-col :span="14">
          <nfrate v-bind="{}" v-model="formModel.rate"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">单选</el-col>
        <el-col :span="11">
          <nfradios v-bind="propChecks" v-model="formModel.radios"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">多选</el-col>
        <el-col :span="13">
          <nfcheckboxs v-bind="propChecks" v-model="formModel.checkboxs"/>
        </el-col>
      </el-row>
      
    </el-col>
    <el-col :span="7" style="text-align:left">
      表单值：<br>
      <template v-for="(item, key) in formModel" :key="key">
        {{key}}: {{item}}<br>
      </template>
    </el-col>
  </el-row>
  
</template>

<script setup>
import { reactive, ref } from 'vue'
// 组件
import nfcolor from '/ctrl/nf-el-form-item/t-color.vue'
import nftext from '/ctrl/nf-el-form-item/t-text.vue'
import nfarea from '/ctrl/nf-el-form-item/t-area.vue'
import nfpwd from '/ctrl/nf-el-form-item/t-password.vue'
import nfurl from '/ctrl/nf-el-form-item/t-url.vue'
import nfnumber from '/ctrl/nf-el-form-item/n-number.vue'
import nfslider  from '/ctrl/nf-el-form-item/n-range.vue'
import nfrate from '/ctrl/nf-el-form-item/n-rate.vue'
import nfyear  from '/ctrl/nf-el-form-item/d-year.vue'
import nfmonth  from '/ctrl/nf-el-form-item/d-month.vue'
import nfdate  from '/ctrl/nf-el-form-item/d-date.vue'
import nftime  from '/ctrl/nf-el-form-item/d-time-picker.vue'
import nfcheckbox  from '/ctrl/nf-el-form-item/s-checkbox.vue'
import nfswitch  from '/ctrl/nf-el-form-item/s-switch.vue'
import nfradios  from '/ctrl/nf-el-form-item/s-radios.vue'
import nfcheckboxs  from '/ctrl/nf-el-form-item/s-checkboxs.vue'

const propText = {
  controlId: 1000
}

const propPwd = {
  controlId: 1001
}

const propChecks = {
  optionList: [
    {value: 1, label: '选项一'},
    {value: 2, label: '选项二'}
  ]
}


const formModel = reactive({
  text: '',
  area:'',
  pwd: '',
  url: '',
  num: 1,
  date: '',
  year: '2020',
  month: '2021-02',
  time:'',
  checkbox: false,
  switch: false,
  radios: '',
  checkboxs:[],
  color: '',
  rate: 3,
  an: ''
})

const value = ref(0)

</script>