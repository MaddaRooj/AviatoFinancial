import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import App from './App'
import './index.css'
import { FBapiKey, FBauthDomain, FBdatabaseURL, FBprojectId, FBstorageBucket, FBmessagingSenderId, FBappId } from './config';
import * as firebase from 'firebase/app'

var firebaseConfig = {
    apiKey: FBapiKey,
    authDomain: FBauthDomain,
    databaseURL: FBdatabaseURL,
    projectId: FBprojectId,
    storageBucket: FBstorageBucket,
    messagingSenderId: FBmessagingSenderId,
    appId: FBappId
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(
    <Router>
        <App />
    </Router>
    , document.getElementById('root'))
