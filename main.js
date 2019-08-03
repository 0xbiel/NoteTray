const {app, BrowserWindow, Tray} = require('electron')
const path = require('path')

let mainWindow
let tray = null;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 420,
    height: 520,
    skipTaskbar: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    show: false
  })

  mainWindow.setMenu(null)

  tray = new Tray("./assets/icon@2x.png");

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  mainWindow.on('show', () => {
    tray.setHighlightMode('always')

    const pos = tray.getBounds()

    mainWindow.setPosition(pos.x - 215, pos.y + 30);
  })
  mainWindow.on('hide', () => {
    tray.setHighlightMode('never')
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
 
  if (mainWindow === null) createWindow()
})