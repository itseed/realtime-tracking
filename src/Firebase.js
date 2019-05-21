import * as firebase from 'firebase';

const settings = {timestampsInSnapshots: true};

var firebaseConfig = {
    apiKey: "AIzaSyDa7UmoVd48-L-RaPXIyFymDHcod5wG_Pk",
    authDomain: "iot-project-239110.firebaseapp.com",
    databaseURL: "https://iot-project-239110.firebaseio.com",
    projectId: "iot-project-239110",
    storageBucket: "iot-project-239110.appspot.com",
    messagingSenderId: "5934297319",
    appId: "1:5934297319:web:08e6b6866715252a"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;