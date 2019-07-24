const {app, BrowserWindow, Tray} = require('electron')
const path = require('path')

let mainWindow
let tray = null;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
    skipTaskbar: true,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.setMenu(null)

  mainWindow.hide();

  tray = new Tray("./assets/icon@2x_white.png");

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  mainWindow.on('show', () => {
    tray.setHighlightMode('always')

    const pos = tray.getBounds()

    mainWindow.setPosition(pos.x, pos.y);
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