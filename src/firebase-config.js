// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBYuqc6E1duvqFAdZPllOLCCZvqu09LkcM',
  authDomain: 'plants-watering-b0e29.firebaseapp.com',
  projectId: 'plants-watering-b0e29',
  storageBucket: 'plants-watering-b0e29.appspot.com',
  messagingSenderId: '380520043293',
  appId: '1:380520043293:web:faf0eea6a36519c49a47f4',
  measurementId: 'G-GNFJ6CN419',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
