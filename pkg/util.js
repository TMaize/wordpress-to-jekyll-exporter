const fs = require('fs')
const path = require('path')
const moment = require('moment')
const turndown = require('turndown')

moment.locale('zh-cn')

let turndownService = new turndown({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '+'
})

const formatTime = (date, pattern) => {
  date = date || new Date()
  pattern = pattern || 'YYYY-MM-DD HH:mm:ss'
  return moment(date).format(pattern)
}

// 不存在创建，存在覆盖
const writeFile = (filePath, fileContent) => {
  let dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, fileContent || '')
}

// 读取文件
const readFile = (filePath, encoding) => {
  return fs.readFileSync(filePath, {
    encoding: encoding || 'utf8'
  })
}

// 删除文件，清空目录
const delFileAndDir = p => {
  if (fs.existsSync(p)) {
    let stat = fs.statSync(p)
    if (stat.isFile()) {
      fs.unlinkSync(p)
      return
    }
    fs.readdirSync(p).forEach(pp => {
      delFileAndDir(path.join(p, pp))
    })
    fs.rmdirSync(p)
  }
}

// html转markdown
const htmlToMarkdown = htmlText => {
  return turndownService.turndown(htmlText)
}

module.exports = {
  formatTime,
  writeFile,
  readFile,
  delFileAndDir,
  htmlToMarkdown
}
