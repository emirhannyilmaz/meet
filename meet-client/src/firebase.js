import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAQRcaZUU7hpOIkgVTb87R9f53PYP6pF2k",
    authDomain: "meet-e6c0d.firebaseapp.com",
    projectId: "meet-e6c0d",
    storageBucket: "meet-e6c0d.appspot.com",
    messagingSenderId: "671962160982",
    appId: "1:671962160982:web:063cfb90255028a50400f7",
    measurementId: "G-JMDJ65TDB7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider }