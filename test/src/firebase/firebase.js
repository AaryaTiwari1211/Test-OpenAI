// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDAyxpwViT0CRzciIUKCmOP47-QuwTGXfg",
    authDomain: "test-openai-9a41d.firebaseapp.com",
    projectId: "test-openai-9a41d",
    storageBucket: "test-openai-9a41d.appspot.com",
    messagingSenderId: "736251430650",
    appId: "1:736251430650:web:b8725da7fccff9aaeaeb43",
    measurementId: "G-VJW2MM3BSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);