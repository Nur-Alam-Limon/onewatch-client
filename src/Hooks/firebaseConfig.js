import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "@firebase/auth";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import firebaseInit from "../Firebase/firebase.initialize";

firebaseInit();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const auth = getAuth();

  const signInUsingGoogle = () => {
    setIsLoading(true);
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
      .finally(() => setIsLoading(false))
      .catch((error) => {
        setError(error.message);
      });
  };

  const signInWithEmail = (email, pass, name, location, history) => {
    const redirect_url = location.state?.from || "/home";
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, pass)
      .then((data) => {
        setError("");
        const newUser = { email, displayName: name };
        setUser(newUser);
        //Save user to db
        saveUser(email, name);

        updateProfile(auth.currentUser, {
          displayName: name,
        }).then(() => {});
        history.replace("/");
      })
      .catch((error) => {
        setError(error.message);
      });
    signInWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        history.push(redirect_url);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {})
      .finally(() => setIsLoading(false));
  };

  const saveUser = (email, displayName) => {
    const user = { email, displayName };
    fetch("http://localhost:5000/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, []);

  return {
    user,
    setUser,
    saveUser,
    error,
    admin,
    signInUsingGoogle,
    signInWithEmail,
    logOut,
    isLoading,
  };
};

export default useFirebase;
