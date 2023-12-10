import React, { useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { yesLogin, noLogin } from "../store/loginSlice";
import { Link } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";

const Header = () => {
  const auth = getAuth();
  const isLoginYN = useSelector((state) => state.isLogin.value);
  const dispatch = useDispatch();

  //로그인 상태인지 파악
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(yesLogin());
      } else {
        dispatch(noLogin());
      }
    });
  }, []);

  //로그아웃
  let logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(noLogin());
        alert("로그아웃 성공");
        window.location.replace("/");
      })
      .catch((error) => {
        dispatch(yesLogin());
        alert("로그아웃 실패");
      });
  };

  //로그인 페이지로 이동
  // const navigate = useNavigate();
  const moveLogin = () => {
    window.location.replace("/login");
  };
  //마이 페이지로 이동
  const moveMp = () => {
    window.location.replace("/mypage");
  };

  return (
    <header className="container">
      <div>
        <h1>
          <a href="/">
            <span>다이어팁</span>
          </a>
        </h1>
        <aside>
          <button
            type="button"
            className="loginout w-green-btn"
            onClick={isLoginYN ? logOut : moveLogin}
          >
            {isLoginYN ? "로그아웃" : "로그인"}
          </button>
          {isLoginYN ? (
            <button type="button" className="mypage" onClick={moveMp}>
              {" "}
              mypage{" "}
            </button>
          ) : (
            ``
          )}
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
                <a href="/meal">식단 공유</a>
              </li>
              <li>
                <a href="/calories">칼로리 사전</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="" className="big-menu">
              <span className="icon health"></span>운동
            </a>
            <ul>
              <li>
                <a href="/health">운동 추천</a>
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
