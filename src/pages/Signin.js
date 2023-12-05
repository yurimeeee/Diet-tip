import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/signin.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import GoogleLogin from "../components/GoogleLogin";

const Signin = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const auth = getAuth();

  const emailChange = (e) => {
    setEmail(e.currentTarget.value);
  };
  const passwordChange = (e) => {
    setPassword(e.currentTarget.value);
  };

  const signin = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert(`${user.email} 님 회원가입 성공! 자동 로그인 되었습니다`);
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(
          `오류 코드: ${errorCode}와 같은 이유로 회원가입에 실패하였습니다`
        );
      });
  };

  return (
    <main className="Signin">
      <form>
        <label htmlFor="user-email">email</label>
        <input
          type="email"
          placeholder="email(xxx@xxx.com)"
          id="user-email"
          required
          onChange={emailChange}
        ></input>
        <label htmlFor="user-pw">password</label>
        <input
          type="password"
          placeholder="password"
          id="user-pw"
          required
          onChange={passwordChange}
        ></input>
        <button type="button" className="w-green-btn" onClick={signin}>
          회원가입
        </button>
      </form>
      <div className="already">
        <p>이미 다이어팁 계정이 있다면?</p>
        <button className="w-green-btn" type="button">
          <Link to="/login" className="login-btn">
            로그인 하기
          </Link>
        </button>
      </div>
      {<GoogleLogin />}
    </main>
  );
};

export default Signin;
