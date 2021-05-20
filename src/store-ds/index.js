import VuexDataState from 'vue-data-state'

export default VuexDataState.createStore({
  global: { // 全局状态
    userOnlint: {
      name: '博文的状态' //
    }
  },
  local: { // 局部状态
    // 数据列表，使用前需要先注册
    dataListState() { // 显示博文列表用的状态
      return {
        findKind: {}, // 查询方式
        find: {}, // 查询关键字
        page: { // 分页参数
          pageTotal: 100,
          pageSize: 2,
          pageIndex: 1,
          orderBy: { id: false }
        },
        _query: {}, // 缓存的查询条件
        isReload: false // 重新加载数据，需要统计总数
      }
    },
    formState() {
      return {
        meta: {},
        show: false,
        state: 1, // 1添加；2修改；3查看；4:显示
      }
    },
    findState() {
      return {
        meta: {}
      }
    },
    helpBaseSet() {
      return {
        table: {
          id: 100, // 表ID
          name: '' // 表名
        },
        columns: [] , // 字段信息
        forms: {}, // 表单信息
        finds: {}, // 查询信息
        grids: {}, // 列表信息
        pager: {}, // 分页信息
        buttons: {} // 操作按钮信息
      }
    }
  },
  // 可以给全局状态设置初始状态，同步数据可以直接在上面设置，如果是异步数据，可以在这里设置。
  init(state) {
    
  }
}) 