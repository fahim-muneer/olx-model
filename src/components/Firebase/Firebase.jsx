import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgSwpTkBew-G-m_R60p0Q5oacrr3eQ6yY",
  authDomain: "flx-f5914.firebaseapp.com",
  projectId: "flx-f5914",
  storageBucket: "flx-f5914.appspot.com", // ✅ IMPORTANT FIX
  messagingSenderId: "1022705651052",
  appId: "1:1022705651052:web:3269407b903b955da57749"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const fireStore = getFirestore(app);
export const storage = getStorage(app);

export const fetchFromFirestore = async () => {
  try {
    const snapshot = await getDocs(collection(fireStore, "products"));

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  } catch (error) {
    console.error("Firestore fetch error:", error);
    return [];
  }
};
