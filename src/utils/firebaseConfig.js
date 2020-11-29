import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAkzX60jfRzt_RH8f_3Y_LFwEdZpWHKCZc",
    authDomain: "slack-clone-257ec.firebaseapp.com",
    databaseURL: "https://slack-clone-257ec.firebaseio.com",
    projectId: "slack-clone-257ec",
    storageBucket: "slack-clone-257ec.appspot.com",
    messagingSenderId: "480106485876",
    appId: "1:480106485876:web:6769d270eb6434abd81921",
    measurementId: "G-K2YVJJLHQX"
};

const initFirebase = firebase.initializeApp(firebaseConfig);

const db = initFirebase.firestore();

export default db;