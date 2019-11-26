const db = require('./db.js')
const util = require('./util.js')

// 查询所有文章
let queryPosts = `SELECT * FROM wp_posts t WHERE t.post_status = 'publish' and t.post_type = 'post' ORDER BY t.ID desc`

// 查询文章 category 和 post_tag
let queryMeta = `SELECT t3.taxonomy, t4.* FROM wp_posts t1,wp_term_relationships t2,wp_term_taxonomy t3,wp_terms t4 WHERE`
queryMeta += ` t1.ID = ? AND t1.ID = t2.object_id `
queryMeta += ` AND t2.term_taxonomy_id = t3.term_taxonomy_id `
queryMeta += ` AND t3.term_id = t4.term_id `
queryMeta += ` ORDER BY LOWER(t4.name) asc `

// 查询文章作者
let queryAuthor = `SELECT t2.display_name FROM wp_posts t1,wp_users t2 where t1.ID=? AND t1.post_author = t2.ID`

;(async () => {
  let postRows = await db.query(queryPosts)

  for (let i = 0; i < postRows.length; i++) {
    let postRow = postRows[i]
    let authorRow = await db.query(queryAuthor, [postRow.ID])
    let metaRows = await db.query(queryMeta, [postRow.ID])

    let title = postRow.post_title
    let content = postRow.post_content
    let author = authorRow[0].display_name
    let permalink = decodeURIComponent(postRow.post_name)
    let categories = metaRows.filter(m => m.taxonomy == 'category').map(c => c.name)
    let tags = metaRows.filter(m => m.taxonomy == 'post_tag').map(c => c.name)
    let fileName = `${util.formatTime(postRow.post_date, 'YYYY-MM-DD')}-${permalink}.md`

    console.log(fileName)
  }

  // 销毁所有链接
  db.destroy()
})()
