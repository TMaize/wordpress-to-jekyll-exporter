const fs = require('fs')
const path = require('path')
const moment = require('moment')

moment.locale('zh-cn')

const formatTime = (date, pattern) => {
  date = date || new Date()
  pattern = pattern || 'YYYY-MM-DD HH:mm:ss'
  return moment(date).format(pattern)
}

// 不存在创建，存在覆盖
const writeFile = (filePath, fileContent) => {
  let dir = path.dirname(filePath)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(filePath, fileContent || '')
}

// 读取文件
const readFile = (filePath, encoding) => {
  return fs.readFileSync(filePath, {
    encoding: encoding || 'utf8'
  })
}

module.exports = {
  formatTime,
  writeFile,
  readFile
}
