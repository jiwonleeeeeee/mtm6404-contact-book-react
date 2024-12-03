import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBoXoLhZRdb2MwB8S1WG2ZCc-9d-UN0Re4",
  authDomain: "contact-book-e80da.firebaseapp.com",
  projectId: "contact-book-e80da",
  storageBucket: "contact-book-e80da.firebasestorage.app",
  messagingSenderId: "83747055336",
  appId: "1:83747055336:web:eddc525d79d5fec3a84b5d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  

export default db; 
