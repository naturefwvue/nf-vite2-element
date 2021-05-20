<!--显示查询方式-->
<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      {{kindName}}<i
        class=" el-icon--right"
        :class="{'el-icon-arrow-down': isUp, 'el-icon-arrow-up': !isUp}"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="kindId in findKind"
          :key="'s_kind_'+ kindId"
          :command="kindId"
          >
            {{findKindList[kindId].name}}
          </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { findKindList } from '/nf-control-web'

// 查询方式的 select
export default defineComponent({
  name: 'el-find-kind',
  props: {
    // 返回选择的查询方式
    modelValue: [Number],
    // 需要显示的查询方式
    findKind: {
      type: Array,
      default: () => { return [411] }
    }
  },
  emits: ['update:modelValue', 'change'],
  setup (props, context) {
    // console.log('props-text', props)
    // console.log('props-ctx', context)
    const kindName = ref(findKindList[props.modelValue].name)

    // 控制向下的箭头
    const isUp = ref(false)
    const handleCommand = (command) => {
      console.log('click on item ', command)
      kindName.value = findKindList[command].name
      context.emit('update:modelValue', command)
      context.emit('change', command)
      isUp.value = true
    }

    return {
      isUp,
      kindName,
      findKindList,
      handleCommand
    }
  }
})
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
