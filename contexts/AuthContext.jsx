import React, { createContext, useState, useEffect } from "react";
// 1. আপনার কনফিগারেশন ফাইল থেকে auth ইম্পোর্ট করুন
import auth from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail, // 2. Forgot Password এর জন্য এটি ইম্পোর্ট করুন
} from "firebase/auth";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider(); // এটি বাইরে রাখাই ভালো

/** @type {React.FC<React.PropsWithChildren<{}>>} */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // 3. সরাসরি currentUser সেট করা সহজ এবং ক্লিনার
      setUser(currentUser);
      setLoading(false); // Auth স্টেট লোড হয়ে গেলে লোডিং বন্ধ করুন
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setLoading(false)
    );
  };

  const register = (name, email, photoURL, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: name,
          photoURL: photoURL || `https://i.pravatar.cc/150?u=${email}`,
        }).then(() => {
          // UI-তে সাথে সাথে প্রোফাইল আপডেটের জন্য state আপডেট করুন
          setUser((prevUser) => ({
            ...prevUser,
            ...userCredential.user,
            displayName: name,
            photoURL: photoURL || `https://i.pravatar.cc/150?u=${email}`,
          }));
        });
      })
      .finally(() => setLoading(false));
  };

  const updateUserProfile = (updatedData) => {
    setLoading(true);
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, {
        displayName: updatedData.name,
        photoURL: updatedData.photoURL,
      })
        .then(() => {
          setUser((prevUser) => ({
            ...prevUser,
            displayName: updatedData.name,
            photoURL: updatedData.photoURL,
          }));
        })
        .finally(() => setLoading(false));
    }
    setLoading(false);
    return Promise.reject(new Error("No user is currently signed in."));
  };

  // 4. "Forgot Password" ফাংশন যোগ করা হলো
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email).finally(() => setLoading(false));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateUserProfile,
    loginWithGoogle,
    resetPassword, // 5. Context Value-তে যোগ করুন
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
