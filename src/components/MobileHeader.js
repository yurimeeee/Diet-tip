import React, { useEffect, useRef, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { yesLogin, noLogin } from "../store/loginSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MobileHeader = () => {
  const auth = getAuth();
  const isLoginYN = useSelector((state) => state.isLogin.value);
  const dispatch = useDispatch();

  const nav = useRef(null);
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);

  // 사이드메뉴 열기
  const open = () => {
    nav.current.classList.add('open');
    setIsMenuOpen(true);
  };

  // 사이드메뉴 닫기
  const close = () => {
    nav.current.classList.remove('open');
    setIsMenuOpen(false);
  };

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
        navigate("/");
      })
      .catch((error) => {
        dispatch(yesLogin());
        alert("로그아웃 실패");
      });
  };

  //로그인 페이지로 이동
  const navigate = useNavigate();
  const moveLogin = () => {
    // window.location.replace("/login");
    navigate("/login");
  };
  
  //마이 페이지로 이동
  const moveMp = () => {
    // window.location.replace("/mypage");
    navigate("/mypage");
  };

  return (
    <header className="container mobile">
      <div className="header">
        <button type="button" className="menu-btn" onClick={open}>menu</button>
        <h1>
          <Link to="/">
            <span>다이어팁</span>
          </Link>
        </h1>
        <button type="button" className="mypage" onClick={isLoginYN ? moveMp : moveLogin}>
          {" "}
          mypage{" "}
        </button>
      </div>
      <div className={`main-menu-bg ${isMenuOpen ? "active" : ""}`}>
        <nav className="main-menu" ref={nav}>
          <button type="button" className="menu-close-btn" onClick={close}>
          </button>
          <ul>
            <li>
              <a href="javascript:void(0)" className="big-menu">
                <span>식단&식품</span>
              </a>
              <ul>
                <li onClick={close}>
                  <Link to="/meal">식단 공유</Link>
                </li>
                <li onClick={close}>
                  <Link to="/calories">칼로리 사전</Link>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:void(0)" className="big-menu">
                <span>운동</span>
              </a>
              <ul>
                <li onClick={close}>
                  <Link to="/health">운동 추천</Link>
                </li>
                <li onClick={close}>
                  <Link to="/healthshot">운동 인증</Link>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:void(0)" className="big-menu">
                <span>커뮤니티</span>
              </a>
              <ul>
                <li onClick={close}>
                  <Link to="/freeboard">자유게시판</Link>
                </li>
                <li onClick={close}>
                  <Link to="/qnaboard">Q&A</Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="nav-bottom">
            <span>KOR | ENG</span>
            <button
                type="button"
                className="loginout w-green-btn"
                onClick={isLoginYN ? logOut : moveLogin}
              >
                {isLoginYN ? "로그아웃" : "로그인"}
            </button>
          </div>
  
        </nav>
      </div>
    </header>
  );
};

export default MobileHeader;
