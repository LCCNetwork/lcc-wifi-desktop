const {app, BrowserWindow} = require('electron')

app.on('ready', () => {
  let win = new BrowserWindow({width: 1200, height: 900})

  win.loadURL(`file://${__dirname}/index.html`)
})
