const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const formatTime = (timestamp, { isAll = true, separator = '-' }) => {
  var date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join(separator) + ` ${isAll ? [hour, minute, second].map(formatNumber).join(':') : ''}`
}

export const subStrByDigits = (str, digits) => {
  var strNew = str
  if (strNew.length > digits) {
    strNew = strNew.substring(0, digits) + '...'
  }
  return strNew
}

export const hasChinese = str => {
  var reg = new RegExp('[\u4E00-\u9FFF]+', 'g')

  return reg.test(str)
}

export const splitArr = (arr, len) => {
  let a_len = arr.length, result = []
  for (var i = 0; i < a_len; i += len)
    result.push(arr.slice(i, i + len))

  return result.length > 0 ? result : [[]]
}

export const isInArray = (arr, value) => {
  if (arr.indexOf && typeof (arr.indexOf) == 'function') {
    var index = arr.indexOf(value)
    if (index >= 0)
      return true
  }
  return false
}

export const remove = (arr, val) => {
  var index = arr.indexOf(val)
  if (index > -1)
    arr.splice(index, 1)
}

export const getUrlParams = (name, url) => {
  if (!url) url = window.location.href
  var params = {}
  url = decodeURI(url)
  var idx = url.indexOf('?')
  if (idx > 0) {
    var queryStr = url.substring(idx + 1)
    var args = queryStr.split('&')
    for (var i = 0, a, nv; a === args[i]; i++) {
      nv = args[i] = a.split('=')
      params[nv[0]] = nv.length > 1 ? nv[1] : true
    }
  }
  return params[name] ? params[name] : ''
}

export const urlBase64ToUint8Array = (base64String) => {
  var padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  // eslint-disable-next-line no-useless-escape
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  var rawData = window.atob(base64)
  var outputArray = new Uint8Array(rawData.length)

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export const toArrayBuffer = (buf) => {
  var ab = new ArrayBuffer(buf.length)
  var view = new Uint8Array(ab)
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i]
  }
  return ab
}

export const toBuffer = (ab) => {
  var buf = new Buffer(ab.byteLength)
  var view = new Uint8Array(ab)
  for (var i = 0; i < buf.length; ++i) {
    buf[i] = view[i]
  }
  return buf
}

export const blobToArrayBuffer = blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function () {
      const dataBuffer = new Uint8Array(this.result)
      resolve(dataBuffer)
    }
    reader.readAsArrayBuffer(blob)
  })
}
