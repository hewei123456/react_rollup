import { useState, useEffect } from 'react'

const { remote: { globalShortcut } } = window.require('electron')

const useShortcut = (accelerator) => {
  const [executive, setExecutive] = useState(false)

  const onExecutedCallback = (callback) => {
    if (typeof callback === 'function')
      callback()

    setExecutive(false)
  }

  useEffect(() => {
    globalShortcut.register(accelerator, () => {
      setExecutive(true)
    })
    return () => {
      globalShortcut.unregister(accelerator)
    }
  }, [])

  return [executive, onExecutedCallback]
}

export default useShortcut
