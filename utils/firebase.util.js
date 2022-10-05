const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });

const firebaseConfig = {
    apiKey: process.env.FB_APIKEY,
    authDomain: process.env.FB_AUTHDOMAIN,
    projectId: process.env.FB_PROJECTID,
    storageBucket: process.env.FB_STORAGEBUCKET,
    messagingSenderId: process.env.FB_MESSAGE,
    appId: process.env.FB_APPID
};

const fireBaseApp = initializeApp( firebaseConfig );
const storage = getStorage(fireBaseApp);

module.exports = { storage };