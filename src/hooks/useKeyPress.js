import { useState, useEffect } from 'react'

const useKeyPress = code => {
  const [keyPressed, setKeyPressed] = useState(false)

  const keyUpHandler = e => {
    if (code === e.code)
      setKeyPressed(false)
  }

  const keyDownHandler = e => {
    if (code === e.code)
      setKeyPressed(true)
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      document.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  return keyPressed
}

export default useKeyPress
