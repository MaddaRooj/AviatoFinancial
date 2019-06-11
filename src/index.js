import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import App from './App'
import './index.css'
import * as firebase from 'firebase/app'

var firebaseConfig = {
    apiKey: "AIzaSyDdWb-iSM10lu7zdnG_1Wd-bZLrwjLZiPs",
    authDomain: "fe-capstone-auth.firebaseapp.com",
    databaseURL: "https://fe-capstone-auth.firebaseio.com",
    projectId: "fe-capstone-auth",
    storageBucket: "fe-capstone-auth.appspot.com",
    messagingSenderId: "510336772453",
    appId: "1:510336772453:web:36734bcb2e6f346b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(
    <Router>
        <App />
    </Router>
    , document.getElementById('root'))
