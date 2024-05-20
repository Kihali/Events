const dotenv = require('dotenv');
const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/fiirestore')

dotenv.config(); // Load the environment variables

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

const initializeFirebaseApp = () => {
    try{
        const app = initializeApp(firebaseConfig)
        const firestoreDb = getFirestore()
        return app
    } catch(error) {
        return json(err)
    }
}

const getFirebaseApp = () => app;

module.export = { initializeFirebaseApp, getFirebaseApp }