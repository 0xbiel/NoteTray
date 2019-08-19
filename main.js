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

  tray = new Tray("./assets/tray_icon@2x.png");

  const contextMenu = Menu.buildFromTemplate([
    { label: 'About', type: 'normal', role:'about' },
    { label: 'Quit', type: 'normal', role: 'close' }
  ])

  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  mainWindow.on('show', () => {
    tray.setHighlightMode('always')

    const pos = tray.getBounds()
    let y = 0
    let x = pos.x - 200

    if (process.platform !== 'darwin') {
      const size = mainWindow.getSize();
      const windowWidth = size[0];
      const windowHeight = size[1];
      if (pos.y === 0) { // windows taskbar top
        y = pos.height;
      } else { // windows taskbar bottom
        y = pos.y - windowHeight;
      }
    }

    mainWindow.setPosition(x, y);
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