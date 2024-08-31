import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore 
} from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE4uQxEbvAKbCRVHeC1g8oAGHzx4nxa0g",
  authDomain: "netflix-clone-c46bd.firebaseapp.com",
  projectId: "netflix-clone-c46bd",
  storageBucket: "netflix-clone-c46bd.appspot.com",
  messagingSenderId: "330657367151",
  appId: "1:330657367151:web:bd6fa8d0a5007a9039399a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            usageTime: 0, // Thêm trường thời gian sử dụng
        });
        toast.success("Sign-up successful!");
    } catch (error) {
        console.error("Error during sign-up:", error);
        toast.error("Sign-up failed. Please try again.");
    }
};

// Login function
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful!");
    } catch (error) {
        console.error("Error during login:", error);
        toast.error("Login failed. Please check your credentials.");
    }
};

// Logout function
const logout = async () => {
    try {
        await signOut(auth);
        toast.success("Logged out successfully!");
    } catch (error) {
        console.error("Error during logout:", error);
        toast.error("Logout failed. Please try again.");
    }
};

export { auth, db, login, signup, logout };

