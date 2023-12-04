import React, { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const auth = getAuth();
  const [isLogin,setisLogin] = useState(false);
  const [user,setUser] = useState(null);


  //로그인 상태인지 파악
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setisLogin(true);
        setUser(user.uid);
      } else {
        setisLogin(false);
      }
    });
  }, []);

  const provider = new GoogleAuthProvider();

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

  //구글 계정 로그아웃
  
  let logOut = () => {
    setisLogin(false);
    setUser(null);
    alert('로그아웃 성공');
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  

  
  return(
    <header className="container">
      <div>
        <h1>
          <a href="/">
            <span>다이어팁</span>
          </a>
        </h1>
        <aside>
          <button type="button" className="point-1 loginout" onClick={isLogin ? logOut : signIn}>
            {isLogin ? '로그아웃' : '로그인'}
          </button>
          <button type="button" className="mypage">
            mypage
          </button>
          <button type="button" className="alam">
            alam
          </button>
        </aside>
      </div>
      <nav className="main-menu">
        <ul>
          <li>
            <a href="" className="big-menu">
              <span className="icon meal"></span>
              <span>식단&식품</span>
            </a>
            <ul>
              <li>
                <a href="">식단 공유</a>
              </li>
              <li>
                <a href="">칼로리 사전</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="" className="big-menu">
              <span className="icon health"></span>운동
            </a>
            <ul>
              <li>
                <a href="">운동 추천</a>
              </li>
              <li>
                <a href="">운동 인증</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="" className="big-menu">
              <span className="icon community"></span>커뮤니티
            </a>
            <ul>
              <li>
                <a href="">자유게시판</a>
              </li>
              <li>
                <a href="">Q&A</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
