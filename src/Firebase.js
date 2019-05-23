import * as firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/database';

var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

firebase.initializeApp(firebaseConfig);

export default firebase;
