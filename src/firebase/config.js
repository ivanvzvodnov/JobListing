import { initializeApp } from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDBZ5W4gWBh4V4HtwMx508mfpzC0eBpAHo",
    authDomain: "job-listing-27049.firebaseapp.com",
    projectId: "job-listing-27049",
    storageBucket: "job-listing-27049.appspot.com",
    messagingSenderId: "1057034029454",
    appId: "1:1057034029454:web:57612ac5b516d7365fbcdf"
  };

  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig);
  const firestore = firebase.firestore()

  export {firebase, firestore, initializeApp}