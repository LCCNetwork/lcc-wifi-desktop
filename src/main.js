const {app, BrowserWindow} = require('electron')
const electronGoogleOauth = require('electron-google-oauth')
const authConfig = require('../oauth2-config')

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: false
  })

  win.loadURL(`file://${__dirname}/index.html`)
})

exports.openOauth = () => {
  const browserWindowParams = {
    'use-content-size': true,
    center: true,
    resizable: false,
    'always-on-top': true,
    'standard-window': true,
    'auto-hide-menu-bar': true,
    'node-integration': false
  }
  const googleOauth = electronGoogleOauth(browserWindowParams)

  return googleOauth.getAccessToken(
    ['profile', 'email'],
    authConfig.client_id,
    authConfig.client_secret
  )
  .catch(() => {})
}
