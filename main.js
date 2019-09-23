const {app, BrowserWindow, Tray, Menu, globalShortcut} = require('electron')
const path = require('path')
const { menubar } = require('menubar')

const mb = menubar({
    icon: path.join(__dirname, '/./assets/icon.png'),
    resizable: false,
    preloadWindow: true
});

mb.on('ready', () => {
    mb.tray.setImage(path.join(__dirname, '/./assets/notebw@2x.png'))

    const ret = globalShortcut.register('CommandOrControl+Alt+N', () => {
	if (mb.window.isVisible()) {
	    mb.window.hide()
	}
	else {
	    mb.window.show()    
	}
    })

    if (!ret) {
	console.log('shortcut reg failed')	
    }

    mb.showWindow()
})

mb.on('show', function show () {
      mb.window.webContents.send('show')
})
