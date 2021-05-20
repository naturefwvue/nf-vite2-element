import { watch, reactive } from 'vue'
// 状态
import VueDS from 'vue-data-state'
// webSQL
import { webSQLVue } from 'nf-web-storage'
// 获取配置
import blogListInfo from '/config/bloglist.config.json'
// console.log('配置里面的blogListInfo：', blogListInfo)

/**
 * 数据列表的通用管理类
 * * 查询条件
 * * 分页信息
 * * 加载数据
 * * 注入局部状态
 * @returns
 */
export default function dataListControl (jsonFlag) {
  // 显示数据列表的数组
  const _dataList = reactive([])

  // 访问 webSQL
  const { help } = webSQLVue.useHelp()

  // 访问状态
  const { reg, get } = VueDS.useStore()
  // 子组件里面获取状态
  const dataListState = get.dataListState()

  // 父组件注册状态
  const regDataListState = () => {
    // 注入获取列表需要的状态，便于查询、分页里面修改
    const state = reg.dataListState()
    // 需要的配置信息
    const listInfo = blogListInfo[jsonFlag]
    if (typeof listInfo === 'undefined') {
      // 没有设置对应的信息
      return state
    }

    // 设置具体的查询条件和查询方式
    state.find = listInfo.find
    state.findKind = listInfo.findKind
    state.page = listInfo.page

    // console.log('注册的列表状态：', state)

    // 重新加载数据
    watch(() => state.isReload, () => {
      const _query = {}
      // 设置查询条件
      for (const key in state.find) {
        const value = state.find[key]
        const kind = state.findKind[key]
        if (value || value !== '' || value > 0) {
          _query[key] = [kind, value]
        }
      }
      // 缓存查询条件，分页的时候可以直接使用
      state._query = _query
      // console.log('_query---- ', _query)
      state.page.pageIndex = 1 // 显示第一页
      // 统计总数
      help.selectCount(listInfo.tableName, _query).then((count) => {
        // 设置分页
        state.page.pageTotal = count
      })
      // 获取数据
      help.select(listInfo.tableName, listInfo.listCol, _query, state.page).then((data) => {
        _dataList.length = 0
        _dataList.push(...data)
      })
    })

    // 翻页，依据缓存的查询条件，获取其他页号的数据
    watch(() => state.page.pageIndex, () => {
      // 获取数据
      help.select(listInfo.tableName, listInfo.listCol, state._query, state.page).then((data) => {
        _dataList.length = 0
        _dataList.push(...data)
      })
    })

    return state
  }

  return {
    regDataListState, // 父组件注册状态
    dataList: _dataList, // 父组件获得列表
    dataListState // 子组件获得状态
  }
}
