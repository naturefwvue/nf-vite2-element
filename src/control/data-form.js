import { watch, reactive } from 'vue'
// 状态
import VueDS from 'vue-data-state'

// webSQL
import { webSQLVue } from 'nf-web-storage'

// 获取配置
// import blogListInfo from '../../public/config/bloglist.config.json'

// model，获取讨论的model
import { discussForm } from '../model/blogModel'

export default function discussFromControl (jsonFlag) {
  // 表单的model
  const discussModel = reactive({
    blogId: 0,
    discusser: '', // 昵称
    addTime: new Date(), // 时间
    concent: '', // 内容
    agreeCount: 0
  })

  // 数据库
  const { discuss } = webSQLVue.useHelp()

  const addNewDiscuss = () => {
    return new Promise((resolve, reject) => {
      discuss.insert(discussModel).then((id) => {
        // 返回
        resolve(id)
      })
    })
  }

  return {
    discussModel,
    addNewDiscuss
  }
}
