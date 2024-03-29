import React, { useEffect, useState } from "react";
import "../styles/signin.css"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { useSelector ,useDispatch} from 'react-redux';
import { loginSlice, yesLogin, noLogin } from "../store/loginSlice";

const GoogleLogin = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const isLoginYN = useSelector(state => state.isLogin.value);
  const dispatch = useDispatch();

  //구글 계정으로 로그인
  let signIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      dispatch(yesLogin());
      alert('로그인 성공');
      window.location.replace('/Diet-tip/');
    }).catch((error) => {
      dispatch(noLogin());
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorCode);
      console.log(errorMessage);
      console.log(credential);
      alert('로그인 실패');
    });
  }

  return(
    <div className="google">
        <p>구글 계정이 있다면?</p>
        <button className="w-green-btn" type="button" onClick={signIn}>구글 계정으로 로그인 하기</button>
    </div>
  )
}

export default GoogleLogin;