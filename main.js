const {app, BrowserWindow, Tray, Menu, globalShortcut} = require('electron')
const path = require('path')
const { menubar } = require('menubar')

const mb = menubar({
    icon: path.join(__dirname, './assets/icon@2x.png'),
    resizable: false,
    preloadWindow: true
});

mb.on('ready', () => {
    mb.tray.setImage("./assets/tray_icon@2x.png")
})


/*const ret = globalShortcut.register('CommandOrControl+N', function () {
        if (mb.window.isVisible()) {
	    mb.window.hide()
	} 
	else {
	    mb.window.show()
	}
})

if (!ret) {
    console.log('registration failed')
}*/
