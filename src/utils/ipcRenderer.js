const { ipcRenderer } = window.require('electron')

export const toggleDevTools = () => {
  ipcRenderer.send('toggle-dev-tools')
}

export const openSettings = () => {
  ipcRenderer.send('open-settings-window')
}

export const closeSettings = () => {
  ipcRenderer.send('close-settings-window')
}
