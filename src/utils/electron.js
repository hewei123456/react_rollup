const { remote: { dialog }, ipcRenderer } = window.require('electron')

export const multiSelectionFiles = async (extensions = ['txt', 'md', 'docx']) => {
  const { filePaths } = await dialog.showOpenDialog(
    {
      title: '选取文件',
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Markdown files', extensions }
      ]
    })

  return filePaths
}

export const toggleDevTools = () => {
  ipcRenderer.send('toggle-dev-tools')
}
