import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import { message } from 'antd'
import { store } from '@/store'
import { updateFileName, addFile } from '@/store/files'

const useModal = () => {
  const { files: { present: files } } = store.getState()
  const modalInputRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [inputName, setInputName] = useState('')
  const [id, setId] = useState(null)

  const onCancel = () => {
    setVisible(false)
    setInputName('')
    setId(null)
  }

  const onOk = () => {
    if (!inputName)
      message.warning('文件名称不能为空', 1.5)

    else {
      store.dispatch(id ? updateFileName(id, inputName) : (addFile(inputName)))
      onCancel()
    }
  }

  const openModal = (id) => {
    setVisible(true)

    if (id) {
      setInputName(files.getIn([id, 'name']))
      setId(id)
    }
  }

  useEffect(() => {
    if (visible && modalInputRef.current)
      modalInputRef.current.focus()
  }, [visible, modalInputRef])

  return [visible, id, modalInputRef, inputName, setInputName, onOk, onCancel, openModal]
}

export default useModal
