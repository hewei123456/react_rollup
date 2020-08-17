import { useState } from 'react'
import { store } from '@/store'
import { multiSelectionFiles } from '@/utils/electron'
import { readFile } from '@/utils/files-helper'
import { addFiles } from '@/store/files'
import { v4 } from 'uuid'

const useSelectFiles = () => {
  const [selectDisabled, setSelectDisabled] = useState(false)

  const flattenFiles = (arr, result = {}) => {
    for (const item of arr) {
      result[item.id] = item
    }
    return result
  }

  const selectFiles = async () => {
    setSelectDisabled(true)

    const filePaths = await multiSelectionFiles(['txt', 'docx', 'md'])
    const { extname, basename } = require('path')

    if (filePaths.length > 0) {
      const files = await Promise.all(filePaths.map(async filePath => {
          const type = extname(filePath)
          const name = basename(filePath.replace(/\\/g, '/')).replace(type, '')
          return {
            id: v4(),
            type,
            name,
            content: await readFile(filePath),
            filePath
          }
        }
      ))
      store.dispatch(addFiles(flattenFiles(files)))
    }

    setSelectDisabled(false)
  }

  return [selectDisabled, selectFiles]
}

export default useSelectFiles
