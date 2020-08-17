const { app, ipcMain } = require('electron')
const isMac = process.platform === 'darwin'

module.exports = [
  ...(isMac ? [{
    label: app.name,
    submenu: [{
      label: `关于 ${app.name}`,
      role: 'about'
    }, {
      type: 'separator'
    }, {
      label: '服务',
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: `隐藏 ${app.name}`,
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: '隐藏其它',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    }, {
      label: '显示全部',
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: '退出',
      accelerator: 'Command+Q',
      click: () => {
        app.quit()
      }
    }]
  }] : []),
  {
    label: '笔记',
    submenu: [
      {
        label: '新建笔记',
        accelerator: 'CmdOrCtrl+N',
        click: (item, focusedWindow) => {
          focusedWindow.webContents.send('add-file')
        }
      },
      {
        label: '导入笔记',
        accelerator: 'CmdOrCtrl+O',
        click: (item, focusedWindow) => {
          focusedWindow.webContents.send('select-files')
        }
      },
      {
        label: '清空笔记',
        accelerator: 'CmdOrCtrl+P',
        click: (item, focusedWindow) => {
          focusedWindow.webContents.send('clear-files')
        }
      }
    ]
  },
  {
    label: '编辑',
    submenu: [
      {
        label: '撤销',
        accelerator: 'CmdOrCtrl+Z',
        click: (item, focusedWindow) => {
          focusedWindow.webContents.send('undo')
        }
      }, {
        label: '重做',
        accelerator: 'Shift+CmdOrCtrl+Z',
        click: (item, focusedWindow) => {
          focusedWindow.webContents.send('redo')
        }
      }, {
        type: 'separator'
      }, {
        label: '剪切',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      }, {
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      }, {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      }, {
        label: '全选',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      }
    ]
  },
  {
    label: '视图',
    submenu: [
      {
        label: '刷新当前页面',
        accelerator: 'CmdOrCtrl+R',
        click: (item, focusedWindow) => {
          if (focusedWindow)
            focusedWindow.reload()
        }
      },
      {
        label: '切换全屏幕',
        accelerator: (() => {
          if (process.platform === 'darwin')
            return 'Ctrl+Command+F'
          else
            return 'F11'
        })(),
        click: (item, focusedWindow) => {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
        }
      },
      {
        label: '切换开发者工具',
        accelerator: (function () {
          if (process.platform === 'darwin')
            return 'Alt+Command+I'
          else
            return 'Ctrl+T'
        })(),
        click: (item, focusedWindow) => {
          if (focusedWindow)
            focusedWindow.toggleDevTools()
        }
      }
    ]
  },
  {
    label: '窗口',
    role: 'window',
    submenu: [{
      label: '最小化',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    }, {
      label: '关闭',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    }]
  },
  {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: '设置',
        accelerator: 'CmdOrCtrl+Alt+O',
        click: () => {
          ipcMain.emit('open-settings-window')
        }
      },
      {
        label: '返回',
        accelerator: 'CmdOrCtrl+Q',
        click: (item, focusedWindow) => {
          focusedWindow.webContents.goBack()
        }
      },
      {
        type: 'separator'
      },
      {
        label: '学习更多',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]
