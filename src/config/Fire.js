// import firebase from 'firebase';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import 'firebase/firestore';

const config = {
	apiKey: "AIzaSyBflIb5MQhjqiDIo5DJFU7gBc1n2L_dyhk",
    authDomain: "frank-app-58b31.firebaseapp.com",
    databaseURL: "https://frank-app-58b31.firebaseio.com",
    projectId: "frank-app-58b31",
    storageBucket: "frank-app-58b31.appspot.com",
    messagingSenderId: "252867378515",
    appId: "1:252867378515:web:2fa84929ae98ac039e35a6",
    measurementId: "G-43Z9S9KNNX"
}

// riot API  
//RGAPI-09149d97-39a1-48b8-8ddd-6bae6d5f58c5

const fire = firebase.initializeApp(config);

export default fire;