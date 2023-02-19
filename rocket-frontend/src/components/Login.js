import React from "react";
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/auth";
//import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//some firebase stuff

import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

import { useNavigate } from "react-router-dom";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk_g29mja2Y01hfqotVsgwaj8eJ5DApBU",
  authDomain: "rocket-networking.firebaseapp.com",
  databaseURL: "https://rocket-networking-default-rtdb.firebaseio.com",
  projectId: "rocket-networking",
  storageBucket: "rocket-networking.appspot.com",
  messagingSenderId: "260401138500",
  appId: "1:260401138500:web:46b9fa0e14237fd297e511",
  measurementId: "G-R4GXZEHQTW",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = firebase.auth();
const ui = new firebaseui.auth.AuthUI(auth);

function FirebaseAuth() {
  const navigate = useNavigate();
  React.useEffect(() => {
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.

          //log something
          //console.log(authResult);
          console.log(authResult.user.uid);

          // navigate.push(`/dashboard/${authResult.user.uid}`);
          navigate(`/dashboard/${authResult.user.uid}`);

          return false;
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById("loader").style.display = "none";
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: "redirect",
      // signInSuccessUrl: "/dashboard:" + uuid,
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      tosUrl: "<your-tos-url>",
      // Privacy policy url.
      privacyPolicyUrl: "<your-privacy-policy-url>",
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return <div id="firebaseui-auth-container"></div>;
}

function Login() {
  return (
    <div>
      <FirebaseAuth />
    </div>
  );
}

export default Login;
