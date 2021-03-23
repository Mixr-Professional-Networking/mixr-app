// FIREBASE

import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKPCVSSYU8ucy-xdxlvMpf1swEqxKoF54",
  authDomain: "mixr-ff016.firebaseapp.com",
  projectId: "mixr-ff016",
  storageBucket: "mixr-ff016.appspot.com",
  messagingSenderId: "366486473981",
  appId: "1:366486473981:web:1aa839d9557516b6470294",
  measurementId: "G-RBW6RC8299"
};

firebase.initializeApp(firebaseConfig);

export default async function signUpWithLinkedIn() {
  return firebase.auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(()=>{
          const provider = new firebase.auth.OAuthProvider('linkedin.com');
          provider.addScope('r_emailaddress');
          provider.addScope('r_liteprofile');
          firebase.auth()
              .signInWithPopup(provider)
              .then(result=>{
                  console.group('LinkedIn');
                  console.log(result);
                  console.groupEnd();
                  return result;
              })
              .catch(error=>{
                  console.group('LinkedIn - Error');
                  console.log(error)
                  console.groupEnd();
                  throw error;
              });

      });
}