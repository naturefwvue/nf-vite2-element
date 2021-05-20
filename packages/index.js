// 引入各种函数，便于做成npm包

import formManage from './nf-control-web/control-form'
import { controlItemManage, debounceRef } from './nf-control-web/control-item'
import { baseProps, formProps, findProps }  from './nf-control-web/control-props'
import { createModel, toChildMeta } from './nf-control-web/control-model.js'

// 查询
import { findItemManage } from './nf-control-web/control-item-find.js'
import { findKindList } from './nf-control-web/config-find.js'


export {
	createModel, // 依据meta 创建表单的model
	toChildMeta, // id作为key的 表单子控件的meta，改成字段名作为key的 表单子控件的meta
	formManage, // 表单控件的管理类
	controlItemManage, // 表单子控件的管理类
	findItemManage, // 查询子控件的管理类
	findKindList, // 查询方式
	debounceRef, // 连接外部属性和内部变量的 自定义 ref
	formProps, // 表单控件的属性
	findProps, // 查询控件的属性
	baseProps  // 表单子控件的基础属性
}
