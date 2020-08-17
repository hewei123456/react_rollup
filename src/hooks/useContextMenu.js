import { useEffect, useRef } from 'react'

const { remote } = window.require('electron')
const { Menu, MenuItem } = remote

const useContextMenu = (itemArr, containerClass, targetClass, deps) => {
  const clickedElement = useRef(null)

  const onCurrentClick = callback => {
    if (clickedElement.current && clickedElement.current.dataset) {
      if (typeof callback === 'function') {
        callback(clickedElement.current.dataset)
      }
    }
  }

  useEffect(() => {
    const menu = new Menu()
    itemArr.forEach(item => {
      menu.append(new MenuItem(item))
    })
    const handleContextMenu = (e) => {
      if (document.querySelector(`.${containerClass}`).contains(e.target)) {
        clickedElement.current = e.target
        menu.popup({ window: remote.getCurrentWindow() })
      }
    }
    window.addEventListener('contextmenu', handleContextMenu)
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
    }
  }, deps)
  return onCurrentClick
}

export default useContextMenu
