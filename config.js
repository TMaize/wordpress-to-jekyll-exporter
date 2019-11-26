const path = require('path')

// 数据库连接信息
const mysqlInfo = {
  host: '127.0.0.1',
  user: 'root',
  password: '123456789',
  port: 3306,
  database: 'wp'
}

// 导出目录
const outDir = path.join(__dirname, '.out')

module.exports = {
  mysqlInfo,
  outDir
}
