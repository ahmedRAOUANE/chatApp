import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCeg3SiZ0J_Vj04Smpzw9E2yCPaiW7Pubg",
  authDomain: "chat-app-3a0a9.firebaseapp.com",
  projectId: "chat-app-3a0a9",
  storageBucket: "chat-app-3a0a9.appspot.com",
  messagingSenderId: "828572127064",
  appId: "1:828572127064:web:0ab089ee36c0f5f4b31f2d",
  measurementId: "G-3TPNLK2GLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app)