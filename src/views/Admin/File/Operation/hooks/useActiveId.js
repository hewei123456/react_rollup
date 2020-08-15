import { useEffect, useState } from 'react'
import { store } from '@/store'

const useActiveId = () => {
  const { files: { present: files } } = store.getState()
  const [activeId, setActiveId] = useState(null)

  const onClearActiveId = () => {
    setActiveId(null)
  }

  const onSetActiveId = id => {
    if (activeId !== id)
      setActiveId(id)
  }

  const onDeleteActiveId = id => {
    if (activeId === id)
      onClearActiveId()
  }

  useEffect(() => {
    if (files.size === 0)
      onClearActiveId()
  }, [files])

  return [activeId, onSetActiveId, onClearActiveId, onDeleteActiveId]
}

export default useActiveId
