const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const path    = require('path')
const url     = require('url')
const io      = require('socket.io-client')
const uuid    = require('uuid/v4')

const isDevelopment = (process.env.NODE_ENV === 'development')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null

// install plugin
const widevine = require('electron-widevinecdm')
widevine.load(app)

// create main window
const createWindow = () => {
  // Create the main window.
  mainWindow = new BrowserWindow({
    // show: false,
    width: 1024,
    height: 728,
    title: 'danime',
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.webContents.session.clearCache(() => {})

  const loadfile = url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  })

  mainWindow.loadURL(loadfile)

  // mainWindow.loadURL('https://anime.dmkt-sp.jp/animestore')

  // Open the DevTools.
  if (isDevelopment) {
    mainWindow.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  ipcMain.on('need-quit', app.quit)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
