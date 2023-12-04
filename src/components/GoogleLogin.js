import React, { useEffect, useState } from "react";
import "../styles/signin.css"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

const GoogleLogin = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [isLogin,setisLogin] = useState(false);

  //구글 계정으로 로그인
  let signIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setisLogin(true);
      alert('로그인 성공');
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
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