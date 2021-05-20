// 表单域控件类型
const formControlType = {
  // 100: '多行文本', // textarea， 多行文本框 input-text
  101: '单行文本', // text，单行文本框 input-text
  // 102: '密码', // password，密码 input-password
  // 103: '电话号码', // tel，电话 input-text
  // 104: '电子邮件', // email，电子邮件 input-text
  // 105: 'url', // url input-url
  // 106: '搜索', // 搜索 search input-text
  // 107: '颜色', // 颜色 color input-color
  // 以上都用 101 表示
  // 108: 'text', // 弹窗选择记录
  110: '日期', // 日期 date input-date
  // 111 => 110: '日期时间', // 日期时间 datetime-local
  // 112 => 110: '年月', // 年月 month
  // 113 => 110: '年周', // 年周 week
  // 114 => 110: '年', // 年 year
  115: '任意时间', // 时间，任意时间 time
  // 116 => 115 : '选择时间', // 时间，选择固定选项
  120: '数字', // 数字 number
  // 121 => 120: '滑块', // 滑块 range
  // 130: '上传文件', // 上传文件 file
  // 131: '上传图片', // 上传图片
  // 140 => 101: 'fulltext', // 富文本编辑器
  // 150 => 153: '勾选', // 勾选 checkbox
  // 151 => 153: '开关', // 开关 switch
  152: '多选组', // 多选组 checkboxs
  153: '单选组', // 单选组 radios
  160: '下拉列表', // 下拉列表框 单选 select
  // 161: '列表框', // 列表框 多选 selects
  162: ' 联动下拉' // 联动下拉列表框 selectMore
}

export const getControlTypeOptionList = () => {
  const typeOptionList = []
  for (const key in formControlType) {
    const m = formControlType[key]
    typeOptionList.push({
      value: key,
      label: m
    })
  }
  return {
    typeOptionList
  }
}

/**
 * 查询方式
 * * 数字 =、<>、>=、<=、between
 * * 字符串 =、不等于、包含、起始于、结束于
 * * 日期时间 =、between
*/
export const findKindList = {
  // 字符串
  401: { // 等于 字符
    id: 401,
    name: ' = ',
    where: '{col} = "{key}"'
  },
  402: { // 不等于 字符
    id: 402,
    name: '不等于',
    where: '{col} <> "{key}"'
  },
  403: { // 包含 字符
    id: 403,
    name: '包含',
    where: '{col} like "%{key}%"'
  },
  404: { // 不包含 字符
    id: 404,
    name: '不包含',
    where: '{col} not like "%{key}%"'
  },
  405: { // 起始于 字符
    id: 405,
    name: '起始于',
    where: '{col} like "{key}%"'
  },
  406: { // 结束于 字符
    id: 406,
    name: '结束于',
    where: '{col} like "%{key}"'
  },
  // 数字
  411: { // 等于 数字
    id: 411,
    name: ' = ',
    where: '{col} = {key}'
  },
  412: { // 不等于 数字
    id: 412,
    name: ' ≠ ',
    where: '{col} <> {key}'
  },
  413: { // 大于 数字
    id: 413,
    name: ' > ',
    where: '{col} > {key}'
  },
  414: { // 大于等于 数字
    id: 414,
    name: ' >= ',
    where: '{col} >= {key}'
  },
  415: { // 小于 数字
    id: 415,
    name: ' < ',
    where: '{col} < {key}'
  },
  416: { // 小于等于 数字
    id: 416,
    name: ' <= ',
    where: '{col} <= {key}'
  },
  417: { // 范围 数字
    id: 417,
    name: '从',
    where: '{col} between {key1} and {key2}'
  },
  // 日期、时间
  421: { // 等于 日期、时间
    id: 421,
    name: ' = ',
    where: '{col} = \'{key}\''
  },
  422: { // 不等于 日期、时间
    id: 422,
    name: ' ≠ ',
    where: '{col} <> \'{key}\''
  },
  423: { // 大于 日期、时间
    id: 423,
    name: ' > ',
    where: '{col} > \'{key}\''
  },
  424: { // 大于等于 日期、时间
    id: 424,
    name: ' >= ',
    where: '{col} >= \'{key}\''
  },
  425: { // 小于 日期、时间
    id: 425,
    name: ' < ',
    where: '{col} <  \'{key}\''
  },
  426: { // 小于等于 日期、时间
    id: 426,
    name: ' <= ',
    where: '{col} <=  \'{key}\''
  },
  427: { // 范围 日期、时间
    id: 427,
    name: '从',
    where: '{col} between \'{key1}\' and \'{key2}\''
  },
  // 多选组
  441: {
    id: 441,
    name: ' in ',
    where: '{col} in ({key})'
  },
  442: {
    id: 442,
    name: 'not in',
    where: '{col} in ({key})'
  }
}
