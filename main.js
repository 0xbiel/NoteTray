const {app, BrowserWindow, Tray, Menu} = require('electron')
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
  mainWindow.isResizable(false)
  mainWindow.setResizable(false)
  mainWindow.openDevTools();

  tray = new Tray("./assets/tray_icon@2x.png");

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Change Theme', type: 'normal' },
    { label: 'About', type: 'normal' },
    { label: 'Quit', type: 'normal' }
  ])

  tray.setContextMenu(contextMenu);

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

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
 
  if (mainWindow === null) createWindow()
})