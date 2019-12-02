const path = require('path')

// 数据库连接信息
const mysqlInfo = {
  host: '127.0.0.1',
  user: 'root',
  password: '123456789',
  port: 3306,
  database: 'wordpress'
}

const siteDoamin = 'www.myshantou.org'
const uploadPath = path.join(__dirname, `../out/${siteDoamin}/uploads`)
const jekyllImgBaseUrl = '/images'

// 导出目录
const postOutDir = path.join(__dirname, `../out/${siteDoamin}/posts`)
const imageOutDir = path.join(__dirname, `../out/${siteDoamin}/images`)

module.exports = {
  mysqlInfo,
  postOutDir,
  uploadPath,
  imageOutDir,
  siteDoamin,
  jekyllImgBaseUrl
}
