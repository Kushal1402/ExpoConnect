const firebase = require("firebase/compat/app");
require("firebase/compat/storage");
require("firebase/compat/firestore");

require("dotenv").config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const initializedFirebase = firebase.initializeApp(firebaseConfig);

const storage = initializedFirebase.storage();
var storageRef = storage.ref();
const db = initializedFirebase.firestore();

module.exports = { initializedFirebase, storage, storageRef, db };