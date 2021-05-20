<template>
  行列转换 —— 成绩单
  <el-table
    :data="tableData"
    style="width: 100%;height: 240px;"
    :default-sort = "{prop: 'totalScore', order: 'descending'}"
    :row-class-name="tableRowClassName"
    border
    show-summary
    :summary-method="getSummaries"
  >
    <el-table-column
      v-for="(item, index) in tableHead"
      :key="'s'+ index"
      fixed
      sortable
      :prop="item.prop"
      :label="item.label"
      :width="item.width">
    </el-table-column>
  </el-table>
  <h3>科目</h3>
  
  <h3>学生</h3>
  <h3>成绩</h3>
  <h3></h3>
  
</template>

<script>

// 班级
// 科目
// 学生
// 考试
// 成绩单

import { reactive } from "vue"


// 学科 —— 确定列
const subject = [
  { id: 1, name: '数学' },
  { id: 2, name: '语文' },
  { id: 3, name: '物理' },
  { id: 4, name: '化学' }
]

// 学生 —— 确定行
const student = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
  { id: 4, name: '赵六' }
]

// 班级 —— 分类依据
const classes = [
  { id: 1, name: '一年一班' },
  { id: 2, name: '一年二班' }
]

// 考试 —— 分类依据
const exam = [
  { id: 1, name: '期中考试' },
  { id: 2, name: '期末考试' }
]

// 成绩 —— 确定内容
const reportCard = [
  // 序号   考试ID      班级ID       学生ID         科目ID        成绩
  { id: 1, examId: 1, classId: 1, studentId: 1, subjectId: 1, score: 100 },
  { id: 2, examId: 1, classId: 1, studentId: 1, subjectId: 2, score: 98 },
  { id: 3, examId: 1, classId: 1, studentId: 1, subjectId: 3, score: 90 },
  { id: 4, examId: 1, classId: 1, studentId: 2, subjectId: 1, score: 90 },
  { id: 5, examId: 1, classId: 1, studentId: 2, subjectId: 2, score: 90 },
  { id: 6, examId: 1, classId: 1, studentId: 2, subjectId: 3, score: 40 },
  { id: 7, examId: 1, classId: 1, studentId: 3, subjectId: 1, score: 30 },
  { id: 8, examId: 1, classId: 1, studentId: 3, subjectId: 2, score: 90 },
  { id: 8, examId: 1, classId: 1, studentId: 3, subjectId: 3, score: 40 },
  { id: 9, examId: 1, classId: 1, studentId: 4, subjectId: 1, score: 64 },
  { id: 8, examId: 1, classId: 1, studentId: 4, subjectId: 2, score: 90 },
  { id: 9, examId: 1, classId: 1, studentId: 4, subjectId: 3, score: 70 }
]
 

/**
 * 根据科目建立表头
 * * 学号、姓名、学科、总分、平均分、名次
 */
const createTableHead = () => {
  const head = []
  // 添加学生
  head.push({
    prop: 'id',
    label: '学号',
    width: 70
  })
  head.push({
    prop: 'name',
    label: '姓名',
    width: 80
  })

  // 添加科目
  for (const key in subject) {
    const sub = subject[key]
    head.push({
      prop: 'sub_' + sub.id,
      label: sub.name,
      width: 80
    })
  }

  head.push({
    prop: 'totalScore',
    label: '总分',
    width: 80
  })
  head.push({
    prop: 'averageScore',
    label: '平均分',
    width: 90
  })
  head.push({
    prop: 'ranking',
    label: '名次',
    width: 70
  })
  
  return head
}

/**
 * 行列转换
 */
const rowToCol = () => {
  // 对象形式的成绩列表
  const _code = {}

  // 遍历成绩单
  for (const key in reportCard) {
    const rep = reportCard[key]
    if(typeof _code[rep.studentId] === 'undefined') {
      // 没有记录。创建一行学生成绩，加入固定列的数据
      _code[rep.studentId] = {
        id: rep.studentId, // 学生ID
        name: (student.filter((item)=>item.id === rep.studentId)[0] || {name:''}).name, // 根据id获取学生姓名
        totalScore: 0, // 学生的各科总分
        averageScore: 0, // 学生各科的平均分
        ranking: 1 // 名次，后续修改
      }
    }
    // 记录各科分数
    _code[rep.studentId]['sub_' + rep.subjectId] = rep.score
   
  }

  // 数组形式的成绩列表
  const _arr = []
  // 计算总分、平均分、名次
  for(const key in _code) {
    const code = _code[key]
    // 遍历学科
    let total = 0
    let ave = 0
    let count = 0
    for (const key in subject) {
      const fenshu = code['sub_' + subject[key].id]
      if (typeof fenshu !== 'undefined') {
        // 有成绩，计算总分和平均分
        count++
        total += fenshu
        ave = Math.floor(total / count * 10) / 10 // (total / count ).toFixed(2)
      }
     
    }
    code.totalScore = total
    code.averageScore = ave

    _arr.push(code)
  }

  // 计算名次
  let _ranking = 0
  _arr.sort((a, b) => {
    // 按照总分倒序
    return b.totalScore - a.totalScore
  }).forEach((item) => {
    // 设置名次
    _ranking++
    _arr.find((a) => a.id === item.id).ranking = _ranking
  })

  return _arr
 
}

/**
 * 根据科目表，制定表头，col
 * 根据学生表和成绩，制定数据
 * 计算小计、平均分，合计、最高分、最低分等
 * 排序
 */

</script>

<script setup>

// 获取标题
const tableHead = reactive(createTableHead())

// 数据转换
const tableData = reactive([])
tableData.push(...rowToCol())

// 颜色
const tableRowClassName = ({row, rowIndex}) => {
  // console.log('row', row)
  if (row.averageScore < 60) {
    return 'warning-row';
  } else if (row.averageScore > 95) {
    return 'success-row';
  }
  return '';
}

let i = 0
// 计算各科目的平均分
const getSummaries2 = (param) => {
  i++
  if (i < 7) return []

  const { columns, data } = param;
  const sums = [];
  
  console.log('data', data)
  columns.forEach((column, index) => {
    console.log('计算', i, column)
    if (index === 0) {
      sums[index] = '平均分'
      return
    }
    const values = data.map(item => Number(item[column.property]));
    if (!values.every(value => isNaN(value))) {
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0);
      sums[index] =  Math.floor(sums[index] / values.length * 10) / 10
    } else {
      sums[index] = 'N/A';
    }
  })
  
  return sums
  
}

// 计算各科目的平均分、最高分和最低分
const getSummaries = ({ columns }) => {
  i++
  if (i < 7) return []

  const sums = [];
  
  // console.log('columns', columns)
  
  columns.forEach((item, index) => {
    if (item.property.indexOf('sub_') >= 0 ){
      const subjectId = item.property.replace('sub_', '')*1
      console.log(item, item.property)
      // 学科，计算平均值
      let ave = 0
      let sum = 0
      let max = 0
      let min = 99999
      const _arr = reportCard.filter((r) => r.subjectId === subjectId)
      _arr.forEach((item, index) => {
        sum += item.score // 求和
        if (max < item.score) max = item.score // 记录最高分
        if (min > item.score) min = item.score // 记录最低分
      })
      if (_arr.length === 0) {
        sums[index] = '-' // 没有成绩
      } else {
        // 计算平均分
        ave = Math.floor(sum/_arr.length * 10) / 10
        sums[index] = `${ave}(${max}-${min})`
      }
    } else {
      // 不计算
      sums[index] = ''
    }
  })
  sums[0] = '统计'
  return sums

}

/*
tableData.push({
  id: 1,
  name: '张三',
  sub_1: 100,
  sub_2: 100,
  totalScore: 200,
  averageScore: 100,
  ranking: 1
})
*/


</script>

<style>
  .el-table .warning-row {
    color: rgb(22, 70, 230);
    background: rgb(192, 81, 37);
  }

  .el-table .success-row {
    color: rgb(236, 113, 31);
    background: #597ae6;
  }
</style>