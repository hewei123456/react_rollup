# electron

## 快速开始

### 文档： https://www.electronjs.org/docs

### 安装 ：npm install --save-dev electron

### 入口： Electron 运行 package.json 的 main 脚本的进程被称为主进程（创建窗口，并处理程序中可能遇到的所有系统事件）

## 三大基础

### 主进程

- 在Electron中，主进程控制了整个程序的生命周期，同时也负责管理它创建出来的各个渲染进程。

```javascript

const { app, BrowserWindow } = require('electron')

function createWindow () {   
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  // 并且为你的应用加载index.html
  win.loadFile('index.html')

  // 打开开发者工具
  win.webContents.openDevTools()
}

  // Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
  // 部分 API 在 ready 事件触发后才能使用。
  app.whenReady().then(createWindow)

```

### 渲染进程

- react

require('electron')时就会报TypeError: fs.existsSync is not a function

在 Electron 的 Issue #7300 中找到了解决方案，作为一名 Electron 以及 Web 前端的初学者，自然要在此问题上稍加分析，争取多了解一些背景知识，提高学习质量。

此问题出现的原因为：nodejs 运行时的 require 与编译时 webpack 的 require 是不同的。默认情况下，window 是全局的，然而在 webpack 编译时会忽略 window 。

```javascript

new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
})

const { remote: { dialog }, ipcRenderer } = window.require('electron')

```

### 进程间通信

- ipcMain

```javascript

// 在主进程中.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})

```

- ipcRenderer

```javascript

//在渲染器进程 (网页) 中。
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')

```


## Electron API

### 主进程可调用

- app  控制应用程序的生命周期
- autoUpdater 更新
- BrowserWindow 渲染进程窗口
- dialog 对话框
- globalShortcut 快捷键
- ipcMain 与渲染进程异步通信
- Menu 菜单
- powerMonitor 电源监控
- protocal 自定义协议
- session 浏览器会话
- systemPreferences 系统界面
- Tray 系统托盘

### 渲染进程可调用

- desktopCapturer 截屏、录屏、录音
- ipcRenderer 与主进程异步通信
- remote 调用主进程模块

### 两者均可调用

- clipboard 剪贴板
- crashReporter 崩溃日志报告
- nativeImage 应用程序图标
- screen 获取屏幕相关信息
- shell 桌面集成相关功能

## 菜单

### 主菜单

```javascript

 const menu = Menu.buildFromTemplate(menuTemplate)
 Menu.setApplicationMenu(menu)

```
### 上下文菜单

```javascript

const menu = new Menu()
menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup({ window: remote.getCurrentWindow() })
}, false)

```

## 数据存储

### electron-store

https://www.npmjs.com/package/electron-store
app.getPath('userData')

- 配置设置

```javascript

const Store = require('electron-store');

let option={
    name:"config",//文件名称,默认 config
    fileExtension:"json",//文件后缀,默认json
    cwd:app.getPath('userData'),//文件位置,尽量不要动
//    encryptionKey:"aes-256-cbc" ,//对配置文件进行加密
    clearInvalidConfig:true, // 发生 SyntaxError  则清空配置,
}
const  store = new Store(option);

```

- 方法

	- .set(key, value)
	- .set(object)
	- .get(key, [defaultValue])
	- .has(key)
	- .delete(key)
	- .clear()
	- .onDidChange(key, callback)
callback: (newValue, oldValue) => {}
	- .openInEditor()
用默认编辑器打开 配置文件

- 属性

	- .size
	- .store
	- .path
