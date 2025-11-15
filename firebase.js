import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 1. getAuth ইম্পোর্ট করুন

// 2. এনভায়রনমেন্ট ভেরিয়েবল থেকে কী-গুলো লোড করুন
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 3. auth সার্ভিসটি ইনিশিয়ালাইজ করুন এবং export করুন
const auth = getAuth(app);
export default auth;