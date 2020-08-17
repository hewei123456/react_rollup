const { join } = require('path')
const { app, Menu, ipcMain } = require('electron')
const menuTemplate = require('./main/menuTemplate')
const createWindow = require('./main/createWindow')

const baseUrl = 'http://localhost:3000'

app.whenReady().then(() => {

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  mainWindow = createWindow({
      width: 1350,
      height: 750,
      webPreferences: {
        nodeIntegration: true
      }
    },
    baseUrl
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
      join(__dirname, './views/index.html')
    )

    settingsWindow.removeMenu()
    settingsWindow.webContents.toggleDevTools()
  })

  ipcMain.on('close-settings-window', () => {
    settingsWindow.close()
    settingsWindow = null
  })
})