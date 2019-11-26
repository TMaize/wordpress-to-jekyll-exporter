const fixFrontText = str => {
  str = str.trim()
  str = str.replace(/&amp;/g, '&')
  str = str.replace(/'/g, '"')
  return `'${str}'`
}

const fixFrontArray = arr => {
  let a = []
  if (Array.isArray(arr)) {
    a = arr.slice(0)
  }
  a = a.map(v => v.toString().trim())
  a = a.map(v => v.replace(/&amp;/g, '&'))
  a = a.map(v => v.replace(/'/g, '"'))

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

module.exports = {
  fixFrontText,
  fixFrontArray
}
