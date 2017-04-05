const {app, BrowserWindow} = require('electron')

require('electron-debug')({showDevTools: true})

app.on('ready', () => {
  let win = new BrowserWindow({width: 1200, height: 900})

  // win.loadURL(`file://${__dirname}/index.html`)
  win.loadURL(`http://www.google.com/`)
  console.log(win.setTitle)
})
