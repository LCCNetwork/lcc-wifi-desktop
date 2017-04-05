const $ = require('jquery')
const fb = require('firebase')
require('google-oauth2')
const gAuthProvider = new fb.auth.GoogleAuthProvider()

const fbConfig = {
  apiKey: 'AIzaSyBgiv2CAsvosW3RFsS8SYv9JhVeYJLWRYo',
  authDomain: 'lcc-wifi.firebaseapp.com',
  databaseURL: 'https://lcc-wifi.firebaseio.com',
  projectId: 'lcc-wifi',
  storageBucket: 'lcc-wifi.appspot.com',
  messagingSenderId: '1038104580431'
}

fb.initializeApp(fbConfig)

fb.auth().onAuthStateChanged((user) => {
  console.log(user)
})

// Google OAuth Handlers
function onSuccess (user) {
    const credential = gAuthProvider.credential(user.idToken)
  fb.auth().signInWithCredential(credential).catch((err) => {
    alert('Login Error', err.message, [
      {text: 'OK'}
    ])
  })
}

function onFailure (err) {
    console.error(err)
}

function renderButton () {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    })
}

window.onload = () => {
  let loader = $('.wrapper-loader')
  setTimeout(() => {
    loader.fadeOut({duration: 200})
  }, 1800)
}
