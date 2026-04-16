import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhez2ZgDtamu7WUdGzn7Q6VFoD6hx-h-w",
  authDomain: "build-with-ai-ad3d2.firebaseapp.com",
  projectId: "build-with-ai-ad3d2",
  storageBucket: "build-with-ai-ad3d2.firebasestorage.app",
  messagingSenderId: "456810134574",
  appId: "1:456810134574:web:2c987cd8b229e2b85573bf",
  measurementId: "G-23D9MT3NB7"
};

const app = initializeApp(firebaseConfig);

// Crucial: Export these so AuthContext and other components can use them
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
