<!--演示一下传声筒-->
<template>
  <div>
    <el-input
      ref="refInput"
      v-model="value"
      v-bind="$attrs"
    >
      <!--传递插槽-->
      <template 
        v-for="(item, key, index) in $slots"
        :key="index"
        v-slot:[key]
      >
        <slot :name="key"></slot>
      </template> 
    </el-input> 
  </div>
</template>

<script>

/**
 * 支持防抖的
 */
const debounceRef = (props, emit, delay = 300, name = 'modelValue') => {
  let _value = props[name]
 
  // 计时器
  let timeout
  // 是否输入状态。输入时取 value；输入完毕取 modelValue 属性
  let isInput = false
  return customRef((track, trigger) => {
    return {
      get () {
        track()
        if (isInput) {
          // console.log(isInput)
          return _value
        } else {
          // console.log(isInput)
          return props[name]
        }
      },
      set (newValue) {
        isInput = true
        _value = newValue // 绑定值
        trigger() // 组件内部刷新模板
        clearTimeout(timeout) // 清掉上一次的计时
        timeout = setTimeout(() => {
          // 修改 modelValue 属性
          emit(`update:${name}`, newValue) // 提交给父组件
          // 用于区分是哪个组件触发的事件。
          emit('my-change', newValue) // 提交给父组件
          isInput = false
        }, delay)
      }
    }
  })
}

import { ref, customRef, onMounted } from 'vue'

export default {
  name: 'test-text',
  inheritAttrs: false,
  props: {
    modelValue: [String, Number]
  },
  setup(props, ctx) {
    // 上下文
    console.log('上下文', ctx)

    // 插槽
    const slots = ctx.slots

    const val = ref('')

    const value = debounceRef(props, ctx.emit)

    const refInput = ref(null)

    onMounted(() => {
      console.log('refinput', refInput)
      // refInput.value.select()
    })

    const setInput = () => {
      value.value = new Date()
    }

    return {
      refInput,
      setInput,
      value
    }
  }
}
 
/*
import { ref, defineProps, defineEmit, customRef, useContext } from "vue"

// 属性
const props = defineProps({
  modelValue: [String, Number]
})

// 提交事件
const emit = defineEmit()

// 上下文
const ctx = useContext()
console.log('上下文', ctx)

// 插槽
const slots = ctx.slots

const val = ref('')

const value = debounceRef(props, emit)
*/
</script>