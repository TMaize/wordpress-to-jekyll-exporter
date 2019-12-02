const jsdom = require('jsdom')
const { JSDOM } = jsdom
const $ = require('jquery')(new JSDOM('').window)

const fixFrontText = str => {
  str = str.trim()
  str = str.replace(/&amp;/g, '&')
  str = str.replace(/'/g, '"')
  str = str.replace('&#038;', '&')
  return `'${str}'`
}

const fixFrontArray = arr => {
  let a = []
  if (Array.isArray(arr)) {
    a = arr.slice(0)
  }
  a = a.map(v => v.toString().trim())
  a = a.map(v => v.replace(/&amp;/g, '&'))
  a = a.map(v => v.replace(/'|"/g, ''))
  a = a.map(v => v.replace('&#038;', '&'))

  let t = '['
  for (let i = 0; i < a.length; i++) {
    t += `'${a[i]}'`
    if (t.length != 1 && i < a.length - 1) {
      t += ', '
    }
  }
  t += ']'
  return t
}

// 去除[caption]标记
const fixPostContent = content => {
  let text = content
  while (true) {
    let reg = /\[caption.*?](.+?)\[\/caption\]/
    let result = reg.exec(text)
    if (!result) {
      break
    }
    let alt = $(`<div>${result[1]}</div>`).text()
    let dom = $(`<div>${result[1].replace(alt, '')}</div>`)
    dom.find('img').attr('alt', alt.trim())
    text = text.replace(result[0], `\n${dom.html()}\n`)
  }
  return text
}

const fixPostImage = (content, domain, imgBaseUrl) => {
  let siteImgs = []
  let dom = $(`<div>${content}</div>`)
  dom.find('img').each((i, v) => {
    let src = $(v).attr('src')
    let absSrc = src.replace('http://' + domain + '/wp-content/uploads', '')
    absSrc = absSrc.replace('https://' + domain + '/wp-content/uploads', '')
    if (absSrc != src) {
      $(v).attr('src', imgBaseUrl + absSrc)
      siteImgs.push(absSrc)
    }
  })
  return {
    content: dom.html(),
    imgs: siteImgs
  }
}

console.log(
  fixPostImage(
    `<div><img src="http://www.myshantou.org/wp-content/uploads/2016/03/2016-03-30-下午2.09.20.png"></div>`,
    'www.myshantou.org',
    ''
  )
)

module.exports = {
  fixFrontText,
  fixFrontArray,
  fixPostContent,
  fixPostImage
}
