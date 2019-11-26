const mysql = require('mysql')
const config = require('./config.js')

// 使用连接池
const pool = mysql.createPool(config.mysqlInfo)

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values || [], (err, rows) => {
          connection.release()
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
        })
      }
    })
  })
}

// 关闭所有池内连接
const destroy = () => {
  pool.end(err => {
    if (err) {
      console.error(err)
    }
  })
}

module.exports = {
  query,
  destroy
}
