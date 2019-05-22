/**
 * @Description: 根据行政区划获取等级
 * @author 张淼
 * @date 2019/4/11
*/
export const getLevel = code => {
}

/* 将数字每三位加 ，  */
export const toThousands = (num) => {
  var result = ''
  var counter = 0
  num = (num || 0).toString()
  for (var i = num.length - 1; i >= 0; i--) {
    counter++
    result = num.charAt(i) + result
    if (!(counter % 3) && i !== 0) {
      result = ',' + result
    }
  }
  return result
}

/* 日期格式装换 */
export const renderTime = date => {
  if (date === null) {
    return ''
  }
  var d = new Date(date)
  var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  return times
}

/* 位置形状汉化 */
export const toChinese = text => {
  switch (text) {
    case 'point':
      return '点'
    case 'polyline':
      return '线'
    case 'polygon':
      return '面'
  }
}

/* 位置形状汉化 */
export const cacuLonLat = a => {
  let degree = parseInt(a)
  let min = parseInt((a - degree) * 60)
  let sec = ((a - degree) * 3600 - min * 60).toFixed(2)
  return degree + '°' + min + '′' + sec + '″'
}
