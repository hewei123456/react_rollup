const fs = window.require('fs')
const path = window.require('path')
const mammoth = window.require('mammoth')

const convertToHtml = input => {
  return new Promise(resolve => {
    mammoth.convertToHtml(input).then(result => {
      resolve(result.value)
    }).done()
  })
}

export const readFile = async (filepath) => {
  switch (path.extname(filepath)) {
    // 当文件扩展名为 .docx时
    case '.docx':

      return await convertToHtml({ path: filepath })

    default:
      return fs.readFileSync(filepath, { encoding: 'utf8' })
  }
}
