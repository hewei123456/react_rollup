const { BrowserWindow } = require('electron')

function createWindow (config, url) {
  const basicConfig = {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    show: false
  }

  // 创建浏览器窗口
  const win = new BrowserWindow({ ...basicConfig, ...config })

  url.substr(0, 4).toLowerCase() === 'http' ? win.loadURL(url) : win.loadFile(url)

  win.once('ready-to-show', () => {
    win.show()
  })

  return win
}

module.exports = createWindow
