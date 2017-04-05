const $ = require('jquery')
const fb = require('firebase')
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

function onSignIn (googleUser) {
  const credential = gAuthProvider.credential(googleUser.idToken)
  fb.auth().signInWithCredential(credential).catch((err) => {
    alert('Login Error', err.message, [
      {text: 'OK'}
    ])
  })
}

window.onload = () => {
  let loader = $('.wrapper-loader')
  setTimeout(() => {
    loader.fadeOut({duration: 200})
  }, 1800)
}
