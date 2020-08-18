const { join } = require('path')
const { app, Menu, ipcMain } = require('electron')
const menuTemplate = require('./main/menuTemplate')
const createWindow = require('./main/createWindow')

app.whenReady().then(() => {

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  mainWindow = createWindow({
      width: 1350,
      height: 750
    },
    join(__dirname, './index.html')
  )

  ipcMain.on('toggle-dev-tools', () => {
    mainWindow.webContents.toggleDevTools()
  })

  ipcMain.on('open-settings-window', () => {
    settingsWindow = createWindow({
        width: 500,
        height: 500,
        parent: mainWindow,
        modal: true
      },
      join(__dirname, './views/settings/index.html')
    )

    settingsWindow.removeMenu()
    settingsWindow.webContents.toggleDevTools()
  })

  ipcMain.on('close-settings-window', () => {
    settingsWindow.close()
    settingsWindow = null
  })
})
