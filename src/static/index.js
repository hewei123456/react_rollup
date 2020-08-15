export const logo = require('./images/logo.png')
export const avatar = require('./images/avatar.jpg')
export const noImage = require('./images/no-image.png')
export const noData = require('./images/nodata.png')

export const checkBlank = image => (image ? image : noImage)
export const checkHeader = header => (header ? header : avatar)
