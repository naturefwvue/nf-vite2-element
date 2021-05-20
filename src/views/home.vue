<template>
  首页
  <br>
  基于 element-plus 做的二次开发，做几个好用的控件。<br><br>

  传声筒：<br>
  <inputtext
    ref="refInput"
    v-model="value"
    v-bind="props"
    @clear="clear"
    @my-change="myChange"
  >
    <template #suffix>
      <i class="el-input__icon el-icon-date"></i>
    </template>
    <template #prepend>
      <el-select v-model="select" placeholder="请选择">
        <el-option label="餐厅名" value="1"></el-option>
        <el-option label="订单号" value="2"></el-option>
        <el-option label="用户电话" value="3"></el-option>
      </el-select>
    </template>
  </inputtext>
  {{value}}

  <el-button @click="retChage" >测试</el-button><hr>
  ret2：{{ret2}}<br><br>
  ret3：{{ret3}}<br><br>
  ret3.b：{{ret3.b}}<br><br>
  ret3_b2: {{ret3_b2}}

  <hr>
  测试日期组件的赋值问题：
  <el-date-picker
    v-model="mydate"
    type="date"
    defValue="dd"
    placeholder="选择年">
  </el-date-picker>
  <el-button type="" @click="clearDate">清空</el-button>
  {{mydate}}
</template>

<script>
// proxy 的测试
const myProxy = (_target, callback, arr) => {
  let _change = (key, value) => {console.log('内部函数')}
  const _arr = arr || []
  const proxy = new Proxy(_target, {
    get: function (target, key, receiver) {
      switch (key) {
        case '__v_isRef':
        case 'toJSON':
        case 'symbol':
        case 'Symbol(Symbol.toStringTag)':
          break;
        default:
          // 判断是不是对象
          if (typeof target[key] === 'object') {
            // console.log(`获取 对象 ${key}!`, target[key])
            // _arr.push(key)
            // 源头监听
            if (typeof callback === 'function') {
              callback('get', key, target[key], _arr)
            }
          } else if (typeof key !== 'symbol') {
            // console.log('获取 属性 ', key, target[key])
          }
          break;
      }

      // 调用原型方法
      const res = Reflect.get(target, key, target)
      if (typeof res === 'object') {
        // Convert returned value into a proxy as well. we do the isObject check
        // here to avoid invalid value warning. Also need to lazy access readonly
        // and reactive here to avoid circular dependency.
        return myProxy(res, callback, _arr) // 递归
      }
      return res
    },
    set: function (target, key, value, receiver) {
      if (key !== '__watch') {
        // 源头监听
        if (typeof callback === 'function') {
          callback('set', key, value, _arr)
        }
        // 任意位置监听
        if (typeof _target.__watch === 'function') {
          _change(key, value)
        }
        // console.log('路径：', _arr.join('-'))
        _arr.length = 0
        // console.log(`设置 ${key}：${value}!`)
      }
      
      // 调用原型方法
      return Reflect.set(target, key, value, target)
    }
  })
  // 实现任意位置的监听，
  proxy.__watch = (callback) => {
    if (typeof callback === 'function') {
      _change = callback
    }
  }
  // 返回实例
  return proxy
}

</script>

<script setup>
import { defineProps, reactive, ref, onMounted } from 'vue'
import inputtext from '../components/my-input.vue'

const value = ref('222')

const props = reactive({
  maxlength: 10,
  'show-word-limit': true,
  clearable: true
})

// UI库自带事件测试 clear
const clear = () => {
  console.log('clear')
}

// 自定义事件测试
const myChange = (val) => {
  console.log('myChange', val)
}

// 测试方法
const refInput = ref(null)

onMounted(() => {
  console.log('refinput', refInput)
  // refInput.value.setInput()
  refInput.value.refInput.select()
  refInput.value.$refs.refInput.select()
  
})


const testret = reactive({
  name: '11',
  info: {
    count: 1,
    size: 10
  }
})

const ret2 = myProxy(testret, (kind, key, value, path) => {
  // console.log(`ret2-定义端监听：【${kind}】 ${key}-`, value, path)
})

const ret3 = myProxy({
  a:'11',
  b: {
    b1:'',
    b2: {
      b21: {
        b211: '111'
      }
    },
    b3: {
      b31: {
        b311: '2222'
      }
    }
  }
}, (kind, key, value, path) => {
  // console.log(`ret3 - 定义端监听：【${kind}】 ${key}-`, value, path)
})

const ret3_b2 = ret3.b.b2
// console.log(ret3_b2)

const retChage = () => {
  ret2.name = 'sss'
  ret2.info.count = 2

  ret3.b.b2.b21.b211 = 'eeee'
}

// 测试日期组件
const mydate = ref('')

const clearDate = () => {
  mydate.value = null
}
</script>