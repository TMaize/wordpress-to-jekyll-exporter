const path = require('path')

// 数据库连接信息
const mysqlInfo = {
  host: '127.0.0.1',
  user: 'root',
  password: '123456789',
  port: 3306,
  database: 'wordpress'
}

// 含有siteDoamin的img会被修正
const siteDoamin = 'www.myshantou.org'
// 将wordpress的upload下载到本地
// 提取图片时直接本地读取比较快
const uploadPath = path.join(__dirname, `../out/${siteDoamin}/uploads`)
// 你打算把img放到jekyll的那个目录中
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
