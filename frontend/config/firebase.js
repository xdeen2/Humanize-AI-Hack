import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { getAuth } from "firebase/auth";
// import * as firebase from 'firebase';

const config = {
    "apiKey": "AIzaSyA4G4HJKGGnrUPxDf2xzqm9b-v6GidbvBk",
    "authDomain": "yuci-delhi.firebaseapp.com",
    "databaseURL": "https://yuci-delhi-default-rtdb.asia-southeast1.firebasedatabase.app",
    "projectId": "yuci-delhi",
    "storageBucket": "yuci-delhi.appspot.com",
    "messagingSenderId": "1096568349203",
    "appId": "1:1096568349203:web:3b619c5e43f747c88055e6",
    "measurementId": "G-N3X2HSHX3C"
}

const firebaseConfig = {
    apiKey: "AIzaSyCnZDAnGgtzTCdPylCCtD6op2a6it3xCwM",
    authDomain: "humanize-ai.firebaseapp.com",
    databaseURL: "https://humanize-ai-default-rtdb.firebaseio.com",
    projectId: "humanize-ai",
    storageBucket: "humanize-ai.appspot.com",
    messagingSenderId: "906767561463",
    appId: "1:906767561463:web:2288cdcfd7a351107a19f2",
    measurementId: "G-BYWTPVZFKB"
  }

const app = firebase.initializeApp(firebaseConfig)

export const auth = app.auth()

// google auth provider
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = (onSuccess) => {
    auth.signInWithPopup(googleProvider).then((res) => {
        console.log(res)
        onSuccess(res.credential)
    }).catch((error) => {
        console.log(error)
    })
}