import { webSQLVue } from 'nf-web-storage'
// 获取数据库连接信息
import db from '/config/websql.config.json'

/**
 * 打开数据库，建立表，对表建立实例。
 */
export default webSQLVue.createHelp({
  dbConfig: db,
  /* { // 连接数据库
    dbName: 'vite2-blog',
    ver: 1.0,
    remarks: '测试用的博客数据库',
    size: 2
  },*/
  tables: { // 数据库里的表
    crudtest: { // 表名，对象属性，建立表的依据
      id: 0,
      kind: 1,
      area: 1000,
      text: '',
      pwd: 1000,
      url: '',
      date: '2021-03-04',
      datetime: '2021-05-06 21:06:22',
      month: '2021-05',
      week: 202118,
      year: 2021,
      time1: '00:00:00',
      time2: '00:00',
      number1: 0,
      number2: 0,
      check1:  false,
      check2: false,
      checks: '',
      radio: 1,
      select1: 1,
      selects: 0,
      selectunion: 0
    } 
  },
  isDeleteOldTable: false, // 是否删除之前的表
  // 可以给全局状态设置初始状态，同步数据可以直接在上面设置，如果是异步数据，可以在这里设置。
  init(help) {
    // 可以做一些事情，比如添加初始数据
    const data = { // 对象属性，建立表的依据
      kind: 1,
      area: 1000,
      text: '测试',
      pwd: 1000,
      url: 'www.baidu.com',
      date: '2021-03-04',
      datetime: '2021-05-06 21:06:22',
      month: '2021-05',
      week: 202118,
      year: 2021,
      time1: '00:00:00',
      time2: '00:00',
      number1: 0,
      number2: 0,
      check1:  false,
      check2: false,
      checks: '',
      radio: 1,
      select1: 1,
      selects: 0,
      selectunion: 0
    }

    // help.insert('crudtest', data)

  }
}) 