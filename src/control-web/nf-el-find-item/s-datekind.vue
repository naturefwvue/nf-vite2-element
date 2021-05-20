<!--显示日期类型-->
<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      {{modelValue}}
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) in dateKind"
          :key="'s_date_'+ index"
          :command="item"
          > {{item}}
          </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { defineComponent } from 'vue'

// 查询方式的 select
export default defineComponent({
  name: 'el-find-datekind',
  props: {
    // 返回选择的查询方式
    modelValue: [String]
  },
  emits: ['update:modelValue', 'change'],
  setup (props, context) {
    // 需要显示的查询方式
    const dateKind = ['日期', '日期时间', '年月', '年', '年周']
    // console.log('props-text', props)
    const handleCommand = (command) => {
      context.emit('update:modelValue', command)
      context.emit('change', command)
    }

    return {
      dateKind,
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
