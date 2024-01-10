import React from "react";
import "../styles/signin.css";
import { useState } from "react";
import GoogleLogin from "../components/GoogleLogin";
import { Link } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { yesLogin, noLogin } from "../store/loginSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const isLoginYN = useSelector(state => state.isLogin.value);
  const dispatch = useDispatch();
  const auth = getAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const emailChange = (e) => {
    setEmail(e.currentTarget.value);
  }
  const passwordChange = (e) => {
    setPassword(e.currentTarget.value);
  }

  const normalLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      dispatch(yesLogin());
      const user = userCredential.user;
      alert(`${user.email} 님 어서오세요`);
      window.location.replace('/Diet-tip/');
    })
    .catch((error) => {
      dispatch(noLogin());
      const errorCode = error.code;
      alert(`오류 코드: ${errorCode}와 같은 이유로 로그인에 실패하였습니다`);
    });
  }

  
  return(
    <div className="container">
       <main className="Login">
        <form>
          <label htmlFor="user-email">email</label>
          <input type="email" placeholder="email(xxx@xxx.com)" id="user-email" required onChange={emailChange}></input>
          <label htmlFor="user-pw">password</label>
          <input type="password" placeholder="password" id="user-pw" required onChange={passwordChange}></input>
          <button type="button" className="w-green-btn" onClick={normalLogin}>로그인</button>
        </form>
        {<GoogleLogin/>}
        <div className="already">
          <p>아직 다이어팁 계정이 없다면?</p>
          <button className="w-green-btn" type="button"><Link to="/signin" className="login-btn">회원가입 하기</Link></button>
        </div>
      </main>
    </div>
  )
};

export default Login;