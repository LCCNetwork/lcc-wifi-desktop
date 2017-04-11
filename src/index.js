const $ = require('jquery')
const fb = require('firebase')
const remote = require('electron').remote
const remoteMain = require('electron').remote.require('./main')
const {app, dialog, BrowserWindow} = require('electron').remote
const gAuthProvider = new fb.auth.GoogleAuthProvider()
const imagesLoaded = require('imagesloaded')
const ProgressBar = require('progressbar.js')

let filename = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)

const fbConfig = {
  apiKey: 'AIzaSyBgiv2CAsvosW3RFsS8SYv9JhVeYJLWRYo',
  authDomain: 'lcc-wifi.firebaseapp.com',
  databaseURL: 'https://lcc-wifi.firebaseio.com',
  projectId: 'lcc-wifi',
  storageBucket: 'lcc-wifi.appspot.com',
  messagingSenderId: '1038104580431'
}

fb.initializeApp(fbConfig)

function openOauthWin () {
  remoteMain.openOauth()
  .then(userData => {
    const credential = gAuthProvider.credential(userData.id_token)
    fb.auth().signInWithCredential(credential)
    .then((info) => {
      remote.getCurrentWindow().loadURL(`file://${__dirname}/app.html`)
    })
    .catch((err) => {
      console.log(err)
      dialog.showErrorBox('Authentication Error', 'Firebase Error:\n' + err.message)
    })
  })
  .catch(() => {})
}

function loadApp () {
  let dataDisplay = new ProgressBar.Circle('.app-data-display', {
    strokeWidth: 8,
    easing: 'easeInOut',
    duration: 1400,
    color: '#72CADA',
    trailColor: '#FFF',
    trailWidth: 8
  })

  dataDisplay.animate(0.55)
}

function loadIndex () {
  let loader = $('.wrapper-loader')
  loader.fadeOut({duration: 500})
}

window.onload = () => {
  console.log(filename)
  if (filename === 'index.html') {
    setTimeout(() => {
      imagesLoaded('body', loadIndex())
    }, 1200)
  } else if (filename === 'app.html') {
    loadApp()
  }
}
