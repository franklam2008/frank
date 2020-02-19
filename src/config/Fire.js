// import * as firebase from 'firebase/app';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBflIb5MQhjqiDIo5DJFU7gBc1n2L_dyhk",
  authDomain: "frank-app-58b31.firebaseapp.com",
  databaseURL: "https://frank-app-58b31.firebaseio.com",
  projectId: "frank-app-58b31",
  storageBucket: "frank-app-58b31.appspot.com",
  messagingSenderId: "252867378515",
  appId: "1:252867378515:web:2fa84929ae98ac039e35a6",
  measurementId: "G-43Z9S9KNNX"
};


const fire = firebase.initializeApp(config);

export default fire;

